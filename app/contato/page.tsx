import type { Metadata } from "next";

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
import { ContactEmailCopy } from "@/components/sections/contact-email-copy";
import { ContactRequestForm } from "@/components/sections/contact-request-form";

const pageTitle = "Contato";
const pageDescription =
  "Fale com o NITE por um fluxo simples de contato institucional.";
const contactEmail = "unijorge.nite@gmail.com";

export const metadata: Metadata = {
  ...defaultMetadata,
  title: buildPageTitle(pageTitle),
  description: pageDescription,
  alternates: {
    canonical: absoluteUrl("/contato"),
  },
  openGraph: {
    title: buildPageTitle(pageTitle),
    description: pageDescription,
    url: absoluteUrl("/contato"),
    type: "website",
  },
  twitter: {
    card: "summary",
    title: buildPageTitle(pageTitle),
    description: pageDescription,
  },
};

export default function ContactPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Início", path: "/" },
    { name: "Contato", path: "/contato" },
  ]);

  return (
    <>
      <SiteHeader />
      <script
        id="structured-data-contact-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }}
      />
      <main
        id="conteudo-principal"
        className="bg-nite-background text-nite-text-primary"
      >
        <section className="min-h-[calc(100svh-3.625rem)]">
          <Container
            size="xl"
            className="flex max-w-4xl flex-col px-6 py-16 sm:flex-row sm:gap-8 sm:px-6 sm:py-48 md:max-w-7xl md:gap-36 lg:px-6 lg:gap-72"
          >
            <div className="w-full max-w-[35rem] animate-nite-rise">
              <h1 className="nite-gradient-text mb-2 mt-2 pb-3 font-heading text-[4rem] font-normal leading-none tracking-normal text-balance md:text-[4.8rem] lg:w-max lg:max-w-[calc(100vw-3rem)] lg:whitespace-nowrap">
                Fale com o NITE
              </h1>

              <ContactRequestForm contactEmail={contactEmail} />
            </div>

            <aside
              aria-labelledby="contact-help-title"
              className="mt-16 w-full max-w-sm animate-nite-rise sm:mt-16"
            >
              <ContactEmailCopy
                titleId="contact-help-title"
                label="Get help"
                email={contactEmail}
              />
            </aside>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
