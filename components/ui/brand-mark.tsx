import { cn } from "@/lib/utils";
import { UnijorgeBrandText } from "@/components/ui/unijorge-brand-text";

type BrandMarkProps = {
  className?: string;
  priority?: boolean;
};

export function BrandMark({
  className,
  priority: _priority = false,
}: BrandMarkProps) {
  void _priority;

  return (
    <span
      className={cn("inline-flex flex-col items-start leading-none", className)}
      aria-label="NITE UniJorge"
    >
      <span className="font-heading text-base font-bold tracking-tight text-foreground">
        NITE
      </span>
      <UnijorgeBrandText className="mt-1 text-[0.68rem] font-medium uppercase tracking-[0.14em]" />
    </span>
  );
}
