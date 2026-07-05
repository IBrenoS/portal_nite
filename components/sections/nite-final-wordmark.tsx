"use client";

import Image from "next/image";
import type { CSSProperties, PointerEvent } from "react";

import { cn } from "@/lib/utils";

type NiteWordmarkSpotlightStyle = CSSProperties & {
  "--nite-spotlight-x": string;
  "--nite-spotlight-y": string;
};

type NiteFinalWordmarkProps = {
  className?: string;
};

export function NiteFinalWordmark({ className }: NiteFinalWordmarkProps) {
  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();

    event.currentTarget.dataset.spotlightActive = "true";
    event.currentTarget.style.setProperty(
      "--nite-spotlight-x",
      `${event.clientX - bounds.left}px`,
    );
    event.currentTarget.style.setProperty(
      "--nite-spotlight-y",
      `${event.clientY - bounds.top}px`,
    );
  };

  const handlePointerLeave = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.dataset.spotlightActive = "false";
    event.currentTarget.style.setProperty("--nite-spotlight-x", "50%");
    event.currentTarget.style.setProperty("--nite-spotlight-y", "42%");
  };

  return (
    <div
      aria-hidden="true"
      data-nite-scene="wordmark"
      data-spotlight-active="false"
      className={cn(
        "nite-final-wordmark relative mx-auto hidden aspect-[56/15] w-full max-w-7xl overflow-hidden sm:block",
        className,
      )}
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
      style={
        {
          "--nite-spotlight-x": "50%",
          "--nite-spotlight-y": "42%",
        } as NiteWordmarkSpotlightStyle
      }
    >
      <Image
        src="/images/brand/nite-logo-footer.webp"
        alt=""
        width={2800}
        height={750}
        sizes="(min-width: 1280px) 1280px, calc(100vw - 3rem)"
        className="nite-final-wordmark-image pointer-events-none relative z-[1] h-auto w-full select-none"
        draggable={false}
      />
    </div>
  );
}
