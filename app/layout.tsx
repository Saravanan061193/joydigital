import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import FontAwesomeLoader from "@/components/layout/FontAwesomeLoader";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://joydigitalmarketing.in"),
  title: {
    default: "Website Design & Digital Marketing in Madurai | Joy Digital",
    template: "%s | Joy Digital",
  },
  description: "Joy Digital is the best website design company & digital marketing agency in Madurai. We offer local SEO, Google Business Profile setup, & branding.",
  alternates: {
    canonical: "./",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://joydigitalmarketing.in",
    siteName: "Joy Digital Growth Agency",
    title: "Website Design & Digital Marketing in Madurai | Joy Digital",
    description: "Joy Digital is the best website design company & digital marketing agency in Madurai. We offer local SEO, Google Business Profile setup, & branding.",
    images: [
      {
        url: "/assets/images/hero-banner.webp",
        width: 1024,
        height: 1024,
        alt: "Joy Digital Growth Agency Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Design & Digital Marketing in Madurai | Joy Digital",
    description: "Joy Digital is the best website design company & digital marketing agency in Madurai. We offer local SEO, Google Business Profile setup, & branding.",
    images: ["/assets/images/hero-banner.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <head>
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
        <FontAwesomeLoader />
      </head>
      <body className="min-h-full flex flex-col bg-white text-text-primary">
        {children}
      </body>
    </html>
  );
}

