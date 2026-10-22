


SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE SCHEMA IF NOT EXISTS "public";


ALTER SCHEMA "public" OWNER TO "pg_database_owner";


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE OR REPLACE FUNCTION "public"."check_signup_email_status"("p_email" "text") RETURNS "text"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public', 'auth'
    AS $$
declare
  account_record auth.users%rowtype;
begin
  select *
  into account_record
  from auth.users
  where lower(email) = lower(trim(p_email))
  limit 1;

  if not found then
    return 'not_found';
  end if;

  if account_record.email_confirmed_at is null then
    return 'unconfirmed';
  end if;

  return 'confirmed';
end;
$$;


ALTER FUNCTION "public"."check_signup_email_status"("p_email" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."complete_ai_message"("p_user_id" "uuid", "p_usage_date" "date") RETURNS boolean
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO ''
    AS $$
DECLARE
  v_updated INTEGER;
BEGIN
  UPDATE public.ai_daily_usage
  SET
    messages_reserved = messages_reserved - 1,
    messages_used = messages_used + 1,
    updated_at = now()
  WHERE user_id = p_user_id
    AND usage_date = p_usage_date
    AND messages_reserved > 0;

  GET DIAGNOSTICS v_updated = ROW_COUNT;
  RETURN v_updated = 1;
END;
$$;


ALTER FUNCTION "public"."complete_ai_message"("p_user_id" "uuid", "p_usage_date" "date") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."consume_quiz_attempt"() RETURNS "jsonb"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO ''
    AS $$declare
  current_user_id uuid;
begin
  current_user_id := auth.uid();

  if current_user_id is null then
    raise exception 'Authentication required';
  end if;

  if not exists (
    select 1
    from public.profiles
    where id = current_user_id
  ) then
    raise exception 'Profile not found';
  end if;

  return jsonb_build_object(
    'allowed', true,
    'remaining', null
  );
end;$$;


ALTER FUNCTION "public"."consume_quiz_attempt"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_leaderboard"() RETURNS TABLE("user_id" "uuid", "display_name" "text", "accuracy" numeric, "total_tests" integer, "streak" integer)
    LANGUAGE "sql" SECURITY DEFINER
    SET "search_path" TO ''
    AS $$
  SELECT
    s.user_id,
    btrim(p.display_name) AS display_name,
    COALESCE(s.accuracy, 0)::numeric AS accuracy,
    COALESCE(s.total_tests, 0)::integer AS total_tests,
    COALESCE(s.streak, 0)::integer AS streak
  FROM public.user_stats AS s
  JOIN public.profiles AS p ON p.id = s.user_id
  WHERE auth.uid() IS NOT NULL
    AND NULLIF(btrim(p.display_name), '') IS NOT NULL;
$$;


ALTER FUNCTION "public"."get_leaderboard"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_study_resource_display_names"() RETURNS TABLE("user_id" "uuid", "display_name" "text")
    LANGUAGE "sql" STABLE SECURITY DEFINER
    SET "search_path" TO ''
    AS $$
  select
    p.id as user_id,
    coalesce(
      nullif(btrim(p.display_name), ''),
      nullif(btrim(p.name), ''),
      'Student'
    ) as display_name
  from public.profiles p
  where auth.uid() is not null
    and (
      exists (
        select 1
        from public.study_resources r
        where r.user_id = p.id
          and r.status = 'approved'
      )
      or exists (
        select 1
        from public.study_resource_comments c
        join public.study_resources r
          on r.id = c.resource_id
        where c.user_id = p.id
          and r.status = 'approved'
      )
    );
$$;


ALTER FUNCTION "public"."get_study_resource_display_names"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
SET search_path = ''
AS $$
begin
  insert into public.profiles (
    id,
    email,
    name,
    display_name,
    city,
    dob,
    target_university,
    avatar_url,
    dark_mode,
    email_reminders,
    exam_notifications,
    animations,
    daily_goal,
    study_time
  )
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', ''),
    coalesce(new.raw_user_meta_data->>'display_name', ''),
    coalesce(new.raw_user_meta_data->>'city', ''),
    nullif(new.raw_user_meta_data->>'dob', '')::date,
    coalesce(new.raw_user_meta_data->>'target_university', ''),
    '',
    false,
    false,
    false,
    true,
    50,
    ''
  );

  return new;
end;
$$;


ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."increment_quiz_attempts"("user_id" "uuid") RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
begin
  update profiles
  set quizzes_today = quizzes_today + 1
  where id = user_id;
end;
$$;


