-- Restrict students to their own private records.

DROP POLICY IF EXISTS
  "Users can view all test results for leaderboard"
ON public.test_results;

DROP POLICY IF EXISTS
  "Anyone logged in can read all stats"
ON public.user_stats;
