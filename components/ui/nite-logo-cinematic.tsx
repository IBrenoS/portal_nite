"use client";

import { useRef } from "react";

import { useNiteElectricAnimation } from "@/components/ui/use-nite-electric-animation";
import { cn } from "@/lib/utils";

type NiteLogoCinematicProps = {
  className?: string;
  svgMarkup: string;
};

export function NiteLogoCinematic({ className, svgMarkup }: NiteLogoCinematicProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useNiteElectricAnimation(containerRef);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        "animated-nite-logo mx-auto flex w-full items-center justify-center drop-shadow-[0_0_24px_rgb(51_212_255_/_0.16)] sm:drop-shadow-[0_0_36px_rgb(51_212_255_/_0.2)] lg:drop-shadow-[0_0_44px_rgb(51_212_255_/_0.22)] [&_svg]:h-auto [&_svg]:w-full",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: svgMarkup }}
    />
  );
}
