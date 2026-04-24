import { describe, expect, it } from "vitest";

import {
  getIndexableProjects,
  getProjectBySlug,
  getProjects,
  getProjectSlugs,
  getTimelineEvents,
} from "@/biblioteca/conteudo";
import { projectCollectionSchema, timelineCollectionSchema } from "@/biblioteca/esquemas";

describe("conteudo estruturado", () => {
  it("carrega projetos validados e localizaveis por slug", () => {
    const projects = getProjects();

    expect(projects).toHaveLength(3);
    expect(getProjectSlugs()).toEqual([
      { slug: "software-aplicado" },
      { slug: "robotica-educacional" },
      { slug: "dados-e-ia" },
    ]);
    expect(getProjectBySlug("software-aplicado")?.title).toBe("Software aplicado");
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
    expect(events.map((event) => event.sourceStatus)).toEqual(["placeholder", "placeholder", "placeholder"]);
    expect(events.map((event) => event.contentNotice)).toEqual([undefined, undefined, undefined]);
  });

  it("remove placeholders do conjunto indexavel para sitemap", () => {
    expect(getIndexableProjects()).toEqual([]);
  });

  it("falha explicitamente quando projeto nao cumpre schema", () => {
    expect(() => projectCollectionSchema.parse([{ slug: "Slug Invalido" }])).toThrow();
  });

  it("falha explicitamente quando timeline nao cumpre schema", () => {
    expect(() => timelineCollectionSchema.parse([{ year: "2026" }])).toThrow();
  });
});
