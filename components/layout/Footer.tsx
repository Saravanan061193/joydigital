"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const REGIONAL_SITES = [
  { code: "in", label: "India (INR)", flag: "🇮🇳" },
];

export default function Footer() {
  const pathname = usePathname();
  const [currentRegion, setCurrentRegion] = useState("");

  // Detect current region from pathname
  useEffect(() => {
    const parts = pathname.split("/").filter(Boolean);
    if (parts.length > 0 && ["us", "uk", "ae", "in"].includes(parts[0])) {
      setCurrentRegion(parts[0]);
    } else {
      setCurrentRegion("");
    }
  }, [pathname]);

  const getRegionalHref = (path: string) => {
    const localizedPaths = ["/", "/seo-services", "/website-development", "/contact"];
    if (localizedPaths.includes(path)) {
      if (currentRegion === "") return path;
      return `/${currentRegion}${path === "/" ? "" : path}`;
    }
    return path;
  };

  return (
    <footer className="bg-gradient-to-br from-dark to-dark-slate text-white pt-20 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 border-b border-white/10 pb-16">
        
        {/* Brand Info */}
        <div className="flex flex-col gap-6 col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-1">
          <Link href={getRegionalHref("/")} title="Joy Digital Home" className="flex items-center gap-3">
            <Image
              src="/assets/images/logo.webp"
              alt="Joy Digital Logo"
              title="Joy Digital Logo"
              width={70}
              height={70}
              className="object-contain"
            />
            <span className="font-bold text-2xl tracking-tight">
              Joy<span className="text-accent-light">Digital</span>
            </span>
          </Link>
          <p className="text-text-muted text-xs leading-relaxed">
            High-performance, global digital agency delivering SEO, custom website development, and conversion-focused systems for brands targeting the USA, UK, UAE, and India.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/919080026133"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded bg-white/5 flex items-center justify-center text-text-muted hover:bg-accent hover:text-white transition-all duration-300"
              aria-label="WhatsApp"
              data-wa-location="footer"
            >
              <i className="fa-brands fa-whatsapp"></i>
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61590372457559"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded bg-white/5 flex items-center justify-center text-text-muted hover:bg-accent hover:text-white transition-all duration-300"
              aria-label="Facebook"
            >
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a
              href="https://www.youtube.com/@Joydigital2026"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded bg-white/5 flex items-center justify-center text-text-muted hover:bg-accent hover:text-white transition-all duration-300"
              aria-label="YouTube"
            >
              <i className="fa-brands fa-youtube"></i>
            </a>
            <a
              href="mailto:joydiigtals@gmail.com"
              className="w-10 h-10 rounded bg-white/5 flex items-center justify-center text-text-muted hover:bg-accent hover:text-white transition-all duration-300"
              aria-label="Email"
            >
              <i className="fa-solid fa-envelope"></i>
            </a>
          </div>
        </div>

        {/* Global Regions / SEO Sitemap Backlinks */}
        <div className="flex flex-col gap-6">
          <h4 className="text-sm font-bold uppercase tracking-wider text-accent-light relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-accent">
            Global Offices
          </h4>
          <ul className="flex flex-col gap-3 text-xs text-text-muted">
            {REGIONAL_SITES.map((site) => (
              <li key={site.code}>
                <Link
                  href={site.code === "" ? "/" : `/${site.code}`}
                  className="flex items-center gap-2 hover:text-accent-light hover:pl-1 transition-all"
                >
                  <span className="text-sm">{site.flag}</span>
                  <span>{site.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services / Dynamic Links */}
        <div className="flex flex-col gap-6">
          <h4 className="text-sm font-bold uppercase tracking-wider text-accent-light relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-accent">
            Featured Services
          </h4>
          <ul className="flex flex-col gap-3.5 text-xs text-text-muted">
            <li>
              <Link href={getRegionalHref("/seo-services")} className="hover:text-accent-light hover:pl-1 transition-all">
                Search Engine Optimization
              </Link>
            </li>
            <li>
              <Link href={getRegionalHref("/website-development")} className="hover:text-accent-light hover:pl-1 transition-all">
                Website Development
              </Link>
            </li>
            <li>
              <Link href="/web-design-services" className="hover:text-accent-light hover:pl-1 transition-all">
                Website Design
              </Link>
            </li>
            <li>
              <Link href="/local-seo-services" className="hover:text-accent-light hover:pl-1 transition-all">
                Local SEO & Maps
              </Link>
            </li>
            <li>
              <Link href="/social-media-marketing" className="hover:text-accent-light hover:pl-1 transition-all">
                Social Media Marketing
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal Info */}
        <div className="flex flex-col gap-6">
          <h4 className="text-sm font-bold uppercase tracking-wider text-accent-light relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-accent">
            Company & Legal
          </h4>
          <ul className="flex flex-col gap-3.5 text-xs text-text-muted">
            <li>
              <Link href="/about" className="hover:text-accent-light hover:pl-1 transition-all">
                About Our Agency
              </Link>
            </li>
            <li>
              <Link href="/case-studies" className="hover:text-accent-light hover:pl-1 transition-all">
                Client Case Studies
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="hover:text-accent-light hover:pl-1 transition-all">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms-and-conditions" className="hover:text-accent-light hover:pl-1 transition-all">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link href="/free-audit" className="font-bold text-accent-light hover:text-accent hover:pl-1 transition-all">
                Claim Free Website Audit
              </Link>
            </li>
          </ul>
        </div>

        {/* Global Support Numbers */}
        <div className="flex flex-col gap-6">
          <h4 className="text-sm font-bold uppercase tracking-wider text-accent-light relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-accent">
            Helpdesk
          </h4>
          <ul className="flex flex-col gap-3 text-xs text-text-muted">
            <li className="flex items-center gap-2">
              <span>🇮🇳</span>
              <span><strong>India & WA:</strong> <a href="tel:+919080026133" className="hover:text-white transition-colors">+91 90800 26133</a></span>
            </li>
            <li className="flex items-center gap-2 border-t border-white/5 pt-3 mt-1">
              <span className="text-accent-light"><i className="fa-solid fa-envelope" /></span>
              <a href="mailto:joydiigtals@gmail.com" className="hover:text-white transition-colors">joydiigtals@gmail.com</a>
            </li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted">
        <p>
          Copyright &copy; {new Date().getFullYear()} Joy Digital Growth Agency. All Rights Reserved.
        </p>
        <div className="flex gap-6">
          <Link href="/privacy-policy" className="hover:text-accent-light transition-colors">Privacy Policy</Link>
          <Link href="/terms-and-conditions" className="hover:text-accent-light transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}

