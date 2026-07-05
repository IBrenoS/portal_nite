"use client";

import type { Route } from "next";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import type { TimelineEvent } from "@/biblioteca/esquemas";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type LivingTimelineSectionProps = {
  events: TimelineEvent[];
};

type TimelineSequenceImage = {
  id: string;
  src: string;
  position: string;
};

type TimelineNarrativeAnimationState =
  | "visible"
  | "hiding"
  | "hidden"
  | "showing";

type TimelineNarrativeTextSegment =
  | {
      id: string;
      text: string;
      type: "space";
    }
  | {
      graphemes: string[];
      id: string;
      text: string;
      type: "word";
    };

type TimelineNarrativeRenderableSegment =
  | {
      id: string;
      text: string;
      type: "space";
    }
  | {
      graphemes: Array<{ index: number; text: string }>;
      id: string;
      text: string;
      type: "word";
    };

type IntlGraphemeSegmenter = {
  segment(input: string): Iterable<{ segment: string }>;
};

type IntlGraphemeSegmenterConstructor = new (
  locale: string,
  options: { granularity: "grapheme" },
) => IntlGraphemeSegmenter;

const timelineCtaHref = "/sobre" satisfies Route;
const timelineSequenceIntervalMs = 5000;
const timelineNarrativeIdleDelayMs = 1600;
const timelineNarrativeAnimationDuration = 0.28;
const timelineNarrativeLetterStagger = 0.014;
const timelineVisualCompleteProgress = 0.08;

const timelineSequenceImages = [
  {
    id: "combo-nite-07-19",
    src: "/images/timeline/timeline-sequence-07-19-combo-nite.jpg",
    position: "center center",
  },
  {
    id: "nite-cimatec-06-18",
    src: "/images/timeline/timeline-sequence-06-18-nite-cimatec.jpg",
    position: "center center",
  },
  {
    id: "mostra-projetos-06-11",
    src: "/images/timeline/timeline-sequence-06-11-mostra-projetos.jpg",
    position: "center center",
  },
  {
    id: "semana-engenharia-05-23",
    src: "/images/timeline/timeline-sequence-05-23-semana-engenharia.jpg",
    position: "center center",
  },
  {
    id: "lab-context",
    src: "/images/timeline/timeline-sequence-lab-context.jpeg",
    position: "center 42%",
  },
] satisfies readonly TimelineSequenceImage[];

function getPublicTimelineEvents(events: TimelineEvent[]) {
  return events.filter((event) => event.sourceStatus === "confirmado");
}

function isTimelineImageSequenceReady(scrollProgress: number) {
  return scrollProgress >= timelineVisualCompleteProgress;
}

function getTimelineNarrativeFragmentX(index: number) {
  return ((index % 5) - 2) * 4;
}

function getTimelineNarrativeFragmentY(index: number) {
  return ((index % 3) - 1) * 6 - 8;
}

function getTimelineNarrativeFragmentRotation(index: number) {
  return ((index % 4) - 1.5) * 2;
}

function getTimelineNarrativeGraphemes(text: string) {
  const Segmenter = (
    Intl as typeof Intl & {
      Segmenter?: IntlGraphemeSegmenterConstructor;
    }
  ).Segmenter;

  if (typeof Segmenter === "function") {
    return Array.from(
      new Segmenter("pt-BR", { granularity: "grapheme" }).segment(text),
      ({ segment }) => segment,
    );
  }

  return Array.from(text);
}

function getTimelineNarrativeTextSegments(
  text: string,
): TimelineNarrativeTextSegment[] {
  return text.split(/(\s+)/).map((segment, index) =>
    segment.trim().length === 0
      ? {
          id: `space-${index}`,
          text: segment,
          type: "space",
        }
      : {
          graphemes: getTimelineNarrativeGraphemes(segment),
          id: `word-${index}-${segment}`,
          text: segment,
          type: "word",
        },
  );
}

