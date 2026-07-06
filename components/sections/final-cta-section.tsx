import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { NiteFinalWordmark } from "@/components/sections/nite-final-wordmark";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function FinalCtaSection() {
  return (
    <section
      id="contato"
      className="relative overflow-hidden bg-nite-background pb-24 pt-24 text-nite-text-primary sm:pb-0 sm:pt-28 lg:pt-36"
      data-surface="clean"
      data-testid="final-cta-section"
    >
      <Container size="xl" className="relative text-center">
        <h2 className="mx-auto max-w-5xl pb-3 font-heading text-5xl font-semibold leading-none sm:text-6xl lg:text-7xl">
          <span className="text-nite-text-primary">
            NITE em evolução.
            <br />
            Disponível para construir.
          </span>
        </h2>

        <div className="mx-auto mt-8 flex max-w-sm flex-col justify-center gap-3 sm:max-w-none sm:flex-row sm:gap-4">
          <Link
            href="/projetos"
            className={cn(
              buttonVariants({ variant: "primary", size: "lg" }),
              "group h-12 rounded-2xl",
            )}
          >
            Explorar projetos
            <ChevronRightIcon className="size-3.5 text-nite-text-muted transition-colors group-hover:text-nite-action-hover-text/55" />
          </Link>
          <Link
            href="/contato"
            className={cn(
              buttonVariants({ variant: "ghost", size: "lg" }),
              "group h-12 rounded-2xl text-nite-text-secondary",
            )}
          >
            Falar com o NITE
            <ChevronRightIcon className="size-3.5 text-nite-text-muted transition-colors group-hover:text-nite-text-primary/75" />
          </Link>
        </div>
      </Container>

      <div className="mt-20 sm:mt-24 lg:mt-28" data-wordmark-stage="">
        <Container size="xl">
          <NiteFinalWordmark />
        </Container>
      </div>
    </section>
  );
}
