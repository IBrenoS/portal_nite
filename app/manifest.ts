import type { MetadataRoute } from "next";

import { siteConfig } from "@/biblioteca/site-config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} | ${siteConfig.institution}`,
    short_name: siteConfig.name,
    description: siteConfig.description,
    lang: siteConfig.locale,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#04080F",
    theme_color: "#04080F",
    icons: [
      {
        src: "/icon.svg",
        sizes: "64x64",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
