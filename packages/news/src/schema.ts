import { z } from "zod";

const slugSchema = z
  .string()
  .min(3)
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Use slugs em minusculas, com hifens e sem acentos.",
  );
const allowedLinkProtocols = new Set(["http:", "https:", "mailto:"]);

export function isAllowedEditorialLink(href: string) {
  if (href.startsWith("/")) {
    return !href.startsWith("//") && !href.includes("\\");
  }
  try {
    return allowedLinkProtocols.has(new URL(href).protocol);
  } catch {
    return false;
  }
}

const editorialMarkSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("bold") }).strict(),
  z.object({ type: z.literal("italic") }).strict(),
  z
    .object({
      type: z.literal("link"),
      attrs: z
        .object({ href: z.string().refine(isAllowedEditorialLink) })
        .strict(),
    })
    .strict(),
]);

export type EditorialMark = z.infer<typeof editorialMarkSchema>;
export type EditorialTextNode = {
  type: "text";
  text: string;
  marks?: EditorialMark[];
};
export type EditorialListItemNode = {
  type: "listItem";
  content: EditorialNestedContentNode[];
};
type EditorialImageBaseAttrs = {
  mediaId: string;
  alt: string;
  src: string;
  width: number;
  height: number;
};
export type EditorialImageLayout = "normal" | "wide" | "full";
export type EditorialImageV1Node = {
  type: "image";
  attrs: EditorialImageBaseAttrs;
};
export type EditorialImageV2Node = {
  type: "image";
  attrs: EditorialImageBaseAttrs & {
    caption?: string;
    credit?: string;
    layout: EditorialImageLayout;
  };
};
export type EditorialVideoPlaybackMode = "autoplay" | "manual";
export type EditorialVideoCaptions = {
  src: string;
  mimeType: "text/vtt";
  srclang: "pt-BR";
  label: "Português";
};
export type EditorialVideoNode = {
  type: "video";
  attrs: {
    mediaId: string;
    captionsMediaId?: string;
    playbackMode: EditorialVideoPlaybackMode;
    layout: EditorialImageLayout;
    description?: string;
    caption?: string;
    credit?: string;
    src: string;
    width: number;
    height: number;
    durationSeconds: number;
    mimeType: "video/mp4";
    captions?: EditorialVideoCaptions;
  };
};
export type EditorialNestedContentNode =
  | { type: "paragraph"; content: EditorialTextNode[] }
  | { type: "heading"; attrs: { level: 2 | 3 }; content: EditorialTextNode[] }
  | EditorialImageV1Node
  | EditorialImageV2Node
  | {
      type: "bulletList";
      content: EditorialListItemNode[];
    }
  | {
      type: "orderedList";
      content: EditorialListItemNode[];
    }
  | { type: "blockquote"; content: EditorialNestedContentNode[] };
export type EditorialContentNode =
  | EditorialNestedContentNode
  | EditorialVideoNode;
export type EditorialDocumentV1 = {
  schemaVersion: 1;
  type: "doc";
  content: EditorialNestedContentNode[];
};
export type EditorialDocumentV2 = {
  schemaVersion: 2;
  type: "doc";
  content: EditorialNestedContentNode[];
};
export type EditorialDocumentV3 = {
  schemaVersion: 3;
  type: "doc";
  content: EditorialContentNode[];
};
export type EditorialDocument =
  | EditorialDocumentV1
  | EditorialDocumentV2
  | EditorialDocumentV3;

const textNodeSchema: z.ZodType<EditorialTextNode> = z
  .object({
    type: z.literal("text"),
    text: z.string().min(1),
    marks: z.array(editorialMarkSchema).min(1).optional(),
  })
  .strict();
const paragraphNodeSchema: z.ZodType<
  Extract<EditorialContentNode, { type: "paragraph" }>
> = z
  .object({ type: z.literal("paragraph"), content: z.array(textNodeSchema) })
  .strict();
const headingNodeSchema: z.ZodType<
  Extract<EditorialContentNode, { type: "heading" }>
> = z
  .object({
    type: z.literal("heading"),
    attrs: z.object({ level: z.union([z.literal(2), z.literal(3)]) }).strict(),
    content: z.array(textNodeSchema),
  })
  .strict();
const imageBaseAttrsSchema = z
  .object({
    mediaId: z.uuid(),
    alt: z.string().trim().min(1),
    src: z.url(),
    width: z.number().int().positive(),
    height: z.number().int().positive(),
  })
  .strict();
const imageV1NodeSchema: z.ZodType<EditorialImageV1Node> = z
  .object({
    type: z.literal("image"),
    attrs: imageBaseAttrsSchema,
  })
  .strict();
const imageV2NodeSchema: z.ZodType<EditorialImageV2Node> = z
  .object({
    type: z.literal("image"),
    attrs: imageBaseAttrsSchema
      .extend({
        caption: z.string().trim().min(1).max(280).optional(),
        credit: z.string().trim().min(1).max(160).optional(),
        layout: z.enum(["normal", "wide", "full"]),
      })
      .strict(),
  })
  .strict();
