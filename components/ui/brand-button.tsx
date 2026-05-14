import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type BrandButtonProps = React.ComponentProps<typeof Button>;
type BrandButtonLinkProps = React.ComponentPropsWithoutRef<"a">;

export function ButtonPrimary({
  className,
  size = "lg",
  ...props
}: BrandButtonProps) {
  return (
    <Button
      size={size}
      variant="primary"
      className={cn("rounded-md", className)}
      {...props}
    />
  );
}

export function ButtonSecondary({
  className,
  size = "lg",
  ...props
}: BrandButtonProps) {
  return (
    <Button
      size={size}
      variant="outline"
      className={cn("rounded-md", className)}
      {...props}
    />
  );
}

export function ButtonPrimaryLink({
  className,
  ...props
}: BrandButtonLinkProps) {
  return (
    <a
      className={cn(
        buttonVariants({ variant: "primary", size: "lg" }),
        "rounded-md",
        className,
      )}
      {...props}
    />
  );
}

export function ButtonSecondaryLink({
  className,
  ...props
}: BrandButtonLinkProps) {
  return (
    <a
      className={cn(
        buttonVariants({ variant: "outline", size: "lg" }),
        "rounded-md",
        className,
      )}
      {...props}
    />
  );
}
