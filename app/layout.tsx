import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import dynamic from "next/dynamic";
import FontAwesomeLoader from "@/components/layout/FontAwesomeLoader";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import ClarityTracker from "@/components/ClarityTracker";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import NavigationLoadingBar from "@/components/ui/NavigationLoadingBar";

import GoogleTranslateLoader from "@/components/GoogleTranslateLoader";

const ChatbotWidget = dynamic(() => import("@/components/ui/ChatbotWidget"));
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

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
    "Digital Marketing"
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
    canonical: "./",
    languages: {
      "en-US": "https://joydigital.in/us",
      "en-GB": "https://joydigital.in/uk",
      "en-AE": "https://joydigital.in/ae",
      "en-IN": "https://joydigital.in/in",
      "en-CA": "https://joydigital.in/ca",
      "en-AU": "https://joydigital.in/au",
      "x-default": "https://joydigital.in",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.clarity.ms" />
        <link rel="dns-prefetch" href="https://www.clarity.ms" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <FontAwesomeLoader />
      </head>
      <body className="min-h-full flex flex-col bg-light-bg text-text-primary">
        <NavigationLoadingBar />
        <GoogleAnalytics />
        <AnalyticsTracker />
        <ClarityTracker />
        <GoogleTranslateLoader />
        {children}
        <ChatbotWidget />
      </body>
    </html>
  );
}
