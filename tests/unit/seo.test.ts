import { describe, expect, it } from "vitest";

import { buildPageTitle, defaultMetadata } from "@/biblioteca/seo";
import { siteConfig } from "@/biblioteca/site-config";

describe("buildPageTitle", () => {
  it("usa o titulo padrao quando a pagina nao informa nome proprio", () => {
    expect(buildPageTitle()).toBe(`${siteConfig.name} | ${siteConfig.institution}`);
  });

  it("prefixa paginas internas com o nome do site", () => {
    expect(buildPageTitle("Projetos")).toBe("Projetos | NITE");
  });
});

describe("defaultMetadata", () => {
  it("reaproveita a descricao institucional oficial", () => {
    expect(defaultMetadata.description).toBe(siteConfig.description);
  });
});
