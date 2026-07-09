import type { ReactNode } from "react";
import { ChevronDown, Copy } from "lucide-react";

import { cn } from "@/lib/utils";

import styles from "./readiness.module.css";

type ReadinessSignalId = "interesse" | "ritmo" | "registro" | "contexto";

type ReadinessSignal = {
  id: ReadinessSignalId;
  step: string;
  title: string;
  description: string;
};

const readinessSignals: ReadinessSignal[] = [
  {
    id: "interesse",
    step: "Step 1",
    title: "Interesse vira construção.",
    description:
      "Observe uma demanda, teste uma hipótese e volte com algo discutível.",
  },
  {
    id: "ritmo",
    step: "Step 2",
    title: "Ritmo sustenta evolução.",
    description:
      "Mantenha combinados, apareça nas revisões e antecipe progresso.",
  },
  {
    id: "registro",
    step: "Step 3",
    title: "Registro cria continuidade.",
    description:
      "Transforme decisões, código e processo em memória compartilhada.",
  },
  {
    id: "contexto",
    step: "Step 4",
    title: "Contexto define onde começar.",
    description:
      "Leia problema, momento e repertório antes de escolher onde começar.",
  },
];

type ReadinessSignalPathProps = {
  className?: string;
};

export function ReadinessSignalPath({ className }: ReadinessSignalPathProps) {
  return (
    <div
      data-component="readiness-signal-path"
      data-implementation-reference="readiness-signal-path"
      className={cn(
        "mx-auto flex w-full flex-col items-center justify-center gap-[1.125rem] px-0 py-12 !pt-10 text-pretty sm:py-24",
        className,
      )}
    >
      <ol
        role="list"
        aria-label="Etapas de aproximação ao projeto"
        className="w-full max-w-5xl"
      >
        {readinessSignals.map((signal, index) => {
          const isLast = index === readinessSignals.length - 1;

          return (
            <li
              key={signal.id}
              data-component="readiness-signal-step-row"
              className="grid w-full grid-cols-[2rem_1fr] gap-x-6 md:grid-cols-[6rem_1fr_2fr] md:gap-x-10"
            >
              <div
                data-component="readiness-signal-marker-column"
                className="flex flex-col items-center"
                aria-hidden="true"
              >
                <span
                  data-component="readiness-signal-dot"
                  className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full border-2 border-[var(--readiness-marker-border)]"
                />
                <span
                  data-component="readiness-signal-line"
                  className={cn(
                    "mt-2 w-px flex-1",
                    isLast ? styles.pathLineTerminal : styles.pathLine,
                  )}
                />
              </div>

              <div
                className={cn(
                  "flex flex-col gap-2 pb-8",
                  isLast ? "md:pb-0" : "md:pb-80",
                )}
              >
                <p className="mb-2 text-sm font-normal leading-[1.6] text-nite-text-muted">
                  {signal.step}
                </p>
                <h3 className="font-heading text-xl font-normal leading-8 text-nite-text-primary md:leading-none">
                  {signal.title}
                </h3>
                <p className="text-sm font-normal leading-[1.72] text-nite-text-secondary">
                  {signal.description}
                </p>
              </div>

              <div
                data-component="readiness-signal-visual-column"
                className={cn(
                  "hidden items-start justify-end md:flex",
                  isLast ? "" : "pb-20",
                )}
              >
                <ReadinessVisualPanel signal={signal} />
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function ReadinessVisualPanel({ signal }: { signal: ReadinessSignal }) {
  return (
    <div
      data-component="readiness-signal-panel"
      className="relative w-full max-w-[30rem] overflow-hidden"
      aria-hidden="true"
    >
      <div
        data-component="readiness-signal-panel-shell"
        className={cn(
          styles.panelHighlight,
          "overflow-visible rounded-tr-[3rem] border-x border-t border-[var(--readiness-panel-border)]",
        )}
      >
        <div
          data-component="readiness-signal-panel-frame"
          className="flex items-center justify-end gap-2 border-b border-[var(--readiness-panel-border)] p-5 pl-8"
        >
          {signal.id === "interesse" ? <InterestPanel /> : null}
          {signal.id === "ritmo" ? <RhythmPanel /> : null}
          {signal.id === "registro" ? <RegisterPanel /> : null}
          {signal.id === "contexto" ? <ContextPanel /> : null}
        </div>
      </div>
      <span
        data-component="readiness-signal-shell-mask-left"
        className={cn(
          styles.panelMaskLeft,
          "pointer-events-none absolute inset-y-0 left-0 z-10 w-[5.25rem]",
        )}
      />
      <span
        data-component="readiness-signal-shell-mask-bottom"
        className={cn(
          styles.panelMaskBottom,
          "pointer-events-none absolute bottom-0 left-0 z-10 h-[46%] w-full",
        )}
      />
    </div>
  );
}

function PanelShell({
  children,
  component,
}: {
  children: ReactNode;
  component?: string;
}) {
  return (
    <div
      data-component={component}
      className={cn(
        styles.cardSurface,
        "relative z-20 flex w-full max-w-[26rem] shrink-0 flex-col gap-2 overflow-hidden rounded-4xl border border-[var(--readiness-card-border)] p-6 [corner-shape:round]",
      )}
    >
      {children}
      <div
        data-component="readiness-signal-panel-glow"
        className="pointer-events-none absolute bottom-0 w-full"
      >
        <span
          className={cn(
            styles.glowSoft,
            "absolute right-[-6rem] h-[8rem] w-[8rem] rounded-full blur-[8rem] sm:right-[-7.5rem] sm:h-[10rem] sm:w-[10rem] sm:blur-[10rem]",
          )}
        />
        <span
          className={cn(
            styles.glowStrong,
            "absolute right-0 h-[10rem] w-[10rem] rounded-full blur-[8rem] sm:h-[12rem] sm:w-[12rem] sm:blur-[10rem]",
          )}
        />
      </div>
    </div>
  );
}

function KeyboardShortcut({ children }: { children: ReactNode }) {
  return (
    <span className="flex items-center gap-1 text-[var(--readiness-key-text)]">
      {children}
    </span>
  );
}

function KeyboardKey({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-md bg-[var(--readiness-key-bg)] px-1 text-[0.7rem] font-semibold leading-none">
      {children}
    </span>
  );
}

function PrimaryAction({ children }: { children: ReactNode }) {
  return (
    <span className="flex h-8 items-center gap-2 rounded-xl bg-[var(--readiness-primary-action-bg)] pl-3 pr-2 text-sm font-semibold text-[var(--readiness-primary-action-text)]">
      {children}
      <KeyboardShortcut>
        <KeyboardKey>⌘</KeyboardKey>
        <KeyboardKey>↩</KeyboardKey>
      </KeyboardShortcut>
    </span>
  );
}

function SecondaryAction({ children }: { children: ReactNode }) {
  return (
    <span className="flex h-8 items-center gap-2 rounded-xl border border-[var(--readiness-secondary-action-border)] bg-[var(--readiness-secondary-action-bg)] pl-3 pr-2 text-sm font-semibold text-[var(--readiness-secondary-action-text)]">
      {children}
      <span className="inline-flex h-5 items-center rounded-md bg-[var(--readiness-key-bg)] px-1.5 text-[0.7rem] leading-none text-[var(--readiness-key-muted)]">
        Esc
      </span>
    </span>
  );
}

function FormField({
  children,
  label,
  mono = true,
}: {
  children: ReactNode;
  label?: string;
  mono?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      {label ? (
        <span className="text-sm leading-5 text-[var(--readiness-field-label)]">
          {label}
        </span>
      ) : null}
      <div
        className={cn(
          "flex h-8 w-full items-center justify-between rounded-xl border border-[var(--readiness-field-border)] bg-[var(--readiness-field-bg)] pl-3 text-sm text-[var(--readiness-field-text)]",
          mono ? "font-mono" : "font-sans",
        )}
      >
        {children}
      </div>
    </div>
  );
}

function InterestPanel() {
  return (
    <PanelShell>
      <h4 className="text-base font-medium leading-6 text-[var(--readiness-card-text)]">
        Sinal de entrada
      </h4>
      <p className="text-balance text-sm font-normal leading-[1.6] text-[var(--readiness-card-muted)]">
        Registre uma demanda real e transforme curiosidade em hipótese.
      </p>
      <div className="mt-2 flex flex-col gap-6">
        <FormField>
          <span>&lt;demanda&gt;@nite.uj</span>
          <span className="mr-1 inline-flex h-6 w-6 items-center justify-center rounded-md border border-[var(--readiness-secondary-action-border)] bg-[var(--readiness-secondary-action-bg)] text-[var(--readiness-secondary-action-text)]">
            <Copy aria-hidden="true" className="size-3.5" strokeWidth={1.75} />
          </span>
        </FormField>
        <div className="flex items-center gap-2">
          <PrimaryAction>Copy signal</PrimaryAction>
          <SecondaryAction>Cancel</SecondaryAction>
        </div>
      </div>
    </PanelShell>
  );
}

function RhythmPanel() {
  return (
    <PanelShell>
      <h4 className="text-base font-medium leading-6 text-[var(--readiness-card-text)]">
        Ciclo de revisão
      </h4>
      <div className="mt-2 flex flex-col gap-6">
        <FormField label="Progress URL">
          <span>nite://revisao/semanal</span>
        </FormField>
        <FormField label="Sinais" mono={false}>
          <span className="font-mono">progresso.comunicado</span>
          <ChevronDown
            aria-hidden="true"
            className="mr-2 size-4 text-[var(--readiness-secondary-action-text)]"
            strokeWidth={1.75}
          />
        </FormField>
        <div className="flex items-center gap-2">
          <PrimaryAction>Add</PrimaryAction>
          <SecondaryAction>Cancel</SecondaryAction>
        </div>
      </div>
    </PanelShell>
  );
}

function RegisterPanel() {
  return (
    <PanelShell component="readiness-signal-code-panel">
      <pre className="overflow-hidden font-mono text-sm leading-5 text-[var(--readiness-code-text)]">
        <code>{`export const registro = {
  tipo: "decisao",
  memoria: "compartilhada",
  evidencia: "reutilizavel",
};`}</code>
      </pre>
    </PanelShell>
  );
}

function ContextPanel() {
  return (
    <PanelShell component="readiness-signal-terminal">
      <h4 className="text-base font-medium leading-6 text-[var(--readiness-card-text)]">
        Resolve context
      </h4>
      <ul className="mt-3 grid gap-2 font-mono text-xs">
        {[
          ["signal", "leitura de contexto"],
          ["input", "problema compreendido"],
          ["match", "compatibilidade mapeada"],
          ["next", "começar no ponto certo"],
        ].map(([label, value]) => (
          <li
            key={label}
            data-component="readiness-log-row"
            className="grid grid-cols-[5rem_1fr] gap-3 rounded-xl border border-[var(--readiness-log-border)] bg-[var(--readiness-log-bg)] px-3 py-3 text-[var(--readiness-card-muted)]"
          >
            <span className="uppercase text-[var(--readiness-log-label)]">
              {label}
            </span>
            <span className="text-[var(--readiness-log-value)]">{value}</span>
          </li>
        ))}
      </ul>
    </PanelShell>
  );
}

export { readinessSignals };
