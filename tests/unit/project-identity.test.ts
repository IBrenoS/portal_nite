import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import { getProjectBySlug } from "@/biblioteca/conteudo";
import { buildProjectMetadata } from "@/biblioteca/seo";

type ProjectRecord = {
  slug: string;
  title: string;
  coverImage: string;
  illustration?: { src: string; alt: string };
  gallery: Array<{ src: string; alt: string }>;
  seo?: { title: string; description: string };
};

const projects = JSON.parse(
  readFileSync(
    resolve(process.cwd(), "conteudo/projetos/projetos.json"),
    "utf8",
  ),
) as ProjectRecord[];

describe("identidade de Jogos Embarcados", () => {
  it("usa o novo nome, slug e a mesma capa em todos os slots", () => {
    const project = projects.find(({ slug }) => slug === "jogos-embarcados");
    const cover = "/images/projetos/jogos-embarcados.png";

    expect(project).toBeDefined();
    expect(project?.title).toBe("Jogos Embarcados");
    expect(project?.coverImage).toBe(cover);
    expect(project?.illustration?.src).toBe(cover);
    expect(project?.gallery.map(({ src }) => src)).toContain(cover);
    expect(project?.seo?.title).toContain("Jogos Embarcados");
  });

  it("não mantém o nome anterior no conteúdo de projetos", () => {
    const serialized = JSON.stringify(projects);

    expect(serialized).not.toMatch(/rob[oó]tica\s+educacional/i);
  });

  it("usa a capa pública nos metadados sociais", () => {
    const project = getProjectBySlug("jogos-embarcados");

    expect(project).toBeDefined();

    const metadata = buildProjectMetadata(project!);
    const openGraphImages = metadata.openGraph?.images;
    const twitterImages = metadata.twitter?.images;

    expect(openGraphImages).toEqual([
      expect.objectContaining({
        url: expect.stringContaining("/images/projetos/jogos-embarcados.png"),
        alt: project?.alt,
      }),
    ]);
    expect(twitterImages).toEqual([
      expect.stringContaining("/images/projetos/jogos-embarcados.png"),
    ]);
  });
});

describe("identidade de Data Center", () => {
  it("usa o novo nome, slug e a mesma capa em todos os slots", () => {
    const project = projects.find(({ slug }) => slug === "data-center");
    const cover = "/images/projetos/data-center.png";

    expect(project).toBeDefined();
    expect(project?.title).toBe("Data Center");
    expect(project?.coverImage).toBe(cover);
    expect(project?.illustration?.src).toBe(cover);
    expect(project?.gallery.map(({ src }) => src)).toContain(cover);
    expect(project?.seo?.title).toContain("Data Center");
    expect(JSON.stringify(projects)).not.toMatch(/software\s+aplicado/i);
  });

  it("usa a capa pública nos metadados sociais", () => {
    const project = getProjectBySlug("data-center");

    expect(project).toBeDefined();

    const metadata = buildProjectMetadata(project!);

    expect(metadata.openGraph?.images).toEqual([
      expect.objectContaining({
        url: expect.stringContaining("/images/projetos/data-center.png"),
        alt: project?.alt,
      }),
    ]);
    expect(metadata.twitter?.images).toEqual([
      expect.stringContaining("/images/projetos/data-center.png"),
    ]);
  });
});
