import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

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
});
