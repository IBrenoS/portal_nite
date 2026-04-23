import { ArrowDownIcon, ArrowRightIcon, CheckCircle2Icon, RocketIcon, ShieldCheckIcon } from "lucide-react";

import { siteConfig } from "@/biblioteca/site-config";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const foundationTracks = [
  {
    title: "Arquitetura pronta para crescer",
    description:
      "Next.js com App Router, TypeScript estrito, aliases e estrutura inicial de diretorios para layout, secoes, conteudo e utilitarios.",
  },
  {
    title: "Qualidade automatizada",
    description:
      "Lint, typecheck, testes unitarios com Vitest e smoke e2e com Playwright configurados desde a fundacao do projeto.",
  },
  {
    title: "Base UI reutilizavel",
    description:
      "shadcn/ui inicializado com componentes-base para acelerar M2 e manter a interface consistente desde os primeiros incrementos.",
  },
] as const;

const milestoneChecklist = [
  "Projeto Next.js configurado com TypeScript e Tailwind CSS.",
  "Layout global semantico com base dark responsiva e acessivel.",
  "Pagina bootstrap temporaria para validar o estado do M1.",
  "Scripts obrigatorios de desenvolvimento, build e qualidade.",
] as const;

const qualityScripts = ["npm run lint", "npm run typecheck", "npm run test", "npm run test:e2e", "npm run build"] as const;

export default function HomePage() {
  return (
    <main id="conteudo-principal" className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-80 bg-[radial-gradient(circle_at_top,rgba(41,174,255,0.24),transparent_58%)]" />
      <div className="pointer-events-none absolute inset-y-24 right-[-10rem] -z-10 size-80 rounded-full bg-primary/10 blur-3xl" />

      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 pb-16 pt-8 sm:px-8 lg:px-12">
        <header className="flex flex-col gap-6 rounded-[28px] border border-border/70 bg-background/75 px-6 py-6 backdrop-blur sm:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <Badge>Base em evolucao</Badge>
                <Badge variant="outline">{siteConfig.status}</Badge>
              </div>
              <div className="flex flex-col gap-4">
                <p className="text-sm uppercase tracking-[0.28em] text-muted-foreground">{siteConfig.institution}</p>
                <h1 className="max-w-3xl font-heading text-4xl leading-tight sm:text-5xl lg:text-6xl">
                  {siteConfig.name}
                </h1>
                <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                  {siteConfig.description}
                </p>
              </div>
            </div>

            <div className="grid gap-3 rounded-2xl border border-border/60 bg-card/70 p-4 text-sm text-muted-foreground sm:max-w-xs">
              <p className="font-heading text-base text-foreground">Escopo atual</p>
              <p>
                Estrutura tecnica pronta para destravar M2, M3 e a homepage institucional sem inventar conteudo final antes da hora.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a href="#fundacao" className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}>
              Ver fundacao tecnica
              <ArrowRightIcon data-icon="inline-end" />
            </a>
            <a
              href="#qualidade"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full sm:w-auto")}
            >
              Conferir validacoes
              <ArrowDownIcon data-icon="inline-end" />
            </a>
          </div>
        </header>

        <section id="fundacao" className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Card className="border border-border/70 bg-card/80">
            <CardHeader>
              <CardTitle role="heading" aria-level={2}>
                O que o M1 entrega
              </CardTitle>
              <CardDescription>
                Uma fundacao previsivel, validavel e pronta para receber design system, conteudo estruturado e rotas dinamicas.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                {foundationTracks.map((track) => (
                  <div key={track.title} className="rounded-2xl border border-border/60 bg-background/60 px-4 py-4">
                    <p className="font-heading text-base text-foreground">{track.title}</p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{track.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border/70 bg-card/80">
            <CardHeader>
              <CardTitle role="heading" aria-level={2}>
                Checkpoint da milestone
              </CardTitle>
              <CardDescription>
                Base temporaria publicada com foco em clareza, sem inventar dados institucionais.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="flex flex-col gap-3">
                {milestoneChecklist.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-border/50 bg-background/50 px-4 py-3"
                  >
                    <CheckCircle2Icon className="mt-0.5 text-primary" aria-hidden="true" />
                    <span className="text-sm leading-6 text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        <section id="qualidade" className="mt-10 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <Card className="border border-border/70 bg-card/80">
            <CardHeader>
              <CardTitle role="heading" aria-level={2}>
                Scripts de qualidade
              </CardTitle>
              <CardDescription>
                Esses scripts sustentam o gate de saida do M1 e viram rotina para as proximas milestones.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="flex flex-col gap-3">
                {qualityScripts.map((script) => (
                  <li
                    key={script}
                    className="rounded-2xl border border-border/60 bg-background/60 px-4 py-3 font-mono text-sm text-foreground"
                  >
                    {script}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border border-border/70 bg-card/80">
            <CardHeader>
              <CardTitle role="heading" aria-level={2}>
                Proximo desbloqueio natural
              </CardTitle>
              <CardDescription>
                A fundacao ja suporta a proxima etapa de branding e design system sem retrabalhar estrutura, rotas ou tooling.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-border/60 bg-background/60 px-4 py-4">
                  <ShieldCheckIcon className="text-primary" aria-hidden="true" />
                  <p className="mt-4 font-heading text-base text-foreground">Design tokens</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Os tokens globais ja podem ser refinados no M2 sem reconfigurar a aplicacao inteira.
                  </p>
                </div>
                <div className="rounded-2xl border border-border/60 bg-background/60 px-4 py-4">
                  <RocketIcon className="text-primary" aria-hidden="true" />
                  <p className="mt-4 font-heading text-base text-foreground">Rotas e conteudo</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    A base de App Router esta preparada para home, projetos e timeline estruturados.
                  </p>
                </div>
                <div className="rounded-2xl border border-border/60 bg-background/60 px-4 py-4">
                  <CheckCircle2Icon className="text-primary" aria-hidden="true" />
                  <p className="mt-4 font-heading text-base text-foreground">Validacao continua</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Lint, typecheck e testes ajudam a manter cada incremento pequeno e seguro.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <footer className="mt-10 flex flex-col gap-3 rounded-[28px] border border-border/70 bg-background/70 px-6 py-5 text-sm text-muted-foreground backdrop-blur sm:flex-row sm:items-center sm:justify-between">
          <p>{siteConfig.name} permanece em construcao guiada por milestones, validacoes objetivas e placeholders rastreaveis.</p>
          <Badge variant="secondary">Pronto para M2</Badge>
        </footer>
      </div>
    </main>
  );
}
