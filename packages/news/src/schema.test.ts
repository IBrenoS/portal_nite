import { describe, expect, it } from "vitest";

import { editorialDocumentV1Schema, isAllowedEditorialLink } from "./schema";

describe("links editoriais", () => {
  it("rejeita caminhos relativos que o navegador pode resolver para outra origem", () => {
    expect(isAllowedEditorialLink("/\\externo.test/materia")).toBe(false);
    expect(isAllowedEditorialLink("/\\\\externo.test/materia")).toBe(false);
  });

  it("rejeita listItem fora de listas", () => {
    const listItem = {
      type: "listItem",
      content: [
        {
          type: "paragraph",
          content: [{ type: "text", text: "Conteúdo inválido fora da lista." }],
        },
      ],
    };

    expect(() =>
      editorialDocumentV1Schema.parse({
        schemaVersion: 1,
        type: "doc",
        content: [listItem],
      }),
    ).toThrow();
    expect(() =>
      editorialDocumentV1Schema.parse({
        schemaVersion: 1,
        type: "doc",
        content: [{ type: "blockquote", content: [listItem] }],
      }),
    ).toThrow();
  });

  it("exige uma imagem pública resolvida no AST consumido pelo Portal", () => {
    expect(() =>
      editorialDocumentV1Schema.parse({
        schemaVersion: 1,
        type: "doc",
        content: [
          {
            type: "image",
            attrs: {
              mediaId: "30000000-0000-4000-8000-000000000001",
              alt: "Pessoas conversam em uma atividade no campus universitário.",
            },
          },
        ],
      }),
    ).toThrow();
  });
});
