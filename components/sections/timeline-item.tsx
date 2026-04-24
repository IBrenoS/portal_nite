import { Chip } from "@/components/ui/chip";
import { cn } from "@/lib/utils";

type TimelineItemProps = {
  year: string;
  title: string;
  description: string;
  className?: string;
};

export function TimelineItem({ year, title, description, className }: TimelineItemProps) {
  return (
    <article className={cn("relative grid gap-3 border-l border-border py-1 pl-5", className)}>
      <span className="absolute -left-[5px] top-2 size-2.5 rounded-full bg-brand-circuit-bright shadow-[0_0_16px_rgb(51_212_255_/_0.55)]" />
      <Chip variant="metal">{year}</Chip>
      <h3 className="font-heading text-lg font-semibold text-foreground">{title}</h3>
      <p className="text-sm leading-6 text-muted-foreground">{description}</p>
    </article>
  );
}
