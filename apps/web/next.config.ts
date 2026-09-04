import type { NextConfig } from "next";

import { assertProductionDeploymentConfiguration } from "./src/lib/deployment-configuration";

const isCloudflareDeployment =
  process.env.PORTAL_DEPLOYMENT_ENV === "production";

if (process.env.VERCEL_ENV === "production" || isCloudflareDeployment) {
  assertProductionDeploymentConfiguration(process.env);
}

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: false,
  poweredByHeader: false,
  transpilePackages: ["@nite/content", "@nite/news", "@nite/ui"],
  typedRoutes: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
