-- PrepPath V2 only.
-- Secure mock-test attempts and sensitive question data without breaking
-- bookmarks, dashboard study tasks, or administrator question management.
-- Apply only to the isolated V2 database after review and disposable-DB tests.

-- ---------------------------------------------------------------------------
-- Server-owned test attempts
-- ---------------------------------------------------------------------------

create table if not exists public.secure_test_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  subject text not null,
  mode text not null check (mode in ('20-questions', '50-questions', 'timed-mode')),
  started_at timestamptz not null default now(),
  expires_at timestamptz,
  finished_at timestamptz,
  result_id uuid unique references public.test_results(id) on delete set null,
  unique (id, user_id)
);

create table if not exists public.secure_test_items (
  attempt_id uuid not null references public.secure_test_attempts(id) on delete cascade,
  position integer not null check (position >= 0),
  question_id uuid not null references public.questions(id),
  answer integer check (answer between 0 and 3),
  answered_at timestamptz,
  primary key (attempt_id, position),
  unique (attempt_id, question_id)
);

create index if not exists secure_test_attempts_user_started_idx
  on public.secure_test_attempts (user_id, started_at desc);

create unique index if not exists secure_test_attempts_one_active_idx
  on public.secure_test_attempts (user_id, subject, mode)
  where finished_at is null;

alter table public.secure_test_attempts enable row level security;
alter table public.secure_test_items enable row level security;

revoke all on table public.secure_test_attempts from public, anon, authenticated;
revoke all on table public.secure_test_items from public, anon, authenticated;

-- Students may read question stems and options, never the answer key.
-- Admin operations use narrowly scoped SECURITY DEFINER functions below.
revoke all on table public.questions from anon, authenticated;
grant select (id, subject, question, option_a, option_b, option_c, option_d, difficulty, created_at)
  on table public.questions to authenticated;

drop policy if exists "Anyone can view questions" on public.questions;
create policy "Authenticated users can read question prompts"
  on public.questions for select to authenticated using (true);

-- Test results and aggregate stats are read-only to clients. Trusted RPCs own writes.
revoke all on table public.test_results from anon, authenticated;
grant select on table public.test_results to authenticated;

drop policy if exists "Users can view all test results for leaderboard" on public.test_results;
drop policy if exists "Users can view their own results" on public.test_results;
create policy "Users can view their own results"
  on public.test_results for select to authenticated
  using (auth.uid() = user_id);

revoke all on table public.user_stats from anon, authenticated;
grant select on table public.user_stats to authenticated;

drop policy if exists "Anyone logged in can read all stats" on public.user_stats;
drop policy if exists "Users can view their own stats" on public.user_stats;
create policy "Users can view their own stats"
  on public.user_stats for select to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can update their own stats" on public.user_stats;

-- Bookmarks remain readable by their owner; mutations go through toggle_bookmark.
revoke all on table public.bookmarked_questions from anon, authenticated;
grant select on table public.bookmarked_questions to authenticated;

-- ---------------------------------------------------------------------------
-- Dashboard: safe creation and update of user-owned study tasks
-- ---------------------------------------------------------------------------

create or replace function public.ensure_my_user_stats()
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
begin
  if v_user_id is null then
    raise exception 'Authentication required';
  end if;

  insert into public.user_stats (
    user_id, accuracy, streak, total_tests, tasks, completed_tasks
  )
  values (v_user_id, 0, 0, 0, '{}'::text[], '{}'::integer[])
  on conflict (user_id) do nothing;
end;
$$;

