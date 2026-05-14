import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const cardVariants = cva(
  "group/card flex flex-col overflow-hidden rounded-xl border text-sm text-card-foreground outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
  {
    variants: {
      variant: {
        default: "border-border bg-card",
        elevated:
          "border-border bg-popover shadow-[0_24px_70px_rgb(0_0_0_/_0.26)]",
        subtle: "border-border bg-muted/70",
        interactive:
          "border-border bg-card hover:border-ring hover:bg-secondary active:translate-y-px aria-disabled:pointer-events-none aria-disabled:opacity-60",
      },
      size: {
        default: "gap-4 py-4",
        sm: "gap-3 py-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type CardSharedProps = VariantProps<typeof cardVariants> & {
  className?: string;
  disabled?: boolean;
};

type CardDivProps = CardSharedProps &
  Omit<
    React.ComponentPropsWithoutRef<"div">,
    "className" | "onClick" | "role" | "tabIndex"
  > & {
    as?: "div";
    href?: never;
  };

type CardAnchorProps = CardSharedProps &
  Omit<React.ComponentPropsWithoutRef<"a">, "className"> & {
    as: "a";
    href: string;
  };

type CardButtonProps = CardSharedProps &
  Omit<React.ComponentPropsWithoutRef<"button">, "className" | "disabled"> & {
    as: "button";
  };

type CardProps = CardDivProps | CardAnchorProps | CardButtonProps;

function Card({
  as = "div",
  className,
  size = "default",
  variant = "default",
  disabled = false,
  ...props
}: CardProps) {
  const cardClassName = cn(cardVariants({ variant, size }), className);

  if (as === "a") {
    const { onClick, tabIndex, ...anchorProps } = props as Omit<
      CardAnchorProps,
      keyof CardSharedProps | "as"
    >;

    return (
      <a
        data-slot="card"
        data-size={size}
        data-variant={variant}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : tabIndex}
        className={cardClassName}
        onClick={(event) => {
          if (disabled) {
            event.preventDefault();
            event.stopPropagation();
            return;
          }

          onClick?.(event);
        }}
        {...anchorProps}
      />
    );
  }

  if (as === "button") {
    const buttonProps = props as Omit<
      CardButtonProps,
      keyof CardSharedProps | "as"
    >;

    return (
      <button
        data-slot="card"
        data-size={size}
        data-variant={variant}
        type="button"
        disabled={disabled}
        className={cn("text-left", cardClassName)}
        {...buttonProps}
      />
    );
  }

  const divProps = props as Omit<CardDivProps, keyof CardSharedProps | "as">;

  return (
    <div
      data-slot="card"
      data-size={size}
      data-variant={variant}
      className={cardClassName}
      {...divProps}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-4 group-data-[size=sm]/card:px-3 has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-4 group-data-[size=sm]/card:[.border-b]:pb-3",
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "font-heading text-base leading-snug font-medium group-data-[size=sm]/card:text-sm",
        className,
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className,
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-4 group-data-[size=sm]/card:px-3", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center rounded-b-xl border-t bg-muted/50 p-4 group-data-[size=sm]/card:p-3",
        className,
      )}
      {...props}
    />
  );
}

export {
  Card,
  cardVariants,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
export type { CardProps };
