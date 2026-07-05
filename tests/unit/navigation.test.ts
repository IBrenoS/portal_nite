import { describe, expect, it } from "vitest";

import {
  futureNavigationRoutes,
  headerNavigationGroups,
} from "@/biblioteca/navigation";

describe("navegacao institucional", () => {
  it("expõe Sobre como rota pública do NITE", () => {
    const niteGroup = headerNavigationGroups.find(
      (group) => group.id === "nite",
    );

    expect(niteGroup?.href).toBe("/sobre");
    expect(niteGroup?.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          label: "Sobre",
          href: "/sobre",
          status: "mvp",
        }),
      ]),
    );
    expect(futureNavigationRoutes).not.toContain("/sobre");
  });

  it("centraliza Nite News em Atualizacoes sem Registros redundante", () => {
    const updatesGroup = headerNavigationGroups.find(
      (group) => group.id === "atualizacoes",
    );

    expect(updatesGroup?.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          label: "Nite News",
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

  it("organiza o menu Nucleo com oportunidades, pessoas e curriculo planejado", () => {
    const opportunitiesGroup = headerNavigationGroups.find(
      (group) => group.id === "oportunidades",
    );

    expect(opportunitiesGroup?.label).toBe("Núcleo");
    expect(opportunitiesGroup?.items).toEqual([
      {
        label: "Oportunidades",
        href: "/oportunidades",
        status: "mvp",
      },
      {
        label: "Pessoas",
        href: "/pessoas",
        status: "mvp",
      },
      {
        label: "Enviar currículo",
        href: "/oportunidades",
        status: "planned",
        note: "Disponível apenas quando houver processo validado.",
      },
    ]);
  });

  it("remove o item de e-mail do menu de contato", () => {
    const contactGroup = headerNavigationGroups.find(
      (group) => group.id === "contato",
    );

    expect(contactGroup?.items.some((item) => item.label === "E-mail")).toBe(
      false,
    );
  });
});
