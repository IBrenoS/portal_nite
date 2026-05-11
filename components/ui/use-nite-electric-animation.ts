"use client";

import type { RefObject } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { validateNiteSvgContract } from "@/components/ui/validate-nite-svg-contract";

gsap.registerPlugin(useGSAP);

type SvgAnimatableElement = SVGGraphicsElement & {
  getTotalLength?: () => number;
};

type ScopedSelector = ReturnType<typeof gsap.utils.selector>;

type NiteLogoTargets = {
  logo: Element[];
  bulb: Element[];
  brain: Element[];
  text: Element[];
  energyOverlay: Element[];
  energyMainRisePaths: SvgAnimatableElement[];
  energyRoutePaths: SvgAnimatableElement[];
  energyRoutePrimaryPaths: SvgAnimatableElement[];
  energyRouteSecondaryPaths: SvgAnimatableElement[];
  energyRouteMicroPaths: SvgAnimatableElement[];
  electricArcPaths: SvgAnimatableElement[];
  electricArcJumpPaths: SvgAnimatableElement[];
  electricArcBranchPaths: SvgAnimatableElement[];
  electricArcMicroPaths: SvgAnimatableElement[];
  sparkHeads: SvgAnimatableElement[];
  textShimmerPaths: SvgAnimatableElement[];
  requiredTargets: Element[];
};

type NiteLogoAnimationState = NiteLogoTargets & {
  isCompactViewport: boolean;
  electricPathTargets: SvgAnimatableElement[];
  mainRisePathsByIgnitionOrder: SvgAnimatableElement[];
  bulbColdGlow: string;
  bulbFirstFlickerGlow: string;
  bulbIgnitionGlow: string;
  bulbStableGlow: string;
  mainRiseGlow: string;
  mainRisePeakGlow: string;
  mainRiseAfterglow: string;
  routePrimaryGlow: string;
  routeSecondaryGlow: string;
  routeMicroGlow: string;
  routeAfterglow: string;
  arcFlashGlow: string;
  arcAfterglow: string;
  sparkFlashGlow: string;
  sparkAfterglow: string;
  brainStormGlow: string;
  brainAfterglow: string;
  textAscensionGlow: string;
  textPeakMetalGlow: string;
  textPremiumGlow: string;
  textShimmerGlow: string;
  bulbIdleGlow: string;
  bulbIdlePulseGlow: string;
  brainIdleGlow: string;
  brainIdlePulseGlow: string;
  idleArcAfterglow: string;
  idleArcFlashGlow: string;
  idleSparkAfterglow: string;
  idleSparkFlashGlow: string;
};

const MAIN_RISE_IGNITION_ORDER = [
  "energy-main-rise-bulb-to-brain-primary",
  "energy-main-rise-bulb-to-brain-left",
  "energy-main-rise-bulb-to-brain-right",
] as const;

const TEXT_ASCENSION_START_AT = 2.18;
const TEXT_ASCENSION_GLOW_AT = 2.24;
const TEXT_ASCENSION_PEAK_AT = 2.42;
const TEXT_ASCENSION_DECAY_AT = 2.68;
const TEXT_SHIMMER_FADE_AT = 2.9;
const IDLE_CYCLE_DURATION = 6.7;
const IDLE_VIEWPORT_THRESHOLD = 0.12;
const SCROLL_SETTLE_DELAY_MS = 220;
const REDUCED_MOTION_TEXT_GLOW =
  "brightness(1.03) drop-shadow(0 0 6px rgba(125, 249, 255, 0.1))";

const MOBILE_SECONDARY_ROUTE_LIMIT = 3;
const MOBILE_MICRO_ROUTE_LIMIT = 2;
const MOBILE_INTRO_SPARK_INDEXES = [0, 2, 5, 8, 13] as const;

const clearLifecycleDataset = (rootElement: HTMLElement) => {
  delete rootElement.dataset.niteMotion;
  delete rootElement.dataset.niteViewport;
  delete rootElement.dataset.niteVisibility;
  delete rootElement.dataset.niteIntro;
  delete rootElement.dataset.niteIdle;
  delete rootElement.dataset.niteScroll;
};

