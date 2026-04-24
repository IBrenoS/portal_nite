import type { Metadata } from "next";

import type { Project } from "@/biblioteca/esquemas";
import { siteConfig } from "@/biblioteca/site-config";

const fallbackSiteUrl = "http://localhost:3000";
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? fallbackSiteUrl;
const siteUrl = new URL(configuredSiteUrl).origin;
const siteName = `${siteConfig.name} | ${siteConfig.institution}`;
const homeTitle = "NITE UNIJORGE | Inovação, tecnologia e projetos aplicados";
const homeDescription =
  "Conheça o NITE da UNIJORGE, núcleo de inovação e tecnologia que organiza projetos aplicados, aprendizado prático e experiências institucionais.";
const socialImage = "/opengraph-image";

export function buildPageTitle(pageTitle?: string) {
  if (!pageTitle) {
    return siteName;
  }

  return `${pageTitle} | ${siteConfig.name}`;
}

export function absoluteUrl(path = "/") {
  return new URL(path, `${siteUrl}/`).toString();
}

export const defaultMetadata: Metadata = {
  metadataBase: new URL(`${siteUrl}/`),
  applicationName: siteConfig.name,
  creator: siteConfig.name,
  publisher: siteConfig.institution,
  category: "education",
  description: siteConfig.description,
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: "/icon.svg",
  },
};

export function buildHomeMetadata(): Metadata {
  return {
    ...defaultMetadata,
    title: homeTitle,
    description: homeDescription,
    keywords: [
      siteConfig.name,
      siteConfig.institution,
      "inovacao",
      "inovação",
      "tecnologia",
      "projetos aplicados",
      "educacao tecnologica",
      "educação tecnológica",
    ],
    alternates: {
      canonical: absoluteUrl("/"),
    },
    openGraph: {
      title: homeTitle,
      description: homeDescription,
      url: absoluteUrl("/"),
      siteName,
      locale: "pt_BR",
      type: "website",
      images: [
        {
          url: absoluteUrl(socialImage),
          width: 1200,
          height: 630,
          alt: "NITE UNIJORGE com visual tecnológico azul e fundo escuro.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: homeTitle,
      description: homeDescription,
      images: [absoluteUrl(socialImage)],
    },
  };
}

export function buildProjectMetadata(project: Project): Metadata {
  const title = buildPageTitle(project.seo?.title ?? project.title);
  const description = project.seo?.description ?? project.summary;
  const canonical = absoluteUrl(`/projetos/${project.slug}`);
  const image = absoluteUrl(project.coverImage);
  const isPlaceholder = project.status === "placeholder";

  return {
    ...defaultMetadata,
    title,
    description,
    alternates: {
      canonical,
    },
    robots: isPlaceholder
      ? {
          index: false,
          follow: true,
          googleBot: {
            index: false,
            follow: true,
          },
        }
      : {
          index: true,
          follow: true,
        },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName,
      locale: "pt_BR",
      type: "article",
      images: [
        {
          url: image,
          alt: project.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export function buildHomeJsonLd() {
  const organizationId = `${siteUrl}/#organization`;
  const websiteId = `${siteUrl}/#website`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: siteConfig.name,
        alternateName: siteName,
        url: absoluteUrl("/"),
        description: siteConfig.description,
        logo: absoluteUrl("/icon.svg"),
        parentOrganization: {
          "@type": "EducationalOrganization",
          name: siteConfig.institution,
        },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: siteName,
        url: absoluteUrl("/"),
        inLanguage: siteConfig.locale,
        publisher: {
          "@id": organizationId,
        },
      },
    ],
  };
}

export function buildBreadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export { siteUrl };
