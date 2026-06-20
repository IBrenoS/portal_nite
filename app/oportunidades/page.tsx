import { CheckCircle2Icon, FileTextIcon, MailCheckIcon } from "lucide-react";
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
import { OpportunityStatus } from "@/components/sections/opportunity-status";
import { cardVariants } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { cn } from "@/lib/utils";

const pageTitle = "Oportunidades";
const pageDescription =
  "Acompanhe oportunidades do NITE com estado claro, orientações institucionais e fluxo honesto para processos seletivos quando houver abertura validada.";

const heroDescription =
  "Descubra como participar do NITE, conheça os projetos e acompanhe a abertura de processos seletivos.";

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
    title: "Horas curriculares",
    description: "Acumule horas conforme as regras do seu curso.",
    badge: "Formação",
  },
  {
    title: "Projetos reais",
    description: "Atue em entregas ligadas a necessidades reais.",
    badge: "Prática",
  },
  {
    title: "Certificado de conclusão",
    description: "Receba certificado após cumprir a carga horária do núcleo.",
    badge: "Conquista",
  },
  {
    title: "Currículo",
    description: "Leve uma vivência prática para seu currículo.",
    badge: "Carreira",
  },
  {
    title: "Prática guiada",
    description: "Aplique conteúdos de sala em entregas reais.",
    badge: "Aprendizado",
  },
  {
    title: "Equipe",
    description: "Colabore com estudantes de diferentes cursos.",
    badge: "Colaboração",
  },
  {
    title: "Integração",
    description: "Veja tecnologia, comunicação e experiência juntas.",
    badge: "Integração",
  },
  {
    title: "Autonomia",
    description: "Organize tarefas e acompanhe seu progresso.",
    badge: "Crescimento",
  },
  {
    title: "Rotina de projeto",
    description: "Passe por planejamento, execução e revisão.",
    badge: "Experiência",
  },
] as const;

const commitments = [
  {
    Icon: CheckCircle2Icon,
    text: "Nenhuma vaga, data ou critério é publicado sem confirmação institucional.",
  },
  {
    Icon: MailCheckIcon,
    text: "Nenhum dado pessoal é solicitado enquanto não houver fluxo operacional aprovado.",
  },
  {
    Icon: FileTextIcon,
    text: "Um envio futuro não garante aprovação, resposta automática ou acompanhamento individual.",
  },
] as const;

const pathCardClassName = cn(
  cardVariants({ variant: "interactive" }),
  "group relative min-h-[23.5rem] gap-0 rounded-[1rem] px-8 py-10 text-center transition-all duration-[400ms] ease-[cubic-bezier(0.19,1,0.22,1)] motion-reduce:transition-none md:min-h-96 md:px-20",
);

