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
      className={cn(
        "animated-nite-logo mx-auto flex w-full items-center justify-center drop-shadow-[0_0_24px_var(--brand-glow)] sm:drop-shadow-[0_0_36px_var(--brand-glow)] lg:drop-shadow-[0_0_44px_var(--brand-glow)] [&_svg]:h-auto [&_svg]:w-full",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: svgMarkup }}
    />
  );
}
