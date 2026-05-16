import { createFileRoute } from "@tanstack/react-router";
import { recompensas, cidadaoDemo } from "@/lib/ecoar-data";
import { Button } from "@/components/ui/button";
import { Coins, Gift } from "lucide-react";

export const Route = createFileRoute("/app/recompensas")({
  component: RecompensasPage,
});

function RecompensasPage() {
  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Cuidado que se espalha
          </div>
          <h1 className="mt-2 font-display text-3xl font-bold">Recompensas</h1>
          <p className="mt-1 text-muted-foreground">Troque RAIZ por benefícios reais.</p>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface px-5 py-3 shadow-soft">
          <Coins className="size-5 text-primary" />
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Saldo</div>
            <div className="font-display text-xl font-bold">{cidadaoDemo.raiz} RAIZ</div>
          </div>
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {recompensas.map((r) => {
          const podeTrocar = cidadaoDemo.raiz >= r.custo;
          return (
            <div
              key={r.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-glow"
            >
              <div className="relative h-32 bg-gradient-sun p-5 text-primary-foreground">
                <Gift className="size-7" />
                <div className="absolute bottom-4 right-5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur">
                  {r.tag}
                </div>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-base font-bold">{r.nome}</h3>
                <div className="mt-2 flex items-center gap-1 text-sm font-semibold text-primary">
                  <Coins className="size-4" /> {r.custo} RAIZ
                </div>
                <Button
                  variant={podeTrocar ? "hero" : "outline"}
                  size="sm"
                  className="mt-4"
                  disabled={!podeTrocar}
                >
                  {podeTrocar ? "Resgatar agora" : `Faltam ${r.custo - cidadaoDemo.raiz}`}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
