export type Atividade = {
  id: string;
  nome: string;
  categoria: string;
  descricao: string;
  data: string;
  local: string;
  raiz: number;
  vagas: number;
  inscritos: number;
  status: "Em breve" | "Em andamento";
};

export const atividades: Atividade[] = [
  {
    id: "a1",
    nome: "Mutirão Horta do Centro",
    categoria: "Hortas",
    descricao: "Plantio coletivo e manutenção dos canteiros comunitários.",
    data: "22 Mai • 07h00",
    local: "Praça Central, Arcoverde",
    raiz: 80,
    vagas: 30,
    inscritos: 18,
    status: "Em andamento",
  },
  {
    id: "a2",
    nome: "Oficina de Reaproveitamento Alimentar",
    categoria: "Cozinhas",
    descricao: "Aprenda receitas que usam talos, cascas e folhas.",
    data: "24 Mai • 14h00",
    local: "Cozinha Popular Central",
    raiz: 60,
    vagas: 20,
    inscritos: 20,
    status: "Em andamento",
  },
  {
    id: "a3",
    nome: "Feira da Agricultura Familiar",
    categoria: "Produtores",
    descricao: "Comercialização direta com produtores do Sertão.",
    data: "01 Jun • 06h00",
    local: "Pátio Raízes do Sertão",
    raiz: 40,
    vagas: 100,
    inscritos: 42,
    status: "Em breve",
  },
  {
    id: "a4",
    nome: "Coleta Solidária EcoPonto",
    categoria: "Reaproveitamento",
    descricao: "Entrega de recicláveis com bonificação em RAIZ.",
    data: "05 Jun • 08h00",
    local: "EcoPonto São Geraldo",
    raiz: 50,
    vagas: 60,
    inscritos: 12,
    status: "Em breve",
  },
  {
    id: "a5",
    nome: "Roda de Convivência SCFV",
    categoria: "Social",
    descricao: "Encontro intergeracional de fortalecimento de vínculos.",
    data: "08 Jun • 15h00",
    local: "CRAS Boa Vista",
    raiz: 45,
    vagas: 40,
    inscritos: 27,
    status: "Em breve",
  },
];

export type Pessoa = {
  id: string;
  nome: string;
  iniciais: string;
  bairro: string;
  raiz: number;
  nivel: "Broto" | "Raiz Forte" | "Guardião da Colheita" | "Transformador Social";
};

export const ranking: Pessoa[] = [
  { id: "p1", nome: "Maria Conceição", iniciais: "MC", bairro: "Boa Vista", raiz: 1840, nivel: "Transformador Social" },
  { id: "p2", nome: "João Bezerra", iniciais: "JB", bairro: "São Cristóvão", raiz: 1320, nivel: "Transformador Social" },
  { id: "p3", nome: "Lucia Albuquerque", iniciais: "LA", bairro: "Capoeiras", raiz: 980, nivel: "Guardião da Colheita" },
  { id: "p4", nome: "Carlos Henrique", iniciais: "CH", bairro: "São Geraldo", raiz: 760, nivel: "Guardião da Colheita" },
  { id: "p5", nome: "Aline Souza", iniciais: "AS", bairro: "Centro", raiz: 540, nivel: "Guardião da Colheita" },
  { id: "p6", nome: "Pedro Nunes", iniciais: "PN", bairro: "Mangueiras", raiz: 380, nivel: "Raiz Forte" },
  { id: "p7", nome: "Vitória Lima", iniciais: "VL", bairro: "Boa Vista", raiz: 240, nivel: "Raiz Forte" },
  { id: "p8", nome: "Rafael Torres", iniciais: "RT", bairro: "Centro", raiz: 90, nivel: "Broto" },
];

export const niveis = [
  { nome: "Broto", min: 0, max: 100 },
  { nome: "Raiz Forte", min: 101, max: 500 },
  { nome: "Guardião da Colheita", min: 501, max: 1000 },
  { nome: "Transformador Social", min: 1001, max: Infinity },
] as const;

export type RedePonto = {
  id: string;
  nome: string;
  categoria: "Hortas" | "Cozinhas" | "Produtores" | "Pontos de Troca";
  bairro: string;
  endereco: string;
};

