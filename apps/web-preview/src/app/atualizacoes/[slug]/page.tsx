import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import type { NewsArticle } from "@nite/news";
import {
  categoryLabels,
  Container,
  formatEditorialDate,
  NewsCard,
  NewsArticleBody,
  ShareArticleButton,
  SiteFooter,
  SiteHeader,
} from "@nite/ui";
import { getNewsArticleBySlug, getRelatedNewsArticles } from "@/lib/news";
import {
  absoluteUrl,
  buildBreadcrumbJsonLd,
  buildPageTitle,
  defaultMetadata,
  serializeJsonLd,
} from "@/lib/seo";
import {
  getPreviewArticleForSlug,
  type PreviewArticle,
} from "~/lib/news-preview";
import NewsArticleNotFound from "./not-found";

export const dynamic = "force-dynamic";

type NewsArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: NewsArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const previewArticle = await getPreviewArticleForSlug(slug);
  const article = previewArticle ?? (await getNewsArticleBySlug(slug));

  if (!article) {
    return {
      ...defaultMetadata,
      title: buildPageTitle("Matéria não encontrada"),
      robots: { index: false, follow: false },
    };
  }

  const title = buildPageTitle(article.seo?.title ?? article.title);
  const description = article.seo?.description ?? article.summary;
  if (previewArticle) {
    return {
      ...defaultMetadata,
      title,
      description,
      robots: { index: false, follow: false },
      referrer: "no-referrer",
    };
  }

  if (!("contentState" in article)) {
    return { ...defaultMetadata, robots: { index: false, follow: false } };
  }

  const canonical = absoluteUrl(`/atualizacoes/${article.slug}`);
  return {
    ...defaultMetadata,
    title,
    description,
    alternates: { canonical },
    robots: {
      index: false,
      follow: false,
      googleBot: { index: false, follow: false },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      publishedTime: article.publishedAt,
      images: [{ url: absoluteUrl(article.cover.src), alt: article.cover.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(article.cover.src)],
    },
  };
}

function buildNewsArticleJsonLd(article: NewsArticle) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.summary,
    datePublished: article.publishedAt,
    image: absoluteUrl(article.cover.src),
    mainEntityOfPage: absoluteUrl(`/atualizacoes/${article.slug}`),
    author: { "@type": "Organization", name: article.byline },
  };
}

function isPublicNewsArticle(
  article: NewsArticle | PreviewArticle,
): article is NewsArticle {
  return "contentState" in article;
}

export default async function NewsArticlePage({
  params,
}: NewsArticlePageProps) {
  const { slug } = await params;
  const previewArticle = await getPreviewArticleForSlug(slug);
  const article = previewArticle ?? (await getNewsArticleBySlug(slug));
  if (!article) return <NewsArticleNotFound />;

  const related = previewArticle
    ? []
    : await getRelatedNewsArticles(article.slug, 3);
  const publicationDate = article.publishedAt
    ? formatEditorialDate(
        previewArticle ? article.publishedAt.slice(0, 10) : article.publishedAt,
      )
    : "Prévia — ainda não publicada";
  const canonical = absoluteUrl(`/atualizacoes/${article.slug}`);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Início", path: "/" },
    { name: "Nite News", path: "/atualizacoes" },
    { name: article.title, path: `/atualizacoes/${article.slug}` },
  ]);

  return (
    <>
      <SiteHeader />
      {!previewArticle ? (
        <script
          id="structured-data-news-breadcrumb"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(breadcrumbJsonLd),
          }}
        />
      ) : null}
      {!previewArticle &&
      isPublicNewsArticle(article) &&
      article.contentState === "real" ? (
        <script
          id="structured-data-news-article"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(buildNewsArticleJsonLd(article)),
          }}
        />
      ) : null}

      <main
        id="conteudo-principal"
        className="overflow-hidden bg-nite-background text-nite-text-primary"
      >
        <article>
          {previewArticle ? (
            <div
              role="status"
              className="border-b border-nite-brand-accent bg-nite-section px-4 py-3 text-center text-sm text-nite-text-primary"
            >
              {previewArticle.publishedAt
                ? "Prévia privada."
                : "Prévia privada — ainda não publicada."}
              <form
                action="/api/preview/exit"
                method="post"
                className="ml-4 inline"
              >
                <button type="submit" className="underline underline-offset-4">
                  Sair da prévia
                </button>
              </form>
            </div>
          ) : null}
          <Container size="xl" className="pt-12 sm:pt-16 lg:pt-20">
            <Link
              href="/atualizacoes"
              aria-label="Voltar para Nite News"
              className="inline-flex min-h-11 items-center rounded-md font-mono text-xs font-medium uppercase tracking-[0.14em] text-nite-brand-accent outline-none hover:text-nite-text-primary focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span aria-hidden="true">←</span>&nbsp; Voltar para atualizações
            </Link>
            <div className="mt-7 max-w-5xl">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-nite-brand-accent">
                {categoryLabels[article.category]}
              </p>
              <h1 className="mt-4 text-balance font-heading text-[clamp(2.5rem,6vw,4.75rem)] font-semibold leading-[1.04] tracking-[-0.035em] text-nite-text-primary">
                {article.title}
              </h1>
              <p className="mt-6 max-w-4xl text-pretty text-lg leading-8 text-nite-text-secondary sm:text-xl">
                {article.summary}
              </p>
              <div className="mt-8 flex flex-col gap-5 border-t border-nite-border-subtle pt-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="font-mono text-[0.6875rem] uppercase tracking-[0.055em] text-nite-text-muted">
                  {publicationDate} · {article.readTimeMinutes} min de leitura ·{" "}
                  {article.byline}
                </p>
                {!previewArticle ? (
                  <ShareArticleButton title={article.title} url={canonical} />
                ) : null}
              </div>
            </div>
            {"cover" in article && article.cover ? (
              <div className="relative mt-10 aspect-[16/7] min-h-64 overflow-hidden rounded-xl border border-nite-border-subtle bg-nite-section sm:mt-12">
                <Image
                  src={article.cover.src}
                  alt={article.cover.alt}
                  fill
                  priority
                  sizes="(min-width: 1280px) 1280px, 100vw"
                  className="object-cover"
                />
              </div>
            ) : null}
          </Container>
          <Container size="sm" className="py-14 sm:py-20">
            <NewsArticleBody document={article.body} />
          </Container>
        </article>

        {related.length > 0 ? (
          <section
            className="border-t border-nite-border-subtle py-14 sm:py-20"
            aria-labelledby="related-news"
          >
            <Container size="xl" className="grid gap-8">
              <div className="flex items-center justify-between gap-6">
                <h2
                  id="related-news"
                  className="font-heading text-2xl font-semibold text-nite-text-primary"
                >
                  Matérias relacionadas
                </h2>
                <Link
                  href="/atualizacoes?filtro=todas"
                  className="rounded-md font-mono text-xs font-medium uppercase tracking-[0.14em] text-nite-brand-accent outline-none hover:text-nite-text-primary focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Ver todas <span aria-hidden="true">→</span>
                </Link>
              </div>
              <div className="grid gap-6 lg:grid-cols-3">
                {related.map((relatedArticle) => (
                  <NewsCard
                    key={relatedArticle.slug}
                    article={relatedArticle}
                    layout="compact"
                  />
                ))}
              </div>
            </Container>
          </section>
        ) : null}
      </main>
      <SiteFooter />
    </>
  );
}
