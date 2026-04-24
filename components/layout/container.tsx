import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const containerVariants = cva("mx-auto w-full px-4 sm:px-8 lg:px-12", {
  variants: {
    size: {
      sm: "max-w-3xl",
      md: "max-w-5xl",
      lg: "max-w-6xl",
      xl: "max-w-7xl",
    },
  },
  defaultVariants: {
    size: "lg",
  },
});

type ContainerProps = React.ComponentPropsWithoutRef<"div"> & VariantProps<typeof containerVariants>;

export function Container({ className, size, ...props }: ContainerProps) {
  return <div className={cn(containerVariants({ size, className }))} {...props} />;
}