const videoNodeSchema: z.ZodType<EditorialVideoNode> = z
  .object({
    type: z.literal("video"),
    attrs: z
      .object({
        mediaId: z.uuid(),
        captionsMediaId: z.uuid().optional(),
        playbackMode: z.enum(["autoplay", "manual"]),
        layout: z.enum(["normal", "wide", "full"]),
        description: z.string().trim().min(1).max(500).optional(),
        caption: z.string().trim().min(1).max(280).optional(),
        credit: z.string().trim().min(1).max(160).optional(),
        src: z.url(),
        width: z.number().int().positive(),
        height: z.number().int().positive(),
        durationSeconds: z.number().positive(),
        mimeType: z.literal("video/mp4"),
        captions: z
          .object({
            src: z.url(),
            mimeType: z.literal("text/vtt"),
            srclang: z.literal("pt-BR"),
            label: z.literal("Português"),
          })
          .strict()
          .optional(),
      })
      .strict(),
  })
  .strict();
function createEditorialContentNodeSchema(
  imageNodeSchema: z.ZodType<EditorialImageV1Node | EditorialImageV2Node>,
): z.ZodType<EditorialNestedContentNode> {
  const contentNodeSchema: z.ZodType<EditorialNestedContentNode> = z.lazy(
    () => {
      const listItemNodeSchema: z.ZodType<EditorialListItemNode> = z
        .object({
          type: z.literal("listItem"),
          content: z.array(contentNodeSchema).min(1),
        })
        .strict();
      const contentSchemas = [
        paragraphNodeSchema,
        headingNodeSchema,
        imageNodeSchema,
        z
          .object({
            type: z.literal("bulletList"),
            content: z.array(listItemNodeSchema).min(1),
          })
          .strict(),
        z
          .object({
            type: z.literal("orderedList"),
            content: z.array(listItemNodeSchema).min(1),
          })
          .strict(),
        z
          .object({
            type: z.literal("blockquote"),
            content: z.array(contentNodeSchema).min(1),
          })
          .strict(),
      ] as const;
      return z.union(contentSchemas);
    },
  );
  return contentNodeSchema;
}

const editorialContentNodeV1Schema =
  createEditorialContentNodeSchema(imageV1NodeSchema);
const editorialContentNodeV2Schema =
  createEditorialContentNodeSchema(imageV2NodeSchema);
const editorialNestedContentNodeV3Schema =
  createEditorialContentNodeSchema(imageV2NodeSchema);
const editorialContentNodeV3Schema: z.ZodType<EditorialContentNode> = z.union([
  editorialNestedContentNodeV3Schema,
  videoNodeSchema,
]);

export const editorialDocumentV1Schema: z.ZodType<EditorialDocumentV1> = z
  .object({
    schemaVersion: z.literal(1),
    type: z.literal("doc"),
    content: z.array(editorialContentNodeV1Schema).min(1),
  })
  .strict();
export const editorialDocumentV2Schema: z.ZodType<EditorialDocumentV2> = z
  .object({
    schemaVersion: z.literal(2),
    type: z.literal("doc"),
    content: z.array(editorialContentNodeV2Schema).min(1),
  })
  .strict();
export const editorialDocumentV3Schema: z.ZodType<EditorialDocumentV3> = z
  .object({
    schemaVersion: z.literal(3),
    type: z.literal("doc"),
    content: z.array(editorialContentNodeV3Schema).min(1),
  })
  .strict();
export const editorialDocumentSchema: z.ZodType<EditorialDocument> = z.union([
  editorialDocumentV1Schema,
  editorialDocumentV2Schema,
  editorialDocumentV3Schema,
]);

const imageSchema = z.object({
  src: z.string().min(1),
  alt: z.string().min(12),
  caption: z.string().trim().min(1).max(280).optional(),
  credit: z.string().trim().min(1).max(160).optional(),
});
const seoSchema = z.object({
  title: z.string().min(20).max(60),
  description: z.string().min(80).max(160),
});
export const newsCategoryValues = [
  "agenda",
  "comunidade",
  "projetos",
  "inovacao",
  "cultura",
  "tecnologia",
] as const;
export const newsContentStateValues = ["demonstrativo", "real"] as const;
export const newsFilterValues = [
  "destaques",
  "todas",
  "agenda",
  "comunidade",
] as const;

export const newsArticleSchema = z
  .object({
    slug: slugSchema,
    title: z.string().min(12).max(100),
    summary: z.string().min(48).max(220),
    category: z.enum(newsCategoryValues),
    publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    eventDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .optional(),
    readTimeMinutes: z.number().int().min(1).max(30),
    byline: z.string().min(3).max(80),
    cover: imageSchema,
    featured: z.boolean(),
    contentState: z.enum(newsContentStateValues),
    public: z.literal(true),
    body: editorialDocumentSchema,
    seo: seoSchema.optional(),
  })
  .strict();
export const newsCollectionSchema = z
  .array(newsArticleSchema)
  .superRefine((articles, context) => {
    const slugs = new Set<string>();
    articles.forEach((article, index) => {
      if (slugs.has(article.slug))
        context.addIssue({
          code: "custom",
          message: "Slugs de notícias devem ser únicos.",
          path: [index, "slug"],
        });
      slugs.add(article.slug);
    });
  });
export const newsListResponseSchema = z
  .object({ version: z.literal(2), articles: newsCollectionSchema })
  .strict();
export const newsArticleResponseSchema = z
  .object({ version: z.literal(2), article: newsArticleSchema })
  .strict();

export type NewsArticle = z.infer<typeof newsArticleSchema>;
export type NewsCategory = (typeof newsCategoryValues)[number];
export type NewsContentState = (typeof newsContentStateValues)[number];
export type NewsFilter = (typeof newsFilterValues)[number];
