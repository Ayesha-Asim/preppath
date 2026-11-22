-- PrepPath V2 hosted RLS optimization review draft.
-- REVIEW ONLY: stored outside supabase/migrations so the CLI cannot apply it.
-- Do not execute until the complete migration set has passed local validation
-- against a fresh copy of the hosted schema and the policy diff is approved.
--
-- This draft is based on the live V2 policy names and the previously locally
-- validated optimization. It intentionally does not change table grants for
-- authenticated, and only revokes direct table privileges from anon on the
-- four reviewed tables.

-- =========================================================
-- 1. UPCOMING EXAMS
-- Hosted policies currently target PUBLIC. Narrow them to authenticated.
-- =========================================================

DROP POLICY IF EXISTS "Users can delete their own exams" ON public.upcoming_exams;
DROP POLICY IF EXISTS "Users can insert their own exams" ON public.upcoming_exams;
DROP POLICY IF EXISTS "Users can read their own exams" ON public.upcoming_exams;
DROP POLICY IF EXISTS "Users can update their own exams" ON public.upcoming_exams;

CREATE POLICY "Users can delete their own exams"
ON public.upcoming_exams
FOR DELETE TO authenticated
USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can insert their own exams"
ON public.upcoming_exams
FOR INSERT TO authenticated
WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can read their own exams"
ON public.upcoming_exams
FOR SELECT TO authenticated
USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can update their own exams"
ON public.upcoming_exams
FOR UPDATE TO authenticated
USING ((SELECT auth.uid()) = user_id)
WITH CHECK ((SELECT auth.uid()) = user_id);


-- =========================================================
-- 2. NOTIFICATIONS
-- =========================================================

DROP POLICY IF EXISTS "Users can insert own notifications" ON public.notifications;
DROP POLICY IF EXISTS "Users can read own notifications" ON public.notifications;
DROP POLICY IF EXISTS "Users can update own notifications" ON public.notifications;

CREATE POLICY "Users can insert own notifications"
ON public.notifications
FOR INSERT TO authenticated
WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can read own notifications"
ON public.notifications
FOR SELECT TO authenticated
USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can update own notifications"
ON public.notifications
FOR UPDATE TO authenticated
USING ((SELECT auth.uid()) = user_id)
WITH CHECK ((SELECT auth.uid()) = user_id);


-- =========================================================
-- 3. PREMIUM REQUESTS
-- =========================================================

DROP POLICY IF EXISTS "Admins can view all premium requests" ON public.premium_requests;
DROP POLICY IF EXISTS "Users can view own premium requests" ON public.premium_requests;
DROP POLICY IF EXISTS "Users can create own premium requests" ON public.premium_requests;

CREATE POLICY "Admins and owners can view premium requests"
ON public.premium_requests
FOR SELECT TO authenticated
USING (
  (SELECT public.is_prep_path_admin())
  OR ((SELECT auth.uid()) = user_id)
);

CREATE POLICY "Users can create own premium requests"
ON public.premium_requests
FOR INSERT TO authenticated
WITH CHECK (
  (SELECT auth.uid()) = user_id
  AND status = 'pending'
  AND amount = 500
  AND reviewed_at IS NULL
);


-- =========================================================
-- 4. PROFILES
-- =========================================================

DROP POLICY IF EXISTS "Admins can view profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

CREATE POLICY "Admins and users can view profiles"
ON public.profiles
FOR SELECT TO authenticated
USING (
  (SELECT public.is_prep_path_admin())
  OR ((SELECT auth.uid()) = id)
);

CREATE POLICY "Users can insert their own profile"
ON public.profiles
FOR INSERT TO authenticated
WITH CHECK (
  (SELECT auth.uid()) = id
  AND is_admin IS FALSE
  AND xp = 0
  AND level = 1
  AND total_points = 0
  AND quizzes_today = 0
);

CREATE POLICY "Users can update their own profile"
ON public.profiles
FOR UPDATE TO authenticated
USING ((SELECT auth.uid()) = id)
WITH CHECK ((SELECT auth.uid()) = id);


-- =========================================================
-- 5. BOOKMARKED QUESTIONS
-- =========================================================

DROP POLICY IF EXISTS "Users can view their bookmarks" ON public.bookmarked_questions;

CREATE POLICY "Users can view their bookmarks"
ON public.bookmarked_questions
FOR SELECT TO authenticated
USING ((SELECT auth.uid()) = user_id);


-- =========================================================
-- 6. TEST RESULTS
-- =========================================================

DROP POLICY IF EXISTS "Users can view their own results" ON public.test_results;

CREATE POLICY "Users can view their own results"
ON public.test_results
FOR SELECT TO authenticated
USING ((SELECT auth.uid()) = user_id);


-- =========================================================
-- 7. USER STATS
-- =========================================================

DROP POLICY IF EXISTS "Users can view their own stats" ON public.user_stats;

CREATE POLICY "Users can view their own stats"
ON public.user_stats
FOR SELECT TO authenticated
USING ((SELECT auth.uid()) = user_id);


-- =========================================================
-- 8. STUDY RESOURCES
-- =========================================================

DROP POLICY IF EXISTS "Admins can view all study resources" ON public.study_resources;
DROP POLICY IF EXISTS "Students can view approved study resources" ON public.study_resources;

CREATE POLICY "Admins and students can view study resources"
ON public.study_resources
FOR SELECT TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE profiles.id = (SELECT auth.uid())
      AND profiles.is_admin = TRUE
  )
  OR status = 'approved'
  OR user_id = (SELECT auth.uid())
);


-- =========================================================
-- 9. REMOVE UNNECESSARY ANON TABLE PRIVILEGES
-- Authenticated privileges are deliberately retained.
-- =========================================================

REVOKE ALL PRIVILEGES ON TABLE public.notifications FROM anon;
REVOKE ALL PRIVILEGES ON TABLE public.premium_requests FROM anon;
REVOKE ALL PRIVILEGES ON TABLE public.study_resources FROM anon;
REVOKE ALL PRIVILEGES ON TABLE public.upcoming_exams FROM anon;
