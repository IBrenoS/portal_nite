import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { getFeaturedProjects } from "@/biblioteca/conteudo";
import { ProjectsOperatingSection } from "@/components/sections/projects-operating-section";

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
});
