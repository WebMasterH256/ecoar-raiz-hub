import { Link } from "@tanstack/react-router";
import { EcoarLogo } from "./EcoarLogo";
import { Camera, MessageCircle, Code2 } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/30 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <EcoarLogo size={42} tagline />
            <p className="mt-6 max-w-sm text-lg leading-relaxed text-muted-foreground font-medium">
              Estratégia de Cuidado, Oportunidades, Alimentação e Reaproveitamento. 
              A inovação social que Arcoverde precisava.
            </p>
            <div className="mt-8 flex gap-4">
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-card border border-border text-muted-foreground transition-all hover:border-primary hover:text-primary hover:shadow-soft">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-card border border-border text-muted-foreground transition-all hover:border-primary hover:text-primary hover:shadow-soft">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-card border border-border text-muted-foreground transition-all hover:border-primary hover:text-primary hover:shadow-soft">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-display text-xl font-bold text-foreground">Plataforma</h4>
            <ul className="mt-6 space-y-4 text-sm font-semibold text-muted-foreground">
              <li><Link to="/auth" className="hover:text-primary">Cadastrar Família</Link></li>
              <li><Link to="/auth" className="hover:text-primary">Acessar Sistema</Link></li>
              <li><Link to="/admin" className="hover:text-primary">Painel da Gestão</Link></li>
              <li><a href="#" className="hover:text-primary">Manual do Cidadão</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display text-xl font-bold text-foreground">Institucional</h4>
            <ul className="mt-6 space-y-4 text-sm font-semibold text-muted-foreground">
              <li><a href="#" className="hover:text-primary">Prefeitura de Arcoverde</a></li>
              <li><a href="#" className="hover:text-primary">Transparência</a></li>
              <li><a href="#" className="hover:text-primary">Privacidade</a></li>
              <li><a href="#" className="hover:text-primary">Contato</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            © 2026 ECOAR · Prefeitura Municipal de Arcoverde
          </p>
          <p className="text-xs font-bold uppercase tracking-widest text-primary">
            Cidade Forte Novamente
          </p>
        </div>
      </div>
    </footer>
  );
}
