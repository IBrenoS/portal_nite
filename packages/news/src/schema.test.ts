import { describe, expect, it } from "vitest";

import {
  editorialDocumentSchema,
  editorialDocumentV1Schema,
  isAllowedEditorialLink,
  newsArticleSchema,
} from "./schema";

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

  it("aceita documentos V2 com metadados editoriais e largura de imagem", () => {
    expect(
      editorialDocumentSchema.parse({
        schemaVersion: 2,
        type: "doc",
        content: [
          {
            type: "image",
            attrs: {
              mediaId: "30000000-0000-4000-8000-000000000001",
              alt: "Estudantes acompanham uma apresentação no campus.",
              src: "https://images.nite.test/editorial.webp",
              width: 1600,
              height: 900,
              caption: "A atividade reuniu estudantes de diferentes cursos.",
              credit: "Foto: Redação NITE",
              layout: "wide",
            },
          },
        ],
      }),
    ).toMatchObject({ schemaVersion: 2 });
  });

  it("mantém V1 estrito e exige layout em toda imagem V2", () => {
    const richImage = {
      type: "image",
      attrs: {
        mediaId: "30000000-0000-4000-8000-000000000001",
        alt: "Estudantes acompanham uma apresentação no campus.",
        src: "https://images.nite.test/editorial.webp",
        width: 1600,
        height: 900,
        caption: "Legenda exclusiva do documento V2.",
        layout: "wide",
      },
    };

    expect(() =>
      editorialDocumentSchema.parse({
        schemaVersion: 1,
        type: "doc",
        content: [richImage],
      }),
    ).toThrow();
    expect(() =>
      editorialDocumentSchema.parse({
        schemaVersion: 2,
        type: "doc",
        content: [
          {
            type: "blockquote",
            content: [
              {
                ...richImage,
                attrs: { ...richImage.attrs, layout: undefined },
              },
            ],
          },
        ],
      }),
    ).toThrow();
  });

  it("aceita legenda e crédito opcionais na capa pública", () => {
    const parsed = newsArticleSchema.parse({
      slug: "materia-com-capa-editorial",
      title: "Matéria com capa editorial estruturada",
      summary:
        "Resumo editorial suficientemente completo para validar a matéria pública com metadados de capa.",
      category: "inovacao",
      publishedAt: "2026-09-09",
      readTimeMinutes: 2,
      byline: "Redação NITE",
      cover: {
        src: "https://images.nite.test/capa.webp",
        alt: "Estudantes participam de uma atividade no campus.",
        caption: "Encontro realizado no laboratório de inovação.",
        credit: "Foto: Redação NITE",
      },
      featured: false,
      contentState: "real",
      public: true,
      body: {
        schemaVersion: 1,
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [{ type: "text", text: "Conteúdo da matéria." }],
          },
        ],
      },
    });

    expect(parsed.cover).toMatchObject({
      caption: "Encontro realizado no laboratório de inovação.",
      credit: "Foto: Redação NITE",
    });
  });
});