ALTER FUNCTION "public"."increment_quiz_attempts"("user_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."is_prep_path_admin"() RETURNS boolean
    LANGUAGE "sql" STABLE SECURITY DEFINER
    SET "search_path" TO ''
    AS $$
  select exists (
    select 1
    from public.profiles p
    where p.id = (select auth.uid())
      and p.is_admin is true
  );
$$;


ALTER FUNCTION "public"."is_prep_path_admin"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."mark_admin_chat_read"("p_conversation_id" "uuid") RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO ''
    AS $$
declare
  v_user_id uuid := auth.uid();
  v_student_id uuid;
  v_is_admin boolean;
begin
  if v_user_id is null then
    raise exception 'Authentication required'
      using errcode = '42501';
  end if;

  select c.student_id
  into v_student_id
  from public.admin_chat_conversations c
  where c.id = p_conversation_id;

  if not found then
    raise exception 'Conversation not found'
      using errcode = '42501';
  end if;

  select coalesce(p.is_admin, false)
  into v_is_admin
  from public.profiles p
  where p.id = v_user_id;

  if coalesce(v_is_admin, false) then
    update public.admin_chat_conversations
    set admin_last_read_at = now()
    where id = p_conversation_id;

  elsif v_student_id = v_user_id then
    update public.admin_chat_conversations
    set student_last_read_at = now()
    where id = p_conversation_id;

  else
    raise exception 'Access denied'
      using errcode = '42501';
  end if;
end;
$$;


ALTER FUNCTION "public"."mark_admin_chat_read"("p_conversation_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."notify_resource_comment"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO ''
    AS $$
declare
  resource_owner uuid;
  resource_title text;
  actor_name text;
begin
  select r.user_id, r.title
  into resource_owner, resource_title
  from public.study_resources r
  where r.id = new.resource_id
    and r.status = 'approved';

  if resource_owner is null
     or resource_owner = new.user_id then
    return new;
  end if;

  select coalesce(
    nullif(trim(p.display_name), ''),
    nullif(trim(p.name), ''),
    'A student'
  )
  into actor_name
  from public.profiles p
  where p.id = new.user_id;

  actor_name := coalesce(actor_name, 'A student');

  insert into public.notifications (
    user_id,
    title,
    message,
    type,
    source_key
  )
  values (
    resource_owner,
    'New Resource Comment',
    actor_name || ' commented on your study resource "' ||
      coalesce(resource_title, 'Untitled Resource') || '".',
    'resource_comment',
    'resource_comment:' || new.id::text
  );

  return new;
end;
$$;


ALTER FUNCTION "public"."notify_resource_comment"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."notify_resource_like"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO ''
    AS $$
declare
  resource_owner uuid;
  resource_title text;
  actor_name text;
begin
  select r.user_id, r.title
  into resource_owner, resource_title
  from public.study_resources r
  where r.id = new.resource_id
    and r.status = 'approved';

  if resource_owner is null
     or resource_owner = new.user_id then
    return new;
  end if;

  select coalesce(
    nullif(trim(p.display_name), ''),
    nullif(trim(p.name), ''),
    'A student'
  )
  into actor_name
  from public.profiles p
  where p.id = new.user_id;

  actor_name := coalesce(actor_name, 'A student');

  insert into public.notifications (
    user_id,
    title,
    message,
    type,
    source_key
  )
  values (
    resource_owner,
    'New Resource Like',
    actor_name || ' liked your study resource "' ||
      coalesce(resource_title, 'Untitled Resource') || '".',
    'resource_like',
    'resource_like:' || new.resource_id::text ||
      ':' || new.user_id::text
  );

  return new;
end;
$$;


ALTER FUNCTION "public"."notify_resource_like"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."release_ai_message"("p_user_id" "uuid", "p_usage_date" "date") RETURNS boolean
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO ''
    AS $$
DECLARE
  v_updated INTEGER;
BEGIN
  UPDATE public.ai_daily_usage
  SET
    messages_reserved = messages_reserved - 1,
    updated_at = now()
  WHERE user_id = p_user_id
    AND usage_date = p_usage_date
    AND messages_reserved > 0;

  GET DIAGNOSTICS v_updated = ROW_COUNT;
  RETURN v_updated = 1;
END;
$$;


ALTER FUNCTION "public"."release_ai_message"("p_user_id" "uuid", "p_usage_date" "date") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."reserve_ai_message"("p_user_id" "uuid") RETURNS "date"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO ''
    AS $$
DECLARE
  v_date DATE := (now() AT TIME ZONE 'UTC')::date;
  v_reserved_date DATE;
BEGIN
  INSERT INTO public.ai_daily_usage AS usage (
    user_id,
    usage_date,
    messages_used,
    messages_reserved,
    updated_at
  )
  VALUES (p_user_id, v_date, 0, 1, now())
  ON CONFLICT (user_id, usage_date)
  DO UPDATE SET
    messages_reserved = usage.messages_reserved + 1,
    updated_at = now()
  WHERE usage.messages_used + usage.messages_reserved < 10
  RETURNING usage_date INTO v_reserved_date;

  RETURN v_reserved_date;
END;
$$;


ALTER FUNCTION "public"."reserve_ai_message"("p_user_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."review_study_resource"("resource_id" "uuid", "decision" "text") RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO ''
    AS $$
declare
  caller_is_admin boolean;
begin
  -- Only an authenticated admin can review resources.
  if auth.uid() is null then
    raise exception 'Authentication required';
  end if;

  select is_admin
  into caller_is_admin
  from public.profiles
  where id = auth.uid();

  if coalesce(caller_is_admin, false) = false then
    raise exception 'Admin access required';
  end if;

  -- Only approval and rejection are valid decisions.
  if decision not in ('approved', 'rejected') then
    raise exception 'Invalid review decision';
  end if;

  -- Review only a resource that is still pending.
  update public.study_resources
  set
    status = decision,
    reviewed_at = now()
  where id = resource_id
    and status = 'pending';

  if not found then
    raise exception 'Pending resource not found';
  end if;
end;
$$;


ALTER FUNCTION "public"."review_study_resource"("resource_id" "uuid", "decision" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."review_study_resource_report"("report_id" "uuid", "decision" "text") RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO ''
    AS $$
declare
  current_admin_id uuid;
  target_report public.study_resource_reports%rowtype;
begin
  current_admin_id := (select auth.uid());

  -- Only authenticated admins may review reports.
  if current_admin_id is null or not exists (
    select 1
    from public.profiles p
    where p.id = current_admin_id
      and p.is_admin = true
  ) then
    raise exception 'Admin access required';
  end if;

  if decision not in ('dismissed', 'content_removed') then
    raise exception 'Invalid review decision';
  end if;

  -- Lock the report so it cannot be reviewed twice concurrently.
  select *
  into target_report
  from public.study_resource_reports
  where id = report_id
  for update;

  if not found then
    raise exception 'Report not found';
  end if;

  if target_report.status <> 'pending' then
    raise exception 'This report has already been reviewed';
  end if;

  if decision = 'content_removed' then
    if target_report.target_type = 'resource' then

      -- Remove the resource from the approved community library.
      update public.study_resources
      set status = 'rejected'
      where id = target_report.resource_id
        and status = 'approved';

      if not found then
        raise exception 'Resource is no longer approved or does not exist';
      end if;

    elsif target_report.target_type = 'comment' then

      -- Replace only the reported comment's text.
      -- Keep its row so replies are not deleted by ON DELETE CASCADE.
      update public.study_resource_comments
      set content = '[Comment removed by admin]'
      where id = target_report.comment_id
        and resource_id = target_report.resource_id;

      if not found then
        raise exception 'Comment no longer exists';
      end if;

    else
      raise exception 'Invalid report target';
    end if;
  end if;

  -- Record the admin's decision.
  update public.study_resource_reports
  set
    status = decision,
    reviewed_at = now(),
    reviewed_by = current_admin_id
  where id = target_report.id;
end;
$$;


ALTER FUNCTION "public"."review_study_resource_report"("report_id" "uuid", "decision" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."toggle_bookmark"("target_question_id" "uuid") RETURNS "jsonb"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO ''
    AS $$declare
  current_user_id uuid;
  existing_bookmark_id uuid;
begin
  -- Require authentication.
  current_user_id := auth.uid();

  if current_user_id is null then
    raise exception 'Authentication required';
  end if;

  -- Confirm that the user's profile exists.
  if not exists (
    select 1
    from public.profiles
    where id = current_user_id
  ) then
    raise exception 'Profile not found';
  end if;

  -- Remove the bookmark if it already exists.
  select id
  into existing_bookmark_id
  from public.bookmarked_questions
  where user_id = current_user_id
    and question_id = target_question_id
  limit 1;

  if existing_bookmark_id is not null then
    delete from public.bookmarked_questions
    where id = existing_bookmark_id
      and user_id = current_user_id;

    return jsonb_build_object(
      'bookmarked', false,
      'limitReached', false
    );
  end if;

  -- Otherwise, save the bookmark without a limit.
  insert into public.bookmarked_questions (
    user_id,
    question_id
  )
  values (
    current_user_id,
    target_question_id
  );

  return jsonb_build_object(
    'bookmarked', true,
    'limitReached', false
  );
end;$$;


ALTER FUNCTION "public"."toggle_bookmark"("target_question_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."touch_admin_chat_conversation"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO ''
    AS $$
begin
  update public.admin_chat_conversations
  set updated_at = now()
  where id = new.conversation_id;

  return new;
end;
$$;


ALTER FUNCTION "public"."touch_admin_chat_conversation"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."achievements" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "title" "text",
    "description" "text",
    "xp" integer
);


ALTER TABLE "public"."achievements" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."admin_chat_conversations" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "student_id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "student_last_read_at" timestamp with time zone,
    "admin_last_read_at" timestamp with time zone
);


ALTER TABLE "public"."admin_chat_conversations" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."admin_chat_messages" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "conversation_id" "uuid" NOT NULL,
    "sender_id" "uuid" NOT NULL,
    "content" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "admin_chat_messages_content_check" CHECK ((("char_length"("btrim"("content")) >= 1) AND ("char_length"("btrim"("content")) <= 2000)))
);


ALTER TABLE "public"."admin_chat_messages" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."ai_daily_usage" (
    "user_id" "uuid" NOT NULL,
    "usage_date" "date" DEFAULT ("timezone"('utc'::"text", "now"()))::"date" NOT NULL,
    "messages_used" integer DEFAULT 0 NOT NULL,
    "messages_reserved" integer DEFAULT 0 NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "ai_daily_usage_messages_reserved_check" CHECK (("messages_reserved" >= 0)),
    CONSTRAINT "ai_daily_usage_messages_used_check" CHECK (("messages_used" >= 0))
);


ALTER TABLE "public"."ai_daily_usage" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."bookmarked_questions" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid",
    "question_id" "uuid",
    "created_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."bookmarked_questions" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."bookmarks" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid",
    "subject" "text" NOT NULL,
    "question" "text" NOT NULL,
    "options" "jsonb" NOT NULL,
    "correct_answer" integer NOT NULL,
    "explanation" "text",
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."bookmarks" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."daily_quiz_usage" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid",
    "date" "date",
    "quizzes_taken" integer DEFAULT 0
);


ALTER TABLE "public"."daily_quiz_usage" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."notifications" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "exam_id" "uuid",
    "message" "text" NOT NULL,
    "days_before" integer,
    "is_read" boolean DEFAULT false,
    "created_at" timestamp without time zone DEFAULT "now"(),
    "title" "text" DEFAULT 'Notification'::"text",
    "type" "text" DEFAULT 'general'::"text",
    "source_key" "text"
);


ALTER TABLE "public"."notifications" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."premium_requests" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "amount" integer DEFAULT 500 NOT NULL,
    "payment_method" "text" NOT NULL,
    "transaction_id" "text" NOT NULL,
    "status" "text" DEFAULT 'pending'::"text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "reviewed_at" timestamp with time zone,
    CONSTRAINT "premium_requests_amount_check" CHECK (("amount" > 0)),
    CONSTRAINT "premium_requests_status_check" CHECK (("status" = ANY (ARRAY['pending'::"text", 'approved'::"text", 'rejected'::"text"])))
);


