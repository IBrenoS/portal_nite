import { describe, expect, it } from "vitest";

import sitemap from "@/app/sitemap";

describe("sitemap", () => {
  it("inclui a home editorial e exclui matérias demonstrativas", async () => {
    const urls = (await sitemap()).map((entry) => entry.url);

    expect(urls).toContain("http://localhost:3000/atualizacoes");
    expect(urls.some((url) => url.includes("/atualizacoes/"))).toBe(false);
  });
});
