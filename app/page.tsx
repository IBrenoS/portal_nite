import {
  ArrowDownIcon,
  ArrowRightIcon,
  CheckCircle2Icon,
  CircuitBoardIcon,
  FocusIcon,
  Layers3Icon,
  SmartphoneIcon,
} from "lucide-react";

import { brandAssets, brandDirection } from "@/biblioteca/brand";
import { siteConfig } from "@/biblioteca/site-config";
import { Container } from "@/components/layout/container";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ProjectCard } from "@/components/sections/project-card";
import { SectionHeader } from "@/components/sections/section-header";
import { TimelineItem } from "@/components/sections/timeline-item";
import { BrandMark } from "@/components/ui/brand-mark";
import { ButtonPrimaryLink, ButtonSecondaryLink } from "@/components/ui/brand-button";
import { Chip } from "@/components/ui/chip";
import { EmptyState } from "@/components/ui/empty-state";

const visualTokens = [
  { name: "Ink", value: "#030507", role: "Base OLED e profundidade institucional" },
  { name: "Circuit", value: "#1687FF", role: "Linhas, estados ativos e links" },
  { name: "Signal", value: "#33D4FF", role: "Foco, acao primaria e brilho controlado" },
  { name: "Metal", value: "#F2F5F7", role: "Tipografia de destaque e contraste maximo" },
] as const;

const componentPrinciples = [
  {
    icon: Layers3Icon,
    title: "Superficies tecnicas",
    description: "Bordas finas, raio contido e paineis escuros que deixam a logo respirar sem copiar o efeito 3D.",
  },
  {
    icon: CircuitBoardIcon,
    title: "Detalhe de circuito",
    description: "Linhas discretas entram como textura estrutural, nao como decoracao solta.",
  },
  {
    icon: FocusIcon,
    title: "Foco visivel",
    description: "Estados de teclado usam anel ciano forte para manter a interface navegavel e clara.",
  },
] as const;