ALTER TABLE "public"."premium_requests" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "id" "uuid" NOT NULL,
    "name" "text",
    "created_at" timestamp without time zone DEFAULT "now"(),
    "avatar_url" "text",
    "city" "text",
    "target_university" "text",
    "dob" "date",
    "dark_mode" boolean DEFAULT false,
    "email_reminders" boolean DEFAULT true,
    "exam_notifications" boolean DEFAULT true,
    "animations" boolean DEFAULT true,
    "daily_goal" integer,
    "study_time" "text",
    "email" "text",
    "favorite_universities" "text"[],
    "favorite_subjects" "text"[],
    "default_test_length" integer DEFAULT 20,
    "subscription_end" timestamp without time zone,
    "xp" integer DEFAULT 0,
    "level" integer DEFAULT 1,
    "total_points" integer DEFAULT 0,
    "quizzes_today" integer DEFAULT 0,
    "last_quiz_date" "date" DEFAULT CURRENT_DATE,
    "is_admin" boolean DEFAULT false,
    "display_name" "text"
);


ALTER TABLE "public"."profiles" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."questions" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "subject" "text" NOT NULL,
    "question" "text" NOT NULL,
    "option_a" "text" NOT NULL,
    "option_b" "text" NOT NULL,
    "option_c" "text" NOT NULL,
    "option_d" "text" NOT NULL,
    "correct_answer" integer NOT NULL,
    "explanation" "text",
    "difficulty" "text" DEFAULT 'Medium'::"text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "questions_correct_answer_check" CHECK ((("correct_answer" >= 0) AND ("correct_answer" <= 3)))
);


ALTER TABLE "public"."questions" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."study_resource_comments" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "resource_id" "uuid" NOT NULL,
    "user_id" "uuid" NOT NULL,
    "content" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "parent_comment_id" "uuid",
    CONSTRAINT "study_resource_comments_content_check" CHECK ((("char_length"("btrim"("content")) >= 1) AND ("char_length"("btrim"("content")) <= 1000)))
);


ALTER TABLE "public"."study_resource_comments" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."study_resource_likes" (
    "resource_id" "uuid" NOT NULL,
    "user_id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."study_resource_likes" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."study_resource_reports" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "reporter_id" "uuid" NOT NULL,
    "resource_id" "uuid" NOT NULL,
    "comment_id" "uuid",
    "target_type" "text" NOT NULL,
    "reason" "text" NOT NULL,
    "details" "text",
    "status" "text" DEFAULT 'pending'::"text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "reviewed_at" timestamp with time zone,
    "reviewed_by" "uuid",
    CONSTRAINT "report_review_fields_match_status" CHECK (((("status" = 'pending'::"text") AND ("reviewed_at" IS NULL) AND ("reviewed_by" IS NULL)) OR (("status" <> 'pending'::"text") AND ("reviewed_at" IS NOT NULL) AND ("reviewed_by" IS NOT NULL)))),
    CONSTRAINT "report_target_matches_type" CHECK (((("target_type" = 'resource'::"text") AND ("comment_id" IS NULL)) OR (("target_type" = 'comment'::"text") AND ("comment_id" IS NOT NULL)))),
    CONSTRAINT "study_resource_reports_details_check" CHECK ((("details" IS NULL) OR ("char_length"("details") <= 500))),
    CONSTRAINT "study_resource_reports_reason_check" CHECK (("reason" = ANY (ARRAY['spam'::"text", 'inappropriate_content'::"text", 'misleading_information'::"text", 'personal_information'::"text", 'copyright'::"text", 'other'::"text"]))),
    CONSTRAINT "study_resource_reports_status_check" CHECK (("status" = ANY (ARRAY['pending'::"text", 'dismissed'::"text", 'content_removed'::"text"]))),
    CONSTRAINT "study_resource_reports_target_type_check" CHECK (("target_type" = ANY (ARRAY['resource'::"text", 'comment'::"text"])))
);


