import type { NextConfig } from "next";

import { assertPreviewDeploymentConfiguration } from "./src/lib/deployment-configuration";

if (process.env.VERCEL_ENV === "production") {
  assertPreviewDeploymentConfiguration(process.env);
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
