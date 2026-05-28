import { siteConfig } from "@/biblioteca/site-config";

type NavigationItemStatus = "mvp" | "planned";

type SiteNavigationItem = {
  label: string;
  href: string;
  status: NavigationItemStatus;
  external?: boolean;
  note?: string;
};

type SiteNavigationGroup = {
  id: "nite" | "projetos" | "atualizacoes" | "oportunidades" | "contato";
  label: string;
  href: string;
  items: SiteNavigationItem[];
};

const instagramChannel = siteConfig.publicChannels.find(
  (channel) => channel.label === "Instagram",
);

const contactNavigationItems: SiteNavigationItem[] = [
  { label: "Falar com o NITE", href: "/contato", status: "mvp" },
  { label: "Propor desafio", href: "/contato", status: "planned" },
  { label: "E-mail", href: "/contato", status: "planned" },
];

if (instagramChannel) {
  contactNavigationItems.push({
    label: "Instagram",
    href: instagramChannel.href,
    status: "mvp",
    external: true,
  });
}

const headerNavigationGroups: SiteNavigationGroup[] = [
  {
    id: "nite",
    label: "O NITE",
    href: "/#sobre",
    items: [
      { label: "Sobre", href: "/#sobre", status: "mvp" },
      { label: "Destaques", href: "/#projetos", status: "mvp" },
      { label: "Timeline", href: "/#timeline", status: "mvp" },
    ],
  },
  {
    id: "projetos",
    label: "Projetos",
    href: "/projetos",
    items: [
      { label: "Todos os projetos", href: "/projetos", status: "mvp" },
      { label: "Software aplicado", href: "/projetos", status: "mvp" },
      { label: "Dados e IA", href: "/projetos", status: "mvp" },
      { label: "Robótica", href: "/projetos", status: "mvp" },
      { label: "Experiência digital", href: "/projetos", status: "mvp" },
      { label: "Automação", href: "/projetos", status: "mvp" },
    ],
  },
  {
    id: "atualizacoes",
    label: "Atualizações",
    href: "/atualizacoes",
    items: [
      {
        label: "NITE em movimento",
        href: "/atualizacoes",
        status: "mvp",
      },
      { label: "Registros", href: "/atualizacoes", status: "mvp" },
      { label: "Bastidores", href: "/atualizacoes", status: "mvp" },
    ],
  },
  {
    id: "oportunidades",
    label: "Oportunidades",
    href: "/oportunidades",
    items: [
      { label: "Como participar", href: "/oportunidades", status: "mvp" },
      { label: "Processos abertos", href: "/oportunidades", status: "mvp" },
      { label: "Enviar currículo", href: "/oportunidades", status: "mvp" },
    ],
  },
  {
    id: "contato",
    label: "Contato",
    href: "/contato",
    items: contactNavigationItems,
  },
];

const futureNavigationRoutes = [
  "/sobre",
  "/atualizacoes/[slug]",
  "/comunidade",
  "/eventos",
  "/oficinas",
  "/galeria",
  "/oportunidades/[slug]",
  "/candidatura",
  "/contato?tipo=desafio",
] as const;

export { futureNavigationRoutes, headerNavigationGroups };
export type { SiteNavigationGroup, SiteNavigationItem, NavigationItemStatus };