ALTER TABLE "public"."study_resource_reports" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."study_resources" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "title" "text" NOT NULL,
    "description" "text",
    "subject" "text" NOT NULL,
    "resource_url" "text" NOT NULL,
    "status" "text" DEFAULT 'pending'::"text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "reviewed_at" timestamp with time zone,
    "resource_type" "text" DEFAULT 'link'::"text" NOT NULL,
    CONSTRAINT "study_resources_resource_type_check" CHECK (("resource_type" = ANY (ARRAY['pdf'::"text", 'image'::"text", 'drive'::"text", 'youtube'::"text"]))),
    CONSTRAINT "study_resources_status_check" CHECK (("status" = ANY (ARRAY['pending'::"text", 'approved'::"text", 'rejected'::"text"])))
);


ALTER TABLE "public"."study_resources" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."subscriptions" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid",
    "plan" "text",
    "price" integer,
    "status" "text",
    "started_at" timestamp without time zone DEFAULT "now"(),
    "expires_at" timestamp without time zone
);


ALTER TABLE "public"."subscriptions" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."test_results" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid",
    "score" integer,
    "total" integer,
    "subject" "text",
    "created_at" timestamp without time zone DEFAULT "now"(),
    "total_questions" integer NOT NULL,
    "correct_answers" integer NOT NULL
);


ALTER TABLE "public"."test_results" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."upcoming_exams" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "user_id" "uuid",
    "exam_name" "text",
    "exam_date" "date",
    "created_at" timestamp without time zone DEFAULT "now"(),
    "last_notified" "date",
    "exam_type" "text" DEFAULT 'Admission Test'::"text"
);


ALTER TABLE "public"."upcoming_exams" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."user_achievements" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid",
    "achievement_id" "uuid",
    "earned_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."user_achievements" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."user_stats" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid",
    "accuracy" double precision DEFAULT 0,
    "streak" integer DEFAULT 0,
    "total_tests" integer DEFAULT 0,
    "created_at" timestamp without time zone DEFAULT "now"(),
    "last_active_date" "date",
    "tasks" "text"[],
    "completed_tasks" integer[] DEFAULT '{}'::integer[]
);


ALTER TABLE "public"."user_stats" OWNER TO "postgres";


ALTER TABLE ONLY "public"."achievements"
    ADD CONSTRAINT "achievements_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."admin_chat_conversations"
    ADD CONSTRAINT "admin_chat_conversations_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."admin_chat_conversations"
    ADD CONSTRAINT "admin_chat_conversations_student_id_key" UNIQUE ("student_id");



ALTER TABLE ONLY "public"."admin_chat_messages"
    ADD CONSTRAINT "admin_chat_messages_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."ai_daily_usage"
    ADD CONSTRAINT "ai_daily_usage_pkey" PRIMARY KEY ("user_id", "usage_date");



ALTER TABLE ONLY "public"."bookmarked_questions"
    ADD CONSTRAINT "bookmarked_questions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."bookmarks"
    ADD CONSTRAINT "bookmarks_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."daily_quiz_usage"
    ADD CONSTRAINT "daily_quiz_usage_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."notifications"
    ADD CONSTRAINT "notifications_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."notifications"
    ADD CONSTRAINT "notifications_user_id_exam_id_days_before_key" UNIQUE ("user_id", "exam_id", "days_before");



ALTER TABLE ONLY "public"."premium_requests"
    ADD CONSTRAINT "premium_requests_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."questions"
    ADD CONSTRAINT "questions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."study_resource_comments"
    ADD CONSTRAINT "study_resource_comments_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."study_resource_likes"
    ADD CONSTRAINT "study_resource_likes_pkey" PRIMARY KEY ("resource_id", "user_id");



ALTER TABLE ONLY "public"."study_resource_reports"
    ADD CONSTRAINT "study_resource_reports_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."study_resources"
    ADD CONSTRAINT "study_resources_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."subscriptions"
    ADD CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."test_results"
    ADD CONSTRAINT "test_results_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."upcoming_exams"
    ADD CONSTRAINT "upcoming_exams_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."user_achievements"
    ADD CONSTRAINT "user_achievements_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."user_stats"
    ADD CONSTRAINT "user_stats_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."user_stats"
    ADD CONSTRAINT "user_stats_user_id_key" UNIQUE ("user_id");



ALTER TABLE ONLY "public"."user_stats"
    ADD CONSTRAINT "user_stats_user_id_unique" UNIQUE ("user_id");



CREATE INDEX "admin_chat_conversations_updated_idx" ON "public"."admin_chat_conversations" USING "btree" ("updated_at" DESC);



CREATE INDEX "admin_chat_messages_conversation_created_idx" ON "public"."admin_chat_messages" USING "btree" ("conversation_id", "created_at", "id");



CREATE UNIQUE INDEX "notifications_user_source_key_unique" ON "public"."notifications" USING "btree" ("user_id", "source_key");



CREATE UNIQUE INDEX "premium_requests_one_pending_per_user" ON "public"."premium_requests" USING "btree" ("user_id") WHERE ("status" = 'pending'::"text");



CREATE INDEX "premium_requests_status_idx" ON "public"."premium_requests" USING "btree" ("status");



CREATE UNIQUE INDEX "premium_requests_transaction_id_unique" ON "public"."premium_requests" USING "btree" ("transaction_id");



CREATE INDEX "premium_requests_user_id_idx" ON "public"."premium_requests" USING "btree" ("user_id");



CREATE INDEX "study_resource_comments_parent_comment_id_idx" ON "public"."study_resource_comments" USING "btree" ("parent_comment_id");



CREATE INDEX "study_resource_comments_resource_id_created_at_idx" ON "public"."study_resource_comments" USING "btree" ("resource_id", "created_at");



