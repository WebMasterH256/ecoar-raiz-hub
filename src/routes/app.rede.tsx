import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { redePontos, type RedePonto } from "@/lib/ecoar-data";
import { Button } from "@/components/ui/button";
import { MapPin, ExternalLink, Sprout, Utensils, Tractor, Recycle } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/app/rede")({
  component: RedePage,
});

const cats = ["Todas", "Hortas", "Cozinhas", "Produtores", "Pontos de Troca"] as const;
type Cat = (typeof cats)[number];

const iconOf: Record<RedePonto["categoria"], React.ComponentType<{ className?: string }>> = {
  "Hortas": Sprout,
  "Cozinhas": Utensils,
  "Produtores": Tractor,
  "Pontos de Troca": Recycle,
};

function RedePage() {
  const [cat, setCat] = useState<Cat>("Todas");
  const items = cat === "Todas" ? redePontos : redePontos.filter((p) => p.categoria === cat);

  return (
    <div className="space-y-8">
      <header>
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Impacto social que transforma comunidades
        </div>
        <h1 className="mt-2 font-display text-3xl font-bold">Rede ECOAR</h1>
        <p className="mt-1 text-muted-foreground">
          Hortas, cozinhas, produtores e pontos de troca em Arcoverde.
        </p>
      </header>

      {/* Mapa simulado */}
      <div className="relative overflow-hidden rounded-3xl border border-border bg-surface shadow-soft">
        <div className="relative h-72 w-full bg-gradient-to-br from-accent via-secondary to-surface-soft">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 30%, oklch(0.74 0.18 55 / 0.4), transparent 30%), radial-gradient(circle at 70% 60%, oklch(0.7 0.15 155 / 0.35), transparent 35%), radial-gradient(circle at 40% 80%, oklch(0.82 0.16 70 / 0.3), transparent 30%)",
            }}
          />
          {redePontos.slice(0, 8).map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.08, type: "spring" }}
              className="absolute flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-sun text-primary-foreground shadow-glow"
              style={{
                left: `${15 + ((i * 13) % 70)}%`,
                top: `${20 + ((i * 19) % 55)}%`,
              }}
              title={p.nome}
            >
              <MapPin className="size-4" />
            </motion.div>
          ))}
          <div className="absolute bottom-4 left-4 rounded-xl bg-surface/90 px-3 py-2 text-xs font-medium shadow-soft backdrop-blur">
            Arcoverde — PE • 47 pontos ativos
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-all ${
              cat === c
                ? "border-primary bg-gradient-sun text-primary-foreground shadow-glow"
                : "border-border bg-surface text-muted-foreground hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Pontos */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((p) => {
          const Icon = iconOf[p.categoria];
          return (
            <div
              key={p.id}
              className="rounded-2xl border border-border bg-surface p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-glow"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-xl bg-gradient-sun text-primary-foreground shadow-glow">
                  <Icon className="size-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">
                    {p.categoria}
                  </div>
                  <div className="font-display font-bold">{p.nome}</div>
                </div>
              </div>
              <div className="mt-3 text-sm text-muted-foreground">
                {p.endereco} • {p.bairro}
              </div>
              <a
                href={`https://www.google.com/maps/search/${encodeURIComponent(
                  p.nome + " Arcoverde PE"
                )}`}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-block w-full"
              >
                <Button variant="outline" size="sm" className="w-full">
                  <ExternalLink className="size-3.5" /> Abrir no Google Maps
                </Button>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
