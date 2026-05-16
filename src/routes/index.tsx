import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { EcoarLogo } from "@/components/EcoarLogo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import logo from "@/assets/ecoar-logo.png";
import concept from "@/assets/ecoar-concept.png";
import v1 from "@/assets/visita-1.jpg";
import v2 from "@/assets/visita-2.jpg";
import v3 from "@/assets/visita-3.jpg";
import v4 from "@/assets/visita-4.jpg";
import v5 from "@/assets/visita-5.jpg";
import vEquipe from "@/assets/visita-equipe.jpg";
import crasLogo from "@/assets/orgaos/cras.png";
import creasLogo from "@/assets/orgaos/creas.png";
import scfvLogo from "@/assets/orgaos/scfv.png";
import bpcLogo from "@/assets/orgaos/bpc.png";
import bolsaFamiliaLogo from "@/assets/orgaos/bolsa-familia.png";
import cadunicoLogo from "@/assets/orgaos/cadunico.png";
import { Sprout, Recycle, Apple, MapPin, Users, Leaf, TreePine, ArrowRight, Quote } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ECOAR — Prefeitura de Arcoverde · Inovação Social" },
      { name: "description", content: "Plataforma pública que conecta famílias, ações comunitárias, alimentação, reaproveitamento e cidadania no Portal do Sertão." },
      { property: "og:title", content: "ECOAR — Cidade Forte Novamente" },
      { property: "og:description", content: "Transformando ações sustentáveis em participação social por meio da moeda digital sementes." },
    ],
  }),
  component: Landing,
});

const stats = [
  { v: "2.400+", l: "famílias atendidas" },
  { v: "85", l: "hortas comunitárias" },
  { v: "12", l: "cozinhas ativas" },
  { v: "18 t", l: "desperdício reduzido" },
];

