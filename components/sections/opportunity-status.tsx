import type { ComponentPropsWithoutRef } from "react";
import {
  ArchiveIcon,
  BellIcon,
  CheckCircle2Icon,
  Clock3Icon,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

const opportunityStatusLabels = {
  closed: "Sem oportunidades abertas",
  open: "Processo aberto",
  draft: "Em preparação",
  archived: "Encerrado",
} as const;

type OpportunityStatusValue = keyof typeof opportunityStatusLabels;

const opportunityStatusConfig = {
  closed: {
    Icon: BellIcon,
    className:
      "border-brand-circuit-bright/35 bg-brand-circuit-bright/10 text-brand-circuit-bright",
  },
  open: {
    Icon: CheckCircle2Icon,
    className: "border-status-done/35 bg-status-done/10 text-status-done",
  },
  draft: {
    Icon: Clock3Icon,
    className:
      "border-status-warning/40 bg-status-warning/10 text-status-warning",
  },
  archived: {
    Icon: ArchiveIcon,
    className: "border-status-draft/35 bg-status-draft/10 text-status-draft",
  },
} satisfies Record<
  OpportunityStatusValue,
  {
    Icon: LucideIcon;
    className: string;
  }
>;

type OpportunityStatusProps = Omit<
  ComponentPropsWithoutRef<"span">,
  "children" | "color"
> & {
  status: OpportunityStatusValue;
  label?: string;
  showIcon?: boolean;
};

function OpportunityStatus({
  status,
  label,
  showIcon = true,
  className,
  ...props
}: OpportunityStatusProps) {
  const config = opportunityStatusConfig[status];
  const visibleLabel = label?.trim() || opportunityStatusLabels[status];
  const Icon = config.Icon;

  return (
    <span
      data-slot="opportunity-status"
      data-status={status}
      aria-label={`Status da oportunidade: ${visibleLabel}`}
      className={cn(
        "inline-flex min-h-7 max-w-full items-center gap-1.5 rounded-full border px-3 py-1 text-left text-sm leading-5 font-medium",
        "w-fit",
        config.className,
        className,
      )}
      {...props}
    >
      {showIcon ? (
        <span
          aria-hidden="true"
          className="inline-flex shrink-0 items-center justify-center [&_svg]:size-3.5 [&_svg]:shrink-0"
        >
          <Icon />
        </span>
      ) : null}
      <span className="min-w-0 break-words">{visibleLabel}</span>
    </span>
  );
}

export { OpportunityStatus, opportunityStatusLabels };
export type { OpportunityStatusProps, OpportunityStatusValue };
