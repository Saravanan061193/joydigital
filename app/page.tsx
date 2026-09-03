import React from "react";
import HomePageComponent, { HOME_FAQS } from "@/components/sections/HomePageComponent";
import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageGraphSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  metadataBase: new URL("https://joydigital.in"),
  title: "Custom Website Development Company | Joy Digital",
  description: "Joy Digital is an enterprise custom website development company. We build sub-second Next.js web applications, bespoke web systems, and search engine solutions for global brands.",
  keywords: [
    "Custom Website Development Company",
    "Custom Web Development",
    "Custom Website Development Services",
    "Bespoke Website Development",
    "Business Website Development",
    "Top Website Development Agency",
    "Top Website Development Company",
    "Next.js Web Development",
    "React Web Development",
    "Joy Digital",
    "Digital Marketing",
    "Web Engineering",
    "Enterprise SEO"
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
    title: "Custom Website Development Company | Joy Digital",
    description: "Joy Digital is an enterprise custom website development company. We build sub-second Next.js web applications, bespoke web systems, and search engine solutions for global brands.",
    images: [
      {
        url: "https://joydigital.in/assets/images/hero-banner.webp",
        width: 1200,
        height: 630,
        alt: "Joy Digital - Custom Website Development Company",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Website Development Company | Joy Digital",
    description: "Joy Digital is an enterprise custom website development company. We build sub-second Next.js web applications, bespoke web systems, and search engine solutions for global brands.",
    images: ["https://joydigital.in/assets/images/hero-banner.webp"],
    creator: "@joydigital",
  },
};

export default function HomePage() {
  const homeGraph = buildPageGraphSchema({
    url: "https://joydigital.in/",
    title: "Web Design, Next.js Development & SEO Agency | Joy Digital",
    description: "Grow your business with Joy Digital. We build high-converting, fast Next.js websites and data-driven SEO solutions for global clients.",
    isHomepage: true,
    faqs: HOME_FAQS,
  });

  return (
    <>
      <JsonLd schema={homeGraph} />
      <HomePageComponent country="" />
    </>
  );
}
