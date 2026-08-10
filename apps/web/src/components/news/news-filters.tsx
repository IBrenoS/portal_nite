import type { NewsFilter } from "@nite/content";

export const newsFilterLabels = {
  agenda: "Agenda",
  comunidade: "Comunidade",
  destaques: "Destaques",
  todas: "Todas",
} as const satisfies Record<NewsFilter, string>;
