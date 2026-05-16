-- Create rede_locais table (missing from existing schema)
CREATE TABLE IF NOT EXISTS public.rede_locais (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    categoria TEXT NOT NULL CHECK (categoria IN ('Hortas', 'Cozinhas', 'Produtores', 'Pontos de Troca', 'Ações Sociais')),
    nome TEXT NOT NULL,
    endereco TEXT NOT NULL,
    maps_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Ensure RLS is enabled on all tables
ALTER TABLE public.atividades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inscricoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recompensas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resgates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rede_locais ENABLE ROW LEVEL SECURITY;

-- Policies for public viewing (everyone can see content)
CREATE POLICY "Public can view activities" ON public.atividades FOR SELECT USING (true);
CREATE POLICY "Public can view rewards" ON public.recompensas FOR SELECT USING (true);
CREATE POLICY "Public can view rede locales" ON public.rede_locais FOR SELECT USING (true);

-- Policies for user-specific data
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own enrollments" ON public.inscricoes FOR SELECT USING (auth.uid() = profile_id);
CREATE POLICY "Users can enroll themselves" ON public.inscricoes FOR INSERT WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Users can view own redemptions" ON public.resgates FOR SELECT USING (auth.uid() = profile_id);
CREATE POLICY "Users can redeem rewards" ON public.resgates FOR INSERT WITH CHECK (auth.uid() = profile_id);

-- Profile Trigger (if not exists)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, nome, sementes, nivel)
    VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email), 0, 'Broto')
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
