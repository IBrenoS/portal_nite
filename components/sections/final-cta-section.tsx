import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { NiteFinalWordmark } from "@/components/sections/nite-final-wordmark";

export function FinalCtaSection() {
  return (
    <section
      id="contato"
      className="relative overflow-hidden bg-black pt-16 text-white sm:pt-24 lg:pt-28"
      data-surface="clean"
      data-testid="final-cta-section"
    >
      <Container size="xl" className="relative text-center">
        <h2 className="mx-auto max-w-5xl pb-3 font-heading text-5xl font-semibold leading-none sm:text-6xl lg:text-7xl">
          <span className="bg-[linear-gradient(to_right_bottom,rgb(255_255_255)_30%,rgb(255_255_255_/_0.52))] bg-clip-text text-transparent">
            NITE em evolução.
            <br />
            Disponível para construir.
          </span>
        </h2>

        <div className="mx-auto mt-8 flex max-w-sm flex-col justify-center gap-3 sm:max-w-none sm:flex-row sm:gap-4">
          <Link
            href="/projetos"
            className="group inline-flex h-12 items-center justify-center gap-2 rounded-2xl border-2 border-white/5 bg-[linear-gradient(104deg,rgb(253_253_253_/_0.06)_5%,rgb(240_240_228_/_0.12)_100%)] px-5 text-base font-semibold text-white shadow-sm backdrop-blur-2xl transition-all duration-200 hover:bg-white/90 hover:text-black hover:shadow-[0_0_28px_rgb(255_255_255_/_0.16)] focus-visible:bg-white/90 focus-visible:text-black focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30"
          >
            Explorar projetos
            <ChevronRightIcon className="size-3.5 text-white/45 transition-colors group-hover:text-black/55" />
          </Link>
          <Link
            href="/contato"
            className="group inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-transparent bg-transparent px-5 text-base font-semibold text-white/58 transition-colors duration-200 hover:text-white focus-visible:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/15"
          >
            Falar com o NITE
            <ChevronRightIcon className="size-3.5 text-white/38 transition-colors group-hover:text-white/75" />
          </Link>
        </div>

        <NiteFinalWordmark className="mt-16 sm:mt-20" />
      </Container>
    </section>
  );
}
