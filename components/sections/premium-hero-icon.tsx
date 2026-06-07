"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";

import { cn } from "@/lib/utils";

type HeroIconStyle = CSSProperties & {
  "--hero-rotate-x": string;
  "--hero-rotate-y": string;
  "--pointer-x": string;
  "--pointer-y": string;
};

type LightStyle = CSSProperties & {
  "--pointer-x": string;
  "--pointer-y": string;
};

const neutralMotion: HeroIconStyle = {
  "--hero-rotate-x": "0deg",
  "--hero-rotate-y": "0deg",
  "--pointer-x": "0px",
  "--pointer-y": "0px",
};

function formatCssNumber(value: number, precision = 3) {
  return Number(value.toFixed(precision)).toString();
}

type PremiumHeroIconProps = {
  className?: string;
};

export function PremiumHeroIcon({ className }: PremiumHeroIconProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [motionStyle, setMotionStyle] = useState<HeroIconStyle>(neutralMotion);
  const lightStyle: LightStyle = {
    "--pointer-x": motionStyle["--pointer-x"],
    "--pointer-y": motionStyle["--pointer-y"],
    backgroundImage:
      "radial-gradient(100px, color-mix(in srgb, var(--nite-light-action-hover-text) 80%, transparent), transparent)",
    height: "250px",
    left: "-100px",
    mixBlendMode: "soft-light",
    top: "-100px",
    transform: "translateX(var(--pointer-x)) translateY(var(--pointer-y))",
    width: "250px",
  };

  useEffect(() => {
    function updateMotion(event: globalThis.PointerEvent) {
      const sceneBounds = sceneRef.current?.getBoundingClientRect();

      if (!sceneBounds || sceneBounds.height === 0 || window.innerWidth === 0) {
        return;
      }

      const sceneY = (event.clientY - sceneBounds.top) / sceneBounds.height;
      const rotateX = 0.21 + sceneY * 2.25;
      const rotateY = (event.clientX / window.innerWidth) * 8;
      const pointerX = event.clientX / 5;
      const pointerY = (event.clientY - 80) / 3;

      setMotionStyle({
        "--hero-rotate-x": `${formatCssNumber(rotateX)}deg`,
        "--hero-rotate-y": `${formatCssNumber(rotateY)}deg`,
        "--pointer-x": `${formatCssNumber(pointerX, 1)}px`,
        "--pointer-y": `${formatCssNumber(pointerY, 1)}px`,
      });
    }

    window.addEventListener("pointermove", updateMotion);

    return () => {
      window.removeEventListener("pointermove", updateMotion);
    };
  }, []);

  return (
    <div
      ref={sceneRef}
      data-component="nite-hero-symbol"
      data-visual-depth="premium"
      data-interaction="pointer-tilt"
      aria-hidden="true"
      className={cn(
        "pointer-events-none relative mx-auto h-[260px] w-full overflow-visible sm:h-[320px] md:h-[450px]",
        className,
      )}
      style={motionStyle}
    >
      <div
        data-component="premium-icon-tilt-plane"
        className="relative flex h-full w-full items-center justify-center transition-transform duration-300 ease-out will-change-transform"
        style={{
          transform: `rotateX(${motionStyle["--hero-rotate-x"]}) rotateY(${motionStyle["--hero-rotate-y"]})`,
          transformStyle: "preserve-3d",
        }}
      >
        <div
          data-component="premium-icon-depth-grid"
          className="absolute h-full w-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, var(--nite-text-muted) 1px, transparent 0)",
            backgroundSize: "40px 40px",
            transform: "translateZ(-500px)",
          }}
        />
        <div
          data-component="premium-icon-image-frame"
          className="group relative h-[183px] w-[180px] overflow-hidden grayscale md:h-[255px] md:w-[250px]"
        >
          <div
            data-component="premium-icon-light"
            className="pointer-events-none absolute inset-0 z-10 rounded-full opacity-100 transition-transform duration-300 ease-out will-change-transform"
            style={lightStyle}
          />
          <Image
            src="/images/oportunidades/n-icon.png"
            alt=""
            data-component="premium-icon-image"
            width={1254}
            height={1254}
            priority
            sizes="(min-width: 768px) 250px, 180px"
            className="h-full w-full scale-[1.22] object-contain"
          />
        </div>
      </div>
    </div>
  );
}
