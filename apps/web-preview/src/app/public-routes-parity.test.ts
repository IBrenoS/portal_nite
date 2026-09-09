import PreviewHomePage from "./page";
import PublicHomePage from "@nite/web/routes/home";

import { describe, expect, it } from "vitest";

describe("paridade das páginas públicas", () => {
  it("usa as mesmas implementações do Portal estático para rotas institucionais", () => {
    expect(PreviewHomePage).toBe(PublicHomePage);
  });
});
