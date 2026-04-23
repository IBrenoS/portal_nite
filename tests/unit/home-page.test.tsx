import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import HomePage from "@/app/page";

describe("HomePage", () => {
  it("renderiza a homepage bootstrap do M1", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "NITE",
      }),
    ).toBeInTheDocument();

    expect(screen.getByText("Scripts de qualidade")).toBeInTheDocument();
    expect(screen.getByText("Pronto para M2")).toBeInTheDocument();
  });
});
