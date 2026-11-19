CREATE OR REPLACE FUNCTION public.increment_quiz_attempts(user_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
BEGIN
  IF user_id IS NULL THEN
    RAISE EXCEPTION 'User ID is required';
  END IF;

  IF (auth.jwt() ->> 'role') IS DISTINCT FROM 'service_role'
     AND auth.uid() IS DISTINCT FROM user_id THEN
    RAISE EXCEPTION 'Not authorized to update this profile';
  END IF;

  UPDATE public.profiles
  SET quizzes_today = quizzes_today + 1
  WHERE id = user_id;
END;
$function$;

REVOKE ALL PRIVILEGES
ON FUNCTION public.increment_quiz_attempts(uuid)
FROM PUBLIC, anon;

GRANT EXECUTE
ON FUNCTION public.increment_quiz_attempts(uuid)
TO authenticated, service_role;