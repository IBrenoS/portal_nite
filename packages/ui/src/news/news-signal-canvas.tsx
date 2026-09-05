"use client";

import { useEffect, useRef } from "react";

import { THEME_CHANGE_EVENT } from "../portal/theme";
import { cn } from "../utils";

type SignalPoint = {
  x: number;
  y: number;
};

type SignalDustPoint = SignalPoint & {
  alpha: number;
  fadeDurationMs: number;
  phase: "fading-in" | "fading-out" | "visible";
  radius: number;
  randomState: number;
  targetAlpha: number;
  transitionAtMs: number;
};

type SignalOrbit = {
  centerX: number;
  centerY: number;
  durationMs: number;
  lineWidth: number;
  opacity: number;
  phase: number;
  pulseCount: number;
  radius: number;
  trailLength: number;
};

type SignalPalette = {
  background: string;
  dust: string;
  node: string;
  orbit: string;
  pulse: string;
};

type SignalMotionProfile = {
  currentSpeed: number;
  durationMs: number;
  nextSpeedChangeMs: number;
  orbitIndex: number;
  progress: number;
  randomState: number;
  targetSpeed: number;
};

const FRAME_INTERVAL_MS = 1000 / 30;
const TRAIL_SEGMENTS = 20;
const INTERSECTION_THRESHOLD = 0.08;
const ORBIT_COUNT = 10;
const INITIAL_ORBIT_RADIUS = 150;
const INITIAL_ORBIT_GAP = 127.5;
const ORBIT_GAP_MULTIPLIER = 1.1;
const ORBIT_DURATION_MS = 42_000;
const MIN_SIGNAL_SPEED = 0.65;
const MAX_SIGNAL_SPEED = 1.45;
const SPEED_CHANGE_MIN_MS = 3_500;
const SPEED_CHANGE_RANGE_MS = 5_500;
const INITIAL_SPEED_LEVELS = [0.68, 0.82, 1, 1.18, 1.42] as const;

function normalizedProgress(value: number) {
  return ((value % 1) + 1) % 1;
}

export function createSignalOrbitLayout(
  width: number,
  height: number,
): SignalOrbit[] {
  let radius = INITIAL_ORBIT_RADIUS;
  let radiusGap = INITIAL_ORBIT_GAP;

  return Array.from({ length: ORBIT_COUNT }, (_, index) => {
    const orbit: SignalOrbit = {
      centerX: width / 2,
      centerY: height * 1.25,
      durationMs: ORBIT_DURATION_MS,
      lineWidth: 1,
      opacity: 1,
      phase: normalizedProgress(0.12 + index * 0.137),
      pulseCount: 1,
      radius,
      trailLength: 0.05,
    };

    radius = Number((radius + radiusGap).toFixed(12));
    radiusGap = Number((radiusGap * ORBIT_GAP_MULTIPLIER).toFixed(12));

    return orbit;
  });
}

export function getSignalPoint(
  orbit: SignalOrbit,
  progress: number,
): SignalPoint {
  const angle = Math.PI + normalizedProgress(progress) * Math.PI;

  return {
    x: orbit.centerX + Math.cos(angle) * orbit.radius,
    y: orbit.centerY + Math.sin(angle) * orbit.radius,
  };
}

function nextSignalRandom(state: number) {
  const nextState = (state + 0x6d2b79f5) >>> 0;
  let next = nextState;
  next = Math.imul(next ^ (next >>> 15), next | 1);
  next ^= next + Math.imul(next ^ (next >>> 7), next | 61);

  return {
    state: nextState,
    value: ((next ^ (next >>> 14)) >>> 0) / 4_294_967_296,
  };
}

function createSeededRandom(seed: number) {
  let state = seed >>> 0;

  return () => {
    const result = nextSignalRandom(state);
    state = result.state;
    return result.value;
  };
}

function nextProfileRandom(profile: SignalMotionProfile) {
  const result = nextSignalRandom(profile.randomState);
  profile.randomState = result.state;
  return result.value;
}

function nextDustRandom(point: SignalDustPoint) {
  const result = nextSignalRandom(point.randomState);
  point.randomState = result.state;
  return result.value;
}

