"use client";

import Link from "next/link";
import {
  type RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { ChevronDownIcon } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

import {
  headerNavigationGroups,
  type SiteNavigationGroup,
  type SiteNavigationItem,
} from "./navigation";
import { Container } from "./container";
import { buttonVariants } from "../button";
import { HeaderLogoMorph } from "./header-logo-morph";
import { ThemeToggleButton, ThemeTogglePanel } from "./theme-toggle";
import { UnijorgeBrandText } from "./unijorge-brand-text";
import { cn } from "../utils";

const HEADER_COLLAPSE_END = 96;
const HEADER_COLLAPSE_STATE_AT = 72;
const HEADER_EFFECT_STATE_AT = 10;
const HEADER_MOTION_EASE = [0.22, 1, 0.36, 1] as const;
const NITE_MENU_EASE = [0.4, 0, 0.2, 1] as const;
const MOBILE_MENU_FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");
const mobileControlClassName = cn(
  buttonVariants({ variant: "secondary", size: "md" }),
  "min-h-11 rounded-md border-border bg-card px-3 py-2",
);
type HeaderGroupId = SiteNavigationGroup["id"];
type MobilePanelId = HeaderGroupId | "appearance";
type HeaderMotionTransition = {
  duration: number;
  ease?: typeof HEADER_MOTION_EASE;
};

function getFocusableMenuElements(container: HTMLElement | null) {
  if (!container) {
    return [];
  }

  return Array.from(
    container.querySelectorAll<HTMLElement>(MOBILE_MENU_FOCUSABLE_SELECTOR),
  ).filter((element) => {
    const isDisabled =
      element.getAttribute("aria-disabled") === "true" ||
      element.hasAttribute("disabled");
    const isHidden =
      element.getAttribute("aria-hidden") === "true" ||
      element.closest('[aria-hidden="true"]');

    return !isDisabled && !isHidden && element.tabIndex >= 0;
  });
}

export function SiteHeader() {
  const headerRef = useRef<HTMLElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement | null>(null);
  const lastMobileTabDirectionRef = useRef<"forward" | "backward">("forward");
  const wasMobileMenuOpenRef = useRef(false);
  const activeDesktopGroupRef = useRef<HeaderGroupId | null>(null);
  const desktopCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const { scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  const reduceMotion = shouldReduceMotion ?? false;
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [activeDesktopGroup, setActiveDesktopGroup] =
    useState<HeaderGroupId | null>(null);
  const [desktopDirection, setDesktopDirection] = useState(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobilePanel, setActiveMobilePanel] =
    useState<MobilePanelId | null>(null);
  const [isThemePopoverOpen, setIsThemePopoverOpen] = useState(false);

  const activeDesktopNavigationGroup = headerNavigationGroups.find(
    (group) => group.id === activeDesktopGroup,
  );
  const activeMobileNavigationGroup = headerNavigationGroups.find(
    (group) => group.id === activeMobilePanel,
  );
  const isMobileAppearancePanel = activeMobilePanel === "appearance";
  const activeMobileLayer = activeMobilePanel ? "detail" : "root";
  const menuTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.16, ease: HEADER_MOTION_EASE };
  const contentTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.18, ease: HEADER_MOTION_EASE };
  const desktopMenuTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.2, ease: NITE_MENU_EASE };
  const desktopContentTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.2, ease: NITE_MENU_EASE };
  const desktopMenuItemCount = activeDesktopNavigationGroup?.items.length ?? 0;
  const isTwoColumnDesktopMenu = desktopMenuItemCount > 4;
  const desktopMenuHeightClass =
    !isTwoColumnDesktopMenu && desktopMenuItemCount > 3
      ? "h-[10.75rem]"
      : "h-[8.25rem]";

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

  useEffect(() => {
    const updateCollapsedState = () => {
      const nextScrollY = window.scrollY;

      setHasScrolled(nextScrollY > HEADER_EFFECT_STATE_AT);
      setIsCollapsed(nextScrollY >= HEADER_COLLAPSE_STATE_AT);
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
    setHasScrolled(latest > HEADER_EFFECT_STATE_AT);
    setIsCollapsed(latest >= HEADER_COLLAPSE_STATE_AT);
  });

  const closeAllMenus = useCallback(() => {
    cancelDesktopClose();
    setIsThemePopoverOpen(false);
    setActiveDesktopGroup(null);
    setIsMobileMenuOpen(false);
    setActiveMobilePanel(null);
  }, [
    cancelDesktopClose,
    setActiveDesktopGroup,
    setActiveMobilePanel,
    setIsMobileMenuOpen,
    setIsThemePopoverOpen,
  ]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }

      closeAllMenus();
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
      setActiveMobilePanel(null);
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
  }, [cancelDesktopClose, closeAllMenus, scheduleDesktopClose]);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      if (wasMobileMenuOpenRef.current) {
        window.requestAnimationFrame(() => {
          mobileMenuButtonRef.current?.focus();
        });
      }

      wasMobileMenuOpenRef.current = false;
      return;
    }

    wasMobileMenuOpenRef.current = true;
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const keepFocusInsideMobileMenu = (event: KeyboardEvent) => {
      if (event.key !== "Tab") {
        return;
      }

      lastMobileTabDirectionRef.current = event.shiftKey
        ? "backward"
        : "forward";
      const focusableElements = getFocusableMenuElements(mobileMenuRef.current);

      if (focusableElements.length === 0) {
        event.preventDefault();
        mobileMenuRef.current?.focus();
        return;
      }

      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      if (!firstFocusable || !lastFocusable) {
        return;
      }

      if (!mobileMenuRef.current?.contains(activeElement)) {
        event.preventDefault();
        (event.shiftKey ? lastFocusable : firstFocusable).focus();
        return;
      }

      if (event.shiftKey && activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable.focus();
        return;
      }

      if (!event.shiftKey && activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable.focus();
      }
    };

    document.addEventListener("keydown", keepFocusInsideMobileMenu);

    return () => {
      document.removeEventListener("keydown", keepFocusInsideMobileMenu);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const redirectFocusToMobileMenu = (event: FocusEvent) => {
      if (
        !mobileMenuRef.current ||
        (event.target instanceof Node &&
          mobileMenuRef.current.contains(event.target))
      ) {
        return;
      }

      const focusableElements = getFocusableMenuElements(mobileMenuRef.current);
      const fallbackTarget =
        lastMobileTabDirectionRef.current === "backward"
          ? focusableElements[focusableElements.length - 1]
          : focusableElements[0];

      fallbackTarget?.focus();
    };

    document.addEventListener("focusin", redirectFocusToMobileMenu);

    return () => {
      document.removeEventListener("focusin", redirectFocusToMobileMenu);
    };
  }, [isMobileMenuOpen]);

  const openDesktopGroup = (groupId: HeaderGroupId) => {
    cancelDesktopClose();

    const currentIndex = headerNavigationGroups.findIndex(
      (group) => group.id === activeDesktopGroup,
    );
    const nextIndex = headerNavigationGroups.findIndex(
      (group) => group.id === groupId,
    );

    setDesktopDirection(
      currentIndex === -1 || nextIndex >= currentIndex ? 1 : -1,
    );
    setIsThemePopoverOpen(false);
    setActiveDesktopGroup(groupId);
    setIsMobileMenuOpen(false);
    setActiveMobilePanel(null);
  };

  const toggleMobileMenu = () => {
    cancelDesktopClose();

    setIsMobileMenuOpen((isOpen) => {
      if (isOpen) {
        setActiveMobilePanel(null);
      } else {
        setActiveDesktopGroup(null);
        setIsThemePopoverOpen(false);
      }

      return !isOpen;
    });
  };

  const openMobilePanel = (panelId: MobilePanelId) => {
    setActiveMobilePanel(panelId);
  };

  return (
    <motion.header
      ref={headerRef}
      className={cn(
        "sticky top-0 z-40 overflow-visible bg-transparent transition-colors duration-nite-micro ease-nite-out before:z-50 before:backdrop-blur-2xl before:backdrop-brightness-200 after:z-0 after:backdrop-blur-md",
      )}
      data-header-collapsed={isCollapsed ? "true" : "false"}
      data-header-scrolled={hasScrolled ? "true" : "false"}
      data-site-header=""
      onMouseEnter={cancelDesktopClose}
      onMouseLeave={scheduleDesktopClose}
    >
      <Container
        size="xl"
        className="relative z-10 flex h-[58px] min-h-[58px] items-center gap-0 py-0"
      >
        <div className="flex flex-1 lg:w-[225px]">
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
        </div>

        <nav
          aria-label="Navegação principal"
          className="hidden items-center lg:flex"
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

        <div className="flex flex-1 items-center justify-end gap-4">
          <ThemeToggleButton
            id="theme-toggle-desktop"
            className="hidden lg:block"
            open={isThemePopoverOpen}
            onOpenChange={(isOpen) => {
              setIsThemePopoverOpen(isOpen);

              if (!isOpen) {
                return;
              }

              cancelDesktopClose();
              setActiveDesktopGroup(null);
            }}
          />

          <button
            ref={mobileMenuButtonRef}
            type="button"
            className={cn(mobileControlClassName, "lg:hidden")}
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
            className="absolute left-0 top-full z-50 hidden w-full justify-center [perspective:2000px] lg:flex"
            data-mega-menu-stage=""
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, transition: { duration: 0.16 } }
            }
            transition={desktopMenuTransition}
          >
            <motion.div
              id={`site-mega-menu-${activeDesktopNavigationGroup.id}`}
              className={cn(
                "relative w-[24rem] origin-[top_center] overflow-hidden rounded-3xl border border-nite-border-soft bg-nite-overlay backdrop-blur-md transition-[width,height] duration-300 ease-out",
                desktopMenuHeightClass,
              )}
              data-mega-menu-shell=""
              initial={reduceMotion ? false : { rotateX: -10, scale: 0.9 }}
              animate={{
                rotateX: 0,
                scale: 1,
                opacity: 1,
                filter: "blur(0px)",
              }}
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : {
                      opacity: 0,
                      rotateX: -10,
                      scale: 0.9,
                      filter: "blur(10px)",
                    }
              }
              transition={desktopMenuTransition}
            >
              <AnimatePresence initial={false}>
                <motion.div
                  key={activeDesktopNavigationGroup.id}
                  className="absolute left-0 top-0 flex h-full w-full"
                  data-mega-menu-panel=""
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          x: 100 * desktopDirection,
                          filter: "blur(5px)",
                        }
                  }
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={
                    reduceMotion
                      ? { opacity: 0 }
                      : {
                          opacity: 0,
                          x: -100 * desktopDirection,
                          filter: "blur(5px)",
                        }
                  }
                  transition={desktopContentTransition}
                >
                  <div className="flex h-full w-full flex-row items-stretch justify-between gap-16 p-5">
                    <ul
                      className={cn(
                        "grid content-start gap-x-10 gap-y-3",
                        isTwoColumnDesktopMenu
                          ? "grid-flow-col grid-rows-3"
                          : "grid-flow-row",
                      )}
                    >
                      {activeDesktopNavigationGroup.items.map((item) => (
                        <li key={item.label}>
                          <HeaderNavigationItemLink
                            item={item}
                            variant="desktop"
                            onNavigate={closeAllMenus}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {isMobileMenuOpen ? (
          <motion.div
            ref={mobileMenuRef}
            id="site-mobile-navigation"
            className="fixed inset-x-0 top-0 z-50 h-dvh overflow-y-auto bg-background lg:hidden"
            data-mobile-layered-menu=""
            role="dialog"
            aria-modal="true"
            aria-label="Navegação principal mobile"
            tabIndex={-1}
            initial={reduceMotion ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={menuTransition}
          >
            <Container
              className="grid min-h-dvh max-w-[480px] grid-rows-[auto_1fr] gap-0 px-6 py-4 sm:px-6 lg:px-6"
              data-mobile-menu-container=""
            >
              <AnimatePresence mode="wait" initial={false}>
                {activeMobileLayer === "root" ? (
                  <MobileNavigationRoot
                    key="mobile-root"
                    onClose={closeAllMenus}
                    onOpenPanel={openMobilePanel}
                    reduceMotion={reduceMotion}
                    transition={contentTransition}
                  />
                ) : isMobileAppearancePanel ? (
                  <MobileAppearanceDetail
                    key="appearance"
                    onBack={() => setActiveMobilePanel(null)}
                    onClose={closeAllMenus}
                    reduceMotion={reduceMotion}
                    transition={contentTransition}
                  />
                ) : activeMobileNavigationGroup ? (
                  <MobileNavigationDetail
                    key={activeMobileNavigationGroup.id}
                    group={activeMobileNavigationGroup}
                    onBack={() => setActiveMobilePanel(null)}
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
          "inline-flex h-[58px] select-none items-center gap-1.5 px-3 py-1 text-sm font-medium text-nite-text-muted outline-hidden transition duration-150 ease-in-out hover:text-nite-text-primary focus-visible:text-nite-text-primary focus-visible:ring-2 focus-visible:ring-ring/40",
          isOpen && "text-nite-text-primary",
        )}
        aria-controls={`site-mega-menu-${group.id}`}
        aria-expanded={isOpen}
        onClick={onToggle}
      >
        <span>{group.label}</span>
        <ChevronDownIcon
          aria-hidden="true"
          className={cn(
            "size-3.5 text-nite-text-muted transition-[color,transform] duration-150 ease-in-out",
            isOpen && "translate-y-0.5 text-nite-text-primary",
          )}
        />
      </button>
    </div>
  );
}

function HeaderNavigationItemLink({
  item,
  onNavigate,
  variant = "mobile",
}: {
  item: SiteNavigationItem;
  onNavigate?: () => void;
  variant?: "desktop" | "mobile";
}) {
  if (variant === "desktop") {
    return <DesktopNavigationItemLink item={item} onNavigate={onNavigate} />;
  }

  const className = cn(
    "group relative flex min-h-[57px] items-center justify-between gap-3 rounded-none border-0 border-b border-nite-border-subtle bg-transparent px-0 py-4 text-base font-semibold leading-6 text-nite-text-secondary outline-none transition-colors hover:bg-nite-surface-subtle hover:text-nite-text-primary focus-visible:bg-nite-surface-subtle focus-visible:text-nite-text-primary focus-visible:ring-3 focus-visible:ring-inset focus-visible:ring-ring/50",
    item.status === "planned" && "text-nite-text-muted",
  );

  const content = (
    <>
      <span className="flex min-w-0 items-center gap-2">
        <span className="truncate">{item.label}</span>
        {item.status === "planned" ? (
          <span className="shrink-0 rounded-full border border-border px-1.5 py-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            Planejado
          </span>
        ) : null}
      </span>
      {item.status === "planned" ? (
        <span className="sr-only">Item planejado, sem rota futura pronta.</span>
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
        data-mobile-menu-row=""
        onClick={onNavigate}
      >
        {content}
      </a>
    );
  }

  if (item.status === "planned") {
    return (
      <span className={className} aria-disabled="true" data-mobile-menu-row="">
        {content}
      </span>
    );
  }

  return (
    <a
      href={item.href}
      className={className}
      data-mobile-menu-row=""
      onClick={onNavigate}
    >
      {content}
    </a>
  );
}

function DesktopNavigationItemLink({
  item,
  onNavigate,
}: {
  item: SiteNavigationItem;
  onNavigate?: () => void;
}) {
  const className = cn(
    "inline-flex items-center gap-2 font-heading text-base font-light leading-[1.3125rem] text-nite-text-secondary outline-hidden transition duration-150 ease-in-out hover:text-nite-text-primary focus-visible:text-nite-text-primary focus-visible:ring-2 focus-visible:ring-ring/40",
    item.status === "planned" && "text-nite-text-muted",
  );
  const content = (
    <>
      <span>{item.label}</span>
      {item.status === "planned" ? (
        <span className="rounded-full border border-nite-border-soft px-1.5 py-0.5 text-[0.62rem] font-semibold uppercase text-nite-text-muted">
          Planejado
        </span>
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

  if (item.status === "planned") {
    return (
      <span className={className} aria-disabled="true">
        {content}
      </span>
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
  onOpenPanel,
  reduceMotion,
  transition,
}: {
  onClose: () => void;
  onOpenPanel: (panelId: MobilePanelId) => void;
  reduceMotion: boolean;
  transition: HeaderMotionTransition;
}) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  return (
    <motion.div
      className="grid gap-0"
      data-mobile-layer-root=""
      initial={reduceMotion ? false : { opacity: 0, x: -18 }}
      animate={{ opacity: 1, x: 0 }}
      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -14 }}
      transition={transition}
    >
      <MobileMenuHeader closeButtonRef={closeButtonRef} onClose={onClose} />

      <nav aria-label="Navegação principal mobile" className="mt-8 grid">
        {headerNavigationGroups.map((group) => (
          <MobileMenuPanelButton
            key={group.id}
            label={group.label}
            controls={`site-mobile-group-${group.id}`}
            onClick={() => onOpenPanel(group.id)}
          />
        ))}
        <MobileMenuPanelButton
          label="Aparência"
          controls="site-mobile-appearance"
          onClick={() => onOpenPanel("appearance")}
        />
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
  const backButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    backButtonRef.current?.focus();
  }, []);

  return (
    <motion.div
      id={`site-mobile-group-${group.id}`}
      className="grid gap-0"
      data-mobile-layer-detail={group.id}
      initial={reduceMotion ? false : { opacity: 0, x: 18 }}
      animate={{ opacity: 1, x: 0 }}
      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 14 }}
      transition={transition}
    >
      <MobileMenuDetailIntro
        title={group.label}
        backButtonRef={backButtonRef}
        onBack={onBack}
        onClose={onClose}
      />

      <nav aria-label={`Links de ${group.label}`} className="mt-4 grid">
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

function MobileAppearanceDetail({
  onBack,
  onClose,
  reduceMotion,
  transition,
}: {
  onBack: () => void;
  onClose: () => void;
  reduceMotion: boolean;
  transition: HeaderMotionTransition;
}) {
  const backButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    backButtonRef.current?.focus();
  }, []);

  return (
    <motion.div
      id="site-mobile-appearance"
      className="grid gap-0"
      data-mobile-layer-detail="appearance"
      initial={reduceMotion ? false : { opacity: 0, x: 18 }}
      animate={{ opacity: 1, x: 0 }}
      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 14 }}
      transition={transition}
    >
      <MobileMenuDetailIntro
        title="Aparência"
        backButtonRef={backButtonRef}
        onBack={onBack}
        onClose={onClose}
      />
      <ThemeTogglePanel
        id="theme-toggle-mobile"
        className="mt-4"
        variant="flat"
      />
    </motion.div>
  );
}

function MobileMenuHeader({
  closeButtonRef,
  onClose,
}: {
  closeButtonRef?: RefObject<HTMLButtonElement | null>;
  onClose: () => void;
}) {
  return (
    <div className="flex h-10 items-center justify-between gap-4">
      <div className="leading-none">
        <p className="font-heading text-base font-bold leading-5 text-foreground">
          NITE
        </p>
        <UnijorgeBrandText className="mt-0.5 text-[0.6875rem] font-bold uppercase leading-4 tracking-[0.14em]" />
      </div>
      <button
        ref={closeButtonRef}
        type="button"
        className="inline-flex size-10 items-center justify-center rounded-md border-0 bg-transparent p-1 text-nite-text-secondary outline-none transition-colors hover:text-nite-text-primary focus-visible:ring-3 focus-visible:ring-ring/50"
        aria-label="Fechar menu"
        onClick={onClose}
      >
        <MobileMenuCloseIcon className="size-8" />
      </button>
    </div>
  );
}

function MobileMenuDetailIntro({
  title,
  backButtonRef,
  onBack,
  onClose,
}: {
  title: string;
  backButtonRef: RefObject<HTMLButtonElement | null>;
  onBack: () => void;
  onClose: () => void;
}) {
  return (
    <>
      <MobileMenuHeader onClose={onClose} />
      <button
        ref={backButtonRef}
        type="button"
        className="mt-8 inline-flex size-10 items-center justify-start rounded-md border-0 bg-transparent text-nite-text-secondary outline-none transition-colors hover:text-nite-text-primary focus-visible:ring-3 focus-visible:ring-ring/50"
        aria-label="Voltar ao menu principal"
        onClick={onBack}
      >
        <MobileMenuBackIcon className="size-5" />
      </button>
      <h2 className="mt-4 font-heading text-2xl font-semibold leading-8 text-foreground">
        {title}
      </h2>
    </>
  );
}

function MobileMenuPanelButton({
  label,
  controls,
  onClick,
}: {
  label: string;
  controls: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className="flex min-h-[57px] w-full items-center justify-between rounded-none border-0 border-b border-nite-border-subtle bg-transparent px-0 py-4 text-left text-base font-semibold leading-6 text-nite-text-secondary outline-none transition-colors hover:bg-nite-surface-subtle hover:text-nite-text-primary focus-visible:bg-nite-surface-subtle focus-visible:text-nite-text-primary focus-visible:ring-3 focus-visible:ring-inset focus-visible:ring-ring/50"
      aria-controls={controls}
      aria-expanded="false"
      data-mobile-menu-row=""
      onClick={onClick}
    >
      <span>{label}</span>
      <MobileMenuArrowIcon className="size-5 shrink-0" />
    </button>
  );
}

function MobileMenuArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      data-mobile-menu-arrow=""
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M14.707 19.707a1 1 0 1 1-1.414-1.414l2.732-2.732c.945-.945.276-2.56-1.06-2.56H3a1 1 0 1 1 0-2h11.965c1.336 0 2.005-1.617 1.06-2.562l-2.732-2.732a1 1 0 1 1 1.414-1.414l7 7a1 1 0 0 1 0 1.414z"
      />
    </svg>
  );
}

function MobileMenuBackIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M9.293 4.293a1 1 0 0 1 1.414 1.414L7.975 8.439C7.03 9.384 7.699 11 9.035 11H21a1 1 0 1 1 0 2H9.035c-1.336 0-2.005 1.615-1.06 2.56l2.732 2.733a1 1 0 0 1-1.414 1.414l-7-7a1 1 0 0 1 0-1.414z"
      />
    </svg>
  );
}

function MobileMenuCloseIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M16.793 5.793a1 1 0 0 1 1.414 1.414l-3.379 3.379a2 2 0 0 0 0 2.828l3.379 3.379a1 1 0 0 1-1.414 1.414l-3.379-3.379a2 2 0 0 0-2.828 0l-3.379 3.379a1 1 0 0 1-1.414-1.414l3.379-3.379a2 2 0 0 0 0-2.828L5.793 7.207a1 1 0 0 1 1.414-1.414l3.379 3.379a2 2 0 0 0 2.828 0z"
      />
    </svg>
  );
}
