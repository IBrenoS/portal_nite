import { describe, expect, it } from "vitest";

import { headerNavigationGroups } from "@/biblioteca/navigation";

describe("navegacao institucional", () => {
  it("centraliza NIT News em Atualizacoes sem Registros redundante", () => {
    const updatesGroup = headerNavigationGroups.find(
      (group) => group.id === "atualizacoes",
    );

    expect(updatesGroup?.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          label: "NIT News",
          href: "/atualizacoes",
          status: "mvp",
        }),
      ]),
    );
    expect(
      updatesGroup?.items.some((item) => item.label === "Bastidores"),
    ).toBe(false);
    expect(updatesGroup?.items.some((item) => item.label === "Registros")).toBe(
      false,
    );
    expect(updatesGroup?.items.some((item) => item.label === "Pessoas")).toBe(
      false,
    );
  });

  it("move Pessoas para Oportunidades mantendo a rota publica", () => {
    const opportunitiesGroup = headerNavigationGroups.find(
      (group) => group.id === "oportunidades",
    );

    expect(opportunitiesGroup?.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          label: "Pessoas",
          href: "/pessoas",
          status: "mvp",
        }),
      ]),
    );
  });
});
