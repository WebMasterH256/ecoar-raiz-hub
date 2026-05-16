import { createFileRoute } from "@tanstack/react-router";
import { atividades as initialAtividades } from "@/lib/ecoar-data";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { atividadesService } from "@/lib/supabase";
import { toast } from "sonner";

export const Route = createFileRoute("/app/atividades")({
  component: AtividadesPage,
});

function AtividadesPage() {
  const [atividades, setAtividades] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await atividadesService.getAtividades();
        setAtividades(data.length > 0 ? data : initialAtividades);
      } catch (e) {
        setAtividades(initialAtividades);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const emAndamento = atividades.filter((a) => a.status === "Em andamento");
  const emBreve = atividades.filter((a) => a.status === "Em breve");

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <header>
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Participação que fortalece comunidades
        </div>
        <h1 className="mt-2 font-display text-3xl font-bold">Atividades ECOAR</h1>
        <p className="mt-1 text-muted-foreground">
          Inscreva-se nas ações comunitárias e acumule sementes.
        </p>
      </header>

      <Section title="Em andamento" items={emAndamento} accent="success" />
      <Section title="Em breve" items={emBreve} accent="primary" />
    </div>
  );
}

function Section({
  title,
  items,
  accent,
}: {
  title: string;
  items: typeof atividades;
  accent: "primary" | "success";
}) {
  return (
    <section>
      <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-bold">
        <span className={`size-2 rounded-full ${accent === "success" ? "bg-success" : "bg-primary"}`} /> {title}
      </h2>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((a, i) => {
          const lotado = a.inscritos >= a.vagas;
          return (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex flex-col rounded-2xl border border-border bg-surface p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-glow"
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
              <p className="mt-1 flex-1 text-sm text-muted-foreground">{a.descricao}</p>
              <div className="mt-4 space-y-1.5 text-xs text-muted-foreground">
                <div className="flex items-center gap-2"><Calendar className="size-3.5" /> {a.data}</div>
                <div className="flex items-center gap-2"><MapPin className="size-3.5" /> {a.local}</div>
                <div className="flex items-center gap-2"><Users className="size-3.5" /> {a.inscritos}/{a.vagas} inscritos</div>
              </div>
              <div className="mt-4 flex items-center justify-between gap-2 border-t border-border pt-4">
                <span className="font-semibold text-primary">+{a.sementes} sementes</span>
                <Button 
                  variant={lotado ? "outline" : "hero"} 
                  size="sm"
                  onClick={async () => {
                    if (lotado) return;
                    const promise = atividadesService.inscrever(a.id, "demo-user-id");
                    toast.promise(promise, {
                      loading: 'Inscrevendo...',
                      success: 'Inscrição realizada com sucesso!',
                      error: 'Erro ao se inscrever.',
                    });
                  }}
                >
                  {lotado ? "Lista de espera" : "Inscrever-se"}
                </Button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
