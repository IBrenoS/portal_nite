import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeader({ eyebrow, title, description, className }: SectionHeaderProps) {
  return (
    <div className={cn("flex max-w-3xl flex-col gap-3", className)}>
      {eyebrow ? (
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-circuit-bright">{eyebrow}</p>
      ) : null}
      <h2 className="font-heading text-2xl font-semibold leading-tight text-foreground sm:text-3xl">{title}</h2>
      {description ? <p className="max-w-2xl text-base leading-7 text-muted-foreground">{description}</p> : null}
    </div>
  );
}
