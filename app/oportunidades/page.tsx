import {
  ArrowRightIcon,
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
import { buttonVariants } from "@/components/ui/button";
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
        className="overflow-hidden bg-black text-white"
      >
        <section className="relative px-6 pb-12 pt-16 text-center sm:pb-20 sm:pt-24 lg:pb-24">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.16),_transparent_62%)]"
          />
          <Container
            size="xl"
            className="relative z-10 grid justify-items-center"
          >
            <h1 className="max-w-4xl text-balance font-heading text-5xl font-semibold leading-[0.96] tracking-[-0.03em] text-white sm:text-7xl lg:text-8xl">
              Faça parte do NITE
            </h1>
            <p className="mt-6 max-w-2xl text-balance text-base leading-8 text-white/58 sm:text-lg">
              {pageDescription}
            </p>
            <a
              href="#open-positions"
              className={cn(
                buttonVariants({ variant: "secondary", size: "lg" }),
                "mt-8 rounded-2xl border-white/10 bg-white/[0.07] px-6 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:bg-white/12",
              )}
            >
              Ver oportunidades
              <ArrowRightIcon aria-hidden="true" className="size-4" />
            </a>
          </Container>
        </section>

        <section className="px-6 py-10 sm:py-14" aria-label="Contexto">
          <Container size="xl" className="grid gap-6 lg:grid-cols-2 lg:px-14">
            <a
              href="#open-positions"
              className="group relative min-h-[24rem] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.015] px-8 py-10 text-center transition duration-300 hover:border-white/18 hover:bg-white/[0.035] focus-visible:ring-3 focus-visible:ring-white/40"
            >
              <h2 className="font-heading text-4xl font-semibold tracking-[-0.04em] text-white">
                Processos
              </h2>
              <p className="mt-2 text-4xl tracking-[-0.04em] text-white/32">
                Como participar
              </p>
              <div className="mx-auto mt-10 grid max-w-sm place-items-center rounded-xl border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.015))] p-10 grayscale transition duration-300 group-hover:grayscale-0">
                <NiteSymbol className="h-auto w-40 text-white/78" />
              </div>
            </a>

            <Link
              href="/projetos"
              className="group relative min-h-[24rem] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.015] px-8 py-10 text-center transition duration-300 hover:border-white/18 hover:bg-white/[0.035] focus-visible:ring-3 focus-visible:ring-white/40"
            >
              <h2 className="font-heading text-4xl font-semibold tracking-[-0.04em] text-white">
                Projetos
              </h2>
              <p className="mt-2 text-4xl tracking-[-0.04em] text-white/32">
                Onde atuar
              </p>
              <div className="mx-auto mt-10 max-w-sm overflow-hidden rounded-xl border border-white/10 grayscale transition duration-300 group-hover:grayscale-0">
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
              <p id="areas-nite" className="text-sm text-white/46">
                Frentes acompanhadas pelo portal
              </p>
              <p className="max-w-2xl text-sm leading-7 text-white/44">
                Elas indicam possibilidades de atuação do núcleo. Elas não
                representam vagas abertas sem confirmação.
              </p>
            </div>
            <ul className="grid w-full max-w-5xl grid-cols-2 gap-x-8 gap-y-9 text-center sm:grid-cols-3 lg:grid-cols-4">
              {opportunityAreas.map((area) => (
                <li
                  key={area}
                  className="font-heading text-xl font-semibold tracking-[-0.03em] text-white sm:text-2xl"
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
              <h2
                id="beneficios"
                className="font-heading text-4xl font-semibold tracking-[-0.04em] text-white"
              >
                Benefícios & garantias
              </h2>
              <p className="max-w-2xl text-base leading-7 text-white/48">
                A experiência precisa parecer pronta mesmo quando não existe
                processo aberto.
              </p>
            </div>

            <ul className="grid border-y border-white/10 lg:grid-cols-3">
              {benefitItems.map((item, index) => (
                <li
                  key={item.title}
                  className={cn(
                    "min-h-48 border-white/10 px-0 py-8 sm:px-8 lg:px-10",
                    index > 0 && "border-t lg:border-t-0",
                    index % 3 !== 0 && "lg:border-l",
                    index > 2 && "lg:border-t",
                  )}
                >
                  <h3 className="font-heading text-xl font-semibold tracking-[-0.03em] text-white">
                    {item.title}
                  </h3>
                  <p className="mt-4 max-w-xs text-sm leading-7 text-white/46">
                    {item.description}
                  </p>
                  <span
                    className={cn(
                      "mt-4 inline-flex rounded-full border px-2.5 py-1 text-xs font-medium",
                      index < 6
                        ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-200"
                        : "border-blue-400/20 bg-blue-400/10 text-blue-200",
                    )}
                  >
                    {item.badge}
                  </span>
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
          <Container size="xl" className="grid max-w-4xl gap-12">
            <div className="grid justify-items-center gap-4 text-center">
              <h2
                id="estado-oportunidades-titulo"
                className="font-heading text-4xl font-semibold tracking-[-0.04em] text-white"
              >
                Oportunidades abertas
              </h2>
              <p className="max-w-2xl text-base leading-7 text-white/48">
                Comece por aqui quando houver processo validado.
              </p>
              <Link
                href="/contato"
                className={cn(
                  buttonVariants({ variant: "secondary", size: "lg" }),
                  "mt-2 rounded-2xl border-white/10 bg-white/[0.07] text-white hover:bg-white/12",
                )}
              >
                Falar com o NITE
                <ArrowRightIcon aria-hidden="true" className="size-4" />
              </Link>
            </div>

            <div
              data-component="opportunity-banner"
              data-slot="card"
              data-status="closed"
              className="border-y border-white/12"
            >
              <div className="grid gap-5 py-8 sm:grid-cols-[1fr_auto] sm:items-center">
                <div className="grid gap-3">
                  <OpportunityStatus status="closed" />
                  <h3 className="font-heading text-2xl font-semibold tracking-[-0.03em] text-white">
                    No momento, não há oportunidades abertas.
                  </h3>
                  <p className="max-w-2xl text-sm leading-7 text-white/48">
                    Quando houver processo seletivo, esta página será o canal
                    principal para acompanhar orientações e manifestar
                    interesse.
                  </p>
                  <p className="max-w-2xl text-sm leading-7 text-white/42">
                    Acompanhe esta página ou fale com o NITE para dúvidas
                    institucionais. Nenhum envio de interesse ou currículo está
                    ativo agora; quando houver processo validado, use e-mail
                    institucional se aplicável. O envio futuro não garante
                    aprovação.
                  </p>
                </div>
                <span
                  className="inline-flex size-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/64"
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
              className="border-white/10 bg-white/[0.03] text-white [&_[data-slot=card-description]]:text-white/52 [&_dd]:text-white/46 [&_dt]:text-white [&_p]:text-white/52"
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
                  className="w-[min(28rem,calc(100vw-3rem))] shrink-0 rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.01)_72%)] px-8 py-7"
                >
                  <Icon className="size-5 text-white/46" aria-hidden="true" />
                  <h2 className="mt-8 font-heading text-xl font-semibold tracking-[-0.03em] text-white">
                    {note.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-white/48">
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
            className="grid gap-4 border-t border-white/10 pt-10 text-sm leading-7 text-white/48 md:grid-cols-3 lg:px-14"
          >
            <div className="flex gap-3">
              <CheckCircle2Icon
                className="mt-1 size-4 shrink-0 text-emerald-200"
                aria-hidden="true"
              />
              <p>
                Esta página não anuncia vagas, datas, prazos, responsáveis,
                métricas ou critérios de aprovação sem confirmação.
              </p>
            </div>
            <div className="flex gap-3">
              <MailCheckIcon
                className="mt-1 size-4 shrink-0 text-emerald-200"
                aria-hidden="true"
              />
              <p>
                Nenhum dado pessoal é solicitado enquanto não houver fluxo
                operacional aprovado.
              </p>
            </div>
            <div className="flex gap-3">
              <FileTextIcon
                className="mt-1 size-4 shrink-0 text-emerald-200"
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
