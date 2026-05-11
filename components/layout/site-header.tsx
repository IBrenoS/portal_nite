"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

import { Container } from "@/components/layout/container";
import { HeaderLogoMorph } from "@/components/ui/header-logo-morph";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/#sobre", label: "Sobre" },
  { href: "/#projetos", label: "Projetos" },
  { href: "/#timeline", label: "Timeline" },
  { href: "/#contato", label: "Contato" },
] as const;

const HEADER_COLLAPSE_END = 96;
const HEADER_COLLAPSE_STATE_AT = 72;

export function SiteHeader() {
  const { scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  const reduceMotion = shouldReduceMotion ?? false;
  const [isCollapsed, setIsCollapsed] = useState(false);

  const collapseProgress = useTransform(
    scrollY,
    [0, HEADER_COLLAPSE_END],
    [0, 1],
    { clamp: true },
  );

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setIsCollapsed(window.scrollY >= HEADER_COLLAPSE_STATE_AT);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsCollapsed(latest >= HEADER_COLLAPSE_STATE_AT);
  });

  return (
    <motion.header
      className={cn(
        "sticky top-0 z-40 border-b backdrop-blur-xl transition-colors duration-brand-micro ease-brand-out",
        isCollapsed
          ? "border-white/[0.08] bg-background/62"
          : "border-white/[0.06] bg-background/48",
      )}
      data-header-collapsed={isCollapsed ? "true" : "false"}
      data-site-header=""
    >
      <Container className="grid min-h-16 max-w-[1240px] grid-cols-[minmax(10.75rem,1fr)_auto] items-center gap-4 py-2 sm:min-h-[72px] md:min-h-20 md:grid-cols-[15rem_minmax(0,1fr)_auto] md:gap-7 md:py-0">
        <Link
          href="/"
          aria-label="Ir para a página inicial do NITE UniJorge"
          className="inline-flex min-h-11 w-[10.75rem] items-center rounded-md sm:w-[12rem] md:w-[15rem]"
        >
          <HeaderLogoMorph
            progress={collapseProgress}
            isCollapsed={isCollapsed}
            reduceMotion={reduceMotion}
          />
        </Link>

        <nav
          aria-label="Navegacao principal"
          className="hidden items-center justify-self-end md:flex md:gap-2 lg:gap-3"
          data-site-nav=""
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="min-h-11 rounded-md px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground lg:px-3.5"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <Link
          href="/#projetos"
          className="hidden min-h-11 items-center justify-self-end rounded-md border border-brand-circuit-bright/30 px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] text-brand-circuit-bright transition-colors hover:border-brand-circuit-bright hover:text-foreground sm:inline-flex"
        >
          Explorar projetos
        </Link>
      </Container>
    </motion.header>
  );
}
