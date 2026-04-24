import { siteConfig } from "@/biblioteca/site-config";
import { Container } from "@/components/layout/container";
import { BrandMark } from "@/components/ui/brand-mark";
import { Chip } from "@/components/ui/chip";

const navItems = [
  { href: "#identidade", label: "Identidade" },
  { href: "#componentes", label: "Componentes" },
  { href: "#validacao", label: "Validacao" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/86 backdrop-blur-xl">
      <Container className="flex min-h-16 items-center justify-between gap-4 py-3">
        <a href="#conteudo-principal" className="flex min-h-11 min-w-11 items-center gap-3 rounded-md">
          <BrandMark className="size-11" priority />
          <span className="flex flex-col leading-none">
            <span className="font-heading text-lg font-semibold text-foreground">{siteConfig.name}</span>
            <span className="mt-1 text-xs uppercase text-muted-foreground">{siteConfig.institution}</span>
          </span>
        </a>

        <nav aria-label="Navegacao principal" className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="min-h-11 rounded-md px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <Chip className="hidden sm:inline-flex">{siteConfig.status}</Chip>
      </Container>
    </header>
  );
}
