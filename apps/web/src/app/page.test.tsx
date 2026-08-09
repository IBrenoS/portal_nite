import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { Project, TimelineEvent } from "@nite/content";

vi.mock("@/components/layout/site-header", () => ({
  SiteHeader: () => <header data-testid="site-header" />,
}));

vi.mock("@/components/layout/site-footer", () => ({
  SiteFooter: ({ variant }: { variant?: string }) => (
    <footer data-variant={variant} data-testid="site-footer" />
  ),
}));

vi.mock("@/components/sections/hero-section", () => ({
  HeroSection: () => <section data-testid="hero-section" />,
}));

vi.mock("@/components/sections/builds-section", () => ({
  BuildsSection: () => <section data-testid="builds-section" />,
}));

vi.mock("@/components/sections/projects-operating-section", () => ({
  ProjectsOperatingSection: ({ projects }: { projects: Project[] }) => (
    <section
      data-project-count={projects.length}
      data-testid="projects-section"
    />
  ),
}));

vi.mock("@/components/sections/living-timeline-section", () => ({
  LivingTimelineSection: ({ events }: { events: TimelineEvent[] }) => (
    <section data-event-count={events.length} data-testid="timeline-section" />
  ),
}));

vi.mock("@/components/sections/final-cta-section", () => ({
  FinalCtaSection: () => <section data-testid="final-cta-section" />,
}));

import HomePage, { metadata } from "@/app/page";

afterEach(cleanup);

describe("HomePage", () => {
  it("compõe as seções públicas, conteúdo indexado e metadata institucional", () => {
    render(<HomePage />);

    expect(screen.getByTestId("site-header")).toBeInTheDocument();
    expect(screen.getByRole("main")).toHaveAttribute(
      "id",
      "conteudo-principal",
    );
    expect(screen.getByTestId("hero-section")).toBeInTheDocument();
    expect(screen.getByTestId("builds-section")).toBeInTheDocument();
    expect(screen.getByTestId("projects-section")).toHaveAttribute(
      "data-project-count",
      "3",
    );
    expect(screen.getByTestId("timeline-section")).toHaveAttribute(
      "data-event-count",
      "3",
    );
    expect(screen.getByTestId("final-cta-section")).toBeInTheDocument();
    expect(screen.getByTestId("site-footer")).toHaveAttribute(
      "data-variant",
      "wordmark",
    );
    expect(document.querySelector("#structured-data-home")).toHaveAttribute(
      "type",
      "application/ld+json",
    );
    expect(metadata.title).toBeTruthy();
  });
});
