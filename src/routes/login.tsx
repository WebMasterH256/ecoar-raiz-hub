import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Logo } from "@/components/ecoar/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Mail, ShieldCheck, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Acessar ECOAR — Prefeitura de Arcoverde" },
      { name: "description", content: "Entre como cidadão ou coordenação para acessar a plataforma ECOAR." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [tab, setTab] = useState<"cidadao" | "gestao">("cidadao");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  function entrar(e: React.FormEvent) {
    e.preventDefault();
    if (tab === "gestao") {
      navigate({ to: "/admin" });
    } else {
      navigate({ to: "/app" });
    }
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-[1.1fr_1fr]">
      <div className="relative hidden overflow-hidden bg-gradient-sun p-12 text-primary-foreground lg:flex lg:flex-col lg:justify-between">
        <div className="absolute -right-32 -top-32 size-96 rounded-full bg-white/15 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 size-80 rounded-full bg-white/10 blur-3xl" />
        <Link to="/" className="relative">
          <div className="rounded-2xl bg-white/15 p-2 backdrop-blur w-fit">
            <Logo />
          </div>
        </Link>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative max-w-md"
        >
          <div className="text-xs font-semibold uppercase tracking-[0.25em] opacity-80">
            Cuidado que se espalha
          </div>
          <h1 className="mt-3 font-display text-4xl font-bold leading-tight">
            O Portal do Sertão entra na palma da sua mão.
          </h1>
          <p className="mt-4 opacity-90">
            Acompanhe atividades, acumule RAIZ e participe da rede que cuida de Arcoverde.
          </p>
        </motion.div>
        <div className="relative text-xs opacity-80">
          Prefeitura de Arcoverde • Inovação Social
        </div>
      </div>

      <div className="flex items-center justify-center bg-background p-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="mb-6 lg:hidden">
            <Logo />
          </div>
          <h2 className="font-display text-3xl font-bold">Entrar na plataforma</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Escolha o tipo de acesso para continuar.
          </p>

          <div className="mt-6 inline-flex rounded-full border border-border bg-surface p-1">
            {(["cidadao", "gestao"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                  tab === t
                    ? "bg-gradient-sun text-primary-foreground shadow-glow"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t === "cidadao" ? "Cidadão" : "Coordenação"}
              </button>
            ))}
          </div>

          <form onSubmit={entrar} className="mt-6 space-y-4">
            <div>
              <Label htmlFor="email">E-mail</Label>
              <div className="relative mt-1.5">
                <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder={
                    tab === "gestao" ? "coordenacao@ecoar.admin" : "voce@email.com"
                  }
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9"
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="senha">Senha</Label>
              <div className="relative mt-1.5">
                <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="senha"
                  type="password"
                  placeholder={tab === "gestao" ? "Ecoar@2026Demo" : "••••••••"}
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="pl-9"
                  required
                />
              </div>
            </div>

            <Button type="submit" variant="hero" size="lg" className="w-full">
              Entrar <ArrowRight className="size-4" />
            </Button>

            {tab === "cidadao" && (
              <Button type="button" variant="outline" size="lg" className="w-full">
                <svg className="size-4" viewBox="0 0 48 48" aria-hidden>
                  <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.4 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 8 3l5.7-5.7C34 5.1 29.3 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21c0-1.2-.1-2.4-.4-3.5z"/>
                  <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.7 19 13 24 13c3 0 5.8 1.1 8 3l5.7-5.7C34 6.6 29.3 4.5 24 4.5 16.4 4.5 9.8 8.7 6.3 14.7z"/>
                  <path fill="#4CAF50" d="M24 43.5c5.2 0 9.9-2 13.5-5.2l-6.2-5.2c-2 1.3-4.5 2.1-7.3 2.1-5.3 0-9.7-3.6-11.3-8.4l-6.6 5.1C9.6 39.6 16.2 43.5 24 43.5z"/>
                  <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.2 5.6l6.2 5.2c-.4.4 6.7-4.9 6.7-14.8 0-1.2-.1-2.4-.4-3.5z"/>
                </svg>
                Continuar com Google
              </Button>
            )}
          </form>

          {tab === "gestao" && (
            <div className="mt-6 rounded-2xl border border-primary/30 bg-accent/40 p-4 text-xs text-foreground/80">
              <div className="mb-2 flex items-center gap-2 font-semibold text-foreground">
                <ShieldCheck className="size-4 text-primary" /> Conta demo
              </div>
              <div>E-mail: <span className="font-mono">coordenacao@ecoar.admin</span></div>
              <div>Senha: <span className="font-mono">Ecoar@2026Demo</span></div>
              <div className="mt-2 text-muted-foreground">
                Troca obrigatória no primeiro acesso • bloqueio após 5 tentativas • criptografia simulada.
              </div>
            </div>
          )}

          <p className="mt-6 text-center text-xs text-muted-foreground">
            <Link to="/" className="hover:text-foreground">← Voltar ao site institucional</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
