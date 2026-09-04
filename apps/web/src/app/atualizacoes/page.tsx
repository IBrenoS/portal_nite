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

const pageTitle = "Nite News";
const pageDescription =
  "Notícias, eventos e histórias da comunidade universitária reunidos pelo Nite News.";

export const metadata: Metadata = {
  ...defaultMetadata,
  title: buildPageTitle(pageTitle),
  description: pageDescription,
  alternates: { canonical: absoluteUrl("/atualizacoes") },
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

export default async function UpdatesPage() {
  const [articles, agenda, featured] = await Promise.all([
    getFilteredNewsArticles("todas"),
    getAgendaNewsArticles(3),
    getFeaturedNewsArticle(),
  ]);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Início", path: "/" },
    { name: "Nite News", path: "/atualizacoes" },
  ]);

  return (
    <>
      <SiteHeader />
      <script
        id="structured-data-updates-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }}
      />
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