create or replace function public.update_my_study_tasks(
  p_tasks text[],
  p_completed_tasks integer[]
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
  v_tasks text[] := coalesce(p_tasks, '{}'::text[]);
  v_completed integer[] := coalesce(p_completed_tasks, '{}'::integer[]);
begin
  if v_user_id is null then
    raise exception 'Authentication required';
  end if;

  if cardinality(v_tasks) > 100 then
    raise exception 'You can save up to 100 study tasks';
  end if;

  if exists (
    select 1
    from unnest(v_tasks) as items(task_value)
    where task_value is null or length(btrim(task_value)) = 0 or length(task_value) > 300
  ) then
    raise exception 'Each study task must contain 1 to 300 characters';
  end if;

  if exists (
    select 1
    from unnest(v_completed) as items(task_index)
    where task_index is null or task_index < 0 or task_index >= cardinality(v_tasks)
  ) then
    raise exception 'Completed task index is invalid';
  end if;

  if cardinality(v_completed) <> (
    select count(distinct task_index) from unnest(v_completed) as items(task_index)
  ) then
    raise exception 'Completed task indexes must be unique';
  end if;

  perform public.ensure_my_user_stats();

  update public.user_stats
  set tasks = v_tasks,
      completed_tasks = v_completed
  where user_id = v_user_id;

  return jsonb_build_object(
    'tasks', to_jsonb(v_tasks),
    'completed_tasks', to_jsonb(v_completed)
  );
end;
$$;

-- ---------------------------------------------------------------------------
-- Administrator-only question bank RPCs
-- ---------------------------------------------------------------------------

create or replace function public.admin_list_questions(
  p_subject text default null,
  p_search text default null,
  p_limit integer default 20,
  p_offset integer default 0
)
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_limit integer := least(greatest(coalesce(p_limit, 20), 1), 1000);
  v_offset integer := greatest(coalesce(p_offset, 0), 0);
  v_search text := nullif(btrim(coalesce(p_search, '')), '');
  v_total bigint;
  v_questions jsonb;
begin
  if not public.is_prep_path_admin() then
    raise exception 'Administrator access required';
  end if;

  select count(*) into v_total
  from public.questions q
  where (p_subject is null or p_subject = 'All' or q.subject = p_subject)
    and (v_search is null or q.question ilike '%' || v_search || '%');

  select coalesce(
    jsonb_agg(to_jsonb(page_row) order by page_row.created_at desc, page_row.id),
    '[]'::jsonb
  )
  into v_questions
  from (
    select
      q.id, q.subject, q.question,
      q.option_a, q.option_b, q.option_c, q.option_d,
      q.correct_answer, q.explanation, q.difficulty, q.created_at
    from public.questions q
    where (p_subject is null or p_subject = 'All' or q.subject = p_subject)
      and (v_search is null or q.question ilike '%' || v_search || '%')
    order by q.created_at desc, q.id
    limit v_limit offset v_offset
  ) as page_row;

  return jsonb_build_object('questions', v_questions, 'total', v_total);
end;
$$;

create or replace function public.admin_insert_question(
  p_subject text,
  p_question text,
  p_option_a text,
  p_option_b text,
  p_option_c text,
  p_option_d text,
  p_correct_answer integer,
  p_explanation text default null,
  p_difficulty text default 'Medium'
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_id uuid;
begin
  if not public.is_prep_path_admin() then
    raise exception 'Administrator access required';
  end if;

  if p_subject is null or p_subject not in (
    'English', 'Basic Mathematics', 'Advanced Mathematics', 'Physics',
    'Computer Science', 'IQ', 'Analytical Reasoning', 'Quantitative Reasoning'
  ) then
    raise exception 'Invalid question subject';
  end if;

  if p_question is null or length(btrim(p_question)) = 0
    or p_option_a is null or length(btrim(p_option_a)) = 0
    or p_option_b is null or length(btrim(p_option_b)) = 0
    or p_option_c is null or length(btrim(p_option_c)) = 0
    or p_option_d is null or length(btrim(p_option_d)) = 0 then
    raise exception 'Question and all four answer options are required';
  end if;

  if p_correct_answer is null or p_correct_answer not between 0 and 3 then
    raise exception 'Correct answer must be between 0 and 3';
  end if;

  insert into public.questions (
    subject, question, option_a, option_b, option_c, option_d,
    correct_answer, explanation, difficulty
  )
  values (
    p_subject, btrim(p_question), btrim(p_option_a), btrim(p_option_b),
    btrim(p_option_c), btrim(p_option_d), p_correct_answer,
    nullif(btrim(coalesce(p_explanation, '')), ''),
    coalesce(nullif(btrim(p_difficulty), ''), 'Medium')
  )
  returning id into v_id;

  return v_id;
end;
$$;

create or replace function public.admin_update_question(
  p_question_id uuid,
  p_subject text,
  p_question text,
  p_option_a text,
  p_option_b text,
  p_option_c text,
  p_option_d text,
  p_correct_answer integer,
  p_explanation text
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_id uuid;
begin
  if not public.is_prep_path_admin() then
    raise exception 'Administrator access required';
  end if;

  if p_subject not in (
    'English', 'Basic Mathematics', 'Advanced Mathematics', 'Physics',
    'Computer Science', 'IQ', 'Analytical Reasoning', 'Quantitative Reasoning'
  ) then
    raise exception 'Invalid question subject';
  end if;

  if p_question is null or length(btrim(p_question)) = 0
    or p_option_a is null or length(btrim(p_option_a)) = 0
    or p_option_b is null or length(btrim(p_option_b)) = 0
    or p_option_c is null or length(btrim(p_option_c)) = 0
    or p_option_d is null or length(btrim(p_option_d)) = 0 then
    raise exception 'Question and all four answer options are required';
  end if;

  if p_correct_answer is null or p_correct_answer not between 0 and 3 then
    raise exception 'Correct answer must be between 0 and 3';
  end if;

  update public.questions
  set subject = p_subject,
      question = btrim(p_question),
      option_a = btrim(p_option_a),
      option_b = btrim(p_option_b),
      option_c = btrim(p_option_c),
      option_d = btrim(p_option_d),
      correct_answer = p_correct_answer,
      explanation = nullif(btrim(coalesce(p_explanation, '')), '')
  where id = p_question_id
  returning id into v_id;

  if v_id is null then
    raise exception 'Question not found';
  end if;

  return v_id;
end;
$$;

create or replace function public.admin_delete_question(p_question_id uuid)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not public.is_prep_path_admin() then
    raise exception 'Administrator access required';
  end if;

  if exists (
    select 1 from public.secure_test_items where question_id = p_question_id
  ) then
    raise exception 'This question is part of test history and cannot be deleted';
  end if;

  delete from public.questions where id = p_question_id;
  return found;
end;
$$;

create or replace function public.admin_import_questions(p_questions jsonb)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_row jsonb;
  v_subject text;
  v_question text;
  v_option_a text;
  v_option_b text;
  v_option_c text;
  v_option_d text;
  v_explanation text;
  v_difficulty text;
  v_correct_answer integer;
  v_inserted integer := 0;
  v_skipped integer := 0;
begin
  if not public.is_prep_path_admin() then
    raise exception 'Administrator access required';
  end if;

  if p_questions is null or jsonb_typeof(p_questions) <> 'array' then
    raise exception 'Question import must be a JSON array';
  end if;

  if jsonb_array_length(p_questions) > 5000 then
    raise exception 'Import is limited to 5000 questions per batch';
  end if;

  -- Serialize imports so two administrators cannot race duplicate checks.
  perform pg_catalog.pg_advisory_xact_lock(
    pg_catalog.hashtextextended('preppath-question-import', 0)
  );

  for v_row in select value from jsonb_array_elements(p_questions) as value
  loop
    v_subject := btrim(coalesce(v_row->>'subject', ''));
    v_question := btrim(coalesce(v_row->>'question', ''));
    v_option_a := btrim(coalesce(v_row->>'option_a', ''));
    v_option_b := btrim(coalesce(v_row->>'option_b', ''));
    v_option_c := btrim(coalesce(v_row->>'option_c', ''));
    v_option_d := btrim(coalesce(v_row->>'option_d', ''));
    v_explanation := nullif(btrim(coalesce(v_row->>'explanation', '')), '');
    v_difficulty := coalesce(nullif(btrim(v_row->>'difficulty'), ''), 'Medium');

    if v_subject not in (
      'English', 'Basic Mathematics', 'Advanced Mathematics', 'Physics',
      'Computer Science', 'IQ', 'Analytical Reasoning', 'Quantitative Reasoning'
    ) then
      raise exception 'Invalid subject in import: %', v_subject;
    end if;

    if v_question = '' or v_option_a = '' or v_option_b = ''
      or v_option_c = '' or v_option_d = '' then
      raise exception 'Every imported question requires a prompt and four options';
    end if;

    if coalesce(v_row->>'correct_answer', '') !~ '^[0-3]$' then
      raise exception 'correct_answer must be 0, 1, 2, or 3';
    end if;

    v_correct_answer := (v_row->>'correct_answer')::integer;

    if exists (
      select 1
      from public.questions q
      where q.subject = v_subject
        and pg_catalog.lower(pg_catalog.btrim(q.question)) =
            pg_catalog.lower(v_question)
    ) then
      v_skipped := v_skipped + 1;
      continue;
    end if;

    insert into public.questions (
      subject, question, option_a, option_b, option_c, option_d,
      correct_answer, explanation, difficulty
    )
    values (
      v_subject, v_question, v_option_a, v_option_b, v_option_c, v_option_d,
      v_correct_answer, v_explanation, v_difficulty
    );

    v_inserted := v_inserted + 1;
  end loop;

  return jsonb_build_object('inserted', v_inserted, 'skipped', v_skipped);
end;
$$;

-- ---------------------------------------------------------------------------
-- Bookmark toggle remains supported without exposing answer keys.
-- Serialize a user's toggle for a question to prevent duplicate concurrent rows.
-- ---------------------------------------------------------------------------

create or replace function public.toggle_bookmark(target_question_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
begin
  if v_user_id is null then
    raise exception 'Authentication required';
  end if;

  if not exists (
    select 1 from public.profiles where id = v_user_id
  ) then
    raise exception 'Profile not found';
  end if;

  if target_question_id is null or not exists (
    select 1 from public.questions where id = target_question_id
  ) then
    raise exception 'Question not found';
  end if;

  perform pg_catalog.pg_advisory_xact_lock(
    pg_catalog.hashtextextended(v_user_id::text || ':' || target_question_id::text, 0)
  );

  if exists (
    select 1
    from public.bookmarked_questions
    where user_id = v_user_id and question_id = target_question_id
  ) then
    delete from public.bookmarked_questions
    where user_id = v_user_id and question_id = target_question_id;

    return jsonb_build_object('bookmarked', false, 'limitReached', false);
  end if;

  insert into public.bookmarked_questions (user_id, question_id)
  values (v_user_id, target_question_id);

  return jsonb_build_object('bookmarked', true, 'limitReached', false);
end;
$$;

-- ---------------------------------------------------------------------------
-- Server-owned test RPCs. Correct answers are returned only for questions
-- already answered by this student, or after the entire attempt is finished.
-- ---------------------------------------------------------------------------

create or replace function public.secure_test_state(p_attempt_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_attempt public.secure_test_attempts%rowtype;
begin
  if auth.uid() is null then
    raise exception 'Authentication required';
  end if;

  select * into v_attempt
  from public.secure_test_attempts
  where id = p_attempt_id and user_id = auth.uid();

  if not found then
    raise exception 'Attempt not found';
  end if;

  return jsonb_build_object(
    'attempt_id', v_attempt.id,
    'subject', v_attempt.subject,
    'mode', v_attempt.mode,
    'expires_at', v_attempt.expires_at,
    'finished', v_attempt.finished_at is not null,
    'questions', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', q.id,
        'question', q.question,
        'option_a', q.option_a,
        'option_b', q.option_b,
        'option_c', q.option_c,
        'option_d', q.option_d,
        'position', i.position,
        'selected', i.answer,
        'correct', case
          when v_attempt.finished_at is not null or i.answered_at is not null
          then i.answer = q.correct_answer
          else null
        end,
        'correct_answer', case
          when v_attempt.finished_at is not null or i.answered_at is not null
          then q.correct_answer
          else null
        end,
        'explanation', case
          when v_attempt.finished_at is not null or i.answered_at is not null
          then q.explanation
          else null
        end
      ) order by i.position)
      from public.secure_test_items i
      join public.questions q on q.id = i.question_id
      where i.attempt_id = v_attempt.id
    ), '[]'::jsonb),
    'score', case
      when v_attempt.finished_at is null then null
      else (
        select count(*)
        from public.secure_test_items i
        join public.questions q on q.id = i.question_id
        where i.attempt_id = v_attempt.id
          and i.answer = q.correct_answer
      )
    end
  );
end;
$$;

create or replace function public.finalize_secure_test(p_attempt_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_attempt public.secure_test_attempts%rowtype;
  v_question_count integer;
  v_answered_count integer;
  v_correct_count integer;
  v_result_id uuid;
begin
  if auth.uid() is null then
    raise exception 'Authentication required';
  end if;

  select * into v_attempt
  from public.secure_test_attempts
  where id = p_attempt_id and user_id = auth.uid()
  for update;

  if not found then
    raise exception 'Attempt not found';
  end if;

  if v_attempt.finished_at is not null then
    return public.secure_test_state(v_attempt.id);
  end if;

  select
    count(*)::integer,
    count(*) filter (where answer is not null)::integer,
    count(*) filter (where answer = q.correct_answer)::integer
  into v_question_count, v_answered_count, v_correct_count
  from public.secure_test_items i
  join public.questions q on q.id = i.question_id
  where i.attempt_id = v_attempt.id;

  if v_question_count = 0 then
    raise exception 'Attempt has no questions';
  end if;

  if v_answered_count < v_question_count
    and (v_attempt.expires_at is null or now() < v_attempt.expires_at) then
    raise exception 'Complete all questions before finishing the test';
  end if;

  insert into public.test_results (
    user_id, subject, score, total, total_questions, correct_answers
  )
  values (
    v_attempt.user_id, v_attempt.subject, v_correct_count,
    v_question_count, v_question_count, v_correct_count
  )
  returning id into v_result_id;

  update public.secure_test_attempts
  set finished_at = now(), result_id = v_result_id
  where id = v_attempt.id;

  insert into public.user_stats (
    user_id, accuracy, streak, total_tests, tasks, completed_tasks
  )
  values (
    v_attempt.user_id, 0, 0, 0, '{}'::text[], '{}'::integer[]
  )
  on conflict (user_id) do nothing;

  update public.user_stats s
  set total_tests = (
        select count(*) from public.test_results r where r.user_id = v_attempt.user_id
      ),
      accuracy = coalesce((
        select round(
          100.0 * sum(r.score)::numeric / nullif(sum(r.total_questions), 0)
        )
        from public.test_results r
        where r.user_id = v_attempt.user_id
      ), 0),
      streak = case
        when s.last_active_date = current_date then coalesce(s.streak, 0)
        when s.last_active_date = current_date - 1 then coalesce(s.streak, 0) + 1
        else 1
      end,
      last_active_date = current_date
  where s.user_id = v_attempt.user_id;

  return public.secure_test_state(v_attempt.id);
end;
$$;

create or replace function public.start_secure_test(p_subject text, p_mode text)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_attempt public.secure_test_attempts%rowtype;
  v_wanted integer;
  v_question_count integer;
begin
  if auth.uid() is null then
    raise exception 'Authentication required';
  end if;

  if p_mode not in ('20-questions', '50-questions', 'timed-mode') then
    raise exception 'Invalid test mode';
  end if;

  if p_subject not in (
    'English', 'Basic Mathematics', 'Advanced Mathematics', 'Physics',
    'Computer Science', 'IQ', 'Analytical Reasoning', 'Quantitative Reasoning'
  ) then
    raise exception 'Invalid test subject';
  end if;

  perform pg_catalog.pg_advisory_xact_lock(
    pg_catalog.hashtextextended(auth.uid()::text || ':' || p_subject || ':' || p_mode, 0)
  );

  v_wanted := case when p_mode = '50-questions' then 50 else 20 end;

  select * into v_attempt
  from public.secure_test_attempts
  where user_id = auth.uid()
    and subject = p_subject
    and mode = p_mode
    and finished_at is null
  order by started_at desc
  limit 1;

  if found then
    if v_attempt.expires_at is not null and now() >= v_attempt.expires_at then
      perform public.finalize_secure_test(v_attempt.id);
    else
      return public.secure_test_state(v_attempt.id);
    end if;
  end if;

  select count(*)::integer into v_question_count
  from public.questions
  where subject = p_subject;

  if v_question_count = 0 then
    raise exception 'No questions are available for this subject';
  end if;

  insert into public.secure_test_attempts (user_id, subject, mode, expires_at)
  values (
    auth.uid(), p_subject, p_mode,
    case when p_mode = 'timed-mode' then now() + interval '20 minutes' else null end
  )
  returning * into v_attempt;

  insert into public.secure_test_items (attempt_id, position, question_id)
  select v_attempt.id, row_number() over (order by selected.random_order) - 1, selected.id
  from (
    select q.id, random() as random_order
    from public.questions q
    where q.subject = p_subject
    order by random_order
    limit v_wanted
  ) as selected;

  return public.secure_test_state(v_attempt.id);
end;
$$;

create or replace function public.submit_secure_test_answer(
  p_attempt_id uuid,
  p_position integer,
  p_answer integer
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_attempt public.secure_test_attempts%rowtype;
  v_prior_answer integer;
  v_answered_at timestamptz;
begin
  if auth.uid() is null then
    raise exception 'Authentication required';
  end if;

  if p_answer is null or p_answer not between 0 and 3 then
    raise exception 'Invalid answer';
  end if;

  select * into v_attempt
  from public.secure_test_attempts
  where id = p_attempt_id and user_id = auth.uid()
  for update;

  if not found then
    raise exception 'Attempt not found';
  end if;

  if v_attempt.finished_at is not null then
    raise exception 'Attempt is already finished';
  end if;

  select answer, answered_at
  into v_prior_answer, v_answered_at
  from public.secure_test_items
  where attempt_id = v_attempt.id and position = p_position
  for update;

  if not found then
    raise exception 'Question not found';
  end if;

  if v_answered_at is not null then
    if v_prior_answer = p_answer then
      return public.secure_test_state(v_attempt.id);
    end if;
    raise exception 'This question has already been answered';
  end if;

  if v_attempt.expires_at is not null and now() >= v_attempt.expires_at then
    raise exception 'Timed test has expired';
  end if;

  update public.secure_test_items
  set answer = p_answer, answered_at = now()
  where attempt_id = v_attempt.id and position = p_position;

  return public.secure_test_state(v_attempt.id);
end;
$$;

-- ---------------------------------------------------------------------------
-- Explicit RPC permissions. No client can directly write secure attempts,
-- question answers, test results, or score/streak aggregates.
-- ---------------------------------------------------------------------------

revoke all on function public.ensure_my_user_stats() from public, anon;
revoke all on function public.update_my_study_tasks(text[], integer[]) from public, anon;
revoke all on function public.admin_list_questions(text, text, integer, integer) from public, anon;
revoke all on function public.admin_insert_question(text, text, text, text, text, text, integer, text, text) from public, anon;
revoke all on function public.admin_update_question(uuid, text, text, text, text, text, text, integer, text) from public, anon;
revoke all on function public.admin_delete_question(uuid) from public, anon;
revoke all on function public.admin_import_questions(jsonb) from public, anon;
revoke all on function public.toggle_bookmark(uuid) from public, anon;
revoke all on function public.secure_test_state(uuid) from public, anon;
revoke all on function public.start_secure_test(text, text) from public, anon;
revoke all on function public.submit_secure_test_answer(uuid, integer, integer) from public, anon;
revoke all on function public.finalize_secure_test(uuid) from public, anon;

grant execute on function public.ensure_my_user_stats() to authenticated;
grant execute on function public.update_my_study_tasks(text[], integer[]) to authenticated;
grant execute on function public.admin_list_questions(text, text, integer, integer) to authenticated;
grant execute on function public.admin_insert_question(text, text, text, text, text, text, integer, text, text) to authenticated;
grant execute on function public.admin_update_question(uuid, text, text, text, text, text, text, integer, text) to authenticated;
grant execute on function public.admin_delete_question(uuid) to authenticated;
grant execute on function public.admin_import_questions(jsonb) to authenticated;
grant execute on function public.toggle_bookmark(uuid) to authenticated;
grant execute on function public.secure_test_state(uuid) to authenticated;
grant execute on function public.start_secure_test(text, text) to authenticated;
grant execute on function public.submit_secure_test_answer(uuid, integer, integer) to authenticated;
grant execute on function public.finalize_secure_test(uuid) to authenticated;

comment on table public.secure_test_attempts is
  'V2 server-owned mock-test attempts. Client access is exclusively through owner-checked RPCs.';
comment on table public.secure_test_items is
  'V2 server-owned question order and submitted answers. Correct answers are never stored in client-controlled state.';


-- The leaderboard is intentionally shared with signed-in students only.
revoke all on function public.get_leaderboard() from public, anon;
grant execute on function public.get_leaderboard() to authenticated;
