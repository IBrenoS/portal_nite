import { afterEach, describe, expect, it, vi } from "vitest";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe("configuração do Portal de preview", () => {
  it("mantém runtime dinâmico e bloqueia indexação em todas as rotas", async () => {
    vi.stubEnv("VERCEL_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://nite.tec.br");
    vi.stubEnv("NITE_NEWS_SOURCE", "static");
    vi.stubEnv(
      "CMS_PREVIEW_RESOLVE_URL",
      "https://nite-cms-admin.vercel.app/api/preview/resolve",
    );

    const { default: config } = await import("./next.config");
    const headers = await config.headers?.();

    expect(config.output).toBeUndefined();
    expect(headers).toEqual([
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive",
          },
        ],
      },
    ]);
  });

  it("falha em produção quando o resolver privado não é HTTPS", async () => {
    vi.stubEnv("VERCEL_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://nite.tec.br");
    vi.stubEnv("NITE_NEWS_SOURCE", "static");
    vi.stubEnv("CMS_PREVIEW_RESOLVE_URL", "http://localhost:3001/resolve");

    await expect(import("./next.config")).rejects.toThrow(
      "CMS_PREVIEW_RESOLVE_URL",
    );
  });

  it("autoriza somente a árvore pública configurada para mídia remota", async () => {
    vi.stubEnv("NITE_NEWS_MEDIA_URL", "https://media.example.test/news/");

    const { default: config } = await import("./next.config");

    expect(config.images?.remotePatterns).toEqual([
      {
        protocol: "https",
        hostname: "media.example.test",
        port: "",
        pathname: "/news/**",
      },
    ]);
  });
});
