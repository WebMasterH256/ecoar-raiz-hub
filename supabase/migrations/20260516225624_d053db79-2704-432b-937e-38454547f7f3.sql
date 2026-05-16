-- Fix search_path security issue
ALTER FUNCTION public.handle_new_user() SET search_path = public;

-- Revoke public execution
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO service_role;
