-- V2 ONLY. Review and test against a disposable V2 schema before deployment.
-- This migration must never be applied to PrepPath V1.
create table if not exists public.secure_test_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  subject text not null,
  mode text not null check (mode in ('20-questions','50-questions','timed-mode')),
  started_at timestamptz not null default now(),
  expires_at timestamptz,
  finished_at timestamptz,
  result_id uuid unique,
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
create index if not exists secure_test_attempts_user_idx
  on public.secure_test_attempts (user_id, started_at desc);

alter table public.secure_test_attempts enable row level security;
alter table public.secure_test_items enable row level security;
revoke all on public.secure_test_attempts, public.secure_test_items from anon, authenticated;
-- No table-level access: only security-definer RPCs may read/write attempts.
-- Correct answers must never be available via the public questions table.
revoke select on public.questions from anon, authenticated;
grant select (id, subject, question, option_a, option_b, option_c, option_d, difficulty, created_at)
  on public.questions to authenticated;
-- Existing public question-reading pages must be migrated before applying this.

create or replace function public.secure_test_state(p_attempt_id uuid)
returns jsonb language plpgsql security definer set search_path = ''
as $$
declare a public.secure_test_attempts%rowtype;
begin
  if auth.uid() is null then raise exception 'Authentication required'; end if;
  select * into a from public.secure_test_attempts where id = p_attempt_id and user_id = auth.uid();
  if not found then raise exception 'Attempt not found'; end if;
  return jsonb_build_object(
    'attempt_id', a.id, 'subject', a.subject, 'mode', a.mode,
    'expires_at', a.expires_at, 'finished', a.finished_at is not null,
    'questions', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', q.id, 'question', q.question,
        'option_a', q.option_a, 'option_b', q.option_b,
        'option_c', q.option_c, 'option_d', q.option_d,
        'position', i.position, 'selected', i.answer,
        'correct', case when a.finished_at is not null then i.answer = q.correct_answer else null end,
        'correct_answer', case when a.finished_at is not null then q.correct_answer else null end,
        'explanation', case when a.finished_at is not null then q.explanation else null end
      ) order by i.position)
      from public.secure_test_items i
      join public.questions q on q.id = i.question_id
      where i.attempt_id = a.id
    ), '[]'::jsonb),
    'score', case when a.finished_at is null then null else (
      select count(*) from public.secure_test_items i join public.questions q on q.id=i.question_id
      where i.attempt_id=a.id and i.answer=q.correct_answer
    ) end
  );
end $$;

create or replace function public.start_secure_test(p_subject text, p_mode text)
returns jsonb language plpgsql security definer set search_path = ''
as $$
declare a public.secure_test_attempts%rowtype;
declare wanted integer;
declare selected_count integer;
begin
  if auth.uid() is null then raise exception 'Authentication required'; end if;
  if p_mode is null or p_mode not in ('20-questions','50-questions','timed-mode') then raise exception 'Invalid mode'; end if;
  if p_subject is null or length(trim(p_subject))=0 then raise exception 'Invalid subject'; end if;
  -- Serialize concurrent starts for one student/subject/mode.
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(auth.uid()::text || ':' || p_subject || ':' || p_mode, 0));
  wanted := case when p_mode='50-questions' then 50 else 20 end;
  -- Reuse the most recent unfinished attempt for this user/subject/mode.
  select * into a from public.secure_test_attempts
    where user_id=auth.uid() and subject=p_subject and mode=p_mode and finished_at is null
    order by started_at desc limit 1;
  if found then return public.secure_test_state(a.id); end if;
  select count(*) into selected_count from public.questions where subject=p_subject;
  if selected_count=0 then raise exception 'No questions for subject'; end if;
  insert into public.secure_test_attempts(user_id,subject,mode,expires_at)
    values(auth.uid(),p_subject,p_mode,
      case when p_mode='timed-mode' then now()+interval '20 minutes' else null end)
    returning * into a;
  insert into public.secure_test_items(attempt_id,position,question_id)
    select a.id, row_number() over () - 1, id
    from (select id from public.questions where subject=p_subject order by random() limit wanted) s;
  return public.secure_test_state(a.id);
end $$;

