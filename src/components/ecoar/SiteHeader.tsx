import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="transition-opacity hover:opacity-80">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
          <a href="/#sobre" className="transition-colors hover:text-foreground">Sobre</a>
          <a href="/#pilares" className="transition-colors hover:text-foreground">Pilares</a>
          <a href="/#suas" className="transition-colors hover:text-foreground">Integração SUAS</a>
          <Link to="/admin" className="transition-colors hover:text-foreground">Painel</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/login">
            <Button variant="ghost" size="sm">Entrar</Button>
          </Link>
          <Link to="/login">
            <Button variant="hero" size="sm">Cadastrar Família</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
