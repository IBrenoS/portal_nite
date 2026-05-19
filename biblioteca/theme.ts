export const THEME_STORAGE_KEY = "nite-theme";

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
