import type { MetadataRoute } from "next";

import {
  getIndexableNewsArticles,
  getIndexablePeople,
  getIndexableProjects,
} from "@nite/content";
import { absoluteUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

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
    {
      url: absoluteUrl("/atualizacoes"),
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
    ...getIndexableNewsArticles().map((article) => ({
      url: absoluteUrl(`/atualizacoes/${article.slug}`),
      lastModified: new Date(`${article.publishedAt}T00:00:00Z`),
    })),
  ];
}
