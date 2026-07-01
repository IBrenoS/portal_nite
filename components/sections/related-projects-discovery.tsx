"use client";

import type { Route } from "next";
import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
} from "react";

import { Container } from "@/components/layout/container";
import {
  ProjectDiscoveryCard,
  type ProjectDiscoveryStatus,
} from "@/components/sections/project-discovery-card";
import { cn } from "@/lib/utils";

type RelatedProjectDiscoveryVisual = {
  src: string;
  alt: string;
};

type RelatedProjectDiscoveryItem = {
  href: Route;
  title: string;
  summary: string;
  area: string;
  status: ProjectDiscoveryStatus;
  statusLabel: string;
  currentPhase: string;
  stack: readonly string[];
  visual?: RelatedProjectDiscoveryVisual;
};

type RelatedProjectsDiscoveryProps = {
  projects: readonly RelatedProjectDiscoveryItem[];
};

type DragState = {
  pointerId: number;
  scrollLeft: number;
  startX: number;
};

type ScrollState = {
  canScrollNext: boolean;
  canScrollPrevious: boolean;
  hasOverflow: boolean;
};

const carouselStepRatio = 0.86;
const relatedProjectsStoragePrefix = "nite:related-projects-scroll:";

function hasScrollableOverflow(element: HTMLElement) {
  return element.scrollWidth > element.clientWidth + 1;
}

function getStoredScrollKey() {
  return `${relatedProjectsStoragePrefix}${window.location.pathname}`;
}

