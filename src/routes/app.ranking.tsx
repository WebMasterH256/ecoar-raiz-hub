import { createFileRoute } from "@tanstack/react-router";
import { ranking, niveis } from "@/lib/ecoar-data";
import { Trophy, Crown, Medal } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/app/ranking")({
  component: RankingPage,
});

const nivelCor: Record<string, string> = {
  "Broto": "bg-success/15 text-success",
  "Raiz Forte": "bg-accent text-accent-foreground",
  "Guardião da Colheita": "bg-primary/15 text-primary",
  "Transformador Social": "bg-gradient-sun text-primary-foreground",
};

function RankingPage() {
  const top3 = ranking.slice(0, 3);
  const resto = ranking.slice(3);

  return (
    <div className="space-y-10">
      <header>
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Conectar pessoas, fortalecer territórios
        </div>
        <h1 className="mt-2 font-display text-3xl font-bold">Ranking gamificado</h1>
        <p className="mt-1 text-muted-foreground">Quanto mais você ecoa, mais alto você sobe.</p>
      </header>

      {/* Pódio */}
      <div className="grid gap-4 sm:grid-cols-3">
        {top3.map((p, i) => {
          const order = [1, 0, 2];
          const idx = order[i];
          const dest = top3[idx];
          const podio = idx === 0;
          return (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative overflow-hidden rounded-3xl border p-6 text-center shadow-soft ${
                podio
                  ? "border-primary/40 bg-gradient-sun text-primary-foreground shadow-glow sm:order-2 sm:-translate-y-3"
                  : idx === 1
                  ? "border-border bg-surface sm:order-1"
                  : "border-border bg-surface sm:order-3"
              }`}
            >
              {podio && <Crown className="absolute right-4 top-4 size-5" />}
              <div className={`mx-auto flex size-20 items-center justify-center rounded-full text-2xl font-bold ${podio ? "bg-white/25" : "bg-gradient-sun text-primary-foreground"}`}>
                {dest.iniciais}
              </div>
              <div className="mt-3 font-display text-lg font-bold">{dest.nome}</div>
              <div className={`text-xs ${podio ? "opacity-90" : "text-muted-foreground"}`}>
                {dest.bairro}
              </div>
              <div className="mt-3 font-display text-2xl font-bold">
                {dest.sementes} <span className="text-xs font-medium opacity-80">sementes</span>
              </div>
              <div className="mt-1 text-xs opacity-80">#{idx + 1} • {dest.nivel}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Resto */}
      <div className="rounded-2xl border border-border bg-surface shadow-soft">
        {resto.map((p, i) => {
          const pos = i + 4;
          const nivel = niveis.find((n) => n.nome === p.nivel)!;
          const prox = niveis[niveis.indexOf(nivel) + 1];
          const prog = prox
            ? ((p.sementes - nivel.min) / (prox.min - nivel.min)) * 100
            : 100;
          return (
            <div
              key={p.id}
              className="flex items-center gap-4 border-b border-border px-5 py-4 last:border-0"
            >
              <div className="w-8 text-center font-display text-lg font-bold text-muted-foreground">
                {pos}
              </div>
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-sun text-sm font-bold text-primary-foreground">
                {p.iniciais}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <div className="truncate font-semibold">{p.nome}</div>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${nivelCor[p.nivel]}`}>
                    {p.nivel}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">{p.bairro}</div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-gradient-sun"
                    style={{ width: `${Math.min(prog, 100)}%` }}
                  />
                </div>
              </div>
              <div className="hidden text-right sm:block">
                <div className="font-display font-bold">{p.sementes}</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">sementes</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Níveis */}
      <section>
        <h2 className="mb-4 font-display text-lg font-bold">Níveis ECOAR</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {niveis.map((n) => (
            <div key={n.nome} className="rounded-2xl border border-border bg-surface p-4 shadow-soft">
              <Medal className="size-5 text-primary" />
              <div className="mt-3 font-display font-bold">{n.nome}</div>
              <div className="text-xs text-muted-foreground">
                {n.min}{n.max === Infinity ? "+ sementes" : `–${n.max} sementes`}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
