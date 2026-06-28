import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { getFeaturedProjects } from "@/biblioteca/conteudo";
import { ProjectsOperatingSection } from "@/components/sections/projects-operating-section";

afterEach(() => {
  cleanup();
});

describe("ProjectsOperatingSection", () => {
  it("seleciona Software aplicado como protagonista pelo slug", () => {
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
        name: "Software aplicado",
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

    expect(section).toHaveAttribute("data-projects-layout", "resend-editorial");
    expect(section).toHaveClass("bg-nite-background");
    expect(section.firstElementChild).toHaveClass("mx-auto");
    expect(section.firstElementChild).not.toHaveClass("absolute");
    expect(screen.getByText("PROJETOS")).toBeInTheDocument();
    expect(rows).toHaveLength(3);
    expect(rows[0]).toHaveAttribute("data-project-layout", "visual-first");
    expect(rows[1]).toHaveAttribute("data-project-layout", "copy-first");
    expect(rows[2]).toHaveAttribute("data-project-layout", "visual-first");
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
      expect(visual).toHaveClass("bg-nite-section");
      expect(visual).not.toHaveClass("bg-[#05080b]");
    }
    expect(section.querySelector("[data-project-code-grid]")).toHaveClass(
      "grid-cols-1",
      "sm:grid-cols-[8.5rem_minmax(0,1fr)]",
    );
    expect(section.querySelector("[data-project-file-tree]")).toHaveClass(
      "hidden",
      "sm:block",
    );
    expect(section.querySelectorAll("[data-project-divider]")).toHaveLength(2);
    expect(section.querySelectorAll("[data-slot='card']")).toHaveLength(0);
    const projectStatusBadges = section.querySelectorAll(
      "[data-project-copy] [data-slot='status-badge'][data-status='draft']",
    );
    expect(projectStatusBadges).toHaveLength(3);
    for (const badge of projectStatusBadges) {
      expect(badge.querySelector("[aria-hidden='true']")).toBeNull();
    }
  });
});