CREATE UNIQUE INDEX "study_resource_reports_one_pending_report_per_target" ON "public"."study_resource_reports" USING "btree" ("reporter_id", "target_type", "resource_id", COALESCE("comment_id", '00000000-0000-0000-0000-000000000000'::"uuid")) WHERE ("status" = 'pending'::"text");



CREATE OR REPLACE TRIGGER "on_study_resource_commented" AFTER INSERT ON "public"."study_resource_comments" FOR EACH ROW EXECUTE FUNCTION "public"."notify_resource_comment"();



CREATE OR REPLACE TRIGGER "on_study_resource_liked" AFTER INSERT ON "public"."study_resource_likes" FOR EACH ROW EXECUTE FUNCTION "public"."notify_resource_like"();



CREATE OR REPLACE TRIGGER "touch_admin_chat_conversation_after_message" AFTER INSERT ON "public"."admin_chat_messages" FOR EACH ROW EXECUTE FUNCTION "public"."touch_admin_chat_conversation"();



ALTER TABLE ONLY "public"."admin_chat_conversations"
    ADD CONSTRAINT "admin_chat_conversations_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."admin_chat_messages"
    ADD CONSTRAINT "admin_chat_messages_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "public"."admin_chat_conversations"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."admin_chat_messages"
    ADD CONSTRAINT "admin_chat_messages_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."ai_daily_usage"
    ADD CONSTRAINT "ai_daily_usage_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."bookmarked_questions"
    ADD CONSTRAINT "bookmarked_questions_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "public"."questions"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."bookmarked_questions"
    ADD CONSTRAINT "bookmarked_questions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id");



ALTER TABLE ONLY "public"."bookmarks"
    ADD CONSTRAINT "bookmarks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."daily_quiz_usage"
    ADD CONSTRAINT "daily_quiz_usage_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."premium_requests"
    ADD CONSTRAINT "premium_requests_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id");



ALTER TABLE ONLY "public"."study_resource_comments"
    ADD CONSTRAINT "study_resource_comments_parent_comment_id_fkey" FOREIGN KEY ("parent_comment_id") REFERENCES "public"."study_resource_comments"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."study_resource_comments"
    ADD CONSTRAINT "study_resource_comments_resource_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "public"."study_resources"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."study_resource_comments"
    ADD CONSTRAINT "study_resource_comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."study_resource_likes"
    ADD CONSTRAINT "study_resource_likes_resource_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "public"."study_resources"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."study_resource_likes"
    ADD CONSTRAINT "study_resource_likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."study_resource_reports"
    ADD CONSTRAINT "study_resource_reports_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "public"."study_resource_comments"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."study_resource_reports"
    ADD CONSTRAINT "study_resource_reports_reporter_id_fkey" FOREIGN KEY ("reporter_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."study_resource_reports"
    ADD CONSTRAINT "study_resource_reports_resource_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "public"."study_resources"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."study_resource_reports"
    ADD CONSTRAINT "study_resource_reports_reviewed_by_fkey" FOREIGN KEY ("reviewed_by") REFERENCES "auth"."users"("id");



ALTER TABLE ONLY "public"."study_resources"
    ADD CONSTRAINT "study_resources_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."subscriptions"
    ADD CONSTRAINT "subscriptions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id");



ALTER TABLE ONLY "public"."test_results"
    ADD CONSTRAINT "test_results_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id");



ALTER TABLE ONLY "public"."upcoming_exams"
    ADD CONSTRAINT "upcoming_exams_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id");



ALTER TABLE ONLY "public"."user_achievements"
    ADD CONSTRAINT "user_achievements_achievement_id_fkey" FOREIGN KEY ("achievement_id") REFERENCES "public"."achievements"("id");



ALTER TABLE ONLY "public"."user_achievements"
    ADD CONSTRAINT "user_achievements_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id");



ALTER TABLE ONLY "public"."user_stats"
    ADD CONSTRAINT "user_stats_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id");



CREATE POLICY "Admins can delete questions" ON "public"."questions" FOR DELETE TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "public"."profiles"
  WHERE (("profiles"."id" = "auth"."uid"()) AND ("profiles"."is_admin" = true)))));



CREATE POLICY "Admins can insert questions" ON "public"."questions" FOR INSERT TO "authenticated" WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."profiles"
  WHERE (("profiles"."id" = "auth"."uid"()) AND ("profiles"."is_admin" = true)))));



CREATE POLICY "Admins can review community reports" ON "public"."study_resource_reports" FOR UPDATE TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "public"."profiles" "p"
  WHERE (("p"."id" = ( SELECT "auth"."uid"() AS "uid")) AND ("p"."is_admin" = true))))) WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."profiles" "p"
  WHERE (("p"."id" = ( SELECT "auth"."uid"() AS "uid")) AND ("p"."is_admin" = true)))));



CREATE POLICY "Admins can update questions" ON "public"."questions" FOR UPDATE TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "public"."profiles"
  WHERE (("profiles"."id" = "auth"."uid"()) AND ("profiles"."is_admin" = true))))) WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."profiles"
  WHERE (("profiles"."id" = "auth"."uid"()) AND ("profiles"."is_admin" = true)))));



CREATE POLICY "Admins can view all premium requests" ON "public"."premium_requests" FOR SELECT TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "public"."profiles"
  WHERE (("profiles"."id" = "auth"."uid"()) AND ("profiles"."is_admin" = true)))));



CREATE POLICY "Admins can view all study resources" ON "public"."study_resources" FOR SELECT TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "public"."profiles"
  WHERE (("profiles"."id" = ( SELECT "auth"."uid"() AS "uid")) AND ("profiles"."is_admin" = true)))));



CREATE POLICY "Admins can view community reports" ON "public"."study_resource_reports" FOR SELECT TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "public"."profiles" "p"
  WHERE (("p"."id" = ( SELECT "auth"."uid"() AS "uid")) AND ("p"."is_admin" = true)))));



CREATE POLICY "Admins can view profiles" ON "public"."profiles" FOR SELECT TO "authenticated" USING (( SELECT "public"."is_prep_path_admin"() AS "is_prep_path_admin"));



CREATE POLICY "Anyone can view questions" ON "public"."questions" FOR SELECT TO "authenticated" USING (true);



CREATE POLICY "Anyone logged in can read all stats" ON "public"."user_stats" FOR SELECT TO "authenticated" USING (true);



