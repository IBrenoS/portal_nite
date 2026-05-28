"use client";

import { ArrowRightIcon } from "lucide-react";
import type { Route } from "next";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import type { TimelineEvent } from "@/biblioteca/esquemas";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type LivingTimelineSectionProps = {
  events: TimelineEvent[];
};

const timelineCtaHref = "/atualizacoes" satisfies Route;

function getPublicTimelineEvents(events: TimelineEvent[]) {
  return events.filter((event) => event.sourceStatus === "confirmado");
}

export function LivingTimelineSection({ events }: LivingTimelineSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
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
        return;
      }

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
        revealTimeline.scrollTrigger?.kill();
        revealTimeline.kill();
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
      data-public-milestones={publicTimelineEvents.length}
      data-scroll="section"
      data-surface="clean"
    >
      <div className="timeline-premium-scroll-bg" data-scroll="bg">
        <div className="timeline-premium-container" data-scroll="container">
          <div className="timeline-premium-content">
            <p className="timeline-premium-eyebrow" data-scroll="eyebrow">
              Timeline
            </p>
            <h2 className="timeline-premium-title" data-scroll="title">
              O NITE em trajetória
            </h2>
            <p
              className="timeline-premium-description"
              data-scroll="description"
            >
              Uma leitura visual dos marcos que estruturam o núcleo, suas
              frentes e seus próximos passos.
            </p>
            <div className="timeline-premium-button" data-scroll="button">
              <span>Continuar leitura</span>
              <ArrowRightIcon aria-hidden="true" />
            </div>
          </div>

          <a
            href={timelineCtaHref}
            className="timeline-premium-clickable"
            aria-label="Continuar leitura sobre a timeline do NITE"
            data-cta="Home timeline"
            data-cta-copy="Continuar leitura"
          />
        </div>
      </div>
    </section>
  );
}

export { getPublicTimelineEvents };
