"use client";

import { NiteLogoCinematic } from "@/components/ui/nite-logo-cinematic";

type AnimatedNiteLogoClientProps = {
  className?: string;
  svgMarkup: string;
};

export function AnimatedNiteLogoClient({ className, svgMarkup }: AnimatedNiteLogoClientProps) {
  return <NiteLogoCinematic className={className} svgMarkup={svgMarkup} />;
}
