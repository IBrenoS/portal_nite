import { describe, expect, it } from "vitest";

import { headerNavigationGroups } from "@/biblioteca/navigation";

describe("navegacao institucional", () => {
  it("troca Bastidores por Pessoas dentro do grupo Atualizacoes", () => {
    const updatesGroup = headerNavigationGroups.find(
      (group) => group.id === "atualizacoes",
    );

    expect(updatesGroup?.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          label: "Pessoas",
          href: "/pessoas",
          status: "mvp",
        }),
      ]),
    );
    expect(
      updatesGroup?.items.some((item) => item.label === "Bastidores"),
    ).toBe(false);
  });
});
