import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  typedRoutes: true,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 100],
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
