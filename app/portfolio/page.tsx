"use client";

import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyWidgets from "@/components/ui/StickyWidgets";
import Image from "next/image";
import Link from "next/link";

const PORTFOLIO_ITEMS = [
  {
    category: "websites",
    categoryLabel: "Website Design",
    title: "E-commerce Marketplace Website",
    image: "/assets/images/hero-banner.webp",
    description: "Multi-vendor responsive online marketplace designed for high loading performance and sales flow conversions.",
  },
  {
    category: "branding",
    categoryLabel: "Logo & Branding",
    title: "Joy Growth Corporate Brand Logo",
    image: "/assets/images/logo.webp",
    description: "Creative vector logo mark design for a modern technology consultancy, including custom color palettes.",
  },
  {
    category: "marketing",
    categoryLabel: "Digital Marketing",
    title: "Madurai Local Business Lead Gen",
    image: "/assets/images/hero-banner.webp",
    description: "Local SEO mapping and directory citation campaign that increased organic map pack phone inquiries by 240%.",
  },
  {
    category: "websites",
    categoryLabel: "Website Development",
    title: "Startup SaaS Landing Page",
    image: "/assets/images/hero-banner.webp",
    description: "Single-page responsive marketing landing page built using clean code structures and SEO variables.",
  },
  {
    category: "branding",
    categoryLabel: "Branding",
    title: "Premium Executive Visiting Card",
    image: "/assets/images/logo.webp",
    description: "Double-sided layout designs for business cards, letterheads, and print stationery sets.",
  },
  {
    category: "marketing",
    categoryLabel: "Google Maps Ranking",
    title: "Map Pack Placement & Audit",
    image: "/assets/images/hero-banner.webp",
    description: "Audit and keyword optimization of Google Business Profile that secured local map rankings.",
  },
];

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredItems = activeFilter === "all"
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter(item => item.category === activeFilter);

  return (
    <>
      <Header />
      <main className="pt-24 lg:pt-32">
        
        {/* Intro Section */}
        <section className="py-12 bg-white text-center relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <span className="inline-block bg-accent-glow text-accent font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full border border-accent/20 mb-6">
              Our Showcase
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-primary-dark tracking-tight mb-4">
              Featured <span className="text-gradient">Projects Portfolio</span>
            </h1>
            <p className="text-sm text-text-secondary max-w-xl mx-auto leading-relaxed">
              Explore our recently designed responsive websites, corporate logo branding assets, and local SEO campaigns built to grow business profiles.
            </p>
          </div>
        </section>

        {/* Filter Buttons */}
        <section className="py-6 bg-light-bg">
          <div className="max-w-7xl mx-auto px-6 flex justify-center gap-3 flex-wrap">
            {["all", "websites", "branding", "marketing"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`font-semibold text-xs px-6 py-2.5 rounded-full border transition-all duration-200 capitalize ${
                  activeFilter === filter
                    ? "bg-primary text-white border-primary shadow-md"
                    : "bg-white text-text-secondary border-gray-200 hover:border-gray-300"
                }`}
              >
                {filter === "all" ? "All Work" : filter === "branding" ? "Logo & Branding" : filter === "marketing" ? "Digital Marketing" : "Websites"}
              </button>
            ))}
          </div>
        </section>

        {/* Portfolio Grid */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item, index) => (
                <article
                  key={index}
                  className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  {/* Image container */}
                  <div className="relative aspect-[4/3] bg-light-bg overflow-hidden flex items-center justify-center p-4">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-w-768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-300 hover:scale-105"
                      priority={index < 3}
                    />
                  </div>
                  
                  {/* Details */}
                  <div className="p-6 flex-grow border-t border-gray-50 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-accent uppercase tracking-wider block mb-2">
                        {item.categoryLabel}
                      </span>
                      <h3 className="text-base font-bold text-primary-dark mb-2 leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-xs text-text-secondary leading-relaxed mb-4">
                        {item.description}
                      </p>
                    </div>
                    
                    <Link
                      href="/contact"
                      className="text-xs font-bold text-primary hover:text-accent flex items-center gap-1 mt-2"
                    >
                      Inquire About Project <i className="fa-solid fa-chevron-right text-[9px]" />
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
