import { siteConfig } from "@/biblioteca/site-config";
import { Container } from "@/components/layout/container";
import { Chip } from "@/components/ui/chip";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <Container className="grid gap-6 py-8 text-sm text-muted-foreground lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="grid gap-2">
          <p className="font-heading text-base font-semibold text-foreground">
            {siteConfig.name} | {siteConfig.institution}
          </p>
          <p>{siteConfig.name} segue em construcao com conteudo institucional validado antes de publicacao.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {siteConfig.publicChannels.map((channel) => (
            <Chip key={channel.label} variant="quiet">
              {channel.label}: {channel.displayValue}
            </Chip>
          ))}
        </div>
      </Container>
    </footer>
  );
}
