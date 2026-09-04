import { describe, expect, it } from "vitest";

import worker, { legacyRedirects } from "./index";

function request(path: string, init?: RequestInit) {
  return worker.fetch(new Request(`https://nite.tec.br${path}`, init));
}

describe("Worker mínimo do Portal", () => {
  it("mantém os redirects legados como permanentes", () => {
    expect(Object.keys(legacyRedirects)).toHaveLength(5);

    for (const [source, destination] of Object.entries(legacyRedirects)) {
      const response = request(source);
      expect(response.status).toBe(308);
      expect(response.headers.get("location")).toBe(
        `https://nite.tec.br${destination}`,
      );
    }
  });

  it("expõe somente os contratos indisponíveis previstos", async () => {
    const preview = request("/api/preview");
    const revalidation = request("/api/revalidate/news", { method: "POST" });
    const exit = request("/api/preview/exit", { method: "POST" });

    expect(preview.status).toBe(401);
    await expect(preview.json()).resolves.toEqual({
      error: "Prévia indisponível.",
    });
    expect(revalidation.status).toBe(503);
    await expect(revalidation.json()).resolves.toEqual({
      error: "Revalidação não configurada.",
    });
    expect(exit.status).toBe(303);
    expect(exit.headers.get("location")).toBe(
      "https://nite.tec.br/atualizacoes",
    );
    expect(exit.headers.get("set-cookie")).toContain("nite-news-preview=;");
  });

  it("rejeita métodos e caminhos não suportados", () => {
    expect(request("/api/preview", { method: "POST" }).status).toBe(405);
    expect(request("/api/revalidate/news").status).toBe(405);
    expect(request("/inexistente").status).toBe(404);
  });
});
