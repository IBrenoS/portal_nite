import {
  ArrowRightIcon,
  BellIcon,
  CheckCircle2Icon,
  InfoIcon,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type OpportunityBannerStatus = "closed" | "open" | "info";
type OpportunityBannerHeadingLevel = "h2" | "h3" | "h4";

type OpportunityBannerProps = {
  status?: OpportunityBannerStatus;
  title: string;
  description?: string;
  note?: string;
  cta?: {
    label: string;
    href: string;
  };
  headingLevel?: OpportunityBannerHeadingLevel;
  titleId?: string;
  className?: string;
};

const statusConfig = {
  closed: {
    label: "Sem oportunidades abertas",
    Icon: BellIcon,
    iconClassName:
      "border-brand-circuit-bright/30 bg-brand-circuit-bright/10 text-brand-circuit-bright",
    statusClassName:
      "border-brand-circuit-bright/30 bg-brand-circuit-bright/10 text-brand-circuit-bright",
  },
  open: {
    label: "Processo aberto",
    Icon: CheckCircle2Icon,
    iconClassName: "border-status-done/30 bg-status-done/10 text-status-done",
    statusClassName: "border-status-done/30 bg-status-done/10 text-status-done",
  },
  info: {
    label: "Informativo",
    Icon: InfoIcon,
    iconClassName: "border-border bg-muted/40 text-muted-foreground",
    statusClassName: "border-border bg-muted/40 text-muted-foreground",
  },
} satisfies Record<
  OpportunityBannerStatus,
  {
    label: string;
    Icon: typeof BellIcon;
    iconClassName: string;
    statusClassName: string;
  }
>;

export function OpportunityBanner({
  status = "closed",
  title,
  description,
  note,
  cta,
  headingLevel = "h2",
  titleId,
  className,
}: OpportunityBannerProps) {
  const config = statusConfig[status];
  const Heading = headingLevel;
  const Icon = config.Icon;

  return (
    <Card
      data-component="opportunity-banner"
      data-status={status}
      className={cn("border-border bg-card", className)}
    >
      <CardHeader className="gap-4 p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <span
            className={cn(
              "inline-flex size-11 shrink-0 items-center justify-center rounded-md border",
              config.iconClassName,
            )}
            aria-hidden="true"
          >
            <Icon />
          </span>

          <div className="grid gap-3">
            <span
              data-slot="opportunity-banner-status"
              className={cn(
                "w-fit rounded-full border px-3 py-1 font-mono text-xs font-medium uppercase tracking-[0.14em]",
                config.statusClassName,
              )}
            >
              {config.label}
            </span>
            <div className="grid gap-2">
              <CardTitle>
                <Heading
                  id={titleId}
                  className="font-heading text-2xl font-semibold text-foreground"
                >
                  {title}
                </Heading>
              </CardTitle>
              {description ? (
                <CardDescription className="text-base leading-7">
                  {description}
                </CardDescription>
              ) : null}
            </div>
          </div>
        </div>
      </CardHeader>

      {note || cta ? (
        <CardContent className="grid gap-5 px-6 pb-6 sm:px-8 sm:pb-8">
          {note ? (
            <p className="rounded-lg border border-border bg-muted/40 p-4 text-sm leading-7 text-muted-foreground">
              {note}
            </p>
          ) : null}

          {cta ? (
            <div>
              <a
                href={cta.href}
                className={cn(
                  buttonVariants({ variant: "primary", size: "lg" }),
                  "rounded-md",
                )}
              >
                {cta.label}
                <ArrowRightIcon data-icon="inline-end" aria-hidden="true" />
              </a>
            </div>
          ) : null}
        </CardContent>
      ) : null}
    </Card>
  );
}

export type {
  OpportunityBannerHeadingLevel,
  OpportunityBannerProps,
  OpportunityBannerStatus,
};
