import type { Metadata } from "next";

import { siteConfig } from "@/biblioteca/site-config";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export function buildPageTitle(pageTitle?: string) {
  if (!pageTitle) {
    return `${siteConfig.name} | ${siteConfig.institution}`;
  }

  return `${pageTitle} | ${siteConfig.name}`;
}

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  description: siteConfig.description,
};
