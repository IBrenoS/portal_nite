import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArchiveIcon,
  ArrowRightIcon,
  CalendarDaysIcon,
  CheckCircle2Icon,
  Clock3Icon,
  LinkIcon,
} from "lucide-react";

import type { TimelineEvent } from "@/biblioteca/esquemas";
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import {
  DomainCardCta,
  DomainCardRoot,
  MetadataPanel,
} from "@/components/ui/domain-card";
import {
  StatusBadge,
  type StatusBadgeStatus,
  type StatusBadgeTone,
} from "@/components/ui/status-badge";
import { cn } from "@/lib/utils";

type TimelineItemStatus = "planned" | "validated" | "archived";
type TimelineItemHeadingLevel = "h2" | "h3" | "h4";

type TimelineItemBaseProps = {
  title: string;
  description?: string;
  dateLabel?: string;
  category?: string;
  status?: TimelineItemStatus;
  href?: Route | string;
  headingLevel?: TimelineItemHeadingLevel;
  className?: string;
};

type TimelineItemLegacyProps = {
  event: TimelineEvent;
  className?: string;
};

type TimelineItemProps = TimelineItemBaseProps | TimelineItemLegacyProps;

const timelineStatusConfig = {
  planned: {
    label: "Planejado",
    Icon: Clock3Icon,
    badgeStatus: "draft",
    tone: "quiet",
  },
  validated: {
    label: "Validado",
    Icon: CheckCircle2Icon,
    badgeStatus: "validated",
    tone: "done",
  },
  archived: {
    label: "Arquivado",
    Icon: ArchiveIcon,
    badgeStatus: "archived",
    tone: "quiet",
  },
} satisfies Record<
  TimelineItemStatus,
  {
    label: string;
    Icon: typeof Clock3Icon;
    badgeStatus: StatusBadgeStatus;
    tone: StatusBadgeTone;
  }
>;

function TimelineItem(props: TimelineItemProps) {
  if ("event" in props) {
    return (
      <LegacyTimelineItem event={props.event} className={props.className} />
    );
  }

  return <StructuredTimelineItem {...props} />;
}

function StructuredTimelineItem({
  title,
  description,
  dateLabel,
  category,
  status,
  href,
  headingLevel = "h3",
  className,
}: TimelineItemBaseProps) {
  const Heading = headingLevel;
  const statusConfig = status ? timelineStatusConfig[status] : null;
  const StatusIcon = statusConfig?.Icon;

  return (
    <DomainCardRoot
      component="timeline-item"
      href={href}
      status={status ?? "none"}
      className={className}
    >
      <CardHeader className="gap-4 p-5 sm:p-6">
        <div className="flex gap-4">
          <span
            className="mt-1 inline-flex size-4 shrink-0 rounded-full border border-nite-brand-accent bg-background shadow-[0_0_20px_var(--nite-brand-glow)]"
            aria-hidden="true"
          />

          <div className="grid min-w-0 flex-1 gap-3">
            <div className="flex flex-wrap gap-2">
              {dateLabel ? (
                <span
                  data-slot="timeline-item-date"
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/40 px-3 py-1 font-mono text-[0.68rem] font-medium uppercase tracking-[0.14em] text-muted-foreground"
                >
                  <CalendarDaysIcon className="size-3" aria-hidden="true" />
                  {dateLabel}
                </span>
              ) : null}

              {category ? (
                <span
                  data-slot="timeline-item-category"
                  className="rounded-full border border-border bg-muted/40 px-3 py-1 font-mono text-[0.68rem] font-medium uppercase tracking-[0.14em] text-muted-foreground"
                >
                  {category}
                </span>
              ) : null}

              {statusConfig && StatusIcon ? (
                <StatusBadge
                  data-slot="timeline-item-status"
                  status={statusConfig.badgeStatus}
                  tone={statusConfig.tone}
                  label={statusConfig.label}
                  icon={<StatusIcon />}
                  size="lg"
                  className={cn(
                    "font-mono text-[0.68rem] uppercase tracking-[0.14em]",
                  )}
                />
              ) : null}
            </div>

            <CardTitle>
              <Heading className="font-heading text-xl font-semibold leading-snug text-foreground">
                {title}
              </Heading>
            </CardTitle>
          </div>
        </div>
      </CardHeader>

      <CardContent className="grid gap-4 px-5 pb-5 sm:px-6 sm:pb-6">
        {description ? (
          <p className="text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        ) : (
          <p className="text-sm leading-6 text-muted-foreground">
            Descrição pendente de validação pública.
          </p>
        )}

        {!href ? (
          <MetadataPanel
            data-slot="timeline-item-evidence-fallback"
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-border bg-background/42 px-3 py-2 text-xs leading-5 text-muted-foreground"
          >
            <LinkIcon className="size-3.5" aria-hidden="true" />
            Evidência pública ainda não vinculada.
          </MetadataPanel>
        ) : null}
      </CardContent>

      {href ? (
        <CardFooter>
          <DomainCardCta>Abrir registro</DomainCardCta>
        </CardFooter>
      ) : null}
    </DomainCardRoot>
  );
}

function LegacyTimelineItem({
  event,
  className,
}: {
  event: TimelineEvent;
  className?: string;
}) {
  const projectHref = event.projectSlug
    ? (`/projetos/${event.projectSlug}` as Route)
    : undefined;

  return (
    <article
      className={cn(
        "relative border-l border-border pb-6 pl-5 last:pb-0 sm:pl-7",
        className,
      )}
    >
      <span className="absolute -left-[7px] top-5 size-3.5 rounded-full border border-nite-brand-accent bg-background shadow-[0_0_22px_var(--nite-brand-glow)]" />
      <div className="nite-panel overflow-hidden rounded-lg border border-border">
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
              <div className="h-full min-h-52 bg-muted" />
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
            </div>

            <div className="grid gap-3">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-nite-brand-accent">
                Marco {String(event.sequence).padStart(2, "0")}
              </p>
              <h3 className="font-heading text-xl font-semibold leading-tight text-foreground">
                {event.title}
              </h3>
              <p className="text-sm leading-6 text-muted-foreground">
                {event.description}
              </p>
            </div>

            {projectHref ? (
              <Link
                href={projectHref}
                aria-label={`Ver projeto relacionado: ${event.title}`}
                className="inline-flex min-h-11 w-fit items-center gap-2 rounded-md text-sm font-semibold text-nite-brand-accent transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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

export { TimelineItem, timelineStatusConfig };
export type {
  TimelineItemBaseProps,
  TimelineItemHeadingLevel,
  TimelineItemLegacyProps,
  TimelineItemProps,
  TimelineItemStatus,
};
