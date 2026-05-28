import { MailCheckIcon, ShieldCheckIcon } from "lucide-react";
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
import { OpportunityBanner } from "@/components/sections/opportunity-banner";
import { OpportunityInterestFormPreview } from "@/components/sections/opportunity-interest-form-preview";
import { SectionHeader } from "@/components/sections/section-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const pageTitle = "Oportunidades";
const pageDescription =
  "Acompanhe oportunidades do NITE com estado claro, orientações institucionais e fluxo honesto para processos seletivos quando houver abertura validada.";

const opportunityAreas = [
  "Programação",
  "Dados e IA",
  "Robótica",
  "UX/UI",
  "Automação",
  "Social media",
  "Documentação",
  "Experiência digital",
];

export const metadata: Metadata = {
  ...defaultMetadata,
  title: buildPageTitle(pageTitle),
  description: pageDescription,
  alternates: {
    canonical: absoluteUrl("/oportunidades"),
  },
  openGraph: {
    title: buildPageTitle(pageTitle),
    description: pageDescription,
    url: absoluteUrl("/oportunidades"),
    type: "website",
  },
  twitter: {
    card: "summary",
    title: buildPageTitle(pageTitle),
    description: pageDescription,
  },
};

export default function OpportunitiesPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Início", path: "/" },
    { name: "Oportunidades", path: "/oportunidades" },
  ]);

  return (
    <>
      <SiteHeader />
      <script
        id="structured-data-opportunities-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }}
      />
      <main id="conteudo-principal">
        <section className="py-14 sm:py-16 lg:py-20">
          <Container size="xl" className="grid gap-6">
            <SectionHeader
              as="h1"
              eyebrow="Oportunidades"
              title="Oportunidades do NITE"
              description={pageDescription}
            />
          </Container>
        </section>

        <section
          id="estado-oportunidades"
          className="py-16 sm:py-24"
          aria-labelledby="estado-oportunidades-titulo"
        >
          <Container size="xl" className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
            <OpportunityBanner
              titleId="estado-oportunidades-titulo"
              title="No momento, não há oportunidades abertas."
              description="Quando houver processo seletivo, esta página será o canal principal para acompanhar orientações e manifestar interesse."
              note="Acompanhe esta página ou fale com o NITE para dúvidas institucionais. Nenhum envio de interesse ou currículo está ativo agora; quando houver processo validado, use e-mail institucional se aplicável. O envio futuro não garante aprovação."
              cta={{ label: "Falar com o NITE", href: "/contato" }}
            />

            <aside
              className="grid gap-4"
              aria-labelledby="fluxo-oportunidades-titulo"
            >
              <Card>
                <CardHeader className="p-5">
                  <CardTitle>
                    <h2
                      id="fluxo-oportunidades-titulo"
                      className="font-heading text-xl font-semibold text-foreground"
                    >
                      Como funcionará quando houver abertura
                    </h2>
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-5 pb-5">
                  <ol className="grid gap-4 text-sm leading-7 text-muted-foreground">
                    <li className="flex gap-3">
                      <span className="mt-1 inline-flex size-6 shrink-0 items-center justify-center rounded-md border border-border text-xs font-semibold text-foreground">
                        1
                      </span>
                      <span>
                        A oportunidade validada aparecerá com orientações
                        públicas e estado textual claro.
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-1 inline-flex size-6 shrink-0 items-center justify-center rounded-md border border-border text-xs font-semibold text-foreground">
                        2
                      </span>
                      <span>
                        O formulário integrado será exibido apenas se o processo
                        estiver aberto e o canal técnico estiver definido.
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-1 inline-flex size-6 shrink-0 items-center justify-center rounded-md border border-border text-xs font-semibold text-foreground">
                        3
                      </span>
                      <span>
                        As mensagens devem orientar próximos passos sem prometer
                        resposta automática, aprovação ou acompanhamento de
                        candidatura.
                      </span>
                    </li>
                  </ol>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="p-5">
                  <span className="inline-flex size-10 items-center justify-center rounded-md border border-border text-brand-circuit-bright">
                    <ShieldCheckIcon aria-hidden="true" />
                  </span>
                  <CardTitle>
                    <h2 className="font-heading text-xl font-semibold text-foreground">
                      Informação honesta
                    </h2>
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-3 px-5 pb-5 text-sm leading-7 text-muted-foreground">
                  <p>
                    Esta página não anuncia vagas, datas, prazos, responsáveis,
                    métricas ou critérios de aprovação sem confirmação.
                  </p>
                  <p>
                    Nenhum dado pessoal é solicitado enquanto não houver fluxo
                    operacional aprovado.
                  </p>
                </CardContent>
              </Card>
            </aside>
          </Container>
        </section>

        <section
          className="py-16 sm:py-20"
          aria-labelledby="estrutura-formulario-oportunidades"
        >
          <Container size="xl">
            <OpportunityInterestFormPreview titleId="estrutura-formulario-oportunidades" />
          </Container>
        </section>

        <section
          className="py-16 sm:py-20"
          aria-labelledby="areas-oportunidades"
        >
          <Container size="xl" className="grid gap-6">
            <div className="grid gap-3">
              <div className="inline-flex size-10 items-center justify-center rounded-md border border-border text-brand-circuit-bright">
                <MailCheckIcon aria-hidden="true" />
              </div>
              <h2
                id="areas-oportunidades"
                className="font-heading text-2xl font-semibold text-foreground"
              >
                Frentes que podem receber oportunidades
              </h2>
              <p className="max-w-3xl text-sm leading-7 text-muted-foreground">
                As áreas abaixo indicam possibilidades de atuação do núcleo.
                Elas não representam vagas abertas sem confirmação.
              </p>
            </div>

            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {opportunityAreas.map((area) => (
                <li
                  key={area}
                  className="rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium text-foreground"
                >
                  {area}
                </li>
              ))}
            </ul>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
