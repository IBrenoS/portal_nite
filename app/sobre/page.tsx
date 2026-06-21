import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
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
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const pageTitle = "Sobre";
const pageDescription =
  "Entenda o papel institucional do NITE UNIJORGE, seus caminhos públicos e os limites honestos do portal.";

const institutionalBlocks = [
  {
    title: "Por que existe",
    description:
      "Para aproximar desafios acadêmicos de uma prática tecnológica publicável, sem depender de promessas ou dados que ainda não foram validados.",
  },
  {
    title: "Como atua",
    description:
      "Organizando demandas em recortes, protótipos, registros e caminhos públicos que ajudam estudantes, professores e gestão a acompanhar o avanço do núcleo.",
  },
  {
    title: "O que está público hoje",
    description:
      "Projetos em destaque, oportunidades, atualizações, perfis autorizados e contato institucional compõem a camada pública atual do portal.",
  },
  {
    title: "Limites honestos",
    description:
      "O portal só publica contexto, status, imagens, responsáveis e resultados quando houver validação suficiente para consulta pública.",
  },
] as const;

const publicPaths = [
  {
    label: "Explorar projetos",
    href: "/projetos",
    description: "Frentes, protótipos e entregas com status público.",
  },
  {
    label: "Ver oportunidades",
    href: "/oportunidades",
    description: "Caminhos de participação quando houver fluxo validado.",
  },
  {
    label: "Ler atualizações",
    href: "/atualizacoes",
    description: "Registros institucionais quando forem publicados.",
  },
  {
    label: "Conhecer pessoas",
    href: "/pessoas",
    description: "Perfis autorizados vinculados ao núcleo.",
  },
  {
    label: "Falar com o NITE",
    href: "/contato",
    description: "Canal institucional para contato direto.",
  },
] as const;

export const metadata: Metadata = {
  ...defaultMetadata,
  title: buildPageTitle(pageTitle),
  description: pageDescription,
  alternates: {
    canonical: absoluteUrl("/sobre"),
  },
  openGraph: {
    title: buildPageTitle(pageTitle),
    description: pageDescription,
    url: absoluteUrl("/sobre"),
    type: "website",
  },
  twitter: {
    card: "summary",
    title: buildPageTitle(pageTitle),
    description: pageDescription,
  },
};

