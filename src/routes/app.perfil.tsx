import { createFileRoute } from "@tanstack/react-router";
import { cidadaoDemo } from "@/lib/ecoar-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/app/perfil")({
  component: PerfilPage,
});

function PerfilPage() {
  return (
    <div className="space-y-8">
      <header>
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Sustentabilidade que gera transformação
        </div>
        <h1 className="mt-2 font-display text-3xl font-bold">Meu perfil</h1>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
        <div className="rounded-3xl border border-border bg-surface p-6 text-center shadow-soft">
          <div className="mx-auto flex size-24 items-center justify-center rounded-full bg-gradient-sun text-3xl font-bold text-primary-foreground shadow-glow">
            {cidadaoDemo.iniciais}
          </div>
          <div className="mt-4 font-display text-xl font-bold">{cidadaoDemo.nome}</div>
          <div className="text-sm text-muted-foreground">{cidadaoDemo.bairro} • Arcoverde</div>
          <div className="mt-4 inline-flex rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
            {cidadaoDemo.nivel}
          </div>
        </div>

        <form className="space-y-4 rounded-3xl border border-border bg-surface p-6 shadow-soft">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Nome completo</Label>
              <Input defaultValue={cidadaoDemo.nome} />
            </div>
            <div>
              <Label>CPF</Label>
              <Input defaultValue="123.456.789-00" />
            </div>
            <div>
              <Label>E-mail</Label>
              <Input defaultValue="ana.paula@arcoverde.gov.br" />
            </div>
            <div>
              <Label>Telefone</Label>
              <Input defaultValue="(87) 99999-0000" />
            </div>
            <div className="sm:col-span-2">
              <Label>Bairro</Label>
              <Input defaultValue={cidadaoDemo.bairro} />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" type="button">Cancelar</Button>
            <Button variant="hero" type="submit">Salvar alterações</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
