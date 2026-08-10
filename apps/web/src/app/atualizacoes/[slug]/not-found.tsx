import Link from "next/link";

import { Container } from "@/components/layout/container";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export default function NewsArticleNotFound() {
  return (
    <>
      <SiteHeader />
      <main
        id="conteudo-principal"
        className="bg-nite-background text-nite-text-primary"
      >
        <Container
          size="sm"
          className="flex min-h-[60vh] flex-col justify-center py-20"
        >
          <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-nite-brand-accent">
            Nite News
          </p>
          <h1 className="mt-4 font-heading text-4xl font-semibold leading-tight">
            Matéria não encontrada
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-nite-text-secondary">
            O endereço informado não corresponde a uma publicação disponível no
            portal.
          </p>
          <Link
            href="/atualizacoes"
            className="mt-8 inline-flex min-h-11 w-fit items-center rounded-md border border-nite-border-soft px-5 font-semibold text-nite-text-primary outline-none transition-colors hover:border-nite-border-hover hover:bg-nite-surface-subtle focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            Voltar para Nite News
          </Link>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
