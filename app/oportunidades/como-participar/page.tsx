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
import { NiteSymbol } from "@/components/ui/nite-symbol";
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

const processSteps = [
  {
    title: "Aproximação",
    description: "conhecer o núcleo e seus campos de atuação",
  },
  {
    title: "Repertório",
    description: "organizar base técnica e disponibilidade",
  },
  {
    title: "Compatibilidade",
    description: "encontrar contexto, momento e ritmo",
  },
  {
    title: "Integração",
    description: "entrar em ciclos de entrega e revisão",
  },
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

const processNodes = processSteps.map((step) => step.title);
const syncKeys = ["S", "Y", "N", "C"] as const;

const supportText = "text-nite-text-secondary";
const gradientTitle =
  "font-heading font-normal tracking-normal text-transparent bg-clip-text bg-gradient-to-br from-nite-text-primary via-nite-text-primary to-nite-text-secondary";

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
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="absolute inset-x-0 top-0 mx-auto h-[44rem] max-w-6xl bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.16),transparent_62%)] blur-2xl" />
      <div className="absolute inset-x-0 top-16 mx-auto h-[31rem] max-w-5xl overflow-hidden opacity-50 [mask-image:linear-gradient(to_bottom,transparent,black_16%,black_64%,transparent)]">
        <div
          className="h-full w-full origin-top rounded-[3rem] border border-nite-border-subtle bg-[radial-gradient(circle,rgba(240,240,240,0.24)_1px,transparent_1.5px)] [background-size:24px_24px] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
          style={{ transform: "perspective(980px) rotateX(62deg)" }}
        />
      </div>
    </div>
  );
}

function HeroSymbol() {
  return (
    <div
      data-component="nite-hero-symbol"
      aria-hidden="true"
      className="relative mx-auto grid size-40 place-items-center overflow-hidden rounded-[2rem] border border-white/12 bg-[radial-gradient(circle_at_34%_18%,rgba(255,255,255,0.24),transparent_32%),linear-gradient(145deg,#242424,#050505_58%,#151515)] text-nite-brand-accent shadow-[inset_0_1px_0_rgba(255,255,255,0.16),inset_0_-36px_70px_rgba(0,0,0,0.74),0_34px_110px_rgba(0,0,0,0.72),0_0_80px_rgba(56,189,248,0.14)] grayscale sm:size-44"
      style={{ transform: "perspective(720px) rotateX(5deg) rotateY(9deg)" }}
    >
      <span className="absolute -left-16 -top-16 size-52 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.7),transparent_64%)] opacity-45 mix-blend-soft-light" />
      <span className="absolute inset-x-5 bottom-4 h-10 rounded-full bg-black/60 blur-xl" />
      <NiteSymbol className="relative size-24 drop-shadow-[0_14px_34px_rgba(56,189,248,0.24)] sm:size-28" />
    </div>
  );
}

