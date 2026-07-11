import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { getFeaturedProjects } from "@/biblioteca/conteudo";
import { ProjectsOperatingSection } from "@/components/sections/projects-operating-section";

afterEach(() => {
  cleanup();
});

describe("ProjectsOperatingSection", () => {
  it("seleciona Data Center como protagonista pelo slug", () => {
    render(
      <ProjectsOperatingSection
        projects={[...getFeaturedProjects()].reverse()}
      />,
    );

    const protagonist = document.querySelector(
      "[data-project-role='protagonist']",
    ) as HTMLElement;

    expect(protagonist).toBeInTheDocument();
    expect(
      within(protagonist).getByRole("heading", {
        name: "Data Center",
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Ver projeto" })).toHaveLength(
      3,
    );
  });

  it("renderiza projetos como vitrine editorial em linhas alternadas", () => {
    render(<ProjectsOperatingSection projects={getFeaturedProjects()} />);

    const section = screen.getByTestId("projects-operating-section");
    const rows = section.querySelectorAll("[data-project-showcase-row]");

    expect(section).not.toHaveAttribute("data-nite-scene", "inverse");
    expect(section).toHaveAttribute("data-projects-layout", "editorial");
    expect(section).toHaveClass("bg-nite-background");
    expect(section.firstElementChild).toHaveClass("mx-auto");
    expect(section.firstElementChild).not.toHaveClass("absolute");
    expect(screen.getByText("PROJETOS")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Projetos em destaque",
      }),
    ).toHaveClass("text-[clamp(2rem,4vw,3rem)]", "leading-[1.1]");
    expect(rows).toHaveLength(3);
    expect(rows[0]).toHaveAttribute("data-project-layout", "visual-first");
    expect(rows[1]).toHaveAttribute("data-project-layout", "copy-first");
    expect(rows[2]).toHaveAttribute("data-project-layout", "visual-first");
    expect(rows[0]).toHaveClass(
      "lg:grid-cols-[minmax(0,0.58fr)_minmax(19rem,0.42fr)]",
    );
    expect(rows[1]).toHaveClass(
      "lg:grid-cols-[minmax(19rem,0.42fr)_minmax(0,0.58fr)]",
    );
    for (const row of rows) {
      expect(row).toHaveAttribute(
        "data-project-mobile-pattern",
        "visual-first",
      );
      expect(row.firstElementChild).toHaveAttribute("data-project-visual");
      expect(row.lastElementChild).toHaveAttribute("data-project-copy");
    }
    expect(
      section.querySelector("[data-project-visual='code-workbench']"),
    ).toBeInTheDocument();
    expect(
      section.querySelector("[data-project-visual='robotics-lab']"),
    ).toBeInTheDocument();
    expect(
      section.querySelector("[data-project-visual='analytics-dashboard']"),
    ).toBeInTheDocument();
    for (const visual of section.querySelectorAll("[data-project-visual]")) {
      expect(visual.className).not.toContain("circle_at");
      expect(visual).toHaveClass(
        "rounded-lg",
        "border-[var(--projects-visual-border)]",
        "bg-[var(--projects-visual-background)]",
        "shadow-none",
      );
      expect(visual).not.toHaveClass("shadow-nite-lift");
      expect(visual.className).not.toContain("before:bg-[linear-gradient");
      expect(visual.className).not.toContain("rounded-[0.55rem]");
      expect(visual.className).not.toContain(
        "shadow-[0_24px_80px_rgb(0_0_0/0.32)]",
      );
      expect(visual).not.toHaveClass("bg-[#05080b]");
      expect(
        visual.querySelector("[data-project-cover-image]"),
      ).toBeInTheDocument();
      expect(
        visual.querySelector("[data-project-cover-image]"),
      ).not.toHaveClass("opacity-80", "saturate-90");
      expect(visual).not.toHaveClass(
        "after:[background-image:var(--projects-visual-veil)]",
      );
      expect(
        visual.querySelector("[data-project-image-overlay]"),
      ).not.toBeInTheDocument();
      expect(visual.querySelector("svg")).toBeNull();
    }
    expect(section.querySelector("[data-project-code-grid]")).toBeNull();
    expect(section.querySelector("[data-project-file-tree]")).toBeNull();
    expect(screen.queryByText("EvidenceBoard.tsx")).not.toBeInTheDocument();
    expect(screen.queryByText("Dispositivos")).not.toBeInTheDocument();
    expect(screen.queryByText("Painel de análises")).not.toBeInTheDocument();
    expect(
      section.querySelector("img[src*='data-center.png']"),
    ).toBeInTheDocument();
    expect(
      section.querySelector("img[src*='jogos-embarcados.png']"),
    ).toBeInTheDocument();
    expect(
      section.querySelector("img[src*='dados-ia-card.png']"),
    ).toBeInTheDocument();
    expect(section.querySelectorAll("[data-project-divider]")).toHaveLength(2);
    expect(section.querySelectorAll("[data-slot='card']")).toHaveLength(0);
    const projectStatusBadges = section.querySelectorAll(
      "[data-project-copy] [data-slot='status-badge'][data-status='draft']",
    );
    expect(projectStatusBadges).toHaveLength(3);
    for (const badge of projectStatusBadges) {
      expect(badge.querySelector("[aria-hidden='true']")).toBeNull();
      expect(badge).toHaveClass(
        "border-border",
        "bg-muted/40",
        "text-muted-foreground",
      );
      expect(badge).not.toHaveClass(
        "border-nite-border-subtle",
        "bg-nite-surface-subtle",
        "text-nite-text-secondary",
      );
    }
    for (const cta of screen.getAllByRole("link", { name: "Ver projeto" })) {
      expect(cta).toHaveClass("duration-nite-micro", "ease-nite-out");
      expect(cta.querySelector("svg")).toHaveClass(
        "duration-nite-micro",
        "ease-nite-out",
      );
    }
  });
});
