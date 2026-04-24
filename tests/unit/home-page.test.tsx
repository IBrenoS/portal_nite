import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import HomePage from "@/app/page";

describe("HomePage", () => {
  it("renderiza a homepage com hardening M7", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /NITE transforma ideias em projetos/i,
      }),
    ).toBeInTheDocument();

    expect(screen.getAllByText("M7 - SEO, acessibilidade e performance")).toHaveLength(2);
    expect(screen.getByText("Um nucleo para tirar tecnologia do discurso e colocar em movimento.")).toBeInTheDocument();
    expect(screen.getByText("Cards com cara de vitrine, sem perder rastreabilidade editorial.")).toBeInTheDocument();
    expect(screen.getByText("A evolucao do NITE vira uma narrativa visual.")).toBeInTheDocument();
    expect(screen.getByText("Marco demonstrativo: primeiros projetos aplicados")).toBeInTheDocument();
    expect(screen.getByText("Quer acompanhar a evolucao do NITE?")).toBeInTheDocument();
  });
});
