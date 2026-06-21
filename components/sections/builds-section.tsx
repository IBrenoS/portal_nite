import { Container } from "@/components/layout/container";
import { BuildsCardsGrid } from "@/components/sections/builds-cards-grid";
import { SectionHeader } from "@/components/sections/section-header";

export function BuildsSection() {
  return (
    <section
      id="metodo"
      className="bg-background py-14 sm:py-20 lg:py-24"
      data-builds-section=""
      data-surface="clean"
      data-testid="builds-section"
    >
      <Container
        size="xl"
        className="grid gap-10 lg:grid-cols-[minmax(24rem,32rem)_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[minmax(26rem,33rem)_minmax(0,1fr)]"
      >
        <SectionHeader
          className="lg:max-w-[33rem] lg:pl-16 [&_h2]:text-[2rem] [&_h2]:leading-[1.08] sm:[&_h2]:text-[2.25rem] lg:[&_h2]:text-[2.28rem] xl:[&_h2]:text-[2.35rem]"
          eyebrow="Método aplicado"
          title="Antes de virar projeto, uma demanda precisa virar evidência."
          description="O NITE organiza desafios acadêmicos em recortes, protótipos e registros públicos para que cada frente avance com contexto, limite e rastreabilidade."
        />

        <BuildsCardsGrid />
      </Container>
    </section>
  );
}
