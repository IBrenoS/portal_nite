import { ArrowUpRightIcon } from "lucide-react";

import { siteConfig } from "@/biblioteca/site-config";
import { Container } from "@/components/layout/container";
import { BrandMark } from "@/components/ui/brand-mark";

const footerLinks = [
  { href: "/#sobre", label: "Sobre" },
  { href: "/#projetos", label: "Projetos" },
  { href: "/#timeline", label: "Timeline" },
  { href: "/#contato", label: "Contato" },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <Container className="grid gap-8 py-10 text-sm text-muted-foreground lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div className="flex items-start gap-4">
          <BrandMark className="size-12 shrink-0" />
          <div className="grid gap-3">
            <p className="font-heading text-lg font-semibold text-foreground">
              {siteConfig.name} | {siteConfig.institution}
            </p>
            <p className="max-w-xl leading-6">
              Tecnologia aplicada, aprendizagem prática e projetos que aproximam a universidade de novas possibilidades.
            </p>
          </div>
        </div>

        <div className="grid gap-5 lg:justify-items-end">
          <nav aria-label="Navegação do rodapé" className="flex flex-wrap gap-x-5 gap-y-3">
            {footerLinks.map((link) => (
              <a key={link.href} href={link.href} className="transition-colors hover:text-foreground">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-wrap gap-3">
            {siteConfig.publicChannels.map((channel) => (
              <a
                key={channel.href}
                href={channel.href}
                aria-label={channel.ariaLabel}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-md border border-brand-circuit-bright/30 px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] text-brand-circuit-bright transition-colors hover:border-brand-circuit-bright hover:text-foreground"
              >
                {channel.displayLabel}
                <ArrowUpRightIcon className="size-4" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