const validationItems = [
  "Tokens globais de cor, raio, sombra, espaco e tipografia foram centralizados.",
  "Componentes base renderizam com estados de hover, foco e toque mobile.",
  "A identidade visual conversa com a logo sem reproduzir seu 3D em excesso.",
  "Movimento nao essencial respeita preferencias de reducao de animacao.",
] as const;

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="conteudo-principal" className="overflow-hidden">
        <section className="relative border-b border-border">
          <div className="brand-scanline pointer-events-none absolute inset-0 opacity-35" />
          <Container className="relative grid min-h-[calc(86svh-4rem)] items-center gap-8 py-12 sm:py-20 lg:grid-cols-[1fr_0.82fr] lg:py-24">
            <div className="relative z-10 flex flex-col gap-8 animate-brand-rise">
              <div className="flex flex-wrap items-center gap-3">
                <Chip>{siteConfig.status}</Chip>
                <Chip variant="metal">{brandDirection.name}</Chip>
              </div>

              <div className="flex flex-col gap-5">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-circuit-bright">
                  {siteConfig.institution}
                </p>
                <h1 className="max-w-4xl font-heading text-5xl font-semibold leading-[0.95] text-foreground sm:text-6xl lg:text-7xl">
                  <span className="brand-metal-text">{siteConfig.name}</span>
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
                  {siteConfig.description}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <ButtonPrimaryLink href="#identidade">
                  Ver identidade
                  <ArrowRightIcon data-icon="inline-end" />
                </ButtonPrimaryLink>
                <ButtonSecondaryLink href="#componentes">
                  Componentes base
                  <ArrowDownIcon data-icon="inline-end" />
                </ButtonSecondaryLink>
              </div>
            </div>

            <div className="pointer-events-none absolute bottom-4 right-[-3rem] z-0 flex w-56 items-center justify-center opacity-55 sm:right-0 sm:w-72 lg:relative lg:bottom-auto lg:right-auto lg:z-auto lg:mx-auto lg:w-full lg:max-w-md lg:opacity-100">
              <div className="absolute inset-4 border border-brand-circuit-bright/20 brand-circuit-lines sm:inset-6" />
              <BrandMark className="relative size-52 shadow-[0_0_80px_rgb(51_212_255_/_0.2)] sm:size-64 lg:size-80" priority />
            </div>
          </Container>
        </section>

        <section id="identidade" className="border-b border-border bg-background py-16 sm:py-24 lg:py-28">
          <Container className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <SectionHeader
              eyebrow="Sistema visual"
              title="A marca vira estrutura, nao ornamento."
              description={brandDirection.summary}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              {visualTokens.map((token) => (
                <article key={token.name} className="brand-panel rounded-lg border border-border p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-heading text-lg font-semibold text-foreground">{token.name}</p>
                      <p className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                        {token.value}
                      </p>
                    </div>
                    <span
                      className="size-12 rounded-md border border-border"
                      style={{ backgroundColor: token.value }}
                      aria-hidden="true"
                    />
                  </div>
                  <p className="mt-5 text-sm leading-6 text-muted-foreground">{token.role}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section id="componentes" className="border-b border-border py-16 sm:py-24 lg:py-28">
          <Container className="flex flex-col gap-10">
            <SectionHeader
              eyebrow="Componentes"
              title="Base reutilizavel para home, projetos e timeline."
              description="O M2 entrega blocos visuais prontos para receber conteudo estruturado no M3 sem redesenhar a interface."
            />

            <div className="grid gap-5 lg:grid-cols-3">
              {componentPrinciples.map((principle) => {
                const Icon = principle.icon;

                return (
                  <article key={principle.title} className="brand-panel rounded-lg border border-border p-5">
                    <Icon className="text-brand-circuit-bright" aria-hidden="true" />
                    <h3 className="mt-5 font-heading text-lg font-semibold text-foreground">{principle.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{principle.description}</p>
                  </article>
                );
              })}
            </div>

            <div className="grid gap-5 lg:grid-cols-[1fr_0.72fr]">
              <ProjectCard
                title="Projeto em curadoria institucional"
                summary="Preview visual preparado para receber slug, resumo, categoria, ano, status e imagem oficial no M3."
                category="Vitrine"
                status="Placeholder"
                href="#componentes"
                image={{
                  src: brandAssets.instagramReference,
                  alt: "Referencia visual do perfil institucional do NITE no Instagram.",
                }}
              />

              <div className="grid gap-5">
                <TimelineItem
                  year="M2"
                  title="Identidade visual consolidada"
                  description="Tokens, componentes e estados de interacao foram preparados para sustentar as proximas telas."
                />
                <EmptyState
                  title="Conteudo oficial pendente"
                  description="Projetos e eventos finais entram no M3 a partir do inventario aprovado, mantendo placeholders rastreaveis."
                />
              </div>
            </div>
          </Container>
        </section>

        <section id="validacao" className="py-16 sm:py-24 lg:py-28">
          <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <SectionHeader
              eyebrow="Validacao"
              title="Pronto para crescer sem perder contraste, foco e ritmo mobile."
              description="A interface foi desenhada para leitura rapida, toque confortavel e composicao responsiva em celulares e desktop."
            />

            <div className="grid gap-3">
              {validationItems.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                  <CheckCircle2Icon className="mt-0.5 text-brand-circuit-bright" aria-hidden="true" />
                  <p className="text-sm leading-6 text-muted-foreground">{item}</p>
                </div>
              ))}
              <div className="mt-3 flex items-center gap-3 rounded-lg border border-border bg-muted p-4 text-sm text-muted-foreground">
                <SmartphoneIcon className="text-brand-circuit-bright" aria-hidden="true" />
                <p>Alvos interativos mantem altura minima de 44px e espacamento confortavel para toque.</p>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
