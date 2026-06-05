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
}: CTABannerProps) {
  const ctaLink = source ? `${primaryCtaHref}?source=${encodeURIComponent(source)}` : primaryCtaHref;

  return (
    <section className="relative py-16 lg:py-24 bg-gradient-to-br from-primary-dark via-primary to-dark text-white overflow-hidden rounded-3xl mx-6 lg:mx-12 my-12 shadow-xl border border-white/5">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6 text-center z-10">
        <span className="inline-block bg-accent-glow text-accent-light font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full border border-accent/20 mb-6">
          Ready to Grow?
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6 leading-tight">
          {title}
        </h2>
        <p className="text-sm md:text-base text-text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
          {description}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href={ctaLink}
            className="bg-gradient-to-r from-accent to-accent-light text-white font-bold text-sm px-8 py-3.5 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            {primaryCtaText}
          </Link>
          {showWhatsApp && (
            <a
              href={secondaryCtaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 hover:bg-white/10 text-white font-bold text-sm px-8 py-3.5 rounded-lg border border-white/15 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
            >
              <span className="text-whatsapp-green"><i className="fa-brands fa-whatsapp text-lg" /></span>
              {secondaryCtaText}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
