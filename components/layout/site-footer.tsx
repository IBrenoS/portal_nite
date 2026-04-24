import { siteConfig } from "@/biblioteca/site-config";
import { Container } from "@/components/layout/container";
import { Chip } from "@/components/ui/chip";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <Container className="flex flex-col gap-4 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <p>
          {siteConfig.name} segue em construcao por milestones, com conteudo institucional validado antes de publicacao.
        </p>
        <Chip variant="quiet">Base visual pronta para M3</Chip>
      </Container>
    </footer>
  );
}
