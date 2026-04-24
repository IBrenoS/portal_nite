import type { MetadataRoute } from "next";

import { getIndexableProjects } from "@/biblioteca/conteudo";
import { absoluteUrl } from "@/biblioteca/seo";
import { siteConfig } from "@/biblioteca/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(siteConfig.lastUpdated);

  return [
    {
      url: absoluteUrl("/"),
      lastModified,
    },
    ...getIndexableProjects().map((project) => ({
      url: absoluteUrl(`/projetos/${project.slug}`),
      lastModified,
    })),
  ];
}