export const redePontos: RedePonto[] = [
  { id: "r1", nome: "Horta do Centro", categoria: "Hortas", bairro: "Centro", endereco: "Rua da Aurora, 120" },
  { id: "r2", nome: "Horta Capoeiras", categoria: "Hortas", bairro: "Capoeiras", endereco: "Av. das Capoeiras, 450" },
  { id: "r3", nome: "Horta das Mangueiras", categoria: "Hortas", bairro: "Mangueiras", endereco: "Rua das Mangueiras, 78" },
  { id: "r4", nome: "Cozinha Popular Central", categoria: "Cozinhas", bairro: "Centro", endereco: "Pç. Joaquim Nabuco, 10" },
  { id: "r5", nome: "Cozinha Comunitária São Cristóvão", categoria: "Cozinhas", bairro: "São Cristóvão", endereco: "Rua São Cristóvão, 220" },
  { id: "r6", nome: "Cozinha Solidária Boa Vista", categoria: "Cozinhas", bairro: "Boa Vista", endereco: "Rua Boa Vista, 55" },
  { id: "r7", nome: "Sítio Boa Esperança", categoria: "Produtores", bairro: "Zona Rural", endereco: "Estrada PE-275, km 12" },
  { id: "r8", nome: "Serra das Varas", categoria: "Produtores", bairro: "Serra das Varas", endereco: "Sítio Serra, s/n" },
  { id: "r9", nome: "Cooperativa Raiz do Campo", categoria: "Produtores", bairro: "Distrito Rural", endereco: "BR-232, km 250" },
  { id: "r10", nome: "Ponto de Troca Boa Vista", categoria: "Pontos de Troca", bairro: "Boa Vista", endereco: "Rua Direita, 33" },
  { id: "r11", nome: "Estação Circular", categoria: "Pontos de Troca", bairro: "Centro", endereco: "Av. Cel. Antônio Japiassu, 800" },
  { id: "r12", nome: "EcoPonto São Geraldo", categoria: "Pontos de Troca", bairro: "São Geraldo", endereco: "Rua São Geraldo, 410" },
];

export const recompensas = [
  { id: "rc1", nome: "Certificado ECOAR Cidadão Sustentável", custo: 150, tag: "Certificado" },
  { id: "rc2", nome: "Kit de mudas + sementes crioulas", custo: 220, tag: "Kit Sustentável" },
  { id: "rc3", nome: "Prioridade em oficinas premium", custo: 300, tag: "Prioridade" },
  { id: "rc4", nome: "Cupom para feira da agricultura familiar", custo: 180, tag: "Benefício" },
  { id: "rc5", nome: "Sorteio: cesta agroecológica do mês", custo: 100, tag: "Sorteio" },
  { id: "rc6", nome: "Isenção em curso municipal de capacitação", custo: 500, tag: "Benefício" },
];

export const suasOrgaos = [
  { sigla: "CRAS", nome: "Centro de Referência de Assistência Social", desc: "Porta de entrada da rede de proteção social básica." },
  { sigla: "CREAS", nome: "Centro Especializado de Assistência Social", desc: "Atendimento à proteção social especial e direitos violados." },
  { sigla: "SCFV", nome: "Serviço de Convivência e Fortalecimento de Vínculos", desc: "Grupos de convivência intergeracional e comunitária." },
  { sigla: "BPC", nome: "Benefício de Prestação Continuada", desc: "Garantia de renda mínima a idosos e pessoas com deficiência." },
  { sigla: "Bolsa Família", nome: "Programa Bolsa Família", desc: "Transferência de renda e inclusão social com condicionalidades." },
  { sigla: "CadÚnico", nome: "Cadastro Único", desc: "Base estratégica para políticas públicas integradas." },
];

export const cidadaoDemo = {
  nome: "Ana Paula Ferreira",
  iniciais: "AP",
  bairro: "Boa Vista",
  raiz: 612,
  nivel: "Guardião da Colheita" as const,
  posicao: 5,
  proximoNivel: 1001,
  atividadesConcluidas: 14,
  arvoresPlantadas: 22,
  kgReaproveitados: 86,
};

export const adminKpis = {
  usuarios: 2418,
  inscricoes: 5821,
  raizDistribuido: 184230,
  atividadesAtivas: 47,
  crescimento: 12.4,
};

export const crescimentoMensal = [
  { mes: "Jan", familias: 1200, raiz: 42000 },
  { mes: "Fev", familias: 1380, raiz: 58000 },
  { mes: "Mar", familias: 1620, raiz: 71000 },
  { mes: "Abr", familias: 1910, raiz: 96000 },
  { mes: "Mai", familias: 2180, raiz: 132000 },
  { mes: "Jun", familias: 2418, raiz: 184230 },
];

export const distribuicaoBairros = [
  { bairro: "Boa Vista", valor: 612 },
  { bairro: "Centro", valor: 540 },
  { bairro: "São Cristóvão", valor: 388 },
  { bairro: "Capoeiras", valor: 322 },
  { bairro: "São Geraldo", valor: 280 },
  { bairro: "Mangueiras", valor: 196 },
];

export const metas = [
  { nome: "2.500 famílias cadastradas", progresso: 96, status: "Em andamento" as const },
  { nome: "100 hortas comunitárias ativas", progresso: 85, status: "Em andamento" as const },
  { nome: "20t de desperdício evitado", progresso: 90, status: "Atenção" as const },
  { nome: "200k RAIZ distribuídos", progresso: 92, status: "Em andamento" as const },
  { nome: "Integração total CadÚnico", progresso: 100, status: "Concluída" as const },
  { nome: "Cobertura territorial 12 bairros", progresso: 70, status: "Atrasada" as const },
];

export const frasesInstitucionais = [
  "Eco de sustentabilidade",
  "Proteção que reverbera",
  "Cuidado que se espalha",
  "Impacto social que transforma comunidades",
  "Sustentabilidade que gera transformação",
  "Participação que fortalece comunidades",
  "Conectar pessoas, fortalecer territórios",
  "O cuidado público em movimento",
];
