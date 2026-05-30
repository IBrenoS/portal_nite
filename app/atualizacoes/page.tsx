import {
  ArchiveIcon,
  ArrowUpRightIcon,
  Clock3Icon,
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

const pageTitle = "Atualizações";
const pageDescription =
  "Registros, novidades e bastidores das ações do núcleo.";

const institutionalUses = [
  {
    title: "Registros validados",
    description:
      "Atualizações reais serão publicadas somente após validação de conteúdo, contexto e autorização quando necessário.",
  },
  {
    title: "Arquivo organizado",
    description:
      "O portal funcionará como referência institucional para registros relevantes do núcleo, sem substituir o alcance social.",
  },
  {
    title: "Bastidores autorizados",
    description:
      "Fotos, relatos e registros de pessoas ficarão ausentes até que exista autorização e contexto de uso.",
  },
];

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
    card: "summary",
    title: buildPageTitle(pageTitle),
    description: pageDescription,
  },
};

export default function UpdatesPage() {
  const instagramChannel = siteConfig.publicChannels.find(
    (channel) => channel.label === "Instagram",
  );
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Início", path: "/" },
    { name: "Atualizações", path: "/atualizacoes" },
  ]);

  return (
    <>
      <SiteHeader />
      <script
        id="structured-data-updates-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }}
      />
      <main id="conteudo-principal">
        <section className="py-14 sm:py-16 lg:py-20">
          <Container size="xl" className="grid gap-6">
            <SectionHeader
              as="h1"
              eyebrow="Atualizações"
              title="Nite News"
              description={pageDescription}
            />
            <p className="max-w-3xl text-sm leading-7 text-muted-foreground">
              Esta seção será usada para organizar atualizações validadas do
              NITE. Conteúdos reais serão adicionados após
              validação/autorização.
            </p>
          </Container>
        </section>

        <section
          className="py-16 sm:py-24"
          aria-labelledby="estado-atualizacoes"
        >
          <Container size="xl" className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
            <Card
              data-component="updates-empty-state"
              data-status="empty"
            >
              <CardHeader className="gap-4 p-6 sm:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  <span
                    className="inline-flex size-11 shrink-0 items-center justify-center rounded-md border border-nite-brand-accent/30 bg-nite-brand-accent/10 text-nite-brand-accent"
                    aria-hidden="true"
                  >
                    <Clock3Icon />
                  </span>

                  <div className="grid gap-3">
                    <span className="w-fit rounded-full border border-border bg-muted/40 px-3 py-1 font-mono text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                      Em preparação
                    </span>
                    <div className="grid gap-2">
                      <CardTitle>
                        <h2
                          id="estado-atualizacoes"
                          className="font-heading text-2xl font-semibold text-foreground"
                        >
                          No momento, ainda não há atualizações publicadas.
                        </h2>
                      </CardTitle>
                      <p className="text-base leading-7 text-muted-foreground">
                        O portal vai reunir registros, novidades e bastidores
                        validados do núcleo, sem publicar conteúdo pendente como
                        se fosse registro real.
                      </p>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="grid gap-5 px-6 pb-6 sm:px-8 sm:pb-8">
                <p className="rounded-lg border border-border bg-muted/40 p-4 text-sm leading-7 text-muted-foreground">
                  Nenhuma atualização, evento, foto, depoimento, autor, data ou
                  métrica será exibida sem validação/autorização.
                </p>

                {instagramChannel ? (
                  <div>
                    <a
                      href={instagramChannel.href}
                      aria-label={instagramChannel.ariaLabel}
                      target="_blank"
                      rel="noreferrer"
                      className={cn(
                        buttonVariants({ variant: "outline", size: "lg" }),
                        "rounded-md",
                      )}
                    >
                      Acompanhar no Instagram
                      <ArrowUpRightIcon
                        data-icon="inline-end"
                        aria-hidden="true"
                      />
                    </a>
                  </div>
                ) : null}
              </CardContent>
            </Card>

            <aside className="grid gap-4" aria-labelledby="uso-atualizacoes">
              <Card>
                <CardHeader className="p-5">
                  <span className="inline-flex size-10 items-center justify-center rounded-md border border-border text-nite-brand-accent">
                    <ArchiveIcon aria-hidden="true" />
                  </span>
                  <CardTitle>
                    <h2
                      id="uso-atualizacoes"
                      className="font-heading text-xl font-semibold text-foreground"
                    >
                      Arquivo institucional
                    </h2>
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 px-5 pb-5">
                  <p className="text-sm leading-7 text-muted-foreground">
                    O Instagram permanece como canal complementar de alcance
                    social. O portal deve organizar registros relevantes com
                    mais contexto, rastreabilidade e cuidado institucional.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="p-5">
                  <span className="inline-flex size-10 items-center justify-center rounded-md border border-border text-nite-brand-accent">
                    <ShieldCheckIcon aria-hidden="true" />
                  </span>
                  <CardTitle>
                    <h2 className="font-heading text-xl font-semibold text-foreground">
                      Conteúdo autorizado
                    </h2>
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-5 pb-5">
                  <ul className="grid gap-4 text-sm leading-7 text-muted-foreground">
                    {institutionalUses.map((item) => (
                      <li key={item.title} className="grid gap-1">
                        <span className="font-heading font-semibold text-foreground">
                          {item.title}
                        </span>
                        <span>{item.description}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </aside>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
