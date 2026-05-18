import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { EcoarLogo } from "@/components/EcoarLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { ArrowLeft, Shield, User } from "lucide-react";

export const Route = createFileRoute("/auth")({
  validateSearch: (search: Record<string, unknown>): { mode: "login" | "signup" } => ({
    mode: (search.mode === "signup" ? "signup" : "login") as "login" | "signup",
  }),
  head: () => ({ meta: [{ title: "Acessar — ECOAR" }, { name: "description", content: "Entre na plataforma ECOAR como cidadão ou coordenadora." }] }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const search = Route.useSearch();
  const [mode, setMode] = useState<"login" | "signup">(search.mode as "login" | "signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleEmailAuth(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email, password,
          options: { data: { full_name: name } },
        });
        if (error) throw error;
        toast.success("Cadastro realizado com sucesso!");
        navigate({ to: "/painel" });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Bem-vindo de volta!");
        navigate({ to: "/painel" });
      }
    } catch (err: any) {
      toast.error(err.message || "Erro ao autenticar");
    } finally { setLoading(false); }
  }


  async function handleGoogle() {
    setLoading(true);
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin + "/painel" });
    if (result.error) { toast.error("Erro ao entrar com Google"); setLoading(false); return; }
    if (result.redirected) return;
    navigate({ to: "/painel" });
  }

  async function handleAdmin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        // Demo fallback: allow demo creds locally
        if (email === "coordenacao@ecoar.admin" && password === "Ecoar@2026Demo") {
          if (typeof window !== "undefined") window.sessionStorage?.setItem("ecoar_admin_demo", "1");
          toast.success("Acesso da coordenação concedido (modo demo).");
          navigate({ to: "/admin" });
          return;
        }
        throw error;
      }
      navigate({ to: "/admin" });
    } catch (err: any) {
      toast.error(err.message || "Acesso negado");
    } finally { setLoading(false); }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-soft via-background to-background">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4" /> Voltar
          </Link>
          <EcoarLogo size={36} tagline />
        </div>

        <div className="flex flex-1 items-center justify-center py-10">
          <div className="grid w-full max-w-5xl gap-10 lg:grid-cols-2">
            <div className="hidden flex-col justify-center lg:flex">
              <span className="ecoar-chip">Bem-vinda · Bem-vindo</span>
              <h1 className="mt-4 font-display text-5xl font-extrabold leading-tight">
                Sua participação <span className="text-primary">ecoa</span> no território.
              </h1>
              <p className="mt-5 text-lg text-muted-foreground">
                Entre como cidadão para acompanhar suas sementes, atividades e ranking — ou acesse o painel exclusivo da coordenação.
              </p>
              <ul className="mt-8 space-y-3 text-sm text-muted-foreground">
                <li>✓ Saldo de sementes e progresso de nível</li>
                <li>✓ Inscrição em mutirões, oficinas e colheitas</li>
                <li>✓ Mapa interativo da Rede ECOAR</li>
                <li>✓ Recompensas municipais e certificados</li>
              </ul>
            </div>

            <Card className="border-border/60 bg-card p-8 shadow-elegant">
              <Tabs defaultValue="cidadao" className="w-full">
                <TabsList className="grid w-full grid-cols-2 rounded-full bg-secondary p-1">
                  <TabsTrigger value="cidadao" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"><User className="mr-2 h-4 w-4" /> Cidadão</TabsTrigger>
                  <TabsTrigger value="coord" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"><Shield className="mr-2 h-4 w-4" /> Coordenadora</TabsTrigger>
                </TabsList>

                <TabsContent value="cidadao" className="mt-6 space-y-4">
                  <Button onClick={handleGoogle} disabled={loading} variant="outline" className="w-full h-11 rounded-xl border-2 font-semibold">
                    <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A10.99 10.99 0 0012 23z"/><path fill="#FBBC05" d="M5.84 14.09A6.6 6.6 0 015.5 12c0-.74.13-1.46.35-2.09V7.07H2.18A11 11 0 001 12c0 1.78.43 3.46 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"/></svg>
                    Continuar com Google
                  </Button>
                  <div className="relative my-2"><div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div><div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-3 text-muted-foreground font-semibold tracking-widest">ou</span></div></div>
                  <form onSubmit={handleEmailAuth} className="space-y-4">
                    {mode === "signup" && (
                      <div><Label htmlFor="name">Nome completo</Label><Input id="name" value={name} onChange={e => setName(e.target.value)} required className="mt-1.5 h-11" placeholder="Maria Silva" /></div>
                    )}
                    <div><Label htmlFor="email">Email</Label><Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1.5 h-11" placeholder="voce@email.com" /></div>
                    <div><Label htmlFor="pwd">Senha</Label><Input id="pwd" type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} className="mt-1.5 h-11" placeholder="••••••••" /></div>
                    <Button type="submit" disabled={loading} className="w-full h-11 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-elegant">
                      {loading ? "Aguarde…" : mode === "login" ? "Entrar" : "Cadastrar Família"}
                    </Button>
                  </form>
                  <p className="text-center text-sm text-muted-foreground">
                    {mode === "login" ? "Primeiro acesso?" : "Já tem conta?"}{" "}
                    <button type="button" onClick={() => setMode(mode === "login" ? "signup" : "login")} className="font-semibold text-primary hover:underline">
                      {mode === "login" ? "Cadastrar família" : "Fazer login"}
                    </button>
                  </p>
                </TabsContent>

                <TabsContent value="coord" className="mt-6 space-y-4">
                  <div className="rounded-xl border border-primary/30 bg-primary-soft p-4 text-sm">
                    <p className="font-semibold text-foreground">Acesso restrito · Coordenação ECOAR</p>
                    <p className="mt-1 text-muted-foreground">Demo: <code className="font-mono text-foreground">admin@email.com</code> · <code className="font-mono text-foreground">12345678</code></p>
                  </div>
                  <form onSubmit={handleAdmin} className="space-y-4">
                    <div><Label htmlFor="ae">Email institucional</Label><Input id="ae" type="email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1.5 h-11" /></div>
                    <div><Label htmlFor="ap">Senha</Label><Input id="ap" type="password" value={password} onChange={e => setPassword(e.target.value)} required className="mt-1.5 h-11" /></div>
                    <Button type="submit" disabled={loading} className="w-full h-11 rounded-xl bg-foreground text-background hover:bg-foreground/90 font-semibold">
                      {loading ? "Verificando…" : "Acessar Painel da Gestão"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
