import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const chipVariants = cva(
  "inline-flex min-h-7 w-fit items-center rounded-full border px-3 py-1 font-mono text-xs uppercase tracking-[0.14em]",
  {
    variants: {
      variant: {
        default: "border-brand-circuit-bright/40 bg-brand-circuit-bright/10 text-brand-circuit-bright",
        quiet: "border-border bg-muted text-muted-foreground",
        metal: "border-brand-metal/40 bg-brand-metal/10 text-brand-metal",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type ChipProps = React.ComponentPropsWithoutRef<"span"> & VariantProps<typeof chipVariants>;

export function Chip({ className, variant, ...props }: ChipProps) {
  return <span className={cn(chipVariants({ variant, className }))} {...props} />;
}
