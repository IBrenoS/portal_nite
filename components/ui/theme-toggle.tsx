"use client";

import { useEffect, useState } from "react";
import { CheckIcon, MonitorIcon, MoonIcon, SunIcon } from "lucide-react";

import {
  normalizeThemePreference,
  THEME_STORAGE_KEY,
  themePreferenceLabels,
  themePreferences,
  type ResolvedTheme,
  type ThemePreference,
} from "@/biblioteca/theme";
import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  id: string;
  className?: string;
};

const themePreferenceIcons = {
  system: MonitorIcon,
  light: SunIcon,
  dark: MoonIcon,
} satisfies Record<ThemePreference, typeof MonitorIcon>;

const getSystemTheme = (): ResolvedTheme => {
  if (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-color-scheme: light)").matches
  ) {
    return "light";
  }

  return "dark";
};

const resolveTheme = (preference: ThemePreference): ResolvedTheme =>
  preference === "system" ? getSystemTheme() : preference;

const applyThemePreference = (preference: ThemePreference) => {
  if (typeof document === "undefined") {
    return;
  }

  const resolvedTheme = resolveTheme(preference);
  const root = document.documentElement;

  root.dataset.theme = resolvedTheme;
  root.dataset.themePreference = preference;
  root.classList.toggle("dark", resolvedTheme === "dark");
};

const readStoredThemePreference = () => {
  if (typeof window === "undefined") {
    return "system";
  }

  const storedPreference = normalizeThemePreference(
    window.localStorage.getItem(THEME_STORAGE_KEY),
  );

  if (window.localStorage.getItem(THEME_STORAGE_KEY) !== storedPreference) {
    window.localStorage.setItem(THEME_STORAGE_KEY, storedPreference);
  }

  return storedPreference;
};

export function ThemeToggle({ id, className }: ThemeToggleProps) {
  const [preference, setPreference] = useState<ThemePreference>("system");

  useEffect(() => {
    const syncTheme = () => {
      const nextPreference = readStoredThemePreference();

      setPreference(nextPreference);
      applyThemePreference(nextPreference);
    };

    const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");
    const handleStorage = (event: StorageEvent) => {
      if (event.key === THEME_STORAGE_KEY) {
        syncTheme();
      }
    };

    syncTheme();
    mediaQuery.addEventListener("change", syncTheme);
    window.addEventListener("storage", handleStorage);

    return () => {
      mediaQuery.removeEventListener("change", syncTheme);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const updatePreference = (nextPreference: ThemePreference) => {
    window.localStorage.setItem(THEME_STORAGE_KEY, nextPreference);
    setPreference(nextPreference);
    applyThemePreference(nextPreference);
  };

  return (
    <fieldset
      className={cn("min-w-0", className)}
      data-theme-toggle=""
      data-theme-preference={preference}
    >
      <legend className="sr-only">Tema da interface</legend>
      <div className="inline-flex max-w-full flex-wrap items-center gap-1 rounded-lg border border-border bg-card/80 p-1 text-xs font-semibold text-muted-foreground">
        {themePreferences.map((themePreference) => {
          const Icon = themePreferenceIcons[themePreference];
          const isSelected = preference === themePreference;
          const inputId = `${id}-${themePreference}`;

          return (
            <label key={themePreference} htmlFor={inputId} className="min-w-0">
              <input
                id={inputId}
                type="radio"
                name={id}
                value={themePreference}
                checked={isSelected}
                className="peer sr-only"
                onChange={() => updatePreference(themePreference)}
              />
              <span
                className={cn(
                  "inline-flex min-h-9 items-center gap-1.5 rounded-md border border-transparent px-2.5 py-1.5 transition-colors peer-focus-visible:border-ring peer-focus-visible:ring-3 peer-focus-visible:ring-ring/50",
                  isSelected
                    ? "bg-primary text-[var(--primary-foreground)]"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                )}
              >
                <Icon className="size-3.5" aria-hidden="true" />
                <span>{themePreferenceLabels[themePreference]}</span>
                {isSelected ? (
                  <CheckIcon className="size-3.5" aria-hidden="true" />
                ) : null}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
