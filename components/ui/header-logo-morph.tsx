"use client";

import { motion, type MotionValue, useTransform } from "motion/react";

import { cn } from "@/lib/utils";

type HeaderLogoMorphProps = {
  progress: MotionValue<number>;
  isCollapsed: boolean;
  reduceMotion: boolean;
  className?: string;
};

export function HeaderLogoMorph({
  progress,
  isCollapsed,
  reduceMotion,
  className,
}: HeaderLogoMorphProps) {
  const expandedOpacity = useTransform(progress, (latest) => {
    if (reduceMotion) {
      return latest >= 0.75 ? 0 : 1;
    }

    if (latest <= 0.7) {
      return 1 - (latest / 0.7) * 0.8;
    }

    return Math.max(0, 0.2 * (1 - (latest - 0.7) / 0.3));
  });
  const collapsedOpacity = useTransform(progress, (latest) => {
    if (reduceMotion) {
      return latest >= 0.75 ? 1 : 0;
    }

    if (latest <= 0.5) {
      return 0;
    }

    return Math.min(1, (latest - 0.5) / 0.5);
  });

  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative block h-10 w-[9.25rem] overflow-hidden sm:w-[10rem] md:h-10 md:w-[11rem]",
        className,
      )}
      data-header-logo-morph=""
      data-header-logo-state={isCollapsed ? "collapsed" : "expanded"}
    >
      <motion.span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 flex origin-left flex-col justify-center leading-none will-change-[opacity]"
        style={{ opacity: expandedOpacity }}
      >
        <span
          aria-hidden="true"
          className="font-heading text-sm font-bold tracking-tight text-foreground md:text-base"
        >
          NITE
        </span>
        <span
          aria-hidden="true"
          className="mt-0.5 text-[0.7rem] font-bold uppercase tracking-[0.14em] md:text-xs"
        >
          <span className="text-[#ad3327]">UNI</span>
          <span className="text-[#23497f]">JORGE</span>
        </span>
      </motion.span>

      <motion.span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 flex origin-left items-center font-heading text-xl font-bold leading-none tracking-tight text-foreground will-change-[opacity]"
        style={{ opacity: collapsedOpacity }}
      >
        <span aria-hidden="true">N</span>
      </motion.span>
    </span>
  );
}
