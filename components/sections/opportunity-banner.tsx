import { ArrowRightIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import {
  OpportunityStatus,
  opportunityStatusConfig,
  type OpportunityStatusValue,
} from "@/components/sections/opportunity-status";
import { statusBadgeToneClasses } from "@/components/ui/status-badge";
import { cn } from "@/lib/utils";

type OpportunityBannerStatus = OpportunityStatusValue;
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
  const config = opportunityStatusConfig[status];
  const Heading = headingLevel;
  const Icon = config.Icon;

  return (
    <Card
      data-component="opportunity-banner"
      data-status={status}
      className={className}
    >
      <CardHeader className="gap-4 p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <span
            className={cn(
              "inline-flex size-11 shrink-0 items-center justify-center rounded-md border",
              statusBadgeToneClasses[config.tone].soft,
            )}
            aria-hidden="true"
          >
            <Icon />
          </span>

          <div className="grid gap-3">
            <OpportunityStatus status={status} />
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
