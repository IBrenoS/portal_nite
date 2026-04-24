import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import type { TimelineEvent } from "@/biblioteca/esquemas";
import { Chip } from "@/components/ui/chip";
import { cn } from "@/lib/utils";

type TimelineItemProps = {
  event: TimelineEvent;
  className?: string;
};

export function TimelineItem({ event, className }: TimelineItemProps) {
  const projectHref = event.projectSlug ? (`/projetos/${event.projectSlug}` as Route) : undefined;

  return (
    <article className={cn("relative border-l border-border pb-6 pl-5 last:pb-0 sm:pl-7", className)}>
      <span className="absolute -left-[7px] top-5 size-3.5 rounded-full border border-brand-circuit-bright bg-background shadow-[0_0_22px_rgb(51_212_255_/_0.6)]" />
      <div className="brand-panel overflow-hidden rounded-lg border border-border">
        <div className="grid gap-0 md:grid-cols-[minmax(0,0.82fr)_minmax(0,1fr)]">
          <div className="relative min-h-52 overflow-hidden border-b border-border md:min-h-full md:border-b-0 md:border-r">
            {event.image ? (
              <Image
                src={event.image}
                alt={event.alt ?? ""}
                fill
                sizes="(max-width: 768px) 100vw, 360px"
                className="object-cover"
              />
            ) : (
              <div className="brand-circuit-lines h-full min-h-52 bg-muted" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background/75 via-background/10 to-transparent" />
            <Chip variant="metal" className="absolute bottom-3 left-3">
              {event.year}
            </Chip>
          </div>

          <div className="grid gap-4 p-5 sm:p-6">
            <div className="flex flex-wrap gap-2">
              {event.category ? <Chip>{event.category}</Chip> : null}
              {event.month ? <Chip variant="quiet">{event.month}</Chip> : null}
              {event.sourceStatus === "placeholder" ? <Chip variant="metal">Demonstrativo</Chip> : null}
            </div>

            <div className="grid gap-3">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-circuit-bright">
                Marco {String(event.sequence).padStart(2, "0")}
              </p>
              <h3 className="font-heading text-xl font-semibold leading-tight text-foreground">{event.title}</h3>
              <p className="text-sm leading-6 text-muted-foreground">{event.description}</p>
            </div>

            {event.contentNotice ? (
              <p className="rounded-md border border-border bg-muted/45 p-3 text-xs leading-5 text-muted-foreground">
                {event.contentNotice}
              </p>
            ) : null}

            {projectHref ? (
              <Link
                href={projectHref}
                aria-label={`Ver projeto relacionado: ${event.title}`}
                className="inline-flex min-h-11 w-fit items-center gap-2 rounded-md text-sm font-semibold text-brand-circuit-bright transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Ver projeto relacionado
                <ArrowRightIcon aria-hidden="true" />
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