function ProcessObject() {
  return (
    <div className="relative mx-auto mt-14 max-w-6xl">
      <div
        data-component="process-object-visual"
        aria-hidden="true"
        className="relative h-[25rem] overflow-hidden sm:h-[30rem]"
      >
        <div className="absolute inset-x-0 bottom-6 mx-auto h-48 max-w-4xl bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.16),transparent_68%)] blur-2xl" />
        <div className="absolute inset-x-0 bottom-0 mx-auto h-44 max-w-5xl opacity-45 [mask-image:linear-gradient(to_bottom,transparent,black_24%,transparent)]">
          <div
            className="h-full w-full origin-bottom bg-[linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:42px_42px]"
            style={{ transform: "perspective(820px) rotateX(68deg)" }}
          />
        </div>
        <div className="absolute left-1/2 top-[54%] h-px w-[46rem] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-sky-200/80 to-transparent shadow-[0_0_28px_rgba(56,189,248,0.42)]" />
        <div className="absolute left-1/2 top-[54%] h-[18rem] w-[52rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/12 shadow-[inset_0_0_44px_rgba(56,189,248,0.1)] [transform:rotateX(60deg)_rotateZ(-17deg)]" />
        <div className="absolute left-1/2 top-[54%] h-[12rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-nite-brand-accent/25 shadow-[0_0_38px_rgba(56,189,248,0.12)] [transform:rotateX(60deg)_rotateZ(-17deg)]" />
        <div className="absolute left-1/2 top-[54%] grid size-44 -translate-x-1/2 -translate-y-1/2 place-items-center overflow-hidden rounded-[2rem] border border-white/15 bg-[radial-gradient(circle_at_34%_18%,rgba(255,255,255,0.28),transparent_31%),linear-gradient(145deg,#2b2b2b,#050505_58%,#171717)] shadow-[inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-34px_68px_rgba(0,0,0,0.78),0_36px_120px_rgba(0,0,0,0.78),0_0_90px_rgba(56,189,248,0.2)] grayscale">
          <span className="bg-gradient-to-br from-white via-zinc-400 to-white bg-clip-text font-heading text-8xl text-transparent drop-shadow-[0_18px_28px_rgba(0,0,0,0.5)]">
            N
          </span>
        </div>
        {processNodes.map((node, index) => (
          <div
            key={node}
            className={cn(
              "absolute hidden rounded-full border border-white/12 bg-black/70 px-4 py-2 text-xs font-medium text-nite-text-secondary shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_16px_48px_rgba(0,0,0,0.54)] backdrop-blur md:block",
              index === 0 && "left-[8%] top-[58%]",
              index === 1 && "left-[24%] top-[30%]",
              index === 2 && "right-[20%] top-[28%]",
              index === 3 && "right-[8%] top-[60%]",
            )}
          >
            {node}
          </div>
        ))}
        {processNodes.map((node, index) => (
          <span
            key={`${node}-dot`}
            className={cn(
              "absolute size-3 rounded-full bg-nite-brand-accent shadow-[0_0_28px_rgba(56,189,248,0.72)]",
              index === 0 && "left-[21%] top-[61%]",
              index === 1 && "left-[37%] top-[39%]",
              index === 2 && "right-[35%] top-[39%]",
              index === 3 && "right-[22%] top-[63%]",
            )}
          />
        ))}
      </div>

      <ol
        aria-label="Etapas de aproximação ao projeto"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {processSteps.map((step, index) => (
          <li
            key={step.title}
            className="rounded-2xl border border-white/10 bg-black/75 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_18px_60px_rgba(0,0,0,0.45)]"
          >
            <p className="text-xs text-nite-text-secondary">0{index + 1}</p>
            <h3 className="mt-2 font-heading text-lg font-normal text-nite-text-primary">
              {step.title}
            </h3>
            <p className="mt-2 text-xs leading-5 text-nite-text-secondary">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function SyncKeyStage() {
  return (
    <div
      data-component="sync-key-stage"
      aria-hidden="true"
      className="relative mx-auto mt-10 h-72 w-full max-w-4xl"
    >
      <div className="absolute bottom-8 left-1/2 h-14 w-[34rem] max-w-[80vw] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(255,255,255,0.2),transparent_68%)] blur-xl" />
      <div className="absolute inset-x-0 top-10 grid grid-cols-4 items-start gap-3 sm:gap-6">
        {syncKeys.map((letter, index) => (
          <div
            key={letter}
            className={cn(
              "grid aspect-square place-items-center rounded-[1.8rem] border border-white/18 bg-[linear-gradient(145deg,rgba(255,255,255,0.22),rgba(255,255,255,0.04)_24%,rgba(0,0,0,0.74)_80%),radial-gradient(circle_at_38%_20%,rgba(255,255,255,0.42),transparent_34%),#070707] shadow-[inset_0_1px_0_rgba(255,255,255,0.3),inset_0_-28px_50px_rgba(0,0,0,0.78),0_38px_95px_rgba(0,0,0,0.8)] grayscale backdrop-blur",
              index === 0 && "mt-16 -rotate-[11deg] opacity-70",
              index === 1 && "rotate-[5deg]",
              index === 2 && "mt-8 -rotate-[4deg]",
              index === 3 && "mt-4 rotate-[13deg] opacity-60",
            )}
            style={{ transformStyle: "preserve-3d" }}
          >
            <span
              data-sync-key={letter}
              className="bg-gradient-to-br from-white via-zinc-400 to-white bg-clip-text text-5xl font-bold text-transparent drop-shadow-[0_14px_22px_rgba(0,0,0,0.48)] sm:text-7xl"
            >
              {letter}
            </span>
          </div>
        ))}
      </div>
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
        <section className="relative px-6 pb-20 pt-12 text-center sm:pt-16">
          <HeroGrid />
          <Container size="xl" className="relative z-10">
            <HeroSymbol />
            <h1
              className={cn(
                gradientTitle,
                "mx-auto mt-8 max-w-6xl text-balance text-[clamp(3rem,6.4vw,5rem)] leading-none",
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
          className="relative px-6 py-20 sm:py-28"
          aria-labelledby="processo-projeto"
        >
          <Container size="xl">
            <div className="text-center">
              <h2
                id="processo-projeto"
                className={cn(
                  gradientTitle,
                  "text-[clamp(2.8rem,5.4vw,4.5rem)] leading-none",
                )}
              >
                Da aproximação ao projeto
              </h2>
              <p
                className={cn(
                  supportText,
                  "mx-auto mt-5 max-w-xl text-base leading-7 sm:text-lg",
                )}
              >
                Uma jornada visual para entender como interesse, repertório e
                maturidade se conectam aos projetos de desenvolvimento do NITE.
              </p>
            </div>

            <ProcessObject />

            <p
              className={cn(
                supportText,
                "mx-auto mt-8 max-w-2xl text-center text-sm leading-7",
              )}
            >
              De <strong className="text-nite-text-primary">aproximação</strong>{" "}
              a <strong className="text-nite-text-primary">integração</strong>,
              o processo é apresentado como um sistema de maturidade: o
              estudante se aproxima, ganha repertório, encontra compatibilidade
              e passa a atuar no ritmo de projeto do núcleo.
            </p>
          </Container>
        </section>

        <section
          className="px-6 py-20 sm:py-28"
          aria-labelledby="sinais-prontidao"
        >
          <Container size="xl">
            <div className="text-center">
              <p className="text-sm font-semibold text-nite-text-secondary">
                Como participar
              </p>
              <h2
                id="sinais-prontidao"
                className={cn(
                  gradientTitle,
                  "mx-auto mt-3 max-w-4xl text-[clamp(3rem,7vw,5.8rem)] leading-none",
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
              <SyncKeyStage />
              <p
                className={cn(
                  supportText,
                  "mx-auto mt-3 max-w-xl text-sm leading-6",
                )}
              >
                SYNC representa o ponto em que curiosidade, entrega e
                necessidade do projeto passam a trabalhar na mesma direção.
              </p>
            </div>

            <div className="mx-auto mt-20 grid max-w-5xl gap-0">
              {readinessPrinciples.map((principle, index) => (
                <article
                  key={principle.title}
                  className="grid gap-8 border-t border-nite-border-subtle py-14 lg:grid-cols-[minmax(18rem,27rem)_1fr] lg:gap-14"
                >
                  <div className="relative min-h-72 overflow-hidden border border-white/10 bg-[radial-gradient(circle_at_20%_26%,rgba(255,255,255,0.08),transparent_34%),linear-gradient(145deg,#171717,#090909_60%,#141414)] p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_28px_80px_rgba(0,0,0,0.42)]">
                    <span className="font-heading text-8xl text-white sm:text-9xl">
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
