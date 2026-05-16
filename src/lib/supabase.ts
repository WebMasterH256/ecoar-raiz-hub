import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const atividadesService = {
  async getAtividades() {
    const { data, error } = await supabase.from('atividades').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },
  
  async inscrever(atividadeId: string, profileId: string) {
    // Para o MVP mockado, simulamos a inscrição se não houver usuário logado
    const { data: { user } } = await supabase.auth.getUser();
    const id = user?.id || profileId;

    const { error: regError } = await supabase.from('inscricoes').insert({
      atividade_id: atividadeId,
      profile_id: id === "demo-user-id" ? undefined : id // Fallback para MVP
    });
    
    // Se falhar por RLS/Auth, simulamos sucesso no UI para o MVP
    if (regError && id === "demo-user-id") return;
    if (regError) throw regError;

    await supabase.rpc('increment_inscritos', { row_id: atividadeId });
  }
};

export const recompensaService = {
  async getRecompensas() {
    const { data, error } = await supabase.from('recompensas').select('*');
    if (error) throw error;
    return data || [];
  },

  async resgatar(recompensaId: string, profileId: string, custo: number) {
    const { data: { user } } = await supabase.auth.getUser();
    const id = user?.id || profileId;

    const { data: profile } = await supabase.from('profiles').select('sementes').eq('id', id).single();
    
    if (id !== "demo-user-id" && (!profile || profile.sementes < custo)) {
      throw new Error('Saldo insuficiente');
    }

    await supabase.from('resgates').insert({
      recompensa_id: recompensaId,
      profile_id: id === "demo-user-id" ? undefined : id
    });

    if (id !== "demo-user-id") {
      await supabase.from('profiles').update({
        sementes: profile.sementes - custo
      }).eq('id', id);
    }
  }
};
