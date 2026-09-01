import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "date-fns"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
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
        source: "/seo_services",
        destination: "/seo-services",
        permanent: true,
      },
      {
        source: "/website_development",
        destination: "/website-development",
        permanent: true,
      },
      {
        source: "/custom_website_development",
        destination: "/custom-website-development",
        permanent: true,
      },
      {
        source: "/dynamic_website_development",
        destination: "/dynamic-website-development",
        permanent: true,
      },
      {
        source: "/web_design_services",
        destination: "/web-design-services",
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
      {
        source: "/assets/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:all*(svg|jpg|png|webp|avif|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
