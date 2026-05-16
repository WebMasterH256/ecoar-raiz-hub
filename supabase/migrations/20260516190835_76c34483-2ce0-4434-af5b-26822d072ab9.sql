-- Fix search_path for security
ALTER FUNCTION public.increment_inscritos(UUID) SET search_path = public;

-- Restrict function execution
REVOKE EXECUTE ON FUNCTION public.increment_inscritos(UUID) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.increment_inscritos(UUID) FROM anon;
GRANT EXECUTE ON FUNCTION public.increment_inscritos(UUID) TO authenticated;

-- Fix permissive RLS on activities
DROP POLICY IF EXISTS "Apenas admin pode inserir atividades" ON public.atividades;
CREATE POLICY "Admins podem inserir atividades" ON public.atividades FOR INSERT WITH CHECK (auth.uid() IN (SELECT id FROM public.profiles WHERE nivel = 'Transformador Social'));
