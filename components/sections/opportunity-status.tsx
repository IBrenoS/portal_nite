import type { ComponentPropsWithoutRef } from "react";
import {
  ArchiveIcon,
  BellIcon,
  CheckCircle2Icon,
  Clock3Icon,
  type LucideIcon,
} from "lucide-react";

import {
  StatusBadge,
  type StatusBadgeStatus,
  type StatusBadgeTone,
} from "@/components/ui/status-badge";
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
    badgeStatus: "progress",
    tone: "brand",
  },
  open: {
    Icon: CheckCircle2Icon,
    badgeStatus: "done",
    tone: "done",
  },
  draft: {
    Icon: Clock3Icon,
    badgeStatus: "warning",
    tone: "warning",
  },
  archived: {
    Icon: ArchiveIcon,
    badgeStatus: "archived",
    tone: "draft",
  },
} satisfies Record<
  OpportunityStatusValue,
  {
    Icon: LucideIcon;
    badgeStatus: StatusBadgeStatus;
    tone: StatusBadgeTone;
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
    <StatusBadge
      data-slot="opportunity-status"
      data-status={status}
      aria-label={`Status da oportunidade: ${visibleLabel}`}
      status={config.badgeStatus}
      tone={config.tone}
      label={visibleLabel}
      icon={showIcon ? <Icon /> : undefined}
      showIndicator={showIcon}
      size="lg"
      className={cn(
        "max-w-full whitespace-normal text-left [&_[data-slot=status-badge-label]]:break-words",
        className,
      )}
      {...props}
    />
  );
}

export {
  OpportunityStatus,
  opportunityStatusConfig,
  opportunityStatusLabels,
};
export type { OpportunityStatusProps, OpportunityStatusValue };
