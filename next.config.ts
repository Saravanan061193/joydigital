import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  async redirects() {
    return [
      {
        source: "/seo-services-usa",
        destination: "/seo-services",
        permanent: true,
      },
      {
        source: "/seo-services-uk",
        destination: "/seo-services",
        permanent: true,
      },
      {
        source: "/seo-services-uae",
        destination: "/seo-services",
        permanent: true,
      },
      {
        source: "/website-development-usa",
        destination: "/website-development",
        permanent: true,
      },
      {
        source: "/website-development-uk",
        destination: "/website-development",
        permanent: true,
      },
      {
        source: "/website-development-madurai",
        destination: "/web-development-company-in-madurai",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
