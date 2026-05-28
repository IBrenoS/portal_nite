"use client";

import type { CSSProperties, PointerEvent } from "react";

import { cn } from "@/lib/utils";

type NiteWordmarkSpotlightStyle = CSSProperties & {
  "--nite-spotlight-x"?: string;
  "--nite-spotlight-y"?: string;
};

type NiteFinalWordmarkProps = {
  className?: string;
};

export function NiteFinalWordmark({ className }: NiteFinalWordmarkProps) {
  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();

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
    event.currentTarget.style.setProperty("--nite-spotlight-x", "50%");
    event.currentTarget.style.setProperty("--nite-spotlight-y", "38%");
  };

  return (
    <div
      aria-hidden="true"
      className={cn(
        "nite-final-wordmark relative mx-auto h-44 w-full max-w-7xl overflow-hidden bg-black sm:h-64 lg:h-80 xl:h-96",
        className,
      )}
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
      style={
        {
          "--nite-spotlight-x": "50%",
          "--nite-spotlight-y": "38%",
        } as NiteWordmarkSpotlightStyle
      }
    >
      <span className="nite-final-wordmark-text nite-final-wordmark-base">
        NITE
      </span>
      <span className="nite-final-wordmark-text nite-final-wordmark-shine">
        NITE
      </span>
    </div>
  );
}
