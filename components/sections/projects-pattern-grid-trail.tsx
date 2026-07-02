"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef } from "react";

import { cn } from "@/lib/utils";

type ProjectsPatternGridTrailProps = {
  backgroundColor?: string;
  circleColor?: string;
  className?: string;
  glowDuration?: number;
  glowProbability?: number;
  gridColor?: string;
  gridSize?: number;
  innerRadius?: number;
  maxGlowRadius?: number;
  maxTrailLength?: number;
  minTrailLength?: number;
  outerRadius?: number;
  resetProbability?: number;
  squareSize?: number;
  trailColor?: string;
  trailCount?: number;
  velocity?: number;
};

type Trail = {
  alpha: number;
  fading: boolean;
  glowFrame: number;
  glowing: boolean;
  points: Array<{ x: number; y: number }>;
  speedFactor: number;
  targetX: number;
  targetY: number;
  trailLength: number;
  visited: Set<string>;
  x: number;
  y: number;
};

const defaultMaskImage =
  "radial-gradient(closest-side, #000000 30%, #000000 31%, #00000000 100%)";

function readCustomColor(
  element: HTMLElement,
  value: string,
  fallback: string,
) {
  if (!value.startsWith("var(")) {
    return value;
  }

  const propertyName = value.slice(4, -1).trim();

  return (
    getComputedStyle(element).getPropertyValue(propertyName).trim() || fallback
  );
}

function randomGridTrail(
  canvas: HTMLCanvasElement,
  config: Required<Omit<ProjectsPatternGridTrailProps, "className">>,
) {
  const pixelRatio = window.devicePixelRatio || 1;
  const centerX = canvas.width / (2 * pixelRatio);
  const centerY = canvas.height / (2 * pixelRatio);
  const radiusBase = Math.min(centerX, centerY);
  const outerRadius = radiusBase * config.outerRadius;
  const innerRadius = radiusBase * config.innerRadius;
  const angle = 2 * Math.random() * Math.PI;
  const radius = Math.sqrt(
    Math.random() * (outerRadius * outerRadius - innerRadius * innerRadius) +
      innerRadius * innerRadius,
  );
  const x =
    Math.floor((centerX + radius * Math.cos(angle)) / config.gridSize) *
    config.gridSize;
  const y =
    Math.floor((centerY + radius * Math.sin(angle)) / config.gridSize) *
    config.gridSize;

  return {
    alpha: 1,
    fading: false,
    glowFrame: 0,
    glowing: false,
    points: [{ x, y }],
    speedFactor: 0.5 * Math.random() + 0.75,
    targetX: x,
    targetY: y,
    trailLength:
      Math.floor(
        Math.random() * (config.maxTrailLength - config.minTrailLength + 1),
      ) + config.minTrailLength,
    visited: new Set([`${x},${y}`]),
    x,
    y,
  } satisfies Trail;
}

function chooseNextTarget(
  trail: Trail,
  config: Required<Omit<ProjectsPatternGridTrailProps, "className">>,
) {
  const directions = [
    { dx: 0, dy: -1 },
    { dx: 1, dy: 0 },
    { dx: 0, dy: 1 },
    { dx: -1, dy: 0 },
  ].filter(({ dx, dy }) => {
    const x = trail.x + dx * config.gridSize;
    const y = trail.y + dy * config.gridSize;

    return !trail.visited.has(`${x},${y}`);
  });

  if (directions.length === 0) {
    trail.fading = true;
    return;
  }

  const direction = directions[Math.floor(Math.random() * directions.length)];

  trail.targetX = trail.x + direction.dx * config.gridSize;
  trail.targetY = trail.y + direction.dy * config.gridSize;
}

function drawTrail(
  context: CanvasRenderingContext2D,
  trail: Trail,
  config: Required<Omit<ProjectsPatternGridTrailProps, "className">>,
) {
  if (trail.points.length < 2) {
    return;
  }

  const gradient = context.createLinearGradient(
    trail.points[0].x,
    trail.points[0].y,
    trail.points[trail.points.length - 1].x,
    trail.points[trail.points.length - 1].y,
  );

  gradient.addColorStop(0, config.trailColor);
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

  context.beginPath();
  context.moveTo(trail.points[0].x, trail.points[0].y);

  for (let index = 1; index < trail.points.length; index += 1) {
    const point = trail.points[index];
    context.lineTo(point.x, point.y);
  }

  context.strokeStyle = gradient;
  context.lineWidth = 2;
  context.globalAlpha = trail.alpha;
  context.stroke();
  context.fillStyle = config.circleColor;
  context.fillRect(
    trail.x - config.squareSize / 2,
    trail.y - config.squareSize / 2,
    config.squareSize,
    config.squareSize,
  );

  if (trail.glowing) {
    const progress = trail.glowFrame / config.glowDuration;
    const radius = Math.sin(progress * Math.PI) * config.maxGlowRadius;
    const opacity = Math.sin(progress * Math.PI);

    context.beginPath();
    context.arc(trail.x, trail.y, radius, 0, 2 * Math.PI);
    context.fillStyle = `rgba(255, 255, 255, ${0.3 * opacity})`;
    context.fill();
  }

  context.globalAlpha = 1;
}

