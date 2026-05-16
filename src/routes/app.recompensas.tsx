import { createFileRoute } from "@tanstack/react-router";
import { recompensas as initialRecompensas, cidadaoDemo } from "@/lib/ecoar-data";
import { Button } from "@/components/ui/button";
import { Coins, Gift, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { recompensaService } from "@/lib/supabase";
import { toast } from "sonner";

export const Route = createFileRoute("/app/recompensas")({
  component: RecompensasPage,
});

function RecompensasPage() {
  const [recompensas, setRecompensas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await recompensaService.getRecompensas();
        setRecompensas(data.length > 0 ? data : initialRecompensas);
      } catch (e) {
        setRecompensas(initialRecompensas);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Cuidado que se espalha
          </div>
          <h1 className="mt-2 font-display text-3xl font-bold">Recompensas</h1>
          <p className="mt-1 text-muted-foreground">Troque sementes por benefícios reais.</p>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface px-5 py-3 shadow-soft">
          <Coins className="size-5 text-primary" />
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Saldo</div>
            <div className="font-display text-xl font-bold">{cidadaoDemo.sementes} sementes</div>
          </div>
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {recompensas.map((r) => {
          const podeTrocar = cidadaoDemo.sementes >= r.custo;
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
                  <Coins className="size-4" /> {r.custo} sementes
                </div>
                <Button
                  variant={podeTrocar ? "hero" : "outline"}
                  size="sm"
                  className="mt-4"
                  disabled={!podeTrocar}
                  onClick={async () => {
                    const promise = recompensaService.resgatar(r.id, "demo-user-id", r.custo);
                    toast.promise(promise, {
                      loading: 'Processando resgate...',
                      success: 'Recompensa resgatada!',
                      error: (err) => err.message || 'Erro ao resgatar.',
                    });
                  }}
                >
                  {podeTrocar ? "Resgatar agora" : `Faltam ${r.custo - cidadaoDemo.sementes}`}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
