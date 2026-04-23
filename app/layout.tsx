import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";

import "@/app/globals.css";
import { buildPageTitle, defaultMetadata } from "@/biblioteca/seo";
import { siteConfig } from "@/biblioteca/site-config";

const headingFont = Sora({
  variable: "--font-sora",
  display: "swap",
  subsets: ["latin"],
});

const bodyFont = Inter({
  variable: "--font-inter",
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  ...defaultMetadata,
  title: buildPageTitle(),
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#04080F",
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang={siteConfig.locale}
      className={`dark ${headingFont.variable} ${bodyFont.variable}`}
      suppressHydrationWarning
    >
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
