import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://joydigital.in"),
  title: "Free Custom QR Code Generator | Joy Digital",
  description: "Generate free QR codes for website URLs, WhatsApp numbers, UPI payments, Google Maps, and WiFi networks. Download in PNG format instantly.",
  alternates: {
    canonical: "https://joydigital.in/qr-code-generator",
  },
  openGraph: {
    type: "website",
    url: "https://joydigital.in/qr-code-generator",
    siteName: "Joy Digital Agency",
    title: "Free QR Code Generator | URL, WhatsApp, UPI, WiFi | Joy Digital",
    description: "Generate free QR codes for website URLs, WhatsApp numbers, UPI payments, Google Maps, and WiFi networks. Download in PNG format instantly.",
    images: [{ url: "https://joydigital.in/assets/images/hero-banner.webp", width: 1200, height: 630, alt: "Free QR Code Generator - Joy Digital" }],
  },
};
