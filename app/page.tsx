import React from "react";
import HomePageComponent from "@/components/sections/HomePageComponent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website Development Company in Chennai | Web Design & SEO Services | Joy Digital",
  description: "Joy Digital is a leading website development company in Chennai offering web design, custom website development, ecommerce websites, responsive web development and SEO services for businesses.",
  alternates: {
    canonical: "https://joydigital.in",
  },
  openGraph: {
    title: "Website Development Company in Chennai | Web Design & SEO Services | Joy Digital",
    description: "Joy Digital is a leading website development company in Chennai offering web design, custom website development, ecommerce websites, responsive web development and SEO services for businesses.",
    url: "https://joydigital.in",
    siteName: "Joy Digital",
    type: "website",
    images: [
      {
        url: "/assets/images/hero-banner.webp",
        width: 1024,
        height: 1024,
        alt: "Website Development Company in Chennai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Development Company in Chennai | Web Design & SEO Services | Joy Digital",
    description: "Joy Digital is a leading website development company in Chennai offering web design, custom website development, ecommerce websites, responsive web development and SEO services for businesses.",
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

