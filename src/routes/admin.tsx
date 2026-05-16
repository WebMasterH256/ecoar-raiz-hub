import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Users,
  ClipboardList,
  Coins,
  Activity,
  TrendingUp,
  Plus,
  CheckCircle2,
  AlertTriangle,
  Clock,
  XCircle,
  FileText,
  LogOut,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  adminKpis,
  crescimentoMensal,
  distribuicaoBairros,
  metas,
  atividades,
} from "@/lib/ecoar-data";
import { Logo } from "@/components/ecoar/Logo";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Painel da Gestão — ECOAR" }] }),
  component: AdminPage,
});

const tabs = ["Visão geral", "Atividades", "Inscrições", "Metas", "Relatórios", "Logs"] as const;
type Tab = (typeof tabs)[number];

function AdminPage() {
  const [tab, setTab] = useState<Tab>("Visão geral");

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/"><Logo /></Link>
          <div className="hidden items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-xs font-semibold text-accent-foreground sm:flex">
            <span className="size-1.5 rounded-full bg-success" /> Coordenação ECOAR • Arcoverde
          </div>
          <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <LogOut className="size-4" /> Sair
          </Link>
        </div>
        <div className="container mx-auto flex gap-1 overflow-x-auto px-4 pb-2">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                tab === t
                  ? "bg-gradient-sun text-primary-foreground shadow-glow"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {tab === "Visão geral" && <VisaoGeral />}
        {tab === "Atividades" && <GestaoAtividades />}
        {tab === "Inscrições" && <Inscricoes />}
        {tab === "Metas" && <Metas />}
        {tab === "Relatórios" && <Relatorios />}
        {tab === "Logs" && <Logs />}
      </main>
    </div>
  );
}

