import type { Metadata } from "next";

import { getFeaturedProjects, getTimelineEvents } from "@/biblioteca/conteudo";
import {
  buildHomeJsonLd,
  buildHomeMetadata,
  serializeJsonLd,
} from "@/biblioteca/seo";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { BuildsSection } from "@/components/sections/builds-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { HeroSection } from "@/components/sections/hero-section";
import { LivingTimelineSection } from "@/components/sections/living-timeline-section";
import { ProjectsOperatingSection } from "@/components/sections/projects-operating-section";

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

        <LivingTimelineSection events={timelineEvents} />

        <FinalCtaSection />
      </main>
      <SiteFooter />
    </>
  );
}
