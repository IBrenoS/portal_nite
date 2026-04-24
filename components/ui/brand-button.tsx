import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type BrandButtonProps = React.ComponentProps<typeof Button>;
type BrandButtonLinkProps = React.ComponentPropsWithoutRef<"a">;

export function ButtonPrimary({ className, size = "lg", ...props }: BrandButtonProps) {
  return (
    <Button
      size={size}
      className={cn(
        "min-h-11 rounded-md border-brand-circuit-bright/40 bg-primary font-semibold !text-[#031018] shadow-[0_0_24px_rgb(51_212_255_/_0.16)] hover:bg-brand-circuit-bright hover:!text-[#031018]",
        className,
      )}
      {...props}
    />
  );
}

export function ButtonSecondary({ className, size = "lg", ...props }: BrandButtonProps) {
  return (
    <Button
      size={size}
      variant="outline"
      className={cn("min-h-11 rounded-md border-border bg-background/60 font-semibold hover:bg-accent", className)}
      {...props}
    />
  );
}

export function ButtonPrimaryLink({ className, ...props }: BrandButtonLinkProps) {
  return (
    <a
      className={cn(
        buttonVariants({ size: "lg" }),
        "min-h-11 rounded-md border-brand-circuit-bright/40 bg-primary font-semibold !text-[#031018] shadow-[0_0_24px_rgb(51_212_255_/_0.16)] hover:bg-brand-circuit-bright hover:!text-[#031018]",
        className,
      )}
      {...props}
    />
  );
}

export function ButtonSecondaryLink({ className, ...props }: BrandButtonLinkProps) {
  return (
    <a
      className={cn(
        buttonVariants({ variant: "outline", size: "lg" }),
        "min-h-11 rounded-md border-border bg-background/60 font-semibold hover:bg-accent",
        className,
      )}
      {...props}
    />
  );
}
