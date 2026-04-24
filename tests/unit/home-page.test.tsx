import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import HomePage from "@/app/page";

describe("HomePage", () => {
  it("renderiza a homepage com vitrine de projetos do M5", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /NITE transforma ideias em projetos/i,
      }),
    ).toBeInTheDocument();

    expect(screen.getAllByText("M5 - experiencia de projetos")).toHaveLength(2);
    expect(screen.getByText("Um nucleo para tirar tecnologia do discurso e colocar em movimento.")).toBeInTheDocument();
    expect(screen.getByText("Cards com cara de vitrine, sem perder rastreabilidade editorial.")).toBeInTheDocument();
    expect(screen.getByText("Quer acompanhar a evolucao do NITE?")).toBeInTheDocument();
  });
});