function TimelineNarrativeText({
  exposeScreenReaderText = false,
  text,
}: {
  exposeScreenReaderText?: boolean;
  text: string;
}) {
  const renderableSegments = getTimelineNarrativeTextSegments(text).reduce<{
    nextLetterIndex: number;
    segments: TimelineNarrativeRenderableSegment[];
  }>(
    (currentState, segment) => {
      if (segment.type === "space") {
        return {
          nextLetterIndex: currentState.nextLetterIndex,
          segments: [...currentState.segments, segment],
        };
      }

      return {
        nextLetterIndex:
          currentState.nextLetterIndex + segment.graphemes.length,
        segments: [
          ...currentState.segments,
          {
            ...segment,
            graphemes: segment.graphemes.map((grapheme, graphemeIndex) => ({
              index: currentState.nextLetterIndex + graphemeIndex,
              text: grapheme,
            })),
          },
        ],
      };
    },
    { nextLetterIndex: 0, segments: [] },
  ).segments;

  return (
    <>
      {exposeScreenReaderText ? <span className="sr-only">{text}</span> : null}
      <span aria-hidden="true" data-timeline-narrative-visual="">
        {renderableSegments.map((segment) =>
          segment.type === "space" ? (
            segment.text
          ) : (
            <span
              key={segment.id}
              className="timeline-narrative-word"
              data-timeline-narrative-word-wrapper=""
            >
              {segment.graphemes.map((grapheme, graphemeIndex) => (
                <span
                  key={`${segment.id}-${graphemeIndex}-${grapheme.text}`}
                  className="timeline-narrative-letter"
                  data-timeline-narrative-letter=""
                  data-timeline-narrative-letter-index={grapheme.index}
                >
                  {grapheme.text}
                </span>
              ))}
            </span>
          ),
        )}
      </span>
    </>
  );
}

function TimelineImageSequence({
  active,
  images,
  intervalMs = timelineSequenceIntervalMs,
}: {
  active: boolean;
  images: readonly TimelineSequenceImage[];
  intervalMs?: number;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const resolvedActiveIndex = images.length > 0 ? activeIndex % images.length : 0;

  useEffect(() => {
    if (!active || images.length <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % images.length);
    }, intervalMs);

    return () => {
      window.clearInterval(interval);
    };
  }, [active, images.length, intervalMs]);

  return (
    <div
      aria-hidden="true"
      className="timeline-image-sequence"
      data-active-index={resolvedActiveIndex}
      data-autoplay={active ? "running" : "paused"}
      data-autoplay-interval-ms={intervalMs}
      data-component="timeline-image-sequence"
    >
      {images.map((image, index) => (
        <span
          key={image.id}
          className="timeline-image-sequence-layer"
          data-active={index === resolvedActiveIndex}
          data-component="timeline-image-sequence-layer"
          data-image-id={image.id}
          data-image-src={image.src}
          style={{
            backgroundImage: `url("${image.src}")`,
            backgroundPosition: image.position,
          }}
        />
      ))}
    </div>
  );
}