CREATE POLICY "Students and admins can send messages" ON "public"."admin_chat_messages" FOR INSERT TO "authenticated" WITH CHECK ((("sender_id" = ( SELECT "auth"."uid"() AS "uid")) AND (EXISTS ( SELECT 1
   FROM "public"."admin_chat_conversations" "c"
  WHERE (("c"."id" = "admin_chat_messages"."conversation_id") AND ((("c"."student_id" = ( SELECT "auth"."uid"() AS "uid")) AND (EXISTS ( SELECT 1
           FROM "public"."profiles" "p"
          WHERE (("p"."id" = ( SELECT "auth"."uid"() AS "uid")) AND ("p"."is_admin" = false))))) OR (EXISTS ( SELECT 1
           FROM "public"."profiles" "p"
          WHERE (("p"."id" = ( SELECT "auth"."uid"() AS "uid")) AND ("p"."is_admin" = true))))))))));



CREATE POLICY "Students and admins can view conversations" ON "public"."admin_chat_conversations" FOR SELECT TO "authenticated" USING ((("student_id" = ( SELECT "auth"."uid"() AS "uid")) OR (EXISTS ( SELECT 1
   FROM "public"."profiles" "p"
  WHERE (("p"."id" = ( SELECT "auth"."uid"() AS "uid")) AND ("p"."is_admin" = true))))));



CREATE POLICY "Students and admins can view messages" ON "public"."admin_chat_messages" FOR SELECT TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "public"."admin_chat_conversations" "c"
  WHERE (("c"."id" = "admin_chat_messages"."conversation_id") AND (("c"."student_id" = ( SELECT "auth"."uid"() AS "uid")) OR (EXISTS ( SELECT 1
           FROM "public"."profiles" "p"
          WHERE (("p"."id" = ( SELECT "auth"."uid"() AS "uid")) AND ("p"."is_admin" = true)))))))));



CREATE POLICY "Students can comment on approved resources" ON "public"."study_resource_comments" FOR INSERT TO "authenticated" WITH CHECK ((("user_id" = ( SELECT "auth"."uid"() AS "uid")) AND (EXISTS ( SELECT 1
   FROM "public"."study_resources" "r"
  WHERE (("r"."id" = "study_resource_comments"."resource_id") AND ("r"."status" = 'approved'::"text"))))));



CREATE POLICY "Students can create their own conversation" ON "public"."admin_chat_conversations" FOR INSERT TO "authenticated" WITH CHECK ((("student_id" = ( SELECT "auth"."uid"() AS "uid")) AND (EXISTS ( SELECT 1
   FROM "public"."profiles" "p"
  WHERE (("p"."id" = ( SELECT "auth"."uid"() AS "uid")) AND ("p"."is_admin" = false))))));



CREATE POLICY "Students can delete their own comments" ON "public"."study_resource_comments" FOR DELETE TO "authenticated" USING (("user_id" = ( SELECT "auth"."uid"() AS "uid")));



CREATE POLICY "Students can like approved resources" ON "public"."study_resource_likes" FOR INSERT TO "authenticated" WITH CHECK ((("user_id" = ( SELECT "auth"."uid"() AS "uid")) AND (EXISTS ( SELECT 1
   FROM "public"."study_resources" "r"
  WHERE (("r"."id" = "study_resource_likes"."resource_id") AND ("r"."status" = 'approved'::"text"))))));



CREATE POLICY "Students can read comments on approved resources" ON "public"."study_resource_comments" FOR SELECT TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "public"."study_resources" "r"
  WHERE (("r"."id" = "study_resource_comments"."resource_id") AND ("r"."status" = 'approved'::"text")))));



CREATE POLICY "Students can remove their own likes" ON "public"."study_resource_likes" FOR DELETE TO "authenticated" USING (("user_id" = ( SELECT "auth"."uid"() AS "uid")));



CREATE POLICY "Students can submit community reports" ON "public"."study_resource_reports" FOR INSERT TO "authenticated" WITH CHECK ((("reporter_id" = ( SELECT "auth"."uid"() AS "uid")) AND ("status" = 'pending'::"text") AND ("reviewed_at" IS NULL) AND ("reviewed_by" IS NULL) AND (EXISTS ( SELECT 1
   FROM "public"."study_resources" "r"
  WHERE (("r"."id" = "study_resource_reports"."resource_id") AND ("r"."status" = 'approved'::"text")))) AND (("target_type" = 'resource'::"text") OR (EXISTS ( SELECT 1
   FROM "public"."study_resource_comments" "c"
  WHERE (("c"."id" = "study_resource_reports"."comment_id") AND ("c"."resource_id" = "study_resource_reports"."resource_id")))))));



CREATE POLICY "Students can submit their own resources" ON "public"."study_resources" FOR INSERT TO "authenticated" WITH CHECK ((("user_id" = ( SELECT "auth"."uid"() AS "uid")) AND ("status" = 'pending'::"text") AND ("reviewed_at" IS NULL)));



CREATE POLICY "Students can view approved study resources" ON "public"."study_resources" FOR SELECT TO "authenticated" USING ((("status" = 'approved'::"text") OR ("user_id" = ( SELECT "auth"."uid"() AS "uid"))));



CREATE POLICY "Students can view likes on approved resources" ON "public"."study_resource_likes" FOR SELECT TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "public"."study_resources" "r"
  WHERE (("r"."id" = "study_resource_likes"."resource_id") AND ("r"."status" = 'approved'::"text")))));



CREATE POLICY "Users can create own premium requests" ON "public"."premium_requests" FOR INSERT TO "authenticated" WITH CHECK ((("auth"."uid"() = "user_id") AND ("status" = 'pending'::"text") AND ("amount" = 500) AND ("reviewed_at" IS NULL)));



CREATE POLICY "Users can delete bookmarks" ON "public"."bookmarked_questions" FOR DELETE TO "authenticated" USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can delete their own exams" ON "public"."upcoming_exams" FOR DELETE USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can insert bookmarks" ON "public"."bookmarked_questions" FOR INSERT TO "authenticated" WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can insert own notifications" ON "public"."notifications" FOR INSERT TO "authenticated" WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can insert their own exams" ON "public"."upcoming_exams" FOR INSERT WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can insert their own profile"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = id
  AND is_admin IS FALSE
  AND xp = 0
  AND level = 1
  AND total_points = 0
  AND quizzes_today = 0
);