function Kpi({
  icon: Icon,
  label,
  value,
  delta,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  delta?: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5 shadow-soft">
      <div className="flex items-center justify-between">
        <Icon className="size-5 text-primary" />
        {delta && (
          <span className="rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-semibold text-success">
            {delta}
          </span>
        )}
      </div>
      <div className="mt-3 font-display text-2xl font-bold">{value}</div>
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}

function VisaoGeral() {
  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Painel da Gestão
          </div>
          <h1 className="mt-2 font-display text-3xl font-bold">Visão geral ECOAR</h1>
        </div>
        <Button variant="hero">
          <Plus className="size-4" /> Nova atividade
        </Button>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Kpi icon={Users} label="Usuários cadastrados" value={adminKpis.usuarios.toLocaleString("pt-BR")} delta="+12%" />
        <Kpi icon={ClipboardList} label="Inscrições" value={adminKpis.inscricoes.toLocaleString("pt-BR")} delta="+8%" />
        <Kpi icon={Coins} label="Sementes distribuídas" value={adminKpis.sementesDistribuido.toLocaleString("pt-BR")} delta="+24%" />
        <Kpi icon={Activity} label="Atividades ativas" value={String(adminKpis.atividadesAtivas)} />
        <Kpi icon={TrendingUp} label="Crescimento mensal" value={`${adminKpis.crescimento}%`} delta="estável" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-3xl border border-border bg-surface p-6 shadow-soft">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display font-bold">Crescimento ECOAR</h3>
            <span className="text-xs text-muted-foreground">Famílias × RAIZ distribuído</span>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={crescimentoMensal}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.74 0.18 55)" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="oklch(0.74 0.18 55)" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.015 70)" />
                <XAxis dataKey="mes" stroke="oklch(0.5 0.03 60)" fontSize={12} />
                <YAxis stroke="oklch(0.5 0.03 60)" fontSize={12} />
                <Tooltip
                  contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.92 0.015 70)", background: "white" }}
                />
                <Area type="monotone" dataKey="familias" stroke="oklch(0.74 0.18 55)" strokeWidth={2.5} fill="url(#g1)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-surface p-6 shadow-soft">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display font-bold">Distribuição por bairro</h3>
            <span className="text-xs text-muted-foreground">Famílias ativas</span>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={distribuicaoBairros} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.015 70)" horizontal={false} />
                <XAxis type="number" stroke="oklch(0.5 0.03 60)" fontSize={12} />
                <YAxis type="category" dataKey="bairro" stroke="oklch(0.5 0.03 60)" fontSize={11} width={90} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.92 0.015 70)", background: "white" }} />
                <Bar dataKey="valor" radius={[0, 8, 8, 0]} fill="oklch(0.74 0.18 55)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function GestaoAtividades() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="font-display text-2xl font-bold">Gestão de atividades</h1>
        <Button variant="hero"><Plus className="size-4" /> Criar atividade</Button>
      </div>
      <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-soft">
        <table className="w-full text-sm">
          <thead className="bg-surface-soft text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-4 py-3 text-left">Atividade</th>
              <th className="px-4 py-3 text-left">Categoria</th>
              <th className="px-4 py-3 text-left">Data</th>
              <th className="px-4 py-3 text-left">Inscritos</th>
              <th className="px-4 py-3 text-left">Sementes</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {atividades.map((a) => (
              <tr key={a.id} className="border-t border-border">
                <td className="px-4 py-3 font-semibold">{a.nome}</td>
                <td className="px-4 py-3 text-muted-foreground">{a.categoria}</td>
                <td className="px-4 py-3 text-muted-foreground">{a.data}</td>
                <td className="px-4 py-3">{a.inscritos}/{a.vagas}</td>
                <td className="px-4 py-3 text-primary">+{a.sementes}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      a.status === "Em andamento"
                        ? "bg-success/15 text-success"
                        : "bg-accent text-accent-foreground"
                    }`}
                  >
                    {a.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Button variant="ghost" size="sm">Editar</Button>
                  <Button variant="ghost" size="sm">Duplicar</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Inscricoes() {
  const inscricoes = [
    { id: 1, cidadao: "Maria Conceição", atividade: "Mutirão Horta do Centro", status: "Confirmada" },
    { id: 2, cidadao: "Pedro Nunes", atividade: "Oficina de reaproveitamento", status: "Aguardando" },
    { id: 3, cidadao: "Aline Souza", atividade: "Feira da agricultura familiar", status: "Confirmada" },
    { id: 4, cidadao: "João Bezerra", atividade: "Coleta solidária EcoPonto", status: "Lista de espera" },
    { id: 5, cidadao: "Rafael Torres", atividade: "Roda SCFV", status: "Aguardando" },
  ];
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold">Gestão de inscrições</h1>
      <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-soft">
        <table className="w-full text-sm">
          <thead className="bg-surface-soft text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-4 py-3 text-left">Cidadão</th>
              <th className="px-4 py-3 text-left">Atividade</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {inscricoes.map((i) => (
              <tr key={i.id} className="border-t border-border">
                <td className="px-4 py-3 font-semibold">{i.cidadao}</td>
                <td className="px-4 py-3 text-muted-foreground">{i.atividade}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-accent-foreground">
                    {i.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Button variant="hero" size="sm">Confirmar presença</Button>
                  <Button variant="ghost" size="sm">Liberar sementes</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const statusIcon = {
  "Em andamento": { i: Clock, c: "text-primary bg-primary/15" },
  "Atenção": { i: AlertTriangle, c: "text-warning bg-warning/15" },
  "Atrasada": { i: XCircle, c: "text-destructive bg-destructive/10" },
  "Concluída": { i: CheckCircle2, c: "text-success bg-success/15" },
} as const;

function Metas() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold">Metas institucionais</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {metas.map((m) => {
          const S = statusIcon[m.status];
          return (
            <div key={m.nome} className="rounded-2xl border border-border bg-surface p-5 shadow-soft">
              <div className="flex items-center justify-between">
                <div className="font-semibold">{m.nome}</div>
                <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${S.c}`}>
                  <S.i className="size-3" /> {m.status}
                </span>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-gradient-sun"
                  style={{ width: `${m.progresso}%` }}
                />
              </div>
              <div className="mt-2 text-xs text-muted-foreground">{m.progresso}% concluído</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Relatorios() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold">Relatórios analíticos</h1>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-border bg-surface p-6 shadow-soft">
          <h3 className="mb-4 font-display font-bold">Sementes distribuídas por mês</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={crescimentoMensal}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.015 70)" />
                <XAxis dataKey="mes" stroke="oklch(0.5 0.03 60)" fontSize={12} />
                <YAxis stroke="oklch(0.5 0.03 60)" fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.92 0.015 70)", background: "white" }} />
                <Bar dataKey="sementes" radius={[8, 8, 0, 0]} fill="oklch(0.74 0.18 55)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-3xl border border-border bg-surface p-6 shadow-soft">
          <h3 className="mb-4 font-display font-bold">Atividades mais populares</h3>
          <div className="space-y-3">
            {atividades.slice(0, 5).map((a) => (
              <div key={a.id}>
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{a.nome}</span>
                  <span className="text-muted-foreground">{a.inscritos}/{a.vagas}</span>
                </div>
                <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-gradient-sun"
                    style={{ width: `${(a.inscritos / a.vagas) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Logs() {
  const logs = [
    { t: "14:32", u: "coordenacao@ecoar", a: "Criou atividade 'Mutirão Horta do Centro'" },
    { t: "13:18", u: "ana.tecnica@ecoar", a: "Liberou 80 sementes para 18 cidadãos" },
    { t: "11:05", u: "coordenacao@ecoar", a: "Editou meta '2.500 famílias cadastradas'" },
    { t: "09:42", u: "supervisor@ecoar", a: "Aprovou nova categoria 'Cozinhas Solidárias'" },
    { t: "08:10", u: "coordenacao@ecoar", a: "Encerrou inscrições da Feira da Agricultura" },
  ];
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold">Logs administrativos</h1>
      <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-soft">
        {logs.map((l, i) => (
          <div key={i} className="flex items-center gap-4 border-b border-border px-5 py-3 last:border-0 text-sm">
            <FileText className="size-4 text-muted-foreground" />
            <span className="w-14 text-xs text-muted-foreground">{l.t}</span>
            <span className="font-mono text-xs text-primary">{l.u}</span>
            <span className="flex-1">{l.a}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
