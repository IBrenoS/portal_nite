import { ArrowRightIcon, AtSignIcon, ShieldCheckIcon } from "lucide-react";
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
import { BuildsSection } from "@/components/sections/builds-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProjectsOperatingSection } from "@/components/sections/projects-operating-section";
import { SectionHeader } from "@/components/sections/section-header";
import { TimelineItem } from "@/components/sections/timeline-item";
import {
  ButtonPrimaryLink,
  ButtonSecondaryLink,
} from "@/components/ui/brand-button";

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
        <HeroSection />

        <BuildsSection />

        <ProjectsOperatingSection projects={featuredProjects} />

        <section
          id="timeline"
          className="bg-background py-16 sm:py-24 lg:py-28"
          data-surface="clean"
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
          className="relative py-16 sm:py-24 lg:py-28"
          data-surface="grid"
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
