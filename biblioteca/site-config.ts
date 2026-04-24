export const siteConfig = {
  institution: "UNIJORGE",
  name: "NITE",
  locale: "pt-BR",
  description:
    "O NITE e o nucleo que conecta universidade, inovacao, pratica e desenvolvimento tecnologico em experiencias e projetos reais.",
  status: "M7 - SEO, acessibilidade e performance",
  lastUpdated: "2026-04-24",
  publicChannels: [
    {
      label: "Instagram",
      value: "TODO(nite-content): transcrever URL publica do Instagram",
      displayValue: "https://www.instagram.com/nite.uj?igsh=c3JzbHRxdWZnNzN2",
    },
    {
      label: "E-mail",
      value: "TODO(nite-content): transcrever endereco de e-mail publico",
      displayValue: "Endereco pendente",
    },
    {
      label: "WhatsApp",
      value: "TODO(nite-content): transcrever numero publico de WhatsApp",
      displayValue: "Numero pendente",
    },
  ],
  placeholders: {
    foundationDate:
      "TODO(nite-content): registrar data oficial de fundacao do NITE no repositorio",
    projects:
      "TODO(nite-content): transcrever lista oficial de projetos autorizados para vitrine publica",
    timeline:
      "TODO(nite-content): transcrever marcos institucionais ja confirmados para publicacao",
    contact:
      "TODO(nite-content): transcrever URLs e canais publicos aprovados",
  },
} as const;

export type SiteConfig = typeof siteConfig;
