import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import FontAwesomeLoader from "@/components/layout/FontAwesomeLoader";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import ClarityTracker from "@/components/ClarityTracker";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import "./globals.css";


const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://joydigital.in"),
  verification: {
    google: "yYfFlGYZPthQmXcw3V9yq2U2OlPPPxWBCtG7URIXDwQ",
  },
  title: "Joy Digital | Web Design & Digital Marketing Agency",
  description: "Joy Digital is a premium web development and search marketing agency. We build fast, high-converting Next.js websites and optimize them for search visibility.",
  alternates: {
    canonical: "./",
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
    siteName: "Joy Digital Agency",
    title: "Joy Digital | Web Design & Digital Marketing Agency",
    description: "Joy Digital is a premium web development and search marketing agency. We build fast, high-converting Next.js websites and optimize them for search visibility.",
    images: [
      {
        url: "/assets/images/hero-banner.webp",
        width: 1024,
        height: 1024,
        alt: "Joy Digital - Web Design & Digital Marketing Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Joy Digital | Web Design & Digital Marketing Agency",
    description: "Joy Digital is a premium web development and search marketing agency. We build fast, high-converting Next.js websites and optimize them for search visibility.",
    images: ["/assets/images/hero-banner.webp"],
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
        <FontAwesomeLoader />
      </head>
      <body className="min-h-full flex flex-col bg-light-bg text-text-primary">
        <GoogleAnalytics />
        <AnalyticsTracker />
        <ClarityTracker />
        <div id="google_translate_element" style={{ display: 'none' }} className="hidden"></div>
        <Script
          id="google-translate-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              function googleTranslateElementInit() {
                new google.translate.TranslateElement({
                  pageLanguage: 'en',
                  includedLanguages: 'en,ta,hi,ar,es,de,fr',
                  layout: typeof window !== 'undefined' && window.google && window.google.translate ? google.translate.TranslateElement.InlineLayout.SIMPLE : 0,
                  autoDisplay: false
                }, 'google_translate_element');
              }
            `,
          }}
        />
        <Script
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
        {children}
      </body>
    </html>
  );
}

