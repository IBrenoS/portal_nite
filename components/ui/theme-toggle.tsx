"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CheckIcon, MonitorIcon, MoonIcon, SunIcon } from "lucide-react";

import {
  applyThemePreference,
  dispatchThemeChange,
  persistThemePreference,
  readStoredThemePreference,
  THEME_CHANGE_EVENT,
  THEME_STORAGE_KEY,
  themePreferenceLabels,
  themePreferences,
  type ThemePreference,
} from "@/biblioteca/theme";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  id: string;
  className?: string;
};

type ThemeTogglePanelProps = ThemeToggleProps & {
  onPreferenceChange?: (preference: ThemePreference) => void;
};

type ThemeToggleButtonProps = ThemeToggleProps & {
  open?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
};

type ThemePreferenceOptionProps = {
  id: string;
  isSelected: boolean;
  name: string;
  preference: ThemePreference;
  onSelect: (preference: ThemePreference) => void;
};

const themePreferenceIcons = {
  system: MonitorIcon,
  light: SunIcon,
  dark: MoonIcon,
} satisfies Record<ThemePreference, typeof MonitorIcon>;

function useThemePreference() {
  const [preference, setPreference] = useState<ThemePreference>("system");

  useEffect(() => {
    const syncTheme = () => {
      const nextPreference = readStoredThemePreference();

      setPreference(nextPreference);
      applyThemePreference(nextPreference);
    };

    const mediaQuery =
      typeof window.matchMedia === "function"
        ? window.matchMedia("(prefers-color-scheme: light)")
        : null;
    const handleStorage = (event: StorageEvent) => {
      if (event.key === THEME_STORAGE_KEY || event.key === null) {
        syncTheme();
      }
    };

    syncTheme();
    mediaQuery?.addEventListener("change", syncTheme);
    window.addEventListener("storage", handleStorage);
    window.addEventListener(THEME_CHANGE_EVENT, syncTheme);

    return () => {
      mediaQuery?.removeEventListener("change", syncTheme);
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener(THEME_CHANGE_EVENT, syncTheme);
    };
  }, []);

  const updatePreference = (nextPreference: ThemePreference) => {
    persistThemePreference(nextPreference);
    setPreference(nextPreference);
    applyThemePreference(nextPreference);
    dispatchThemeChange();
  };

  return { preference, updatePreference };
}

function ThemePreferenceOption({
  id,
  isSelected,
  name,
  preference,
  onSelect,
}: ThemePreferenceOptionProps) {
  const Icon = themePreferenceIcons[preference];

  return (
    <label htmlFor={id} className="min-w-0">
      <input
        id={id}
        type="radio"
        name={name}
        value={preference}
        checked={isSelected}
        className="peer sr-only"
        onChange={() => onSelect(preference)}
      />
      <span
        className={cn(
          "flex min-h-10 items-center justify-between gap-3 rounded-md border border-transparent px-3 py-2 text-sm transition-colors peer-focus-visible:border-ring peer-focus-visible:ring-3 peer-focus-visible:ring-ring/50",
          isSelected
            ? "bg-primary text-[var(--primary-foreground)]"
            : "text-muted-foreground hover:bg-secondary hover:text-foreground",
        )}
      >
        <span className="flex min-w-0 items-center gap-2">
          <Icon className="size-4 shrink-0" aria-hidden="true" />
          <span className="truncate">{themePreferenceLabels[preference]}</span>
        </span>
        {isSelected ? (
          <CheckIcon className="size-4 shrink-0" aria-hidden="true" />
        ) : null}
      </span>
    </label>
  );
}

export function ThemeTogglePanel({
  id,
  className,
  onPreferenceChange,
}: ThemeTogglePanelProps) {
  const { preference, updatePreference } = useThemePreference();
  const selectPreference = (nextPreference: ThemePreference) => {
    updatePreference(nextPreference);
    onPreferenceChange?.(nextPreference);
  };

  return (
    <fieldset
      aria-label="Tema da interface"
      className={cn(
        "min-w-0 rounded-xl border border-border/80 bg-card/80 p-2",
        className,
      )}
      data-theme-toggle=""
      data-theme-preference={preference}
    >
      <div className="grid gap-1">
        {themePreferences.map((themePreference) => {
          const inputId = `${id}-${themePreference}`;

          return (
            <ThemePreferenceOption
              key={themePreference}
              id={inputId}
              name={id}
              preference={themePreference}
              isSelected={preference === themePreference}
              onSelect={selectPreference}
            />
          );
        })}
      </div>
    </fieldset>
  );
}

export function ThemeToggleButton({
  id,
  className,
  open,
  onOpenChange,
}: ThemeToggleButtonProps) {
  const { preference } = useThemePreference();
  const [internalOpen, setInternalOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const Icon = themePreferenceIcons[preference];
  const isOpen = open ?? internalOpen;

  const setPopoverOpen = useCallback(
    (nextOpen: boolean) => {
      if (open === undefined) {
        setInternalOpen(nextOpen);
      }

      onOpenChange?.(nextOpen);
    },
    [onOpenChange, open],
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const closePopover = () => setPopoverOpen(false);
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }

      closePopover();
      buttonRef.current?.focus();
    };
    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (rootRef.current?.contains(event.target as Node)) {
        return;
      }

      closePopover();
    };

    window.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOnOutsidePointer);

    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOnOutsidePointer);
    };
  }, [isOpen, setPopoverOpen]);

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        ref={buttonRef}
        type="button"
        className={cn(
          buttonVariants({ variant: "secondary", size: "icon" }),
          "rounded-lg border-border/80 bg-card/80 text-muted-foreground hover:text-foreground",
        )}
        aria-controls={`${id}-panel`}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-label={`Alterar tema da interface. Tema atual: ${themePreferenceLabels[preference]}`}
        onClick={() => setPopoverOpen(!isOpen)}
      >
        <Icon aria-hidden="true" className="size-4" />
      </button>

      {isOpen ? (
        <div
          id={`${id}-panel`}
          className="absolute right-0 top-full z-30 mt-2 w-56"
        >
          <ThemeTogglePanel
            id={`${id}-options`}
            className="bg-background/98 shadow-nite-lift"
            onPreferenceChange={() => setPopoverOpen(false)}
          />
        </div>
      ) : null}
    </div>
  );
}

export function ThemeToggle(props: ThemeTogglePanelProps) {
  return <ThemeTogglePanel {...props} />;
}
