"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

export function MethodFeatureIcon() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      data-component="method-feature-icon"
      className="relative isolate size-[8.75rem] overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#050505] shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_30px_80px_rgb(0_0_0/0.5)] sm:size-[9.5rem]"
      initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.94, y: 8 }}
      animate={{
        opacity: 1,
        rotateY: shouldReduceMotion ? 0 : [-1.5, 1.5, -1.5],
        scale: 1,
        y: shouldReduceMotion ? 0 : [0, -3, 0],
      }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : {
              opacity: { duration: 0.8 },
              rotateY: {
                delay: 0.9,
                duration: 6.5,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
              },
              scale: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
              y: {
                delay: 0.9,
                duration: 5.5,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
              },
            }
      }
      style={{ transformStyle: "preserve-3d" }}
    >
      <Image
        src="/images/metodo/method-applied-icon.png"
        alt=""
        fill
        priority
        sizes="152px"
        className="object-cover"
      />
      <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgb(255_255_255/0.12),transparent_45%)]" />
    </motion.div>
  );
}
