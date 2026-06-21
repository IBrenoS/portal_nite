"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

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

type MethodSignalCanvasProps = {
  activeIndex: number;
};

function MethodSignalCanvas({ activeIndex }: MethodSignalCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas || process.env.NODE_ENV === "test") {
      return;
    }

    let context: CanvasRenderingContext2D | null = null;

    try {
      context = canvas.getContext("2d");
    } catch {
      return;
    }

    if (!context) {
      return;
    }

    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    let animationFrame = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();

      canvas.width = Math.max(1, Math.floor(rect.width * pixelRatio));
      canvas.height = Math.max(1, Math.floor(rect.height * pixelRatio));
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const drawPlane = (
      x: number,
      y: number,
      width: number,
      height: number,
      opacity: number,
    ) => {
      context.beginPath();
      context.roundRect(x, y, width, height, 10);
      context.fillStyle = `rgba(240, 240, 240, ${opacity})`;
      context.fill();
      context.strokeStyle = `rgba(176, 199, 217, ${opacity * 2.5})`;
      context.stroke();
    };

    const draw = (time = 0) => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      if (width <= 0 || height <= 0) {
        return;
      }

      const motionPhase = shouldReduceMotion ? 0.35 : time / 1200;
      const pulse = shouldReduceMotion ? 0.55 : 0.5 + Math.sin(time / 560) / 2;

      context.clearRect(0, 0, width, height);

      const backdrop = context.createRadialGradient(
        width * 0.7,
        height * 0.18,
        0,
        width * 0.7,
        height * 0.18,
        Math.max(width, height) * 0.78,
      );

      backdrop.addColorStop(0, "rgba(56, 189, 248, 0.18)");
      backdrop.addColorStop(0.32, "rgba(37, 99, 235, 0.07)");
      backdrop.addColorStop(1, "rgba(9, 9, 10, 0)");
      context.fillStyle = backdrop;
      context.fillRect(0, 0, width, height);

      context.lineWidth = 1;
      context.strokeStyle = "rgba(176, 199, 217, 0.075)";

      for (let x = -60; x <= width + 60; x += 44) {
        context.beginPath();
        context.moveTo(x + Math.sin(motionPhase) * 6, 0);
        context.lineTo(x - 28 + Math.sin(motionPhase) * 6, height);
        context.stroke();
      }

      for (let y = 24; y <= height; y += 56) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(width, y + Math.cos(motionPhase) * 4);
        context.stroke();
      }

      const laneTop = height * 0.23;
      const laneHeight = height * 0.5;
      const nodes = methodStages.map((_, index) => {
        const progress = index / (methodStages.length - 1);

        return {
          x: width * (0.13 + progress * 0.74),
          y: laneTop + laneHeight * (0.46 + Math.sin(index * 1.2) * 0.14),
        };
      });

      context.lineWidth = 1.2;
      context.strokeStyle = "rgba(176, 199, 217, 0.24)";

      for (let index = 0; index < nodes.length - 1; index += 1) {
        const current = nodes[index];
        const next = nodes[index + 1];

        context.beginPath();
        context.moveTo(current.x, current.y);
        context.bezierCurveTo(
          current.x + width * 0.16,
          current.y - height * 0.16,
          next.x - width * 0.16,
          next.y + height * 0.16,
          next.x,
          next.y,
        );
        context.stroke();
      }

      nodes.forEach((node, index) => {
        const isActive = index === activeIndex;
        const planeWidth = isActive ? 84 : 58;
        const planeHeight = isActive ? 42 : 30;

        drawPlane(
          node.x - planeWidth / 2,
          node.y - planeHeight / 2,
          planeWidth,
          planeHeight,
          isActive ? 0.095 : 0.045,
        );

        context.beginPath();
        context.arc(
          node.x,
          node.y,
          isActive ? 7 + pulse * 5 : 4,
          0,
          Math.PI * 2,
        );
        context.fillStyle = isActive
          ? "rgba(56, 189, 248, 0.82)"
          : "rgba(176, 199, 217, 0.5)";
        context.fill();

        if (isActive) {
          context.beginPath();
          context.arc(node.x, node.y, 24 + pulse * 14, 0, Math.PI * 2);
          context.strokeStyle = "rgba(56, 189, 248, 0.22)";
          context.stroke();
        }
      });

      const activeNode = nodes[activeIndex] ?? nodes[0];

      if (activeNode) {
        context.fillStyle = "rgba(56, 189, 248, 0.18)";
        context.fillRect(activeNode.x - 1, height * 0.1, 2, height * 0.76);
      }

      if (!shouldReduceMotion) {
        animationFrame = window.requestAnimationFrame(draw);
      }
    };

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(animationFrame);
    };
  }, [activeIndex, shouldReduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full opacity-90"
      aria-hidden="true"
      data-method-canvas="resend-style-procedural-system"
    />
  );
}