export function createSignalMotionProfiles(
  orbits: SignalOrbit[],
  seed: number,
): SignalMotionProfile[] {
  const random = createSeededRandom(seed);
  const pulseCount = orbits.reduce(
    (total, orbit) => total + orbit.pulseCount,
    0,
  );
  const speeds = Array.from(
    { length: pulseCount },
    (_, index) => INITIAL_SPEED_LEVELS[index % INITIAL_SPEED_LEVELS.length],
  );

  for (let index = speeds.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [speeds[index], speeds[swapIndex]] = [speeds[swapIndex], speeds[index]];
  }

  let profileIndex = 0;
  return orbits.flatMap((orbit, orbitIndex) =>
    Array.from({ length: orbit.pulseCount }, (_, pulseIndex) => {
      const currentSpeed = speeds[profileIndex] ?? 1;
      profileIndex += 1;

      return {
        currentSpeed,
        durationMs: orbit.durationMs,
        nextSpeedChangeMs:
          SPEED_CHANGE_MIN_MS + random() * SPEED_CHANGE_RANGE_MS,
        orbitIndex,
        progress: normalizedProgress(
          orbit.phase + pulseIndex / orbit.pulseCount,
        ),
        randomState: Math.floor(random() * 4_294_967_295),
        targetSpeed: currentSpeed,
      };
    }),
  );
}

export function advanceSignalMotion(
  profile: SignalMotionProfile,
  deltaMs: number,
  elapsedMs: number,
) {
  if (elapsedMs >= profile.nextSpeedChangeMs) {
    let targetSpeed =
      MIN_SIGNAL_SPEED +
      nextProfileRandom(profile) * (MAX_SIGNAL_SPEED - MIN_SIGNAL_SPEED);

    if (Math.abs(targetSpeed - profile.targetSpeed) < 0.1) {
      targetSpeed += targetSpeed < 1.05 ? 0.18 : -0.18;
    }

    profile.targetSpeed = Math.min(
      MAX_SIGNAL_SPEED,
      Math.max(MIN_SIGNAL_SPEED, targetSpeed),
    );
    profile.nextSpeedChangeMs =
      elapsedMs +
      SPEED_CHANGE_MIN_MS +
      nextProfileRandom(profile) * SPEED_CHANGE_RANGE_MS;
  }

  const easing = 1 - Math.exp(-deltaMs / 1_200);
  profile.currentSpeed += (profile.targetSpeed - profile.currentSpeed) * easing;
  profile.progress = normalizedProgress(
    profile.progress + (deltaMs / profile.durationMs) * profile.currentSpeed,
  );
}

export function createSignalDust(
  width: number,
  height: number,
  count: number,
  seed = Math.round(width * 31 + height * 17 + count * 13),
): SignalDustPoint[] {
  const random = createSeededRandom(seed);

  return Array.from({ length: count }, () => {
    const targetAlpha = 0.08 + random() * 0.2;

    return {
      alpha: targetAlpha,
      fadeDurationMs: 1_400 + random() * 2_400,
      phase: "visible" as const,
      radius: 0.35 + random() * 0.85,
      randomState: Math.floor(random() * 4_294_967_295),
      targetAlpha,
      transitionAtMs: 1_500 + random() * 8_500,
      x: random() * width,
      y: random() * height * 0.88,
    };
  });
}

export function advanceSignalDust(
  points: SignalDustPoint[],
  width: number,
  height: number,
  deltaMs: number,
  elapsedMs: number,
) {
  for (const point of points) {
    if (point.phase === "visible" && elapsedMs >= point.transitionAtMs) {
      point.phase = "fading-out";
      point.fadeDurationMs = 1_400 + nextDustRandom(point) * 2_400;
    }

    if (point.phase === "fading-out") {
      point.alpha = Math.max(
        0,
        point.alpha - (0.32 * deltaMs) / point.fadeDurationMs,
      );

      if (point.alpha === 0) {
        point.x = nextDustRandom(point) * width;
        point.y = nextDustRandom(point) * height * 0.88;
        point.radius = 0.35 + nextDustRandom(point) * 0.85;
        point.targetAlpha = 0.08 + nextDustRandom(point) * 0.2;
        point.fadeDurationMs = 1_600 + nextDustRandom(point) * 2_800;
        point.phase = "fading-in";
      }
    } else if (point.phase === "fading-in") {
      point.alpha = Math.min(
        point.targetAlpha,
        point.alpha + (point.targetAlpha * deltaMs) / point.fadeDurationMs,
      );

      if (point.alpha === point.targetAlpha) {
        point.phase = "visible";
        point.transitionAtMs =
          elapsedMs + 1_800 + nextDustRandom(point) * 8_200;
      }
    }
  }
}

