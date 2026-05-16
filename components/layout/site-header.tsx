"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowLeftIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  XIcon,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

import {
  headerCta,
  headerNavigationGroups,
  type SiteNavigationGroup,
  type SiteNavigationItem,
} from "@/biblioteca/navigation";
import { Container } from "@/components/layout/container";
import { ButtonPrimaryLink } from "@/components/ui/brand-button";
import { HeaderLogoMorph } from "@/components/ui/header-logo-morph";
import { cn } from "@/lib/utils";

const HEADER_COLLAPSE_END = 96;
const HEADER_COLLAPSE_STATE_AT = 72;
const HEADER_MOTION_EASE = [0.22, 1, 0.36, 1] as const;
type HeaderGroupId = SiteNavigationGroup["id"];
type HeaderMotionTransition = {
  duration: number;
  ease?: typeof HEADER_MOTION_EASE;
};

export function SiteHeader() {
  const headerRef = useRef<HTMLElement | null>(null);
  const activeDesktopGroupRef = useRef<HeaderGroupId | null>(null);
  const desktopCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const { scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  const reduceMotion = shouldReduceMotion ?? false;
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeDesktopGroup, setActiveDesktopGroup] =
    useState<HeaderGroupId | null>(null);
  const [desktopDirection, setDesktopDirection] = useState(1);
  const [desktopPanelAnchor, setDesktopPanelAnchor] = useState<number | string>(
    "50%",
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileGroup, setActiveMobileGroup] =
    useState<HeaderGroupId | null>(null);

  const activeDesktopNavigationGroup = headerNavigationGroups.find(
    (group) => group.id === activeDesktopGroup,
  );
  const activeMobileNavigationGroup = headerNavigationGroups.find(
    (group) => group.id === activeMobileGroup,
  );
  const activeMobileLayer = activeMobileNavigationGroup ? "detail" : "root";
  const menuTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.16, ease: HEADER_MOTION_EASE };
  const contentTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.18, ease: HEADER_MOTION_EASE };
  const isMultiColumnDesktopMenu =
    (activeDesktopNavigationGroup?.items.length ?? 0) > 5;

  const collapseProgress = useTransform(
    scrollY,
    [0, HEADER_COLLAPSE_END],
    [0, 1],
    { clamp: true },
  );

  const cancelDesktopClose = useCallback(() => {
    if (!desktopCloseTimerRef.current) {
      return;
    }

    clearTimeout(desktopCloseTimerRef.current);
    desktopCloseTimerRef.current = null;
  }, []);

  const scheduleDesktopClose = useCallback(() => {
    cancelDesktopClose();
    desktopCloseTimerRef.current = setTimeout(() => {
      setActiveDesktopGroup(null);
      desktopCloseTimerRef.current = null;
    }, 120);
  }, [cancelDesktopClose]);

  const updateDesktopPanelAnchor = (groupId: HeaderGroupId) => {
    const trigger = headerRef.current?.querySelector<HTMLElement>(
      `[data-nav-trigger="${groupId}"]`,
    );

    if (!headerRef.current || !trigger) {
      setDesktopPanelAnchor("50%");
      return;
    }

    const headerBox = headerRef.current.getBoundingClientRect();
    const triggerBox = trigger.getBoundingClientRect();

    setDesktopPanelAnchor(
      triggerBox.left - headerBox.left + triggerBox.width / 2,
    );
  };

  useEffect(() => {
    const updateCollapsedState = () => {
      setIsCollapsed(window.scrollY >= HEADER_COLLAPSE_STATE_AT);
    };

    const frame = window.requestAnimationFrame(updateCollapsedState);
    window.addEventListener("scroll", updateCollapsedState, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateCollapsedState);
    };
  }, []);

  useEffect(() => {
    return () => {
      cancelDesktopClose();
    };
  }, [cancelDesktopClose]);

  useEffect(() => {
    activeDesktopGroupRef.current = activeDesktopGroup;
  }, [activeDesktopGroup]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsCollapsed(latest >= HEADER_COLLAPSE_STATE_AT);
  });

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }

      cancelDesktopClose();
      setActiveDesktopGroup(null);
      setIsMobileMenuOpen(false);
      setActiveMobileGroup(null);
    };
    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (
        !headerRef.current ||
        headerRef.current.contains(event.target as Node)
      ) {
        return;
      }

      cancelDesktopClose();
      setActiveDesktopGroup(null);
      setIsMobileMenuOpen(false);
      setActiveMobileGroup(null);
    };
    const closeOnOutsidePointerMove = (event: PointerEvent) => {
      if (
        event.pointerType !== "mouse" ||
        !activeDesktopGroupRef.current ||
        !headerRef.current
      ) {
        return;
      }

      if (headerRef.current.contains(event.target as Node)) {
        cancelDesktopClose();
        return;
      }

      scheduleDesktopClose();
    };
    const closeOnOutsideMouseMove = (event: MouseEvent) => {
      if (!activeDesktopGroupRef.current || !headerRef.current) {
        return;
      }

      if (headerRef.current.contains(event.target as Node)) {
        cancelDesktopClose();
        return;
      }

      scheduleDesktopClose();
    };

    window.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOnOutsidePointer);
    document.addEventListener("pointermove", closeOnOutsidePointerMove);
    document.addEventListener("mousemove", closeOnOutsideMouseMove);

    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOnOutsidePointer);
      document.removeEventListener("pointermove", closeOnOutsidePointerMove);
      document.removeEventListener("mousemove", closeOnOutsideMouseMove);
    };
  }, [cancelDesktopClose, scheduleDesktopClose]);

  const openDesktopGroup = (groupId: HeaderGroupId) => {
    cancelDesktopClose();
    updateDesktopPanelAnchor(groupId);

    const currentIndex = headerNavigationGroups.findIndex(
      (group) => group.id === activeDesktopGroup,
    );
    const nextIndex = headerNavigationGroups.findIndex(
      (group) => group.id === groupId,
    );

    setDesktopDirection(
      currentIndex === -1 || nextIndex >= currentIndex ? 1 : -1,
    );
    setActiveDesktopGroup(groupId);
    setIsMobileMenuOpen(false);
    setActiveMobileGroup(null);
  };

  const toggleMobileMenu = () => {
    cancelDesktopClose();

    setIsMobileMenuOpen((isOpen) => {
      if (isOpen) {
        setActiveMobileGroup(null);
      } else {
        setActiveDesktopGroup(null);
      }

      return !isOpen;
    });
  };

  const openMobileGroup = (groupId: HeaderGroupId) => {
    setActiveMobileGroup(groupId);
  };

  const closeAllMenus = () => {
    cancelDesktopClose();
    setActiveDesktopGroup(null);
    setIsMobileMenuOpen(false);
    setActiveMobileGroup(null);
  };

  return (
    <motion.header
      ref={headerRef}
      className={cn(
        "sticky top-0 z-40 border-b backdrop-blur-xl transition-colors duration-brand-micro ease-brand-out",
        isCollapsed
          ? "border-border bg-background/88"
          : "border-border/80 bg-background/78",
      )}
      data-header-collapsed={isCollapsed ? "true" : "false"}
      data-site-header=""
      onMouseEnter={cancelDesktopClose}
      onMouseLeave={scheduleDesktopClose}
    >
      <Container className="grid min-h-14 max-w-[1240px] grid-cols-[minmax(9.25rem,1fr)_auto] items-center gap-4 py-1.5 sm:min-h-[58px] lg:grid-cols-[11rem_minmax(0,1fr)_auto] lg:gap-6 lg:py-0">
        <Link
          href="/"
          aria-label="Ir para a página inicial do NITE UniJorge"
          className="inline-flex min-h-10 w-[9.25rem] items-center rounded-md sm:w-[10rem] md:w-[11rem]"
        >
          <HeaderLogoMorph
            progress={collapseProgress}
            isCollapsed={isCollapsed}
            reduceMotion={reduceMotion}
          />
        </Link>

        <nav
          aria-label="Navegação principal"
          className="hidden items-center justify-self-end lg:flex lg:gap-2"
          data-site-nav=""
        >
          {headerNavigationGroups.map((group) => (
            <HeaderNavigationGroupControl
              key={group.id}
              group={group}
              isOpen={activeDesktopGroup === group.id}
              onOpen={() => openDesktopGroup(group.id)}
              onToggle={() => openDesktopGroup(group.id)}
            />
          ))}
        </nav>

        <div className="flex items-center justify-end gap-2">
          <ButtonPrimaryLink
            href={headerCta.href}
            className="hidden min-h-10 rounded-lg px-4 py-2 text-sm shadow-none sm:inline-flex"
          >
            {headerCta.label}
          </ButtonPrimaryLink>

          <button
            type="button"
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-border bg-card px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-secondary focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 lg:hidden"
            aria-controls="site-mobile-navigation"
            aria-expanded={isMobileMenuOpen}
            onClick={toggleMobileMenu}
          >
            <span>Menu</span>
            <ChevronDownIcon aria-hidden="true" className="ml-2 size-4" />
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {activeDesktopNavigationGroup ? (
          <motion.div
            id={`site-mega-menu-${activeDesktopNavigationGroup.id}`}
            className={cn(
              "absolute top-full hidden rounded-2xl border border-border/80 bg-background/95 p-2 shadow-[0_20px_56px_rgb(0_0_0_/_0.42)] backdrop-blur-xl lg:block",
              isMultiColumnDesktopMenu
                ? "w-[min(34rem,calc(100vw-2rem))]"
                : "w-[min(22rem,calc(100vw-2rem))]",
            )}
            data-mega-menu-shell=""
            style={{ left: desktopPanelAnchor }}
            initial={reduceMotion ? false : { opacity: 0, x: "-50%", y: -8 }}
            animate={{ opacity: 1, x: "-50%", y: 0 }}
            exit={
              reduceMotion
                ? { opacity: 0, x: "-50%" }
                : { opacity: 0, x: "-50%", y: -6 }
            }
            transition={menuTransition}
          >
            <p className="px-3 pb-2 pt-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              {activeDesktopNavigationGroup.label}
            </p>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeDesktopNavigationGroup.id}
                className={cn(
                  "grid gap-1.5",
                  isMultiColumnDesktopMenu && "sm:grid-cols-2",
                )}
                data-mega-menu-panel=""
                initial={
                  reduceMotion
                    ? false
                    : { opacity: 0, x: 10 * desktopDirection }
                }
                animate={{ opacity: 1, x: 0 }}
                exit={
                  reduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, x: -8 * desktopDirection }
                }
                transition={contentTransition}
              >
                {activeDesktopNavigationGroup.items.map((item) => (
                  <HeaderNavigationItemLink
                    key={item.label}
                    item={item}
                    onNavigate={closeAllMenus}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {isMobileMenuOpen ? (
          <motion.div
            id="site-mobile-navigation"
            className="fixed inset-x-0 top-0 z-50 min-h-dvh overflow-y-auto border-b border-border bg-background/98 backdrop-blur-xl lg:hidden"
            data-mobile-layered-menu=""
            initial={reduceMotion ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={menuTransition}
          >
            <Container className="grid min-h-dvh max-w-[480px] grid-rows-[auto_1fr] gap-4 py-4">
              <AnimatePresence mode="wait" initial={false}>
                {activeMobileLayer === "root" ? (
                  <MobileNavigationRoot
                    key="mobile-root"
                    onClose={closeAllMenus}
                    onOpenGroup={openMobileGroup}
                    reduceMotion={reduceMotion}
                    transition={contentTransition}
                  />
                ) : activeMobileNavigationGroup ? (
                  <MobileNavigationDetail
                    key={activeMobileNavigationGroup.id}
                    group={activeMobileNavigationGroup}
                    onBack={() => setActiveMobileGroup(null)}
                    onClose={closeAllMenus}
                    reduceMotion={reduceMotion}
                    transition={contentTransition}
                  />
                ) : null}
              </AnimatePresence>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}

function HeaderNavigationGroupControl({
  group,
  isOpen,
  onOpen,
  onToggle,
}: {
  group: SiteNavigationGroup;
  isOpen: boolean;
  onOpen: () => void;
  onToggle: () => void;
}) {
  return (
    <div onMouseEnter={onOpen} onFocus={onOpen} data-nav-trigger={group.id}>
      <button
        type="button"
        className={cn(
          "inline-flex min-h-10 items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-card hover:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
          isOpen && "bg-card text-foreground",
        )}
        aria-controls={`site-mega-menu-${group.id}`}
        aria-expanded={isOpen}
        onClick={onToggle}
      >
        <span>{group.label}</span>
        <ChevronDownIcon
          aria-hidden="true"
          className={cn("size-3 transition-transform", isOpen && "rotate-180")}
        />
      </button>
    </div>
  );
}

function HeaderNavigationItemLink({
  item,
  onNavigate,
}: {
  item: SiteNavigationItem;
  onNavigate?: () => void;
}) {
  const className = cn(
    "group relative flex min-h-11 items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-card focus-visible:bg-card focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
    item.status === "planned" && "text-muted-foreground",
  );

  const content = (
    <>
      <span className="flex min-w-0 items-center gap-2">
        <span className="truncate font-medium">{item.label}</span>
        {item.status === "planned" ? (
          <span className="shrink-0 rounded-full border border-border px-1.5 py-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            Planejado
          </span>
        ) : null}
      </span>
      {item.status === "planned" ? (
        <span className="sr-only">Item planejado, sem rota futura pronta.</span>
      ) : (
        <ChevronRightIcon
          aria-hidden="true"
          className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
        />
      )}
    </>
  );

  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noreferrer"
        className={className}
        onClick={onNavigate}
      >
        {content}
      </a>
    );
  }

  return (
    <a href={item.href} className={className} onClick={onNavigate}>
      {content}
    </a>
  );
}

function MobileNavigationRoot({
  onClose,
  onOpenGroup,
  reduceMotion,
  transition,
}: {
  onClose: () => void;
  onOpenGroup: (groupId: HeaderGroupId) => void;
  reduceMotion: boolean;
  transition: HeaderMotionTransition;
}) {
  return (
    <motion.div
      className="grid gap-4"
      data-mobile-layer-root=""
      initial={reduceMotion ? false : { opacity: 0, x: -18 }}
      animate={{ opacity: 1, x: 0 }}
      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -14 }}
      transition={transition}
    >
      <div className="flex min-h-12 items-center justify-between gap-4">
        <div>
          <p className="font-heading text-base font-bold text-foreground">
            NITE
          </p>
          <p className="text-xs font-bold uppercase tracking-[0.14em]">
            <span className="text-[#ad3327]">UNI</span>
            <span className="text-[#23497f]">JORGE</span>
          </p>
        </div>
        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-border bg-card text-foreground transition-colors hover:bg-secondary focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          aria-label="Fechar menu"
          onClick={onClose}
        >
          <XIcon aria-hidden="true" className="size-4" />
        </button>
      </div>

      <ButtonPrimaryLink href={headerCta.href} onClick={onClose}>
        {headerCta.label}
      </ButtonPrimaryLink>

      <nav aria-label="Navegação principal mobile" className="grid gap-1.5">
        {headerNavigationGroups.map((group) => (
          <button
            key={group.id}
            type="button"
            className="flex min-h-14 items-center justify-between rounded-xl border border-border/90 bg-card/80 px-4 py-3 text-left text-base font-semibold text-foreground transition-colors hover:bg-secondary focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            aria-controls={`site-mobile-group-${group.id}`}
            aria-expanded="false"
            onClick={() => onOpenGroup(group.id)}
          >
            <span>{group.label}</span>
            <ChevronRightIcon aria-hidden="true" className="size-4" />
          </button>
        ))}
      </nav>
    </motion.div>
  );
}

function MobileNavigationDetail({
  group,
  onBack,
  onClose,
  reduceMotion,
  transition,
}: {
  group: SiteNavigationGroup;
  onBack: () => void;
  onClose: () => void;
  reduceMotion: boolean;
  transition: HeaderMotionTransition;
}) {
  return (
    <motion.div
      id={`site-mobile-group-${group.id}`}
      className="grid gap-4"
      data-mobile-layer-detail={group.id}
      initial={reduceMotion ? false : { opacity: 0, x: 18 }}
      animate={{ opacity: 1, x: 0 }}
      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 14 }}
      transition={transition}
    >
      <div className="flex min-h-12 items-center justify-between gap-3">
        <button
          type="button"
          className="inline-flex min-h-11 items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-secondary focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          onClick={onBack}
        >
          <ArrowLeftIcon aria-hidden="true" className="size-4" />
          Voltar
        </button>

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-border bg-card text-foreground transition-colors hover:bg-secondary focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          aria-label="Fechar menu"
          onClick={onClose}
        >
          <XIcon aria-hidden="true" className="size-4" />
        </button>
      </div>

      <div className="px-1">
        <p className="font-heading text-2xl font-semibold text-foreground">
          {group.label}
        </p>
      </div>

      <nav aria-label={`Links de ${group.label}`} className="grid gap-1.5">
        {group.items.map((item) => (
          <HeaderNavigationItemLink
            key={item.label}
            item={item}
            onNavigate={onClose}
          />
        ))}
      </nav>
    </motion.div>
  );
}
