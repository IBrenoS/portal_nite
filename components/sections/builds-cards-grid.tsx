"use client";

import { Monitor, Moon, Smartphone, Sun, type LucideIcon } from "lucide-react";
import {
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";

import { cn } from "@/lib/utils";

const methodStages = [
  {
    id: "desafio",
    file: "desafio.tsx",
    variable: "desafio",
    label: "Desafio",
    title: "Desafio claro",
    description:
      "Transformamos uma ideia ampla em um problema com contexto, limites, público e critérios de sucesso.",
    output: "objetivo, hipótese, limites e próximos passos",
    summary:
      "Cada iniciativa começa definindo o desafio e apontando o que se pretende investigar. O resultado dessa fase é um objetivo claro e uma hipótese inicial para guiar a próxima etapa.",
  },
  {
    id: "prototipo",
    file: "prototipo.tsx",
    variable: "prototipo",
    label: "Protótipo",
    title: "Protótipo testável",
    description:
      "Ideias ganham forma em interfaces, provas de conceito ou experiências digitais que podem ser testadas e refinadas.",
    output: "interface, prova de conceito, fluxo ou demonstração",
    summary:
      "As perguntas viram coisas tangíveis. O foco aqui é experimentar e aprender rapidamente.",
  },
  {
    id: "evolucao",
    file: "evolucao.tsx",
    variable: "evolucao",
    label: "Evolução",
    title: "Evolução contínua",
    description:
      "Com base nos testes e aprendizados, aprimoramos a solução e registramos decisões, tecnologia e status de cada passo.",
    output: "registro, documentação, tecnologia e status",
    summary:
      "Documentação e visibilidade não são burocracia, mas uma memória viva do projeto.",
  },
  {
    id: "impacto",
    file: "impacto.tsx",
    variable: "impacto",
    label: "Impacto",
    title: "Impacto e compartilhamento",
    description:
      "A entrega encontra uma rota pública: projeto, oportunidade, atualização, oficina ou guia. O conhecimento alcança a comunidade e inspira novos desafios.",
    output: "página pública, chamada, guia ou atualização",
    summary:
      "Ao final, a solução não fica dentro do núcleo; ela se conecta com pessoas e contextos diversos.",
  },
] as const;

type MethodStage = (typeof methodStages)[number];
type PreviewDevice = "desktop" | "mobile";
type PreviewAppearance = "dark" | "light";

const codeTokenClasses = {
  keyword: "text-[#c792ea]",
  function: "text-[#82aaff]",
  property: "text-[#f07178]",
  string: "text-[#c3e88d]",
  punctuation: "text-[#89a4ba]",
} as const;

type CodeTone = keyof typeof codeTokenClasses;
type CodeSegment = { text: string; tone?: CodeTone };
type CodeLine = CodeSegment[];

function MethodCode({ stage }: { stage: MethodStage }) {
  const lines: CodeLine[] = [
    [
      { text: "import", tone: "keyword" },
      { text: " { ", tone: "punctuation" },
      { text: "defineMethod", tone: "function" },
      { text: " } ", tone: "punctuation" },
      { text: "from", tone: "keyword" },
      { text: ' "@nite/method"', tone: "string" },
      { text: ";", tone: "punctuation" },
    ],
    [
      { text: "import", tone: "keyword" },
      { text: " { ", tone: "punctuation" },
      {
        text: "Heading, MethodLayout, MethodNote, Text",
        tone: "function",
      },
      { text: " } ", tone: "punctuation" },
      { text: "from", tone: "keyword" },
      { text: ' "@nite/ui"', tone: "string" },
      { text: ";", tone: "punctuation" },
    ],
    [{ text: " " }],
    [
      { text: "const", tone: "keyword" },
      { text: ` ${stage.variable} `, tone: "function" },
      { text: "= ", tone: "punctuation" },
      { text: "defineMethod", tone: "function" },
      { text: "({", tone: "punctuation" },
    ],
    [
      { text: "  etapa", tone: "property" },
      { text: ": ", tone: "punctuation" },
      { text: `"${stage.label}"`, tone: "string" },
      { text: ",", tone: "punctuation" },
    ],
    [
      { text: "  titulo", tone: "property" },
      { text: ": ", tone: "punctuation" },
      { text: `"${stage.title}"`, tone: "string" },
      { text: ",", tone: "punctuation" },
    ],
    [
      { text: "  descricao", tone: "property" },
      { text: ": ", tone: "punctuation" },
      { text: `"${stage.description}"`, tone: "string" },
      { text: ",", tone: "punctuation" },
    ],
    [
      { text: "  saida", tone: "property" },
      { text: ": ", tone: "punctuation" },
      { text: `"${stage.output}"`, tone: "string" },
      { text: ",", tone: "punctuation" },
    ],
    [
      { text: "  resumo", tone: "property" },
      { text: ": ", tone: "punctuation" },
      { text: `"${stage.summary}"`, tone: "string" },
      { text: ",", tone: "punctuation" },
    ],
    [
      { text: "})", tone: "punctuation" },
      { text: ";", tone: "punctuation" },
    ],
    [{ text: " " }],
    [
      { text: "export default function", tone: "keyword" },
      { text: ` ${stage.variable}Method`, tone: "function" },
      { text: "() {", tone: "punctuation" },
    ],
    [
      { text: "  return", tone: "keyword" },
      { text: " (", tone: "punctuation" },
    ],
    [{ text: "    <MethodLayout>", tone: "function" }],
    [{ text: "      <MethodLayout.Header>", tone: "function" }],
    [{ text: "        <MethodLayout.Eyebrow>", tone: "function" }],
    [
      { text: "          Método aplicado · ", tone: "punctuation" },
      { text: `{${stage.variable}.etapa}`, tone: "property" },
    ],
    [{ text: "        </MethodLayout.Eyebrow>", tone: "function" }],
    [
      { text: "        <Heading>", tone: "function" },
      { text: `{${stage.variable}.titulo}`, tone: "property" },
      { text: "</Heading>", tone: "function" },
    ],
    [{ text: "      </MethodLayout.Header>", tone: "function" }],
    [{ text: "      <MethodLayout.Body>", tone: "function" }],
    [
      { text: "        <Text>", tone: "function" },
      { text: `{${stage.variable}.descricao}`, tone: "property" },
      { text: "</Text>", tone: "function" },
    ],
    [{ text: "      </MethodLayout.Body>", tone: "function" }],
    [
      { text: "      <MethodNote>", tone: "function" },
      { text: `{${stage.variable}.resumo}`, tone: "property" },
      { text: "</MethodNote>", tone: "function" },
    ],
    [{ text: "    </MethodLayout>", tone: "function" }],
    [{ text: "  );", tone: "punctuation" }],
    [{ text: "}", tone: "punctuation" }],
  ];

  return (
    <pre className="min-w-max px-5 py-4 font-mono text-xs leading-7 text-[#a7b6c2]">
      <code>
        {lines.map((line, index) => (
          <span
            key={`${stage.id}-${index}`}
            data-method-code-line=""
            className="grid grid-cols-[2rem_1fr]"
          >
            <span
              aria-hidden="true"
              className="select-none pr-4 text-right text-white/25"
            >
              {index + 1}
            </span>
            <span>
              {line.map((segment, segmentIndex) => (
                <span
                  key={`${stage.id}-${index}-${segmentIndex}`}
                  className={
                    segment.tone ? codeTokenClasses[segment.tone] : undefined
                  }
                >
                  {segment.text}
                </span>
              ))}
            </span>
          </span>
        ))}
      </code>
    </pre>
  );
}

function ToolbarSwitch({
  checked,
  label,
  offIcon: OffIcon,
  onIcon: OnIcon,
  onCheckedChange,
}: {
  checked: boolean;
  label: string;
  offIcon: LucideIcon;
  onIcon: LucideIcon;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      data-method-segmented-control=""
      aria-label={label}
      aria-checked={checked}
      title={label}
      className="flex h-9 overflow-hidden rounded-lg border border-white/10 bg-[#080808] text-white/45 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60 motion-reduce:transition-none"
      onClick={() => onCheckedChange(!checked)}
    >
      <span
        className={cn(
          "grid w-8 place-items-center transition-colors duration-200 motion-reduce:transition-none",
          !checked && "bg-white/[0.08] text-white",
        )}
      >
        <OffIcon aria-hidden="true" className="size-4" />
      </span>
      <span
        className={cn(
          "grid w-8 place-items-center border-l border-white/10 transition-colors duration-200 motion-reduce:transition-none",
          checked && "bg-white/[0.08] text-white",
        )}
      >
        <OnIcon aria-hidden="true" className="size-4" />
      </span>
    </button>
  );
}

function TsxFileIcon({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden="true"
      data-tsx-file-icon=""
      className={cn(
        "grid size-4 shrink-0 place-items-center rounded-[3px] text-[0.5rem] leading-none font-semibold tracking-[-0.02em]",
        active ? "bg-[#172554] text-[#60a5fa]" : "bg-white/10 text-white/45",
      )}
    >
      TS
    </span>
  );
}

function MethodPreview({
  activeIndex,
  appearance,
  device,
  stage,
}: {
  activeIndex: number;
  appearance: PreviewAppearance;
  device: PreviewDevice;
  stage: MethodStage;
}) {
  const isLight = appearance === "light";
  const previewToneVars = {
    "--method-preview-heading": isLight ? "#0b1220" : "#f5f7fb",
    "--method-preview-body": isLight
      ? "rgb(51 65 85 / 0.86)"
      : "rgb(214 224 237 / 0.82)",
    "--method-preview-label": isLight
      ? "rgb(51 65 85 / 0.64)"
      : "rgb(176 199 217 / 0.7)",
    "--method-preview-rule": isLight
      ? "rgb(15 23 42 / 0.12)"
      : "rgb(176 199 217 / 0.16)",
    "--method-preview-note-surface": isLight
      ? "rgb(15 23 42 / 0.035)"
      : "rgb(176 199 217 / 0.045)",
  } as CSSProperties;

  return (
    <div
      id="method-active-stage"
      role="tabpanel"
      aria-labelledby={`method-tab-${stage.id}`}
      data-method-preview-frame=""
      data-device={device}
      data-appearance={appearance}
      className={cn(
        "mx-auto flex h-full w-full flex-col overflow-hidden rounded-2xl border transition-[max-width,background-color,color] duration-300 motion-reduce:transition-none",
        device === "mobile" ? "max-w-[21.875rem]" : "max-w-full",
        isLight
          ? "border-black/10 bg-white text-[#141414]"
          : "border-white/10 bg-[#050505] text-[#f5f5f5]",
      )}
      style={{
        ...previewToneVars,
        backgroundImage: isLight
          ? "radial-gradient(circle at 50% 0%, rgb(37 99 235 / 0.1), transparent 38%)"
          : "radial-gradient(circle at 50% 0%, rgb(37 99 235 / 0.13), transparent 38%)",
      }}
    >
      <div className="flex flex-1 flex-col justify-center px-6 py-10 sm:px-8">
        <p className="mb-5 font-mono text-[0.68rem] leading-none font-medium tracking-[0.16em] text-[var(--method-preview-label)] uppercase">
          Método aplicado · {stage.label}
        </p>
        <h3 className="max-w-[25rem] font-heading text-[clamp(2rem,3vw,2.875rem)] leading-[1.08] font-semibold tracking-normal text-[var(--method-preview-heading)] text-balance">
          {stage.title}
        </h3>
        <p className="mt-6 max-w-[31rem] text-base leading-7 font-medium text-[var(--method-preview-body)]">
          {stage.description}
        </p>

        <div
          data-method-preview-note=""
          className="mt-10 max-w-[31rem] rounded-xl border border-[var(--method-preview-rule)] bg-[var(--method-preview-note-surface)] p-5"
        >
          <p className="max-w-[29rem] text-base leading-7 font-medium text-[var(--method-preview-body)]">
            {stage.summary}
          </p>
        </div>
      </div>

      <div className="flex gap-1.5 px-6 pb-6 sm:px-8">
        {methodStages.map((item, index) => (
          <span
            key={item.id}
            aria-hidden="true"
            className={cn(
              "h-px flex-1 bg-current transition-opacity duration-200 motion-reduce:transition-none",
              index <= activeIndex ? "opacity-70" : "opacity-15",
            )}
          />
        ))}
      </div>
    </div>
  );
}

export function BuildsCardsGrid() {
  const [activeStageId, setActiveStageId] =
    useState<MethodStage["id"]>("desafio");
  const [device, setDevice] = useState<PreviewDevice>("desktop");
  const [appearance, setAppearance] = useState<PreviewAppearance>("dark");
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

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = index === lastIndex ? 0 : index + 1;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
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
      className="h-[38.9375rem] overflow-hidden rounded-[1.5rem] border border-nite-border-subtle bg-[#050505] text-[#f5f5f5] md:h-[43.75rem]"
      data-builds-grid=""
      data-component="nite-method-system"
      data-media-mode="resend-react-dom-panel"
    >
      <div
        data-method-window-controls=""
        className="flex h-12 items-center justify-between border-b border-white/10 px-4"
      >
        <div aria-hidden="true" className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-[#ed6a5e]" />
          <span className="size-2.5 rounded-full bg-[#f4bf4f]" />
          <span className="size-2.5 rounded-full bg-[#61c454]" />
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <ToolbarSwitch
            checked={device === "mobile"}
            label="Visualização mobile"
            offIcon={Monitor}
            onIcon={Smartphone}
            onCheckedChange={(checked) =>
              setDevice(checked ? "mobile" : "desktop")
            }
          />
          <ToolbarSwitch
            checked={appearance === "light"}
            label="Aparência clara do preview"
            offIcon={Moon}
            onIcon={Sun}
            onCheckedChange={(checked) =>
              setAppearance(checked ? "light" : "dark")
            }
          />
        </div>
      </div>

      <div className="flex h-[calc(100%-3rem)] min-h-0 flex-col md:flex-row">
        <aside className="h-10 shrink-0 border-b border-white/10 md:h-auto md:w-[12.5rem] md:border-r md:border-b-0">
          <div
            role="tablist"
            aria-label="Etapas do método aplicado"
            aria-orientation="vertical"
            className="flex h-full gap-1 overflow-x-auto p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:block md:space-y-1 md:overflow-x-visible md:p-3"
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
                    "flex h-9 shrink-0 items-center gap-2 rounded-lg px-2.5 font-sans text-sm transition-colors duration-200 motion-reduce:transition-none md:w-full md:text-left",
                    isActive
                      ? "bg-white/[0.07] text-[#6ea8ff]"
                      : "text-white/60 hover:bg-white/[0.04] hover:text-white/85",
                  )}
                  onClick={() => activateStage(index)}
                  onFocus={() => activateStage(index)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                >
                  <TsxFileIcon active={isActive} />
                  <span>{stage.file}</span>
                </button>
              );
            })}
          </div>
        </aside>

        <div data-method-content="" className="flex min-h-0 min-w-0 flex-1">
          <div
            data-method-code-pane=""
            aria-label={`Código da etapa ${activeStage.label}`}
            className="hidden min-h-0 min-w-0 w-1/2 overflow-scroll border-r border-white/10 bg-[#050505] [scrollbar-color:rgb(255_255_255/0.42)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:size-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/40 [&::-webkit-scrollbar-track]:bg-transparent md:block"
          >
            <MethodCode stage={activeStage} />
          </div>

          <div
            data-method-preview-pane=""
            className="min-w-0 flex-1 bg-[#09090a] p-2.5"
          >
            <MethodPreview
              activeIndex={safeActiveIndex}
              appearance={appearance}
              device={device}
              stage={activeStage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
