"use client";

import { useRef } from "react";

import { useNiteElectricAnimation } from "@/components/ui/use-nite-electric-animation";
import { cn } from "@/lib/utils";

type NiteLogoCinematicProps = {
  className?: string;
  svgMarkup: string;
};

export function NiteLogoCinematic({
  className,
  svgMarkup,
}: NiteLogoCinematicProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useNiteElectricAnimation(containerRef);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      data-nite-scene="electric-logo"
      className={cn(
        "animated-nite-logo mx-auto flex w-full items-center justify-center [&_svg]:h-auto [&_svg]:w-full",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: svgMarkup }}
    />
  );
}
