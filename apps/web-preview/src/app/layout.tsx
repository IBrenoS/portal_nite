import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter, Sora } from "next/font/google";
import Script from "next/script";

import "@nite/web/styles.css";
import { buildPageTitle, defaultMetadata } from "@nite/web/seo";
import { buildThemeBootstrapScript, siteConfig } from "@nite/ui";

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
const resendFont = Inter({
  variable: "--font-inter",
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
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#09090A" },
    { media: "(prefers-color-scheme: light)", color: "#F4F7FA" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang={siteConfig.locale}
      className={`${headingFont.variable} ${bodyFont.variable} ${resendFont.variable} ${monoFont.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <Script
          dangerouslySetInnerHTML={{ __html: buildThemeBootstrapScript() }}
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
