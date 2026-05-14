"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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
  const { scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  const reduceMotion = shouldReduceMotion ?? false;
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeDesktopGroup, setActiveDesktopGroup] =
    useState<HeaderGroupId | null>(null);
  const [desktopDirection, setDesktopDirection] = useState(1);
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

  const collapseProgress = useTransform(
    scrollY,
    [0, HEADER_COLLAPSE_END],
    [0, 1],
    { clamp: true },
  );

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

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsCollapsed(latest >= HEADER_COLLAPSE_STATE_AT);
  });

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }

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

      setActiveDesktopGroup(null);
      setIsMobileMenuOpen(false);
      setActiveMobileGroup(null);
    };

    window.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOnOutsidePointer);

    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOnOutsidePointer);
    };
  }, []);

  const openDesktopGroup = (groupId: HeaderGroupId) => {
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
    >
      <Container className="grid min-h-16 max-w-[1240px] grid-cols-[minmax(10.75rem,1fr)_auto] items-center gap-4 py-2 sm:min-h-[72px] lg:min-h-20 lg:grid-cols-[15rem_minmax(0,1fr)_auto] lg:gap-7 lg:py-0">
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
          aria-label="Navegação principal"
          className="hidden items-center justify-self-end lg:flex lg:gap-1 xl:gap-2"
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
            className="hidden min-h-10 rounded-md px-4 py-2 text-sm sm:inline-flex lg:min-h-11"
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
            className="hidden border-t border-border bg-popover shadow-[0_24px_70px_rgb(0_0_0_/_0.32)] lg:block"
            data-mega-menu-shell=""
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={menuTransition}
          >
            <Container className="grid max-w-[1240px] gap-4 py-5">
              <div>
                <p className="font-heading text-sm font-semibold text-foreground">
                  {activeDesktopNavigationGroup.label}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Navegação preparada para o MVP, com itens futuros sinalizados
                  sem parecerem funcionalidades prontas.
                </p>
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeDesktopNavigationGroup.id}
                  className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3"
                  data-mega-menu-panel=""
                  initial={
                    reduceMotion
                      ? false
                      : { opacity: 0, x: 14 * desktopDirection }
                  }
                  animate={{ opacity: 1, x: 0 }}
                  exit={
                    reduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, x: -10 * desktopDirection }
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
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {isMobileMenuOpen ? (
          <motion.div
            id="site-mobile-navigation"
            className="fixed inset-x-0 top-0 z-50 min-h-dvh overflow-y-auto border-b border-border bg-background/96 backdrop-blur-xl lg:hidden"
            data-mobile-layered-menu=""
            initial={reduceMotion ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={menuTransition}
          >
            <Container className="grid min-h-dvh max-w-[640px] grid-rows-[auto_1fr] gap-5 py-4">
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
    <div
      className={cn(
        "inline-flex items-center rounded-md text-sm font-medium text-muted-foreground transition-colors",
        isOpen && "bg-accent text-foreground",
      )}
      onMouseEnter={onOpen}
      onFocus={onOpen}
      data-nav-trigger={group.id}
    >
      <a
        href={group.href}
        className="inline-flex min-h-11 items-center rounded-l-md px-3 py-3 transition-colors hover:bg-accent hover:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 xl:px-3.5"
      >
        {group.label}
      </a>
      <button
        type="button"
        className="inline-flex min-h-11 min-w-8 items-center justify-center rounded-r-md px-2 transition-colors hover:bg-accent hover:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        aria-controls={`site-mega-menu-${group.id}`}
        aria-expanded={isOpen}
        aria-label={`Abrir grupo ${group.label}`}
        onClick={onToggle}
      >
        <ChevronDownIcon
          aria-hidden="true"
          className={cn(
            "size-3.5 transition-transform",
            isOpen && "rotate-180",
          )}
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
    "relative flex min-h-11 flex-col justify-center rounded-md border border-border bg-card px-3 py-2 pr-10 text-sm text-foreground transition-colors hover:border-ring hover:bg-secondary focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
    item.status === "planned" && "border-dashed text-muted-foreground",
  );

  const content = (
    <>
      <span className="font-medium">{item.label}</span>
      {item.status === "planned" ? (
        <span className="mt-1 text-xs text-muted-foreground">
          Planejado, sem rota futura pronta
        </span>
      ) : null}
      {item.status === "mvp" ? (
        <ChevronRightIcon
          aria-hidden="true"
          className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
        />
      ) : null}
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
      className="grid gap-5"
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
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
            UNIJORGE
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

      <nav aria-label="Navegação principal mobile" className="grid gap-2">
        {headerNavigationGroups.map((group) => (
          <button
            key={group.id}
            type="button"
            className="flex min-h-14 items-center justify-between rounded-lg border border-border bg-card px-4 py-3 text-left text-base font-semibold text-foreground transition-colors hover:bg-secondary focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
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
      className="grid gap-5"
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

      <div>
        <p className="font-heading text-2xl font-semibold text-foreground">
          {group.label}
        </p>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Links do grupo selecionado, mantendo rotas futuras como planejadas e
          sem parecerem funcionalidades prontas.
        </p>
      </div>

      <nav aria-label={`Links de ${group.label}`} className="grid gap-2">
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
