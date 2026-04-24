export const siteConfig = {
  institution: "UNIJORGE",
  name: "NITE",
  locale: "pt-BR",
  description:
    "O NITE e o nucleo que conecta universidade, inovacao, pratica e desenvolvimento tecnologico em experiencias e projetos reais.",
  status: "M2 - branding e design system",
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
