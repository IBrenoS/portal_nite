import {
  ArrowDownIcon,
  ArrowRightIcon,
  AtSignIcon,
  CheckCircle2Icon,
  CircuitBoardIcon,
  CompassIcon,
  GraduationCapIcon,
  HandshakeIcon,
  MailIcon,
  MessageCircleIcon,
  ShieldAlertIcon,
  ShieldCheckIcon,
} from "lucide-react";
import type { Metadata } from "next";

import { getFeaturedProjects, getProjectStatusLabel, getTimelineEvents } from "@/biblioteca/conteudo";
import { buildHomeJsonLd, buildHomeMetadata, serializeJsonLd } from "@/biblioteca/seo";
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

const workFronts = [
  {
    icon: GraduationCapIcon,
    title: "Aprendizado aplicado",
    description: "Um espaco para aproximar estudantes de problemas, ferramentas e entregas com contexto real.",
  },
  {
    icon: CircuitBoardIcon,
    title: "Tecnologia em pratica",
    description: "Projetos orientados por desenvolvimento, inovacao e experimentacao responsavel.",
  },
  {
    icon: HandshakeIcon,
    title: "Ponte institucional",
    description: "Uma vitrine para conectar gestores, professores, alunos e parceiros em torno das iniciativas do nucleo.",
  },
] as const;

const proofPoints = [
  "Metadata, canonical, robots e sitemap foram publicados.",
  "JSON-LD da home e breadcrumbs das paginas internas estao server-side.",
  "Projetos placeholder seguem fora do sitemap e com noindex.",
  "Acessibilidade critica e navegação mobile foram cobertas por testes.",
] as const;

const contactIcons = [AtSignIcon, MailIcon, MessageCircleIcon] as const;

export const metadata: Metadata = buildHomeMetadata();

