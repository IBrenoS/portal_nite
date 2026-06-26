"use client";

import { useRef, useState, type KeyboardEvent } from "react";

import { MethodSystemCanvas } from "@/components/sections/method-system-canvas";
import { cn } from "@/lib/utils";

const methodStages = [
  {
    id: "recorte",
    label: "Recorte",
    title: "Problema publicável",
    description:
      "A demanda deixa de ser uma ideia solta e vira um contexto claro, com limites, público e critérios de leitura.",
    output: "brief, hipótese, restrições e próximos passos",
  },
  {
    id: "prototipo",
    label: "Protótipo",
    title: "Artefato testável",
    description:
      "Software, dados, automação, robótica ou experiência digital ganham forma suficiente para validação prática.",
    output: "interface, prova de conceito, fluxo ou demonstração",
  },
  {
    id: "evidencia",
    label: "Evidência",
    title: "Rastro verificável",
    description:
      "O avanço só vira narrativa pública quando há contexto, status, evidência e limites bem descritos.",
    output: "registro, documentação, stack e status",
  },
  {
    id: "circulacao",
    label: "Circulação",
    title: "Caminho para a comunidade",
    description:
      "A entrega encontra uma rota pública coerente: projeto, oportunidade, atualização, oficina ou contato institucional.",
    output: "página pública, chamada, guia ou atualização",
  },
] as const;

type MethodStage = (typeof methodStages)[number];

export function BuildsCardsGrid() {
  const [activeStageId, setActiveStageId] =
    useState<MethodStage["id"]>("recorte");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeIndex = methodStages.findIndex(
    (stage) => stage.id === activeStageId,
  );
  const safeActiveIndex = Math.max(activeIndex, 0);
  const activeStage = methodStages[safeActiveIndex] ?? methodStages[0];

  function activateStage(index: number) {
    const stage = methodStages[index];

    if (stage) {
      setActiveStageId(stage.id);
    }
  }

  function handleTabKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    const lastIndex = methodStages.length - 1;
    let nextIndex = index;

    if (event.key === "ArrowRight") {
      nextIndex = index === lastIndex ? 0 : index + 1;
    } else if (event.key === "ArrowLeft") {
      nextIndex = index === 0 ? lastIndex : index - 1;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = lastIndex;
    } else {
      return;
    }

    event.preventDefault();
    activateStage(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  }

  return (
    <div
      className="relative isolate min-h-[31rem] overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#050505] text-[#f5f5f5] shadow-[inset_0_1px_0_rgb(255_255_255/0.04)] sm:min-h-[35rem]"
      data-builds-grid=""
      data-component="nite-method-system"
      data-media-mode="canvas-2d-with-html-fallback"
    >
      <MethodSystemCanvas
        activeIndex={safeActiveIndex}
        stageCount={methodStages.length}
      />

      <div
        aria-hidden="true"
        data-method-fallback="static-method-system"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgb(255_255_255/0.035)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.035)_1px,transparent_1px)] bg-[size:20px_20px] opacity-50"
      />

      <div className="relative flex min-h-[31rem] flex-col sm:min-h-[35rem]">
        <div className="grid flex-1 grid-cols-1 divide-y divide-white/10 px-5 pt-16 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4 lg:px-8">
          {methodStages.map((stage, index) => {
            const isActive = stage.id === activeStage.id;

            return (
              <div
                key={stage.id}
                className="flex min-h-36 flex-col justify-end gap-3 px-4 py-5 lg:min-h-64"
              >
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-[#8a8a8a]">
                  0{index + 1} / {stage.label}
                </span>
                <h3 className="text-base font-medium text-[#f5f5f5]">
                  {stage.title}
                </h3>
                <p
                  className={cn(
                    "max-w-[16rem] text-sm leading-6 text-[#8a8a8a] transition-opacity",
                    !isActive && "lg:opacity-55",
                  )}
                >
                  {stage.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="border-t border-white/10 bg-black/75 p-3 sm:p-4">
          <div
            role="tablist"
            aria-label="Etapas do método aplicado"
            className="flex gap-1 overflow-x-auto"
          >
            {methodStages.map((stage, index) => {
              const isActive = stage.id === activeStage.id;

              return (
                <button
                  key={stage.id}
                  ref={(node) => {
                    tabRefs.current[index] = node;
                  }}
                  id={`method-tab-${stage.id}`}
                  type="button"
                  role="tab"
                  aria-controls="method-active-stage"
                  aria-selected={isActive}
                  tabIndex={isActive ? 0 : -1}
                  className={cn(
                    "min-h-10 shrink-0 rounded-lg border px-4 font-mono text-xs uppercase tracking-[0.12em] transition-colors",
                    isActive
                      ? "border-white/20 bg-white/8 text-[#f5f5f5]"
                      : "border-transparent text-[#8a8a8a] hover:text-[#f5f5f5]",
                  )}
                  onClick={() => activateStage(index)}
                  onFocus={() => activateStage(index)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                >
                  {stage.label}
                </button>
              );
            })}
          </div>

          <div
            id="method-active-stage"
            role="tabpanel"
            aria-labelledby={`method-tab-${activeStage.id}`}
            className="grid gap-2 px-2 pb-2 pt-5 sm:grid-cols-[1fr_auto] sm:items-end"
          >
            <div>
              <p className="text-sm leading-6 text-[#8a8a8a]">
                {activeStage.description}
              </p>
              <p className="mt-2 font-mono text-xs uppercase tracking-[0.12em] text-[#f5f5f5]">
                {activeStage.output}.
              </p>
            </div>
            <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-[#8a8a8a]">
              Estado ativo
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
