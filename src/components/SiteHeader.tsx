import { Link } from "@tanstack/react-router";
import { EcoarLogo } from "./EcoarLogo";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function SiteHeader() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="transition-opacity hover:opacity-90">
          <EcoarLogo size={42} tagline />
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-bold uppercase tracking-wider text-muted-foreground lg:flex">
          <a href="#pilares" className="hover:text-primary transition-colors">Pilares</a>
          <a href="#portal" className="hover:text-primary transition-colors">Arcoverde</a>
          <a href="#suas" className="hover:text-primary transition-colors">Integração</a>
          <a href="#galeria" className="hover:text-primary transition-colors">Galeria</a>
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <Link to="/painel">
              <Button className="rounded-full bg-primary text-primary-foreground font-bold shadow-soft transition-transform hover:scale-105">
                Meu Painel
              </Button>
            </Link>
          ) : (
            <>
              <Link to="/auth" search={{ mode: 'login' }}>
                <Button variant="ghost" className="hidden font-bold hover:text-primary sm:flex">
                  Entrar
                </Button>
              </Link>
              <Link to="/auth" search={{ mode: 'signup' }}>
                <Button className="rounded-full bg-primary text-primary-foreground font-bold shadow-soft transition-transform hover:scale-105">
                  Começar agora
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