function TimelineNarrativeContent({
  imageSequenceActive,
}: {
  imageSequenceActive: boolean;
}) {
  const narrativeRef = useRef<HTMLDivElement>(null);
  const animationStateRef =
    useRef<TimelineNarrativeAnimationState>("visible");
  const animationCompletionTimerRef = useRef<number | null>(null);
  const idleTimerRef = useRef<number | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const narrative = narrativeRef.current;

      if (!narrative) {
        return;
      }

      const letters = gsap.utils.toArray<HTMLElement>(
        narrative.querySelectorAll("[data-timeline-narrative-letter]"),
      );
      const button = narrative.querySelector<HTMLElement>(
        "[data-scroll='button']",
      );
      const prefersReducedMotion =
        typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const shouldAnimateLetters = process.env.NODE_ENV !== "test";

      const clearIdleTimer = () => {
        if (idleTimerRef.current === null) {
          return;
        }

        window.clearTimeout(idleTimerRef.current);
        idleTimerRef.current = null;
      };

      const clearAnimationCompletionTimer = () => {
        if (animationCompletionTimerRef.current === null) {
          return;
        }

        window.clearTimeout(animationCompletionTimerRef.current);
        animationCompletionTimerRef.current = null;
      };

      const scheduleAnimationCompletion = (onComplete: () => void) => {
        clearAnimationCompletionTimer();

        const totalDuration =
          timelineNarrativeAnimationDuration +
          Math.max(letters.length - 1, 0) * timelineNarrativeLetterStagger;

        animationCompletionTimerRef.current = window.setTimeout(
          onComplete,
          Math.ceil(totalDuration * 1000) + 50,
        );
      };

      const clearActiveTimeline = () => {
        clearAnimationCompletionTimer();
        timelineRef.current?.kill();
        timelineRef.current = null;
        gsap.killTweensOf(letters);
      };

      const resetLetters = () => {
        gsap.set(letters, {
          autoAlpha: 1,
          clearProps: "opacity,visibility,transform",
          rotation: 0,
          scale: 1,
          x: 0,
          y: 0,
        });
      };

      const setAnimationState = (
        nextState: TimelineNarrativeAnimationState,
      ) => {
        const isVisuallyAvailable =
          nextState === "visible" || nextState === "showing";

        animationStateRef.current = nextState;
        narrative.dataset.narrativeAnimationState = nextState;
        narrative.dataset.narrativeVisibility = isVisuallyAvailable
          ? "visible"
          : "hidden";

        if (isVisuallyAvailable) {
          narrative.removeAttribute("aria-hidden");
          button?.removeAttribute("tabindex");
          return;
        }

        narrative.setAttribute("aria-hidden", "true");
        button?.setAttribute("tabindex", "-1");
      };

      const scheduleIdle = () => {
        clearIdleTimer();

        if (!imageSequenceActive || prefersReducedMotion) {
          return;
        }

        idleTimerRef.current = window.setTimeout(() => {
          if (animationStateRef.current !== "visible") {
            return;
          }

          clearActiveTimeline();
          setAnimationState("hiding");

          const completeHiding = () => {
            clearAnimationCompletionTimer();
            timelineRef.current = null;
            setAnimationState("hidden");
          };

          if (letters.length === 0) {
            completeHiding();
            return;
          }

          if (shouldAnimateLetters) {
            timelineRef.current = gsap.timeline({
              defaults: { ease: "power2.in", overwrite: "auto" },
              onComplete: completeHiding,
            });

            timelineRef.current.to(letters, {
              autoAlpha: 0,
              duration: timelineNarrativeAnimationDuration,
              rotation: getTimelineNarrativeFragmentRotation,
              scale: 0.96,
              stagger: { each: timelineNarrativeLetterStagger, from: "start" },
              x: getTimelineNarrativeFragmentX,
              y: getTimelineNarrativeFragmentY,
            });
          }

          scheduleAnimationCompletion(completeHiding);
        }, timelineNarrativeIdleDelayMs);
      };

      const requestReconstruction = () => {
        const currentState = animationStateRef.current;

        if (currentState === "visible" || currentState === "showing") {
          return;
        }

        clearActiveTimeline();
        setAnimationState("showing");

        const completeShowing = () => {
          clearAnimationCompletionTimer();
          timelineRef.current = null;
          resetLetters();
          setAnimationState("visible");
          scheduleIdle();
        };

        if (letters.length === 0) {
          completeShowing();
          return;
        }

        if (shouldAnimateLetters) {
          timelineRef.current = gsap.timeline({
            defaults: { ease: "power3.out", overwrite: "auto" },
            onComplete: completeShowing,
          });

          timelineRef.current.to(letters, {
            autoAlpha: 1,
            duration: timelineNarrativeAnimationDuration,
            rotation: 0,
            scale: 1,
            stagger: { each: timelineNarrativeLetterStagger, from: "start" },
            x: 0,
            y: 0,
          });
        }

        scheduleAnimationCompletion(completeShowing);
      };

      const handleTimelineInteraction = () => {
        if (!imageSequenceActive || prefersReducedMotion) {
          return;
        }

        clearIdleTimer();

        if (
          animationStateRef.current === "hiding" ||
          animationStateRef.current === "hidden"
        ) {
          requestReconstruction();
          return;
        }

        scheduleIdle();
      };

      clearActiveTimeline();
      resetLetters();
      setAnimationState("visible");

      if (prefersReducedMotion || !imageSequenceActive) {
        return () => {
          clearIdleTimer();
          clearActiveTimeline();
          resetLetters();
          setAnimationState("visible");
        };
      }

      window.addEventListener("keydown", handleTimelineInteraction);
      window.addEventListener("pointerdown", handleTimelineInteraction, {
        passive: true,
      });
      window.addEventListener("scroll", handleTimelineInteraction, {
        passive: true,
      });
      window.addEventListener("touchmove", handleTimelineInteraction, {
        passive: true,
      });
      window.addEventListener("touchstart", handleTimelineInteraction, {
        passive: true,
      });
      window.addEventListener("wheel", handleTimelineInteraction, {
        passive: true,
      });

      scheduleIdle();

      return () => {
        clearIdleTimer();
        window.removeEventListener("keydown", handleTimelineInteraction);
        window.removeEventListener("pointerdown", handleTimelineInteraction);
        window.removeEventListener("scroll", handleTimelineInteraction);
        window.removeEventListener("touchmove", handleTimelineInteraction);
        window.removeEventListener("touchstart", handleTimelineInteraction);
        window.removeEventListener("wheel", handleTimelineInteraction);
        clearActiveTimeline();
        resetLetters();
        setAnimationState("visible");
      };
    },
    { dependencies: [imageSequenceActive], scope: narrativeRef },
  );

  return (
    <div
      ref={narrativeRef}
      className="timeline-premium-content"
      data-component="timeline-narrative-content"
      data-narrative-animation-state="visible"
      data-narrative-visibility="visible"
      data-testid="timeline-narrative-content"
    >
      <p className="timeline-premium-eyebrow" data-scroll="eyebrow">
        <TimelineNarrativeText exposeScreenReaderText text="Timeline" />
      </p>
      <h2
        aria-label="O NITE em trajetória"
        className="timeline-premium-title"
        data-scroll="title"
      >
        <TimelineNarrativeText text="O NITE em trajetória" />
      </h2>
      <p className="timeline-premium-description" data-scroll="description">
        <TimelineNarrativeText
          exposeScreenReaderText
          text="Uma leitura visual dos marcos que estruturam o núcleo, suas frentes e seus próximos passos."
        />
      </p>
      <a
        href={timelineCtaHref}
        className={cn(
          buttonVariants({ variant: "invisible", size: "lg" }),
          "timeline-premium-button",
        )}
        aria-label="Continuar leitura sobre a timeline do NITE"
        data-cta="Home timeline"
        data-cta-copy="Continuar leitura"
        data-scroll="button"
      >
        <TimelineNarrativeText text="Continuar leitura" />
      </a>
    </div>
  );
}

