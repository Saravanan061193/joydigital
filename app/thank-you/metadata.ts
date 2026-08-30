import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://joydigital.in"),
  title: "Thank You for Reaching Out | Joy Digital",
  description: "Thank you for reaching out to Joy Digital. Our team will review your inquiry and get back to you within 24 hours.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://joydigital.in/thank-you",
  },
  openGraph: {
    type: "website",
    url: "https://joydigital.in/thank-you",
    siteName: "Joy Digital Agency",
    title: "Thank You | Joy Digital",
    description: "Thank you for reaching out to Joy Digital. Our team will review your inquiry and get back to you within 24 hours.",
    images: [{ url: "https://joydigital.in/assets/images/hero-banner.webp", width: 1200, height: 630, alt: "Thank You - Joy Digital" }],
  },
};