export function BuildsCardsGrid() {
  const [activeStageId, setActiveStageId] =
    useState<MethodStage["id"]>("recorte");
  const shouldReduceMotion = useReducedMotion();
  const activeIndex = methodStages.findIndex(
    (stage) => stage.id === activeStageId,
  );
  const activeStage =
    methodStages[activeIndex >= 0 ? activeIndex : 0] ?? methodStages[0];

  return (
    <div
      className="relative isolate overflow-hidden rounded-2xl border border-nite-border-subtle bg-nite-surface/70 p-4 text-nite-text-primary shadow-[inset_0_1px_0_rgb(255_255_255/0.04)] sm:p-5 lg:min-h-[35rem] lg:p-6"
      data-builds-grid=""
      data-component="nite-method-system"
      data-media-mode="canvas-2d-with-html-fallback"
    >
      <MethodSignalCanvas activeIndex={Math.max(activeIndex, 0)} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_16%,rgb(56_189_248/0.13),transparent_30%),linear-gradient(135deg,rgb(255_255_255/0.055),transparent_44%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-5 grid grid-cols-4 gap-2 opacity-50"
        data-method-fallback="static-system-map"
      >
        {methodStages.map((stage, index) => (
          <span
            key={stage.id}
            className={cn(
              "mt-auto h-px bg-nite-border-subtle",
              index <= Math.max(activeIndex, 0) && "bg-nite-brand-accent/45",
            )}
          />
        ))}
      </div>

      <div className="relative grid gap-5">
        <div className="grid gap-3 border-b border-nite-border-subtle pb-4 sm:grid-cols-[minmax(0,0.8fr)_minmax(16rem,1fr)] sm:items-end">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-nite-text-secondary">
            Sistema de método NITE
          </p>
          <p className="max-w-[28rem] text-sm leading-6 text-nite-text-secondary sm:justify-self-end sm:text-right">
            Uma superfície procedural mostra como uma demanda ganha leitura,
            forma e rastro público.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {methodStages.map((stage, index) => {
            const isActive = activeStage.id === stage.id;

            return (
              <motion.button
                key={stage.id}
                type="button"
                aria-pressed={isActive}
                aria-controls="method-active-stage"
                className={cn(
                  "group min-h-[9.25rem] rounded-xl border border-nite-border-subtle bg-background/48 p-4 text-left outline-none transition-all duration-nite-micro ease-nite-out hover:border-nite-border-hover hover:bg-nite-surface-focus/72 focus-visible:border-nite-border-hover focus-visible:ring-3 focus-visible:ring-ring/50",
                  isActive &&
                    "border-nite-brand-accent/45 bg-nite-brand-soft/20 text-nite-text-primary",
                )}
                initial={{ y: 10 }}
                animate={{ y: 0 }}
                transition={{
                  delay: shouldReduceMotion ? 0 : index * 0.04,
                  duration: shouldReduceMotion ? 0 : 0.44,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onClick={() => setActiveStageId(stage.id)}
                onFocus={() => setActiveStageId(stage.id)}
                onMouseEnter={() => setActiveStageId(stage.id)}
              >
                <span className="flex items-start justify-between gap-4">
                  <span className="min-w-0">
                    <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-nite-brand-accent">
                      {stage.label}
                    </span>
                    <span className="mt-2 block font-heading text-base font-semibold leading-snug text-foreground">
                      {stage.title}
                    </span>
                  </span>
                  <span
                    className={cn(
                      "mt-1 size-2.5 shrink-0 rounded-full border border-nite-border-soft bg-nite-surface-subtle",
                      isActive &&
                        "border-nite-brand-accent bg-nite-brand-accent",
                    )}
                    aria-hidden="true"
                  />
                </span>
                <span className="mt-3 block text-sm leading-6 text-nite-text-secondary">
                  {stage.description}
                </span>
              </motion.button>
            );
          })}
        </div>

        <motion.div
          id="method-active-stage"
          className="grid gap-4 rounded-xl border border-nite-border-strong/70 bg-background/76 p-5 sm:grid-cols-[minmax(0,1fr)_minmax(13rem,0.58fr)] sm:items-end"
          key={activeStage.id}
          initial={{ y: shouldReduceMotion ? 0 : 6 }}
          animate={{ y: 0 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.28,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-nite-brand-accent">
              Estado ativo
            </p>
            <h3 className="mt-2 font-heading text-xl font-semibold leading-tight text-foreground">
              {activeStage.title}
            </h3>
            <p className="mt-3 max-w-[42rem] text-sm leading-6 text-nite-text-secondary">
              {activeStage.description}
            </p>
          </div>

          <div className="rounded-lg border border-nite-border-subtle bg-nite-surface-subtle p-4">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-nite-text-muted">
              Registro gerado
            </p>
            <p className="mt-2 text-sm font-medium leading-6 text-foreground">
              {activeStage.output}.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