const getScopedTargets = (q: ScopedSelector): NiteLogoTargets => ({
  logo: q("#nite-logo"),
  bulb: q("#bulb"),
  brain: q("#brain"),
  text: q("#text"),
  energyOverlay: q("#energy-overlay"),
  energyMainRisePaths: q(
    "#energy-main-rise path",
  ) as unknown as SvgAnimatableElement[],
  energyRoutePaths: q(
    "#energy-routes path",
  ) as unknown as SvgAnimatableElement[],
  energyRoutePrimaryPaths: q(
    '#energy-routes path[data-route="primary"]',
  ) as unknown as SvgAnimatableElement[],
  energyRouteSecondaryPaths: q(
    '#energy-routes path[data-route="secondary"]',
  ) as unknown as SvgAnimatableElement[],
  energyRouteMicroPaths: q(
    '#energy-routes path[data-route="micro"]',
  ) as unknown as SvgAnimatableElement[],
  electricArcPaths: q(
    "#electric-arcs path",
  ) as unknown as SvgAnimatableElement[],
  electricArcJumpPaths: q(
    '#electric-arcs path[data-arc="jump"]',
  ) as unknown as SvgAnimatableElement[],
  electricArcBranchPaths: q(
    '#electric-arcs path[data-arc="branch"]',
  ) as unknown as SvgAnimatableElement[],
  electricArcMicroPaths: q(
    '#electric-arcs path[data-arc="micro"]',
  ) as unknown as SvgAnimatableElement[],
  sparkHeads: q("#spark-heads circle") as unknown as SvgAnimatableElement[],
  textShimmerPaths: q(
    "#text-shimmer-mask path",
  ) as unknown as SvgAnimatableElement[],
  requiredTargets: [
    "#logo-final",
    "#nite-logo",
    "#brain",
    "#text",
    "#text-parte-1",
    "#text-parte-2",
    "#text-parte-3",
    "#text-parte-4",
    "#bulb",
  ].flatMap((selector) => q(selector)),
});

const getMainRisePathsByIgnitionOrder = (paths: SvgAnimatableElement[]) => {
  const pathsById = new Map(paths.map((path) => [path.id, path]));
  const orderedPaths = MAIN_RISE_IGNITION_ORDER.flatMap((id) => {
    const path = pathsById.get(id);

    return path ? [path] : [];
  });

  return [
    ...orderedPaths,
    ...paths.filter((path) => !orderedPaths.includes(path)),
  ];
};

