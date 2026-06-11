import React from "react";
import Link from "next/link";

interface CTABannerProps {
  title?: string;
  description?: string;
  primaryCtaText?: string;
  primaryCtaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  showWhatsApp?: boolean;
  source?: string;
  waLocation?: string;
}

export default function CTABanner({
  title = "Accelerate Your Business Growth Today",
  description = "Get in touch with our digital specialists for a free consulting report and SEO mapping audit.",
  primaryCtaText = "Request Free Consultation",
  primaryCtaHref = "/contact",
  secondaryCtaText = "WhatsApp Now",
  secondaryCtaHref = "https://wa.me/919080026133",
  showWhatsApp = true,
  source = "",
  waLocation = "hero",
}: CTABannerProps) {
  const ctaLink = source ? `${primaryCtaHref}?source=${encodeURIComponent(source)}` : primaryCtaHref;

  return (
    <section className="relative py-20 bg-[#0f172a] border border-white/10 overflow-hidden rounded-3xl mx-6 lg:mx-12 my-12 shadow-2xl">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#d4af37]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6 text-center z-10">
        <span className="inline-block bg-[#d4af37]/15 text-[#d4af37] font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full border border-[#d4af37]/20 mb-6">
          Ready to Grow?
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6 leading-tight text-white animate-fade-in">
          {title}
        </h2>
        <p className="text-sm md:text-base text-text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
          {description}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href={ctaLink}
            className="bg-gradient-to-r from-[#d4af37] to-[#f4d068] text-primary-dark font-extrabold text-xs px-8 py-4 rounded-full shadow-lg hover:shadow-[#d4af37]/20 hover:-translate-y-0.5 transition-all duration-300"
          >
            {primaryCtaText}
          </Link>
          {showWhatsApp && (
            <a
              href={secondaryCtaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs px-8 py-4 rounded-full shadow-lg hover:shadow-emerald-500/20 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
              data-wa-location={waLocation}
            >
              <span className="text-white"><i className="fa-brands fa-whatsapp text-base" /></span>
              {secondaryCtaText}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
