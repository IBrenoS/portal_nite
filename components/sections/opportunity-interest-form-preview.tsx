import { ClipboardListIcon, LockKeyholeIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type OpportunityInterestFormPreviewHeadingLevel = "h2" | "h3" | "h4";

type OpportunityInterestFormPreviewProps = {
  headingLevel?: OpportunityInterestFormPreviewHeadingLevel;
  titleId?: string;
  className?: string;
};

const futureFields = [
  {
    label: "Nome completo",
    description:
      "Campo futuro para identificação apenas quando houver processo aberto e fluxo técnico definido.",
  },
  {
    label: "E-mail institucional",
    description:
      "Orientação prioritária quando aplicável, sem validação ativa nesta etapa.",
  },
  {
    label: "Curso ou vínculo com a universidade",
    description:
      "Informação contextual prevista para processos validados, sem coleta nesta versão.",
  },
  {
    label: "Área de interesse",
    description:
      "Frente de atuação pretendida quando houver oportunidade confirmada.",
  },
  {
    label: "Mensagem ou objetivo de participação",
    description:
      "Texto opcional previsto para explicar interesse, sem envio ou armazenamento agora.",
  },
  {
    label: "Currículo",
    description:
      "Pendente de decisão técnica futura; não há anexo, link ativo ou envio real nesta etapa.",
  },
];

export function OpportunityInterestFormPreview({
  headingLevel = "h2",
  titleId,
  className,
}: OpportunityInterestFormPreviewProps) {
  const Heading = headingLevel;
  const descriptionId = titleId
    ? `${titleId}-descricao`
    : "opportunity-interest-form-preview-description";

  return (
    <Card
      data-component="opportunity-interest-form-preview"
      data-status="inactive"
      className={cn("border-border bg-card", className)}
    >
      <CardHeader className="gap-4 p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <span
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-md border border-border bg-muted/40 text-brand-circuit-bright"
            aria-hidden="true"
          >
            <ClipboardListIcon />
          </span>

          <div className="grid gap-3">
            <span
              data-slot="opportunity-form-preview-status"
              className="w-fit rounded-full border border-border bg-muted/40 px-3 py-1 font-mono text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground"
            >
              Formulário em preparação
            </span>
            <div className="grid gap-2">
              <CardTitle>
                <Heading
                  id={titleId}
                  className="font-heading text-2xl font-semibold text-foreground"
                >
                  Estrutura futura do formulário
                </Heading>
              </CardTitle>
              <CardDescription
                id={descriptionId}
                className="text-base leading-7"
              >
                Este bloco antecipa os campos esperados, mas o formulário ainda
                não está ativo. Nenhum dado é solicitado, capturado, armazenado
                ou enviado nesta etapa.
              </CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="grid gap-5 px-6 pb-6 sm:px-8 sm:pb-8">
        <dl
          aria-describedby={descriptionId}
          className="grid gap-3 sm:grid-cols-2"
        >
          {futureFields.map((field) => (
            <div
              key={field.label}
              className="rounded-lg border border-border bg-muted/35 p-4"
            >
              <dt className="font-heading text-sm font-semibold text-foreground">
                {field.label}
              </dt>
              <dd className="mt-2 text-sm leading-6 text-muted-foreground">
                {field.description}
              </dd>
            </div>
          ))}
        </dl>

        <div className="flex gap-3 rounded-lg border border-border bg-background/40 p-4">
          <LockKeyholeIcon
            className="mt-0.5 size-4 shrink-0 text-brand-circuit-bright"
            aria-hidden="true"
          />
          <p className="text-sm leading-7 text-muted-foreground">
            O envio futuro não garante aprovação ou resposta automática. A
            ativação depende de decisão técnica sobre backend, armazenamento,
            notificação, privacidade operacional e canal de envio.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export type {
  OpportunityInterestFormPreviewHeadingLevel,
  OpportunityInterestFormPreviewProps,
};