export default function HomePage() {
  const featuredProjects = getFeaturedProjects();
  const timelineEvents = getTimelineEvents();
  const homeJsonLd = buildHomeJsonLd();

  return (
    <>
      <SiteHeader />
      <script
        id="structured-data-home"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(homeJsonLd) }}
      />
      <main id="conteudo-principal" className="overflow-hidden">
        <section className="relative border-b border-border">
          <div className="brand-scanline pointer-events-none absolute inset-0 opacity-35" />
          <Container className="relative grid min-h-[calc(88svh-4rem)] items-center gap-10 py-12 sm:py-20 lg:grid-cols-[1.08fr_0.92fr] lg:py-24">
            <div className="relative z-10 flex flex-col gap-8 animate-brand-rise">
              <div className="flex flex-wrap items-center gap-3">
                <Chip>{siteConfig.status}</Chip>
                <Chip variant="metal">Landing institucional</Chip>
              </div>

              <div className="flex flex-col gap-6">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-circuit-bright">
                  {siteConfig.institution} / nucleo de inovacao, tecnologia e experiencia
                </p>
                <h1 className="max-w-5xl font-heading text-4xl font-semibold leading-[0.98] text-foreground sm:text-6xl lg:text-7xl">
                  <span className="brand-metal-text">NITE transforma ideias em projetos, aprendizado em pratica e tecnologia em impacto.</span>
                </h1>
                <p className="max-w-2xl text-base leading-8 text-muted-foreground sm:text-xl">
                  {siteConfig.description} Esta homepage organiza a narrativa, os caminhos de exploracao e a base visual
                  para validacao institucional.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <ButtonPrimaryLink href="#projetos" className="w-full sm:w-fit">
                  Ver projetos
                  <ArrowRightIcon data-icon="inline-end" />
                </ButtonPrimaryLink>
                <ButtonSecondaryLink href="#sobre" className="w-full sm:w-fit">
                  Conhecer o NITE
                  <ArrowDownIcon data-icon="inline-end" />
                </ButtonSecondaryLink>
              </div>
            </div>

            <div className="relative mt-2 sm:mt-0 lg:min-h-[34rem]">
              <div className="absolute -right-12 top-6 h-56 w-56 rounded-full bg-brand-circuit-bright/10 blur-3xl sm:h-72 sm:w-72" />
              <div className="brand-panel relative rounded-lg border border-border p-4 sm:p-6 lg:absolute lg:inset-y-10 lg:left-10 lg:right-0">
                <div className="brand-circuit-lines absolute inset-4 rounded-md border border-brand-circuit-bright/15" />
                <div className="relative flex h-full min-h-64 flex-col justify-between gap-8">
                  <div className="flex items-center justify-between gap-4">
                    <Chip variant="metal">Tech institucional premium</Chip>
                    <CompassIcon className="text-brand-circuit-bright" aria-hidden="true" />
                  </div>
                  <BrandMark className="mx-auto size-48 shadow-[0_0_80px_rgb(51_212_255_/_0.2)] sm:size-64 lg:size-72" priority />
                  <p className="max-w-sm text-sm leading-6 text-muted-foreground">
                    Direcao visual escura, metalica e precisa: tecnologia como linguagem, nao como enfeite.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section id="sobre" className="border-b border-border bg-background py-16 sm:py-24 lg:py-28">
          <Container className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
            <SectionHeader
              eyebrow="O que e o NITE"
              title="Um nucleo para tirar tecnologia do discurso e colocar em movimento."
              description="A homepage apresenta o NITE como ponto de encontro entre universidade, pratica aplicada e desenvolvimento tecnologico."
            />

            <div className="grid gap-5">
              <article className="brand-panel rounded-lg border border-border p-6 sm:p-8">
                <p className="font-heading text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
                  O NITE transforma ideias em projetos, aprendizado em pratica e tecnologia em impacto.
                </p>
                <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
                  Essa e a mensagem central do v1: uma presenca digital clara para explicar o nucleo, exibir iniciativas
                  e preparar o site para crescer sem perder consistencia.
                </p>
              </article>

              <div className="grid gap-5 sm:grid-cols-3">
                {workFronts.map((front) => {
                  const Icon = front.icon;

                  return (
                    <article key={front.title} className="rounded-lg border border-border bg-card p-5">
                      <Icon className="text-brand-circuit-bright" aria-hidden="true" />
                      <h3 className="mt-5 font-heading text-lg font-semibold text-foreground">{front.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-muted-foreground">{front.description}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          </Container>
        </section>

        <section id="projetos" className="border-b border-border py-16 sm:py-24 lg:py-28">
          <Container className="flex flex-col gap-10">
            <SectionHeader
              eyebrow="Projetos"
              title="Cards com cara de vitrine, sem perder rastreabilidade editorial."
              description="O M5 transforma a lista de projetos em uma experiencia navegavel: imagem, categoria, status, tecnologias e pagina interna por slug."
            />

            <div className="flex items-start gap-3 rounded-lg border border-brand-circuit-bright/30 bg-brand-circuit-bright/10 p-4 text-sm text-muted-foreground">
              <ShieldAlertIcon className="mt-0.5 shrink-0 text-brand-circuit-bright" aria-hidden="true" />
              <p>
                Conteudo demonstrativo para validar a vitrine. A publicacao final depende da transcricao dos projetos
                autorizados.
              </p>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              {featuredProjects.map((project) => (
                <ProjectCard
                  key={project.slug}
                  title={project.title}
                  summary={project.summary}
                  category={project.category}
                  status={getProjectStatusLabel(project.status)}
                  href={`/projetos/${project.slug}`}
                  year={project.year}
                  technologies={project.technologies}
                  notice={project.contentNotice}
                  image={{
                    src: project.coverImage,
                    alt: project.alt,
                  }}
                />
              ))}
            </div>
          </Container>
        </section>

        <section id="timeline" className="border-b border-border bg-background py-16 sm:py-24 lg:py-28">
          <Container className="grid gap-10 lg:grid-cols-[0.74fr_1.26fr]">
            <div className="grid h-fit gap-5 lg:sticky lg:top-24">
              <SectionHeader
                eyebrow="Timeline"
                title="A evolucao do NITE vira uma narrativa visual."
                description="O M6 prepara a linha do tempo para mostrar contexto, evidencias e conexoes com projetos, mantendo os marcos atuais como demonstrativos."
              />
              <div className="flex items-start gap-3 rounded-lg border border-brand-circuit-bright/30 bg-brand-circuit-bright/10 p-4 text-sm text-muted-foreground">
                <ShieldAlertIcon className="mt-0.5 shrink-0 text-brand-circuit-bright" aria-hidden="true" />
                <p>
                  Datas e registros oficiais ainda precisam ser transcritos. As imagens atuais validam a experiencia
                  visual da timeline.
                </p>
              </div>
            </div>

            <div className="grid gap-5">
              {timelineEvents.map((event) => (
                <TimelineItem
                  key={`${event.sequence}-${event.year}-${event.title}`}
                  event={event}
                />
              ))}
            </div>
          </Container>
        </section>

        <section id="contato" className="relative border-b border-border py-16 sm:py-24 lg:py-28">
          <Container className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div className="brand-panel rounded-lg border border-border p-6 sm:p-8">
              <ShieldCheckIcon className="text-brand-circuit-bright" aria-hidden="true" />
              <h2 className="mt-6 max-w-3xl font-heading text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
                Quer acompanhar a evolucao do NITE?
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
                Comece pelos projetos e pela timeline. Os canais publicos ja foram confirmados, mas os valores concretos
                ainda precisam ser transcritos antes de publicacao.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <ButtonPrimaryLink href="#projetos">
                  Explorar projetos
                  <ArrowRightIcon data-icon="inline-end" />
                </ButtonPrimaryLink>
                <ButtonSecondaryLink href="#timeline">Ver timeline</ButtonSecondaryLink>
              </div>
            </div>

            <div className="grid gap-4">
              {siteConfig.publicChannels.map((channel, index) => {
                const Icon = contactIcons[index] ?? CheckCircle2Icon;

                return (
                  <article key={channel.label} className="rounded-lg border border-border bg-card p-5">
                    <div className="flex items-start gap-4">
                      <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-md border border-brand-circuit-bright/30 bg-brand-circuit-bright/10 text-brand-circuit-bright">
                        <Icon aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="font-heading text-lg font-semibold text-foreground">{channel.label}</h3>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">{channel.displayValue}</p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </Container>
        </section>

        <section id="validacao" className="py-16 sm:py-24 lg:py-28">
          <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <SectionHeader
              eyebrow="Validacao"
              title="Homepage pronta para avaliacao visual sem mascarar pendencias."
              description="O M7 endurece SEO, acessibilidade e performance sem esconder o que ainda depende de transcricao oficial."
            />

            <div className="grid gap-3">
              {proofPoints.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                  <CheckCircle2Icon className="mt-0.5 text-brand-circuit-bright" aria-hidden="true" />
                  <p className="text-sm leading-6 text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
