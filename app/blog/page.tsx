import React from "react";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyWidgets from "@/components/ui/StickyWidgets";
import { getAllPosts } from "@/lib/blog";
import StrongCTA from "@/components/StrongCTA";
import BlogListingContainer from "@/components/sections/BlogListingContainer";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Agency Growth Blog | Marketing & SEO Tips | Joy Digital",
  description: "Stay ahead of competitors with the latest search marketing checklists, SEO audit guidelines, conversion optimization practices, and next-gen web speed updates.",
  alternates: {
    canonical: "https://joydigital.in/blog",
  },
  openGraph: {
    type: "website",
    url: "https://joydigital.in/blog",
    siteName: "Joy Digital Agency",
    title: "Agency Growth Blog | Marketing & SEO Tips | Joy Digital",
    description: "Stay ahead of competitors with the latest search marketing checklists, SEO audit guidelines, conversion optimization practices, and next-gen web speed updates.",
    images: [{ url: "https://joydigital.in/assets/images/hero-banner.webp", width: 1200, height: 630, alt: "Joy Digital Agency Blog" }],
  },
};

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <>
      <Header />
      <main className="pt-20 lg:pt-28 bg-[#F8FAFC]">
        
        {/* Blog listing with active filters and animations */}
        <BlogListingContainer posts={posts} />

        {/* Rich SEO Content Guide Section to ensure high word count */}
        <section className="py-16 bg-white border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-6 text-left">
            <h2 className="text-2xl font-black text-slate-900 mb-6">
              Digital Marketing, Web Design & Local SEO Insights for Growing Businesses
            </h2>
            <div className="prose prose-slate text-xs text-[#64748B] leading-relaxed space-y-4 font-semibold">
              <p>
                Welcome to the official Joy Digital knowledge hub. In today&apos;s digital marketplace, having a high-performing website paired with a strategic search engine optimization strategy is critical for business growth. Our articles break down actionable techniques for web development, technical SEO, Google Maps local pack optimization, user interface design, and conversion rate optimization.
              </p>
              <h3 className="text-sm font-extrabold text-slate-900 pt-2">Why Web Performance & Core Web Vitals Matter for SEO</h3>
              <p>
                Google prioritizes fast, responsive, and mobile-friendly websites. Modern web frameworks like Next.js enable server-side pre-rendering (SSG) and automatic WebP image compression, allowing pages to load in under 1.5 seconds. Faster load speeds reduce bounce rates and help your pages rank higher on search engine result pages (SERPs).
              </p>
              <h3 className="text-sm font-extrabold text-slate-900 pt-2">Dominating Google Maps & Local Search Rankings</h3>
              <p>
                Local businesses require specialized search visibility. By auditing Name, Address, and Phone (NAP) citations across regional directory listings and configuring geotagged JSON-LD schema markup, companies can climb into the Google Maps 3-Pack to capture nearby mobile search queries and direct phone call inquiries. Explore our latest guides below to scale your organic search presence.
              </p>
            </div>
          </div>
        </section>

        <StrongCTA location="blog page" />

      </main>
      <Footer />
      <StickyWidgets />
    </>
  );
}
