import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyWidgets from "@/components/ui/StickyWidgets";
import JsonLd from "@/components/seo/JsonLd";
import { getAllPosts } from "@/lib/blog";
import { getPersonEntity, getOrganizationEntity, SITE_URL } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Saravanan L - Technical Web Specialist & Founder | Joy Digital",
  description: "Explore technical web development guides, SEO strategies, and custom Next.js engineering articles written by Saravanan L, Founder & Technical Web Specialist at Joy Digital.",
  keywords: [
    "Saravanan L",
    "Technical Web Specialist",
    "Joy Digital Founder",
    "Next.js Developer Chennai",
    "SEO Specialist India",
    "Web Engineering Expert"
  ],
  alternates: {
    canonical: "https://joydigital.in/author/saravanan",
  },
  openGraph: {
    title: "Saravanan L - Technical Web Specialist & Founder | Joy Digital",
    description: "Technical web specialist focusing on sub-second Next.js web applications, Generative Engine Optimization (GEO), and data-driven organic search marketing.",
    url: "https://joydigital.in/author/saravanan",
  },
};

export default async function AuthorSaravananPage() {
  const allPosts = await getAllPosts();
  const authorPosts = allPosts.filter(
    (post) =>
      post.status !== "Draft" &&
      post.status !== "Archived" &&
      (post.author?.toLowerCase().includes("saravanan") ||
        post.authorName?.toLowerCase().includes("saravanan") ||
        !post.author)
  );

  const profilePageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      getOrganizationEntity(),
      getPersonEntity(),
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/author/saravanan#profilepage`,
        "url": `${SITE_URL}/author/saravanan`,
        "name": "Saravanan L Author Profile",
        "description": "Official author profile and published technical articles by Saravanan L, Founder of Joy Digital.",
        "mainEntity": { "@id": `${SITE_URL}/author/saravanan#person` }
      }
    ]
  };

  return (
    <>
      <JsonLd schema={profilePageSchema} />
      <Header />
      <main className="pt-24 lg:pt-32 bg-light-bg min-h-screen">
        {/* Author Header Profile */}
        <section className="py-12 lg:py-16 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[10px] font-bold text-text-muted mb-8 uppercase tracking-widest">
              <Link href="/" className="hover:text-accent transition-colors">Home</Link>
              <span className="text-gray-300">/</span>
              <Link href="/blog" className="hover:text-accent transition-colors">Blog</Link>
              <span className="text-gray-300">/</span>
              <span className="text-primary-dark">Saravanan L</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Profile Avatar / Badge */}
              <div className="lg:col-span-4 flex flex-col items-center text-center lg:items-start lg:text-left">
                <div className="relative w-36 h-36 rounded-full bg-primary-glow border-4 border-white shadow-xl overflow-hidden mb-6 flex items-center justify-center text-primary text-5xl font-black">
                  <Image
                    src="/assets/images/logo.webp"
                    alt="Saravanan L - Technical Web Specialist"
                    fill
                    sizes="144px"
                    className="object-cover p-2"
                  />
                </div>
                <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3.5 py-1 rounded-full mb-3">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                    Verified Technical Author &amp; Specialist
                  </span>
                </div>
                <h1 className="text-3xl font-extrabold text-primary-dark tracking-tight mb-2">
                  Saravanan L
                </h1>
                <p className="text-sm font-semibold text-accent mb-4">
                  Founder &amp; Technical Web Specialist at Joy Digital
                </p>
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.linkedin.com/in/saravanan-l-34a861154/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-light-bg hover:bg-primary hover:text-white border border-[#E5E7EB] text-text-secondary flex items-center justify-center transition-all duration-300 shadow-sm"
                    title="Connect on LinkedIn"
                  >
                    <i className="fa-brands fa-linkedin-in text-base" />
                  </a>
                  <a
                    href="mailto:saravanan061193@gmail.com"
                    className="w-10 h-10 rounded-full bg-light-bg hover:bg-accent hover:text-white border border-[#E5E7EB] text-text-secondary flex items-center justify-center transition-all duration-300 shadow-sm"
                    title="Send Direct Email"
                  >
                    <i className="fa-solid fa-envelope text-base" />
                  </a>
                </div>
              </div>

              {/* Bio & Expertise details */}
              <div className="lg:col-span-8 space-y-6">
                <h2 className="text-xl font-bold text-primary-dark border-b border-gray-100 pb-3">
                  About &amp; Technical Background
                </h2>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Saravanan L is a technical web specialist, search engineer, and the founder of <strong>Joy Digital</strong>. With expertise in Next.js, React, Tailwind CSS, TypeScript, and modern search engine optimization, Saravanan specializes in engineering sub-second web platforms that rank highly on Google and scale organic client acquisition.
                </p>
                <p className="text-sm text-text-secondary leading-relaxed">
                  He leads the technical research at Joy Digital around <strong>Generative Engine Optimization (GEO)</strong>, structured JSON-LD schemas, mobile Core Web Vitals optimization, and conversion-focused web architecture across diverse industries including insurance, tourism, real estate, healthcare, and e-commerce.
                </p>

                {/* Core Expertise Tags */}
                <div className="pt-2">
                  <span className="text-xs font-bold text-primary-dark block mb-3 uppercase tracking-wider">
                    Core Technical Domains:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Next.js & React Web Engineering",
                      "Generative Engine Optimization (GEO)",
                      "Technical SEO & Core Web Vitals",
                      "Semantic JSON-LD Schemas",
                      "E-Commerce & Headless Systems",
                      "Lead Conversion Rate Optimization"
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium bg-light-bg border border-[#E5E7EB] text-primary-dark px-3 py-1.5 rounded-lg shadow-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Published Articles List */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12 border-b border-gray-200 pb-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-primary-dark">
                  Published Articles &amp; Technical Guides
                </h2>
                <p className="text-xs text-text-secondary mt-1">
                  Showing {authorPosts.length} expert articles published by Saravanan L on Joy Digital.
                </p>
              </div>
              <Link
                href="/blog"
                className="text-xs font-bold text-accent hover:text-accent-dark flex items-center gap-1.5"
              >
                View All Blog Posts &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {authorPosts.map((post) => (
                <article
                  key={post.slug}
                  className="bg-white border border-[#E5E7EB] rounded-[24px] overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative w-full h-48 bg-slate-100 overflow-hidden border-b border-gray-100">
                      <Image
                        src={post.image || "/assets/images/hero-banner.webp"}
                        alt={post.imageAlt || post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4 z-10">
                        <span className="bg-primary text-white font-bold text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm">
                          {post.category || "Article"}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="text-[11px] font-semibold text-text-muted mb-2">
                        Published {post.date}
                      </div>
                      <h3 className="text-base font-extrabold text-primary-dark leading-snug group-hover:text-accent transition-colors mb-3 line-clamp-2">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h3>
                      <p className="text-xs text-text-secondary leading-relaxed line-clamp-3">
                        {post.description}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 py-4 border-t border-gray-100 bg-slate-50/50 flex items-center justify-between">
                    <span className="text-[10px] text-text-muted font-bold">
                      Saravanan L
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-xs font-bold text-accent hover:text-accent-dark flex items-center gap-1"
                    >
                      Read Guide &rarr;
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <StickyWidgets />
    </>
  );
}
