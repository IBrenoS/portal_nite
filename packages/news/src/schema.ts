import { z } from "zod";

const slugSchema = z
  .string()
  .min(3)
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Use slugs em minusculas, com hifens e sem acentos.",
  );

const imageSchema = z.object({
  src: z.string().min(1),
  alt: z.string().min(12),
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

export const newsBodyBlockSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("paragraph"),
    text: z.string().min(24),
  }),
  z.object({
    type: z.literal("heading"),
    text: z.string().min(3),
  }),
  z.object({
    type: z.literal("quote"),
    text: z.string().min(24),
    attribution: z.string().min(3).optional(),
  }),
]);

export const newsArticleSchema = z.object({
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
  featured: z.boolean().default(false),
  contentState: z.enum(newsContentStateValues),
  public: z.boolean(),
  body: z.array(newsBodyBlockSchema).min(1),
  seo: seoSchema.optional(),
});

export const newsCollectionSchema = z
  .array(newsArticleSchema)
  .superRefine((articles, context) => {
    const slugs = new Set<string>();

    articles.forEach((article, index) => {
      if (slugs.has(article.slug)) {
        context.addIssue({
          code: "custom",
          message: "Slugs de notícias devem ser únicos.",
          path: [index, "slug"],
        });
      }
      slugs.add(article.slug);
    });
  });

export const newsListResponseSchema = z.object({
  version: z.literal(1),
  articles: newsCollectionSchema,
});

export const newsArticleResponseSchema = z.object({
  version: z.literal(1),
  article: newsArticleSchema,
});

export type NewsArticle = z.infer<typeof newsArticleSchema>;
export type NewsBodyBlock = z.infer<typeof newsBodyBlockSchema>;
export type NewsCategory = (typeof newsCategoryValues)[number];
export type NewsContentState = (typeof newsContentStateValues)[number];
export type NewsFilter = (typeof newsFilterValues)[number];
