import { describe, expect, it } from "vitest";

import { getProjectBySlug, getProjects, getProjectSlugs, getTimelineEvents } from "@/biblioteca/conteudo";
import { projectCollectionSchema, timelineCollectionSchema } from "@/biblioteca/esquemas";

describe("conteudo estruturado", () => {
  it("carrega projetos validados e localizaveis por slug", () => {
    const projects = getProjects();

    expect(projects).toHaveLength(3);
    expect(getProjectSlugs()).toEqual([
      { slug: "software-aplicado-demonstrativo" },
      { slug: "robotica-educacional-demonstrativo" },
      { slug: "dados-ia-demonstrativo" },
    ]);
    expect(getProjectBySlug("software-aplicado-demonstrativo")?.title).toBe(
      "Projeto demonstrativo: Software aplicado",
    );
  });

  it("ordena eventos da timeline por ano", () => {
    const events = getTimelineEvents();

    expect(events.map((event) => event.year)).toEqual([2026]);
  });

  it("falha explicitamente quando projeto nao cumpre schema", () => {
    expect(() => projectCollectionSchema.parse([{ slug: "Slug Invalido" }])).toThrow();
  });

  it("falha explicitamente quando timeline nao cumpre schema", () => {
    expect(() => timelineCollectionSchema.parse([{ year: "2026" }])).toThrow();
  });
});
