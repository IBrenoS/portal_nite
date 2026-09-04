import { afterEach, describe, expect, it, vi } from "vitest";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe("preflight do deployment do Portal", () => {
  it("interrompe o build de producao sem fonte de News explicita", async () => {
    vi.stubEnv("VERCEL_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://portal-nite.vercel.app");
    vi.stubEnv("NITE_NEWS_SOURCE", "");

    await expect(import("./next.config")).rejects.toThrow("NITE_NEWS_SOURCE");
  });

  it("preserva builds locais sem aplicar regras da Vercel", async () => {
    vi.stubEnv("VERCEL_ENV", "");
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "http://localhost:3000");
    vi.stubEnv("NITE_NEWS_SOURCE", "static");

    await expect(import("./next.config")).resolves.toBeDefined();
  });

  it("interrompe o build de producao do Cloudflare sem fonte de News explicita", async () => {
    vi.stubEnv("VERCEL_ENV", "");
    vi.stubEnv("PORTAL_DEPLOYMENT_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://nite.tec.br");
    vi.stubEnv("NITE_NEWS_SOURCE", "");

    await expect(import("./next.config")).rejects.toThrow("NITE_NEWS_SOURCE");
  });
});

describe("redirecionamentos de Jogos Embarcados", () => {
  it("redireciona permanentemente as URLs anteriores", async () => {
    const { default: nextConfig } = await import("./next.config");
    const redirects = await nextConfig.redirects?.();

    expect(redirects).toEqual(
      expect.arrayContaining([
        {
          source: "/projetos/software-aplicado",
          destination: "/projetos/data-center",
          permanent: true,
        },
        {
          source: "/projetos/software-aplicado-demonstrativo",
          destination: "/projetos/data-center",
          permanent: true,
        },
        {
          source: "/projetos/robotica-educacional",
          destination: "/projetos/jogos-embarcados",
          permanent: true,
        },
        {
          source: "/projetos/robotica-educacional-demonstrativo",
          destination: "/projetos/jogos-embarcados",
          permanent: true,
        },
      ]),
    );
  });
});
