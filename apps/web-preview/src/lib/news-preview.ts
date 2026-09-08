import "server-only";

import { randomUUID } from "node:crypto";
import { cookies, draftMode } from "next/headers";
import { cache } from "react";
import { z } from "zod";

import { editorialDocumentV1Schema, newsCategoryValues } from "@nite/news";

export const PREVIEW_COOKIE_NAME = "nite-news-preview";
const previewMaximumAgeSeconds = 10 * 60;
const previewRevisionTokenSchema = z
  .object({
    version: z.literal(1),
    articleId: z.uuid(),
    revisionId: z.uuid(),
    expiresAt: z.number().int().positive(),
    nonce: z.string().regex(/^[A-Za-z0-9_-]{22}$/),
  })
  .strict();
const previewSnapshotTokenSchema = z
  .object({
    version: z.literal(2),
    articleId: z.uuid(),
    snapshotId: z.uuid(),
    expiresAt: z.number().int().positive(),
    nonce: z.string().regex(/^[A-Za-z0-9_-]{22}$/),
  })
  .strict();
const previewTokenSchema = z.discriminatedUnion("version", [
  previewRevisionTokenSchema,
  previewSnapshotTokenSchema,
]);

const previewArticleFields = {
  articleId: z.uuid(),
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
};
const previewRevisionArticleSchema = z
  .object({
    schemaVersion: z.literal(1),
    revisionId: z.uuid(),
    ...previewArticleFields,
  })
  .strict();
const previewSnapshotArticleSchema = z
  .object({
    schemaVersion: z.literal(2),
    snapshotId: z.uuid(),
    baseRevisionId: z.uuid(),
    ...previewArticleFields,
  })
  .strict();
const previewArticleSchema = z.discriminatedUnion("schemaVersion", [
  previewRevisionArticleSchema,
  previewSnapshotArticleSchema,
]);

export type PreviewArticle = z.infer<typeof previewArticleSchema>;
type PreviewSessionFields = {
  token: string;
  slug: string;
  articleId: string;
  maxAge: number;
};
export type PreviewSession = PreviewSessionFields &
  (
    | { version: 1; revisionId: string }
    | { version: 2; snapshotId: string; baseRevisionId: string }
  );

export type PreviewFailureCause =
  | "configuration"
  | "invalid_payload"
  | "invalid_session"
  | "not_found"
  | "timeout"
  | "unauthorized"
  | "upstream";

export class PreviewResolutionError extends Error {
  constructor(
    public readonly causeCode: PreviewFailureCause,
    public readonly upstreamStatus?: number,
  ) {
    super("Prévia indisponível.");
    this.name = "PreviewResolutionError";
  }
}

export function reportPreviewResolutionFailure(
  error: unknown,
  logger: typeof console.error = console.error,
) {
  const supportCode = randomUUID();
  const failure =
    error instanceof PreviewResolutionError
      ? error
      : new PreviewResolutionError("upstream");
  logger("preview_resolution_failed", {
    supportCode,
    cause: failure.causeCode,
    ...(failure.upstreamStatus === undefined
      ? {}
      : { upstreamStatus: failure.upstreamStatus }),
  });
  return supportCode;
}

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
  let endpointUrl: string;
  try {
    endpointUrl = z.url().parse(input.endpointUrl);
    if (new URL(endpointUrl).protocol !== "https:") {
      throw new Error();
    }
  } catch {
    throw new PreviewResolutionError("configuration");
  }

  let response: Response;
  try {
    response = await (input.fetch ?? fetch)(endpointUrl, {
      method: "POST",
      cache: "no-store",
      redirect: "error",
      signal: AbortSignal.timeout(8_000),
      headers: {
        accept: "application/json",
        authorization: `Bearer ${input.token}`,
      },
    });
  } catch (error) {
    throw new PreviewResolutionError(
      error instanceof Error && error.name === "TimeoutError"
        ? "timeout"
        : "upstream",
    );
  }
  if (!response.ok) {
    const cause: PreviewFailureCause =
      response.status === 401
        ? "unauthorized"
        : response.status === 404 || response.status === 409
          ? "not_found"
          : "upstream";
    throw new PreviewResolutionError(cause, response.status);
  }
  try {
    const parsed = previewArticleSchema.safeParse(await response.json());
    if (!parsed.success) throw new Error();
    return parsed.data;
  } catch {
    throw new PreviewResolutionError("invalid_payload", response.status);
  }
}

export function createPreviewSession(input: {
  token: string;
  article: PreviewArticle;
  now?: Date;
}): PreviewSession | undefined {
  const now = input.now ?? new Date();
  const [version, payload, signature, ...rest] = input.token.split(".");
  if (
    (version !== "v1" && version !== "v2") ||
    !payload ||
    !signature ||
    rest.length > 0
  ) {
    return undefined;
  }
  try {
    const claims = previewTokenSchema.parse(
      JSON.parse(Buffer.from(payload, "base64url").toString("utf8")),
    );
    const millisecondsRemaining = claims.expiresAt - now.getTime();
    const matchesArticle =
      claims.articleId === input.article.articleId &&
      ((claims.version === 1 &&
        input.article.schemaVersion === 1 &&
        claims.revisionId === input.article.revisionId) ||
        (claims.version === 2 &&
          input.article.schemaVersion === 2 &&
          claims.snapshotId === input.article.snapshotId));
    if (millisecondsRemaining <= 0 || !matchesArticle) {
      return undefined;
    }
    const common = {
      token: input.token,
      slug: input.article.slug,
      articleId: claims.articleId,
      maxAge: Math.min(
        previewMaximumAgeSeconds,
        Math.max(1, Math.floor(millisecondsRemaining / 1_000)),
      ),
    };
    return claims.version === 1 && input.article.schemaVersion === 1
      ? { ...common, version: 1, revisionId: claims.revisionId }
      : claims.version === 2 && input.article.schemaVersion === 2
        ? {
            ...common,
            version: 2,
            snapshotId: claims.snapshotId,
            baseRevisionId: input.article.baseRevisionId,
          }
        : undefined;
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
  } catch (error) {
    reportPreviewResolutionFailure(error);
    return undefined;
  }
});
