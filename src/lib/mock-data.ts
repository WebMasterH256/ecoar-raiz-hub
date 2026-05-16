export type ActivityCategory = "Evento" | "Oficina" | "Distribuição" | "Mutirão" | "Colheita" | "Reciclagem";
export type ActivityStatus = "Em Breve" | "Em Andamento" | "Encerrada";

export interface Activity {
  id: string;
  status: ActivityStatus;
  category: ActivityCategory;
  title: string;
  description: string;
  date: string;
  location: string;
  address: string;
  raiz: number;
  enrolled: number;
  capacity: number;
  mapsUrl: string;
}

export const activities: Activity[] = [
  { id: "a1", status: "Em Breve", category: "Evento", title: "Feira de Trocas Solidárias", description: "Troque produtos, saberes e cuidado em uma manhã coletiva no centro da cidade.", date: "09 jun 2026", location: "Praça Dom Vital — Centro", address: "Praça Dom Vital, Arcoverde - PE", raiz: 8, enrolled: 0, capacity: 200, mapsUrl: "https://maps.google.com/?q=Praça+Dom+Vital+Arcoverde" },
  { id: "a2", status: "Em Breve", category: "Oficina", title: "Oficina de Artesanato com Reaproveitamento", description: "Aprenda técnicas de upcycling com artesãs locais.", date: "04 jun 2026", location: "Centro Comunitário São Cristóvão", address: "São Cristóvão, Arcoverde - PE", raiz: 12, enrolled: 6, capacity: 15, mapsUrl: "https://maps.google.com/?q=São+Cristóvão+Arcoverde" },
  { id: "a3", status: "Em Breve", category: "Distribuição", title: "Distribuição Cesta Agroecológica", description: "Cestas com produtos da agricultura familiar de Arcoverde.", date: "24 mai 2026", location: "CRAS Central — Arcoverde", address: "CRAS Central, Arcoverde - PE", raiz: 10, enrolled: 67, capacity: 100, mapsUrl: "https://maps.google.com/?q=CRAS+Central+Arcoverde" },
  { id: "a4", status: "Em Breve", category: "Mutirão", title: "Mutirão de Limpeza — Bairro Universitário", description: "Ação coletiva de limpeza e revitalização da praça central.", date: "19 mai 2026", location: "Praça Central — B. Universitário", address: "Bairro Universitário, Arcoverde - PE", raiz: 20, enrolled: 23, capacity: 50, mapsUrl: "https://maps.google.com/?q=Bairro+Universitário+Arcoverde" },
  { id: "a5", status: "Em Breve", category: "Mutirão", title: "Mutirão de Limpeza do Rio", description: "Ação ambiental nas margens do Rio Ipojuca.", date: "19 mai 2026", location: "Margem do Rio Ipojuca", address: "Rio Ipojuca, Arcoverde - PE", raiz: 40, enrolled: 32, capacity: 50, mapsUrl: "https://maps.google.com/?q=Rio+Ipojuca+Arcoverde" },
  { id: "a6", status: "Em Breve", category: "Oficina", title: "Oficina de Compostagem", description: "Transforme resíduos em adubo orgânico de qualidade.", date: "14 mai 2026", location: "Horta Capoeiras", address: "Bairro Capoeiras, Arcoverde - PE", raiz: 15, enrolled: 8, capacity: 20, mapsUrl: "https://maps.google.com/?q=Capoeiras+Arcoverde" },
  { id: "a7", status: "Em Breve", category: "Colheita", title: "Colheita Comunitária", description: "Mãos à terra na Horta das Mangueiras.", date: "11 mai 2026", location: "Horta das Mangueiras", address: "Mangueiras, Arcoverde - PE", raiz: 25, enrolled: 15, capacity: 30, mapsUrl: "https://maps.google.com/?q=Horta+Mangueiras+Arcoverde" },
  { id: "a8", status: "Em Andamento", category: "Reciclagem", title: "Feira de Reciclagem", description: "Pontos de troca ativos durante todo o dia.", date: "07 mai 2026", location: "Ponto de Troca Boa Vista", address: "Boa Vista, Arcoverde - PE", raiz: 20, enrolled: 12, capacity: 80, mapsUrl: "https://maps.google.com/?q=Boa+Vista+Arcoverde" },
];

export interface NetworkPlace {
  id: string;
  category: "Hortas" | "Cozinhas" | "Produtores" | "Pontos de Troca" | "Ações Sociais";
  name: string;
  address: string;
  mapsUrl: string;
}

