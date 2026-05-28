import { ArrowUpRightIcon } from "lucide-react";

import { siteConfig } from "@/biblioteca/site-config";
import { Container } from "@/components/layout/container";
import { BrandMark } from "@/components/ui/brand-mark";

const footerLinks = [
  { href: "/", label: "Início" },
  { href: "/projetos", label: "Projetos" },
  { href: "/oportunidades", label: "Oportunidades" },
  { href: "/atualizacoes", label: "Atualizações" },
  { href: "/contato", label: "Contato" },
] as const;

const currentYear = 2026;

export function SiteFooter() {
  return (
    <footer className="bg-background" data-surface="clean">
      <Container className="grid gap-8 py-10 text-sm text-muted-foreground lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <div className="flex items-start gap-4">
          <BrandMark className="size-12 shrink-0" />
          <div className="grid gap-3">
            <p className="font-heading text-lg font-semibold text-foreground">
              {siteConfig.name} | {siteConfig.institution}
            </p>
            <p className="max-w-xl leading-6">
              Portal institucional do Núcleo de Inovação, Tecnologia e
              Empreendedorismo.
            </p>
            <p className="max-w-xl text-xs leading-5">
              Conteúdos e oportunidades dependem de validação/autorização
              institucional.
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:justify-items-end">
          <nav
            aria-label="Navegação institucional do rodapé"
            className="grid gap-3 lg:justify-items-end"
          >
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-circuit-bright">
              Navegação
            </p>
            <ul className="flex flex-wrap gap-x-5 gap-y-3 lg:justify-end">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="rounded-sm transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav
            aria-label="Canais públicos do NITE"
            className="flex flex-wrap gap-3 lg:justify-end"
          >
            {siteConfig.publicChannels.map((channel) => (
              <a
                key={channel.href}
                href={channel.href}
                aria-label={channel.ariaLabel}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-md border border-brand-circuit-bright/30 px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] text-brand-circuit-bright transition-colors hover:border-brand-circuit-bright hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {channel.displayLabel}
                <ArrowUpRightIcon className="size-4" aria-hidden="true" />
              </a>
            ))}
          </nav>

          <p className="text-xs">© {currentYear} NITE UNIJORGE.</p>
        </div>
      </Container>
    </footer>
  );
}
