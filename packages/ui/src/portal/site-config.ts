export const siteConfig = {
  institution: "UNIJORGE",
  name: "NITE",
  locale: "pt-BR",
  description:
    "Portal institucional do NITE para acompanhar projetos em evolução, oportunidades e atualizações do núcleo.",
  lastUpdated: "2026-04-24",
  publicChannels: [
    {
      label: "Instagram",
      href: "https://www.instagram.com/nite.uj?igsh=c3JzbHRxdWZnNzN2",
      displayLabel: "@nite.uj",
      ariaLabel: "Acompanhar o NITE no Instagram",
    },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
