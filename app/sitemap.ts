import type { MetadataRoute } from "next";

import {
  getIndexablePeople,
  getIndexableProjects,
} from "@/biblioteca/conteudo";
import { absoluteUrl } from "@/biblioteca/seo";
import { siteConfig } from "@/biblioteca/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(siteConfig.lastUpdated);

  return [
    {
      url: absoluteUrl("/"),
      lastModified,
    },
    {
      url: absoluteUrl("/sobre"),
      lastModified,
    },
    ...getIndexableProjects().map((project) => ({
      url: absoluteUrl(`/projetos/${project.slug}`),
      lastModified,
    })),
    ...getIndexablePeople().map((person) => ({
      url: absoluteUrl(`/pessoas/${person.slug}`),
      lastModified,
    })),
  ];
}
