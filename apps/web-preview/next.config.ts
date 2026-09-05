import type { NextConfig } from "next";

import { assertProductionDeploymentConfiguration } from "@nite/web/deployment-configuration";

if (process.env.VERCEL_ENV === "production") {
  assertProductionDeploymentConfiguration(process.env);
  const resolverUrl = process.env.CMS_PREVIEW_RESOLVE_URL;
  let resolverUsesHttps = false;
  try {
    resolverUsesHttps = Boolean(
      resolverUrl && new URL(resolverUrl).protocol === "https:",
    );
  } catch {
    resolverUsesHttps = false;
  }
  if (!resolverUsesHttps) {
    throw new Error(
      "Configuracao de producao invalida: CMS_PREVIEW_RESOLVE_URL.",
    );
  }
}

function mediaRemotePatterns(value: string | undefined) {
  if (!value) return [];
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") return [];
    const basePath = url.pathname.replace(/\/+$/u, "");
    return [
      {
        protocol: "https" as const,
        hostname: url.hostname,
        port: url.port,
        pathname: `${basePath || ""}/**`,
      },
    ];
  } catch {
    return [];
  }
}

const nextConfig: NextConfig = {
  poweredByHeader: false,
  transpilePackages: ["@nite/content", "@nite/news", "@nite/ui", "@nite/web"],
  typedRoutes: true,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 100],
    remotePatterns: mediaRemotePatterns(process.env.NITE_NEWS_MEDIA_URL),
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
