import {
  BellIcon,
  CheckCircle2Icon,
  ClipboardListIcon,
  FileTextIcon,
  LockKeyholeIcon,
  MailCheckIcon,
  ShieldCheckIcon,
} from "lucide-react";
import Image from "next/image";
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
import { OpportunityInterestFormPreview } from "@/components/sections/opportunity-interest-form-preview";
import { OpportunityStatus } from "@/components/sections/opportunity-status";
import { Chip } from "@/components/ui/chip";
import { NiteSymbol } from "@/components/ui/nite-symbol";
import { cn } from "@/lib/utils";

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
] as const;

const benefitItems = [
  {
    title: "Estado público claro",
    description:
      "A página informa quando não há processo aberto e muda apenas com confirmação institucional.",
    badge: "Portal",
  },
  {
    title: "Canal integrado",
    description:
      "O formulário próprio segue aprovado como direção futura, condicionado ao backend operacional.",
    badge: "Futuro",
  },
  {
    title: "Identificação institucional",
    description:
      "Quando aplicável, o fluxo prioriza identificação por vínculo acadêmico e orientação pública.",
    badge: "Processo",
  },
  {
    title: "Sem vagas fictícias",
    description:
      "Nenhuma oportunidade, prazo, responsável ou requisito aparece sem validação anterior.",
    badge: "Governança",
  },
  {
    title: "Privacidade antes do envio",
    description:
      "Nenhum dado pessoal é solicitado enquanto coleta, armazenamento e notificação não estiverem definidos.",
    badge: "Segurança",
  },
  {
    title: "Critérios publicados",
    description:
      "Quando houver abertura, a página deve explicar área, estado, requisitos e próximos passos.",
    badge: "Clareza",
  },
  {
    title: "Contato institucional",
    description:
      "Dúvidas sobre processos e participação seguem pelo canal oficial de contato do portal.",
    badge: "Suporte",
  },
  {
    title: "Frentes do núcleo",
    description:
      "As áreas listadas indicam possibilidades de atuação, não posições ativas.",
    badge: "NITE",
  },
  {
    title: "Fluxo sem promessa",
    description:
      "Envios futuros não devem prometer aprovação, resposta automática ou acompanhamento individual.",
    badge: "Honesto",
  },
] as const;

const processNotes = [
  {
    title: "Estado normal",
    text: "Este é um estado normal da página, não um erro ou conteúdo pendente.",
    Icon: BellIcon,
  },
  {
    title: "Estrutura em preparação",
    text: "A estrutura futura aparece como referência, sem campos ativos ou envio real.",
    Icon: ClipboardListIcon,
  },
  {
    title: "Conteúdo validado",
    text: "A página só publica processos, requisitos e datas quando houver confirmação.",
    Icon: ShieldCheckIcon,
  },
  {
    title: "Canal seguro",
    text: "Dados pessoais dependem de decisão técnica sobre backend e privacidade.",
    Icon: LockKeyholeIcon,
  },
] as const;

const careersCtaBase = cn(
  "relative inline-flex shrink-0 select-none items-center justify-center rounded-[1rem] border-[2px] border-white/5 bg-[linear-gradient(104deg,rgba(253,253,253,0.05)_5%,rgba(240,240,228,0.1)_100%)] bg-origin-border font-sans font-semibold text-white shadow-sm backdrop-blur-[25px] transition-all duration-200 ease-in-out hover:bg-white/90 hover:text-black hover:shadow-[0_18px_48px_rgb(255_255_255_/_0.12),0_1px_3px_rgb(0_0_0_/_0.1),0_1px_2px_-1px_rgb(0_0_0_/_0.1)] focus-visible:bg-white/90 focus-visible:text-black focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30",
);

const seeOpenPositionsCta = cn(
  careersCtaBase,
  "h-12 w-[190px] gap-1 px-5 text-base leading-6",
);

const seeHowWeHireCta = cn(
  careersCtaBase,
  "h-10 w-40 gap-2 px-4 text-sm leading-5",
);

const resendGradientText =
  "bg-[linear-gradient(to_right_bottom,#fff_30%,rgba(255,255,255,0.5))] bg-clip-text text-transparent";

const resendSupportText = "text-[rgb(161,164,165)]";

const resendHeroTitle = cn(
  resendGradientText,
  "mb-2 w-full text-balance pb-3 font-heading text-[clamp(3rem,8.8vw,4rem)] font-normal leading-[100%] tracking-normal md:text-[4.8rem]",
);

const resendSectionTitle =
  "font-heading text-[2.25rem] font-normal leading-[130%] tracking-normal text-[rgba(252,253,255,0.937)]";

const resendCardTitle =
  "font-heading text-[2.25rem] font-normal leading-none tracking-normal text-[rgba(252,253,255,0.937)]";

const resendCardSubtitle = cn(
  resendGradientText,
  "mt-1 font-sans text-[2.25rem] font-normal leading-none tracking-normal opacity-50",
);

