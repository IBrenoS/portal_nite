import Link from "next/link";

import { Container } from "@/components/layout/container";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ProjectNotFound() {
  return (
    <>
      <SiteHeader />
      <main id="conteudo-principal">
        <Container className="flex min-h-[60svh] flex-col justify-center gap-5 py-16">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-nite-brand-accent">Projeto nao encontrado</p>
          <h1 className="max-w-2xl font-heading text-4xl font-normal text-foreground">Nao encontramos esse projeto.</h1>
          <p className="max-w-xl text-base leading-7 text-muted-foreground">
            O slug informado nao corresponde a nenhum item validado em `conteudo/projetos/projetos.json`.
          </p>
          <Link
            href="/#projetos"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "w-fit rounded-md",
            )}
          >
            Voltar para projetos
          </Link>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
