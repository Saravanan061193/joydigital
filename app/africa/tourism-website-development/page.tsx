import React from "react";
import type { Metadata } from "next";
import AfricaTourismClientPage from "./AfricaTourismClientPage";

export const metadata: Metadata = {
  title: "Custom Tourism Website Development for African Businesses | Joy Digital",
  description: "Joy Digital builds modern, fast, and conversion-focused custom tourism websites for African tour operators, safari companies, lodges, hotels, and DMCs targeting international travellers worldwide.",
  keywords: [
    "tourism website development Africa",
    "African tourism website development",
    "safari website development",
    "tour operator website development",
    "tourism website design Africa",
    "travel website development Africa",
    "safari website design",
    "African tour operator website",
    "custom tourism website development",
    "safari tour operator website design",
    "lodge and safari camp website development",
    "Joy Digital Africa Tourism"
  ],
  alternates: {
    canonical: "https://joydigital.in/africa/tourism-website-development",
  },
  openGraph: {
    title: "Custom Tourism Website Development for African Businesses",
    description: "Build a high-converting website for your African tour operator, safari company, hotel, or lodge targeting international travellers in Europe, UK, USA, Canada, Australia & worldwide.",
    url: "https://joydigital.in/africa/tourism-website-development",
    siteName: "Joy Digital",
    images: [
      {
        url: "https://joydigital.in/assets/images/african-safari-hero.png",
        width: 1200,
        height: 630,
        alt: "Custom Tourism Website Development for African Businesses",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function AfricaTourismWebsiteDevelopmentPage() {
  return <AfricaTourismClientPage />;
}
