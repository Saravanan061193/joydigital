"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import ViewCounter from "@/components/ui/ViewCounter";

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  author: string;
}

interface BlogListingContainerProps {
  posts: BlogPost[];
}

export default function BlogListingContainer({ posts }: BlogListingContainerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Parse list of unique categories
  const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category)))];

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  // Filter posts based on category and search text
  const filteredPosts = posts.filter((post) => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Map post categories to local project images to display thumbnails
  const getThumbnail = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes("seo") || cat.includes("maps") || cat.includes("local")) {
      return "/assets/images/gbp-showcase.webp";
    } else if (cat.includes("dev") || cat.includes("nextjs") || cat.includes("code")) {
      return "/assets/images/hero-banner.webp";
    } else if (cat.includes("design") || cat.includes("logo")) {
      return "/assets/images/business-card-mockup.webp";
    } else if (cat.includes("market") || cat.includes("strategy") || cat.includes("ad")) {
      return "/assets/images/marketing-poster-mockup.webp";
    }
    return "/assets/images/logo.webp"; // fallback
  };

  // Trigger Intersection Observer for card entries on viewport load
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -20px 0px" }
    );

    const cards = document.querySelectorAll(".blog-card-reveal");
    cards.forEach((card) => observer.observe(card));

    return () => {
      cards.forEach((card) => observer.unobserve(card));
    };
  }, [filteredPosts, activeCategory, searchQuery]);

  return (
    <div className="w-full">
      {/* Blog Hero with subtle entrance animations */}
      <section className="py-16 bg-white text-center relative overflow-hidden border-b border-gray-100 select-none">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.015] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          <span className="inline-block bg-[#2563EB]/10 text-[#2563EB] font-bold text-xs uppercase tracking-widest px-4.5 py-1.5 rounded-full border border-blue-500/10 mb-5 animate-fade-in">
            Knowledge Base
          </span>
          
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-5 leading-tight animate-slide-up">
            Our Digital Growth <span className="text-[#2563EB]">Blog Hub</span>
          </h1>
          
          <p className="text-xs sm:text-sm text-[#64748B] max-w-xl mx-auto leading-relaxed font-semibold transition-opacity duration-500">
            Find actionable checklists, SEO tips, conversion strategies, and web performance insights to help grow your business search visibility.
          </p>

          {/* Search bar & Categories filter */}
          <div className="max-w-xl mx-auto mt-10 flex flex-col gap-5 px-2">
            
            {/* Search Input onFocus borders */}
            <div className="relative group/search">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-[#E2E8F0] focus:border-[#2563EB] focus:ring-4 focus:ring-blue-500/5 text-xs px-10 py-3.5 rounded-xl outline-none transition-all font-semibold shadow-sm"
              />
              <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/search:text-[#2563EB] transition-colors text-xs" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 text-xs"
                  aria-label="Clear search"
                >
                  <i className="fa-solid fa-xmark" />
                </button>
              )}
            </div>

            {/* Category Chips with horizontal scrolls for mobile */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin select-none max-w-full justify-start md:justify-center">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`text-[10px] font-bold px-4 py-2 rounded-lg border whitespace-nowrap transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-[#2563EB] text-white border-[#2563EB] shadow-md shadow-blue-500/10"
                        : "bg-slate-50 text-[#64748B] border-[#E2E8F0] hover:bg-slate-100"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
            
          </div>
        </div>
      </section>

      {/* Grid Listings Section */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-24 select-none">
              <div className="text-slate-300 text-4xl mb-4">
                <i className="fa-solid fa-folder-open" />
              </div>
              <h3 className="text-sm font-bold text-slate-700 mb-1">No Articles Found</h3>
              <p className="text-xs text-[#64748B] font-semibold">Try modifying your search text or active filters.</p>
            </div>
          ) : (
            // Re-render grid elements on filter modifications to trigger staggers
            <div 
              key={`${activeCategory}-${searchQuery}`}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredPosts.map((post, idx) => (
                <article
                  key={post.slug}
                  style={{ transitionDelay: prefersReducedMotion ? "0ms" : `${(idx % 3) * 90}ms` }}
                  className="bg-white border border-[#E2E8F0] rounded-[24px] overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between reveal-hidden blog-card-reveal group"
                >
                  <div>
                    {/* Thumbnail representation */}
                    <div className="relative w-full h-48 bg-slate-50 overflow-hidden border-b border-[#E2E8F0]">
                      <Image
                        src={getThumbnail(post.category)}
                        alt={`${post.title} preview`}
                        fill
                        sizes="(max-w-768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        loading="lazy"
                      />
                      <div className="absolute top-4 left-4 z-10">
                        <span className="bg-[#2563EB] text-white font-extrabold text-[9px] uppercase tracking-wider px-3 py-1 rounded-md shadow-sm border border-blue-500/20 group-hover:bg-slate-900 group-hover:border-slate-800 transition-colors duration-300">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-7 text-left">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] text-[#64748B] font-semibold">
                          {new Date(post.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                        <span className="text-[10px] text-slate-300">&bull;</span>
                        <ViewCounter slug={post.slug} increment={false} />
                      </div>

                      <h3 className="text-base font-extrabold text-slate-900 mb-3 leading-snug group-hover:text-[#2563EB] transition-colors line-clamp-2">
                        <Link href={`/blog/${post.slug}`} title={post.title}>
                          {post.title}
                        </Link>
                      </h3>

                      <p className="text-[11px] text-[#64748B] leading-relaxed line-clamp-3 font-semibold">
                        {post.description}
                      </p>
                    </div>
                  </div>

                  <div className="px-7 py-4.5 border-t border-[#E2E8F0] bg-slate-50/50 flex items-center justify-between">
                    <span className="text-[10px] text-[#64748B] font-bold">
                      By {post.author}
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-xs font-bold text-[#2563EB] hover:text-[#3B82F6] flex items-center gap-1.5 group/link"
                    >
                      Read Article <i className="fa-solid fa-arrow-right group-hover/link:translate-x-1.5 transition-transform duration-200" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
