import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { EcoarLogo } from "@/components/EcoarLogo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { levelFor, activities as mockActivities, ranking as mockRanking, rewards as mockRewards, networkPlaces as mockNetworkPlaces } from "@/lib/mock-data";
import { Home, Calendar, Trophy, Map as MapIcon, Gift, History, UserRound, LogOut, Search, Bell, Sprout, MapPin, ArrowRight, PlayCircle, Award } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import vEquipe from "@/assets/visita-equipe.jpg";

export const Route = createFileRoute("/painel")({
  head: () => ({ meta: [{ title: "Painel — ECOAR" }] }),
  component: Painel,
});

type Section = "inicio" | "atividades" | "ranking" | "rede" | "recompensas" | "videos" | "historico" | "perfil";

function Painel() {
  const navigate = useNavigate();
  const [section, setSection] = useState<Section>("inicio");

  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;
      const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id).single();
      if (error) {
        console.error("Profile fetch error:", error);
        return { nome: user.email?.split("@")[0] || "Cidadão", sementes: 0, nivel: "Broto" };
      }
      return data;
    },
  });

  const myRaiz = profile?.sementes ?? 0;
  const myLevel = levelFor(myRaiz);

  async function logout() {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  }

  const nav: { id: Section; label: string; icon: any }[] = [
    { id: "inicio", label: "Início", icon: Home },
    { id: "atividades", label: "Atividades", icon: Calendar },
    { id: "ranking", label: "Ranking", icon: Trophy },
    { id: "rede", label: "Rede ECOAR", icon: MapIcon },
    { id: "recompensas", label: "Recompensas", icon: Gift },
    { id: "videos", label: "Vídeos", icon: PlayCircle },
    { id: "historico", label: "Histórico", icon: History },
    { id: "perfil", label: "Meu Perfil", icon: UserRound },
  ];

  if (isLoadingProfile) {
    return <div className="flex h-screen items-center justify-center">Carregando...</div>;
  }

  return (
    <div className="flex min-h-screen bg-secondary/30">
      {/* Sidebar */}
      <aside className="hidden w-72 shrink-0 flex-col border-r border-border bg-card lg:flex">
        <div className="px-6 py-6 border-b border-border"><Link to="/"><EcoarLogo size={42} tagline /></Link></div>
        <nav className="flex-1 space-y-1 p-4">
          {nav.map(n => (
            <button key={n.id} onClick={() => setSection(n.id)} className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${section === n.id ? "bg-primary text-primary-foreground shadow-elegant" : "text-muted-foreground hover:bg-primary-soft hover:text-primary"}`}>
              <n.icon className="h-5 w-5" /> {n.label}
            </button>
          ))}
        </nav>
        <div className="m-4 rounded-2xl bg-primary-soft p-5 text-center">
          <EcoarLogo size={36} withText={false} />
          <p className="mt-3 text-xs leading-snug text-foreground/80">O impacto das nossas ações ecoa em nossa comunidade.</p>
          <Link to="/"><Button size="sm" className="mt-3 w-full rounded-full bg-primary text-primary-foreground font-semibold">Saiba mais</Button></Link>
        </div>
        <button onClick={logout} className="mx-4 mb-4 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-muted-foreground hover:bg-destructive/10 hover:text-destructive">
          <LogOut className="h-5 w-5" /> Sair
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1">
        {/* Topbar */}
        <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-lg">
          <div className="flex h-20 items-center gap-4 px-4 sm:px-8">
            <div className="relative flex-1 max-w-xl">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Buscar atividades, locais, pessoas…" className="pl-10 h-11 rounded-full bg-secondary border-transparent" />
            </div>
            <button className="relative flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-foreground hover:bg-primary-soft">
              <Bell className="h-5 w-5" />
              <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">3</span>
            </button>
            <div className="flex items-center gap-3 rounded-full bg-secondary px-1 py-1 pr-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full ecoar-gradient text-primary-foreground font-bold">{profile?.nome?.[0] ?? "C"}</div>
              <div className="hidden sm:block leading-tight">
                <p className="text-sm font-bold text-foreground">{profile?.nome ?? "Cidadão"}</p>
                <p className="text-[10px] uppercase tracking-wider text-primary font-semibold">{myLevel.name}</p>
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8">
          {section === "inicio" && <Inicio name={profile?.nome ?? "Cidadão"} raiz={myRaiz} levelName={myLevel.name} setSection={setSection} />}
          {section === "atividades" && <AtividadesView />}
          {section === "ranking" && <RankingView />}
          {section === "rede" && <RedeView />}
          {section === "recompensas" && <RecompensasView raiz={myRaiz} />}
          {section === "videos" && <VideosView />}
          {section === "historico" && <HistoricoView />}
          {section === "perfil" && <PerfilView name={profile?.nome ?? "Cidadão"} email={profile?.id ?? ""} raiz={myRaiz} />}
        </div>
      </main>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, action }: any) {
  return (
    <Card className="p-5 border-border/60 hover:shadow-soft transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft"><Icon className="h-5 w-5 text-primary" /></div>
      </div>
      <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-3xl font-extrabold text-foreground">{value}</p>
      {action && <button className="mt-3 text-xs font-bold text-primary hover:underline">{action} →</button>}
    </Card>
  );
}

function Inicio({ name, raiz, levelName, setSection }: { name: string; raiz: number; levelName: string; setSection: (s: Section) => void }) {
  const max = 500;
  const progress = Math.min(100, (raiz / max) * 100);
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-display text-4xl font-extrabold">Olá, {name.split(" ")[0]}! 👋</h1>
          <p className="mt-1 text-muted-foreground">Que bom ter você por aqui.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Seu saldo" value={`${raiz} sementes`} icon={Sprout} action="Ver histórico" />
        <StatCard label="Atividades inscritas" value="5" icon={Calendar} action="Ver todas" />
        <StatCard label="Atividades concluídas" value="12" icon={Award} action="Ver histórico" />
        <StatCard label="Próxima atividade" value="Mutirão Rio" icon={MapPin} action="Ver detalhes" />
        <StatCard label="Sua posição no ranking" value="8º" icon={Trophy} action="Ver ranking" />
      </div>

      <Card className="overflow-hidden border-border/60 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl ecoar-gradient text-primary-foreground"><Sprout className="h-7 w-7" /></div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Seu nível atual</p>
              <p className="font-display text-2xl font-extrabold">{levelName}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-display text-3xl font-extrabold text-primary">{raiz} <span className="text-base text-muted-foreground font-semibold">/ {max} sementes</span></p>
            <p className="text-sm text-muted-foreground">Faltam {max - raiz} sementes para o próximo nível</p>
          </div>
        </div>
        <Progress value={progress} className="mt-5 h-3" />
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 border-border/60">
          <div className="flex items-center justify-between border-b border-border px-6 py-5">
            <h3 className="font-display text-lg font-bold">Próximas atividades</h3>
            <button onClick={() => setSection("atividades")} className="text-sm font-bold text-primary hover:underline">Ver todas →</button>
          </div>
          <div className="divide-y divide-border">
            {activities.slice(0, 5).map(a => (
              <div key={a.id} className="flex items-center gap-4 p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-soft"><Calendar className="h-5 w-5 text-primary" /></div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="border-primary/30 text-[10px] font-bold uppercase">{a.category}</Badge>
                    <span className="text-xs text-muted-foreground">{a.date}</span>
                  </div>
                  <p className="mt-1 truncate font-semibold">{a.title}</p>
                  <p className="truncate text-xs text-muted-foreground">{a.location}</p>
                </div>
                <div className="text-right">
                  <p className="font-display text-sm font-extrabold text-primary">+{a.raiz} sementes</p>
                  <p className="text-xs text-muted-foreground">{a.enrolled}/{a.capacity}</p>
                </div>
                <Button size="sm" variant="outline" className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold">Inscrever-se</Button>
              </div>
            ))}
          </div>
          <div className="border-t border-border p-4">
            <Button onClick={() => setSection("atividades")} className="w-full rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 h-11">Ver todas as atividades</Button>
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="border-border/60">
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <h3 className="font-display text-lg font-bold">Ranking Geral</h3>
              <button onClick={() => setSection("ranking")} className="text-xs font-bold text-primary hover:underline">Completo →</button>
            </div>
            <div className="grid grid-cols-3 gap-2 p-5">
              {ranking.slice(0, 3).map((r, i) => (
                <div key={r.pos} className="flex flex-col items-center text-center">
                  <div className={`relative flex h-16 w-16 items-center justify-center rounded-full ecoar-gradient text-xl font-extrabold text-primary-foreground ${i === 0 ? "ring-4 ring-primary/30" : ""}`}>{r.name[0]}<span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-[10px] font-extrabold text-background">{r.pos}</span></div>
                  <p className="mt-2 truncate w-full text-xs font-semibold">{r.name}</p>
                  <p className="text-[10px] text-muted-foreground">{r.raiz} sementes</p>
                </div>
              ))}
            </div>
            <div className="border-t border-border">
              {ranking.slice(3, 8).map(r => (
                <div key={r.pos} className={`flex items-center justify-between px-6 py-2.5 text-sm ${r.you ? "bg-primary-soft" : ""}`}>
                  <span className="flex items-center gap-3"><span className="w-5 text-muted-foreground font-semibold">{r.pos}</span><span className={`font-medium ${r.you ? "text-primary" : ""}`}>{r.name}</span></span>
                  <span className="text-xs font-semibold text-muted-foreground">{r.raiz} sementes</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="border-border/60">
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <h3 className="font-display text-lg font-bold">Recompensas</h3>
              <button onClick={() => setSection("recompensas")} className="text-xs font-bold text-primary hover:underline">Ver todas →</button>
            </div>
            <div className="divide-y divide-border">
              {rewards.slice(0, 4).map(r => (
                <div key={r.id} className="flex items-center justify-between gap-3 px-6 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{r.name}</p>
                    <p className="text-xs text-muted-foreground">{r.cost} sementes</p>
                  </div>
                  <Button size="sm" variant="outline" className="rounded-full border-primary text-primary font-semibold hover:bg-primary hover:text-primary-foreground">Resgatar</Button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function AtividadesView() {
  return (
    <div className="space-y-6">
      <div><h1 className="font-display text-4xl font-extrabold">Atividades</h1><p className="mt-1 text-muted-foreground">Inscreva-se, participe, acumule sementes.</p></div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {activities.map(a => {
          const lotado = a.enrolled >= a.capacity;
          const pct = (a.enrolled / a.capacity) * 100;
          return (
            <Card key={a.id} className="overflow-hidden border-border/60 transition-all hover:-translate-y-1 hover:shadow-elegant">
              <div className="relative h-32 ecoar-gradient">
                <div className="absolute left-4 top-4 flex gap-2">
                  <Badge className="bg-white text-primary font-bold">{a.status}</Badge>
                  <Badge variant="outline" className="border-white/60 bg-white/10 text-white font-bold uppercase text-[10px] backdrop-blur">{a.category}</Badge>
                </div>
                <div className="absolute right-4 bottom-4 rounded-full bg-white/95 px-3 py-1 font-display text-sm font-extrabold text-primary">+{a.raiz} sementes</div>
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-bold leading-tight">{a.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{a.description}</p>
                <div className="mt-4 space-y-1.5 text-xs text-muted-foreground">
                  <p className="flex items-center gap-2"><Calendar className="h-3.5 w-3.5 text-primary" /> {a.date}</p>
                  <p className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-primary" /> {a.location}</p>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-xs"><span className="font-semibold">{a.enrolled}/{a.capacity} vagas</span><span className="text-muted-foreground">{Math.round(pct)}%</span></div>
                  <Progress value={pct} className="mt-1.5 h-2" />
                </div>
                <Button disabled={lotado} className={`mt-4 w-full rounded-full font-semibold ${lotado ? "bg-muted text-muted-foreground" : "bg-primary text-primary-foreground hover:bg-primary/90"}`}>
                  {lotado ? "Lista de espera" : "Inscrever-se"} {!lotado && <ArrowRight className="ml-1 h-4 w-4" />}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function RankingView() {
  const [a1, a2, a3, ...rest] = ranking;
  return (
    <div className="space-y-6">
      <div><h1 className="font-display text-4xl font-extrabold">Ranking ECOAR</h1><p className="mt-1 text-muted-foreground">A sua participação ecoa no território.</p></div>
      <div className="grid gap-4 md:grid-cols-3">
        {[a2, a1, a3].map((r, i) => {
          const order = i === 1 ? "md:scale-110 md:-translate-y-3" : "";
          return (
            <Card key={r.pos} className={`relative overflow-hidden border-border/60 p-6 text-center ${order}`}>
              <div className="absolute inset-x-0 top-0 h-1 ecoar-gradient" />
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full ecoar-gradient text-2xl font-extrabold text-primary-foreground shadow-elegant">{r.name[0]}</div>
              <p className="mt-2 font-display text-2xl font-extrabold text-primary">{r.pos}º</p>
              <p className="mt-1 font-bold">{r.name}</p>
              <p className="text-xs text-muted-foreground">{r.level}</p>
              <p className="mt-2 font-display text-lg font-extrabold">{r.raiz} <span className="text-xs text-muted-foreground">sementes</span></p>
            </Card>
          );
        })}
      </div>
      <Card className="border-border/60 overflow-hidden">
        <div className="divide-y divide-border">
          {rest.map(r => (
            <div key={r.pos} className={`flex items-center gap-4 px-6 py-4 ${r.you ? "bg-primary-soft" : ""}`}>
              <span className="w-6 text-center font-display text-lg font-extrabold text-muted-foreground">{r.pos}</span>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft text-sm font-bold text-primary">{r.name[0]}</div>
              <div className="flex-1">
                <p className={`font-semibold ${r.you ? "text-primary" : ""}`}>{r.name}</p>
                <p className="text-xs text-muted-foreground">{r.level}</p>
              </div>
              <p className="font-display text-base font-extrabold">{r.raiz} <span className="text-xs text-muted-foreground">sementes</span></p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function RedeView() {
  const cats = ["Hortas", "Cozinhas", "Produtores", "Pontos de Troca", "Ações Sociais"] as const;
  const [active, setActive] = useState<typeof cats[number]>("Hortas");
  const filtered = networkPlaces.filter(p => p.category === active);
  return (
    <div className="space-y-6">
      <div><h1 className="font-display text-4xl font-extrabold">Rede ECOAR</h1><p className="mt-1 text-muted-foreground">Conheça os espaços e iniciativas que transformam Arcoverde.</p></div>
      <div className="flex flex-wrap gap-2">
        {cats.map(c => (
          <button key={c} onClick={() => setActive(c)} className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${active === c ? "bg-primary text-primary-foreground shadow-elegant" : "bg-card border border-border text-muted-foreground hover:border-primary hover:text-primary"}`}>
            {c} <span className="ml-1 text-xs opacity-70">{networkPlaces.filter(p => p.category === c).length}</span>
          </button>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map(p => (
          <Card key={p.id} className="border-border/60 p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft"><MapPin className="h-5 w-5 text-primary" /></div>
              <div className="min-w-0 flex-1">
                <p className="font-display font-bold">{p.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">{p.address}</p>
                <a href={p.mapsUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline">Abrir no Google Maps →</a>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function RecompensasView({ raiz }: { raiz: number }) {
  return (
    <div className="space-y-6">
      <div><h1 className="font-display text-4xl font-extrabold">Recompensas</h1><p className="mt-1 text-muted-foreground">Troque suas sementes por benefícios reais. Saldo atual: <strong className="text-primary">{raiz} sementes</strong></p></div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {rewards.map(r => {
          const ok = raiz >= r.cost;
          return (
            <Card key={r.id} className="border-border/60 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft"><Gift className="h-6 w-6 text-primary" /></div>
              <h3 className="mt-4 font-display text-lg font-bold">{r.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{r.description}</p>
              <div className="mt-5 flex items-center justify-between">
                <p className="font-display text-xl font-extrabold text-primary">{r.cost} <span className="text-xs text-muted-foreground font-semibold">sementes</span></p>
                <Button disabled={!ok} className={`rounded-full font-semibold ${ok ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""}`}>{ok ? "Resgatar" : "Insuficiente"}</Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function VideosView() {
  return (
    <div className="space-y-6">
      <div><h1 className="font-display text-4xl font-extrabold">Vídeos da Rede</h1><p className="mt-1 text-muted-foreground">Registros das ações ECOAR no território arcoverdense.</p></div>
      <Card className="overflow-hidden border-border/60 shadow-elegant">
        <video controls preload="metadata" poster={vEquipe} className="w-full">
          <source src="/videos/ecoar-visita.mp4" type="video/mp4" />
        </video>
        <div className="p-6">
          <p className="font-display text-xl font-bold">Visita à Associação Cultural Raízes do Sertão</p>
          <p className="mt-1 text-sm text-muted-foreground">Articulação técnica e escuta com lideranças culturais de Arcoverde-PE.</p>
        </div>
      </Card>
    </div>
  );
}

function HistoricoView() {
  const items = [
    { d: "07 mai 2026", t: "Feira de Reciclagem", r: 20 },
    { d: "02 mai 2026", t: "Mutirão Praça Universitária", r: 20 },
    { d: "28 abr 2026", t: "Oficina de Compostagem", r: 15 },
    { d: "20 abr 2026", t: "Distribuição Cesta Agroecológica", r: 10 },
    { d: "15 abr 2026", t: "Colheita Comunitária", r: 25 },
  ];
  return (
    <div className="space-y-6">
      <div><h1 className="font-display text-4xl font-extrabold">Histórico</h1><p className="mt-1 text-muted-foreground">Sua linha do tempo de sementes.</p></div>
      <Card className="divide-y divide-border border-border/60">
        {items.map((i, k) => (
          <div key={k} className="flex items-center justify-between p-5">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft"><Sprout className="h-5 w-5 text-primary" /></div>
              <div><p className="font-semibold">{i.t}</p><p className="text-xs text-muted-foreground">{i.d}</p></div>
            </div>
            <p className="font-display text-lg font-extrabold text-primary">+{i.r} sementes</p>
          </div>
        ))}
      </Card>
    </div>
  );
}

function PerfilView({ name, email, raiz }: { name: string; email: string; raiz: number }) {
  return (
    <div className="space-y-6">
      <div><h1 className="font-display text-4xl font-extrabold">Meu Perfil</h1></div>
      <Card className="border-border/60 p-8">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex h-24 w-24 items-center justify-center rounded-full ecoar-gradient text-3xl font-extrabold text-primary-foreground shadow-elegant">{name[0]}</div>
          <div className="flex-1">
            <h2 className="font-display text-2xl font-extrabold">{name}</h2>
            <p className="text-muted-foreground">{email}</p>
            <p className="mt-2 ecoar-chip">{levelFor(raiz).name} · {raiz} sementes</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
