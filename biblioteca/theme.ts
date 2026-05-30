export const THEME_STORAGE_KEY = "nite-theme";
export const THEME_CHANGE_EVENT = "nite-theme-change";

export const themePreferences = ["system", "light", "dark"] as const;

export type ThemePreference = (typeof themePreferences)[number];
export type ResolvedTheme = Exclude<ThemePreference, "system">;

export const themePreferenceLabels = {
  system: "Sistema",
  light: "Claro",
  dark: "Escuro",
} satisfies Record<ThemePreference, string>;

export const isThemePreference = (
  value: string | null,
): value is ThemePreference =>
  value === "system" || value === "light" || value === "dark";

export const normalizeThemePreference = (
  value: string | null,
): ThemePreference => (isThemePreference(value) ? value : "system");

export const getSystemTheme = (): ResolvedTheme => {
  if (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-color-scheme: light)").matches
  ) {
    return "light";
  }

  return "dark";
};

export const resolveTheme = (preference: ThemePreference): ResolvedTheme =>
  preference === "system" ? getSystemTheme() : preference;

export const applyThemePreference = (preference: ThemePreference) => {
  if (typeof document === "undefined") {
    return;
  }

  const resolvedTheme = resolveTheme(preference);
  const root = document.documentElement;

  root.dataset.theme = resolvedTheme;
  root.dataset.themePreference = preference;
  root.classList.toggle("dark", resolvedTheme === "dark");
};

export const readStoredThemePreference = (): ThemePreference => {
  if (typeof window === "undefined") {
    return "system";
  }

  try {
    const storedPreference = window.localStorage.getItem(THEME_STORAGE_KEY);
    const preference = normalizeThemePreference(storedPreference);

    if (storedPreference !== preference) {
      window.localStorage.setItem(THEME_STORAGE_KEY, preference);
    }

    return preference;
  } catch {
    return "system";
  }
};

export const persistThemePreference = (preference: ThemePreference) => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, preference);
  } catch {
    return;
  }
};

export const dispatchThemeChange = () => {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
};

export const buildThemeBootstrapScript = () => `
(() => {
  const storageKey = ${JSON.stringify(THEME_STORAGE_KEY)};
  const allowedPreferences = new Set(${JSON.stringify(themePreferences)});
  const root = document.documentElement;
  const normalizePreference = (value) => allowedPreferences.has(value) ? value : "system";
  const readPreference = () => {
    try {
      const storedPreference = window.localStorage.getItem(storageKey);
      const preference = normalizePreference(storedPreference);

      if (storedPreference !== preference) {
        window.localStorage.setItem(storageKey, preference);
      }

      return preference;
    } catch {
      return "system";
    }
  };
  const resolveTheme = (preference) => {
    if (preference === "light" || preference === "dark") {
      return preference;
    }

    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  };
  const preference = readPreference();
  const theme = resolveTheme(preference);

  root.dataset.theme = theme;
  root.dataset.themePreference = preference;
  root.classList.toggle("dark", theme === "dark");
})();
`;
