import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import HomePage from "@/app/page";

describe("HomePage", () => {
  it("renderiza a home pública sem rótulos internos", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /NITE transforma ideias em projetos/i,
      }),
    ).toBeInTheDocument();

    expect(screen.queryByText("M7 - SEO, acessibilidade e performance")).not.toBeInTheDocument();
    expect(screen.queryByText("Landing institucional")).not.toBeInTheDocument();
    expect(screen.getByText("Um núcleo para tirar tecnologia do discurso e colocar em movimento.")).toBeInTheDocument();
    expect(screen.getByText("Projetos em destaque para explorar tecnologia em movimento.")).toBeInTheDocument();
    expect(screen.getByText("A evolução do NITE em uma narrativa visual.")).toBeInTheDocument();
    expect(screen.getByText("Primeiros projetos aplicados")).toBeInTheDocument();
    expect(screen.getByText("Quer acompanhar a evolução do NITE?")).toBeInTheDocument();
    expect(screen.getAllByText("@nite.uj")).toHaveLength(2);
  });
});
