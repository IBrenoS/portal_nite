import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const statusBadgeLabels = {
  draft: "Em estruturação",
  progress: "Em progresso",
  in_progress: "Em andamento",
  validated: "Validado",
  done: "Finalizado",
  warning: "Atenção",
  error: "Erro",
  archived: "Arquivado",
} as const;

type StatusBadgeStatus = keyof typeof statusBadgeLabels;

const statusBadgeVariants = cva(
  "inline-flex min-h-6 w-fit shrink-0 items-center gap-1.5 rounded-full border px-2 py-1 text-xs leading-none font-medium whitespace-nowrap transition-colors",
  {
    variants: {
      size: {
        sm: "min-h-6 px-2 py-1 text-xs",
        md: "min-h-7 px-2.5 py-1 text-xs",
      },
      variant: {
        soft: "",
        outline: "bg-transparent",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "soft",
    },
  },
);

const statusBadgeToneClasses = {
  draft: {
    soft: "border-status-draft/35 bg-status-draft/10 text-status-draft",
    outline: "border-status-draft/55 text-status-draft",
  },
  progress: {
    soft: "border-status-progress/35 bg-status-progress/10 text-status-progress",
    outline: "border-status-progress/55 text-status-progress",
  },
  in_progress: {
    soft: "border-status-progress/35 bg-status-progress/10 text-status-progress",
    outline: "border-status-progress/55 text-status-progress",
  },
  validated: {
    soft: "border-status-validated/35 bg-status-validated/10 text-status-validated",
    outline: "border-status-validated/55 text-status-validated",
  },
  done: {
    soft: "border-status-done/35 bg-status-done/10 text-status-done",
    outline: "border-status-done/55 text-status-done",
  },
  warning: {
    soft: "border-status-warning/40 bg-status-warning/10 text-status-warning",
    outline: "border-status-warning/60 text-status-warning",
  },
  error: {
    soft: "border-status-error/40 bg-status-error/10 text-status-error",
    outline: "border-status-error/60 text-status-error",
  },
  archived: {
    soft: "border-status-draft/30 bg-status-draft/10 text-status-draft",
    outline: "border-status-draft/50 text-status-draft",
  },
} satisfies Record<
  StatusBadgeStatus,
  Record<
    NonNullable<VariantProps<typeof statusBadgeVariants>["variant"]>,
    string
  >
>;

type StatusBadgeProps = Omit<
  ComponentPropsWithoutRef<"span">,
  "children" | "color"
> &
  VariantProps<typeof statusBadgeVariants> & {
    status: StatusBadgeStatus;
    label?: ReactNode;
    icon?: ReactNode;
  };

function StatusBadge({
  status,
  label,
  icon,
  size = "md",
  variant = "soft",
  className,
  ...props
}: StatusBadgeProps) {
  const fallbackLabel = statusBadgeLabels[status];
  const visibleLabel =
    typeof label === "string" && label.trim().length === 0
      ? fallbackLabel
      : (label ?? fallbackLabel);

  return (
    <span
      data-slot="status-badge"
      data-status={status}
      data-variant={variant}
      className={cn(
        statusBadgeVariants({ size, variant }),
        statusBadgeToneClasses[status][variant ?? "soft"],
        className,
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className="inline-flex shrink-0 items-center justify-center [&_svg]:size-3.5 [&_svg]:shrink-0"
      >
        {icon ?? <span className="size-1.5 rounded-full bg-current" />}
      </span>
      <span>{visibleLabel}</span>
    </span>
  );
}

export { StatusBadge, statusBadgeLabels, statusBadgeVariants };
export type { StatusBadgeProps, StatusBadgeStatus };