export default function AboutPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Início", path: "/" },
    { name: "Sobre", path: "/sobre" },
  ]);

  return (
    <>
      <SiteHeader />
      <script
        id="structured-data-about-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }}
      />
      <main
        id="conteudo-principal"
        className="overflow-hidden bg-background text-foreground"
      >
        <section className="relative isolate px-6 pb-16 pt-10 sm:pb-20 sm:pt-24">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[32rem] bg-[radial-gradient(circle_at_70%_18%,rgb(56_189_248/0.16),transparent_32%),linear-gradient(180deg,rgb(13_17_28/0.72),transparent)]"
          />
          <Container
            size="xl"
            className="grid gap-12 px-0 lg:grid-cols-[minmax(0,0.9fr)_minmax(18rem,0.64fr)] lg:items-end"
          >
            <div className="max-w-[48rem]">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-nite-brand-accent">
                Sobre o NITE
              </p>
              <h1 className="mt-5 text-balance font-heading text-[clamp(2.75rem,7vw,5.45rem)] font-semibold leading-[1.02] tracking-normal text-foreground">
                NITE é a interface entre aprendizagem, tecnologia e aplicação
                pública.
              </h1>
              <p className="mt-6 max-w-[42rem] text-pretty text-base leading-8 text-nite-text-secondary sm:text-lg">
                O Núcleo de Inovação, Tecnologia e Experiência da UNIJORGE
                organiza demandas acadêmicas, projetos aplicados e oportunidades
                de participação com contexto público e transparência sobre o que
                ainda está em evolução.
              </p>
              <p className="mt-4 max-w-[38rem] text-pretty text-sm leading-7 text-nite-text-muted">
                A home apresenta a porta de entrada. Esta página explica o
                núcleo sem disputar a função dos projetos.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/projetos"
                  className={cn(
                    buttonVariants({ variant: "spotlight", size: "lg" }),
                    "w-full sm:w-fit",
                  )}
                >
                  Ver portfólio público
                  <ChevronRightIcon className="size-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/contato"
                  className={cn(
                    buttonVariants({ variant: "quiet", size: "lg" }),
                    "w-full sm:w-fit",
                  )}
                >
                  Contato institucional
                </Link>
              </div>
            </div>

            <div
              className="relative min-h-[22rem] overflow-hidden rounded-2xl border border-nite-border-subtle bg-nite-surface/70 p-5"
              data-component="about-institutional-surface"
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgb(56_189_248/0.18),transparent_34%),linear-gradient(135deg,rgb(255_255_255/0.07),transparent_46%)]"
              />
              <div className="relative grid h-full min-h-[19rem] grid-rows-[auto_1fr_auto] gap-8">
                <div className="flex items-center justify-between border-b border-nite-border-subtle pb-4">
                  <span className="font-mono text-xs uppercase tracking-[0.14em] text-nite-text-secondary">
                    Interface pública
                  </span>
                  <span className="size-2 rounded-full bg-nite-brand-accent" />
                </div>
                <div className="grid content-center gap-3">
                  {["Demanda", "Método", "Projeto", "Registro"].map(
                    (label, index) => (
                      <div
                        key={label}
                        className={cn(
                          "grid grid-cols-[5.25rem_minmax(0,1fr)] items-center gap-3 text-sm",
                          index > 0 && "text-nite-text-secondary",
                        )}
                      >
                        <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-nite-brand-accent">
                          {label}
                        </span>
                        <span className="h-px bg-nite-border-subtle" />
                      </div>
                    ),
                  )}
                </div>
                <p className="max-w-[26rem] text-sm leading-6 text-nite-text-secondary">
                  O portal funciona como uma camada de leitura: mostra o que já
                  pode ser consultado e preserva o que ainda depende de
                  validação.
                </p>
              </div>
            </div>
          </Container>
        </section>

        <section className="px-6 py-16 sm:py-24" aria-labelledby="papel-nite">
          <Container size="xl" className="grid gap-10 px-0">
            <div className="max-w-3xl">
              <h2
                id="papel-nite"
                className="text-balance font-heading text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight text-foreground"
              >
                Um núcleo público precisa explicar seu papel antes de apresentar
                suas frentes.
              </h2>
            </div>
            <div className="grid border-y border-nite-border-subtle md:grid-cols-4">
              {institutionalBlocks.map((block, index) => (
                <article
                  key={block.title}
                  className={cn(
                    "min-h-[15rem] px-0 py-8 md:px-6",
                    index > 0 &&
                      "border-t border-nite-border-subtle md:border-l md:border-t-0",
                  )}
                >
                  <h3 className="font-heading text-xl font-semibold leading-snug text-foreground">
                    {block.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-nite-text-secondary">
                    {block.description}
                  </p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="px-6 pb-24 pt-10 sm:pb-32" aria-label="Caminhos">
          <Container size="xl" className="grid gap-8 px-0">
            <div className="max-w-2xl">
              <h2 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
                Caminhos públicos
              </h2>
              <p className="mt-3 text-base leading-7 text-nite-text-secondary">
                Cada link tem uma função própria no portal, para que a home não
                concentre todos os destinos em uma única chamada.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {publicPaths.map((path) => (
                <Link
                  key={path.href}
                  href={path.href}
                  aria-label={path.label}
                  className="group flex min-h-[12rem] flex-col justify-between rounded-xl border border-nite-border-subtle bg-nite-surface/55 p-4 transition-colors hover:border-nite-border-hover hover:bg-nite-surface-focus focus-visible:border-nite-border-hover focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  <span className="font-heading text-base font-semibold leading-snug text-foreground">
                    {path.label}
                  </span>
                  <span className="text-sm leading-6 text-nite-text-secondary">
                    {path.description}
                  </span>
                  <ChevronRightIcon
                    className="size-4 text-nite-brand-accent transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
