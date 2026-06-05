import Link from "next/link";
import type { Route } from "next";

import { Container } from "@/components/layout/container";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function PersonNotFound() {
  return (
    <>
      <SiteHeader />
      <main id="conteudo-principal">
        <Container className="flex min-h-[60svh] flex-col justify-center gap-5 py-16">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-nite-brand-accent">
            Pessoa nao encontrada
          </p>
          <h1 className="max-w-2xl font-heading text-4xl font-semibold text-foreground">
            Nao encontramos essa pessoa.
          </h1>
          <p className="max-w-xl text-base leading-7 text-muted-foreground">
            O perfil informado nao corresponde a uma pessoa com publicacao
            autorizada no portal.
          </p>
          <Link
            href={"/pessoas" as Route}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "w-fit rounded-md",
            )}
          >
            Voltar para pessoas
          </Link>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
