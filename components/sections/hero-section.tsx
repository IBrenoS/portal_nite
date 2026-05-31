import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { AnimatedNiteLogo } from "@/components/ui/animated-nite-logo";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

export function HeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      data-hero-section=""
      data-surface="clean"
      data-testid="hero-section"
    >
      <Container
        size="xl"
        className="relative grid min-h-[calc(92svh-4rem)] items-center gap-8 py-10 sm:gap-12 sm:py-16 lg:grid-cols-[minmax(0,47rem)_minmax(18rem,1fr)] lg:gap-10 lg:py-20 xl:grid-cols-[minmax(0,48rem)_minmax(18rem,1fr)] xl:gap-12"
      >
        <Reveal className="relative z-10 order-2 flex max-w-[43rem] flex-col items-center gap-8 text-center sm:order-none sm:gap-9 lg:max-w-[47rem] lg:items-start lg:pl-16 lg:text-left xl:max-w-[48rem]">
          <div className="flex flex-col gap-5 sm:gap-6">
            <p className="mx-auto max-w-[40rem] font-mono text-xs uppercase tracking-[0.18em] text-nite-brand-accent lg:mx-0">
              UNIJORGE / Núcleo de Inovação & Tecnologia
            </p>
            <h1 className="max-w-[11.4em] font-heading text-[2.35rem] font-semibold leading-[1.04] text-foreground [text-wrap:balance] min-[390px]:text-[2.45rem] sm:text-[3.15rem] sm:leading-[1.03] lg:max-w-[14.9em] lg:text-[3.08rem] lg:leading-[1.04] xl:text-[3.18rem]">
              <span className="nite-metal-text">
                Tecnologia aplicada, aprendizagem e projetos em evolução.
              </span>
            </h1>
            <p className="mx-auto max-w-[36rem] text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8 lg:mx-0 lg:text-xl">
              O NITE conecta estudantes, professores e desafios institucionais
              em um portal para acompanhar frentes, oportunidades e movimentos
              do núcleo com contexto e transparência.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              href="/projetos"
              className={cn(
                buttonVariants({ variant: "primary", size: "lg" }),
                "w-full rounded-md sm:w-fit",
              )}
            >
              Explorar projetos
              <ArrowRightIcon data-icon="inline-end" />
            </Link>
            <Link
              href="#sobre"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "w-full rounded-md sm:w-fit",
              )}
            >
              Conhecer o NITE
            </Link>
          </div>
        </Reveal>

        <div
          className="relative isolate order-1 flex min-h-[10rem] items-center justify-center overflow-visible sm:order-none sm:min-h-[24rem] lg:min-h-[35rem]"
          data-hero-visual=""
        >
          <div
            aria-hidden="true"
            className="nite-hero-glow pointer-events-none absolute inset-x-[2%] top-[12%] z-0 h-[62%] blur-3xl"
          />
          <div
            aria-hidden="true"
            className="nite-surface-glow pointer-events-none absolute inset-x-[12%] top-[24%] z-0 h-[44%] opacity-70 blur-xl"
          />
          <AnimatedNiteLogo className="relative z-10 w-full max-w-[8rem] min-[430px]:max-w-[9.5rem] sm:max-w-[20rem] lg:max-w-[20rem] xl:max-w-[21.5rem]" />
        </div>
      </Container>
    </section>
  );
}