CREATE POLICY "Users can insert their own results" ON "public"."test_results" FOR INSERT WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can insert their own stats" ON "public"."user_stats" FOR INSERT WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can read own notifications" ON "public"."notifications" FOR SELECT TO "authenticated" USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can read their own exams" ON "public"."upcoming_exams" FOR SELECT USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can read their own stats" ON "public"."user_stats" FOR SELECT USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can update bookmarks" ON "public"."bookmarked_questions" FOR UPDATE TO "authenticated" USING (("auth"."uid"() = "user_id")) WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can update own notifications" ON "public"."notifications" FOR UPDATE TO "authenticated" USING (("auth"."uid"() = "user_id")) WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can update their own exams" ON "public"."upcoming_exams" FOR UPDATE USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can update their own profile" ON "public"."profiles" FOR UPDATE TO "authenticated" USING (("auth"."uid"() = "id")) WITH CHECK (("auth"."uid"() = "id"));



CREATE POLICY "Users can update their own stats" ON "public"."user_stats" FOR UPDATE USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can view all test results for leaderboard" ON "public"."test_results" FOR SELECT USING (true);



CREATE POLICY "Users can view own premium requests" ON "public"."premium_requests" FOR SELECT TO "authenticated" USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can view their bookmarks" ON "public"."bookmarked_questions" FOR SELECT TO "authenticated" USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can view their own profile" ON "public"."profiles" FOR SELECT TO "authenticated" USING (("auth"."uid"() = "id"));



CREATE POLICY "Users can view their own results" ON "public"."test_results" FOR SELECT USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can view their own stats" ON "public"."user_stats" FOR SELECT USING (("auth"."uid"() = "user_id"));



ALTER TABLE "public"."achievements" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."admin_chat_conversations" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."admin_chat_messages" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."ai_daily_usage" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."bookmarked_questions" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."bookmarks" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."daily_quiz_usage" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."notifications" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."premium_requests" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."questions" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."study_resource_comments" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."study_resource_likes" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."study_resource_reports" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."study_resources" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."subscriptions" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."test_results" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."upcoming_exams" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."user_achievements" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."user_stats" ENABLE ROW LEVEL SECURITY;


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";



