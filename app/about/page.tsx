import React from "react";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyWidgets from "@/components/ui/StickyWidgets";


export const metadata: Metadata = {
  title: "About Our Digital Marketing Agency | Joy Digital",
  description: "Learn about Joy Digital's mission, values, and how our digital marketing agency helps businesses grow through web design, SEO, and local maps marketing.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="pt-24 lg:pt-32">
        
        {/* Intro Hero */}
        <section className="py-16 lg:py-24 bg-white relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
            <span className="inline-block bg-accent-glow text-accent font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full border border-accent/20 mb-6 animate-pulse-dot">
              Our Vision
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-primary-dark tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
              Driving Growth for <span className="text-gradient">Startups & Regional Businesses</span>
            </h1>
            <p className="text-sm md:text-base text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Joy Digital Growth Agency provides professional website development, Local SEO, and branding solutions to help regional businesses build long-term search presence and grow customer inquiries.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 bg-light-bg">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Visual Stats */}
            <div className="bg-gradient-to-br from-primary-dark to-primary border-2 border-accent p-8 sm:p-12 rounded-3xl shadow-xl relative overflow-hidden text-white min-h-[300px] flex items-center justify-center">
              <div className="absolute inset-0 bg-radial-gradient opacity-10" />
              <div className="grid grid-cols-2 gap-8 relative z-10 w-full">
                <div className="flex flex-col">
                  <span className="text-3xl sm:text-4xl font-extrabold text-accent">100%</span>
                  <span className="text-[10px] font-semibold text-text-muted uppercase tracking-wider mt-1">Client Focus</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl sm:text-4xl font-extrabold text-accent">₹0</span>
                  <span className="text-[10px] font-semibold text-text-muted uppercase tracking-wider mt-1">Hidden Costs</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl sm:text-4xl font-extrabold text-accent">Under 1.5s</span>
                  <span className="text-[10px] font-semibold text-text-muted uppercase tracking-wider mt-1">Page Load Target</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl sm:text-4xl font-extrabold text-accent">24/7</span>
                  <span className="text-[10px] font-semibold text-text-muted uppercase tracking-wider mt-1">Direct Support</span>
                </div>
              </div>
            </div>

            {/* Copy */}
            <div className="flex flex-col items-start justify-center text-left">
              <span className="text-xs font-bold text-accent uppercase tracking-widest mb-3">About Joy Digital</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-primary-dark mb-6">
                Our Core Mission
              </h2>
              <div className="text-sm text-text-secondary leading-relaxed space-y-6">
                <p>
                  At Joy Digital Growth Agency, our core mission is to deliver professional digital marketing and web engineering solutions designed to fit startup and small-to-medium business budgets. Based in Madurai, Tamil Nadu, we understand how local search habits impact customer acquisition.
                </p>
                <p>
                  We avoid generic, bloated web designs that slow down page performance. Instead, we write clean, search-ready code and configure profiles to help local businesses rank on Google Maps and search results, building brand authority.
                </p>
                <p>
                  By structuring custom web layouts, optimizing metadata variables, and planning local SEO citation campaigns, we help our clients build online visibility that supports customer growth.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Founder profile */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-3">
              Leadership
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-primary-dark mb-12">
              Founder Profile & Vision
            </h2>
            <div className="bg-white border border-gray-100 rounded-3xl p-8 sm:p-12 shadow-sm flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-accent/10 border-2 border-accent flex items-center justify-center text-accent text-3xl mb-6 shadow-sm">
                <i className="fa-solid fa-circle-user" />
              </div>
              <h3 className="text-xl font-extrabold text-primary-dark mb-1">Saravanan</h3>
              <span className="text-xs font-semibold text-accent uppercase tracking-widest mb-6">Founder & Director</span>
              <p className="text-sm text-text-secondary leading-relaxed max-w-xl mx-auto mb-6">
                &ldquo;We launched Joy Digital with a clear goal: to make professional web development and search engine optimization accessible to regional startups and small businesses. We focus on providing clean, fast-loading code and clear SEO strategies that deliver measurable results and support long-term growth.&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="tel:+919080026133"
                  className="w-10 h-10 rounded-full bg-light-bg flex items-center justify-center text-primary hover:bg-accent hover:text-white transition-all duration-300"
                  aria-label="Call Direct"
                >
                  <i className="fa-solid fa-phone" />
                </a>
                <a
                  href="https://wa.me/919080026133"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-light-bg flex items-center justify-center text-whatsapp-green hover:bg-accent hover:text-white transition-all duration-300"
                  aria-label="WhatsApp"
                  data-wa-location="contact page"
                >
                  <i className="fa-brands fa-whatsapp animate-pulse-dot" />
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <StickyWidgets />
    </>
  );
}
