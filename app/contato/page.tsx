import {
  ArrowRightIcon,
  ExternalLinkIcon,
  MessagesSquareIcon,
  RouteIcon,
  ShieldCheckIcon,
} from "lucide-react";
import type { Metadata } from "next";

import { siteConfig } from "@/biblioteca/site-config";
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
import { SectionHeader } from "@/components/sections/section-header";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const pageTitle = "Contato";
const pageDescription =
  "Use esta página para encontrar caminhos institucionais de contato com o Núcleo.";

const contactPurposes = [
  "Propostas de desafio, dúvidas sobre projetos e interesse em oportunidades podem ser direcionados por este canal.",
  "Canais reais serão exibidos apenas quando estiverem validados.",
  "Enquanto novos canais são consolidados, acompanhe Projetos, Oportunidades e Atualizações pelo portal.",
] as const;

const portalRoutes = [
  {
    label: "Projetos",
    href: "/projetos",
    description: "Acompanhar frentes, status e próximos passos já publicados.",
  },
  {
    label: "Oportunidades",
    href: "/oportunidades",
    description: "Ver o estado atual dos processos e orientações futuras.",
  },
  {
    label: "Atualizações",
    href: "/atualizacoes",
    description:
      "Consultar registros e bastidores quando houver conteúdo validado.",
  },
] as const;

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
      <main id="conteudo-principal">
        <section className="py-14 sm:py-16 lg:py-20">
          <Container size="xl" className="grid gap-6">
            <SectionHeader
              as="h1"
              eyebrow="Contato"
              title="Fale com o NITE"
              description={pageDescription}
            />
            <p className="max-w-3xl text-sm leading-7 text-muted-foreground">
              Esta rota resolve o caminho institucional de contato do MVP sem
              criar coleta de dados, canal operacional não validado ou promessa
              de retorno automático.
            </p>
          </Container>
        </section>

        <section className="py-16 sm:py-24" aria-labelledby="contato-caminhos">
          <Container size="xl" className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
            <Card>
              <CardHeader className="gap-4 p-6 sm:p-8">
                <span
                  className="inline-flex size-11 items-center justify-center rounded-md border border-brand-circuit-bright/30 bg-brand-circuit-bright/10 text-brand-circuit-bright"
                  aria-hidden="true"
                >
                  <MessagesSquareIcon />
                </span>
                <CardTitle>
                  <h2
                    id="contato-caminhos"
                    className="font-heading text-2xl font-semibold text-foreground"
                  >
                    Caminhos institucionais
                  </h2>
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 px-6 pb-6 sm:px-8 sm:pb-8">
                <ul className="grid gap-3 text-sm leading-7 text-muted-foreground">
                  {contactPurposes.map((purpose) => (
                    <li key={purpose} className="flex gap-3">
                      <ShieldCheckIcon
                        className="mt-1 size-4 shrink-0 text-brand-circuit-bright"
                        aria-hidden="true"
                      />
                      <span>{purpose}</span>
                    </li>
                  ))}
                </ul>

                <p className="rounded-lg border border-border bg-muted/40 p-4 text-sm leading-7 text-muted-foreground">
                  Nenhum dado pessoal é solicitado nesta etapa. O envio por
                  formulário, armazenamento, notificação e fluxo operacional
                  continuam dependentes de decisão técnica e validação
                  institucional.
                </p>
              </CardContent>
            </Card>

            <aside className="grid gap-4" aria-labelledby="canais-validados">
              <Card>
                <CardHeader className="p-5">
                  <span
                    className="inline-flex size-10 items-center justify-center rounded-md border border-border text-brand-circuit-bright"
                    aria-hidden="true"
                  >
                    <RouteIcon />
                  </span>
                  <CardTitle>
                    <h2
                      id="canais-validados"
                      className="font-heading text-xl font-semibold text-foreground"
                    >
                      Canais validados
                    </h2>
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 px-5 pb-5">
                  <p className="text-sm leading-7 text-muted-foreground">
                    Canais reais aparecem aqui somente quando já existem na
                    configuração pública do portal.
                  </p>

                  {siteConfig.publicChannels.length > 0 ? (
                    <div className="flex flex-wrap gap-3">
                      {siteConfig.publicChannels.map((channel) => (
                        <a
                          key={channel.href}
                          href={channel.href}
                          aria-label={channel.ariaLabel}
                          target="_blank"
                          rel="noreferrer"
                          className={cn(
                            buttonVariants({
                              variant: "outline",
                              size: "lg",
                            }),
                            "rounded-md",
                          )}
                        >
                          {channel.displayLabel}
                          <ExternalLinkIcon
                            data-icon="inline-end"
                            aria-hidden="true"
                          />
                        </a>
                      ))}
                    </div>
                  ) : (
                    <p className="rounded-lg border border-border bg-muted/40 p-4 text-sm leading-7 text-muted-foreground">
                      Ainda não há canal público validado na configuração do
                      portal.
                    </p>
                  )}
                </CardContent>
              </Card>
            </aside>
          </Container>
        </section>

        <section className="py-16 sm:py-20" aria-labelledby="continuar-portal">
          <Container size="xl" className="grid gap-6">
            <div className="grid gap-3">
              <h2
                id="continuar-portal"
                className="font-heading text-2xl font-semibold text-foreground"
              >
                Continue pelo portal
              </h2>
              <p className="max-w-3xl text-sm leading-7 text-muted-foreground">
                As rotas abaixo já existem no MVP e ajudam a acompanhar o NITE
                enquanto novos canais institucionais são consolidados.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {portalRoutes.map((route) => (
                <Card key={route.href}>
                  <CardHeader className="p-5">
                    <CardTitle>
                      <h3 className="font-heading text-xl font-semibold text-foreground">
                        {route.label}
                      </h3>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-4 px-5 pb-5">
                    <p className="text-sm leading-7 text-muted-foreground">
                      {route.description}
                    </p>
                    <a
                      href={route.href}
                      className="inline-flex min-h-11 w-fit items-center gap-2 rounded-md text-sm font-semibold text-brand-circuit-bright transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      Acessar {route.label}
                      <ArrowRightIcon className="size-4" aria-hidden="true" />
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