const createAnimationState = (
  targets: NiteLogoTargets,
): NiteLogoAnimationState => {
  const isCompactViewport = window.matchMedia("(max-width: 640px)").matches;
  const electricPathTargets = [
    ...targets.energyMainRisePaths,
    ...targets.energyRoutePaths,
    ...targets.electricArcPaths,
    ...targets.textShimmerPaths,
  ];

  return {
    ...targets,
    isCompactViewport,
    electricPathTargets,
    mainRisePathsByIgnitionOrder: getMainRisePathsByIgnitionOrder(
      targets.energyMainRisePaths,
    ),
    bulbColdGlow: isCompactViewport
      ? "brightness(0.86) drop-shadow(0 0 4px rgba(125, 249, 255, 0.12))"
      : "brightness(0.82) drop-shadow(0 0 6px rgba(125, 249, 255, 0.14))",
    bulbFirstFlickerGlow: isCompactViewport
      ? "brightness(1.35) drop-shadow(0 0 10px rgba(236, 255, 255, 0.44)) drop-shadow(0 0 16px rgba(85, 220, 255, 0.24))"
      : "brightness(1.52) drop-shadow(0 0 13px rgba(236, 255, 255, 0.54)) drop-shadow(0 0 22px rgba(85, 220, 255, 0.34))",
    bulbIgnitionGlow: isCompactViewport
      ? "brightness(1.7) drop-shadow(0 0 12px rgba(255, 255, 255, 0.5)) drop-shadow(0 0 20px rgba(80, 220, 255, 0.46))"
      : "brightness(1.95) drop-shadow(0 0 16px rgba(255, 255, 255, 0.64)) drop-shadow(0 0 28px rgba(80, 220, 255, 0.58))",
    bulbStableGlow: isCompactViewport
      ? "brightness(1.16) drop-shadow(0 0 7px rgba(125, 249, 255, 0.24))"
      : "brightness(1.24) drop-shadow(0 0 10px rgba(125, 249, 255, 0.32))",
    mainRiseGlow: isCompactViewport
      ? "brightness(1.45) drop-shadow(0 0 8px rgba(125, 249, 255, 0.32))"
      : "brightness(1.72) drop-shadow(0 0 12px rgba(125, 249, 255, 0.44))",
    mainRisePeakGlow: isCompactViewport
      ? "brightness(1.75) drop-shadow(0 0 10px rgba(235, 255, 255, 0.42)) drop-shadow(0 0 18px rgba(56, 223, 255, 0.34))"
      : "brightness(2.05) drop-shadow(0 0 13px rgba(235, 255, 255, 0.52)) drop-shadow(0 0 24px rgba(56, 223, 255, 0.46))",
    mainRiseAfterglow: isCompactViewport
      ? "brightness(1.08) drop-shadow(0 0 5px rgba(125, 249, 255, 0.16))"
      : "brightness(1.14) drop-shadow(0 0 7px rgba(125, 249, 255, 0.22))",
    routePrimaryGlow: isCompactViewport
      ? "brightness(1.55) drop-shadow(0 0 7px rgba(125, 249, 255, 0.3))"
      : "brightness(1.82) drop-shadow(0 0 11px rgba(125, 249, 255, 0.44))",
    routeSecondaryGlow: isCompactViewport
      ? "brightness(1.4) drop-shadow(0 0 6px rgba(191, 255, 255, 0.24))"
      : "brightness(1.62) drop-shadow(0 0 9px rgba(191, 255, 255, 0.34))",
    routeMicroGlow: isCompactViewport
      ? "brightness(1.32) drop-shadow(0 0 4px rgba(239, 255, 255, 0.2))"
      : "brightness(1.48) drop-shadow(0 0 6px rgba(239, 255, 255, 0.28))",
    routeAfterglow: isCompactViewport
      ? "brightness(1.08) drop-shadow(0 0 4px rgba(125, 249, 255, 0.12))"
      : "brightness(1.12) drop-shadow(0 0 6px rgba(125, 249, 255, 0.18))",
    arcFlashGlow: isCompactViewport
      ? "brightness(1.8) drop-shadow(0 0 8px rgba(255, 255, 255, 0.36)) drop-shadow(0 0 12px rgba(125, 249, 255, 0.34))"
      : "brightness(2.28) drop-shadow(0 0 10px rgba(255, 255, 255, 0.5)) drop-shadow(0 0 17px rgba(125, 249, 255, 0.52))",
    arcAfterglow: isCompactViewport
      ? "brightness(1.1) drop-shadow(0 0 4px rgba(125, 249, 255, 0.14))"
      : "brightness(1.16) drop-shadow(0 0 5px rgba(125, 249, 255, 0.2))",
    sparkFlashGlow: isCompactViewport
      ? "brightness(1.7) drop-shadow(0 0 8px rgba(255, 255, 255, 0.36)) drop-shadow(0 0 14px rgba(125, 249, 255, 0.38))"
      : "brightness(2.05) drop-shadow(0 0 10px rgba(255, 255, 255, 0.48)) drop-shadow(0 0 18px rgba(125, 249, 255, 0.5))",
    sparkAfterglow: isCompactViewport
      ? "brightness(1.08) drop-shadow(0 0 4px rgba(125, 249, 255, 0.12))"
      : "brightness(1.14) drop-shadow(0 0 5px rgba(125, 249, 255, 0.18))",
    brainStormGlow: isCompactViewport
      ? "brightness(1.08) drop-shadow(0 0 8px rgba(125, 249, 255, 0.14))"
      : "brightness(1.12) drop-shadow(0 0 10px rgba(125, 249, 255, 0.18))",
    brainAfterglow: isCompactViewport
      ? "brightness(1.03) drop-shadow(0 0 4px rgba(125, 249, 255, 0.08))"
      : "brightness(1.05) drop-shadow(0 0 6px rgba(125, 249, 255, 0.12))",
    textAscensionGlow: isCompactViewport
      ? "brightness(1.1) contrast(1.02) drop-shadow(0 0 5px rgba(239, 255, 255, 0.14)) drop-shadow(0 0 9px rgba(125, 249, 255, 0.12))"
      : "brightness(1.14) contrast(1.03) drop-shadow(0 0 7px rgba(239, 255, 255, 0.18)) drop-shadow(0 0 13px rgba(125, 249, 255, 0.16))",
    textPeakMetalGlow: isCompactViewport
      ? "brightness(1.18) contrast(1.05) drop-shadow(0 0 7px rgba(245, 255, 255, 0.18)) drop-shadow(0 0 12px rgba(125, 249, 255, 0.18))"
      : "brightness(1.24) contrast(1.06) drop-shadow(0 0 9px rgba(245, 255, 255, 0.23)) drop-shadow(0 0 18px rgba(125, 249, 255, 0.22))",
    textPremiumGlow: isCompactViewport
      ? "brightness(1.035) contrast(1.01) drop-shadow(0 0 4px rgba(125, 249, 255, 0.08))"
      : "brightness(1.05) contrast(1.015) drop-shadow(0 0 7px rgba(125, 249, 255, 0.1))",
    textShimmerGlow: isCompactViewport
      ? "brightness(1.22) drop-shadow(0 0 5px rgba(239, 255, 255, 0.2)) drop-shadow(0 0 10px rgba(125, 249, 255, 0.18))"
      : "brightness(1.34) drop-shadow(0 0 7px rgba(239, 255, 255, 0.26)) drop-shadow(0 0 14px rgba(125, 249, 255, 0.22))",
    bulbIdleGlow: isCompactViewport
      ? "brightness(1.08) drop-shadow(0 0 5px rgba(125, 249, 255, 0.14))"
      : "brightness(1.1) drop-shadow(0 0 7px rgba(125, 249, 255, 0.16))",
    bulbIdlePulseGlow: isCompactViewport
      ? "brightness(1.14) drop-shadow(0 0 7px rgba(125, 249, 255, 0.18))"
      : "brightness(1.16) drop-shadow(0 0 10px rgba(125, 249, 255, 0.2))",
    brainIdleGlow: isCompactViewport
      ? "brightness(1.025) drop-shadow(0 0 4px rgba(125, 249, 255, 0.07))"
      : "brightness(1.035) drop-shadow(0 0 6px rgba(125, 249, 255, 0.09))",
    brainIdlePulseGlow: isCompactViewport
      ? "brightness(1.055) drop-shadow(0 0 6px rgba(125, 249, 255, 0.1))"
      : "brightness(1.07) drop-shadow(0 0 8px rgba(125, 249, 255, 0.12))",
    idleArcAfterglow: isCompactViewport
      ? "brightness(1.06) drop-shadow(0 0 3px rgba(125, 249, 255, 0.08))"
      : "brightness(1.08) drop-shadow(0 0 4px rgba(125, 249, 255, 0.1))",
    idleArcFlashGlow: isCompactViewport
      ? "brightness(1.35) drop-shadow(0 0 5px rgba(239, 255, 255, 0.2)) drop-shadow(0 0 8px rgba(125, 249, 255, 0.18))"
      : "brightness(1.48) drop-shadow(0 0 6px rgba(239, 255, 255, 0.24)) drop-shadow(0 0 11px rgba(125, 249, 255, 0.22))",
    idleSparkAfterglow: isCompactViewport
      ? "brightness(1.04) drop-shadow(0 0 3px rgba(125, 249, 255, 0.07))"
      : "brightness(1.06) drop-shadow(0 0 4px rgba(125, 249, 255, 0.09))",
    idleSparkFlashGlow: isCompactViewport
      ? "brightness(1.28) drop-shadow(0 0 5px rgba(239, 255, 255, 0.18)) drop-shadow(0 0 8px rgba(125, 249, 255, 0.18))"
      : "brightness(1.38) drop-shadow(0 0 6px rgba(239, 255, 255, 0.22)) drop-shadow(0 0 10px rgba(125, 249, 255, 0.2))",
  };
};

