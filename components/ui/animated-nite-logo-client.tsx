"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

type AnimatedNiteLogoClientProps = {
  className?: string;
  svgMarkup: string;
};

type SvgAnimatableElement = SVGGraphicsElement & {
  getTotalLength?: () => number;
};

export function AnimatedNiteLogoClient({ className, svgMarkup }: AnimatedNiteLogoClientProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(containerRef);
      const logo = q("#nite-logo");
      const bulb = q("#bulb");
      const brain = q("#brain");
      const text = q("#text");
      const textLetters = q("#text > g") as unknown as SvgAnimatableElement[];
      const brainParts = q(
        "#brain path, #brain polygon, #brain line, #brain polyline, #brain rect",
      ) as unknown as SvgAnimatableElement[];
      const brainNodeCandidates = q(
        "#brain path, #brain polygon, #brain rect, #brain circle, #brain ellipse",
      ) as unknown as SvgAnimatableElement[];
      const lightningCandidates = q(
        "#brain path, #brain line, #brain polyline",
      ) as unknown as SvgAnimatableElement[];
      const requiredTargets = [
        "#logo-final",
        "#nite-logo",
        "#brain",
        "#text",
        "#text-parte-1",
        "#text-parte-2",
        "#text-parte-3",
        "#text-parte-4",
        "#bulb",
      ].flatMap((selector) => q(selector));

      const mm = gsap.matchMedia();

      const getOrderedByVerticalPosition = (items: SvgAnimatableElement[]) =>
        [...items].sort((a, b) => {
          const boxA = a.getBBox();
          const boxB = b.getBBox();

          return boxB.y - boxA.y;
        });

      const getStrokeParts = (items: SvgAnimatableElement[]) =>
        items.filter((item) => {
          const stroke = window.getComputedStyle(item).stroke;

          return stroke !== "" && stroke !== "none" && typeof item.getTotalLength === "function";
        });

      const getFillParts = (items: SvgAnimatableElement[], strokeParts: SvgAnimatableElement[]) =>
        items.filter((item) => !strokeParts.includes(item));

      const getBrainNodes = (items: SvgAnimatableElement[]) =>
        items.filter((item) => {
          const box = item.getBBox();
          const area = box.width * box.height;
          const minSide = Math.max(Math.min(box.width, box.height), 0.001);
          const aspectRatio = Math.max(box.width, box.height) / minSide;

          return (
            area >= 35 &&
            area <= 625 &&
            box.width >= 4 &&
            box.height >= 4 &&
            box.width <= 28 &&
            box.height <= 28 &&
            aspectRatio <= 3.25
          );
        });

      const getOrganicNodeOrder = (nodes: SvgAnimatableElement[]) => {
        const bandHeight = 80;
        const bands = new Map<number, SvgAnimatableElement[]>();

        nodes.forEach((node) => {
          const box = node.getBBox();
          const band = Math.floor(box.y / bandHeight);
          const bandNodes = bands.get(band) ?? [];

          bandNodes.push(node);
          bands.set(band, bandNodes);
        });

        return [...bands.entries()]
          .sort(([bandA], [bandB]) => bandB - bandA)
          .flatMap(([, bandNodes], bandIndex) =>
            [...bandNodes].sort((a, b) => {
              const boxA = a.getBBox();
              const boxB = b.getBBox();

              return bandIndex % 2 === 0 ? boxA.x - boxB.x : boxB.x - boxA.x;
            }),
          );
      };

      const getLightningCandidates = (items: SvgAnimatableElement[]) =>
        items.filter((item) => {
          const box = item.getBBox();
          const area = box.width * box.height;
          const minSide = Math.max(Math.min(box.width, box.height), 0.001);
          const maxSide = Math.max(box.width, box.height);
          const aspectRatio = maxSide / minSide;

          return maxSide >= 24 && minSide <= 14 && area >= 60 && area <= 3000 && aspectRatio >= 3;
        });

      const getCinematicLightningOrder = (items: SvgAnimatableElement[]) => {
        const orderedItems = getOrderedByVerticalPosition(items);

        return orderedItems.map((item, index, array) => {
          if (index % 4 === 1 && index + 1 < array.length) {
            return array[index + 1];
          }

          if (index % 4 === 2) {
            return array[index - 1];
          }

          return item;
        });
      };

      const getTextLettersByVisualOrder = (items: SvgAnimatableElement[]) =>
        [...items].sort((a, b) => {
          const boxA = a.getBBox();
          const boxB = b.getBBox();

          return boxA.y - boxB.y;
        });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        const visibleBrainTargets = [
          ...brain,
          ...brainParts,
          ...brainNodeCandidates,
          ...lightningCandidates,
        ];

        gsap.set(requiredTargets, { clearProps: "all" });
        gsap.set(logo, { opacity: 1, scale: 1, x: 0, y: 0 });
        gsap.set(bulb, { opacity: 1, scale: 1, x: 0, y: 0, clearProps: "filter" });
        gsap.set([...text, ...textLetters], {
          opacity: 1,
          scale: 1,
          y: 0,
          clearProps: "filter",
        });
        gsap.set(visibleBrainTargets, { opacity: 1, scale: 1, clearProps: "filter" });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const isCompactViewport = window.matchMedia("(max-width: 640px)").matches;
        const orderedBrainParts = getOrderedByVerticalPosition(brainParts);
        const strokeParts = getStrokeParts(brainParts);
        const fillParts = getFillParts(brainParts, strokeParts);
        const brainInitialTargets = [...fillParts, ...strokeParts];
        const orderedBrainNodes = getOrganicNodeOrder(getBrainNodes(brainNodeCandidates));
        const idleBrainNodes = orderedBrainNodes.filter((_, index) => index % 4 === 1).slice(0, 12);
        const orderedTextLetters = getTextLettersByVisualOrder(textLetters);
        const orderedLightningCandidates = getCinematicLightningOrder(
          getLightningCandidates(lightningCandidates),
        ).slice(0, isCompactViewport ? 8 : 15);
        const lightningBurstOne = orderedLightningCandidates
          .filter((_, index) => index % 3 === 0)
          .slice(0, 5);
        const lightningBurstTwo = orderedLightningCandidates
          .filter((_, index) => index % 3 === 1)
          .slice(0, 5);
        const lightningBurstPeak = orderedLightningCandidates
          .filter((_, index) => index % 3 === 2)
          .slice(0, 4);
        const lightningGlow = isCompactViewport
          ? "brightness(1.75) drop-shadow(0 0 8px rgba(0, 210, 255, 0.45))"
          : "brightness(2.25) drop-shadow(0 0 14px rgba(0, 235, 255, 0.78))";
        const textGlow = isCompactViewport
          ? "brightness(1.22) drop-shadow(0 0 5px rgba(0, 200, 255, 0.18))"
          : "brightness(1.38) drop-shadow(0 0 9px rgba(0, 200, 255, 0.28))";
        const introTimeline = gsap.timeline({
          defaults: { ease: "none" },
        });
        const idleTimeline = gsap.timeline({
          paused: true,
          repeat: -1,
          repeatDelay: 3.8,
          defaults: { ease: "sine.inOut" },
        });

        gsap.set(brainInitialTargets, {
          opacity: 0.35,
          filter: "brightness(0.65)",
        });
        gsap.set(orderedBrainNodes, {
          opacity: 0.45,
          scale: 0.94,
          filter: "brightness(0.75)",
          transformBox: "fill-box",
          transformOrigin: "50% 50%",
        });
        gsap.set(orderedLightningCandidates, {
          transformBox: "fill-box",
          transformOrigin: "50% 50%",
        });
        gsap.set(orderedTextLetters, {
          opacity: 0.76,
          y: 7,
          filter: "brightness(0.78)",
          transformBox: "fill-box",
          transformOrigin: "50% 50%",
        });

        strokeParts.forEach((part) => {
          const length = part.getTotalLength?.();

          if (!length) {
            return;
          }

          gsap.set(part, {
            strokeDasharray: length,
            strokeDashoffset: length,
          });
        });

        introTimeline.fromTo(
          logo,
          {
            opacity: 0,
            scale: 0.94,
            y: 28,
            transformOrigin: "50% 50%",
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.1,
            ease: "power4.out",
          },
          0,
        );
        introTimeline
          .addLabel("brainEnergyStart", 0.8)
          .fromTo(
            bulb,
            {
              opacity: 0.65,
              scale: 0.985,
              filter: "brightness(0.75)",
              transformOrigin: "50% 50%",
            },
            {
              opacity: 1,
              scale: 1.02,
              filter: "brightness(1.6) drop-shadow(0 0 18px rgba(0, 200, 255, 0.7))",
              duration: 0.7,
              ease: "power2.out",
            },
            0.35,
          )
          .to(
            bulb,
            {
              x: 0.6,
              y: -0.4,
              repeat: 3,
              yoyo: true,
              duration: 0.045,
              ease: "sine.inOut",
            },
            0.72,
          )
          .to(
            bulb,
            {
              scale: 1,
              x: 0,
              y: 0,
              filter: "brightness(1.15) drop-shadow(0 0 10px rgba(0, 200, 255, 0.45))",
              duration: 0.45,
              ease: "sine.out",
            },
            1.05,
          );
        introTimeline.to(
          orderedBrainParts,
          {
            opacity: 1,
            filter: "brightness(1.35) drop-shadow(0 0 8px rgba(0, 200, 255, 0.35))",
            duration: 0.9,
            stagger: {
              each: 0.012,
              from: "start",
            },
            ease: "power2.out",
          },
          "brainEnergyStart",
        );
        if (strokeParts.length > 0) {
          introTimeline.to(
            strokeParts,
            {
              strokeDashoffset: 0,
              duration: 1.2,
              stagger: 0.025,
              ease: "power2.inOut",
            },
            "brainEnergyStart",
          );
        }
        introTimeline
          .to(
            orderedBrainNodes,
            {
              opacity: 1,
              scale: 1.08,
              filter: "brightness(1.85) drop-shadow(0 0 10px rgba(0, 220, 255, 0.62))",
              duration: 0.22,
              repeat: 1,
              yoyo: true,
              stagger: {
                each: 0.018,
                from: "start",
              },
              ease: "power2.inOut",
            },
            "brainEnergyStart+=0.25",
          )
          .to(
            orderedBrainNodes,
            {
              opacity: 1,
              scale: 1,
              filter: "brightness(1.12) drop-shadow(0 0 6px rgba(0, 200, 255, 0.24))",
              duration: 0.32,
              stagger: {
                each: 0.006,
                from: "end",
              },
              ease: "sine.out",
            },
            1.9,
          );
        [
          { targets: lightningBurstOne, position: 1.48, duration: 0.045 },
          { targets: lightningBurstTwo, position: 1.72, duration: 0.055 },
          { targets: lightningBurstPeak, position: 2.02, duration: 0.04 },
        ].forEach(({ targets, position, duration }) => {
          if (targets.length === 0) {
            return;
          }

          introTimeline.to(
            targets,
            {
              opacity: 1,
              filter: lightningGlow,
              duration,
              repeat: 1,
              yoyo: true,
              ease: "steps(1)",
            },
            position,
          );
        });
        introTimeline.to(
          brain,
          {
            filter: "brightness(1.08) drop-shadow(0 0 6px rgba(0, 200, 255, 0.22))",
            duration: 0.45,
            ease: "sine.out",
          },
          2.05,
        );
        introTimeline.to(
          orderedLightningCandidates,
          {
            opacity: 1,
            filter: "brightness(1.12) drop-shadow(0 0 5px rgba(0, 200, 255, 0.2))",
            duration: 0.22,
            ease: "sine.out",
          },
          2.18,
        );
        introTimeline
          .to(
            orderedTextLetters,
            {
              opacity: 1,
              y: 0,
              filter: textGlow,
              duration: 0.56,
              stagger: 0.085,
              ease: "power3.out",
            },
            2.46,
          )
          .to(
            orderedTextLetters,
            {
              opacity: 1,
              filter: textGlow,
              duration: 0.2,
              repeat: 1,
              yoyo: true,
              stagger: 0.055,
              ease: "sine.inOut",
            },
            3.06,
          )
          .to(
            orderedTextLetters,
            {
              opacity: 1,
              y: 0,
              filter: "brightness(1.05)",
              duration: 0.32,
              stagger: 0.035,
              ease: "sine.out",
            },
            3.38,
          );
        if (idleBrainNodes.length > 0) {
          idleTimeline
            .to(idleBrainNodes, {
              opacity: 1,
              scale: 1.045,
              filter: "brightness(1.42) drop-shadow(0 0 7px rgba(0, 220, 255, 0.32))",
              duration: 0.28,
              stagger: {
                each: 0.045,
                from: "start",
              },
              repeat: 1,
              yoyo: true,
            })
            .to(
              idleBrainNodes,
              {
                scale: 1,
                filter: "brightness(1.12) drop-shadow(0 0 5px rgba(0, 200, 255, 0.2))",
                duration: 0.35,
                stagger: {
                  each: 0.02,
                  from: "end",
                },
                ease: "sine.out",
              },
              ">-0.15",
            );
          introTimeline.add(() => idleTimeline.play(0), 3.55);
        }

        return () => {
          introTimeline.kill();
          idleTimeline.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className={cn(
        "animated-nite-logo mx-auto flex w-full items-center justify-center drop-shadow-[0_0_44px_rgb(51_212_255_/_0.22)] [&_svg]:h-auto [&_svg]:w-full",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: svgMarkup }}
    />
  );
}
