import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif, Sora } from "next/font/google";
import Script from "next/script";

import "@/app/globals.css";
import { buildPageTitle, defaultMetadata } from "@/biblioteca/seo";
import { siteConfig } from "@/biblioteca/site-config";
import { buildThemeBootstrapScript } from "@/biblioteca/theme";

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

const resendDisplayFont = Instrument_Serif({
  variable: "--font-instrument-serif",
  display: "swap",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  ...defaultMetadata,
  title: buildPageTitle(),
};

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
    { media: "(prefers-color-scheme: light)", color: "#F7F3EA" },
  ],
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

const themeBootstrapScript = buildThemeBootstrapScript();

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang={siteConfig.locale}
      className={`${headingFont.variable} ${bodyFont.variable} ${monoFont.variable} ${resendDisplayFont.variable}`}
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
          className="skip-link absolute left-4 top-4 z-50 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Pular para o conteudo
        </a>
        {children}
      </body>
    </html>
  );
}
