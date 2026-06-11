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
    <section className="relative py-16 bg-[#1e293b] border border-slate-800 overflow-hidden rounded-3xl mx-6 lg:mx-12 my-12 shadow-md">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6 text-center z-10">
        <span className="inline-block bg-accent/15 text-accent-light font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full border border-accent/20 mb-6">
          Ready to Grow?
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6 leading-tight text-white animate-fade-in">
          {title}
        </h2>
        <p className="text-sm md:text-base text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
          {description}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href={ctaLink}
            className="bg-accent hover:bg-accent-dark text-white font-bold text-xs px-8 py-4 rounded-full shadow-md hover:-translate-y-0.5 transition-all duration-300"
          >
            {primaryCtaText}
          </Link>
          {showWhatsApp && (
            <a
              href={secondaryCtaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs px-8 py-4 rounded-full shadow-md hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
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