export function LivingTimelineSection({ events }: LivingTimelineSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isImageSequenceActive, setIsImageSequenceActive] = useState(false);
  const publicTimelineEvents = getPublicTimelineEvents(events);

  useGSAP(
    () => {
      if (process.env.NODE_ENV === "test") {
        return;
      }

      const section = sectionRef.current;

      if (!section) {
        return;
      }

      const bg = section.querySelector<HTMLElement>("[data-scroll='bg']");
      const container = section.querySelector<HTMLElement>(
        "[data-scroll='container']",
      );
      const eyebrow = section.querySelector<HTMLElement>(
        "[data-scroll='eyebrow']",
      );
      const title = section.querySelector<HTMLElement>("[data-scroll='title']");
      const description = section.querySelector<HTMLElement>(
        "[data-scroll='description']",
      );
      const button = section.querySelector<HTMLElement>(
        "[data-scroll='button']",
      );
      const revealTargets = [eyebrow, title, description, button].filter(
        Boolean,
      );

      if (!bg || !container) {
        return;
      }

      const motionPreference = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      );

      if (motionPreference.matches) {
        gsap.set(bg, {
          borderRadius: 0,
          marginBottom: 0,
          marginTop: 0,
          maxWidth: "100%",
        });
        gsap.set(revealTargets, { clearProps: "all", opacity: 1, y: "0%" });
        setIsImageSequenceActive(false);
        return;
      }

      let isSectionInView = false;
      let isZoomComplete = false;
      const syncImageSequenceState = () => {
        const nextState = isSectionInView && isZoomComplete;

        setIsImageSequenceActive((currentState) =>
          currentState === nextState ? currentState : nextState,
        );
      };

      const getStartState = () => {
        const previousCssText = bg.style.cssText;

        bg.style.cssText = "";
        const computedStyle = getComputedStyle(bg);
        const state = {
          borderRadius: computedStyle.borderRadius,
          marginBottom: computedStyle.marginBottom,
          marginTop: computedStyle.marginTop,
          maxWidth: computedStyle.maxWidth,
        };

        bg.style.cssText = previousCssText;

        return state;
      };

      gsap.set(revealTargets, { opacity: 0, y: "10%" });

      const buildScrubAnimation = () => {
        const startState = getStartState();
        const isMobile = window.matchMedia("(max-width: 479px)").matches;
        const containerMargin = isMobile ? "2rem" : "4rem";

        gsap.set(bg, startState);
        gsap.set(container, { marginBottom: 0, marginTop: 0 });

        return gsap
          .timeline({
            scrollTrigger: {
              trigger: section,
              start: "center 70%",
              end: "center 40%",
              scrub: 0.8,
              invalidateOnRefresh: true,
              onUpdate: (scrollTrigger) => {
                const nextZoomComplete = isTimelineImageSequenceReady(
                  scrollTrigger.progress,
                );

                if (nextZoomComplete === isZoomComplete) {
                  return;
                }

                isZoomComplete = nextZoomComplete;
                syncImageSequenceState();
              },
            },
          })
          .fromTo(
            bg,
            startState,
            {
              borderRadius: "0px",
              ease: "power2.out",
              marginBottom: 0,
              marginTop: 0,
              maxWidth: "100%",
            },
            0,
          )
          .fromTo(
            container,
            { marginBottom: 0, marginTop: 0 },
            {
              ease: "power2.out",
              marginBottom: containerMargin,
              marginTop: containerMargin,
            },
            0.05,
          );
      };

      let scrubTimeline = buildScrubAnimation();
      const viewportTrigger = ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        onEnter: () => {
          isSectionInView = true;
          syncImageSequenceState();
        },
        onEnterBack: () => {
          isSectionInView = true;
          syncImageSequenceState();
        },
        onLeave: () => {
          isSectionInView = false;
          syncImageSequenceState();
        },
        onLeaveBack: () => {
          isSectionInView = false;
          syncImageSequenceState();
        },
      });
      const revealTimeline = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: title ?? section,
          start: "top bottom",
          once: true,
        },
      });

      if (eyebrow) {
        revealTimeline.to(eyebrow, { duration: 0.55, opacity: 1, y: "0%" }, 0);
      }

      if (title) {
        revealTimeline.to(title, { duration: 0.7, opacity: 1, y: "0%" }, 0.05);
      }

      if (description) {
        revealTimeline.to(
          description,
          { duration: 0.6, opacity: 1, y: "0%" },
          ">-0.1",
        );
      }

      if (button) {
        revealTimeline.to(
          button,
          { duration: 0.6, opacity: 1, y: "0%" },
          ">-0.1",
        );
      }

      let resizeQueued = false;
      let lastWidth = window.innerWidth;

      const handleResize = () => {
        if (resizeQueued) {
          return;
        }

        resizeQueued = true;

        window.requestAnimationFrame(() => {
          resizeQueued = false;

          if (window.innerWidth === lastWidth) {
            return;
          }

          lastWidth = window.innerWidth;
          scrubTimeline.scrollTrigger?.kill();
          scrubTimeline.kill();
          isZoomComplete = false;
          syncImageSequenceState();
          scrubTimeline = buildScrubAnimation();
          ScrollTrigger.refresh();
        });
      };

      window.addEventListener("resize", handleResize);
      ScrollTrigger.refresh();

      return () => {
        window.removeEventListener("resize", handleResize);
        scrubTimeline.scrollTrigger?.kill();
        scrubTimeline.kill();
        viewportTrigger.kill();
        revealTimeline.scrollTrigger?.kill();
        revealTimeline.kill();
        setIsImageSequenceActive(false);
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="timeline-premium-section bg-background"
      data-component="living-timeline-section"
      data-nite-scene="timeline"
      data-public-milestones={publicTimelineEvents.length}
      data-scroll="section"
      data-surface="clean"
    >
      <div className="timeline-premium-scroll-bg" data-scroll="bg">
        <TimelineImageSequence
          active={isImageSequenceActive}
          images={timelineSequenceImages}
        />
        <div className="timeline-premium-container" data-scroll="container">
          <TimelineNarrativeContent imageSequenceActive={isImageSequenceActive} />
        </div>
      </div>
    </section>
  );
}

export {
  TimelineNarrativeContent,
  TimelineImageSequence,
  getTimelineNarrativeGraphemes,
  getPublicTimelineEvents,
  isTimelineImageSequenceReady,
  timelineNarrativeAnimationDuration,
  timelineNarrativeIdleDelayMs,
  timelineNarrativeLetterStagger,
  timelineSequenceImages,
  timelineSequenceIntervalMs,
};
export type { TimelineSequenceImage };
