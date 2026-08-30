"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import ViewCounter from "@/components/ui/ViewCounter";
import { BlogPost } from "@/lib/blog";

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
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  // Mappings for related post thumbnails
  const getThumbnail = (category: string) => {
    const cat = (category || "").toLowerCase();
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

  // Compute Word Count & Reading Time
  const cleanText = (post.content || "").replace(/<[^>]+>/g, " ").replace(/[#*`_>-\[\]()]/g, " ").trim();
  const wordCount = cleanText ? cleanText.split(/\s+/).filter(Boolean).length : 0;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  // Parse Headings to generate Table of Contents (TOC)
  useEffect(() => {
    const contentArea = document.querySelector(".prose-content");
    if (!contentArea) return;

    const headings = contentArea.querySelectorAll("h2, h3");
    const parsedToc: TocItem[] = [];

    headings.forEach((heading, idx) => {
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

    const relatedGrid = document.querySelector(".related-cards-grid");
    if (relatedGrid) revealObserver.observe(relatedGrid);

    return () => {
      headingsObserver.disconnect();
      revealObserver.disconnect();
    };
  }, [htmlContent]);

  const handleTocClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 90;
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

  // Structured Data (JSON-LD)
  const canonicalUrl = post.canonicalUrl || `https://joydigital.in/blog/${slug}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    "headline": post.seoTitle || post.title,
    "description": post.metaDescription || post.description,
    "image": post.ogImage || post.image || "https://joydigital.in/assets/images/hero-banner.webp",
    "datePublished": post.date,
    "dateModified": post.lastUpdatedDate || post.date,
    "author": {
      "@type": "Person",
      "name": post.authorName || post.author || "Saravanan L",
      "jobTitle": post.authorRole || "Technical Web Specialist",
      "url": post.authorProfileUrl || "https://joydigital.in/about",
    },
    "publisher": {
      "@type": "Organization",
      "name": "Joy Digital",
      "logo": {
        "@type": "ImageObject",
        "url": "https://joydigital.in/assets/images/logo.webp",
      },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://joydigital.in",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://joydigital.in/blog",
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.category || "General",
        "item": `https://joydigital.in/blog?category=${encodeURIComponent(post.category || "General")}`,
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": post.title,
        "item": canonicalUrl,
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 select-text">
      
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumbs Navigation */}
      <nav aria-label="Breadcrumb" className="text-[10px] sm:text-xs font-bold text-[#6B6478] uppercase tracking-wider mb-8 select-none animate-fade-in text-left">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span className="mx-2 text-slate-300">/</span>
        <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
        <span className="mx-2 text-slate-300">/</span>
        <span className="text-primary font-extrabold">{post.category}</span>
        <span className="mx-2 text-slate-300">/</span>
        <span className="text-slate-900 truncate max-w-[220px] inline-block height-4 align-bottom">{post.title}</span>
      </nav>

      {/* Header Details */}
      <header className="mb-10 text-left max-w-4xl animate-slide-up">
        <div className="flex flex-wrap items-center gap-3.5 mb-5 select-none">
          <span className="bg-primary/10 text-primary border border-primary-light/20 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
            {post.category}
          </span>
          
          <span className="text-[11px] text-[#64748B] font-semibold flex items-center gap-1">
            <i className="fa-regular fa-calendar text-[10px]" />
            {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </span>

          {post.lastUpdatedDate && post.lastUpdatedDate !== post.date && (
            <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2.5 py-0.5 rounded-full border border-slate-200">
              Updated: {new Date(post.lastUpdatedDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </span>
          )}

          <span className="text-slate-300">&bull;</span>
          <span className="text-[11px] text-slate-500 font-semibold flex items-center gap-1">
            <i className="fa-regular fa-clock text-[10px]" /> {readingTime} min read ({wordCount} words)
          </span>

          <span className="text-slate-300">&bull;</span>
          <ViewCounter slug={slug} increment={true} />
        </div>

        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tight mb-6">
          {post.title}
        </h1>

        {/* Author Header Bar */}
        <div className="flex items-center gap-3 border-t border-b border-[#E9E4F2] py-4 select-none">
          <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary-light/20 text-primary font-bold text-sm flex items-center justify-center overflow-hidden shrink-0">
            {post.authorImage && post.authorImage.startsWith("/") || post.authorImage?.startsWith("http") ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={post.authorImage} alt={post.authorName || post.author} className="w-full h-full object-cover" />
            ) : (
              (post.authorName || post.author || "J").charAt(0)
            )}
          </div>
          <div>
            <span className="text-xs font-black text-slate-900 block leading-none mb-1">
              By {post.authorName || post.author}
            </span>
            <span className="text-[10px] text-[#64748B] font-semibold block">
              {post.authorRole || "Technical Web & Search Marketing Specialist"}
            </span>
          </div>
        </div>
      </header>

      {/* Featured Cover Image */}
      {post.showFeaturedImage !== false && post.image && (
        <div className="mb-12 max-w-4xl text-left select-none">
          <div className="relative w-full h-64 sm:h-96 rounded-[28px] overflow-hidden border border-slate-200/80 shadow-sm bg-slate-50">
            <Image
              src={post.image}
              alt={post.imageAlt || post.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 896px"
            />
          </div>
          {post.imageCaption && (
            <p className="text-center text-xs text-slate-500 italic mt-2.5 font-medium">
              {post.imageCaption}
            </p>
          )}
        </div>
      )}

      {/* 2-Column Desktop Grid (Table of Contents + Prose Reader) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left">
        
        {/* Table of Contents sidebar */}
        {post.showTableOfContents !== false && toc.length > 0 && (
          <aside className="hidden lg:block lg:col-span-3 sticky top-28 self-start select-none border-l-2 border-slate-100/80 pr-2 max-h-[80vh] overflow-y-auto scrollbar-thin">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-4 pl-3.5">
              Table of Contents
            </h3>
            <ul className="flex flex-col gap-2.5 text-xs font-semibold text-[#64748B]">
              {toc.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleTocClick(e, item.id)}
                    className={`block border-l-2 border-transparent transition-all duration-250 cursor-pointer text-left pl-3.5 hover:text-primary hover:border-primary/45 ${
                      activeId === item.id ? "toc-item-active font-extrabold text-primary border-primary" : ""
                    } ${item.level === 3 ? "pl-6 text-[11px]" : ""}`}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        )}

        {/* Prose Reader Content Column */}
        <article className={`${post.showTableOfContents !== false && toc.length > 0 ? "lg:col-span-9" : "lg:col-span-12 max-w-4xl mx-auto"} bg-white border border-[#E2E8F0] p-8 sm:p-12 rounded-[32px] shadow-sm relative overflow-hidden w-full`}>
          
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
                       prose-img:rounded-2xl prose-img:shadow-md prose-img:border prose-img:border-[#E9E4F2] prose-img:mx-auto prose-img:my-8
                       prose-table:w-full prose-table:border-collapse prose-table:my-6
                       prose-th:bg-slate-50 prose-th:border prose-th:border-[#E2E8F0] prose-th:p-3.5 prose-th:text-xs prose-th:font-extrabold prose-th:text-slate-900
                       prose-td:border prose-td:border-[#E2E8F0] prose-td:p-3.5 prose-td:text-xs prose-td:font-semibold"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          {/* Internal Links Box (if specified by CMS) */}
          {post.internalLinks && post.internalLinks.length > 0 && (
            <div className="mt-10 p-6 bg-slate-50 border border-slate-200 rounded-2xl select-none">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-2">
                <i className="fa-solid fa-link text-primary" /> Recommended Related Resources
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold">
                {post.internalLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={link.targetUrl}
                      className="text-primary hover:underline flex items-center gap-1.5 p-2 bg-white rounded-xl border border-slate-200/80 shadow-2xs transition-transform hover:translate-x-1"
                    >
                      <i className="fa-solid fa-chevron-right text-[10px] text-slate-400" />
                      <span>{link.anchorText}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* FAQ Accordion Section (if present) */}
          {post.faqs && post.faqs.length > 0 && (
            <div className="mt-12 pt-10 border-t border-slate-200 select-none">
              <div className="mb-6">
                <span className="text-[10px] font-black text-primary uppercase tracking-widest block mb-1">Knowledge Base</span>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Frequently Asked Questions</h3>
              </div>

              <div className="space-y-3">
                {post.faqs.map((faq, idx) => {
                  const isOpen = openFaqIdx === idx;
                  return (
                    <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/50 transition-all">
                      <button
                        onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                        className="w-full p-4.5 text-left font-extrabold text-xs sm:text-sm text-slate-900 flex justify-between items-center gap-3 cursor-pointer hover:bg-slate-100/60"
                      >
                        <span>{faq.question}</span>
                        <i className={`fa-solid fa-chevron-down text-xs text-slate-400 transition-transform ${isOpen ? "rotate-180 text-primary" : ""}`} />
                      </button>
                      {isOpen && (
                        <div className="p-4.5 pt-0 text-xs sm:text-sm text-slate-650 leading-relaxed font-semibold bg-white border-t border-slate-150">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Author E-E-A-T Profile Card */}
          {post.showAuthorInfo !== false && (
            <div className="mt-12 p-6 bg-slate-50 border border-slate-200 rounded-2xl select-none flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary-light/20 text-primary font-black text-xl flex items-center justify-center overflow-hidden shrink-0">
                {post.authorImage && (post.authorImage.startsWith("/") || post.authorImage.startsWith("http")) ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={post.authorImage} alt={post.authorName || post.author} className="w-full h-full object-cover" />
                ) : (
                  (post.authorName || post.author || "J").charAt(0)
                )}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-slate-900">{post.authorName || post.author}</span>
                  <span className="bg-primary/10 text-primary border border-primary/20 text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                    {post.authorRole || "Technical Web Specialist"}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {post.authorBio || "Digital marketing strategist and Next.js web developer focusing on search optimization and conversion rate growth."}
                </p>
              </div>
            </div>
          )}

          {/* Link Back to Blog */}
          <div className="border-t border-[#E9E4F2] mt-10 pt-6 text-center select-none">
            <Link
              href="/blog"
              className="text-xs font-bold text-primary hover:text-primary-light flex items-center justify-center gap-2 group"
            >
              <i className="fa-solid fa-arrow-left-long group-hover:-translate-x-1.5 transition-transform" /> Back to Blog Articles
            </Link>
          </div>
        </article>

      </div>

      {/* Conversion CTA */}
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

      {/* Related Posts */}
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
                      src={rPost.image || getThumbnail(rPost.category)}
                      alt={`${rPost.title} preview`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
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
                    By {rPost.authorName || rPost.author}
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
