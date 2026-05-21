import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Sora } from "next/font/google";
import Script from "next/script";

import "@/app/globals.css";
import { buildPageTitle, defaultMetadata } from "@/biblioteca/seo";
import { siteConfig } from "@/biblioteca/site-config";
import { THEME_STORAGE_KEY } from "@/biblioteca/theme";

const headingFont = Sora({
  variable: "--font-sora",
  display: "swap",
  subsets: ["latin"],
});

const bodyFont = Geist({
  variable: "--font-geist",
  display: "swap",
  subsets: ["latin"],
});

const monoFont = Geist_Mono({
  variable: "--font-geist-mono",
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  ...defaultMetadata,
  title: buildPageTitle(),
};

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#09090a" },
    { media: "(prefers-color-scheme: light)", color: "#F7F3EA" },
  ],
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

const themeBootstrapScript = `
(() => {
  const storageKey = ${JSON.stringify(THEME_STORAGE_KEY)};
  const allowedPreferences = new Set(["system", "light", "dark"]);
  const root = document.documentElement;
  const normalizePreference = (value) => allowedPreferences.has(value) ? value : "system";
  const readPreference = () => {
    try {
      const preference = normalizePreference(window.localStorage.getItem(storageKey));
      window.localStorage.setItem(storageKey, preference);
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

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang={siteConfig.locale}
      className={`${headingFont.variable} ${bodyFont.variable} ${monoFont.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <Script
          dangerouslySetInnerHTML={{ __html: themeBootstrapScript }}
          id="theme-bootstrap"
          strategy="beforeInteractive"
        />
      </head>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <a
          href="#conteudo-principal"
          className="absolute left-4 top-4 z-50 -translate-y-16 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-transform focus:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Pular para o conteudo
        </a>
        {children}
      </body>
    </html>
  );
}
