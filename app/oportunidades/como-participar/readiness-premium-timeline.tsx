import type { ReactNode } from "react";
import { ChevronDown, Copy } from "lucide-react";

import { cn } from "@/lib/utils";

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

type ReadinessPremiumTimelineProps = {
  className?: string;
};

export function ReadinessPremiumTimeline({
  className,
}: ReadinessPremiumTimelineProps) {
  return (
    <div
      data-component="readiness-resend-timeline"
      data-implementation-reference="resend-inbound-timeline"
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
              data-component="readiness-resend-step-row"
              className="grid w-full grid-cols-[2rem_1fr] gap-x-6 md:grid-cols-[6rem_1fr_2fr] md:gap-x-10"
            >
              <div
                data-component="readiness-resend-marker-column"
                className="flex flex-col items-center"
                aria-hidden="true"
              >
                <span
                  data-component="readiness-resend-dot"
                  className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full border-2 border-white/40"
                />
                <span
                  data-component="readiness-resend-line"
                  className={cn(
                    "mt-2 w-px flex-1 bg-white/[0.08]",
                    isLast &&
                      "bg-gradient-to-b from-white/[0.08] to-transparent",
                  )}
                />
              </div>

              <div
                className={cn(
                  "flex flex-col gap-2 pb-8",
                  isLast ? "md:pb-0" : "md:pb-80",
                )}
              >
                <p className="mb-2 text-sm font-normal leading-[1.6] text-[#8C8C8C]">
                  {signal.step}
                </p>
                <h3 className="font-heading text-xl font-normal leading-8 text-white md:leading-none">
                  {signal.title}
                </h3>
                <p className="text-sm font-normal leading-[1.72] text-[#8C8C8C]">
                  {signal.description}
                </p>
              </div>

              <div
                data-component="readiness-resend-visual-column"
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
      data-component="readiness-resend-panel"
      className="relative w-full max-w-[30rem] overflow-hidden"
      aria-hidden="true"
    >
      <div
        data-component="readiness-resend-panel-shell"
        className="overflow-visible rounded-tr-[3rem] border-x border-t border-[#212629] bg-[radial-gradient(100%_100%_at_50%_0%,rgba(255,255,255,0.10)_0%,rgba(255,255,255,0.00)_100%)]"
      >
        <div
          data-component="readiness-resend-panel-frame"
          className="flex items-center justify-end gap-2 border-b border-[#212629] p-5 pl-8"
        >
          {signal.id === "interesse" ? <InterestPanel /> : null}
          {signal.id === "ritmo" ? <RhythmPanel /> : null}
          {signal.id === "registro" ? <RegisterPanel /> : null}
          {signal.id === "contexto" ? <ContextPanel /> : null}
        </div>
      </div>
      <span
        data-component="readiness-resend-shell-mask-left"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[5.25rem] bg-[linear-gradient(to_right,var(--nite-background)_0%,var(--nite-background)_35%,color-mix(in_srgb,var(--nite-background)_78%,transparent)_62%,transparent_100%)]"
      />
      <span
        data-component="readiness-resend-shell-mask-bottom"
        className="pointer-events-none absolute bottom-0 left-0 z-10 h-[46%] w-full bg-[linear-gradient(to_top,var(--nite-background)_0%,color-mix(in_srgb,var(--nite-background)_72%,transparent)_44%,transparent_100%)]"
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
      className="relative z-20 flex w-full max-w-[26rem] shrink-0 flex-col gap-2 overflow-hidden rounded-4xl border border-[#212629] bg-linear-to-br from-white/5 to-transparent p-6 [corner-shape:round]"
    >
      {children}
      <div
        data-component="readiness-resend-panel-glow"
        className="absolute bottom-0 w-full pointer-events-none"
      >
        <span className="absolute right-[-6rem] h-[8rem] w-[8rem] rounded-full bg-[#22FF991C] blur-[8rem] sm:right-[-7.5rem] sm:h-[10rem] sm:w-[10rem] sm:blur-[10rem]" />
        <span className="absolute right-0 h-[10rem] w-[10rem] rounded-full bg-[#44FFA493] blur-[8rem] sm:h-[12rem] sm:w-[12rem] sm:blur-[10rem]" />
      </div>
    </div>
  );
}

function KeyboardShortcut({ children }: { children: ReactNode }) {
  return (
    <span className="flex items-center gap-1 text-black/35">{children}</span>
  );
}

function KeyboardKey({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-md bg-black/[0.08] px-1 text-[0.7rem] font-semibold leading-none">
      {children}
    </span>
  );
}

function PrimaryAction({ children }: { children: ReactNode }) {
  return (
    <span className="flex h-8 items-center gap-2 rounded-xl bg-white pl-3 pr-2 text-sm font-semibold text-black">
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
    <span className="flex h-8 items-center gap-2 rounded-xl border border-white/5 bg-white/5 pl-3 pr-2 text-sm font-semibold text-[#8C8C8C]">
      {children}
      <span className="inline-flex h-5 items-center rounded-md bg-white/[0.08] px-1.5 text-[0.7rem] leading-none text-white/35">
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
        <span className="text-sm leading-5 text-[#8C8C8C]">{label}</span>
      ) : null}
      <div
        className={cn(
          "flex h-8 w-full items-center justify-between rounded-xl border border-white/5 bg-white/5 pl-3 text-sm text-white/80",
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
      <h4 className="text-base font-medium leading-6 text-white">
        Sinal de entrada
      </h4>
      <p className="text-balance text-sm font-normal leading-[1.6] text-[#8C8C8C]">
        Registre uma demanda real e transforme curiosidade em hipótese.
      </p>
      <div className="mt-2 flex flex-col gap-6">
        <FormField>
          <span>&lt;demanda&gt;@nite.uj</span>
          <span className="mr-1 inline-flex h-6 w-6 items-center justify-center rounded-md border border-white/5 bg-white/5 text-[#8C8C8C]">
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
      <h4 className="text-base font-medium leading-6 text-white">
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
            className="mr-2 size-4 text-[#8C8C8C]"
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
    <PanelShell component="readiness-resend-code-panel">
      <pre className="overflow-hidden font-mono text-sm leading-5 text-white/70">
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
    <PanelShell component="readiness-resend-terminal">
      <h4 className="text-base font-medium leading-6 text-white">
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
            className="grid grid-cols-[5rem_1fr] gap-3 rounded-xl border border-[#212629] bg-black px-3 py-3 text-[#8C8C8C]"
          >
            <span className="uppercase text-[#6B6B6B]">{label}</span>
            <span className="text-white/80">{value}</span>
          </li>
        ))}
      </ul>
    </PanelShell>
  );
}

export { readinessSignals };
