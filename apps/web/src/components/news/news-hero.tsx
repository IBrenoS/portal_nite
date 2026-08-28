import type { NewsArticle, NewsFilter } from "@nite/content/public";
import Image from "next/image";

import { NewsCard } from "@/components/news/news-card";
import { NewsSignalCanvas } from "@/components/news/news-signal-canvas";

type NewsHeroProps = {
  activeFilter: NewsFilter;
  leadArticle?: NewsArticle;
};

export function NewsHero({ leadArticle }: NewsHeroProps) {
  return (
    <section className="relative isolate">
      <div
        className="relative flex h-[90vh] max-h-[42rem] w-full max-w-full flex-col items-center overflow-hidden md:h-[calc(100vh-3.75rem)] md:max-h-none"
        data-testid="news-hero-stage"
      >
        <NewsSignalCanvas className="z-0" />
        <Image
          src="/images/projetos/projects-hero-light.png"
          alt=""
          aria-hidden="true"
          width={963}
          height={1019}
          quality={100}
          preload
          className="newsHeroHaloPlacement z-[1] hidden select-none dark:block"
          data-testid="news-hero-light-bloom"
        />
        <div
          aria-hidden="true"
          className="newsHeroSignalField absolute inset-y-0 left-1/2 z-[2] hidden w-full -translate-x-1/2 dark:block md:w-[70vw]"
          data-testid="news-hero-signal-field"
        />
        <div
          aria-hidden="true"
          className="newsHeroHaloPlacement newsHeroLightMask z-[2] dark:hidden"
          data-testid="news-hero-light-mask"
        />
        <div
          aria-hidden="true"
          className="newsHeroNoise pointer-events-none absolute inset-0 z-[3] hidden dark:block"
          data-testid="news-hero-noise"
        />

        <div
          className="newsHeroCopy absolute left-1/2 z-10 flex w-[calc(100%-2.5rem)] max-w-3xl -translate-x-1/2 flex-col items-center text-center"
          data-testid="news-hero-copy"
        >
          <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-nite-text-secondary">
            Bem-vindo ao Nite News
          </p>
          <h1 className="mt-4 text-balance font-heading text-[clamp(3rem,8vw,4.75rem)] font-semibold leading-[0.98] tracking-[-0.025em] text-nite-text-primary">
            Nite News
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-7 text-nite-text-secondary sm:text-lg sm:leading-8">
            Informação para acompanhar a universidade, descobrir eventos e
            participar da comunidade.
          </p>
        </div>
      </div>

      {leadArticle ? (
        <div
          className="relative z-10 mx-auto -mt-24 w-[90%] max-w-[72rem] md:-mt-[140px]"
          data-testid="news-hero-lead"
        >
          <NewsCard article={leadArticle} layout="lead" />
        </div>
      ) : null}
    </section>
  );
}