const setPathDashToHidden = (paths: SvgAnimatableElement[]) => {
  paths.forEach((path) => {
    const length = Math.max(path.getTotalLength?.() ?? 1, 1);

    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });
  });
};

const keepElectricBrainLayersHidden = (state: NiteLogoAnimationState) => {
  gsap.set(
    [...state.energyRoutePaths, ...state.electricArcPaths, ...state.sparkHeads],
    {
      opacity: 0,
    },
  );
  gsap.set(state.sparkHeads, {
    scale: 0,
    transformBox: "fill-box",
    transformOrigin: "50% 50%",
  });
};

const keepTextShimmerHidden = (state: NiteLogoAnimationState) => {
  gsap.set(state.textShimmerPaths, { opacity: 0 });
};

const pickTargets = <Target>(targets: Target[], indexes: number[]) =>
  indexes.flatMap((index) => {
    const target = targets[index];

    return target ? [target] : [];
  });

const setupReducedMotionState = (targets: NiteLogoTargets) => {
  const electricPathTargets = [
    ...targets.energyMainRisePaths,
    ...targets.energyRoutePaths,
    ...targets.electricArcPaths,
    ...targets.textShimmerPaths,
  ];

  gsap.set(targets.requiredTargets, { opacity: 1 });
  gsap.set(targets.logo, { opacity: 1, scale: 1, x: 0, y: 0 });
  gsap.set(targets.bulb, {
    opacity: 1,
    scale: 1,
    x: 0,
    y: 0,
    filter: "brightness(1.08) drop-shadow(0 0 8px rgba(125, 249, 255, 0.18))",
    transformBox: "fill-box",
    transformOrigin: "50% 50%",
  });
  gsap.set(targets.brain, { opacity: 1, clearProps: "filter" });
  gsap.set(targets.text, {
    opacity: 1,
    scale: 1,
    x: 0,
    y: 0,
    filter: REDUCED_MOTION_TEXT_GLOW,
    transformBox: "fill-box",
    transformOrigin: "50% 50%",
  });
  gsap.set(
    [...targets.energyOverlay, ...electricPathTargets, ...targets.sparkHeads],
    { opacity: 0 },
  );
  gsap.set(targets.sparkHeads, {
    scale: 0,
    transformBox: "fill-box",
    transformOrigin: "50% 50%",
  });
  setPathDashToHidden(electricPathTargets);
};

const setupInitialState = (state: NiteLogoAnimationState) => {
  gsap.set(state.logo, { opacity: 1, scale: 1, x: 0, y: 0 });
  gsap.set(state.brain, { opacity: 1, clearProps: "filter" });
  gsap.set(state.text, {
    opacity: 1,
    scale: 1,
    x: 0,
    y: 0,
    clearProps: "filter",
    transformBox: "fill-box",
    transformOrigin: "50% 50%",
  });
  gsap.set(state.bulb, {
    opacity: 1,
    scale: 1,
    x: 0,
    y: 0,
    filter: state.bulbColdGlow,
    transformBox: "fill-box",
    transformOrigin: "50% 50%",
  });
  gsap.set(state.energyOverlay, { opacity: 0 });
  gsap.set(state.electricPathTargets, { opacity: 0 });
  keepElectricBrainLayersHidden(state);
  keepTextShimmerHidden(state);
  setPathDashToHidden(state.electricPathTargets);
};

