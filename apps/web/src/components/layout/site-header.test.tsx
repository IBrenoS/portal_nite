import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { SiteHeader } from "@/components/layout/site-header";

afterEach(cleanup);

describe("SiteHeader", () => {
  it("expõe navegação desktop e o acionador mobile com semântica acessível", () => {
    render(<SiteHeader />);

    expect(screen.getByRole("button", { name: "Menu" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
    const navigation = within(
      screen.getByRole("navigation", { name: "Navegação principal" }),
    );

    for (const group of [
      "O NITE",
      "Projetos",
      "Atualizações",
      "Núcleo",
      "Contato",
    ]) {
      expect(navigation.getByRole("button", { name: group })).toHaveAttribute(
        "aria-expanded",
        "false",
      );
    }
    expect(
      screen.getByRole("link", {
        name: "Ir para a página inicial do NITE UniJorge",
      }),
    ).toHaveAttribute("href", "/");
  });
});