function readSignalColor(
  root: HTMLElement,
  propertyName: string,
  fallback: string,
) {
  return (
    getComputedStyle(root).getPropertyValue(propertyName).trim() || fallback
  );
}

function resolveSignalPalette(root: HTMLElement): SignalPalette {
  return {
    background: readSignalColor(
      root,
      "--news-hero-canvas-background",
      "#09090a",
    ),
    dust: readSignalColor(root, "--news-hero-dust-color", "#93c5fd"),
    node: readSignalColor(root, "--news-hero-node-color", "#ffffff"),
    orbit: readSignalColor(
      root,
      "--news-hero-orbit-color",
      "rgba(255, 255, 255, 0.1)",
    ),
    pulse: readSignalColor(
      root,
      "--news-hero-pulse-color",
      "rgba(239, 248, 255, 0.94)",
    ),
  };
}

function drawOrbit(
  context: CanvasRenderingContext2D,
  orbit: SignalOrbit,
  palette: SignalPalette,
) {
  context.beginPath();
  context.arc(orbit.centerX, orbit.centerY, orbit.radius, Math.PI, Math.PI * 2);
  context.globalAlpha = orbit.opacity;
  context.lineWidth = orbit.lineWidth;
  context.strokeStyle = palette.orbit;
  context.stroke();
  context.globalAlpha = 1;
}

function drawPulseTrail(
  context: CanvasRenderingContext2D,
  orbit: SignalOrbit,
  progress: number,
  palette: SignalPalette,
) {
  for (let index = TRAIL_SEGMENTS; index > 0; index -= 1) {
    const startProgress =
      progress - (index / TRAIL_SEGMENTS) * orbit.trailLength;
    const endProgress =
      progress - ((index - 1) / TRAIL_SEGMENTS) * orbit.trailLength;

    if (startProgress < 0 || endProgress < 0) {
      continue;
    }

    const start = getSignalPoint(orbit, startProgress);
    const end = getSignalPoint(orbit, endProgress);
    const strength = 1 - index / TRAIL_SEGMENTS;

    context.beginPath();
    context.moveTo(start.x, start.y);
    context.lineTo(end.x, end.y);
    context.globalAlpha = strength * strength * 0.82;
    context.lineWidth = 0.8 + strength * 1.4;
    context.strokeStyle = palette.pulse;
    context.stroke();
  }

  const head = getSignalPoint(orbit, progress);

  context.save();
  context.beginPath();
  context.arc(head.x, head.y, 1.5, 0, Math.PI * 2);
  context.fillStyle = palette.node;
  context.globalAlpha = 0.95;
  context.shadowBlur = 14;
  context.shadowColor = palette.pulse;
  context.fill();
  context.restore();
  context.globalAlpha = 1;
}

function drawSignalFrame(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  orbits: SignalOrbit[],
  motionProfiles: SignalMotionProfile[],
  dust: SignalDustPoint[],
  palette: SignalPalette,
) {
  context.clearRect(0, 0, width, height);
  context.fillStyle = palette.background;
  context.fillRect(0, 0, width, height);

  context.fillStyle = palette.dust;
  for (const point of dust) {
    context.beginPath();
    context.globalAlpha = point.alpha;
    context.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
    context.fill();
  }
  context.globalAlpha = 1;

  for (const orbit of orbits) {
    drawOrbit(context, orbit, palette);
  }

  for (const profile of motionProfiles) {
    const orbit = orbits[profile.orbitIndex];
    if (orbit) {
      drawPulseTrail(context, orbit, profile.progress, palette);
    }
  }
}

