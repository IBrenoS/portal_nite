import {
  ArrowDownIcon,
  ArrowRightIcon,
  AtSignIcon,
  CircuitBoardIcon,
  GraduationCapIcon,
  HandshakeIcon,
  ShieldCheckIcon,
} from "lucide-react";
import type { Metadata } from "next";

import { getFeaturedProjects, getTimelineEvents } from "@/biblioteca/conteudo";
import {
  buildHomeJsonLd,
  buildHomeMetadata,
  serializeJsonLd,
} from "@/biblioteca/seo";
import { siteConfig } from "@/biblioteca/site-config";
import { Container } from "@/components/layout/container";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ProjectCard } from "@/components/sections/project-card";
import { SectionHeader } from "@/components/sections/section-header";
import { TimelineItem } from "@/components/sections/timeline-item";
import { AnimatedNiteLogo } from "@/components/ui/animated-nite-logo";
import {
  ButtonPrimaryLink,
  ButtonSecondaryLink,
} from "@/components/ui/brand-button";

const workFronts = [
  {
    icon: GraduationCapIcon,
    title: "Aprendizado aplicado",
    description:
      "Um espaço para aproximar estudantes de problemas, ferramentas e entregas com contexto real.",
  },
  {
    icon: CircuitBoardIcon,
    title: "Tecnologia em prática",
    description:
      "Projetos orientados por desenvolvimento, inovação e experimentação responsável.",
  },
  {
    icon: HandshakeIcon,
    title: "Ponte institucional",
    description:
      "Conexão entre gestores, professores, alunos e parceiros em torno das iniciativas do núcleo.",
  },
] as const;

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
          <Container className="relative grid min-h-[calc(88svh-4rem)] items-center gap-6 py-10 sm:gap-10 sm:py-20 lg:grid-cols-[1.08fr_0.92fr] lg:py-20">
            <div className="relative z-10 order-2 flex flex-col items-center gap-6 text-center animate-brand-rise sm:gap-8 lg:order-1 lg:items-start lg:text-left">
              <div className="flex flex-col items-center gap-5 sm:gap-6 lg:items-start">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-circuit-bright">
                  {siteConfig.institution} / Núcleo de Inovação, Tecnologia e
                  Experiência
                </p>
                <h1 className="max-w-5xl font-heading text-[2rem] font-semibold leading-[1.02] text-foreground sm:text-6xl sm:leading-[0.98] lg:text-7xl">
                  <span className="brand-metal-text">
                    NITE transforma ideias em projetos, aprendizado em prática e
                    tecnologia em impacto.
                  </span>
                </h1>
                <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-xl sm:leading-8 lg:mx-0">
                  {siteConfig.description} Explore iniciativas, marcos e frentes
                  de trabalho em uma experiência clara, visual e direta.
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

            <div className="relative isolate order-1 mt-0 flex min-h-[13rem] items-center justify-center overflow-visible sm:min-h-[22rem] lg:order-2 lg:min-h-[34rem]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-[-18%] top-[4%] z-0 h-[72%] bg-[radial-gradient(ellipse_at_50%_36%,rgb(51_212_255_/_0.11),rgb(41_174_255_/_0.055)_36%,transparent_72%)] blur-2xl sm:inset-x-[-24%] sm:top-[2%] sm:h-[76%] sm:bg-[radial-gradient(ellipse_at_50%_36%,rgb(51_212_255_/_0.16),rgb(41_174_255_/_0.08)_36%,transparent_72%)] sm:blur-3xl lg:inset-x-[-16%] lg:top-[6%]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-[8%] top-[13%] z-0 h-[46%] bg-[radial-gradient(ellipse_at_50%_44%,rgb(255_255_255_/_0.04),transparent_68%)] blur-xl sm:inset-x-[2%] sm:h-[52%] sm:bg-[radial-gradient(ellipse_at_50%_44%,rgb(255_255_255_/_0.065),transparent_68%)] lg:inset-x-[6%]"
              />
              <AnimatedNiteLogo className="relative z-10 w-full max-w-[9rem] min-[430px]:max-w-[10rem] sm:max-w-[18rem] lg:max-w-[21rem] xl:max-w-[22rem]" />
            </div>
          </Container>
        </section>

        <section
          id="sobre"
          className="border-b border-border bg-background py-16 sm:py-24 lg:py-28"
        >
          <Container className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
            <SectionHeader
              eyebrow="O que é o NITE"
              title="Um núcleo para tirar tecnologia do discurso e colocar em movimento."
              description="O NITE conecta universidade, prática aplicada e desenvolvimento tecnológico em uma experiência institucional clara."
            />

            <div className="grid gap-5">
              <article className="brand-panel rounded-lg border border-border p-6 sm:p-8">
                <p className="font-heading text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
                  Ideias ganham forma quando tecnologia, aprendizagem e
                  colaboração caminham juntas.
                </p>
                <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
                  O núcleo organiza iniciativas, apresenta frentes de atuação e
                  cria uma base visual para acompanhar a evolução de projetos
                  acadêmicos e tecnológicos.
                </p>
              </article>

              <div className="grid gap-5 sm:grid-cols-3">
                {workFronts.map((front) => {
                  const Icon = front.icon;

                  return (
                    <article
                      key={front.title}
                      className="rounded-lg border border-border bg-card p-5"
                    >
                      <Icon
                        className="text-brand-circuit-bright"
                        aria-hidden="true"
                      />
                      <h3 className="mt-5 font-heading text-lg font-semibold text-foreground">
                        {front.title}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-muted-foreground">
                        {front.description}
                      </p>
                    </article>
                  );
                })}
              </div>
            </div>
          </Container>
        </section>

        <section
          id="projetos"
          className="border-b border-border py-16 sm:py-24 lg:py-28"
        >
          <Container className="flex flex-col gap-10">
            <SectionHeader
              eyebrow="Projetos"
              title="Projetos em destaque para explorar tecnologia em movimento."
              description="Cada iniciativa apresenta contexto, tecnologias, objetivos e imagens para facilitar descoberta e acompanhamento."
            />

            <div className="grid gap-5 lg:grid-cols-3">
              {featuredProjects.map((project) => (
                <ProjectCard
                  key={project.slug}
                  title={project.title}
                  summary={project.summary}
                  category={project.category}
                  href={`/projetos/${project.slug}`}
                  year={project.year}
                  technologies={project.technologies}
                  image={{
                    src: project.coverImage,
                    alt: project.alt,
                  }}
                />
              ))}
            </div>
          </Container>
        </section>

        <section
          id="timeline"
          className="border-b border-border bg-background py-16 sm:py-24 lg:py-28"
        >
          <Container className="grid gap-10 lg:grid-cols-[0.74fr_1.26fr]">
            <div className="grid h-fit gap-5 lg:sticky lg:top-24">
              <SectionHeader
                eyebrow="Timeline"
                title="A evolução do NITE em uma narrativa visual."
                description="Marcos organizados em sequência para mostrar contexto, conexões e caminhos de crescimento do núcleo."
              />
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

        <section
          id="contato"
          className="relative border-b border-border py-16 sm:py-24 lg:py-28"
        >
          <Container className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div className="brand-panel rounded-lg border border-border p-6 sm:p-8">
              <ShieldCheckIcon
                className="text-brand-circuit-bright"
                aria-hidden="true"
              />
              <h2 className="mt-6 max-w-3xl font-heading text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
                Quer acompanhar a evolução do NITE?
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
                Comece pelos projetos e pela timeline. O Instagram reúne
                novidades, registros e bastidores das iniciativas do núcleo.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <ButtonPrimaryLink href="#projetos">
                  Explorar projetos
                  <ArrowRightIcon data-icon="inline-end" />
                </ButtonPrimaryLink>
                <ButtonSecondaryLink href="#timeline">
                  Ver timeline
                </ButtonSecondaryLink>
              </div>
            </div>

            <div className="grid gap-4">
              {siteConfig.publicChannels.map((channel) => (
                <a
                  key={channel.href}
                  href={channel.href}
                  aria-label={channel.ariaLabel}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-border bg-card p-5 transition-colors hover:border-brand-circuit-bright/50"
                >
                  <div className="flex items-start gap-4">
                    <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-md border border-brand-circuit-bright/30 bg-brand-circuit-bright/10 text-brand-circuit-bright">
                      <AtSignIcon aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-foreground">
                        {channel.label}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {channel.displayLabel}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