REVOKE ALL ON FUNCTION "public"."check_signup_email_status"("p_email" "text") FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."check_signup_email_status"("p_email" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."check_signup_email_status"("p_email" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."check_signup_email_status"("p_email" "text") TO "service_role";



REVOKE ALL ON FUNCTION "public"."complete_ai_message"("p_user_id" "uuid", "p_usage_date" "date") FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."complete_ai_message"("p_user_id" "uuid", "p_usage_date" "date") TO "service_role";



REVOKE ALL ON FUNCTION "public"."consume_quiz_attempt"() FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."consume_quiz_attempt"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."consume_quiz_attempt"() TO "service_role";



REVOKE ALL ON FUNCTION "public"."get_leaderboard"() FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."get_leaderboard"() TO "anon";
GRANT ALL ON FUNCTION "public"."get_leaderboard"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_leaderboard"() TO "service_role";



REVOKE ALL ON FUNCTION "public"."get_study_resource_display_names"() FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."get_study_resource_display_names"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_study_resource_display_names"() TO "service_role";



GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";



GRANT ALL ON FUNCTION "public"."increment_quiz_attempts"("user_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."increment_quiz_attempts"("user_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."increment_quiz_attempts"("user_id" "uuid") TO "service_role";



REVOKE ALL ON FUNCTION "public"."is_prep_path_admin"() FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."is_prep_path_admin"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."is_prep_path_admin"() TO "service_role";



REVOKE ALL ON FUNCTION "public"."mark_admin_chat_read"("p_conversation_id" "uuid") FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."mark_admin_chat_read"("p_conversation_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."mark_admin_chat_read"("p_conversation_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."notify_resource_comment"() TO "anon";
GRANT ALL ON FUNCTION "public"."notify_resource_comment"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."notify_resource_comment"() TO "service_role";



GRANT ALL ON FUNCTION "public"."notify_resource_like"() TO "anon";
GRANT ALL ON FUNCTION "public"."notify_resource_like"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."notify_resource_like"() TO "service_role";



REVOKE ALL ON FUNCTION "public"."release_ai_message"("p_user_id" "uuid", "p_usage_date" "date") FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."release_ai_message"("p_user_id" "uuid", "p_usage_date" "date") TO "service_role";



REVOKE ALL ON FUNCTION "public"."reserve_ai_message"("p_user_id" "uuid") FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."reserve_ai_message"("p_user_id" "uuid") TO "service_role";



REVOKE ALL ON FUNCTION "public"."review_study_resource"("resource_id" "uuid", "decision" "text") FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."review_study_resource"("resource_id" "uuid", "decision" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."review_study_resource"("resource_id" "uuid", "decision" "text") TO "service_role";



REVOKE ALL ON FUNCTION "public"."review_study_resource_report"("report_id" "uuid", "decision" "text") FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."review_study_resource_report"("report_id" "uuid", "decision" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."review_study_resource_report"("report_id" "uuid", "decision" "text") TO "service_role";



REVOKE ALL ON FUNCTION "public"."toggle_bookmark"("target_question_id" "uuid") FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."toggle_bookmark"("target_question_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."toggle_bookmark"("target_question_id" "uuid") TO "service_role";



REVOKE ALL ON FUNCTION "public"."touch_admin_chat_conversation"() FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."touch_admin_chat_conversation"() TO "service_role";



GRANT ALL ON TABLE "public"."achievements" TO "anon";
GRANT ALL ON TABLE "public"."achievements" TO "authenticated";
GRANT ALL ON TABLE "public"."achievements" TO "service_role";



GRANT ALL ON TABLE "public"."admin_chat_conversations" TO "anon";
GRANT ALL ON TABLE "public"."admin_chat_conversations" TO "authenticated";
GRANT ALL ON TABLE "public"."admin_chat_conversations" TO "service_role";



GRANT ALL ON TABLE "public"."admin_chat_messages" TO "anon";
GRANT ALL ON TABLE "public"."admin_chat_messages" TO "authenticated";
GRANT ALL ON TABLE "public"."admin_chat_messages" TO "service_role";



GRANT ALL ON TABLE "public"."ai_daily_usage" TO "service_role";



GRANT ALL ON TABLE "public"."bookmarked_questions" TO "anon";
GRANT SELECT,REFERENCES,TRIGGER,TRUNCATE,MAINTAIN ON TABLE "public"."bookmarked_questions" TO "authenticated";
GRANT ALL ON TABLE "public"."bookmarked_questions" TO "service_role";



GRANT ALL ON TABLE "public"."bookmarks" TO "anon";
GRANT ALL ON TABLE "public"."bookmarks" TO "authenticated";
GRANT ALL ON TABLE "public"."bookmarks" TO "service_role";



GRANT ALL ON TABLE "public"."daily_quiz_usage" TO "anon";
GRANT ALL ON TABLE "public"."daily_quiz_usage" TO "authenticated";
GRANT ALL ON TABLE "public"."daily_quiz_usage" TO "service_role";



GRANT ALL ON TABLE "public"."notifications" TO "anon";
GRANT ALL ON TABLE "public"."notifications" TO "authenticated";
GRANT ALL ON TABLE "public"."notifications" TO "service_role";



GRANT ALL ON TABLE "public"."premium_requests" TO "anon";
GRANT ALL ON TABLE "public"."premium_requests" TO "authenticated";
GRANT ALL ON TABLE "public"."premium_requests" TO "service_role";



GRANT SELECT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN ON TABLE "public"."profiles" TO "anon";
GRANT SELECT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";



GRANT INSERT("id") ON TABLE "public"."profiles" TO "authenticated";



GRANT INSERT("name"),UPDATE("name") ON TABLE "public"."profiles" TO "authenticated";



GRANT INSERT("avatar_url"),UPDATE("avatar_url") ON TABLE "public"."profiles" TO "authenticated";



GRANT INSERT("city"),UPDATE("city") ON TABLE "public"."profiles" TO "authenticated";



GRANT INSERT("target_university"),UPDATE("target_university") ON TABLE "public"."profiles" TO "authenticated";



GRANT INSERT("dob"),UPDATE("dob") ON TABLE "public"."profiles" TO "authenticated";



GRANT INSERT("dark_mode") ON TABLE "public"."profiles" TO "authenticated";



GRANT INSERT("email_reminders") ON TABLE "public"."profiles" TO "authenticated";



GRANT INSERT("exam_notifications") ON TABLE "public"."profiles" TO "authenticated";



GRANT INSERT("animations") ON TABLE "public"."profiles" TO "authenticated";



GRANT INSERT("daily_goal") ON TABLE "public"."profiles" TO "authenticated";



GRANT INSERT("study_time") ON TABLE "public"."profiles" TO "authenticated";



GRANT INSERT("email") ON TABLE "public"."profiles" TO "authenticated";



GRANT INSERT("display_name"),UPDATE("display_name") ON TABLE "public"."profiles" TO "authenticated";



GRANT ALL ON TABLE "public"."questions" TO "anon";
GRANT ALL ON TABLE "public"."questions" TO "authenticated";
GRANT ALL ON TABLE "public"."questions" TO "service_role";



GRANT ALL ON TABLE "public"."study_resource_comments" TO "anon";
GRANT ALL ON TABLE "public"."study_resource_comments" TO "authenticated";
GRANT ALL ON TABLE "public"."study_resource_comments" TO "service_role";



GRANT ALL ON TABLE "public"."study_resource_likes" TO "anon";
GRANT ALL ON TABLE "public"."study_resource_likes" TO "authenticated";
GRANT ALL ON TABLE "public"."study_resource_likes" TO "service_role";



GRANT ALL ON TABLE "public"."study_resource_reports" TO "anon";
GRANT ALL ON TABLE "public"."study_resource_reports" TO "authenticated";
GRANT ALL ON TABLE "public"."study_resource_reports" TO "service_role";



GRANT SELECT,INSERT,REFERENCES,TRIGGER,TRUNCATE,MAINTAIN ON TABLE "public"."study_resources" TO "anon";
GRANT SELECT,INSERT,REFERENCES,TRIGGER,TRUNCATE,MAINTAIN ON TABLE "public"."study_resources" TO "authenticated";
GRANT ALL ON TABLE "public"."study_resources" TO "service_role";



GRANT ALL ON TABLE "public"."subscriptions" TO "anon";
GRANT ALL ON TABLE "public"."subscriptions" TO "authenticated";
GRANT ALL ON TABLE "public"."subscriptions" TO "service_role";



GRANT ALL ON TABLE "public"."test_results" TO "anon";
GRANT ALL ON TABLE "public"."test_results" TO "authenticated";
GRANT ALL ON TABLE "public"."test_results" TO "service_role";



GRANT ALL ON TABLE "public"."upcoming_exams" TO "anon";
GRANT ALL ON TABLE "public"."upcoming_exams" TO "authenticated";
GRANT ALL ON TABLE "public"."upcoming_exams" TO "service_role";



GRANT ALL ON TABLE "public"."user_achievements" TO "anon";
GRANT ALL ON TABLE "public"."user_achievements" TO "authenticated";
GRANT ALL ON TABLE "public"."user_achievements" TO "service_role";



GRANT ALL ON TABLE "public"."user_stats" TO "anon";
GRANT ALL ON TABLE "public"."user_stats" TO "authenticated";
GRANT ALL ON TABLE "public"."user_stats" TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";


-- Prevent authenticated users from directly changing admin status.
REVOKE UPDATE ON TABLE public.profiles FROM authenticated;

GRANT UPDATE (
  name,
  email,
  avatar_url,
  city,
  target_university,
  dob,
  dark_mode,
  email_reminders,
  exam_notifications,
  animations,
  daily_goal,
  study_time,
  favorite_universities,
  favorite_subjects,
  default_test_length,
  display_name
) ON TABLE public.profiles TO authenticated;

-- Return the total test count to administrators only.
CREATE OR REPLACE FUNCTION public.is_prep_path_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = (SELECT auth.uid())
      AND is_admin = true
  );
$$;

REVOKE ALL ON FUNCTION public.is_prep_path_admin() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.is_prep_path_admin() FROM anon;
GRANT EXECUTE ON FUNCTION public.is_prep_path_admin() TO authenticated;
CREATE OR REPLACE FUNCTION public.get_admin_total_tests()
RETURNS bigint
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT COUNT(*)
  FROM public.test_results
  WHERE public.is_prep_path_admin();
$$;

REVOKE ALL ON FUNCTION public.get_admin_total_tests() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.get_admin_total_tests() FROM anon;
GRANT EXECUTE ON FUNCTION public.get_admin_total_tests() TO authenticated;

-- Remove unnecessary privileges from regular users.
REVOKE ALL ON TABLE public.profiles FROM anon;
REVOKE ALL ON TABLE public.profiles FROM authenticated;

-- Allow authenticated users to read profiles subject to RLS.
GRANT SELECT ON TABLE public.profiles TO authenticated;

-- Allow profile creation subject to the INSERT RLS policy.
GRANT INSERT ON TABLE public.profiles TO authenticated;

-- Allow updates only to approved profile fields.
GRANT UPDATE (
  name, email, avatar_url, city, target_university, dob,
  dark_mode, email_reminders, exam_notifications, animations,
  daily_goal, study_time, favorite_universities,
  favorite_subjects, default_test_length, display_name
) ON TABLE public.profiles TO authenticated;

-- Automatically create a profile when a user signs up.
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();