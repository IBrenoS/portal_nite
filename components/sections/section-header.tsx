import type * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const sectionHeaderVariants = cva("flex max-w-3xl flex-col gap-3", {
  variants: {
    align: {
      left: "items-start text-left",
      center: "mx-auto items-center text-center",
    },
  },
  defaultVariants: {
    align: "left",
  },
});

type SectionHeadingLevel = "h1" | "h2" | "h3";

type SectionHeaderProps = VariantProps<typeof sectionHeaderVariants> & {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  as?: SectionHeadingLevel;
  actions?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  as = "h2",
  actions,
  children,
  className,
}: SectionHeaderProps) {
  const Heading = as;
  const actionContent = actions ?? children;

  return (
    <div className={cn(sectionHeaderVariants({ align }), className)}>
      {eyebrow ? (
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-nite-brand-accent">
          {eyebrow}
        </p>
      ) : null}
      <Heading className="font-heading text-3xl leading-tight font-normal text-foreground sm:text-4xl">
        {title}
      </Heading>
      {description ? (
        <p className="max-w-2xl text-base leading-7 text-muted-foreground">
          {description}
        </p>
      ) : null}
      {actionContent ? (
        <div className="flex flex-wrap items-center gap-3 pt-2">
          {actionContent}
        </div>
      ) : null}
    </div>
  );
}

export type { SectionHeaderProps };
