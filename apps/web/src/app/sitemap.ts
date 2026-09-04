import type { MetadataRoute } from "next";

import { getIndexablePeople, getIndexableProjects } from "@nite/content";
import { getIndexableNewsArticles } from "@/lib/news";
import { absoluteUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date(siteConfig.lastUpdated);
  const indexableNewsArticles = await getIndexableNewsArticles();

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
    ...indexableNewsArticles.map((article) => ({
      url: absoluteUrl(`/atualizacoes/${article.slug}`),
      lastModified: new Date(`${article.publishedAt}T00:00:00Z`),
    })),
  ];
}