const buildIntroTimeline = (state: NiteLogoAnimationState) => {
  const introTimeline = gsap.timeline({
    defaults: { ease: "none" },
  });

  const [primaryRise, leftRise, rightRise, ...extraRisePaths] =
    state.mainRisePathsByIgnitionOrder;
  const introSecondaryRoutePaths = state.isCompactViewport
    ? state.energyRouteSecondaryPaths.slice(0, MOBILE_SECONDARY_ROUTE_LIMIT)
    : state.energyRouteSecondaryPaths;
  const introMicroRoutePaths = state.isCompactViewport
    ? state.energyRouteMicroPaths.slice(0, MOBILE_MICRO_ROUTE_LIMIT)
    : state.energyRouteMicroPaths;
  const introArcGroups = state.isCompactViewport
    ? [
        {
          targets: state.electricArcJumpPaths.slice(0, 1),
          position: 1.5,
          duration: 0.055,
        },
        {
          targets: state.electricArcBranchPaths.slice(0, 1),
          position: 1.63,
          duration: 0.06,
        },
      ]
    : [
        {
          targets: state.electricArcJumpPaths,
          position: 1.48,
          duration: 0.055,
        },
        {
          targets: state.electricArcBranchPaths,
          position: 1.58,
          duration: 0.065,
        },
        {
          targets: state.electricArcMicroPaths,
          position: 1.68,
          duration: 0.05,
        },
      ];
  const introArcPaths = introArcGroups.flatMap(({ targets }) => targets);
  const introSparkHeads = state.isCompactViewport
    ? pickTargets(state.sparkHeads, [...MOBILE_INTRO_SPARK_INDEXES])
    : state.sparkHeads;
  const introRouteAfterglowPaths = state.isCompactViewport
    ? [
        ...state.energyRoutePrimaryPaths,
        ...introSecondaryRoutePaths,
        ...introMicroRoutePaths,
      ]
    : state.energyRoutePaths;

  keepElectricBrainLayersHidden(state);
  keepTextShimmerHidden(state);

  introTimeline
    .to(
      state.bulb,
      {
        filter: state.bulbFirstFlickerGlow,
        scale: 1.006,
        duration: 0.045,
        ease: "steps(2)",
      },
      0.15,
    )
    .to(
      state.bulb,
      {
        filter: state.bulbColdGlow,
        scale: 1,
        duration: 0.05,
        ease: "steps(1)",
      },
      0.205,
    )
    .to(
      state.bulb,
      {
        filter: state.bulbIgnitionGlow,
        scale: 1.018,
        duration: 0.065,
        ease: "steps(2)",
      },
      0.28,
    )
    .to(
      state.bulb,
      {
        filter: state.bulbFirstFlickerGlow,
        scale: 1.004,
        duration: 0.055,
        ease: "sine.out",
      },
      0.345,
    )
    .to(
      state.bulb,
      {
        filter: state.bulbIgnitionGlow,
        scale: 1.012,
        duration: 0.045,
        ease: "steps(2)",
      },
      0.39,
    )
    .to(
      state.bulb,
      {
        filter: state.bulbStableGlow,
        scale: 1,
        duration: 0.42,
        ease: "sine.out",
      },
      0.455,
    )
    .to(
      state.energyOverlay,
      {
        opacity: 1,
        duration: 0.055,
        ease: "sine.out",
      },
      0.4,
    );

  [
    {
      target: primaryRise,
      position: 0.42,
      opacity: 1,
      duration: 0.44,
      ease: "power4.out",
    },
    {
      target: leftRise,
      position: 0.485,
      opacity: 0.78,
      duration: 0.34,
      ease: "power3.out",
    },
    {
      target: rightRise,
      position: 0.525,
      opacity: 0.72,
      duration: 0.3,
      ease: "expo.out",
    },
  ].forEach(({ target, position, opacity, duration, ease }) => {
    if (!target) {
      return;
    }

    introTimeline.to(
      target,
      {
        opacity,
        strokeDashoffset: 0,
        filter: state.mainRiseGlow,
        duration,
        ease,
      },
      position,
    );
  });

  if (extraRisePaths.length > 0) {
    introTimeline.to(
      extraRisePaths,
      {
        opacity: 0.62,
        strokeDashoffset: 0,
        filter: state.mainRiseGlow,
        duration: 0.32,
        stagger: 0.035,
        ease: "power3.out",
      },
      0.55,
    );
  }

  introTimeline
    .to(
      state.energyMainRisePaths,
      {
        opacity: (index) => (index === 0 ? 1 : 0.82),
        filter: state.mainRisePeakGlow,
        duration: 0.052,
        repeat: 1,
        yoyo: true,
        stagger: {
          each: 0.035,
          from: "start",
        },
        ease: "steps(2)",
      },
      0.66,
    )
    .to(
      state.energyMainRisePaths,
      {
        opacity: 0.28,
        filter: state.mainRiseAfterglow,
        duration: 0.46,
        stagger: {
          each: 0.025,
          from: "end",
        },
        ease: "sine.out",
      },
      0.82,
    );

  introTimeline
    .to(
      state.energyRoutePrimaryPaths,
      {
        opacity: 1,
        strokeDashoffset: 0,
        filter: state.routePrimaryGlow,
        duration: 0.34,
        stagger: {
          each: 0.045,
          from: "start",
        },
        ease: "power4.out",
      },
      1.02,
    )
    .to(
      introSecondaryRoutePaths,
      {
        opacity: 0.82,
        strokeDashoffset: 0,
        filter: state.routeSecondaryGlow,
        duration: 0.3,
        stagger: {
          each: 0.04,
          from: "start",
        },
        ease: "power3.out",
      },
      1.18,
    )
    .to(
      introMicroRoutePaths,
      {
        opacity: 0.68,
        strokeDashoffset: 0,
        filter: state.routeMicroGlow,
        duration: 0.2,
        stagger: {
          each: 0.028,
          from: "start",
        },
        ease: "expo.out",
      },
      1.35,
    )
    .to(
      state.brain,
      {
        filter: state.brainStormGlow,
        duration: 0.28,
        ease: "power2.out",
      },
      1.44,
    );

  introArcGroups.forEach(({ targets, position, duration }) => {
    if (targets.length === 0) {
      return;
    }

    introTimeline.to(
      targets,
      {
        opacity: 1,
        strokeDashoffset: 0,
        filter: state.arcFlashGlow,
        duration,
        repeat: 1,
        yoyo: true,
        stagger: {
          each: 0.045,
          from: "start",
        },
        ease: "steps(2)",
      },
      position,
    );
  });

  introTimeline
    .to(
      introSparkHeads,
      {
        opacity: 1,
        scale: 1,
        filter: state.sparkFlashGlow,
        duration: 0.1,
        stagger: {
          each: 0.032,
          from: "start",
        },
        ease: "expo.out",
      },
      1.72,
    )
    .to(
      introSparkHeads,
      {
        opacity: 0.24,
        scale: 0.64,
        filter: state.sparkAfterglow,
        duration: 0.48,
        stagger: {
          each: 0.018,
          from: "end",
        },
        ease: "power2.out",
      },
      1.98,
    )
    .to(
      [...introRouteAfterglowPaths, ...introArcPaths],
      {
        opacity: 0.24,
        filter: state.routeAfterglow,
        duration: 0.5,
        stagger: {
          each: 0.012,
          from: "end",
        },
        ease: "sine.out",
      },
      2.08,
    )
    .to(
      introArcPaths,
      {
        opacity: 0.12,
        filter: state.arcAfterglow,
        duration: 0.22,
        ease: "sine.out",
      },
      2.42,
    )
    .to(
      state.brain,
      {
        filter: state.brainAfterglow,
        duration: 0.42,
        ease: "sine.out",
      },
      2.12,
    )
    .to(
      state.textShimmerPaths,
      {
        opacity: (index) => (index === 0 ? 0.92 : 0.62),
        strokeDashoffset: 0,
        filter: state.textShimmerGlow,
        duration: 0.56,
        stagger: {
          each: 0.07,
          from: "start",
        },
        ease: "power3.inOut",
      },
      TEXT_ASCENSION_START_AT,
    )
    .to(
      state.text,
      {
        filter: state.textAscensionGlow,
        y: state.isCompactViewport ? -0.5 : -0.8,
        duration: 0.22,
        ease: "power2.out",
      },
      TEXT_ASCENSION_GLOW_AT,
    )
    .to(
      state.text,
      {
        filter: state.textPeakMetalGlow,
        scale: state.isCompactViewport ? 1.001 : 1.002,
        y: state.isCompactViewport ? -0.8 : -1.2,
        duration: 0.26,
        ease: "power2.out",
      },
      TEXT_ASCENSION_PEAK_AT,
    )
    .to(
      state.text,
      {
        filter: state.textPremiumGlow,
        scale: 1,
        y: 0,
        duration: 0.74,
        ease: "power2.out",
      },
      TEXT_ASCENSION_DECAY_AT,
    )
    .to(
      state.textShimmerPaths,
      {
        opacity: 0,
        duration: 0.34,
        stagger: {
          each: 0.04,
          from: "end",
        },
        ease: "sine.out",
      },
      TEXT_SHIMMER_FADE_AT,
    );

  return introTimeline;
};

