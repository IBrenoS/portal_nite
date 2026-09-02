import { describe, expect, it } from "vitest";

import { assertProductionDeploymentConfiguration } from "./deployment-configuration";

const productionBase = {
  NEXT_PUBLIC_SITE_URL: "https://portal-nite.vercel.app",
} as const;

describe("configuracao do deployment de producao", () => {
  it("aceita o fallback estatico sem endpoints do CMS", () => {
    expect(() =>
      assertProductionDeploymentConfiguration({
        ...productionBase,
        NITE_NEWS_SOURCE: "static",
      }),
    ).not.toThrow();
  });

  it("aceita a API somente com origens HTTPS completas", () => {
    expect(() =>
      assertProductionDeploymentConfiguration({
        ...productionBase,
        NITE_NEWS_SOURCE: "api",
        CMS_PUBLIC_API_URL: "https://cms-api.nite.test/",
        NITE_NEWS_MEDIA_URL: "https://media.nite.test/",
        CMS_PREVIEW_RESOLVE_URL:
          "https://cms-admin.nite.test/api/preview/resolve",
      }),
    ).not.toThrow();
  });

  it.each([
    ["fonte ausente", {}, "NITE_NEWS_SOURCE"],
    ["API ausente", { NITE_NEWS_SOURCE: "api" }, "CMS_PUBLIC_API_URL"],
    [
      "API sem HTTPS",
      {
        NITE_NEWS_SOURCE: "api",
        CMS_PUBLIC_API_URL: "http://cms-api.nite.test/",
        NITE_NEWS_MEDIA_URL: "https://media.nite.test/",
      },
      "CMS_PUBLIC_API_URL",
    ],
    [
      "midia ausente",
      {
        NITE_NEWS_SOURCE: "api",
        CMS_PUBLIC_API_URL: "https://cms-api.nite.test/",
      },
      "NITE_NEWS_MEDIA_URL",
    ],
    [
      "site local",
      {
        NEXT_PUBLIC_SITE_URL: "http://localhost:3000",
        NITE_NEWS_SOURCE: "static",
      },
      "NEXT_PUBLIC_SITE_URL",
    ],
    [
      "preview sem HTTPS",
      {
        NITE_NEWS_SOURCE: "static",
        CMS_PREVIEW_RESOLVE_URL:
          "http://cms-admin.nite.test/api/preview/resolve",
      },
      "CMS_PREVIEW_RESOLVE_URL",
    ],
  ])("rejeita %s sem expor valores", (_name, overrides, expectedVariable) => {
    const environment = { ...productionBase, ...overrides };

    expect(() => assertProductionDeploymentConfiguration(environment)).toThrow(
      expectedVariable,
    );
    try {
      assertProductionDeploymentConfiguration(environment);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      expect(message).not.toContain("localhost");
      expect(message).not.toContain("nite.test");
    }
  });
});
