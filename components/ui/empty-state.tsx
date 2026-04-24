import { CircleDashedIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type EmptyStateProps = {
  title: string;
  description: string;
  className?: string;
};

export function EmptyState({ title, description, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "brand-panel flex flex-col gap-3 rounded-lg border border-border p-5 text-sm text-muted-foreground",
        className,
      )}
    >
      <CircleDashedIcon className="text-brand-circuit-bright" aria-hidden="true" />
      <p className="font-heading text-base font-semibold text-foreground">{title}</p>
      <p className="leading-6">{description}</p>
    </div>
  );
}
