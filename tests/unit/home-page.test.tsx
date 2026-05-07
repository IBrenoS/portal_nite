import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import HomePage from "@/app/page";
import { validateNiteSvgContract } from "@/components/ui/validate-nite-svg-contract";

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

    for (const id of [
      "logo-final",
      "nite-logo",
      "brain",
      "text",
      "text-parte-1",
      "text-parte-2",
      "text-parte-3",
      "text-parte-4",
      "bulb",
      "energy-overlay",
      "energy-main-rise",
      "energy-routes",
      "electric-arcs",
      "spark-heads",
      "text-shimmer-mask",
    ]) {
      expect(document.querySelector(`#${id}`)).toBeInTheDocument();
    }

    expect(document.querySelector(".animated-nite-logo")).toHaveAttribute("aria-hidden", "true");
    expect(document.querySelector("#logo-final")?.closest(".brand-panel")).toBeNull();

    expect(validateNiteSvgContract(document.body)).toEqual({
      mainRise: 3,
      routes: 11,
      arcs: 4,
      sparks: 14,
      shimmer: 3,
      overlays: 1,
    });
  });
});
