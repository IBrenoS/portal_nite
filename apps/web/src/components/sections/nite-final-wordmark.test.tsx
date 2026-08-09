import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { NiteFinalWordmark } from "@/components/sections/nite-final-wordmark";

afterEach(cleanup);

describe("NiteFinalWordmark", () => {
  it("expõe o componente sem assumir o tema visual do palco", () => {
    const { container } = render(<NiteFinalWordmark />);
    const wordmark = container.querySelector(".nite-final-wordmark");

    expect(wordmark).toBeInTheDocument();
    expect(wordmark).toHaveAttribute("data-component", "nite-final-wordmark");
    expect(wordmark).not.toHaveAttribute("data-nite-scene");
    expect(wordmark).not.toHaveClass("bg-nite-background");
  });

  it("move o spotlight pelas coordenadas locais e o recentraliza ao sair", () => {
    const { container } = render(<NiteFinalWordmark />);
    const wordmark = container.querySelector<HTMLElement>(
      ".nite-final-wordmark",
    );

    expect(wordmark).toBeInTheDocument();

    vi.spyOn(wordmark!, "getBoundingClientRect").mockReturnValue({
      bottom: 170,
      height: 150,
      left: 10,
      right: 570,
      top: 20,
      width: 560,
      x: 10,
      y: 20,
      toJSON: () => ({}),
    });

    fireEvent.pointerMove(wordmark!, { clientX: 210, clientY: 95 });

    expect(wordmark?.style.getPropertyValue("--wordmark-spotlight-x")).toBe(
      "200px",
    );
    expect(wordmark?.style.getPropertyValue("--wordmark-spotlight-y")).toBe(
      "75px",
    );
    expect(wordmark).toHaveAttribute("data-spotlight-active", "true");

    fireEvent.pointerLeave(wordmark!);

    expect(wordmark?.style.getPropertyValue("--wordmark-spotlight-x")).toBe(
      "50%",
    );
    expect(wordmark?.style.getPropertyValue("--wordmark-spotlight-y")).toBe(
      "42%",
    );
    expect(wordmark).toHaveAttribute("data-spotlight-active", "false");
  });
});
