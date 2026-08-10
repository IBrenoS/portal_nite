import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";

import type { NewsArticle } from "@nite/content";
import { cn } from "@/lib/utils";

const categoryLabels: Record<NewsArticle["category"], string> = {
  agenda: "Agenda",
  comunidade: "Comunidade",
  projetos: "Projetos",
  inovacao: "Inovação",
  cultura: "Cultura",
  tecnologia: "Tecnologia",
};

type NewsCardLayout = "lead" | "standard" | "compact";

type NewsCardProps = {
  article: NewsArticle;
  layout?: NewsCardLayout;
  headingLevel?: 2 | 3;
  className?: string;
};

function formatEditorialDate(value: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  })
    .format(new Date(`${value}T00:00:00Z`))
    .replaceAll(".", "")
    .toUpperCase();
}

export function NewsCard({
  article,
  layout = "standard",
  headingLevel,
  className,
}: NewsCardProps) {
  const isLead = layout === "lead";
  const isCompact = layout === "compact";
  const Heading = (headingLevel ?? (isLead ? 2 : 3)) === 2 ? "h2" : "h3";
  const metadataDate = article.eventDate ?? article.publishedAt;
  const metadataSuffix = article.eventDate
    ? "AGENDA"
    : `${article.readTimeMinutes} MIN`;

  return (
    <Link
      href={`/atualizacoes/${article.slug}` as Route}
      className={cn(
        "group block rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        className,
      )}
      data-news-layout={layout}
    >
      <article
        className={cn(
          "h-full overflow-hidden rounded-xl border border-nite-border-subtle bg-nite-surface transition-colors group-hover:border-nite-border-hover group-focus-visible:border-nite-border-hover",
          isLead
            ? "grid min-h-[30rem] lg:grid-cols-[1.15fr_0.85fr]"
            : isCompact
              ? "grid min-h-40 grid-cols-[8.5rem_1fr] sm:grid-cols-[9.5rem_1fr]"
              : "flex flex-col",
        )}
      >
        <div
          className={cn(
            "relative overflow-hidden bg-nite-section",
            isLead
              ? "min-h-64 lg:min-h-[30rem]"
              : isCompact
                ? "min-h-40"
                : "aspect-[296/188]",
          )}
        >
          <Image
            src={article.cover.src}
            alt={article.cover.alt}
            fill
            preload={isLead}
            sizes={
              isLead
                ? "(min-width: 1024px) 56vw, 100vw"
                : isCompact
                  ? "152px"
                  : "(min-width: 1024px) 296px, 100vw"
            }
            className="object-cover transition-transform duration-300 ease-out motion-reduce:transition-none group-hover:scale-[1.015] motion-reduce:group-hover:scale-100"
          />
        </div>

        <div
          className={cn(
            "flex min-w-0 flex-col",
            isLead
              ? "justify-center gap-4 p-6 sm:p-8 lg:p-10"
              : isCompact
                ? "justify-center gap-2 p-4"
                : "gap-3 p-5 sm:p-6",
          )}
        >
          <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-nite-brand-accent">
            {categoryLabels[article.category]}
          </p>
          <Heading
            className={cn(
              "text-balance font-heading font-semibold text-nite-text-primary",
              isLead
                ? "text-[clamp(2rem,4vw,3rem)] leading-[1.1]"
                : "text-xl leading-7",
              isCompact && "line-clamp-2 text-lg leading-6 sm:text-xl",
            )}
          >
            {article.title}
          </Heading>
          {isCompact ? null : (
            <p
              className={cn(
                "text-pretty text-sm leading-6 text-nite-text-secondary",
                !isLead && "line-clamp-3",
              )}
            >
              {article.summary}
            </p>
          )}
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.055em] text-nite-text-muted">
            {formatEditorialDate(metadataDate)} · {metadataSuffix}
          </p>
          {isLead ? (
            <span className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-nite-brand-accent">
              Ler matéria <span aria-hidden="true">→</span>
            </span>
          ) : null}
        </div>
      </article>
    </Link>
  );
}

export { categoryLabels, formatEditorialDate };
