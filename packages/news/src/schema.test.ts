import { describe, expect, it } from "vitest";

import {
  editorialDocumentSchema,
  editorialDocumentV1Schema,
  isAllowedEditorialLink,
  newsArticleSchema,
} from "./schema";

const resolvedVideoAttrs = {
  mediaId: "30000000-0000-4000-8000-000000000002",
  captionsMediaId: "30000000-0000-4000-8000-000000000003",
  playbackMode: "manual",
  layout: "wide",
  description: "Estudantes apresentam um projeto em um laboratório do campus.",
  caption: "Apresentação do projeto interdisciplinar.",
  credit: "Vídeo: Redação NITE",
  src: "https://media.nite.test/editorial.mp4",
  width: 1920,
  height: 1080,
  durationSeconds: 42.5,
  mimeType: "video/mp4",
  captions: {
    src: "https://media.nite.test/editorial.vtt",
    mimeType: "text/vtt",
    srclang: "pt-BR",
    label: "Português",
  },
} as const;

function videoDocumentWith(content: unknown[]) {
  return { schemaVersion: 3, type: "doc", content };
}

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

  it("aceita documentos V3 com vídeo público resolvido sem invalidar V1 e V2", () => {
    const videoDocument = editorialDocumentSchema.parse({
      schemaVersion: 3,
      type: "doc",
      content: [
        {
          type: "video",
          attrs: resolvedVideoAttrs,
        },
      ],
    });

    expect(videoDocument).toMatchObject({
      schemaVersion: 3,
      content: [
        {
          type: "video",
          attrs: {
            playbackMode: "manual",
            mimeType: "video/mp4",
            captions: { mimeType: "text/vtt", srclang: "pt-BR" },
          },
        },
      ],
    });
    expect(
      editorialDocumentSchema.safeParse({
        schemaVersion: 1,
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [{ type: "text", text: "Documento legado V1." }],
          },
        ],
      }).success,
    ).toBe(true);
    expect(
      editorialDocumentSchema.safeParse({
        schemaVersion: 2,
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [{ type: "text", text: "Documento legado V2." }],
          },
        ],
      }).success,
    ).toBe(true);
  });

  it("rejeita vídeo V3 dentro de listas e blockquotes", () => {
    const video = { type: "video", attrs: resolvedVideoAttrs };
    const nestedDocuments = [
      videoDocumentWith([
        {
          type: "bulletList",
          content: [{ type: "listItem", content: [video] }],
        },
      ]),
      videoDocumentWith([
        {
          type: "blockquote",
          content: [video],
        },
      ]),
    ];

    for (const document of nestedDocuments) {
      expect(editorialDocumentSchema.safeParse(document).success).toBe(false);
    }
  });

  it("rejeita atributos públicos de vídeo fora do contrato aprovado", () => {
    const invalidAttrs = [
      { ...resolvedVideoAttrs, mediaId: "media-invalida" },
      { ...resolvedVideoAttrs, captionsMediaId: "legenda-invalida" },
      { ...resolvedVideoAttrs, src: "/video-local.mp4" },
      { ...resolvedVideoAttrs, width: 0 },
      { ...resolvedVideoAttrs, height: -1 },
      { ...resolvedVideoAttrs, durationSeconds: 0 },
      { ...resolvedVideoAttrs, description: "x".repeat(501) },
      { ...resolvedVideoAttrs, caption: "x".repeat(281) },
      { ...resolvedVideoAttrs, credit: "x".repeat(161) },
      { ...resolvedVideoAttrs, mimeType: "video/webm" },
      {
        ...resolvedVideoAttrs,
        captions: { ...resolvedVideoAttrs.captions, src: "/legenda.vtt" },
      },
      {
        ...resolvedVideoAttrs,
        captions: {
          ...resolvedVideoAttrs.captions,
          mimeType: "text/plain",
        },
      },
      {
        ...resolvedVideoAttrs,
        captions: { ...resolvedVideoAttrs.captions, srclang: "en-US" },
      },
      {
        ...resolvedVideoAttrs,
        captions: { ...resolvedVideoAttrs.captions, label: "Portuguese" },
      },
    ];

    for (const attrs of invalidAttrs) {
      expect(
        editorialDocumentSchema.safeParse(
          videoDocumentWith([{ type: "video", attrs }]),
        ).success,
      ).toBe(false);
    }
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