const resendCardFrame =
  "group relative min-h-[421px] overflow-hidden rounded-[1rem] border border-[rgba(217,237,254,0.145)] bg-transparent px-8 py-12 text-center transition duration-brand-micro ease-brand-out hover:border-[rgba(217,237,254,0.26)] focus-visible:ring-4 focus-visible:ring-white/30";

const resendInnerFrame =
  "border border-[rgba(217,237,254,0.145)] bg-transparent";

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
      <main
        id="conteudo-principal"
        className="overflow-hidden bg-background text-foreground"
      >
        <section className="relative px-6 pb-7 pt-12 text-center sm:pb-10 sm:pt-24 lg:pb-5">
          <Container
            size="xl"
            className="relative z-10 grid justify-items-center"
          >
            <h1 className={resendHeroTitle}>Faça parte do NITE</h1>
            <p
              className={cn(
                resendSupportText,
                "mb-6 w-full text-balance text-base font-normal leading-[1.5] tracking-normal md:text-[1.125rem]",
              )}
            >
              {pageDescription}
            </p>
            <a href="#open-positions" className={seeOpenPositionsCta}>
              Ver oportunidades
            </a>
          </Container>
        </section>

        <section className="px-6 py-10 sm:py-14" aria-label="Contexto">
          <Container
            size="xl"
            className="grid max-w-[1024px] gap-8 lg:grid-cols-2 lg:px-0"
          >
            <a href="#open-positions" className={resendCardFrame}>
              <h2 className={resendCardTitle}>Processos</h2>
              <p className={resendCardSubtitle}>Como participar</p>
              <div
                className={cn(
                  resendInnerFrame,
                  "mx-auto mt-10 grid max-w-sm place-items-center rounded-xl p-10 grayscale transition duration-brand-micro ease-brand-out group-hover:grayscale-0",
                )}
              >
                <NiteSymbol className="h-auto w-40 text-brand-circuit-bright" />
              </div>
            </a>

            <Link href="/projetos" className={resendCardFrame}>
              <h2 className={resendCardTitle}>Projetos</h2>
              <p className={resendCardSubtitle}>Onde atuar</p>
              <div
                className={cn(
                  resendInnerFrame,
                  "mx-auto mt-10 max-w-sm overflow-hidden rounded-xl grayscale transition duration-brand-micro ease-brand-out group-hover:grayscale-0",
                )}
              >
                <Image
                  src="/images/projetos/programacao-lab-card.png"
                  alt="Interface visual de projeto do NITE"
                  width={760}
                  height={480}
                  className="aspect-[4/3] w-full object-cover opacity-82"
                />
              </div>
            </Link>
          </Container>
        </section>

        <section className="px-6 py-16 sm:py-20" aria-labelledby="areas-nite">
          <Container size="xl" className="grid justify-items-center gap-12">
            <div className="grid justify-items-center gap-3 text-center">
              <p id="areas-nite" className={cn("text-sm", resendSupportText)}>
                Frentes acompanhadas pelo portal
              </p>
              <p
                className={cn(resendSupportText, "max-w-2xl text-sm leading-7")}
              >
                Elas indicam possibilidades de atuação do núcleo. Elas não
                representam vagas abertas sem confirmação.
              </p>
            </div>
            <ul className="grid w-full max-w-5xl grid-cols-2 gap-x-8 gap-y-9 text-center sm:grid-cols-3 lg:grid-cols-4">
              {opportunityAreas.map((area) => (
                <li
                  key={area}
                  className="font-heading text-xl font-normal text-[rgba(252,253,255,0.937)] sm:text-2xl"
                >
                  {area}
                </li>
              ))}
            </ul>
          </Container>
        </section>

        <section className="px-6 py-16 sm:py-24" aria-labelledby="beneficios">
          <Container size="xl" className="grid gap-14 lg:px-14">
            <div className="grid justify-items-center gap-3 text-center">
              <h2 id="beneficios" className={resendSectionTitle}>
                Benefícios & garantias
              </h2>
              <p
                className={cn(
                  resendSupportText,
                  "max-w-2xl text-base leading-[1.5] md:text-[1.125rem]",
                )}
              >
                A experiência precisa parecer pronta mesmo quando não existe
                processo aberto.
              </p>
            </div>

            <ul className="grid border-y border-border lg:grid-cols-3">
              {benefitItems.map((item, index) => (
                <li
                  key={item.title}
                  className={cn(
                    "min-h-48 border-border px-0 py-8 sm:px-8 lg:px-10",
                    index > 0 && "border-t lg:border-t-0",
                    index % 3 !== 0 && "lg:border-l",
                    index > 2 && "lg:border-t",
                  )}
                >
                  <h3 className="font-heading text-xl font-normal text-[rgba(252,253,255,0.937)]">
                    {item.title}
                  </h3>
                  <p
                    className={cn(
                      resendSupportText,
                      "mt-4 max-w-xs text-sm leading-7",
                    )}
                  >
                    {item.description}
                  </p>
                  <Chip
                    variant={index < 6 ? "default" : "quiet"}
                    className="mt-4"
                  >
                    {item.badge}
                  </Chip>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        <section
          id="open-positions"
          className="scroll-mt-24 px-6 py-20 sm:py-24"
          aria-labelledby="estado-oportunidades-titulo"
        >
          <Container size="xl" className="grid max-w-[768px] gap-12">
            <div className="text-center">
              <h2
                id="estado-oportunidades-titulo"
                className={cn("mx-auto", resendSectionTitle)}
              >
                Oportunidades abertas
              </h2>
              <p
                className={cn(
                  resendSupportText,
                  "mb-6 text-base font-normal leading-[1.5] md:text-[1.125rem]",
                )}
              >
                Comece por aqui quando houver processo validado.
              </p>
              <Link href="/contato" className={seeHowWeHireCta}>
                Falar com o NITE
              </Link>
            </div>

            <div
              data-component="opportunity-banner"
              data-slot="card"
              data-status="closed"
              className="border-y border-border"
            >
              <div className="grid gap-5 py-8 sm:grid-cols-[1fr_auto] sm:items-center">
                <div className="grid gap-3">
                  <OpportunityStatus status="closed" />
                  <h3 className="font-heading text-2xl font-normal text-[rgba(252,253,255,0.937)]">
                    No momento, não há oportunidades abertas.
                  </h3>
                  <p
                    className={cn(
                      resendSupportText,
                      "max-w-2xl text-sm leading-7",
                    )}
                  >
                    Quando houver processo seletivo, esta página será o canal
                    principal para acompanhar orientações e manifestar
                    interesse.
                  </p>
                  <p
                    className={cn(
                      resendSupportText,
                      "max-w-2xl text-sm leading-7",
                    )}
                  >
                    Acompanhe esta página ou fale com o NITE para dúvidas
                    institucionais. Nenhum envio de interesse ou currículo está
                    ativo agora; quando houver processo validado, use e-mail
                    institucional se aplicável. O envio futuro não garante
                    aprovação.
                  </p>
                </div>
                <span
                  className="inline-flex size-12 items-center justify-center rounded-full border border-border bg-muted/40 text-brand-circuit-bright"
                  aria-hidden="true"
                >
                  <BellIcon className="size-5" />
                </span>
              </div>
            </div>
          </Container>
        </section>

        <section
          className="px-6 py-16 sm:py-20"
          aria-labelledby="estrutura-formulario-oportunidades"
        >
          <Container size="xl" className="lg:px-14">
            <OpportunityInterestFormPreview
              titleId="estrutura-formulario-oportunidades"
              className={cn(
                "border-[rgba(217,237,254,0.145)] bg-transparent shadow-none",
                "[&_[data-slot=card-description]]:text-[rgb(161,164,165)] [&_dd]:text-[rgb(161,164,165)] [&_dt]:font-normal [&_dt]:text-[rgba(252,253,255,0.937)] [&_p]:text-[rgb(161,164,165)]",
              )}
            />
          </Container>
        </section>

        <section className="py-20 sm:py-24" aria-label="Princípios do fluxo">
          <div className="opportunities-marquee flex gap-8">
            {[...processNotes, ...processNotes].map((note, index) => {
              const Icon = note.Icon;

              return (
                <article
                  key={`${note.title}-${index}`}
                  aria-hidden={
                    index >= processNotes.length ? "true" : undefined
                  }
                  className="w-[min(28rem,calc(100vw-3rem))] shrink-0 rounded-[1rem] border border-[rgba(217,237,254,0.145)] bg-transparent px-8 py-7"
                >
                  <Icon
                    className="size-5 text-brand-circuit-bright"
                    aria-hidden="true"
                  />
                  <h2 className="mt-8 font-heading text-xl font-normal text-[rgba(252,253,255,0.937)]">
                    {note.title}
                  </h2>
                  <p
                    className={cn(resendSupportText, "mt-3 text-sm leading-7")}
                  >
                    {note.text}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="px-6 pb-24 pt-6" aria-label="Compromissos">
          <Container
            size="xl"
            className={cn(
              resendSupportText,
              "grid gap-4 border-t border-border pt-10 text-sm leading-7 md:grid-cols-3 lg:px-14",
            )}
          >
            <div className="flex gap-3">
              <CheckCircle2Icon
                className="mt-1 size-4 shrink-0 text-status-done"
                aria-hidden="true"
              />
              <p>
                Esta página não anuncia vagas, datas, prazos, responsáveis,
                métricas ou critérios de aprovação sem confirmação.
              </p>
            </div>
            <div className="flex gap-3">
              <MailCheckIcon
                className="mt-1 size-4 shrink-0 text-status-done"
                aria-hidden="true"
              />
              <p>
                Nenhum dado pessoal é solicitado enquanto não houver fluxo
                operacional aprovado.
              </p>
            </div>
            <div className="flex gap-3">
              <FileTextIcon
                className="mt-1 size-4 shrink-0 text-status-done"
                aria-hidden="true"
              />
              <p>
                O formulário integrado será exibido apenas se o processo estiver
                aberto e o canal técnico estiver definido.
              </p>
            </div>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
