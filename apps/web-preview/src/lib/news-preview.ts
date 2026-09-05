import "server-only";

import { cookies, draftMode } from "next/headers";
import { cache } from "react";
import { z } from "zod";

import { editorialDocumentV1Schema, newsCategoryValues } from "@nite/news";

export const PREVIEW_COOKIE_NAME = "nite-news-preview";
const previewMaximumAgeSeconds = 10 * 60;
const previewTokenSchema = z
  .object({
    version: z.literal(1),
    articleId: z.uuid(),
    revisionId: z.uuid(),
    expiresAt: z.number().int().positive(),
    nonce: z.string().regex(/^[A-Za-z0-9_-]{22}$/),
  })
  .strict();

const previewArticleSchema = z
  .object({
    schemaVersion: z.literal(1),
    articleId: z.uuid(),
    revisionId: z.uuid(),
    slug: z
      .string()
      .min(3)
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    publishedAt: z.iso.datetime().nullable(),
    title: z.string().min(12).max(100),
    summary: z.string().min(48).max(220),
    category: z.enum(newsCategoryValues),
    eventDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .optional(),
    readTimeMinutes: z.number().int().min(1).max(30),
    byline: z.string().min(3).max(80),
    featured: z.boolean(),
    cover: z
      .object({
        src: z.url(),
        width: z.number().int().positive(),
        height: z.number().int().positive(),
        alt: z.string().min(12),
      })
      .optional(),
    body: editorialDocumentV1Schema,
    seo: z
      .object({
        title: z.string().min(20).max(60),
        description: z.string().min(80).max(160),
      })
      .optional(),
  })
  .strict();

export type PreviewArticle = z.infer<typeof previewArticleSchema>;
export type PreviewSession = {
  token: string;
  slug: string;
  articleId: string;
  revisionId: string;
  maxAge: number;
};

export function readPreviewConfiguration(
  environment: Readonly<Record<string, string | undefined>>,
) {
  const endpoint = environment.CMS_PREVIEW_RESOLVE_URL;
  const parsed = z.url().safeParse(endpoint);
  if (!parsed.success || new URL(parsed.data).protocol !== "https:") {
    return { configured: false as const };
  }
  return { configured: true as const, endpointUrl: parsed.data };
}

export async function resolvePreviewArticle(input: {
  token: string;
  endpointUrl: string;
  fetch?: typeof fetch;
}) {
  try {
    const endpointUrl = z.url().parse(input.endpointUrl);
    if (new URL(endpointUrl).protocol !== "https:") {
      throw new Error();
    }
    const response = await (input.fetch ?? fetch)(endpointUrl, {
      method: "POST",
      cache: "no-store",
      redirect: "error",
      signal: AbortSignal.timeout(8_000),
      headers: {
        accept: "application/json",
        authorization: `Bearer ${input.token}`,
      },
    });
    if (!response.ok) throw new Error();
    const parsed = previewArticleSchema.safeParse(await response.json());
    if (!parsed.success) throw new Error();
    return parsed.data;
  } catch {
    throw new Error("Prévia indisponível.");
  }
}

export function createPreviewSession(input: {
  token: string;
  article: PreviewArticle;
  now?: Date;
}): PreviewSession | undefined {
  const now = input.now ?? new Date();
  const [version, payload, signature, ...rest] = input.token.split(".");
  if (version !== "v1" || !payload || !signature || rest.length > 0) {
    return undefined;
  }
  try {
    const claims = previewTokenSchema.parse(
      JSON.parse(Buffer.from(payload, "base64url").toString("utf8")),
    );
    const millisecondsRemaining = claims.expiresAt - now.getTime();
    if (
      millisecondsRemaining <= 0 ||
      claims.articleId !== input.article.articleId ||
      claims.revisionId !== input.article.revisionId
    ) {
      return undefined;
    }
    return {
      token: input.token,
      slug: input.article.slug,
      articleId: claims.articleId,
      revisionId: claims.revisionId,
      maxAge: Math.min(
        previewMaximumAgeSeconds,
        Math.max(1, Math.floor(millisecondsRemaining / 1_000)),
      ),
    };
  } catch {
    return undefined;
  }
}

export const getPreviewArticleForSlug = cache(async (slug: string) => {
  const draft = await draftMode();
  if (!draft.isEnabled) return undefined;
  const token = (await cookies()).get(PREVIEW_COOKIE_NAME)?.value;
  const configuration = readPreviewConfiguration(process.env);
  if (!token || !configuration.configured) return undefined;
  try {
    const article = await resolvePreviewArticle({
      token,
      endpointUrl: configuration.endpointUrl,
    });
    const session = createPreviewSession({ token, article });
    return session?.slug === slug ? article : undefined;
  } catch {
    return undefined;
  }
});
