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

interface BlogArticleContainerProps {
  post: BlogPost;
  htmlContent: string;
  relatedPosts: BlogPost[];
  slug: string;
}

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function BlogArticleContainer({ post, htmlContent, relatedPosts, slug }: BlogArticleContainerProps) {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState("");
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Mappings for related post images
  const getThumbnail = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes("seo") || cat.includes("maps") || cat.includes("local")) {
      return "/assets/images/gbp-showcase.webp";
    } else if (cat.includes("dev") || cat.includes("nextjs") || cat.includes("code")) {
      return "/assets/images/hero-banner.webp";
    } else if (cat.includes("design") || cat.includes("logo")) {
      return "/assets/images/business-card-mockup.webp";
    }
    return "/assets/images/marketing-poster-mockup.webp";
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  // Parse Headings to generate Table of Contents (TOC)
  useEffect(() => {
    const contentArea = document.querySelector(".prose-content");
    if (!contentArea) return;

    const headings = contentArea.querySelectorAll("h2, h3");
    const parsedToc: TocItem[] = [];

    headings.forEach((heading, idx) => {
      // Structure clean slug anchors on the DOM elements
      const cleanId = heading.id || heading.textContent
        ?.toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") || `section-${idx}`;
      
      heading.id = cleanId;

      parsedToc.push({
        id: cleanId,
        text: heading.textContent || "",
        level: heading.tagName.toLowerCase() === "h2" ? 2 : 3,
      });
    });

    setToc(parsedToc);

    // Observer to track which heading is currently visible in viewport
    const headingsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0.2 }
    );

    headings.forEach((heading) => headingsObserver.observe(heading));

    // Observe inline blockquotes, images, lists, and tables to slide up on entry
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -20px 0px" }
    );

    const revealables = contentArea.querySelectorAll("img, blockquote, table, ul, ol");
    revealables.forEach((el) => {
      el.classList.add("reveal-hidden");
      revealObserver.observe(el);
    });

    // Observe related posts grid reveal
    const gridObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            gridObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );

    const relatedGrid = document.querySelector(".related-cards-grid");
    if (relatedGrid) gridObserver.observe(relatedGrid);

    return () => {
      headingsObserver.disconnect();
      revealObserver.disconnect();
      if (relatedGrid) gridObserver.unobserve(relatedGrid);
    };
  }, [htmlContent]);

  // Adjust scroll offset when clicking TOC elements
  const handleTocClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 90; // sticky header padding
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
      setActiveId(id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 select-text">
      
      {/* Breadcrumbs Navigation with subtle fade */}
      <nav className="text-[10px] sm:text-xs font-bold text-[#6B6478] uppercase tracking-wider mb-8 select-none animate-fade-in text-left">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span className="mx-2 text-slate-300">/</span>
        <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
        <span className="mx-2 text-slate-300">/</span>
        <span className="text-slate-900 truncate max-w-[200px] inline-block align-bottom">{post.title}</span>
      </nav>

      {/* Header Details with Slide-up Animation */}
      <header className="mb-12 text-left max-w-4xl animate-slide-up">
        <div className="flex items-center gap-3.5 mb-5 select-none">
          <span className="bg-primary/10 text-primary border border-primary-light/20 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
            {post.category}
          </span>
          <span className="text-[11px] text-[#64748B] font-semibold">
            {new Date(post.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span className="text-slate-300">&bull;</span>
          <ViewCounter slug={slug} increment={true} />
        </div>

        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tight mb-6">
          {post.title}
        </h1>

        <div className="flex items-center gap-3 border-t border-b border-[#E9E4F2] py-4.5 select-none">
          <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary-light/20 text-primary font-bold text-xs flex items-center justify-center">
            {post.author.charAt(0)}
          </div>
          <div>
            <span className="text-xs font-black text-slate-900 block leading-none mb-1">By {post.author}</span>
            <span className="text-[10px] text-[#64748B] font-semibold">Technical Editor & Agency Specialist</span>
          </div>
        </div>
      </header>

      {/* 2-Column Desktop Grid (Table of Contents + Prose Reader) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left">
        
        {/* Table of Contents sidebar (hidden on mobile, sticky on desktop) */}
        <aside className="hidden lg:block lg:col-span-3 sticky top-28 self-start select-none border-l-2 border-slate-100/80 pr-2 max-h-[80vh] overflow-y-auto scrollbar-thin">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-5 pl-3.5">
            Table of Contents
          </h3>
          <ul className="flex flex-col gap-3 text-xs font-semibold text-[#64748B]">
            {toc.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleTocClick(e, item.id)}
                  className={`block border-l-2 border-transparent transition-all duration-250 cursor-pointer text-left pl-3.5 hover:text-primary hover:border-primary/45 ${
                    activeId === item.id 
                      ? "toc-item-active" 
                      : ""
                  } ${
                    item.level === 3 ? "pl-6 text-[11px]" : ""
                  }`}
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        {/* Prose Reader Content Column */}
        <article className="lg:col-span-9 bg-white border border-[#E2E8F0] p-8 sm:p-12.5 rounded-[32px] shadow-sm max-w-none relative overflow-hidden">
          
          <div 
            className="prose prose-blue max-w-none text-[#334155] leading-relaxed text-sm sm:text-base space-y-6.5
                       prose-content
                       prose-headings:text-slate-900 prose-headings:font-black prose-headings:tracking-tight 
                       prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:border-[#E2E8F0] prose-h2:pb-2
                       prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3 
                       prose-p:mb-5 prose-p:leading-relaxed
                       prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-5 prose-ul:space-y-2
                       prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-5 prose-ol:space-y-2
                       prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-slate-50 prose-blockquote:py-4.5 prose-blockquote:px-6 prose-blockquote:rounded-r-2xl prose-blockquote:italic prose-blockquote:font-semibold prose-blockquote:text-slate-700
                       prose-img:rounded-2xl prose-img:shadow-md prose-img:border prose-img:border-[#E9E4F2] prose-img:mx-auto prose-img:my-8 prose-img:hover:scale-[1.015] prose-img:transition-transform
                       prose-table:w-full prose-table:border-collapse prose-table:my-6
                       prose-th:bg-slate-50 prose-th:border prose-th:border-[#E2E8F0] prose-th:p-3.5 prose-th:text-xs prose-th:font-extrabold prose-th:text-slate-900
                       prose-td:border prose-td:border-[#E2E8F0] prose-td:p-3.5 prose-td:text-xs prose-td:font-semibold"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          {/* Inline article link back */}
          <div className="border-t border-[#E9E4F2] mt-12 pt-8 text-center select-none">
            <Link
              href="/blog"
              className="text-xs font-bold text-primary hover:text-primary-light flex items-center justify-center gap-2 group"
            >
              <i className="fa-solid fa-arrow-left-long group-hover:-translate-x-1.5 transition-transform" /> Back to Blog Articles
            </Link>
          </div>
        </article>

      </div>

      {/* 3. INLINE CONVERSION CTA (Pulsing Scroll reveal) */}
      <section className="mt-16 bg-slate-950 border border-slate-900 text-white rounded-[32px] p-8 sm:p-12 relative overflow-hidden select-none reveal-hidden blog-card-reveal text-center">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.015] pointer-events-none" />
        <div className="relative z-10 max-w-xl mx-auto">
          <span className="bg-orange-500/10 text-orange-400 border border-orange-500/25 text-[9px] font-black tracking-widest px-3 py-1 rounded-full uppercase mb-4 inline-block">
            Scale Your Business
          </span>
          <h3 className="text-xl sm:text-2xl font-black mb-4 tracking-tight leading-snug">
            Need Help Growing Your Business Online?
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed font-semibold mb-8">
            Leverage fast-loading Next.js web systems and proximity ranking optimizations to secure steady inbound channels.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="bg-primary hover:bg-[#6D28D9] text-white font-bold text-xs px-6 py-3.5 rounded-xl shadow-md transition-all hover:scale-[1.025]"
            >
              Talk to Joy Digital
            </Link>
            <a
              href="https://wa.me/919080026133?text=Hello%20Joy%20Digital,%20I'd%20like%20to%20discuss%20our%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#10b981] hover:bg-[#059669] text-white font-bold text-xs px-6 py-3.5 rounded-xl shadow-md transition-all hover:scale-[1.025] flex items-center gap-1.5"
            >
              <i className="fa-brands fa-whatsapp" /> WhatsApp Sync
            </a>
          </div>
        </div>
      </section>

      {/* 4. RELATED ARTICLES (3 Grid Cards with hover scale & shadow transitions) */}
      {relatedPosts.length > 0 && (
        <section className="mt-20 border-t border-[#E9E4F2] pt-16">
          <div className="text-left mb-10 select-none">
            <span className="text-[10px] font-black text-primary uppercase tracking-widest block mb-2">Recommended</span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">You May Also Like</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left related-cards-grid reveal-hidden">
            {relatedPosts.map((rPost, idx) => (
              <div
                key={rPost.slug}
                style={{ transitionDelay: prefersReducedMotion ? "0ms" : `${idx * 100}ms` }}
                className="bg-white border border-[#E2E8F0] rounded-[24px] overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative w-full h-40 bg-slate-50 border-b border-[#E9E4F2] overflow-hidden">
                    <Image
                      src={getThumbnail(rPost.category)}
                      alt={`${rPost.title} preview`}
                      fill
                      sizes="(max-w-768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 z-10">
                      <span className="bg-primary text-white font-extrabold text-[8px] uppercase tracking-wider px-2 py-0.5 rounded-md shadow-sm border border-primary-light/20">
                        {rPost.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h4 className="text-sm font-extrabold text-slate-900 leading-snug group-hover:text-primary transition-colors mb-2 line-clamp-2">
                      <Link href={`/blog/${rPost.slug}`} title={rPost.title}>
                        {rPost.title}
                      </Link>
                    </h4>
                    <p className="text-[10px] text-[#64748B] leading-relaxed line-clamp-2 font-semibold">
                      {rPost.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 py-3.5 border-t border-[#E9E4F2] bg-slate-50/50 flex items-center justify-between">
                  <span className="text-[9px] text-[#6B6478] font-bold">
                    By {rPost.author}
                  </span>
                  <Link
                    href={`/blog/${rPost.slug}`}
                    className="text-[11px] font-bold text-primary hover:text-primary-light flex items-center gap-1.5"
                  >
                    Read Guide &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
