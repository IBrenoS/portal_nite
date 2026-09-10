import PreviewHomePage from "./page";
import previewSitemap from "./sitemap";
import PublicHomePage from "@nite/web/routes/home";

import { describe, expect, it } from "vitest";

describe("paridade das páginas públicas", () => {
  it("usa as mesmas implementações do Portal estático para rotas institucionais", () => {
    expect(PreviewHomePage).toBe(PublicHomePage);
  });

  it("não publica matérias do ambiente noindex em sitemap", async () => {
    expect(await previewSitemap()).toEqual([]);
  });
});
