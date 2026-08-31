import React from "react";
import HomePageComponent from "@/components/sections/HomePageComponent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://joydigital.in"),
  title: "Web Design, Next.js Development & SEO Agency | Joy Digital",
  description: "Grow your business with Joy Digital. We build high-converting, fast Next.js websites and data-driven SEO solutions for global clients.",
  keywords: [
    "Web Design",
    "Web Development",
    "Next.js Development",
    "SEO Services",
    "Joy Digital",
    "Digital Marketing",
    "web developer near me",
    "website designer near me",
    "website developer near me",
    "web designer near me"
  ],
  authors: [{ name: "Joy Digital", url: "https://joydigital.in" }],
  publisher: "Joy Digital",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://joydigital.in",
    languages: {
      "x-default": "https://joydigital.in",
      "en-us": "https://joydigital.in/us",
      "en-gb": "https://joydigital.in/uk",
      "en-ae": "https://joydigital.in/ae",
      "en-in": "https://joydigital.in/in",
    },
  },
  verification: {
    google: "yYfFlGYZPthQmXcw3V9yq2U2OlPPPxWBCtG7URIXDwQ",
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
    siteName: "Joy Digital",
    title: "Web Design, Next.js Development & SEO Agency | Joy Digital",
    description: "Grow your business with Joy Digital. We build high-converting, fast Next.js websites and data-driven SEO solutions for global clients.",
    images: [
      {
        url: "https://joydigital.in/assets/images/hero-banner.webp",
        width: 1200,
        height: 630,
        alt: "Joy Digital - Web Design, Next.js Development & SEO Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Design, Next.js Development & SEO Agency | Joy Digital",
    description: "Grow your business with Joy Digital. We build high-converting, fast Next.js websites and data-driven SEO solutions for global clients.",
    images: ["https://joydigital.in/assets/images/hero-banner.webp"],
    creator: "@joydigital",
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
