import { describe, expect, it } from "vitest";

import { readPublicNewsConfiguration } from "./news-configuration";

describe("configuração da fonte pública de News", () => {
  it("usa PostgreSQL por padrão e falha fechado sem as credenciais públicas", () => {
    expect(readPublicNewsConfiguration({})).toEqual({
      configured: false,
      missing: ["DATABASE_PUBLIC_URL", "R2_PUBLIC_BASE_URL"],
    });
  });

  it("mantém a fonte estática somente quando selecionada explicitamente", () => {
    expect(readPublicNewsConfiguration({ NITE_NEWS_SOURCE: "static" })).toEqual(
      {
        configured: true,
        configuration: { source: "static" },
      },
    );
    expect(
      readPublicNewsConfiguration({
        DATABASE_PUBLIC_URL: "postgresql://public@database.test/nite",
        R2_PUBLIC_BASE_URL: "https://media.nite.test/",
      }),
    ).toEqual({
      configured: true,
      configuration: {
        source: "database",
        databaseUrl: "postgresql://public@database.test/nite",
        mediaBaseUrl: "https://media.nite.test/",
      },
    });
  });
});