const sectionTitleClassName =
  "text-balance font-heading text-[clamp(2rem,4vw,2.25rem)] font-normal leading-[1.3] tracking-normal text-nite-text-primary";

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
        className="overflow-hidden bg-nite-background text-nite-text-primary"
      >
        <section className="px-6 pb-8 pt-8 text-center sm:pb-8 sm:pt-24">
          <Container
            size="xl"
            className="grid justify-items-center gap-0 lg:px-0"
          >
            <h1 className="w-full text-balance font-heading text-[clamp(3.5rem,8vw,4.8rem)] font-normal leading-none tracking-normal text-nite-text-primary">
              Faça parte do NITE
            </h1>
            <p className="mt-5 max-w-[42rem] text-pretty text-base leading-7 text-nite-text-secondary md:text-lg">
              {heroDescription}
            </p>
          </Container>
        </section>

        <section className="px-6 py-10 sm:py-14" aria-label="Caminhos">
          <Container
            size="xl"
            className="grid max-w-5xl gap-8 md:grid-cols-2 md:px-0 lg:px-0"
          >
            <Link
              href="/oportunidades/como-participar"
              className={pathCardClassName}
            >
              <h2 className="mt-2 font-heading text-4xl font-normal leading-none text-nite-text-primary">
                Processos
              </h2>
              <p className="mt-1 font-heading text-4xl font-normal leading-none text-nite-text-muted">
                Como participar
              </p>
              <Image
                src="/images/oportunidades/n-icon.png"
                alt="Ícone metálico com a letra N do NITE"
                width={1024}
                height={1024}
                priority
                sizes="(min-width: 768px) 334px, calc(100vw - 96px)"
                className="mx-auto mt-8 aspect-[334/228] w-full max-w-[20.875rem] rounded-lg object-contain grayscale opacity-80 transition-[filter,opacity,transform] duration-[400ms] ease-[cubic-bezier(0.19,1,0.22,1)] motion-reduce:transition-none group-hover:grayscale-0 group-hover:opacity-100"
              />
            </Link>

            <Link href="/projetos" className={pathCardClassName}>
              <h2 className="mt-2 font-heading text-4xl font-normal leading-none text-nite-text-primary">
                Projetos
              </h2>
              <p className="mt-1 font-heading text-4xl font-normal leading-none text-nite-text-muted">
                Onde atuar
              </p>
              <Image
                src="/images/projetos/programacao-lab-card.png"
                alt="Interface de um projeto de programação desenvolvido no NITE"
                width={760}
                height={480}
                priority
                sizes="(min-width: 768px) 334px, calc(100vw - 96px)"
                className="mx-auto mt-8 aspect-[334/228] w-full max-w-[20.875rem] rounded-lg object-cover grayscale opacity-70 transition-[filter,opacity] duration-[400ms] ease-[cubic-bezier(0.19,1,0.22,1)] motion-reduce:transition-none group-hover:grayscale-0 group-hover:opacity-100"
              />
            </Link>
          </Container>
        </section>

        <section className="px-6 py-16" aria-labelledby="areas-nite">
          <Container
            size="xl"
            className="grid max-w-5xl justify-items-center gap-12 lg:px-0"
          >
            <div className="grid justify-items-center gap-3 text-center">
              <h2
                id="areas-nite"
                className="font-sans text-sm font-normal text-nite-text-secondary"
              >
                O que fazemos no NITE
              </h2>
              <p className="max-w-xl text-pretty text-sm leading-6 text-nite-text-muted">
                Conheça os temas e atividades que fazem parte do nosso dia a
                dia. Esta lista não representa vagas abertas.
              </p>
            </div>
            <ul className="grid w-full grid-cols-2 gap-x-6 gap-y-8 text-center sm:grid-cols-4">
              {opportunityAreas.map((area) => (
                <li
                  key={area}
                  className="font-heading text-xl font-normal text-nite-text-primary sm:text-2xl"
                >
                  {area}
                </li>
              ))}
            </ul>
          </Container>
        </section>

        <section
          className="px-6 py-20 sm:py-28"
          aria-labelledby="benefits-perks"
        >
          <Container size="xl" className="grid max-w-5xl gap-20 lg:px-0">
            <div className="grid justify-items-center gap-3 text-center">
              <h2 id="benefits-perks" className={sectionTitleClassName}>
                Benefícios e vantagens
              </h2>
              <p className="max-w-2xl text-pretty text-base leading-7 text-nite-text-secondary md:text-lg">
                Experiências que apoiam sua formação dentro e fora da sala de
                aula.
              </p>
            </div>

            <ul className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {benefitItems.map((item, index) => (
                <li
                  key={item.title}
                  className={cn(
                    "flex min-h-[10.5rem] flex-col gap-2 px-4 py-4 text-pretty lg:min-h-[12.5rem] lg:border-b lg:border-r lg:border-border lg:px-10 lg:pb-12 lg:pt-9",
                    (index + 1) % 3 === 0 && "lg:border-r-0",
                    index >= 6 && "lg:border-b-0",
                  )}
                >
                  <h3 className="text-balance font-heading text-xl font-normal leading-8 text-nite-text-primary md:leading-none">
                    {item.title}
                  </h3>
                  <p className="mt-1 max-w-[30ch] text-pretty text-sm leading-[1.72] text-nite-text-secondary">
                    {item.description}
                  </p>
                  <Chip
                    variant={index < 3 ? "default" : "quiet"}
                    className="mt-auto w-fit"
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
          className="scroll-mt-24 px-6 pb-24 pt-20 sm:pb-28"
          aria-labelledby="estado-oportunidades-titulo"
        >
          <Container size="md" className="grid max-w-[720px] gap-12 px-0">
            <div className="grid justify-items-center gap-3 text-center">
              <h2
                id="estado-oportunidades-titulo"
                className={sectionTitleClassName}
              >
                Oportunidades abertas
              </h2>
              <p className="max-w-xl text-pretty text-base leading-7 text-nite-text-secondary md:text-lg">
                Acompanhe aqui as próximas oportunidades para fazer parte do
                NITE.
              </p>
            </div>

            <div
              data-component="opportunity-banner"
              data-slot="card"
              data-status="closed"
              className="border-y border-border"
            >
              <div className="grid gap-5 py-8 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
                <div className="min-w-0">
                  <h3 className="text-balance font-heading text-2xl font-normal leading-8 text-nite-text-primary">
                    Nenhum processo aberto agora.
                  </h3>
                  <p className="mt-3 max-w-2xl text-pretty text-sm leading-7 text-nite-text-secondary">
                    Quando uma oportunidade for publicada, você encontrará aqui
                    a área, os requisitos e como participar.
                  </p>
                </div>
                <OpportunityStatus status="closed" />
              </div>
            </div>
          </Container>
        </section>

        <section className="px-6 pb-28 pt-8 sm:pb-32" aria-label="Compromissos">
          <Container
            size="xl"
            className="grid max-w-5xl gap-0 border-t border-border px-0 text-sm leading-7 text-nite-text-secondary md:grid-cols-3"
          >
            {commitments.map(({ Icon, text }, index) => (
              <div
                key={text}
                className={cn(
                  "flex gap-3 py-8 md:px-8",
                  index > 0 &&
                    "border-t border-border md:border-l md:border-t-0",
                )}
              >
                <Icon
                  className="mt-1 size-4 shrink-0 text-status-done"
                  aria-hidden="true"
                />
                <p className="text-pretty">{text}</p>
              </div>
            ))}
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
