import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/free-audit",
        destination: "/free-website-audit",
        permanent: true,
      },
      {
        source: "/free-tools/gst-calculator",
        destination: "/gst-calculator",
        permanent: true,
      },
      {
        source: "/free-tools/invoice-generator",
        destination: "/invoice-generator",
        permanent: true,
      },
      {
        source: "/free-tools/quotation-generator",
        destination: "/quotation-generator",
        permanent: true,
      },
      {
        source: "/free-tools/qr-code-generator",
        destination: "/qr-code-generator",
        permanent: true,
      },
      {
        source: "/free-tools/whatsapp-link-generator",
        destination: "/whatsapp-link-generator",
        permanent: true,
      },
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
        source: "/website-development-chennai",
        destination: "/website-development-company-chennai",
        permanent: true,
      },
      {
        source: "/website-development-madurai",
        destination: "/website-development-company-madurai",
        permanent: true,
      },
      {
        source: "/web-development-company-in-chennai",
        destination: "/website-development-company-chennai",
        permanent: true,
      },
      {
        source: "/website-design-company-in-madurai",
        destination: "/website-development-company-madurai",
        permanent: true,
      },
      {
        source: "/web-development-company-in-madurai",
        destination: "/website-development-company-madurai",
        permanent: true,
      },
      {
        source: "/seo-services-in-madurai",
        destination: "/seo-services-madurai",
        permanent: true,
      },
      {
        source: "/digital-marketing-agency-in-madurai",
        destination: "/seo-services-madurai",
        permanent: true,
      },
      {
        source: "/nocev/:path*",
        destination: "/",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
