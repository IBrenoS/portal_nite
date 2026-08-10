import type { Route } from "next";
import Link from "next/link";

import type { NewsFilter } from "@nite/content";
import { cn } from "@/lib/utils";

const filters = [
  { value: "destaques", label: "Destaques" },
  { value: "todas", label: "Todas" },
  { value: "agenda", label: "Agenda" },
  { value: "comunidade", label: "Comunidade" },
] as const satisfies ReadonlyArray<{ value: NewsFilter; label: string }>;

export function NewsFilters({ activeFilter }: { activeFilter: NewsFilter }) {
  return (
    <nav
      aria-label="Filtros de notícias"
      className="-mx-1 flex max-w-full gap-2 overflow-x-auto px-1 pb-1"
    >
      {filters.map((filter) => {
        const isActive = filter.value === activeFilter;

        return (
          <Link
            key={filter.value}
            href={`/atualizacoes?filtro=${filter.value}` as Route}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "inline-flex min-h-11 shrink-0 items-center justify-center rounded-full border px-4 font-mono text-xs font-medium uppercase tracking-[0.14em] outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50",
              isActive
                ? "border-nite-brand-primary bg-nite-brand-primary text-white"
                : "border-nite-border-subtle bg-nite-surface-subtle text-nite-text-secondary hover:border-nite-border-hover hover:text-nite-text-primary",
            )}
          >
            {filter.label}
          </Link>
        );
      })}
    </nav>
  );
}
