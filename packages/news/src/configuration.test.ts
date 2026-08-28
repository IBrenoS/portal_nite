import { describe, expect, it } from "vitest";

import { readPublicNewsConfiguration } from "./configuration";

describe("configuração da fonte pública de News", () => {
  it("usa a API por padrão e falha fechado sem a URL pública", () => {
    expect(readPublicNewsConfiguration({})).toEqual({
      configured: false,
      missing: ["CMS_PUBLIC_API_URL"],
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
        CMS_PUBLIC_API_URL: "https://cms-api.nite.test/",
      }),
    ).toEqual({
      configured: true,
      configuration: {
        source: "api",
        apiUrl: "https://cms-api.nite.test/",
      },
    });
  });

  it("rejeita a fonte database e URLs não HTTP", () => {
    expect(
      readPublicNewsConfiguration({ NITE_NEWS_SOURCE: "database" }),
    ).toEqual({ configured: false, missing: ["NITE_NEWS_SOURCE"] });
    expect(
      readPublicNewsConfiguration({ CMS_PUBLIC_API_URL: "file:///cms" }),
    ).toEqual({ configured: false, missing: ["CMS_PUBLIC_API_URL"] });
  });
});
