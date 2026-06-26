"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

type MethodSystemCanvasProps = {
  activeIndex: number;
  stageCount: number;
};

export function MethodSystemCanvas({
  activeIndex,
  stageCount,
}: MethodSystemCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas || process.env.NODE_ENV === "test") {
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    let width = 1;
    let height = 1;
    let frame = 0;
    let isVisible = true;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();

      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const drawGrid = () => {
      context.strokeStyle = "rgba(255,255,255,0.045)";
      context.lineWidth = 1;

      for (let x = 0; x <= width; x += 20) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, height);
        context.stroke();
      }

      for (let y = 0; y <= height; y += 20) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(width, y);
        context.stroke();
      }
    };

    const getNodes = () =>
      Array.from({ length: stageCount }, (_, index) => ({
        x: width * (0.125 + (index / Math.max(stageCount - 1, 1)) * 0.75),
        y: height * (0.42 + Math.sin(index * 1.35) * 0.08),
      }));

    const drawRoutes = (time: number) => {
      const nodes = getNodes();
      const activeNode = nodes[activeIndex] ?? nodes[0];
      const pulse = shouldReduceMotion ? 0.5 : (Math.sin(time / 520) + 1) / 2;

      context.lineWidth = 1;

      nodes.slice(0, -1).forEach((node, index) => {
        const next = nodes[index + 1];

        context.strokeStyle = "rgba(255,255,255,0.16)";
        context.beginPath();
        context.moveTo(node.x, node.y);
        context.lineTo((node.x + next.x) / 2, node.y);
        context.lineTo((node.x + next.x) / 2, next.y);
        context.lineTo(next.x, next.y);
        context.stroke();
      });

      nodes.forEach((node, index) => {
        context.beginPath();
        context.arc(
          node.x,
          node.y,
          index === activeIndex ? 4 + pulse * 3 : 3,
          0,
          Math.PI * 2,
        );
        context.fillStyle =
          index === activeIndex
            ? "rgba(245,245,245,0.95)"
            : "rgba(138,138,138,0.65)";
        context.fill();
      });

      if (activeNode) {
        context.beginPath();
        context.arc(
          activeNode.x,
          activeNode.y,
          18 + pulse * 10,
          0,
          Math.PI * 2,
        );
        context.strokeStyle = "rgba(245,245,245,0.16)";
        context.stroke();
      }
    };

    const drawTrails = (time: number) => {
      if (shouldReduceMotion) {
        return;
      }

      const progress = (time / 4200) % 1;
      const startX = width * 0.125;
      const endX = width * 0.875;
      const x = startX + (endX - startX) * progress;
      const gradient = context.createLinearGradient(x - 80, 0, x, 0);

      gradient.addColorStop(0, "rgba(245,245,245,0)");
      gradient.addColorStop(1, "rgba(245,245,245,0.5)");
      context.strokeStyle = gradient;
      context.beginPath();
      context.moveTo(x - 80, height * 0.64);
      context.lineTo(x, height * 0.64);
      context.stroke();
    };

    const draw = (time = 0) => {
      context.clearRect(0, 0, width, height);
      drawGrid();
      drawRoutes(time);
      drawTrails(time);

      if (!shouldReduceMotion && isVisible) {
        frame = window.requestAnimationFrame(draw);
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
      draw();
    });
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry?.isIntersecting ?? true;
      window.cancelAnimationFrame(frame);
      draw();
    });

    resizeObserver.observe(canvas);
    visibilityObserver.observe(canvas);
    resize();
    draw();

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
    };
  }, [activeIndex, shouldReduceMotion, stageCount]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      data-method-canvas="resend-method-system"
      className="pointer-events-none absolute inset-0 size-full opacity-80 [mask-image:radial-gradient(ellipse_at_center,#000_55%,transparent_100%)]"
    />
  );
}
