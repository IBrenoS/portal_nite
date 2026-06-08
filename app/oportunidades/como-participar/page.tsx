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
import { PremiumHeroIcon } from "@/components/sections/premium-hero-icon";
import { cn } from "@/lib/utils";

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

const readinessPrinciples = [
  {
    title: "Interesse vira construção.",
    paragraphs: [
      "O primeiro sinal não é dominar tudo. É transformar curiosidade em movimento: observar uma demanda, pesquisar, testar uma hipótese e voltar com algo que possa ser discutido.",
      "O NITE olha para esse gesto porque ele revela autonomia inicial, critério de aprendizado e vontade de aproximar estudo de projeto real.",
    ],
  },
  {
    title: "Ritmo sustenta evolução.",
    paragraphs: [
      "Ideias boas não seguram um projeto sozinhas. O que cria confiança é a capacidade de manter combinados, aparecer nas revisões e comunicar progresso antes que o trabalho dependa de cobrança.",
      "Participar do núcleo pede continuidade, leitura de prioridade e maturidade para dizer onde avançou, onde travou e o que precisa de decisão.",
    ],
  },
  {
    title: "Registro cria continuidade.",
    paragraphs: [
      "Projeto sério deixa rastro. Código, protótipo, decisão técnica, experimento, dado e processo precisam ser compreendidos por quem chega depois.",
      "No NITE, registro não é formalidade. É uma forma de transformar execução em memória compartilhada, reduzindo retrabalho e aumentando a qualidade do que o grupo consegue manter.",
    ],
  },
  {
    title: "Contexto define onde começar.",
    paragraphs: [
      "Desenvolvimento, dados, IA, UX, automação, robótica e documentação pedem repertórios diferentes. A entrada fica mais forte quando o estudante entende qual problema está diante dele, não apenas qual área parece mais interessante.",
      "Por isso, o processo observa compatibilidade entre pessoa, momento e contexto de projeto. O melhor lugar para começar é aquele em que o estudante cresce e o núcleo ganha contribuição real.",
    ],
  },
] as const;

const supportText = "text-nite-text-secondary";
const gradientTitle =
  "nite-gradient-text font-heading font-normal tracking-normal";

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
            <div className="text-center">
              <h2
                id="sinais-prontidao"
                className={cn(
                  gradientTitle,
                  "mx-auto max-w-4xl text-[clamp(3rem,7vw,5.8rem)] leading-none",
                )}
              >
                Sinais de prontidão
              </h2>
              <p
                className={cn(
                  supportText,
                  "mx-auto mt-6 max-w-2xl text-base leading-7 sm:text-lg",
                )}
              >
                Entrar no NITE não é escolher um rótulo. É encontrar sincronia
                entre interesse, repertório, ritmo e contexto de projeto.
              </p>
              <div
                data-component="readiness-visual-gap"
                aria-hidden="true"
                className="mt-2 h-[25rem] sm:h-[32rem] lg:h-[40rem]"
              />
            </div>

            <div className="mx-auto mt-12 grid max-w-5xl gap-0 sm:mt-16">
              {readinessPrinciples.map((principle, index) => (
                <article
                  key={principle.title}
                  className="grid gap-8 border-t border-nite-border-subtle py-14 lg:grid-cols-[minmax(18rem,27rem)_1fr] lg:gap-14"
                >
                  <div className="relative min-h-72 overflow-hidden border border-nite-border-subtle bg-[radial-gradient(circle_at_20%_26%,color-mix(in_srgb,var(--nite-text-primary)_8%,transparent),transparent_34%),linear-gradient(145deg,var(--nite-surface),var(--nite-background)_60%,var(--nite-surface-elevated))] p-8 shadow-[inset_0_1px_0_color-mix(in_srgb,var(--nite-text-primary)_10%,transparent),var(--nite-shadow-lift)]">
                    <span className="font-heading text-8xl text-nite-text-primary sm:text-9xl">
                      {index + 1}
                    </span>
                    <h3 className="absolute bottom-8 left-8 right-8 font-heading text-4xl font-normal leading-tight text-nite-text-primary">
                      {principle.title}
                    </h3>
                  </div>
                  <div className="grid content-center gap-6 text-lg leading-8 text-nite-text-secondary">
                    {principle.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
