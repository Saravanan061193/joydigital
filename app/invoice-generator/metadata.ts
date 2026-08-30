import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://joydigital.in"),
  title: "Free GST Invoice Generator PDF | Joy Digital",
  description: "Generate professional GST invoices instantly with our free online invoice generator. Add items, taxes, discounts, and download as PDF — no signup required.",
  alternates: {
    canonical: "https://joydigital.in/invoice-generator",
  },
  openGraph: {
    type: "website",
    url: "https://joydigital.in/invoice-generator",
    siteName: "Joy Digital Agency",
    title: "Free Invoice Generator | Create GST PDF Invoices Online | Joy Digital",
    description: "Generate professional GST invoices instantly with our free online invoice generator. Add items, taxes, discounts, and download as PDF — no signup required.",
    images: [{ url: "https://joydigital.in/assets/images/hero-banner.webp", width: 1200, height: 630, alt: "Free Invoice Generator - Joy Digital" }],
  },
};
