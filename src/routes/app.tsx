import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import {
  Home,
  Calendar,
  Trophy,
  MapPin,
  Gift,
  History,
  User as UserIcon,
  LogOut,
} from "lucide-react";
import { Logo } from "@/components/ecoar/Logo";
import { cidadaoDemo } from "@/lib/ecoar-data";

export const Route = createFileRoute("/app")({
  head: () => ({
    meta: [{ title: "Plataforma Cidadão — ECOAR" }],
  }),
  component: AppLayout,
});

const nav = [
  { to: "/app", label: "Início", icon: Home, exact: true },
  { to: "/app/atividades", label: "Atividades", icon: Calendar },
  { to: "/app/ranking", label: "Ranking", icon: Trophy },
  { to: "/app/rede", label: "Rede ECOAR", icon: MapPin },
  { to: "/app/recompensas", label: "Recompensas", icon: Gift },
  { to: "/app/historico", label: "Histórico", icon: History },
  { to: "/app/perfil", label: "Perfil", icon: UserIcon },
] as const;

function AppLayout() {
  const loc = useLocation();
  return (
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="sticky top-0 hidden h-screen flex-col border-r border-border bg-sidebar p-5 lg:flex">
        <Link to="/" className="mb-8">
          <Logo />
        </Link>
        <nav className="flex-1 space-y-1">
          {nav.map((n) => {
            const active = n.exact
              ? loc.pathname === n.to
              : loc.pathname.startsWith(n.to);
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                  active
                    ? "bg-gradient-sun text-primary-foreground shadow-glow"
                    : "text-sidebar-foreground hover:bg-sidebar-accent"
                }`}
              >
                <n.icon className="size-4" />
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-4 rounded-2xl border border-border bg-surface p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-gradient-sun text-sm font-bold text-primary-foreground">
              {cidadaoDemo.iniciais}
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold">{cidadaoDemo.nome}</div>
              <div className="text-xs text-muted-foreground">{cidadaoDemo.bairro}</div>
            </div>
          </div>
          <Link to="/" className="mt-3 flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground">
            <LogOut className="size-3.5" /> Sair
          </Link>
        </div>
      </aside>

      {/* Mobile top nav */}
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background/90 px-4 py-3 backdrop-blur lg:hidden">
        <Link to="/"><Logo size={28} /></Link>
        <Link to="/" className="text-xs text-muted-foreground">Sair</Link>
      </div>

      <main className="min-w-0">
        <div className="container mx-auto max-w-6xl px-4 py-8 lg:px-8 lg:py-10">
          <Outlet />
        </div>
        {/* Mobile bottom nav */}
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 backdrop-blur lg:hidden">
          <div className="flex justify-around px-2 py-2">
            {nav.slice(0, 5).map((n) => {
              const active = n.exact ? loc.pathname === n.to : loc.pathname.startsWith(n.to);
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={`flex flex-col items-center gap-0.5 rounded-lg px-3 py-1.5 text-[10px] ${
                    active ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <n.icon className="size-5" />
                  {n.label}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="h-16 lg:hidden" />
      </main>
    </div>
  );
}
