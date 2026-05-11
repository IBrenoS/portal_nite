import { describe, expect, it } from "vitest";

import {
  getIndexableProjects,
  getProjectBySlug,
  getProjects,
  getProjectSlugs,
  getTimelineEvents,
} from "@/biblioteca/conteudo";
import {
  projectCollectionSchema,
  projectContentStateValues,
  projectStatusValues,
  timelineCollectionSchema,
} from "@/biblioteca/esquemas";

describe("conteudo estruturado", () => {
  it("carrega projetos validados e localizaveis por slug", () => {
    const projects = getProjects();

    expect(projects).toHaveLength(3);
    expect(getProjectSlugs()).toEqual([
      { slug: "software-aplicado" },
      { slug: "robotica-educacional" },
      { slug: "dados-e-ia" },
    ]);
    expect(getProjectBySlug("software-aplicado")?.title).toBe(
      "Software aplicado",
    );
  });

  it("mantem projetos atuais como placeholders operacionais e nao indexaveis", () => {
    const projects = getProjects();

    expect(projectStatusValues).toEqual([
      "placeholder",
      "planejado",
      "em-descoberta",
      "em-prototipo",
      "ativo",
      "concluido",
    ]);
    expect(projectContentStateValues).toEqual([
      "real",
      "demonstrativo",
      "em-estruturacao",
    ]);
    expect(projects.map((project) => project.status)).toEqual([
      "placeholder",
      "placeholder",
      "placeholder",
    ]);
    expect(projects.map((project) => project.contentState)).toEqual([
      "em-estruturacao",
      "em-estruturacao",
      "em-estruturacao",
    ]);
    expect(
      projects.every((project) => project.lastUpdated === "2026-05-11"),
    ).toBe(true);
    expect(
      projects.every(
        (project) => project.currentPhase === "Mapeamento da frente",
      ),
    ).toBe(true);
    expect(projects.every((project) => project.nextStep.length > 12)).toBe(
      true,
    );
    expect(projects.every((project) => project.deliverables.length === 0)).toBe(
      true,
    );
    expect(projects.every((project) => project.metrics.length === 0)).toBe(
      true,
    );
    expect(projects.every((project) => project.team.length === 0)).toBe(true);
    expect(projects.every((project) => project.changelog.length === 0)).toBe(
      true,
    );
    expect(getIndexableProjects()).toEqual([]);
  });

  it("ordena eventos da timeline por ano e sequencia editorial", () => {
    const events = getTimelineEvents();

    expect(events.map((event) => event.sequence)).toEqual([1, 2, 3]);
    expect(events.map((event) => event.year)).toEqual([2026, 2026, 2026]);
    expect(events.map((event) => event.title)).toEqual([
      "Estruturação do NITE",
      "Primeiros projetos aplicados",
      "Vitrine para a comunidade",
    ]);
    expect(events.map((event) => event.sourceStatus)).toEqual([
      "placeholder",
      "placeholder",
      "placeholder",
    ]);
    expect(events.map((event) => event.contentNotice)).toEqual([
      undefined,
      undefined,
      undefined,
    ]);
  });

  it("remove placeholders do conjunto indexavel para sitemap", () => {
    expect(getIndexableProjects()).toEqual([]);
  });

  it("falha explicitamente quando projeto nao cumpre schema", () => {
    expect(() =>
      projectCollectionSchema.parse([{ slug: "Slug Invalido" }]),
    ).toThrow();
  });

  it("falha explicitamente quando timeline nao cumpre schema", () => {
    expect(() => timelineCollectionSchema.parse([{ year: "2026" }])).toThrow();
  });
});
