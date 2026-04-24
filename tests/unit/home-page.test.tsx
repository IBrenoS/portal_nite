import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import HomePage from "@/app/page";

describe("HomePage", () => {
  it("renderiza a homepage bootstrap do M2", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "NITE",
      }),
    ).toBeInTheDocument();

    expect(screen.getAllByText("M2 - branding e design system")).toHaveLength(2);
    expect(screen.getByText("Base visual pronta para M3")).toBeInTheDocument();
  });
});
