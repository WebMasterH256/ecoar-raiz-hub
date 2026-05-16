import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Sprout,
  Utensils,
  Recycle,
  ArrowRight,
  MapPin,
  Sparkles,
  Users,
  Leaf,
  Building2,
  Trophy,
  Coins,
} from "lucide-react";
import { SiteHeader } from "@/components/ecoar/SiteHeader";
import { Logo } from "@/components/ecoar/Logo";
import { Button } from "@/components/ui/button";
import { suasOrgaos, frasesInstitucionais } from "@/lib/ecoar-data";
import visita1 from "@/assets/comunidade/visita-1.jpeg";
import visita2 from "@/assets/comunidade/visita-2.jpeg";
import visita3 from "@/assets/comunidade/visita-3.jpeg";
import visita4 from "@/assets/comunidade/visita-4.jpeg";
import visita5 from "@/assets/comunidade/visita-5.jpeg";
import visita6 from "@/assets/comunidade/visita-6.jpeg";

const visitas = [
  { src: visita1, legenda: "Encontro institucional na Associação Cultural Raízes do Sertão" },
  { src: visita2, legenda: "Escuta ativa com lideranças comunitárias" },
  { src: visita4, legenda: "Diálogo com gestoras culturais do território" },
  { src: visita3, legenda: "Reconhecimento do espaço de convivência" },
  { src: visita5, legenda: "Visita técnica às obras de ampliação" },
  { src: visita6, legenda: "Levantamento de demandas estruturais" },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ECOAR — Estratégia de Cuidado, Oportunidades, Alimentação e Reaproveitamento" },
      {
        name: "description",
        content:
          "Plataforma institucional da Prefeitura de Arcoverde que transforma sustentabilidade em participação cidadã com a moeda digital RAIZ.",
      },
      { property: "og:title", content: "ECOAR — Prefeitura de Arcoverde" },
      {
        property: "og:description",
        content: "Conectando famílias, hortas, cozinhas e reaproveitamento no Portal do Sertão.",
      },
    ],
  }),
  component: Landing,
});

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-surface/70 p-5 shadow-soft backdrop-blur">
      <div className="font-display text-3xl font-bold text-gradient-sun">{value}</div>
      <div className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

