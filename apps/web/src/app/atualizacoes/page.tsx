import type { Metadata, Route } from "next";
import Link from "next/link";

import {
  getAgendaNewsArticles,
  getFeaturedNewsArticle,
  getFilteredNewsArticles,
  getLatestNewsArticles,
  normalizeNewsFilter,
} from "@nite/content";
import { Container } from "@/components/layout/container";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { NewsCard } from "@/components/news/news-card";
import { NewsFilters } from "@/components/news/news-filters";
import {
  absoluteUrl,
  buildBreadcrumbJsonLd,
  buildPageTitle,
  defaultMetadata,
  serializeJsonLd,
} from "@/lib/seo";

const pageTitle = "Nite News";
const pageDescription =
  "Notícias, eventos e histórias da comunidade universitária reunidos pelo Nite News.";

type UpdatesPageProps = {
  searchParams?: Promise<{
    filtro?: string | string[];
  }>;
};

export const metadata: Metadata = {
  ...defaultMetadata,
  title: buildPageTitle(pageTitle),
  description: pageDescription,
  alternates: {
    canonical: absoluteUrl("/atualizacoes"),
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

function NewsSectionHeader({
  id,
  title,
  action,
  href,
}: {
  id: string;
  title: string;
  action: string;
  href: string;
}) {
  return (
    <div className="flex items-center justify-between gap-6">
      <h2
        id={id}
        className="font-heading text-xl font-semibold text-nite-text-primary sm:text-2xl"
      >
        {title}
      </h2>
      <Link
        href={href as Route}
        className="shrink-0 rounded-md font-mono text-xs font-medium uppercase tracking-[0.14em] text-nite-brand-accent outline-none hover:text-nite-text-primary focus-visible:ring-2 focus-visible:ring-ring"
      >
        {action} <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}

export default async function UpdatesPage({
  searchParams = Promise.resolve({}),
}: UpdatesPageProps = {}) {
  const { filtro } = await searchParams;
  const activeFilter = normalizeNewsFilter(filtro);
  const featured = getFeaturedNewsArticle();
  const latest = getLatestNewsArticles(4, featured?.slug);
  const agenda = getAgendaNewsArticles(3);
  const filteredArticles = getFilteredNewsArticles(activeFilter);
  const showCuratedHome = activeFilter === "destaques";
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
        className="overflow-hidden bg-nite-background text-nite-text-primary"
      >
        <section className="pt-12 sm:pt-16 lg:pt-20">
          <Container size="xl" className="grid gap-6">
            <div className="rounded-xl border border-nite-border-subtle bg-nite-section px-5 py-9 text-center sm:px-10 sm:py-12">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-nite-text-secondary">
                Bem-vindo ao Nite News
              </p>
              <h1 className="mt-3 text-balance font-heading text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.1] text-nite-text-primary">
                Nite News
              </h1>
              <p className="mx-auto mt-4 max-w-3xl text-pretty text-base leading-7 text-nite-text-secondary sm:text-lg">
                Informação para acompanhar a universidade, descobrir eventos e
                participar da comunidade.
              </p>
            </div>
            <NewsFilters activeFilter={activeFilter} />
          </Container>
        </section>

        {showCuratedHome ? (
          <Container size="xl" className="grid gap-16 py-12 sm:py-16 lg:py-20">
            {featured ? <NewsCard article={featured} layout="lead" /> : null}

            <section className="grid gap-8" aria-labelledby="latest-news">
              <NewsSectionHeader
                id="latest-news"
                title="Últimas notícias"
                action="Ver todas"
                href="/atualizacoes?filtro=todas"
              />
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {latest.map((article) => (
                  <NewsCard key={article.slug} article={article} />
                ))}
              </div>
            </section>

            <section className="grid gap-8" aria-labelledby="news-agenda">
              <NewsSectionHeader
                id="news-agenda"
                title="Na agenda"
                action="Acompanhar"
                href="/atualizacoes?filtro=agenda"
              />
              <div className="grid gap-6 lg:grid-cols-3">
                {agenda.map((article) => (
                  <NewsCard
                    key={article.slug}
                    article={article}
                    layout="compact"
                  />
                ))}
              </div>
            </section>
          </Container>
        ) : (
          <Container size="xl" className="py-12 sm:py-16 lg:py-20">
            <section className="grid gap-8" aria-labelledby="filtered-news">
              <h2
                id="filtered-news"
                className="font-heading text-2xl font-semibold text-nite-text-primary"
              >
                Notícias em {activeFilter}
              </h2>
              {filteredArticles.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {filteredArticles.map((article) => (
                    <NewsCard key={article.slug} article={article} />
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-nite-border-subtle bg-nite-surface p-8 text-nite-text-secondary">
                  <p>Nenhuma notícia encontrada neste filtro.</p>
                  <Link
                    href="/atualizacoes?filtro=todas"
                    className="mt-4 inline-flex min-h-11 items-center text-nite-brand-accent outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Ver todas as notícias
                  </Link>
                </div>
              )}
            </section>
          </Container>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
