import React from "react";
import HomePageComponent from "@/components/sections/HomePageComponent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website Design Company & Global SEO Agency | Joy Digital",
  description: "Joy Digital is a premier global digital agency specializing in custom web development, Next.js engineering, organic search ranking (SEO), and lead generation funnels.",
  alternates: {
    canonical: "https://joydigital.in",
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