export function NewsSignalCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const root = rootRef.current;

    if (!canvas || !root) {
      return;
    }

    if (navigator.userAgent.includes("jsdom")) {
      root.dataset.newsSignalMotion = "test-static";
      return;
    }

    let context: CanvasRenderingContext2D | null = null;

    try {
      context = canvas.getContext("2d");
    } catch {
      root.dataset.newsSignalMotion = "unavailable";
      return;
    }

    if (!context) {
      root.dataset.newsSignalMotion = "unavailable";
      return;
    }

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animationFrame = 0;
    let elapsedMs = 0;
    let frameAccumulator = 0;
    let height = 1;
    let isIntersecting = true;
    let lastTimestamp = 0;
    let orbits: SignalOrbit[] = [];
    let motionProfiles: SignalMotionProfile[] = [];
    let dust: SignalDustPoint[] = [];
    let palette = resolveSignalPalette(root);
    let width = 1;
    const seedBuffer = new Uint32Array(1);
    if (!motionQuery.matches) {
      window.crypto?.getRandomValues(seedBuffer);
    }
    const sessionSeed =
      seedBuffer[0] || (motionQuery.matches ? 0x4e495445 : Date.now() >>> 0);

    const renderCurrentFrame = () => {
      drawSignalFrame(
        context,
        width,
        height,
        orbits,
        motionProfiles,
        dust,
        palette,
      );
    };

    const canAnimate = () =>
      !motionQuery.matches && isIntersecting && !document.hidden;

    const tick = (timestamp: number) => {
      if (!canAnimate()) {
        return;
      }

      if (lastTimestamp === 0) {
        lastTimestamp = timestamp;
      }

      const delta = Math.min(timestamp - lastTimestamp, 100);
      lastTimestamp = timestamp;
      elapsedMs += delta;
      frameAccumulator += delta;

      if (frameAccumulator >= FRAME_INTERVAL_MS) {
        for (const profile of motionProfiles) {
          advanceSignalMotion(profile, frameAccumulator, elapsedMs);
        }
        advanceSignalDust(dust, width, height, frameAccumulator, elapsedMs);
        renderCurrentFrame();
        frameAccumulator %= FRAME_INTERVAL_MS;
      }

      animationFrame = window.requestAnimationFrame(tick);
    };

    const updateAnimationState = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      lastTimestamp = 0;

      if (motionQuery.matches) {
        root.dataset.newsSignalMotion = "reduced";
        renderCurrentFrame();
        return;
      }

      if (!canAnimate()) {
        root.dataset.newsSignalMotion = "paused";
        renderCurrentFrame();
        return;
      }

      root.dataset.newsSignalMotion = "running";
      animationFrame = window.requestAnimationFrame(tick);
    };

    const resizeCanvas = () => {
      const rect = root.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const visualWidth = Math.max(1, rect.width);
      const visualHeight = Math.max(1, rect.height);

      width = Math.max(1, window.innerWidth);
      height = Math.max(1, window.innerHeight);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${visualWidth}px`;
      canvas.style.height = `${visualHeight}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      orbits = createSignalOrbitLayout(width, height);
      const nextProfileCount = orbits.reduce(
        (total, orbit) => total + orbit.pulseCount,
        0,
      );
      if (motionProfiles.length !== nextProfileCount) {
        motionProfiles = createSignalMotionProfiles(orbits, sessionSeed);
      }
      dust = createSignalDust(
        width,
        height,
        width < 640 ? 48 : 88,
        sessionSeed ^ Math.round(width * 31 + height * 17),
      );
      root.dataset.newsSignalOrbitCount = String(orbits.length);
      renderCurrentFrame();
    };

    const refreshTheme = () => {
      palette = resolveSignalPalette(root);
      renderCurrentFrame();
    };

    const handleVisibilityChange = () => updateAnimationState();
    const handleMotionChange = () => updateAnimationState();

    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(resizeCanvas);
    const intersectionObserver =
      typeof IntersectionObserver === "undefined"
        ? null
        : new IntersectionObserver(
            ([entry]) => {
              isIntersecting = Boolean(
                entry?.isIntersecting &&
                entry.intersectionRatio >= INTERSECTION_THRESHOLD,
              );
              updateAnimationState();
            },
            { threshold: [0, INTERSECTION_THRESHOLD] },
          );
    const themeObserver =
      typeof MutationObserver === "undefined"
        ? null
        : new MutationObserver(refreshTheme);

    resizeCanvas();
    resizeObserver?.observe(root);
    intersectionObserver?.observe(root);
    themeObserver?.observe(document.documentElement, {
      attributeFilter: ["data-theme"],
      attributes: true,
    });
    document.addEventListener("visibilitychange", handleVisibilityChange);
    motionQuery.addEventListener("change", handleMotionChange);
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener(THEME_CHANGE_EVENT, refreshTheme);
    updateAnimationState();

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();
      themeObserver?.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      motionQuery.removeEventListener("change", handleMotionChange);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener(THEME_CHANGE_EVENT, refreshTheme);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden bg-nite-background",
        className,
      )}
      data-testid="news-signal-canvas"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        data-testid="news-signal-canvas-element"
      />
    </div>
  );
}

export type { SignalOrbit };
