import { createFileRoute } from "@tanstack/react-router";
import { Coins, Sprout, Recycle, Calendar } from "lucide-react";

export const Route = createFileRoute("/app/historico")({
  component: HistoricoPage,
});

const itens = [
  { data: "12 Mai 2026", titulo: "Mutirão Horta do Centro", raiz: 80, icone: Sprout },
  { data: "08 Mai 2026", titulo: "Coleta solidária EcoPonto São Geraldo", raiz: 50, icone: Recycle },
  { data: "02 Mai 2026", titulo: "Oficina de reaproveitamento alimentar", raiz: 60, icone: Calendar },
  { data: "27 Abr 2026", titulo: "Resgate: Kit de mudas e sementes", raiz: -220, icone: Coins },
  { data: "20 Abr 2026", titulo: "Roda de convivência SCFV", raiz: 45, icone: Calendar },
  { data: "12 Abr 2026", titulo: "Feira da agricultura familiar", raiz: 40, icone: Sprout },
];

function HistoricoPage() {
  return (
    <div className="space-y-8">
      <header>
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          O cuidado público em movimento
        </div>
        <h1 className="mt-2 font-display text-3xl font-bold">Histórico de RAIZ</h1>
        <p className="mt-1 text-muted-foreground">Tudo o que você ecoou pelo Sertão.</p>
      </header>

      <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-soft">
        {itens.map((it, i) => (
          <div
            key={i}
            className="flex items-center gap-4 border-b border-border px-5 py-4 last:border-0"
          >
            <div className="flex size-10 items-center justify-center rounded-xl bg-accent text-accent-foreground">
              <it.icone className="size-4" />
            </div>
            <div className="flex-1">
              <div className="font-semibold">{it.titulo}</div>
              <div className="text-xs text-muted-foreground">{it.data}</div>
            </div>
            <div
              className={`font-display font-bold ${
                it.raiz > 0 ? "text-success" : "text-destructive"
              }`}
            >
              {it.raiz > 0 ? "+" : ""}
              {it.raiz} RAIZ
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
