import React from "react";
import HomePageComponent from "@/components/sections/HomePageComponent";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ country: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return [
    { country: "us" },
    { country: "uk" },
    { country: "ae" },
    { country: "in" },
  ];
}

const METADATA_MAP: Record<string, { title: string; description: string }> = {
  us: {
    title: "Next.js Web Development & SEO Agency USA | Joy Digital",
    description: "Scale organic revenue. Joy Digital is a premium digital agency serving US businesses with custom web design, headless Next.js platforms, and results-driven SEO.",
  },
  uk: {
    title: "Professional Web Design & SEO Services UK | Joy Digital",
    description: "Convert search traffic into loyal buyers. Joy Digital constructs high-speed corporate sites and executes organic search engine marketing campaigns across the UK.",
  },
  ae: {
    title: "Web Development & SEO Agency Dubai & UAE | Joy Digital",
    description: "Dominate Google search. Joy Digital builds speed-optimized corporate portals, e-commerce stores, and Google Map packs for businesses in the UAE.",
  },
  in: {
    title: "Top Website Design & SEO Company India | Joy Digital",
    description: "Boost your customer conversions. Joy Digital is India's leading SEO & custom web design agency, delivering search marketing and Map pack ranking systems.",
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { country } = await params;
  const countryLower = country.toLowerCase();
  const data = METADATA_MAP[countryLower] || {
    title: "Website Design & Global SEO Growth Agency | Joy Digital",
    description: "Joy Digital is a results-oriented global agency engineering fast Next.js sites and search marketing campaigns.",
  };

  return {
    title: data.title,
    description: data.description,
    alternates: {
      canonical: `https://joydigital.in/${countryLower}`,
      languages: {
        "x-default": "https://joydigital.in",
        "en-us": "https://joydigital.in/us",
        "en-gb": "https://joydigital.in/uk",
        "en-ae": "https://joydigital.in/ae",
        "en-in": "https://joydigital.in/in",
      },
    },
  };
}

export default async function CountryHomePage({ params }: PageProps) {
  const { country } = await params;
  const countryLower = country.toLowerCase();
  
  return (
    <>
      <HomePageComponent country={countryLower} />
    </>
  );
}
