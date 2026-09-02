import React from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found | Joy Digital",
  description: "The page you are looking for does not exist or has been moved. Explore Joy Digital's Web Design, Next.js Development, and SEO services.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <>
      <Header transparent={false} />
      <main className="min-h-[75vh] pt-32 pb-20 bg-[#0D0B18] text-white flex items-center justify-center relative overflow-hidden select-none">
        {/* Ambient background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.15),transparent_70%)] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-3xl mx-auto px-6 text-center relative z-10 space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#18132E] border border-[#2D244E] text-[#A78BFA] text-xs font-bold uppercase tracking-widest shadow-sm">
            <span>Error 404</span>
          </div>

          {/* Heading */}
          <h1 className="text-6xl sm:text-7xl font-extrabold tracking-tight text-white">
            Page Not Found
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed font-normal">
            The page you are looking for might have been removed, renamed, or is temporarily unavailable.
          </p>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/"
              className="px-8 py-3.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-sm rounded-xl shadow-lg shadow-[#7C3AED]/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
            >
              <i className="fa-solid fa-house text-xs" />
              <span>Back to Homepage</span>
            </Link>

            <Link
              href="/website-development"
              className="px-6 py-3.5 bg-[#17122B] hover:bg-[#20193B] border border-[#2B2346] hover:border-[#7C3AED]/40 text-slate-200 text-sm font-bold rounded-xl transition-all flex items-center gap-2"
            >
              <span>Explore Services</span>
            </Link>

            <Link
              href="/free-website-audit"
              className="px-6 py-3.5 bg-[#17122B] hover:bg-[#20193B] border border-[#2B2346] hover:border-[#7C3AED]/40 text-slate-200 text-sm font-bold rounded-xl transition-all flex items-center gap-2"
            >
              <span>Free Website Audit</span>
            </Link>
          </div>

          {/* Quick Links Directory */}
          <div className="pt-10 border-t border-[#231C3D] max-w-lg mx-auto">
            <span className="text-xs text-slate-400 font-semibold block mb-3">Popular Pages:</span>
            <div className="flex flex-wrap justify-center gap-3 text-xs text-[#A78BFA] font-medium">
              <Link href="/seo-services" className="hover:underline">SEO Services</Link>
              <span className="text-slate-600">•</span>
              <Link href="/web-design-services" className="hover:underline">Web Design</Link>
              <span className="text-slate-600">•</span>
              <Link href="/portfolio" className="hover:underline">Portfolio</Link>
              <span className="text-slate-600">•</span>
              <Link href="/blog" className="hover:underline">Blog</Link>
              <span className="text-slate-600">•</span>
              <Link href="/contact" className="hover:underline">Contact Us</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
