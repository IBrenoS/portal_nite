import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { Container } from "@/components/layout/container";
import { BuildsCardsGrid } from "@/components/sections/builds-cards-grid";
import { SectionHeader } from "@/components/sections/section-header";
import { buttonVariants } from "@/components/ui/button";

export function BuildsSection() {
  return (
    <section
      id="sobre"
      className="bg-background py-14 sm:py-20 lg:py-24"
      data-builds-section=""
      data-surface="clean"
      data-testid="builds-section"
    >
      <Container
        size="xl"
        className="grid gap-10 lg:grid-cols-[minmax(24rem,32rem)_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[minmax(26rem,33rem)_minmax(0,1fr)]"
      >
        <SectionHeader
          className="lg:max-w-[33rem] lg:pl-16 [&_h2]:text-[2rem] [&_h2]:leading-[1.08] sm:[&_h2]:text-[2.25rem] lg:[&_h2]:text-[2.28rem] xl:[&_h2]:text-[2.35rem]"
          eyebrow="O que o NITE constrói"
          title="Saídas concretas para transformar desafios acadêmicos em tecnologia aplicada."
          description="O núcleo organiza frentes de criação que aproximam estudantes, professores e gestão de protótipos, automações, experiências digitais e aprendizagem prática."
          actions={
            <Link
              href="/projetos"
              className={buttonVariants({ variant: "quiet", size: "md" })}
            >
              Explorar frentes
              <ArrowRightIcon aria-hidden="true" />
            </Link>
          }
        />

        <BuildsCardsGrid />
      </Container>
    </section>
  );
}
