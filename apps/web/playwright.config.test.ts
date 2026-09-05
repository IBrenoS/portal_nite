import { afterEach, describe, expect, it, vi } from "vitest";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe("configuracao visual contra deployment externo", () => {
  it("usa a URL informada sem iniciar o servidor local", async () => {
    vi.stubEnv("PORTAL_E2E_BASE_URL", "https://preview.example.workers.dev");

    const { default: config } = await import("./playwright.config");

    expect(config.use?.baseURL).toBe("https://preview.example.workers.dev");
    expect(config.webServer).toBeUndefined();
  }, 10_000);
});
