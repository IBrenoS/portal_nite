import type { NextConfig } from "next";
import { fileURLToPath } from "node:url";

import { assertProductionDeploymentConfiguration } from "./src/lib/deployment-configuration";

const isCloudflareDeployment =
  process.env.PORTAL_DEPLOYMENT_ENV === "production";

if (process.env.VERCEL_ENV === "production" || isCloudflareDeployment) {
  assertProductionDeploymentConfiguration(process.env);
}

const publicMediaUrl = process.env.NITE_NEWS_MEDIA_URL;
let mediaRemotePattern: URL | undefined;
try {
  const candidate = publicMediaUrl ? new URL(publicMediaUrl) : undefined;
  mediaRemotePattern =
    candidate && ["https:", "http:"].includes(candidate.protocol)
      ? candidate
      : undefined;
} catch {
  mediaRemotePattern = undefined;
}

const nextConfig: NextConfig = {
  output: isCloudflareDeployment ? "standalone" : undefined,
  outputFileTracingRoot: isCloudflareDeployment
    ? fileURLToPath(new URL("../..", import.meta.url))
    : undefined,
  poweredByHeader: false,
  transpilePackages: ["@nite/content", "@nite/news", "@nite/ui"],
  typedRoutes: true,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 100],
    remotePatterns: mediaRemotePattern ? [mediaRemotePattern] : [],
  },
  async redirects() {
    return [
      {
        source: "/projetos/software-aplicado",
        destination: "/projetos/data-center",
        permanent: true,
      },
      {
        source: "/projetos/software-aplicado-demonstrativo",
        destination: "/projetos/data-center",
        permanent: true,
      },
      {
        source: "/projetos/robotica-educacional",
        destination: "/projetos/jogos-embarcados",
        permanent: true,
      },
      {
        source: "/projetos/robotica-educacional-demonstrativo",
        destination: "/projetos/jogos-embarcados",
        permanent: true,
      },
      {
        source: "/projetos/dados-ia-demonstrativo",
        destination: "/projetos/dados-e-ia",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        source: "/icon.svg",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
