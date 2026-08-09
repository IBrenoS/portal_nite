import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";

import { BuildsSection } from "@/components/sections/builds-section";

afterEach(cleanup);

describe("BuildsSection", () => {
  it("altera etapas e preferências do preview pelo teclado e por clique", async () => {
    const user = userEvent.setup();

    render(<BuildsSection />);

    const builds = within(screen.getByTestId("builds-section"));
    const desafioTab = builds.getByRole("tab", { name: "desafio.tsx" });
    const prototipoTab = builds.getByRole("tab", { name: "prototipo.tsx" });
    const impactoTab = builds.getByRole("tab", { name: "impacto.tsx" });
    const mobileSwitch = builds.getByRole("switch", {
      name: "Visualização mobile",
    });
    const lightSwitch = builds.getByRole("switch", {
      name: "Aparência clara do preview",
    });
    const previewFrame = screen
      .getByTestId("builds-section")
      .querySelector("[data-method-preview-frame]");

    expect(desafioTab).toHaveAttribute("aria-selected", "true");

    await user.click(prototipoTab);
    expect(prototipoTab).toHaveAttribute("aria-selected", "true");
    expect(builds.getByRole("tabpanel")).toHaveTextContent(
      "As perguntas viram coisas tangíveis. O foco aqui é experimentar e aprender rapidamente.",
    );

    prototipoTab.focus();
    await user.keyboard("{End}");
    expect(impactoTab).toHaveFocus();
    expect(impactoTab).toHaveAttribute("aria-selected", "true");

    await user.click(mobileSwitch);
    await user.click(lightSwitch);

    expect(mobileSwitch).toHaveAttribute("aria-checked", "true");
    expect(lightSwitch).toHaveAttribute("aria-checked", "true");
    expect(previewFrame).toHaveAttribute("data-device", "mobile");
    expect(previewFrame).toHaveAttribute("data-appearance", "light");
  });
});
