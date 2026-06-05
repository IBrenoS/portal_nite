import type { Metadata } from "next";

import {
  getPersonBySlug,
  getPersonSlugs,
  isPersonPublic,
} from "@/biblioteca/conteudo";
import {
  absoluteUrl,
  buildBreadcrumbJsonLd,
  buildPageTitle,
  defaultMetadata,
  serializeJsonLd,
} from "@/biblioteca/seo";
import { Container } from "@/components/layout/container";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PersonProfileShell } from "@/components/sections/person-profile-shell";
import PersonNotFound from "./not-found";

type PersonPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getPersonSlugs();
}

export async function generateMetadata({
  params,
}: PersonPageProps): Promise<Metadata> {
  const { slug } = await params;
  const person = getPersonBySlug(slug);

  if (!person || !isPersonPublic(person)) {
    return {
      ...defaultMetadata,
      title: buildPageTitle("Pessoa nao encontrada"),
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = buildPageTitle(person.seo?.title ?? person.name);
  const description = person.seo?.description ?? person.summary;
  const canonical = absoluteUrl(`/pessoas/${person.slug}`);
  const shouldIndex = person.contentState === "real";

  return {
    ...defaultMetadata,
    title,
    description,
    alternates: {
      canonical,
    },
    robots: {
      index: shouldIndex,
      follow: true,
      googleBot: {
        index: shouldIndex,
        follow: true,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "profile",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function PersonPage({ params }: PersonPageProps) {
  const { slug } = await params;
  const person = getPersonBySlug(slug);

  if (!person || !isPersonPublic(person)) {
    return <PersonNotFound />;
  }

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Início", path: "/" },
    { name: "Pessoas", path: "/pessoas" },
    { name: person.name, path: `/pessoas/${person.slug}` },
  ]);

  return (
    <>
      <SiteHeader />
      <script
        id="structured-data-person-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }}
      />
      <main id="conteudo-principal">
        <Container size="xl" className="min-h-screen pt-10 pb-20">
          <PersonProfileShell person={person} />
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
