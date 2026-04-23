import type { Metadata } from "next";

import { siteConfig } from "@/biblioteca/site-config";

export function buildPageTitle(pageTitle?: string) {
  if (!pageTitle) {
    return `${siteConfig.name} | ${siteConfig.institution}`;
  }

  return `${pageTitle} | ${siteConfig.name}`;
}

export const defaultMetadata: Metadata = {
  description: siteConfig.description,
};