function RelatedProjectsDiscovery({ projects }: RelatedProjectsDiscoveryProps) {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const dragStateRef = useRef<DragState | null>(null);
  const draggedRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);
  const [scrollState, setScrollState] = useState<ScrollState>({
    canScrollNext: false,
    canScrollPrevious: false,
    hasOverflow: false,
  });

  const layout =
    projects.length === 1
      ? "single"
      : projects.length === 2
        ? "paired"
        : "carousel";
  const supportsCarousel = projects.length > 1;

  const updateScrollState = useCallback(() => {
    const carousel = carouselRef.current;

    if (!carousel) {
      return;
    }

    const hasOverflow = hasScrollableOverflow(carousel);
    const maxScrollLeft = Math.max(
      carousel.scrollWidth - carousel.clientWidth,
      0,
    );
    const nextState = {
      hasOverflow,
      canScrollPrevious: hasOverflow && carousel.scrollLeft > 1,
      canScrollNext: hasOverflow && carousel.scrollLeft < maxScrollLeft - 1,
    };

    setScrollState((currentState) =>
      currentState.hasOverflow === nextState.hasOverflow &&
      currentState.canScrollPrevious === nextState.canScrollPrevious &&
      currentState.canScrollNext === nextState.canScrollNext
        ? currentState
        : nextState,
    );
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;

    if (!carousel) {
      return;
    }

    try {
      const storageKey = getStoredScrollKey();
      const storedPosition = window.sessionStorage.getItem(storageKey);

      if (storedPosition === null) {
        return;
      }

      window.sessionStorage.removeItem(storageKey);
      const nextScrollLeft = Number(storedPosition);

      if (Number.isFinite(nextScrollLeft) && nextScrollLeft >= 0) {
        carousel.scrollLeft = nextScrollLeft;
        updateScrollState();
      }
    } catch {
      // Session storage can be unavailable in restricted browsing contexts.
    }
  }, [updateScrollState]);

  useEffect(() => {
    const carousel = carouselRef.current;

    if (!carousel) {
      return;
    }

    updateScrollState();
    window.addEventListener("resize", updateScrollState);

    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? undefined
        : new ResizeObserver(updateScrollState);
    resizeObserver?.observe(carousel);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", updateScrollState);
    };
  }, [projects.length, updateScrollState]);

  if (projects.length === 0) {
    return null;
  }

  function storeScrollPosition() {
    const carousel = carouselRef.current;

    if (!carousel) {
      return;
    }

    try {
      window.sessionStorage.setItem(
        getStoredScrollKey(),
        String(carousel.scrollLeft),
      );
    } catch {
      // Navigation remains functional when storage is blocked.
    }
  }

  function scrollByDirection(direction: "previous" | "next") {
    const carousel = carouselRef.current;

    if (!carousel || !hasScrollableOverflow(carousel)) {
      return;
    }

    const firstCard = carousel.querySelector<HTMLElement>(
      "[data-component='related-project-card']",
    );
    const measuredCardWidth = firstCard?.getBoundingClientRect().width ?? 0;
    const step =
      measuredCardWidth > 0
        ? measuredCardWidth + 24
        : Math.max(carousel.clientWidth * carouselStepRatio, 280);

    carousel.scrollBy({
      behavior: "smooth",
      left: direction === "next" ? step : -step,
    });
  }

  function scrollToEdge(edge: "start" | "end") {
    const carousel = carouselRef.current;

    if (!carousel || !hasScrollableOverflow(carousel)) {
      return;
    }

    carousel.scrollTo({
      behavior: "smooth",
      left: edge === "start" ? 0 : carousel.scrollWidth,
    });
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (!scrollState.hasOverflow) {
      return;
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollByDirection("next");
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollByDirection("previous");
    } else if (event.key === "Home") {
      event.preventDefault();
      scrollToEdge("start");
    } else if (event.key === "End") {
      event.preventDefault();
      scrollToEdge("end");
    }
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (!supportsCarousel || event.button !== 0) {
      return;
    }

    const carousel = event.currentTarget;

    if (!hasScrollableOverflow(carousel)) {
      return;
    }

    dragStateRef.current = {
      pointerId: event.pointerId,
      scrollLeft: carousel.scrollLeft,
      startX: event.clientX,
    };
    draggedRef.current = false;
    setIsDragging(true);
    carousel.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const dragState = dragStateRef.current;

    if (!dragState) {
      return;
    }

    const delta = event.clientX - dragState.startX;

    if (Math.abs(delta) > 4) {
      draggedRef.current = true;
    }

    event.currentTarget.scrollLeft = dragState.scrollLeft - delta;
  }

  function handlePointerEnd(event: PointerEvent<HTMLDivElement>) {
    const dragState = dragStateRef.current;

    if (!dragState) {
      return;
    }

    if (event.currentTarget.hasPointerCapture(dragState.pointerId)) {
      event.currentTarget.releasePointerCapture(dragState.pointerId);
    }

    dragStateRef.current = null;
    setIsDragging(false);
    updateScrollState();
  }

  function handleClickCapture(event: MouseEvent<HTMLDivElement>) {
    if (!draggedRef.current) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    draggedRef.current = false;
  }

  const shouldRenderControls = supportsCarousel && scrollState.hasOverflow;

  return (
    <section
      className="relative isolate overflow-hidden bg-nite-background py-14 text-nite-text-primary sm:py-20"
      data-component="related-projects-discovery"
      data-nite-scene="inverse"
      data-related-projects-count={projects.length}
      data-related-projects-layout={layout}
      data-surface="nite-background"
      data-testid="related-projects-discovery"
      aria-labelledby="related-projects-title"
    >
      <Container size="xl" className="relative z-10 grid min-w-0 gap-8">
        <div className="grid gap-3">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-nite-brand-accent">
            Projetos Relacionados
          </p>
          <h2
            id="related-projects-title"
            className="font-heading text-2xl font-semibold text-nite-text-primary sm:text-3xl"
          >
            Continue explorando os projetos do NITE.
          </h2>
        </div>

        <div className="relative min-w-0">
          {shouldRenderControls ? (
            <>
              <CarouselButton
                direction="previous"
                disabled={!scrollState.canScrollPrevious}
                label="Projeto anterior"
                onClick={() => scrollByDirection("previous")}
              >
                <ArrowLeftIcon className="size-4" aria-hidden="true" />
              </CarouselButton>
              <CarouselButton
                direction="next"
                disabled={!scrollState.canScrollNext}
                label="Próximo projeto"
                onClick={() => scrollByDirection("next")}
              >
                <ArrowRightIcon className="size-4" aria-hidden="true" />
              </CarouselButton>
            </>
          ) : null}

          <div
            ref={carouselRef}
            role="region"
            aria-label="Projetos relacionados"
            data-related-projects-carousel={supportsCarousel ? "true" : "false"}
            data-related-projects-preview={
              projects.length >= 4 ? "true" : "false"
            }
            tabIndex={scrollState.hasOverflow ? 0 : undefined}
            onKeyDown={handleKeyDown}
            onPointerDownCapture={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerEnd}
            onPointerCancel={handlePointerEnd}
            onScroll={updateScrollState}
            onClickCapture={handleClickCapture}
            className={cn(
              "-mx-4 flex min-w-0 gap-6 overflow-x-auto scroll-smooth px-4 pb-3 outline-none [scrollbar-width:none] focus-visible:ring-3 focus-visible:ring-ring/50 motion-reduce:scroll-auto [&::-webkit-scrollbar]:hidden",
              supportsCarousel && "touch-pan-y snap-x snap-mandatory",
              scrollState.hasOverflow && "cursor-grab",
              isDragging && "cursor-grabbing select-none",
              layout === "single" && "justify-center overflow-visible",
              layout === "paired" &&
                "md:mx-auto md:grid md:grid-cols-[repeat(2,22rem)] md:justify-center md:cursor-auto md:overflow-visible md:px-0 md:snap-none",
              layout === "carousel" && "pr-[14vw] md:pr-[5.5rem]",
            )}
          >
            {projects.map((project) => (
              <RelatedProjectCard
                key={project.href}
                project={project}
                onNavigate={storeScrollPosition}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-start">
          <Link
            href="/projetos"
            className="group inline-flex min-h-11 items-center gap-2 text-sm font-medium text-nite-text-secondary transition-colors hover:text-nite-text-primary focus-visible:text-nite-text-primary focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 motion-reduce:transition-none"
          >
            Ver todos os projetos
            <ArrowRightIcon
              className="size-4 transition-transform group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-focus-visible:translate-x-0"
              aria-hidden="true"
            />
          </Link>
        </div>
      </Container>
    </section>
  );
}

function CarouselButton({
  children,
  direction,
  disabled,
  label,
  onClick,
}: {
  children: ReactNode;
  direction: "previous" | "next";
  disabled: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      className={cn(
        "absolute top-1/2 z-20 hidden size-10 -translate-y-1/2 items-center justify-center rounded-md border border-nite-border-subtle bg-nite-surface text-nite-text-secondary transition-[border-color,color,opacity] hover:border-nite-border-hover hover:text-nite-text-primary focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-40 motion-reduce:transition-none md:inline-flex",
        direction === "previous" ? "-left-5" : "-right-5",
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function RelatedProjectCard({
  onNavigate,
  project,
}: {
  onNavigate: () => void;
  project: RelatedProjectDiscoveryItem;
}) {
  return (
    <article
      data-component="related-project-card"
      style={{
        borderColor: "color(display-p3 0.882 0.949 0.996 / 0.183)",
      }}
      className="group/card relative isolate flex w-[min(86vw,22rem)] flex-none snap-start flex-col gap-4 rounded-3xl border border-b-0 border-[rgba(225,242,254,0.18)] bg-nite-background sm:w-[22rem]"
    >
      <div
        data-component="related-project-card-top-line"
        className="pointer-events-none absolute left-1/2 top-0 h-px w-[150px] max-w-full -translate-x-1/2 -translate-y-1/2 bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(255,255,255,0)_0%,rgba(143,143,143,0.67)_50%,rgba(0,0,0,0)_100%)]"
        aria-hidden="true"
      />
      <div
        data-component="related-project-card-border-veil"
        className="pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)] bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,var(--nite-background)_50%,var(--nite-background)_100%)]"
        aria-hidden="true"
      />
      <ProjectDiscoveryCard
        variant="related"
        onNavigate={onNavigate}
        item={{
          href: project.href,
          title: project.title,
          summary: project.summary,
          category: project.area,
          status: project.status,
          statusLabel: project.statusLabel,
          stack: project.stack,
          cover: project.visual,
        }}
      />
    </article>
  );
}

export { RelatedProjectsDiscovery };
export type { RelatedProjectDiscoveryItem, RelatedProjectDiscoveryVisual };
