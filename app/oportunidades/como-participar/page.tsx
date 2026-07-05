import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

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
import { PremiumHeroIcon } from "@/components/sections/premium-hero-icon";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { ReadinessSignalPath } from "./readiness-signal-path";

const pageTitle = "Como participar | Oportunidades";
const pageDescription =
  "Entenda como estudantes se aproximam do núcleo de desenvolvimento do NITE, ganham repertório e passam a atuar em projetos com ritmo e responsabilidade.";
const heroDescription =
  "Como estudantes se aproximam do núcleo, desenvolvem repertório e entram em projetos com orientação, ritmo e responsabilidade.";

const narrativeParagraphs = [
  <>
    Entrar no NITE começa antes de uma seleção formal. Começa quando o estudante
    entende que o núcleo trabalha com <strong>problemas reais</strong>,
    colaboração entre áreas e entregas que precisam de continuidade.
  </>,
  <>
    A aproximação acontece pelo interesse em{" "}
    <strong>construir com método</strong>: observar uma demanda, aprender a
    organizar uma solução, testar caminhos, documentar decisões e evoluir junto
    com um contexto de projeto.
  </>,
  <>
    O processo valoriza repertório, disponibilidade e postura. Mais do que saber
    tudo de início, importa demonstrar <strong>curiosidade técnica</strong>,
    responsabilidade com o grupo e abertura para aprender em ciclos curtos.
  </>,
] as const;

const supportText = "text-nite-text-secondary";
const gradientTitle =
  "nite-gradient-text font-heading font-normal tracking-normal";
const readinessCtaMark = "/images/oportunidades/readiness-cta-mark.svg";

export const metadata: Metadata = {
  ...defaultMetadata,
  title: buildPageTitle(pageTitle),
  description: pageDescription,
  alternates: {
    canonical: absoluteUrl("/oportunidades/como-participar"),
  },
  openGraph: {
    title: buildPageTitle(pageTitle),
    description: pageDescription,
    url: absoluteUrl("/oportunidades/como-participar"),
    type: "website",
  },
  twitter: {
    card: "summary",
    title: buildPageTitle(pageTitle),
    description: pageDescription,
  },
};

function HeroGrid() {
  return (
    <div
      data-component="resend-inspired-hero-grid"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 bg-nite-background"
    />
  );
}

function HeroSymbol() {
  return <PremiumHeroIcon />;
}

function ReadinessFinalCta() {
  return (
    <div
      data-component="readiness-final-cta"
      className="mt-[10vh] flex flex-col items-center justify-center px-0 py-32 text-center"
    >
      <Image
        src={readinessCtaMark}
        alt=""
        width={80}
        height={80}
        aria-hidden="true"
        data-component="readiness-final-cta-mark"
        className="mb-8 h-20 w-20 select-none"
      />
      <h2
        className={cn(
          gradientTitle,
          "mb-2 max-w-[14ch] text-center text-[3rem] leading-[120%] tracking-tighter md:text-[3.5rem]",
        )}
      >
        Leve seus sinais para oportunidades
      </h2>
      <p className="mb-8 max-w-[31rem] text-balance text-center text-base font-normal leading-[1.6] text-[#8C8C8C] md:text-[1.125rem] md:leading-[1.5]">
        Interesse, ritmo, registro e contexto já mostram por onde começar.
        Avance para oportunidades e encontre o ponto de entrada mais alinhado ao
        seu momento.
      </p>
      <Link
        href="/oportunidades"
        className={cn(
          buttonVariants({ variant: "primary", size: "lg" }),
          "h-12 rounded-2xl px-5 text-base",
        )}
      >
        Ver oportunidades
      </Link>
    </div>
  );
}

export default function HowToParticipatePage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Início", path: "/" },
    { name: "Oportunidades", path: "/oportunidades" },
    { name: "Como participar", path: "/oportunidades/como-participar" },
  ]);

  return (
    <>
      <SiteHeader />
      <script
        id="structured-data-opportunities-how-to-participate-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }}
      />
      <main
        id="conteudo-principal"
        className="overflow-hidden bg-nite-background text-nite-text-primary"
      >
        <section
          data-component="resend-inspired-hero"
          className="relative isolate grid min-h-[calc(100svh-3.625rem)] content-start overflow-hidden bg-nite-background px-6 pb-16 pt-20 text-center sm:pt-24 md:pb-20 md:pt-16"
        >
          <HeroGrid />
          <Container size="xl" className="relative z-10">
            <HeroSymbol />
            <h1
              className={cn(
                gradientTitle,
                "mx-auto mt-10 max-w-6xl text-balance text-[2.75rem] leading-[1.04] sm:text-6xl md:text-[4.8rem] md:leading-none lg:text-[5rem]",
              )}
            >
              O caminho para construir com o NITE
            </h1>
            <p
              className={cn(
                supportText,
                "mx-auto mt-6 max-w-2xl text-base leading-7 sm:text-lg",
              )}
            >
              {heroDescription}
            </p>
          </Container>
        </section>

        <section
          className="px-6 py-20 sm:py-28"
          aria-labelledby="caminho-entrada"
        >
          <Container size="lg">
            <h2
              id="caminho-entrada"
              className="text-center font-heading text-4xl font-normal text-nite-text-primary"
            >
              O caminho de entrada
            </h2>
            <div className="mx-auto mt-12 grid max-w-[30rem] gap-7 text-lg leading-8 text-nite-text-secondary">
              {narrativeParagraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="[&_strong]:font-medium [&_strong]:text-nite-text-primary"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Container>
        </section>

        <section
          data-nite-scene="inverse"
          className="bg-nite-background px-6 py-20 text-nite-text-primary sm:py-28"
          aria-labelledby="sinais-prontidao"
        >
          <Container size="xl">
            <div className="mb-8 flex flex-col items-center justify-center text-center md:mb-16">
              <h2
                id="sinais-prontidao"
                className={cn(
                  gradientTitle,
                  "relative mb-2 max-w-[13ch] text-[3rem] leading-[120%] tracking-tighter md:text-[3.5rem]",
                )}
              >
                Sinais de prontidão
              </h2>
              <p className="mx-auto w-full max-w-[32rem] text-balance text-base font-normal leading-[1.6] text-[#8C8C8C] md:text-[1.125rem] md:leading-[1.5]">
                Entrar no NITE não é escolher um rótulo. É encontrar sincronia
                entre interesse, repertório, ritmo e contexto de projeto.
              </p>
            </div>

            <ReadinessSignalPath />
            <ReadinessFinalCta />
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
