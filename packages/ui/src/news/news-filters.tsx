import type { NewsFilter } from "@nite/news";

export const newsFilterLabels = {
  agenda: "Agenda",
  comunidade: "Comunidade",
  destaques: "Destaques",
  todas: "Todas",
} as const satisfies Record<NewsFilter, string>;

export type NewsFilterLabel = (typeof newsFilterLabels)[NewsFilter];