export const networkPlaces: NetworkPlace[] = [
  { id: "h1", category: "Hortas", name: "Horta do Centro", address: "Rua Capitão Arlindo Pacheco, Centro", mapsUrl: "https://maps.google.com/?q=Horta+Centro+Arcoverde" },
  { id: "h2", category: "Hortas", name: "Horta Capoeiras", address: "Bairro Capoeiras", mapsUrl: "https://maps.google.com/?q=Horta+Capoeiras+Arcoverde" },
  { id: "h3", category: "Hortas", name: "Horta das Mangueiras", address: "Bairro Mangueiras", mapsUrl: "https://maps.google.com/?q=Horta+Mangueiras+Arcoverde" },
  { id: "c1", category: "Cozinhas", name: "Cozinha Popular Central", address: "Centro de Arcoverde", mapsUrl: "https://maps.google.com/?q=Cozinha+Popular+Arcoverde" },
  { id: "c2", category: "Cozinhas", name: "Cozinha Comunitária São Cristóvão", address: "Bairro São Cristóvão", mapsUrl: "https://maps.google.com/?q=Cozinha+São+Cristóvão+Arcoverde" },
  { id: "c3", category: "Cozinhas", name: "Cozinha Solidária Boa Vista", address: "Bairro Boa Vista", mapsUrl: "https://maps.google.com/?q=Cozinha+Boa+Vista+Arcoverde" },
  { id: "p1", category: "Produtores", name: "Sítio Boa Esperança", address: "Zona Rural - Arcoverde", mapsUrl: "https://maps.google.com/?q=Sítio+Boa+Esperança+Arcoverde" },
  { id: "p2", category: "Produtores", name: "Serra das Varas", address: "Zona Rural - Arcoverde", mapsUrl: "https://maps.google.com/?q=Serra+das+Varas+Arcoverde" },
  { id: "p3", category: "Produtores", name: "Cooperativa Raiz do Campo", address: "Sertão de PE", mapsUrl: "https://maps.google.com/?q=Cooperativa+Raiz+Campo+Arcoverde" },
  { id: "t1", category: "Pontos de Troca", name: "Ponto de Troca Boa Vista", address: "Boa Vista", mapsUrl: "https://maps.google.com/?q=Boa+Vista+Arcoverde" },
  { id: "t2", category: "Pontos de Troca", name: "Estação Circular", address: "Centro", mapsUrl: "https://maps.google.com/?q=Estação+Circular+Arcoverde" },
  { id: "t3", category: "Pontos de Troca", name: "EcoPonto São Geraldo", address: "São Geraldo", mapsUrl: "https://maps.google.com/?q=São+Geraldo+Arcoverde" },
  { id: "s1", category: "Ações Sociais", name: "Associação Cultural Raízes do Sertão", address: "Arcoverde - PE", mapsUrl: "https://maps.google.com/?q=Raízes+do+Sertão+Arcoverde" },
  { id: "s2", category: "Ações Sociais", name: "Rede SUAS Arcoverde", address: "Sec. Assistência Social", mapsUrl: "https://maps.google.com/?q=SUAS+Arcoverde" },
];

export interface Reward {
  id: string;
  name: string;
  description: string;
  cost: number;
}
export const rewards: Reward[] = [
  { id: "r1", name: "Certificado Guardião Verde", description: "Reconhecimento oficial da Prefeitura por engajamento.", cost: 150 },
  { id: "r2", name: "Prioridade em inscrições", description: "Vaga garantida em qualquer atividade ECOAR por 30 dias.", cost: 200 },
  { id: "r3", name: "Kit Sustentável ECOAR", description: "Garrafa, ecobag e caderneta institucional.", cost: 300 },
  { id: "r4", name: "Sorteio Bicicleta", description: "Concorra a uma bicicleta urbana mensal.", cost: 500 },
  { id: "r5", name: "Cesta Agroecológica", description: "Cesta com produtos da agricultura familiar.", cost: 250 },
  { id: "r6", name: "Curso Profissionalizante", description: "Vaga prioritária em cursos do município.", cost: 800 },
];

export interface RankingUser { pos: number; name: string; raiz: number; level: string; you?: boolean }
export const ranking: RankingUser[] = [
  { pos: 1, name: "João Silva", raiz: 842, level: "Guardião da Colheita" },
  { pos: 2, name: "Maria Souza", raiz: 765, level: "Guardião da Colheita" },
  { pos: 3, name: "Pedro Lima", raiz: 612, level: "Guardião da Colheita" },
  { pos: 4, name: "Ana Clara", raiz: 510, level: "Guardião da Colheita" },
  { pos: 5, name: "Lucas Andrade", raiz: 498, level: "Semente Forte" },
  { pos: 6, name: "Juliana Costa", raiz: 398, level: "Semente Forte" },
  { pos: 7, name: "Rafael Almeida", raiz: 321, level: "Semente Forte" },
  { pos: 8, name: "Você", raiz: 287, level: "Semente Forte", you: true },
  { pos: 9, name: "Camila Ferreira", raiz: 245, level: "Semente Forte" },
  { pos: 10, name: "Bruno Tavares", raiz: 198, level: "Semente Forte" },
];

export const levels = [
  { name: "Broto", min: 0, max: 100, desc: "Início da jornada de participação cidadã." },
  { name: "Semente Forte", min: 101, max: 500, desc: "Engajamento ativo na construção comunitária." },
  { name: "Guardião da Colheita", min: 501, max: 1000, desc: "Referência em sustentabilidade e colaboração social." },
  { name: "Transformador Social", min: 1001, max: Infinity, desc: "Liderança comunitária e impacto coletivo." },
];

export function levelFor(raiz: number) {
  return levels.find(l => raiz >= l.min && raiz <= l.max) ?? levels[0];
}