function Landing() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="container mx-auto grid gap-12 px-4 py-20 lg:grid-cols-[1.2fr_1fr] lg:py-28">
          <motion.div initial="hidden" animate="show" variants={fadeUp}>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-surface/70 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary backdrop-blur">
              <Sparkles className="size-3.5" /> Prefeitura de Arcoverde • Inovação Social
            </div>
            <h1 className="font-display text-4xl font-bold leading-[1.05] text-foreground sm:text-5xl lg:text-6xl">
              Transformando sustentabilidade em <span className="text-gradient-sun">participação social</span> no Portal do Sertão
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Uma plataforma pública que conecta famílias, ações comunitárias, alimentação,
              reaproveitamento e cidadania — com a moeda digital{" "}
              <span className="font-semibold text-foreground">sementes</span>.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/login">
                <Button variant="hero" size="xl">
                  Cadastrar Família <ArrowRight className="size-4" />
                </Button>
              </Link>
              <Link to="/app">
                <Button variant="outline" size="xl">
                  Acessar Plataforma
                </Button>
              </Link>
              <Link to="/admin">
                <Button variant="ghost" size="xl">
                  Painel da Gestão
                </Button>
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Stat value="2.400+" label="Famílias atendidas" />
              <Stat value="85" label="Hortas comunitárias" />
              <Stat value="12" label="Cozinhas ativas" />
              <Stat value="18 t" label="Desperdício reduzido" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative mx-auto flex w-full max-w-md items-center justify-center"
          >
            <div className="absolute inset-0 -z-10 rounded-full bg-gradient-sun opacity-20 blur-3xl" />
            <div className="relative aspect-square w-full max-w-sm rounded-[2.5rem] border border-border/60 bg-surface/80 p-8 shadow-glow backdrop-blur">
              <div className="flex h-full flex-col items-center justify-center text-center">
                <Logo size={120} withText={false} />
                <div className="mt-6 font-display text-2xl font-bold tracking-tight">
                  ECOAR
                </div>
                <p className="mt-2 max-w-[16rem] text-xs leading-relaxed text-muted-foreground">
                  Estratégia de Cuidado, Oportunidades, Alimentação e Reaproveitamento.
                </p>
                <div className="mt-6 flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-xs font-semibold text-accent-foreground">
                  <Coins className="size-3.5 text-primary" /> Moeda digital sementes
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* moving phrases ribbon */}
        <div className="border-y border-border/60 bg-surface/60 backdrop-blur">
          <div className="container mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-2 px-4 py-3 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            {frasesInstitucionais.slice(0, 5).map((f) => (
              <span key={f} className="flex items-center gap-2">
                <Leaf className="size-3 text-primary" /> {f}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* PILARES */}
      <section id="pilares" className="container mx-auto px-4 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Os três pilares
          </div>
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            Produzir, consumir e reaproveitar
          </h2>
          <p className="mt-3 text-muted-foreground">
            Um ciclo virtuoso que conecta o campo, a mesa e o território.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Sprout,
              title: "Produzir",
              text: "Fortalecimento da agricultura familiar e produção sustentável.",
            },
            {
              icon: Utensils,
              title: "Consumir",
              text: "Segurança alimentar e distribuição consciente.",
            },
            {
              icon: Recycle,
              title: "Reaproveitar",
              text: "Economia circular e combate ao desperdício.",
            },
          ].map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group relative overflow-hidden rounded-3xl border border-border/60 bg-surface p-8 shadow-soft transition-all hover:-translate-y-1 hover:shadow-glow"
            >
              <div className="absolute -right-10 -top-10 size-40 rounded-full bg-gradient-sun opacity-10 blur-2xl transition-opacity group-hover:opacity-30" />
              <div className="mb-5 inline-flex size-14 items-center justify-center rounded-2xl bg-gradient-sun text-primary-foreground shadow-glow">
                <p.icon className="size-7" />
              </div>
              <h3 className="font-display text-xl font-bold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PORTAL DO SERTÃO */}
      <section id="sobre" className="bg-surface-soft">
        <div className="container mx-auto grid gap-10 px-4 py-20 lg:grid-cols-2">
          <div>
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Portal do Sertão
            </div>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              Arcoverde — Pernambuco<br />
              <span className="text-gradient-sun">Cidade forte novamente</span>
            </h2>
            <p className="mt-5 text-muted-foreground">
              No coração do sertão pernambucano, o ECOAR articula assistência social, segurança
              alimentar e tecnologia em torno das famílias. A plataforma traduz cada hora doada,
              cada quilo reaproveitado e cada planta cultivada em sementes — a moeda digital que
              valoriza quem cuida do território.
            </p>
            <p className="mt-3 text-muted-foreground">
              Um modelo replicável de gestão pública inteligente, com inteligência territorial,
              participação cidadã e impacto mensurável.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {["Inovação social", "Smart City", "GovTech", "Economia circular"].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-medium text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { i: Users, k: "12 bairros", v: "atendidos" },
              { i: MapPin, k: "47 pontos", v: "na Rede ECOAR" },
              { i: Coins, k: "184k sementes", v: "distribuídas" },
              { i: Trophy, k: "98%", v: "satisfação cidadã" },
            ].map(({ i: Icon, k, v }) => (
              <div
                key={k}
                className="rounded-2xl border border-border bg-surface p-6 shadow-soft"
              >
                <Icon className="size-6 text-primary" />
                <div className="mt-4 font-display text-2xl font-bold">{k}</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">
                  {v}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTEGRAÇÃO SUAS */}
      <section id="suas" className="container mx-auto px-4 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Integração SUAS
          </div>
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            Em rede com a proteção social municipal
          </h2>
          <p className="mt-3 text-muted-foreground">
            O ECOAR atua integrado à rede socioassistencial municipal, fortalecendo políticas
            públicas por meio da tecnologia, participação cidadã e inteligência territorial.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {suasOrgaos.map((o, i) => (
            <motion.div
              key={o.sigla}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="group relative flex gap-4 rounded-3xl border border-border/60 bg-surface p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-glow"
            >
              <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-white p-2 shadow-soft ring-1 ring-border/60">
                <img src={o.logo} alt={`Logo ${o.sigla}`} className="size-full object-contain" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-lg font-bold">{o.sigla}</h3>
                  <span className="inline-flex items-center gap-1 rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-success">
                    <span className="size-1.5 rounded-full bg-success" /> Integrado
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">{o.nome}</div>
                <p className="mt-2 text-sm text-foreground/80">{o.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* COMUNIDADE EM AÇÃO */}
      <section id="comunidade" className="container mx-auto px-4 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Comunidade em ação
          </div>
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            Presença viva no território do Sertão
          </h2>
          <p className="mt-3 text-muted-foreground">
            Registros das visitas técnicas e escutas comunitárias que dão base ao ECOAR — o cuidado público acontece no encontro com as pessoas.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visitas.map((v, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-[2rem] border border-border/40 bg-white/50 p-2 shadow-soft backdrop-blur-sm transition-all hover:shadow-glow"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
                <img
                  src={v.src}
                  alt={v.legenda}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Decorative overlay for better integration */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity group-hover:opacity-80" />
                
                <div className="absolute top-4 left-4">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md border border-white/20">
                    <MapPin className="size-3" /> Arcoverde
                  </div>
                </div>

                <figcaption className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-sm font-semibold leading-snug text-white drop-shadow-sm">
                    {v.legenda}
                  </p>
                </figcaption>
              </div>
            </motion.figure>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 pb-24">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-sun p-10 text-primary-foreground shadow-glow sm:p-16">
          <div className="absolute -right-20 -top-20 size-80 rounded-full bg-white/20 blur-3xl" />
          <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.25em] opacity-80">
                O cuidado público em movimento
              </div>
              <h2 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl">
                Faça parte do ECOAR. Cada ação ecoa pelo Sertão.
              </h2>
              <p className="mt-3 max-w-xl opacity-90">
                Cadastre sua família, participe das atividades comunitárias e acumule sementes para
                trocar por benefícios reais oferecidos pela Prefeitura de Arcoverde.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link to="/login">
                <Button size="xl" className="bg-white text-primary hover:bg-white/90">
                  Cadastrar Família
                </Button>
              </Link>
              <Link to="/app">
                <Button
                  size="xl"
                  variant="outline"
                  className="border-white/40 bg-transparent text-primary-foreground hover:bg-white/10"
                >
                  Acessar Plataforma
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border/60 bg-surface">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row">
          <Logo />
          <div className="text-xs">
            © {new Date().getFullYear()} Prefeitura de Arcoverde — ECOAR. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
