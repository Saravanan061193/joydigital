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
import ClientWidgets from "@/components/ui/ClientWidgets";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://joydigital.in"),
  title: "Next.js Engineering Agency | Build Sub-Second SaaS Apps",
  description: "Eliminate slow page loads and scale your SaaS. We build high-converting, sub-second Next.js web systems for global tech leaders. Book a 15-min tech call.",
  keywords: [
    "Next.js Agency",
    "Next.js Engineering Agency",
    "Web Performance Optimization",
    "B2B SaaS Web Systems",
    "Modern Frontend Architecture",
    "Generative Engine Optimization",
    "Joy Digital"
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
      "en-IN": "https://joydigital.in",
      "en-US": "https://joydigital.in/us",
      "en-GB": "https://joydigital.in/uk",
      "en-AE": "https://joydigital.in/ae",
      "en-CA": "https://joydigital.in/ca",
      "en-AU": "https://joydigital.in/au",
      "es-ES": "https://joydigital.in/es",
      "de-DE": "https://joydigital.in/de",
      "fr-FR": "https://joydigital.in/fr",
      "it-IT": "https://joydigital.in/it",
      "en-SG": "https://joydigital.in/sg",
      "es-MX": "https://joydigital.in/mx",
      "pt-BR": "https://joydigital.in/br",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "ProfessionalService",
                  "@id": "https://joydigital.in/#organization",
                  "name": "Joy Digital",
                  "url": "https://joydigital.in",
                  "logo": "https://joydigital.in/logo.png",
                  "telephone": "+91-9080026133",
                  "priceRange": "$$$",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Perungalathur",
                    "addressLocality": "Chennai",
                    "addressRegion": "Tamil Nadu",
                    "addressCountry": "IN"
                  },
                  "founder": {
                    "@type": "Person",
                    "name": "Saravanan L"
                  },
                  "sameAs": [
                    "https://share.google/BSniheS2qnzwqUKXU",
                    "https://www.facebook.com/profile.php?id=61590372457559",
                    "https://www.youtube.com/@Joydigital2026",
                    "https://www.linkedin.com/in/saravanan-l-34a861154/",
                    "https://wa.me/919080026133"
                  ]
                },
                {
                  "@type": "WebSite",
                  "@id": "https://joydigital.in/#website",
                  "url": "https://joydigital.in",
                  "name": "Joy Digital",
                  "publisher": {
                    "@id": "https://joydigital.in/#organization"
                  }
                },
                {
                  "@type": "Service",
                  "name": "Custom Next.js Web Application Development",
                  "provider": {
                    "@id": "https://joydigital.in/#organization"
                  },
                  "serviceType": "Web Engineering & GEO",
                  "areaServed": ["IN", "US", "UK", "UAE", "AU"],
                  "description": "Sub-second custom Next.js web application development for Tours & Travels booking engines, Logistics tracking portals, and EXIM RFQ platforms."
                }
              ]
            })
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-light-bg text-text-primary">
        <NavigationLoadingBar />
        <GoogleAnalytics />
        <AnalyticsTracker />
        <ClarityTracker />
        <GoogleTranslateLoader />
        {children}
        <ClientWidgets />
      </body>
    </html>
  );
}
