import PreviewHomePage from "./page";
import PublicHomePage from "@nite/web/routes/home";
import PreviewNewsPage from "./atualizacoes/page";
import PublicNewsPage from "@nite/web/routes/updates";

import { describe, expect, it } from "vitest";

describe("paridade das páginas públicas", () => {
  it("usa as mesmas implementações do Portal estático", () => {
    expect(PreviewHomePage).toBe(PublicHomePage);
    expect(PreviewNewsPage).toBe(PublicNewsPage);
  });
});