const buildIdleTimeline = (state: NiteLogoAnimationState) => {
  const idleArcSetA = [
    ...state.electricArcJumpPaths.slice(0, 1),
    ...state.electricArcBranchPaths.slice(0, 1),
  ].slice(0, 2);
  const idleArcSetB = [
    ...state.electricArcMicroPaths.slice(0, 1),
    ...state.electricArcBranchPaths.slice(1, 2),
  ].slice(0, 2);
  const idleSparkSetA = state.isCompactViewport
    ? pickTargets(state.sparkHeads, [1, 10])
    : pickTargets(state.sparkHeads, [1, 6, 10]);
  const idleSparkSetB = state.isCompactViewport
    ? pickTargets(state.sparkHeads, [3, 12])
    : pickTargets(state.sparkHeads, [3, 12]);
  const idleTimeline = gsap.timeline({
    paused: true,
    repeat: -1,
    defaults: { ease: "sine.inOut" },
  });

  idleTimeline
    .set(state.electricArcPaths, {
      opacity: 0.04,
      filter: state.idleArcAfterglow,
    })
    .set(state.sparkHeads, {
      opacity: state.isCompactViewport ? 0.08 : 0.12,
      scale: state.isCompactViewport ? 0.42 : 0.48,
      filter: state.idleSparkAfterglow,
      transformBox: "fill-box",
      transformOrigin: "50% 50%",
    })
    .set(state.textShimmerPaths, { opacity: 0 })
    .to(
      state.bulb,
      {
        filter: state.bulbIdleGlow,
        duration: 0.38,
      },
      0,
    )
    .to(
      state.brain,
      {
        filter: state.brainIdleGlow,
        duration: 0.38,
      },
      0,
    )
    .to(
      state.bulb,
      {
        filter: state.bulbIdlePulseGlow,
        duration: 2.45,
        repeat: 1,
        yoyo: true,
        ease: "sine.inOut",
      },
      0.35,
    )
    .to(
      state.brain,
      {
        filter: state.brainIdlePulseGlow,
        duration: 2.7,
        repeat: 1,
        yoyo: true,
        ease: "sine.inOut",
      },
      0.18,
    );

  if (idleArcSetA.length > 0) {
    idleTimeline.to(
      idleArcSetA,
      {
        opacity: 0.42,
        filter: state.idleArcFlashGlow,
        duration: 0.07,
        repeat: 1,
        yoyo: true,
        stagger: {
          each: 0.08,
          from: "start",
        },
        ease: "steps(2)",
      },
      1.32,
    );
  }

  if (idleSparkSetA.length > 0) {
    idleTimeline.to(
      idleSparkSetA,
      {
        opacity: 0.36,
        scale: 0.72,
        filter: state.idleSparkFlashGlow,
        duration: 0.11,
        repeat: 1,
        yoyo: true,
        stagger: {
          each: 0.06,
          from: "start",
        },
        ease: "expo.out",
      },
      1.46,
    );
  }

  if (idleArcSetB.length > 0) {
    idleTimeline.to(
      idleArcSetB,
      {
        opacity: 0.34,
        filter: state.idleArcFlashGlow,
        duration: 0.065,
        repeat: 1,
        yoyo: true,
        stagger: {
          each: 0.12,
          from: "end",
        },
        ease: "steps(2)",
      },
      4.5,
    );
  }

  if (idleSparkSetB.length > 0) {
    idleTimeline.to(
      idleSparkSetB,
      {
        opacity: 0.3,
        scale: 0.66,
        filter: state.idleSparkFlashGlow,
        duration: 0.1,
        repeat: 1,
        yoyo: true,
        stagger: {
          each: 0.08,
          from: "end",
        },
        ease: "expo.out",
      },
      4.72,
    );
  }

  idleTimeline.to({}, { duration: 0.01 }, IDLE_CYCLE_DURATION);

  return idleTimeline;
};

