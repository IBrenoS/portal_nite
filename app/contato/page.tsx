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
      <main id="conteudo-principal" className="bg-black text-white">
        <section className="min-h-[calc(100svh-3.625rem)] py-16 sm:py-32 lg:py-44">
          <Container
            size="xl"
            className="flex max-w-4xl flex-col gap-16 md:max-w-7xl md:flex-row md:gap-28 lg:gap-56"
          >
            <div className="w-full max-w-[35rem] animate-brand-rise">
              <h1 className="font-heading text-5xl font-semibold leading-none tracking-normal text-white sm:text-6xl">
                Fale com o NITE
              </h1>

              <ContactRequestForm contactEmail={contactEmail} />
            </div>

            <aside
              aria-labelledby="contact-help-title"
              className="w-full max-w-sm animate-brand-rise md:pt-20 lg:pt-24"
            >
              <div className="grid gap-1">
                <p
                  id="contact-help-title"
                  className="text-sm font-normal text-white/58"
                >
                  Get help
                </p>
                <a
                  href={`mailto:${contactEmail}`}
                  className="group flex w-fit items-center text-sm font-normal text-white transition-colors hover:text-white/72 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25"
                >
                  {contactEmail}
                </a>
              </div>
            </aside>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
