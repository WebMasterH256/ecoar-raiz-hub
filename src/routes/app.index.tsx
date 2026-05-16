import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Coins,
  Trophy,
  Sprout,
  Recycle,
  ArrowRight,
  Calendar,
  Sparkles,
} from "lucide-react";
import { cidadaoDemo, atividades, niveis } from "@/lib/ecoar-data";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/app/")({
  component: Dashboard,
});

function Dashboard() {
  const nivelAtual = niveis.find((n) => n.nome === cidadaoDemo.nivel)!;
  const proximoIdx = niveis.findIndex((n) => n.nome === cidadaoDemo.nivel) + 1;
  const proximo = niveis[proximoIdx];
  const progresso = proximo
    ? ((cidadaoDemo.sementes - nivelAtual.min) / (proximo.min - nivelAtual.min)) * 100
    : 100;

  return (
    <div className="space-y-8">
      {/* Hero card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-sun p-8 text-primary-foreground shadow-glow"
      >
        <div className="absolute -right-20 -top-20 size-72 rounded-full bg-white/20 blur-3xl" />
        <div className="relative flex flex-wrap items-start justify-between gap-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] opacity-80">
              Bem-vinda de volta
            </div>
            <h1 className="mt-1 font-display text-3xl font-bold sm:text-4xl">
              Olá, {cidadaoDemo.nome.split(" ")[0]} 🌻
            </h1>
            <p className="mt-2 max-w-md opacity-90">
              Você está #{cidadaoDemo.posicao} no ranking de Arcoverde. Continue plantando impacto.
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-2xl bg-white/15 p-4 backdrop-blur">
            <Coins className="size-8" />
            <div>
              <div className="text-xs uppercase tracking-wider opacity-80">Saldo sementes</div>
              <div className="font-display text-3xl font-bold">{cidadaoDemo.sementes}</div>
            </div>
          </div>
        </div>

        <div className="relative mt-8 rounded-2xl bg-white/15 p-4 backdrop-blur">
          <div className="flex items-center justify-between text-sm">
            <span className="font-semibold">{cidadaoDemo.nivel}</span>
            <span className="opacity-80">
              {proximo ? `Próximo: ${proximo.nome}` : "Nível máximo!"}
            </span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/20">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progresso, 100)}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full rounded-full bg-white"
            />
          </div>
        </div>
      </motion.div>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { i: Trophy, k: `#${cidadaoDemo.posicao}`, l: "Ranking municipal" },
          { i: Calendar, k: cidadaoDemo.atividadesConcluidas, l: "Atividades concluídas" },
          { i: Sprout, k: cidadaoDemo.arvoresPlantadas, l: "Árvores plantadas" },
          { i: Recycle, k: `${cidadaoDemo.kgReaproveitados} kg`, l: "Reaproveitados" },
        ].map(({ i: Icon, k, l }) => (
          <div
            key={l}
            className="group rounded-2xl border border-border bg-surface p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-glow"
          >
            <div className="flex items-center justify-between">
              <Icon className="size-5 text-primary" />
              <Sparkles className="size-3.5 text-muted-foreground/50" />
            </div>
            <div className="mt-4 font-display text-2xl font-bold">{k}</div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">{l}</div>
          </div>
        ))}
      </div>

      {/* Próximas atividades */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl font-bold">Próximas atividades</h2>
          <Link to="/app/atividades">
            <Button variant="ghost" size="sm">
              Ver todas <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {atividades.slice(0, 4).map((a) => (
            <div
              key={a.id}
              className="rounded-2xl border border-border bg-surface p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-glow"
            >
              <div className="flex items-center gap-2 text-xs">
                <span
                  className={`rounded-full px-2.5 py-0.5 font-semibold ${
                    a.status === "Em andamento"
                      ? "bg-success/15 text-success"
                      : "bg-accent text-accent-foreground"
                  }`}
                >
                  {a.status}
                </span>
                <span className="text-muted-foreground">{a.categoria}</span>
              </div>
              <h3 className="mt-3 font-display text-lg font-bold">{a.nome}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{a.descricao}</p>
              <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                <span>{a.data} • {a.local}</span>
                <span className="font-semibold text-primary">+{a.sementes} sementes</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
