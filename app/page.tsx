import React from "react";
import HomePageComponent from "@/components/sections/HomePageComponent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Design & Digital Marketing Agency in Madurai | Joy Digital",
  description: "Joy Digital is the premier website design company & digital marketing agency in Madurai. We offer custom web design, local SEO, Google Business Profile setup, and lead generation.",
  alternates: {
    canonical: "https://joydigital.in",
  },
  openGraph: {
    title: "Web Design & Digital Marketing Agency in Madurai | Joy Digital",
    description: "Joy Digital is the premier website design company & digital marketing agency in Madurai. We offer custom web design, local SEO, Google Business Profile setup, and lead generation.",
    url: "https://joydigital.in",
    siteName: "Joy Digital",
    type: "website",
    images: [
      {
        url: "/assets/images/hero-banner.webp",
        width: 1024,
        height: 1024,
        alt: "Joy Digital - Web Design & Digital Marketing Agency in Madurai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Design & Digital Marketing Agency in Madurai | Joy Digital",
    description: "Joy Digital is the premier website design company & digital marketing agency in Madurai. We offer custom web design, local SEO, Google Business Profile setup, and lead generation.",
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