export function useNiteElectricAnimation(
  containerRef: RefObject<HTMLDivElement | null>,
) {
  useGSAP(
    () => {
      const rootElement = containerRef.current;

      if (!rootElement) {
        throw new Error("[NITE SVG] Missing animation container.");
      }

      const svgContractCounts = validateNiteSvgContract(rootElement);

      if (process.env.NODE_ENV === "development") {
        console.info(
          "[NITE SVG] Cinematic electric contract validated",
          svgContractCounts,
        );
      }

      const q = gsap.utils.selector(containerRef);
      const targets = getScopedTargets(q);
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        setupReducedMotionState(targets);
        rootElement.dataset.niteMotion = "reduced";
        rootElement.dataset.niteViewport = "not-observed";
        rootElement.dataset.niteVisibility = document.hidden
          ? "hidden"
          : "visible";
        rootElement.dataset.niteIntro = "static";
        rootElement.dataset.niteIdle = "disabled";

        return () => clearLifecycleDataset(rootElement);
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const state = createAnimationState(targets);

        setupInitialState(state);
        const introTimeline = buildIntroTimeline(state);
        const idleTimeline = buildIdleTimeline(state);
        let introComplete = false;
        let idleHasStarted = false;
        let isLogoInViewport = true;
        let isScrollActive = false;
        let scrollResumeTimeout: number | null = null;
        let wasIntroPlayingBeforeHidden = false;
        let wasIdlePlayingBeforeHidden = false;
        let wasIntroPlayingBeforeScroll = false;
        let wasIdlePlayingBeforeScroll = false;

        const updateLifecycleDataset = () => {
          rootElement.dataset.niteMotion = "no-preference";
          rootElement.dataset.niteViewport = isLogoInViewport
            ? "visible"
            : "hidden";
          rootElement.dataset.niteVisibility = document.hidden
            ? "hidden"
            : "visible";
          rootElement.dataset.niteIntro = introComplete
            ? "complete"
            : introTimeline.paused()
              ? "paused"
              : "running";
          rootElement.dataset.niteIdle = !introComplete
            ? "waiting"
            : idleTimeline.paused()
              ? "paused"
              : "running";
          rootElement.dataset.niteScroll = isScrollActive ? "active" : "idle";
        };

        const canRunIntro = () =>
          !introComplete &&
          isLogoInViewport &&
          !document.hidden &&
          !isScrollActive;

        const canRunIdle = () =>
          introComplete &&
          isLogoInViewport &&
          !document.hidden &&
          !isScrollActive;

        const pauseIntro = () => {
          if (!introComplete) {
            introTimeline.pause();
          }

          updateLifecycleDataset();
        };

        const resumeIntro = () => {
          if (!canRunIntro()) {
            updateLifecycleDataset();
            return;
          }

          introTimeline.resume();
          updateLifecycleDataset();
        };

        const pauseIdle = () => {
          idleTimeline.pause();
          updateLifecycleDataset();
        };

        const resumeIdle = () => {
          if (!canRunIdle()) {
            updateLifecycleDataset();
            return;
          }

          if (!idleHasStarted) {
            idleHasStarted = true;
            idleTimeline.play(0);
          } else {
            idleTimeline.resume();
          }

          updateLifecycleDataset();
        };

        const handleScrollActivity = () => {
          if (document.hidden) {
            updateLifecycleDataset();
            return;
          }

          if (!isScrollActive) {
            wasIntroPlayingBeforeScroll =
              !introComplete && !introTimeline.paused();
            wasIdlePlayingBeforeScroll =
              introComplete && !idleTimeline.paused();
            isScrollActive = true;
            introTimeline.pause();
            idleTimeline.pause();
            updateLifecycleDataset();
          }

          if (scrollResumeTimeout) {
            window.clearTimeout(scrollResumeTimeout);
          }

          scrollResumeTimeout = window.setTimeout(() => {
            isScrollActive = false;

            if (
              !introComplete &&
              (wasIntroPlayingBeforeScroll || canRunIntro())
            ) {
              resumeIntro();
            } else if (
              introComplete &&
              (wasIdlePlayingBeforeScroll || canRunIdle())
            ) {
              resumeIdle();
            } else {
              updateLifecycleDataset();
            }

            wasIntroPlayingBeforeScroll = false;
            wasIdlePlayingBeforeScroll = false;
            scrollResumeTimeout = null;
          }, SCROLL_SETTLE_DELAY_MS);
        };

        const handleVisibilityChange = () => {
          if (document.hidden) {
            wasIntroPlayingBeforeHidden =
              !introComplete && !introTimeline.paused();
            wasIdlePlayingBeforeHidden =
              introComplete && !idleTimeline.paused();
            introTimeline.pause();
            idleTimeline.pause();
            updateLifecycleDataset();
            return;
          }

          if (
            !introComplete &&
            (wasIntroPlayingBeforeHidden || canRunIntro())
          ) {
            introTimeline.resume();
          }

          if (introComplete && (wasIdlePlayingBeforeHidden || canRunIdle())) {
            resumeIdle();
          } else {
            updateLifecycleDataset();
          }

          wasIntroPlayingBeforeHidden = false;
          wasIdlePlayingBeforeHidden = false;
        };

        introTimeline.eventCallback("onComplete", () => {
          introComplete = true;
          resumeIdle();
        });

        let viewportObserver: IntersectionObserver | null = null;

        if ("IntersectionObserver" in window) {
          viewportObserver = new IntersectionObserver(
            ([entry]) => {
              isLogoInViewport = Boolean(
                entry?.isIntersecting &&
                entry.intersectionRatio >= IDLE_VIEWPORT_THRESHOLD,
              );

              if (isLogoInViewport) {
                if (introComplete) {
                  resumeIdle();
                } else {
                  resumeIntro();
                }
              } else {
                if (introComplete) {
                  pauseIdle();
                } else {
                  pauseIntro();
                }
              }
            },
            {
              root: null,
              rootMargin: "0px",
              threshold: [0, IDLE_VIEWPORT_THRESHOLD],
            },
          );
          viewportObserver.observe(rootElement);
        }

        document.addEventListener("visibilitychange", handleVisibilityChange);
        window.addEventListener("wheel", handleScrollActivity, {
          passive: true,
        });
        window.addEventListener("touchmove", handleScrollActivity, {
          passive: true,
        });
        window.addEventListener("scroll", handleScrollActivity, {
          passive: true,
        });
        handleVisibilityChange();
        updateLifecycleDataset();

        return () => {
          if (scrollResumeTimeout) {
            window.clearTimeout(scrollResumeTimeout);
          }

          viewportObserver?.disconnect();
          document.removeEventListener(
            "visibilitychange",
            handleVisibilityChange,
          );
          window.removeEventListener("wheel", handleScrollActivity);
          window.removeEventListener("touchmove", handleScrollActivity);
          window.removeEventListener("scroll", handleScrollActivity);
          clearLifecycleDataset(rootElement);
          introTimeline.kill();
          idleTimeline.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: containerRef },
  );
}
