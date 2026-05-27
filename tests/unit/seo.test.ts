import { describe, expect, it } from "vitest";

import manifest from "@/app/manifest";
import { buildPageTitle, defaultMetadata } from "@/biblioteca/seo";
import { siteConfig } from "@/biblioteca/site-config";

describe("buildPageTitle", () => {
  it("usa o titulo padrao quando a pagina nao informa nome proprio", () => {
    expect(buildPageTitle()).toBe(
      `${siteConfig.name} | ${siteConfig.institution}`,
    );
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

describe("manifest", () => {
  it("usa identidade e cores alinhadas ao dark premium da Spec 003", () => {
    const metadata = manifest();

    expect(metadata.name).toBe(
      `${siteConfig.name} | ${siteConfig.institution}`,
    );
    expect(metadata.short_name).toBe(siteConfig.name);
    expect(metadata.description).toBe(siteConfig.description);
    expect(metadata.background_color).toBe("#09090a");
    expect(metadata.theme_color).toBe("#09090a");
  });
});
