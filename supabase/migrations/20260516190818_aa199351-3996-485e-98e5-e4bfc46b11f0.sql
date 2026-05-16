-- Create activities table
CREATE TABLE IF NOT EXISTS public.atividades (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT NOT NULL,
    categoria TEXT NOT NULL,
    descricao TEXT,
    data TEXT,
    local TEXT,
    sementes INTEGER DEFAULT 0,
    vagas INTEGER DEFAULT 0,
    inscritos INTEGER DEFAULT 0,
    status TEXT DEFAULT 'Em breve',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.atividades ENABLE ROW LEVEL SECURITY;

-- Policies for atividades
CREATE POLICY "Atividades são visíveis por todos" ON public.atividades FOR SELECT USING (true);
CREATE POLICY "Apenas admin pode inserir atividades" ON public.atividades FOR INSERT WITH CHECK (true); -- Simplificado para o MVP

-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    nome TEXT,
    bairro TEXT,
    sementes INTEGER DEFAULT 0,
    nivel TEXT DEFAULT 'Broto',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
CREATE POLICY "Usuários podem ver seu próprio perfil" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Usuários podem atualizar seu próprio perfil" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Create registrations table
CREATE TABLE IF NOT EXISTS public.inscricoes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    atividade_id UUID REFERENCES public.atividades(id) ON DELETE CASCADE,
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'Confirmada',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(atividade_id, profile_id)
);

-- Enable RLS
ALTER TABLE public.inscricoes ENABLE ROW LEVEL SECURITY;

-- Policies for inscricoes
CREATE POLICY "Usuários podem ver suas próprias inscrições" ON public.inscricoes FOR SELECT USING (auth.uid() = profile_id);
CREATE POLICY "Usuários podem se inscrever" ON public.inscricoes FOR INSERT WITH CHECK (auth.uid() = profile_id);

-- Create rewards table
CREATE TABLE IF NOT EXISTS public.recompensas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT NOT NULL,
    custo INTEGER NOT NULL,
    tag TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.recompensas ENABLE ROW LEVEL SECURITY;

-- Policies for recompensas
CREATE POLICY "Recompensas são visíveis por todos" ON public.recompensas FOR SELECT USING (true);

-- Create reward redemptions table
CREATE TABLE IF NOT EXISTS public.resgates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    recompensa_id UUID REFERENCES public.recompensas(id) ON DELETE CASCADE,
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.resgates ENABLE ROW LEVEL SECURITY;

-- Policies for resgates
CREATE POLICY "Usuários podem ver seus próprios resgates" ON public.resgates FOR SELECT USING (auth.uid() = profile_id);
CREATE POLICY "Usuários podem realizar resgates" ON public.resgates FOR INSERT WITH CHECK (auth.uid() = profile_id);

-- Function to increment activity subscribers
CREATE OR REPLACE FUNCTION public.increment_inscritos(row_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE public.atividades
  SET inscritos = inscritos + 1
  WHERE id = row_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Insert initial data
INSERT INTO public.atividades (nome, categoria, descricao, data, local, sementes, vagas, inscritos, status)
VALUES 
('Mutirão Horta do Centro', 'Hortas', 'Plantio coletivo e manutenção dos canteiros comunitários.', '22 Mai • 07h00', 'Praça Central, Arcoverde', 80, 30, 18, 'Em andamento'),
('Oficina de Reaproveitamento Alimentar', 'Cozinhas', 'Aprenda receitas que usam talos, cascas e folhas.', '24 Mai • 14h00', 'Cozinha Popular Central', 60, 20, 20, 'Em andamento'),
('Feira da Agricultura Familiar', 'Produtores', 'Comercialização direta com produtores do Sertão.', '01 Jun • 06h00', 'Pátio Raízes do Sertão', 40, 100, 42, 'Em breve');

INSERT INTO public.recompensas (nome, custo, tag)
VALUES 
('Certificado ECOAR Cidadão Sustentável', 150, 'Certificado'),
('Kit de mudas + sementes crioulas', 220, 'Kit Sustentável'),
('Prioridade em oficinas premium', 300, 'Prioridade');
