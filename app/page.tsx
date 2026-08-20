import React from "react";
import HomePageComponent from "@/components/sections/HomePageComponent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://joydigital.in"),
  verification: {
    google: "yYfFlGYZPthQmXcw3V9yq2U2OlPPPxWBCtG7URIXDwQ",
  },
  title: "Web Design, Web Development & SEO Services Worldwide | Joy Digital",
  description: "Joy Digital is a premium web development and SEO agency. We design fast, high-converting Next.js websites and optimize search engine visibility for startups, small businesses, and growing companies worldwide.",
  alternates: {
    canonical: "./",
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://joydigital.in",
    siteName: "Joy Digital Agency",
    title: "Web Design, Web Development & SEO Services Worldwide | Joy Digital",
    description: "Joy Digital is a premium web development and SEO agency. We design fast, high-converting Next.js websites and optimize search engine visibility for startups, small businesses, and growing companies worldwide.",
    images: [
      {
        url: "/assets/images/hero-banner.webp",
        width: 1024,
        height: 1024,
        alt: "Joy Digital - Web Design, Web Development & SEO Services Worldwide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Design, Web Development & SEO Services Worldwide | Joy Digital",
    description: "Joy Digital is a premium web development and SEO agency. We design fast, high-converting Next.js websites and optimize search engine visibility for startups, small businesses, and growing companies worldwide.",
    images: ["/assets/images/hero-banner.webp"],
  },
};

const homeSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Joy Digital",
  "url": "https://joydigital.in",
  "logo": "https://joydigital.in/assets/images/logo.webp",
  "sameAs": [
    "https://www.facebook.com/profile.php?id=61590372457559",
    "https://www.youtube.com/@Joydigital2026"
  ]
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />
      <HomePageComponent country="" />
    </>
  );
}