export function ProjectsPatternGridTrail({
  backgroundColor = "var(--nite-background)",
  circleColor = "rgba(255, 255, 255, 1)",
  className,
  glowDuration = 60,
  glowProbability = 0.001,
  gridColor = "rgba(170, 170, 170, 0.1)",
  gridSize = 20,
  innerRadius = 0.3,
  maxGlowRadius = 10,
  maxTrailLength = 500,
  minTrailLength = 100,
  outerRadius = 0.8,
  resetProbability = 0.003,
  squareSize = 3,
  trailColor = "rgba(255, 255, 255, 0.5)",
  trailCount = 7,
  velocity = 0.1,
}: ProjectsPatternGridTrailProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const config = useMemo(
    () => ({
      backgroundColor,
      circleColor,
      glowDuration,
      glowProbability,
      gridColor,
      gridSize,
      innerRadius,
      maxGlowRadius,
      maxTrailLength,
      minTrailLength,
      outerRadius,
      resetProbability,
      squareSize,
      trailColor,
      trailCount,
      velocity,
    }),
    [
      backgroundColor,
      circleColor,
      glowDuration,
      glowProbability,
      gridColor,
      gridSize,
      innerRadius,
      maxGlowRadius,
      maxTrailLength,
      minTrailLength,
      outerRadius,
      resetProbability,
      squareSize,
      trailColor,
      trailCount,
      velocity,
    ],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const root = rootRef.current;

    if (!canvas || !root) {
      return;
    }

    if (navigator.userAgent.includes("jsdom")) {
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

    let animationFrame = 0;
    let trails: Trail[] = [];
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const canvasBackground = readCustomColor(
      root,
      config.backgroundColor,
      "#09090A",
    );
    const gridStroke = readCustomColor(
      root,
      config.gridColor,
      "rgba(170, 170, 170, 0.1)",
    );
    const trailStroke = readCustomColor(
      root,
      config.trailColor,
      "rgba(255, 255, 255, 0.5)",
    );
    const circleFill = readCustomColor(
      root,
      config.circleColor,
      "rgba(255, 255, 255, 1)",
    );
    const resolvedConfig = {
      ...config,
      backgroundColor: canvasBackground,
      circleColor: circleFill,
      gridColor: gridStroke,
      trailColor: trailStroke,
    };

    const resizeCanvas = () => {
      const rect = root.getBoundingClientRect();
      const pixelRatio = window.devicePixelRatio || 1;

      canvas.width = rect.width * pixelRatio;
      canvas.height = rect.height * pixelRatio;
      context.scale(pixelRatio, pixelRatio);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      trails = Array.from({ length: resolvedConfig.trailCount }, () =>
        randomGridTrail(canvas, resolvedConfig),
      );
    };

    const renderFrame = () => {
      context.fillStyle = resolvedConfig.backgroundColor;
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.strokeStyle = resolvedConfig.gridColor;
      context.lineWidth = 1;

      for (let x = 0; x < canvas.width; x += resolvedConfig.gridSize) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, canvas.height);
        context.stroke();
      }

      for (let y = 0; y < canvas.height; y += resolvedConfig.gridSize) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(canvas.width, y);
        context.stroke();
      }

      for (const trail of trails) {
        if (trail.fading) {
          trail.alpha -= 0.02;

          if (trail.alpha <= 0.1) {
            Object.assign(trail, randomGridTrail(canvas, resolvedConfig));
          }
        }

        const distanceX = trail.targetX - trail.x;
        const distanceY = trail.targetY - trail.y;

        if (Math.abs(distanceX) < 0.1 && Math.abs(distanceY) < 0.1) {
          trail.x = trail.targetX;
          trail.y = trail.targetY;
          chooseNextTarget(trail, resolvedConfig);
          trail.visited.add(`${trail.x},${trail.y}`);
        } else {
          trail.x += distanceX * resolvedConfig.velocity * trail.speedFactor;
          trail.y += distanceY * resolvedConfig.velocity * trail.speedFactor;
        }

        trail.points.unshift({ x: trail.x, y: trail.y });

        if (trail.points.length > trail.trailLength) {
          trail.points.pop();
        }

        if (Math.random() < resolvedConfig.resetProbability) {
          trail.fading = true;
        }

        if (!trail.glowing && Math.random() < resolvedConfig.glowProbability) {
          trail.glowing = true;
          trail.glowFrame = 0;
        }

        if (trail.glowing) {
          trail.glowFrame += 1;

          if (trail.glowFrame >= resolvedConfig.glowDuration) {
            trail.glowing = false;
          }
        }

        drawTrail(context, trail, resolvedConfig);
      }

      if (!prefersReducedMotion) {
        animationFrame = requestAnimationFrame(renderFrame);
      }
    };

    resizeCanvas();

    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(() => {
            resizeCanvas();
          });

    resizeObserver?.observe(root);
    renderFrame();

    return () => {
      resizeObserver?.disconnect();
      cancelAnimationFrame(animationFrame);
    };
  }, [config]);

  const canvasStyle = {
    WebkitMaskImage: defaultMaskImage,
    WebkitMaskPosition: "center",
    WebkitMaskSize: "100% 100%",
    backgroundColor: "var(--nite-background)",
    maskImage: defaultMaskImage,
    maskPosition: "center",
    maskSize: "100% 100%",
    zIndex: 0,
  } satisfies CSSProperties;

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute left-0 top-0 h-full w-full overflow-hidden bg-nite-background",
        className,
      )}
      data-background-source="nite-design-system"
      data-grid-size={gridSize}
      data-max-trail-length={maxTrailLength}
      data-min-trail-length={minTrailLength}
      data-testid="projects-pattern-grid-trail"
      data-trail-count={trailCount}
    >
      <canvas
        ref={canvasRef}
        className="absolute left-0 top-0"
        data-testid="projects-pattern-grid-trail-canvas"
        style={canvasStyle}
      />
    </div>
  );
}