const pillars = [
  { icon: Sprout, name: "Produzir", desc: "Fortalecimento da agricultura familiar, hortas urbanas e produção sustentável." },
  { icon: Apple, name: "Consumir", desc: "Segurança alimentar e distribuição consciente para todas as famílias." },
  { icon: Recycle, name: "Reaproveitar", desc: "Economia circular e combate ativo ao desperdício no município." },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 ecoar-radial pointer-events-none" />
        <div className="absolute -top-32 -right-24 h-[520px] w-[520px] rounded-full bg-primary/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 pb-24 pt-16 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:pt-24">
          <div className="lg:col-span-7">
            <span className="ecoar-chip">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Prefeitura de Arcoverde · Inovação Social
            </span>
            <h1 className="mt-6 font-display text-5xl font-extrabold leading-[1.05] text-foreground sm:text-6xl lg:text-7xl">
              Transformando <span className="text-primary">sustentabilidade</span> em participação social no Portal do Sertão.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Uma plataforma pública que conecta famílias, ações comunitárias, alimentação, reaproveitamento e cidadania — 
              transformando cuidado em <span className="font-semibold text-foreground">sementes</span>, a moeda social do ECOAR.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/auth" search={{ mode: 'signup' }}>
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-elegant rounded-full px-7 h-12 text-base font-semibold">
                  Cadastrar Família <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/auth" search={{ mode: 'login' }}>
                <Button size="lg" variant="outline" className="border-2 border-primary/30 text-foreground hover:bg-primary-soft rounded-full px-7 h-12 text-base font-semibold">
                  Acessar Plataforma
                </Button>
              </Link>
              <Link to="/admin">
                <Button size="lg" variant="ghost" className="text-foreground hover:text-primary rounded-full px-5 h-12 text-base font-semibold">
                  Painel da Gestão
                </Button>
              </Link>
            </div>

            <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
              {stats.map(s => (
                <div key={s.l}>
                  <dt className="font-display text-3xl font-extrabold text-primary sm:text-4xl">{s.v}</dt>
                  <dd className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">{s.l}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative lg:col-span-5">
            <div className="relative mx-auto aspect-square max-w-md">
              <div className="absolute inset-0 rounded-full ecoar-gradient opacity-20 blur-3xl animate-ecoar-pulse" />
              <div className="relative flex h-full items-center justify-center">
                <img src={logo} alt="Logotipo ECOAR" className="w-full max-w-[420px] animate-ecoar-float drop-shadow-2xl" />
              </div>
            </div>
            <div className="absolute -bottom-4 left-4 max-w-[260px] rounded-2xl border border-border/70 bg-card p-4 shadow-soft">
              <Quote className="h-5 w-5 text-primary" />
              <p className="mt-2 text-sm font-medium leading-snug text-foreground">
                Eco de sustentabilidade. Cuidado que reverbera.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PILARES */}
      <section id="pilares" className="border-t border-border/60 bg-secondary/30 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="ecoar-chip">Estrutura ECOAR</span>
            <h2 className="mt-4 font-display text-4xl font-extrabold sm:text-5xl">
              Três pilares para <span className="text-primary">cidades fortes</span>.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Estratégia de Cuidado, Oportunidades, Alimentação e Reaproveitamento — em movimento contínuo.
            </p>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {pillars.map(p => (
              <Card key={p.name} className="group relative overflow-hidden border-border/60 bg-card p-8 transition-all hover:-translate-y-1 hover:shadow-elegant">
                <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/10 transition-transform group-hover:scale-125" />
                <div className="relative">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl ecoar-gradient text-primary-foreground shadow-elegant">
                    <p.icon className="h-7 w-7" strokeWidth={2.2} />
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-bold">{p.name}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{p.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CONCEITO VISUAL */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="ecoar-chip">Plataforma do cidadão</span>
              <h2 className="mt-4 font-display text-4xl font-extrabold sm:text-5xl">
                Cada ação vira <span className="text-primary">sementes</span>.<br />Cada semente vira oportunidade.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                Um painel intuitivo onde a família acompanha saldo, nível, próximas atividades, ranking comunitário e recompensas municipais — tudo em um só lugar.
              </p>
              <ul className="mt-8 space-y-3 text-base">
                {["Saldo de sementes em tempo real e histórico completo", "Inscrição em mutirões, oficinas e colheitas", "Ranking comunitário com 4 níveis de progressão", "Mapa interativo da Rede ECOAR Arcoverde"].map(t => (
                  <li key={t} className="flex items-start gap-3">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">✓</span>
                    <span className="text-foreground">{t}</span>
                  </li>
                ))}
              </ul>
              <Link to="/auth"><Button className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-7 h-12 font-semibold shadow-elegant">Conhecer a plataforma <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
            </div>
            <div className="relative">
              <div className="absolute -inset-6 rounded-[2rem] ecoar-gradient opacity-20 blur-2xl" />
              <img src={concept} alt="Painel do cidadão ECOAR" className="relative w-full rounded-2xl border border-border shadow-elegant" />
            </div>
          </div>
        </div>
      </section>

      {/* PORTAL DO SERTÃO */}
      <section id="portal" className="relative overflow-hidden border-y border-border/60 bg-gradient-to-br from-primary-soft via-background to-background py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-5">
            <span className="ecoar-chip"><MapPin className="h-3 w-3" /> Arcoverde · Pernambuco</span>
            <h2 className="mt-4 font-display text-5xl font-extrabold leading-tight sm:text-6xl">
              Portal do Sertão.<br /><span className="text-primary">Cidade Forte Novamente.</span>
            </h2>
          </div>
          <div className="lg:col-span-7">
            <p className="text-xl leading-relaxed text-foreground/85">
              No coração do sertão pernambucano, o ECOAR fortalece redes de cuidado, dignidade e oportunidades para as famílias arcoverdenses.
            </p>
            <p className="mt-5 text-lg italic leading-relaxed text-muted-foreground">
              "Conectar pessoas, fortalecer territórios — impacto social que ecoa no território."
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[{ i: TreePine, l: "Sertão" }, { i: Users, l: "Famílias" }, { i: Leaf, l: "Hortas" }, { i: MapPin, l: "Território" }].map(x => (
                <div key={x.l} className="rounded-2xl border border-border bg-card p-4 text-center">
                  <x.i className="mx-auto h-6 w-6 text-primary" />
                  <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{x.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SUAS */}
      <section id="suas" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="ecoar-chip">Integração Institucional</span>
          <h2 className="mt-4 font-display text-4xl font-extrabold sm:text-5xl">
            O ECOAR atua integrado à <span className="text-primary">rede socioassistencial</span> municipal.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">CRAS · CREAS · SCFV · BPC · Bolsa Família · CadÚnico</p>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {[
              { name: "CRAS", logo: crasLogo },
              { name: "CREAS", logo: creasLogo },
              { name: "SCFV", logo: scfvLogo },
              { name: "BPC", logo: bpcLogo },
              { name: "Bolsa Família", logo: bolsaFamiliaLogo },
              { name: "CadÚnico", logo: cadunicoLogo },
            ].map(s => (
              <div key={s.name} className="flex h-32 items-center justify-center rounded-2xl border-2 border-border bg-card p-4 transition-all hover:border-primary hover:bg-primary-soft hover:shadow-elegant">
                <img src={s.logo} alt={`Logo ${s.name}`} className="max-h-full max-w-full object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALERIA */}
      <section id="galeria" className="border-y border-border/60 bg-secondary/30">
        <div className="mx-auto px-0">
          <div className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between gap-6 pb-12">
              <div>
                <span className="ecoar-chip">Território vivo</span>
                <h2 className="mt-4 font-display text-4xl font-extrabold sm:text-5xl">
                  Visitas técnicas e <span className="text-primary">rede em ação</span>.
                </h2>
                <p className="mt-4 max-w-2xl text-muted-foreground">
                  Equipe da Prefeitura junto à Associação Cultural Raízes do Sertão — escuta, articulação e cuidado público em movimento.
                </p>
              </div>
            </div>
          </div>
          <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-4 w-full">
            <img src={vEquipe} alt="Equipe ECOAR Arcoverde" className="h-[400px] w-full object-cover sm:col-span-2 sm:row-span-2 sm:h-[600px]" />
            <img src={v1} alt="Visita à associação Raízes do Sertão" className="h-[200px] w-full object-cover sm:h-[300px]" />
            <img src={v2} alt="Diálogo com lideranças comunitárias" className="h-[200px] w-full object-cover sm:h-[300px]" />
            <img src={v3} alt="Visita ao espaço cultural" className="h-[200px] w-full object-cover sm:h-[300px]" />
            <img src={v4} alt="Vistoria de obras comunitárias" className="h-[200px] w-full object-cover sm:h-[300px]" />
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 ecoar-gradient opacity-95" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 py-20 text-center sm:px-6 lg:px-8">
          <EcoarLogo size={56} withText={false} />
          <h2 className="max-w-3xl font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl">
            Sustentabilidade que gera transformação. Participação que fortalece comunidades.
          </h2>
          <p className="max-w-2xl text-lg text-white/90">
            Junte-se ao movimento ECOAR. Cadastre sua família e comece a transformar cuidado em sementes.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/auth" search={{ mode: 'signup' }}>
              <Button size="lg" className="bg-white text-primary hover:bg-white/95 rounded-full px-8 h-12 font-bold shadow-2xl">Cadastrar Família</Button>
            </Link>
            <Link to="/admin">
              <Button size="lg" variant="outline" className="border-2 border-white/80 bg-transparent text-white hover:bg-white/10 rounded-full px-8 h-12 font-bold">Painel da Gestão</Button>
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
