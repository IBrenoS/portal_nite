import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ArrowRightIcon, ImageOffIcon } from "lucide-react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type DomainCardRootProps = {
  children: ReactNode;
  className?: string;
  component: string;
  href?: string;
  status?: string;
};

function DomainCardRoot({
  children,
  className,
  component,
  href,
  status,
}: DomainCardRootProps) {
  const sharedProps = {
    "data-component": component,
    "data-status": status,
    className: cn("min-h-full rounded-lg py-0", className),
    children,
  };

  if (href) {
    return <Card as="a" href={href} variant="interactive" {...sharedProps} />;
  }

  return <Card {...sharedProps} />;
}

function DomainCardCta({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex min-h-11 items-center gap-2 rounded-md text-sm font-semibold text-nite-brand-accent transition-colors group-hover/card:text-foreground",
        className,
      )}
    >
      {children}
      <ArrowRightIcon className="size-4" aria-hidden="true" />
    </span>
  );
}

function DomainCardMediaFallback({
  children,
  slot,
}: {
  children: ReactNode;
  slot?: string;
}) {
  return (
    <div
      data-slot={slot}
      className="grid aspect-[16/9] place-items-center border-b border-border bg-muted/70 p-5 text-center"
    >
      <div className="grid justify-items-center gap-3">
        <span
          className="inline-flex size-11 items-center justify-center rounded-md border border-border bg-card text-muted-foreground"
          aria-hidden="true"
        >
          <ImageOffIcon className="size-5" />
        </span>
        <p className="max-w-xs text-sm leading-6 text-muted-foreground">
          {children}
        </p>
      </div>
    </div>
  );
}

function MetadataPanel({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-background/42 p-3",
        className,
      )}
      {...props}
    />
  );
}

export {
  DomainCardCta,
  DomainCardMediaFallback,
  DomainCardRoot,
  MetadataPanel,
};
