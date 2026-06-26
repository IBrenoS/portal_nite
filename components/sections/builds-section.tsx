import { Container } from "@/components/layout/container";
import { BuildsCardsGrid } from "@/components/sections/builds-cards-grid";
import { MethodFeatureIcon } from "@/components/sections/method-feature-icon";
import { SectionHeader } from "@/components/sections/section-header";

export function BuildsSection() {
  return (
    <section
      id="metodo"
      className="resend-dark-scene py-24 sm:py-32 lg:py-40"
      data-builds-section=""
      data-nite-scene="inverse"
      data-surface="resend-dark"
      data-testid="builds-section"
    >
      <Container size="xl" className="flex flex-col gap-14 sm:gap-18">
        <div className="flex flex-col items-center gap-8">
          <MethodFeatureIcon />
          <SectionHeader
            align="center"
            className="max-w-[42rem] [&_h2]:font-resend-display [&_h2]:text-[clamp(3.5rem,7vw,6.25rem)] [&_h2]:font-normal [&_h2]:leading-[0.94] [&_p]:max-w-[38rem] [&_p]:text-[#8a8a8a]"
            title="Método aplicado"
            description="O NITE organiza desafios acadêmicos em recortes, protótipos e registros públicos."
          />
        </div>

        <BuildsCardsGrid />
      </Container>
    </section>
  );
}
