import type { Metadata } from "next";
import { Suspense } from "react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { NewsListing, NewsListingStatic } from "@/components/news/news-listing";
import {
  absoluteUrl,
  buildBreadcrumbJsonLd,
  buildPageTitle,
  defaultMetadata,
  serializeJsonLd,
} from "@/lib/seo";
import {
  getAgendaNewsArticles,
  getFeaturedNewsArticle,
  getFilteredNewsArticles,
} from "@/lib/news";
import {
  getPreviewArticle,
  mergePreviewIntoNewsListings,
} from "~/lib/news-preview";

export const dynamic = "force-dynamic";

const pageTitle = "Nite News";
const pageDescription =
  "Notícias, eventos e histórias da comunidade universitária reunidos pelo Nite News.";

export async function generateMetadata(): Promise<Metadata> {
  const preview = await getPreviewArticle();
  if (preview) {
    return {
      ...defaultMetadata,
      title: buildPageTitle("Prévia — Nite News"),
      description: pageDescription,
      robots: { index: false, follow: false },
      referrer: "no-referrer",
    };
  }

  return {
    ...defaultMetadata,
    title: buildPageTitle(pageTitle),
    description: pageDescription,
    alternates: { canonical: absoluteUrl("/atualizacoes") },
    robots: {
      index: false,
      follow: false,
      googleBot: { index: false, follow: false },
    },
    openGraph: {
      title: buildPageTitle(pageTitle),
      description: pageDescription,
      url: absoluteUrl("/atualizacoes"),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: buildPageTitle(pageTitle),
      description: pageDescription,
    },
  };
}

export default async function UpdatesPage() {
  const [publicArticles, publicAgenda, publicFeatured, previewArticle] =
    await Promise.all([
      getFilteredNewsArticles("todas"),
      getAgendaNewsArticles(3),
      getFeaturedNewsArticle(),
      getPreviewArticle(),
    ]);

  const { articles, agenda, featured } = mergePreviewIntoNewsListings({
    preview: previewArticle,
    articles: publicArticles,
    agenda: publicAgenda,
    featured: publicFeatured,
  });

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Início", path: "/" },
    { name: "Nite News", path: "/atualizacoes" },
  ]);

  return (
    <>
      <SiteHeader />
      {!previewArticle ? (
        <script
          id="structured-data-updates-breadcrumb"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(breadcrumbJsonLd),
          }}
        />
      ) : null}
      {previewArticle ? (
        <div
          role="status"
          className="border-b border-nite-brand-accent bg-nite-section px-4 py-3 text-center text-sm text-nite-text-primary"
        >
          {previewArticle.publishedAt
            ? `Prévia privada: ${previewArticle.title}.`
            : `Prévia privada — ainda não publicada: ${previewArticle.title}.`}
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
      <main
        id="conteudo-principal"
        className="newsPage overflow-hidden bg-nite-background text-nite-text-primary"
      >
        <Suspense
          fallback={
            <NewsListingStatic
              articles={articles}
              agenda={agenda}
              featured={featured}
            />
          }
        >
          <NewsListing
            articles={articles}
            agenda={agenda}
            featured={featured}
          />
        </Suspense>
      </main>
      <SiteFooter />
    </>
  );
}
