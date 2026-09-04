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

  it.each([
    ["fonte ausente", {}, "NITE_NEWS_SOURCE"],
    ["API indisponível", { NITE_NEWS_SOURCE: "api" }, "NITE_NEWS_SOURCE"],
    [
      "site local",
      {
        NEXT_PUBLIC_SITE_URL: "http://localhost:3000",
        NITE_NEWS_SOURCE: "static",
      },
      "NEXT_PUBLIC_SITE_URL",
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