create or replace function public.submit_secure_test_answer(p_attempt_id uuid, p_position integer, p_answer integer)
returns jsonb language plpgsql security definer set search_path = ''
as $$
declare a public.secure_test_attempts%rowtype;
declare prior integer;
declare prior_at timestamptz;
begin
  if auth.uid() is null then raise exception 'Authentication required'; end if;
  if p_answer is null or p_answer not between 0 and 3 then raise exception 'Invalid answer'; end if;
  select * into a from public.secure_test_attempts
    where id=p_attempt_id and user_id=auth.uid() for update;
  if not found then raise exception 'Attempt not found'; end if;
  if a.finished_at is not null then raise exception 'Attempt closed'; end if;
  -- Network retries with the same answer are safe even after expiry.
  -- New answers cannot be submitted after expiry.
  select answer, answered_at into prior, prior_at from public.secure_test_items
    where attempt_id=a.id and position=p_position for update;
  if not found then raise exception 'Question not found'; end if;
  if prior_at is not null then
    if prior = p_answer then return jsonb_build_object('saved',true,'duplicate',true); end if;
    raise exception 'Answer already submitted';
  end if;
  if a.expires_at is not null and now() >= a.expires_at then raise exception 'Attempt expired'; end if;
  update public.secure_test_items set answer=p_answer, answered_at=now()
    where attempt_id=a.id and position=p_position;
  return jsonb_build_object('saved',true,'duplicate',false);
end $$;

create or replace function public.finalize_secure_test(p_attempt_id uuid)
returns jsonb language plpgsql security definer set search_path = ''
as $$
declare a public.secure_test_attempts%rowtype;
declare correct_count integer;
declare question_count integer;
declare new_result uuid;
begin
  if auth.uid() is null then raise exception 'Authentication required'; end if;
  select * into a from public.secure_test_attempts
    where id=p_attempt_id and user_id=auth.uid() for update;
  if not found then raise exception 'Attempt not found'; end if;
  if a.finished_at is not null then return public.secure_test_state(a.id); end if;
  select count(*), count(*) filter (where i.answer=q.correct_answer)
    into question_count,correct_count
    from public.secure_test_items i join public.questions q on q.id=i.question_id
    where i.attempt_id=a.id;
  insert into public.test_results(user_id,subject,score,total_questions,correct_answers)
    values(a.user_id,a.subject,correct_count,question_count,correct_count)
    returning id into new_result;
  update public.secure_test_attempts set finished_at=now(),result_id=new_result where id=a.id;
  -- Aggregate statistics are computed from trusted result rows, never browser scores.
  update public.user_stats set
    total_tests=(select count(*) from public.test_results where user_id=a.user_id),
    accuracy=coalesce((select round(100.0*sum(score)/nullif(sum(total_questions),0))
      from public.test_results where user_id=a.user_id),0),
    last_active_date=current_date
    where user_id=a.user_id;
  return public.secure_test_state(a.id);
end $$;

revoke all on function public.secure_test_state(uuid) from public, anon;
revoke all on function public.start_secure_test(text,text) from public, anon;
revoke all on function public.submit_secure_test_answer(uuid,integer,integer) from public, anon;
revoke all on function public.finalize_secure_test(uuid) from public, anon;
grant execute on function public.secure_test_state(uuid) to authenticated;
grant execute on function public.start_secure_test(text,text) to authenticated;
grant execute on function public.submit_secure_test_answer(uuid,integer,integer) to authenticated;
grant execute on function public.finalize_secure_test(uuid) to authenticated;
-- Block direct student writes to authoritative scores and aggregates.
-- Service-role and SECURITY DEFINER functions continue to use privileged access.
revoke insert, update, delete on public.test_results from anon, authenticated;
revoke insert, update, delete on public.user_stats from anon, authenticated;
-- Remove any permissive legacy policies allowing direct result creation or stats forgery.
-- Existing policies must be inspected by name before deployment; REVOKE does not
-- override future grants or other SECURITY DEFINER functions.

-- Only the owner can read their own results, regardless of older permissive SELECT policies.
-- NOTE: PostgreSQL permissive policies combine with OR. Audit and remove any
-- existing broad SELECT policies before applying this migration.

-- The original practice bookmarks page reads correct_answer and explanation.
-- That page requires a separate server-mediated feedback workflow before rollout.
-- DO NOT APPLY THIS MIGRATION UNTIL THE FULL DEPENDENCY AUDIT IS COMPLETE.
