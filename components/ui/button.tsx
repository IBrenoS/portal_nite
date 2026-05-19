import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-transparent bg-clip-padding text-sm font-semibold whitespace-nowrap transition-colors outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-px disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-55 disabled:saturate-50 aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:opacity-55 aria-disabled:saturate-50 data-[loading=true]:cursor-wait data-[loading=true]:after:ms-2 data-[loading=true]:after:inline-block data-[loading=true]:after:size-1.5 data-[loading=true]:after:rounded-full data-[loading=true]:after:bg-current data-[loading=true]:after:content-[''] aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-[var(--primary-foreground)] shadow-[0_0_24px_var(--brand-glow)] hover:bg-primary/90 active:bg-primary/85",
        primary:
          "bg-primary text-[var(--primary-foreground)] shadow-[0_0_24px_var(--brand-glow)] hover:bg-primary/90 active:bg-primary/85",
        outline:
          "border-border bg-transparent text-foreground hover:bg-accent hover:text-foreground aria-expanded:bg-accent aria-expanded:text-foreground",
        secondary:
          "border-border bg-card text-card-foreground hover:bg-secondary aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "bg-transparent text-foreground hover:bg-accent hover:text-foreground aria-expanded:bg-accent aria-expanded:text-foreground",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "h-auto min-h-0 rounded-sm bg-transparent px-0 py-0 text-primary underline-offset-4 shadow-none hover:underline active:translate-y-0",
      },
      size: {
        default: "min-h-10 px-4 py-2",
        md: "min-h-10 px-4 py-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "min-h-9 px-3 py-1.5 text-sm in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3.5",
        lg: "min-h-11 px-5 py-2.5 text-base",
        icon: "size-10 p-0",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonProps = Omit<ButtonPrimitive.Props, "className"> &
  VariantProps<typeof buttonVariants> & {
    className?: string;
    loading?: boolean;
  };

function Button({
  className,
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <ButtonPrimitive
      data-slot="button"
      data-loading={loading ? "true" : undefined}
      aria-busy={loading || undefined}
      disabled={isDisabled}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
export type { ButtonProps };
