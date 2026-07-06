import { Container } from "@/components/layout/container";
import { BuildsCardsGrid } from "@/components/sections/builds-cards-grid";
import { MethodFeatureIcon } from "@/components/sections/method-feature-icon";
import { SectionHeader } from "@/components/sections/section-header";

export function BuildsSection() {
  return (
    <section
      id="metodo"
      className="bg-nite-background py-24 text-nite-text-primary sm:py-32 lg:py-40"
      data-builds-section=""
      data-surface="nite-background"
      data-testid="builds-section"
    >
      <Container size="xl" className="flex flex-col gap-14 sm:gap-18">
        <div className="flex flex-col items-center gap-8">
          <MethodFeatureIcon />
          <SectionHeader
            align="center"
            className="max-w-[42rem] [&_h2]:font-heading [&_h2]:text-[clamp(2rem,4vw,3rem)] [&_h2]:font-semibold [&_h2]:leading-[1.1] [&_h2]:tracking-normal [&_p]:max-w-[38rem] [&_p]:text-nite-text-secondary"
            title="Método aplicado"
            description="Toda ideia precisa de um caminho para ganhar forma."
          />
        </div>

        <BuildsCardsGrid />
      </Container>
    </section>
  );
}
