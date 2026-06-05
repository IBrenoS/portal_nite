import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

import { getPublicPeople, isPersonPublic } from "@/biblioteca/conteudo";
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
import { PeopleDirectory } from "@/components/sections/people-directory";
import { PeopleSearchDialog } from "@/components/sections/people-search-dialog";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const pageTitle = "Pessoas";
const pageDescription =
  "Perfis autorizados de estudantes, professores e colaboradores ligados ao NITE.";

const peopleHeroTitleClass =
  "w-full pb-3 text-center font-heading text-[3.4rem] font-normal leading-none tracking-normal text-foreground sm:text-[4rem] md:text-[4.8rem]";

const peopleHeroDescriptionClass =
  "mx-auto max-w-[32rem] text-balance text-center text-base font-normal leading-6 text-muted-foreground md:text-[1.125rem] md:leading-[1.6875rem]";

export const metadata: Metadata = {
  ...defaultMetadata,
  title: buildPageTitle(pageTitle),
  description: pageDescription,
  alternates: {
    canonical: absoluteUrl("/pessoas"),
  },
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true,
    },
  },
  openGraph: {
    title: buildPageTitle(pageTitle),
    description: pageDescription,
    url: absoluteUrl("/pessoas"),
    type: "website",
  },
  twitter: {
    card: "summary",
    title: buildPageTitle(pageTitle),
    description: pageDescription,
  },
};

export default function PeoplePage() {
  const people = getPublicPeople().filter(isPersonPublic);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Início", path: "/" },
    { name: "Pessoas", path: "/pessoas" },
  ]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <script
        id="structured-data-people-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }}
      />
      <main id="conteudo-principal" className="bg-background text-foreground">
        <section className="relative overflow-hidden pb-28 pt-6 md:pt-20">
          <Container
            size="xl"
            className="grid justify-items-center gap-8 text-center"
          >
            <div className="grid w-full justify-items-center gap-2">
              <h1 className={peopleHeroTitleClass}>
                <span className="block">Pessoas</span>{" "}
                <span className="block">por trás do NITE</span>
              </h1>
              <p className={peopleHeroDescriptionClass}>
                Uma vitrine institucional para perfis autorizados de quem
                constrói projetos, experiências e registros do núcleo.
              </p>
            </div>

            <div className="flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/oportunidades"
                className={cn(
                  buttonVariants({ variant: "primary", size: "md" }),
                  "h-10 w-[12.625rem] rounded-[1rem] px-4",
                )}
              >
                Junte-se a nós
                <ChevronRightIcon
                  data-icon="inline-end"
                  aria-hidden="true"
                  className="size-4"
                />
              </Link>
              <PeopleSearchDialog people={people} />
            </div>
          </Container>
        </section>

        <PeopleDirectory people={people} />
      </main>
      <SiteFooter />
    </div>
  );
}
