import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const atividadesService = {
  async getAtividades() {
    const { data, error } = await supabase.from('atividades').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },
  
  async inscrever(atividadeId: string, profileId: string) {
    // 1. Create registration
    const { error: regError } = await supabase.from('inscricoes').insert({
      atividade_id: atividadeId,
      profile_id: profileId
    });
    if (regError) throw regError;

    // 2. Increment activity subscribers
    const { error: updateError } = await supabase.rpc('increment_inscritos', { row_id: atividadeId });
    if (updateError) {
      // Fallback if RPC doesn't exist yet
      const { data: act } = await supabase.from('atividades').select('inscritos').eq('id', atividadeId).single();
      await supabase.from('atividades').update({ inscritos: (act?.inscritos || 0) + 1 }).eq('id', atividadeId);
    }
  }
};

export const recompensaService = {
  async getRecompensas() {
    const { data, error } = await supabase.from('recompensas').select('*');
    if (error) throw error;
    return data;
  },

  async resgatar(recompensaId: string, profileId: string, custo: number) {
    // 1. Check balance
    const { data: profile } = await supabase.from('profiles').select('sementes').eq('id', profileId).single();
    if (!profile || profile.sementes < custo) throw new Error('Saldo insuficiente');

    // 2. Create redemption
    const { error: resgateError } = await supabase.from('resgates').insert({
      recompensa_id: recompensaId,
      profile_id: profileId
    });
    if (resgateError) throw resgateError;

    // 3. Deduct seeds
    const { error: updateError } = await supabase.from('profiles').update({
      sementes: profile.sementes - custo
    }).eq('id', profileId);
    if (updateError) throw updateError;
  }
};
