"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const REGIONAL_SITES = [
  { code: "", label: "Global (USD)", flag: "🌐" },
  { code: "us", label: "United States (USD)", flag: "🇺🇸" },
  { code: "uk", label: "United Kingdom (GBP)", flag: "🇬🇧" },
  { code: "ae", label: "United Arab Emirates (AED)", flag: "🇦🇪" },
  { code: "in", label: "India (INR)", flag: "🇮🇳" },
  { code: "ca", label: "Canada (CAD)", flag: "🇨🇦" },
  { code: "au", label: "Australia (AUD)", flag: "🇦🇺" },
];

export default function Footer() {
  const pathname = usePathname();

  // Detect current region from pathname
  const parts = pathname.split("/").filter(Boolean);
  const currentRegion = (parts.length > 0 && ["us", "uk", "ae", "in", "ca", "au"].includes(parts[0])) ? parts[0] : "";

  const getRegionalHref = (path: string) => {
    const localizedPaths = ["/", "/seo-services", "/website-development", "/contact"];
    if (localizedPaths.includes(path)) {
      if (currentRegion === "") return path;
      return `/${currentRegion}${path === "/" ? "" : path}`;
    }
    return path;
  };

  return (
    <footer className="bg-[#FAFAFA] text-text-primary border-t border-[#E5E7EB] pt-20 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 border-b border-[#E5E7EB] pb-16">
        
        {/* Brand Info */}
        <div className="flex flex-col gap-5 col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-1">
          <Link href={getRegionalHref("/")} title="Joy Digital Home" className="flex items-center gap-3">
            <Image
              src="/assets/images/logo.webp"
              alt="Joy Digital - Web Design & Digital Marketing Agency Logo"
              title="Joy Digital Logo"
              width={70}
              height={70}
              className="object-contain"
            />
            <span className="font-bold text-2xl tracking-tight text-[#111827]">
              Joy<span className="text-accent">Digital</span>
            </span>
          </Link>
          <div className="text-text-secondary text-xs leading-relaxed flex flex-col gap-3">
            <p className="font-bold text-[#0F172A]">Websites, SEO & Digital Marketing for Businesses Worldwide</p>
            <p>Based in India, serving startups, small businesses, and growing companies globally. Delivering premium web solutions and conversion-focused search optimizations through direct remote collaboration.</p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/919080026133"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded bg-[#E5E7EB]/50 border border-[#E5E7EB] flex items-center justify-center text-text-secondary hover:bg-accent hover:text-white transition-all duration-300"
              aria-label="WhatsApp"
              data-wa-location="footer"
            >
              <i className="fa-brands fa-whatsapp"></i>
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61590372457559"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded bg-[#E5E7EB]/50 border border-[#E5E7EB] flex items-center justify-center text-text-secondary hover:bg-accent hover:text-white transition-all duration-300"
              aria-label="Facebook"
            >
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a
              href="https://www.youtube.com/@Joydigital2026"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded bg-[#E5E7EB]/50 border border-[#E5E7EB] flex items-center justify-center text-text-secondary hover:bg-accent hover:text-white transition-all duration-300"
              aria-label="YouTube"
            >
              <i className="fa-brands fa-youtube"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/saravanan-l-34a861154/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded bg-[#E5E7EB]/50 border border-[#E5E7EB] flex items-center justify-center text-text-secondary hover:bg-accent hover:text-white transition-all duration-300"
              aria-label="LinkedIn"
            >
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
            <a
              href="mailto:saravanan061193@gmail.com"
              className="w-10 h-10 rounded bg-[#E5E7EB]/50 border border-[#E5E7EB] flex items-center justify-center text-text-secondary hover:bg-accent hover:text-white transition-all duration-300"
              aria-label="Email"
            >
              <i className="fa-solid fa-envelope"></i>
            </a>
          </div>
        </div>

        {/* Service Locations Sitemap Links */}
        <div className="flex flex-col gap-6">
          <h4 className="text-sm font-bold uppercase tracking-wider text-[#111827] relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-accent">
            Global & Regional
          </h4>
          <ul className="flex flex-col gap-3 text-xs text-text-secondary">
            {REGIONAL_SITES.map((site) => (
              <li key={site.code}>
                <Link
                  href={site.code === "" ? "/" : `/${site.code}`}
                  className="flex items-center gap-2 hover:text-accent hover:pl-1 transition-all"
                >
                  <span className="text-sm">{site.flag}</span>
                  <span>{site.label}</span>
                </Link>
              </li>
            ))}
            <li className="border-t border-[#E5E7EB] pt-2 mt-1 font-bold text-[#111827]">
              Regional Hubs (Tamil Nadu)
            </li>
            <li>
              <Link href="/website-design-company-chennai" className="hover:text-accent hover:pl-1 transition-all block">Web Design Chennai</Link>
            </li>
            <li>
              <Link href="/website-design-company-in-chennai" className="hover:text-accent hover:pl-1 transition-all block">Website Design in Chennai</Link>
            </li>
            <li>
              <Link href="/web-development-company-chennai" className="hover:text-accent hover:pl-1 transition-all block">Web Development Chennai</Link>
            </li>
            <li>
              <Link href="/website-development-company-chennai" className="hover:text-accent hover:pl-1 transition-all block">Website Dev Agency Chennai</Link>
            </li>
            <li>
              <Link href="/affordable-web-design-agency-chennai" className="hover:text-accent hover:pl-1 transition-all block">Affordable Web Design Chennai</Link>
            </li>
            <li>
              <Link href="/seo-company-chennai" className="hover:text-accent hover:pl-1 transition-all block">SEO Agency Chennai</Link>
            </li>
            <li>
              <Link href="/seo-services-chennai" className="hover:text-accent hover:pl-1 transition-all block">SEO Services Chennai</Link>
            </li>
            <li>
              <Link href="/seo-services-in-chennai" className="hover:text-accent hover:pl-1 transition-all block">SEO Company in Chennai</Link>
            </li>
            <li>
              <Link href="/digital-marketing-agency-in-chennai" className="hover:text-accent hover:pl-1 transition-all block">Digital Marketing Chennai</Link>
            </li>
            <li>
              <Link href="/website-design-company-madurai" className="hover:text-accent hover:pl-1 transition-all block">Web Design Madurai</Link>
            </li>
            <li>
              <Link href="/web-development-company-madurai" className="hover:text-accent hover:pl-1 transition-all block">Web Development Madurai</Link>
            </li>
            <li>
              <Link href="/website-development-company-madurai" className="hover:text-accent hover:pl-1 transition-all block">Website Dev Agency Madurai</Link>
            </li>
            <li>
              <Link href="/seo-company-madurai" className="hover:text-accent hover:pl-1 transition-all block">SEO Services Madurai</Link>
            </li>
            <li>
              <Link href="/seo-services-madurai" className="hover:text-accent hover:pl-1 transition-all block">SEO Agency Madurai</Link>
            </li>
            <li>
              <Link href="/digital-marketing-agency-madurai" className="hover:text-accent hover:pl-1 transition-all block">Digital Marketing Madurai</Link>
            </li>
            <li>
              <Link href="/local-seo-madurai" className="hover:text-accent hover:pl-1 transition-all block">Local SEO Madurai</Link>
            </li>
            <li>
              <Link href="/website-design-company-coimbatore" className="hover:text-accent hover:pl-1 transition-all block">Web Design Coimbatore</Link>
            </li>
            <li>
              <Link href="/seo-company-coimbatore" className="hover:text-accent hover:pl-1 transition-all block">SEO Company Coimbatore</Link>
            </li>
          </ul>
        </div>

        {/* Featured Services column */}
        <div className="flex flex-col gap-6">
          <h4 className="text-sm font-bold uppercase tracking-wider text-[#111827] relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-accent">
            Featured Services
          </h4>
          <ul className="flex flex-col gap-3 text-xs text-text-secondary">
            <li>
              <Link href={getRegionalHref("/website-development")} className="hover:text-accent hover:pl-1 transition-all">
                Next.js Web Development
              </Link>
            </li>
            <li>
              <Link href="/web-design-services" className="hover:text-accent hover:pl-1 transition-all">
                Website Design Services
              </Link>
            </li>
            <li>
              <Link href="/local-seo-services" className="hover:text-accent hover:pl-1 transition-all">
                Local SEO Services
              </Link>
            </li>
            <li>
              <Link href="/google-business-profile-setup" className="hover:text-accent hover:pl-1 transition-all">
                Google Business Profile Setup
              </Link>
            </li>
            <li>
              <Link href="/google-business-profile-optimization" className="hover:text-accent hover:pl-1 transition-all">
                Google Business Profile Audit
              </Link>
            </li>
            <li>
              <Link href="/social-media-marketing" className="hover:text-accent hover:pl-1 transition-all">
                Social Media Marketing
              </Link>
            </li>
            <li>
              <Link href="/logo-design-services" className="hover:text-accent hover:pl-1 transition-all">
                Logo & Branding Design
              </Link>
            </li>
            <li>
              <Link href="/ecommerce-website-development" className="hover:text-accent hover:pl-1 transition-all">
                Headless E-commerce Web Dev
              </Link>
            </li>
            <li>
              <Link href="/custom-software-development" className="hover:text-accent hover:pl-1 transition-all">
                Custom Software Development
              </Link>
            </li>
            <li>
              <Link href="/custom-website-development" className="hover:text-accent hover:pl-1 transition-all">
                Custom Next.js Web Systems
              </Link>
            </li>
            <li>
              <Link href="/dynamic-website-development" className="hover:text-accent hover:pl-1 transition-all">
                Dynamic Web Applications
              </Link>
            </li>
            <li>
              <Link href="/wordpress-to-nextjs-migration" className="hover:text-accent hover:pl-1 transition-all">
                WordPress to Next.js Migration
              </Link>
            </li>
            <li>
              <Link href="/shopify-vs-headless-nextjs" className="hover:text-accent hover:pl-1 transition-all">
                Shopify vs Headless Next.js
              </Link>
            </li>
            <li>
              <Link href="/offshore-web-development-partner" className="hover:text-accent hover:pl-1 transition-all">
                Offshore Web Dev Partner
              </Link>
            </li>
            <li className="border-t border-[#E5E7EB] pt-2 mt-1 font-bold text-[#111827]">
              Industry Solutions
            </li>
            <li>
              <Link href="/website-for-insurance-agents" className="hover:text-accent hover:pl-1 transition-all">Website for Insurance Agents</Link>
            </li>
            <li>
              <Link href="/website-for-hotels" className="hover:text-accent hover:pl-1 transition-all">Website for Hotels</Link>
            </li>
            <li>
              <Link href="/website-for-hospitals" className="hover:text-accent hover:pl-1 transition-all">Website for Hospitals</Link>
            </li>
            <li>
              <Link href="/website-for-real-estate" className="hover:text-accent hover:pl-1 transition-all">Website for Real Estate</Link>
            </li>
            <li>
              <Link href="/website-for-tours-and-travels" className="hover:text-accent hover:pl-1 transition-all">Website for Tours & Travels</Link>
            </li>
            <li>
              <Link href="/website-for-schools" className="hover:text-accent hover:pl-1 transition-all">Website for Schools</Link>
            </li>
            <li>
              <Link href="/website-for-small-business" className="hover:text-accent hover:pl-1 transition-all">Website for Small Business</Link>
            </li>
            <li>
              <Link href="/website-for-ecommerce" className="hover:text-accent hover:pl-1 transition-all">Website for E-commerce Stores</Link>
            </li>
            <li>
              <Link href="/website-for-solar-companies" className="hover:text-accent hover:pl-1 transition-all">Website for Solar Companies</Link>
            </li>
            <li>
              <Link href="/website-for-textile-manufacturers" className="hover:text-accent hover:pl-1 transition-all">Website for Textile Manufacturers</Link>
            </li>
            <li>
              <Link href="/website-for-manufacturing-companies" className="hover:text-accent hover:pl-1 transition-all">Website for Manufacturing</Link>
            </li>
            <li>
              <Link href="/website-for-law-firms" className="hover:text-accent hover:pl-1 transition-all">Website for Law Firms</Link>
            </li>
            <li>
              <Link href="/website-for-consulting-companies" className="hover:text-accent hover:pl-1 transition-all">Website for Consulting</Link>
            </li>
            <li>
              <Link href="/website-for-logistics-and-shipping" className="hover:text-accent hover:pl-1 transition-all">Website for Logistics & Shipping</Link>
            </li>
            <li>
              <Link href="/website-for-export-and-import" className="hover:text-accent hover:pl-1 transition-all">Website for Export & Import</Link>
            </li>
            <li>
              <Link href="/website-for-marketing-agencies" className="hover:text-accent hover:pl-1 transition-all">Website for Marketing Agencies</Link>
            </li>
            <li>
              <Link href="/website-for-luxury-brands" className="hover:text-accent hover:pl-1 transition-all font-semibold text-accent">Website for Luxury Brands</Link>
            </li>
          </ul>
        </div>

        {/* Legal Info */}
        <div className="flex flex-col gap-6">
          <h4 className="text-sm font-bold uppercase tracking-wider text-[#111827] relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-accent">
            Tools & Company
          </h4>
          <ul className="flex flex-col gap-3.5 text-xs text-text-secondary">
            <li>
              <Link href="/about" className="hover:text-accent hover:pl-1 transition-all">About Our Agency</Link>
            </li>
            <li>
              <Link href={getRegionalHref("/contact")} className="hover:text-accent hover:pl-1 transition-all">Contact Us</Link>
            </li>
            <li>
              <Link href="/portfolio" className="hover:text-accent hover:pl-1 transition-all">Portfolio</Link>
            </li>
            <li>
              <Link href="/case-studies" className="hover:text-accent hover:pl-1 transition-all">Case Studies</Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="hover:text-accent hover:pl-1 transition-all">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/terms-and-conditions" className="hover:text-accent hover:pl-1 transition-all">Terms & Conditions</Link>
            </li>
            <li>
              <Link href="/disclaimer" className="hover:text-accent hover:pl-1 transition-all">Disclaimer</Link>
            </li>
            <li>
              <Link href="/refund-policy" className="hover:text-accent hover:pl-1 transition-all">Refund Policy</Link>
            </li>
            <li>
              <Link href="/cookie-policy" className="hover:text-accent hover:pl-1 transition-all">Cookie Policy</Link>
            </li>
            <li className="border-t border-[#E5E7EB] pt-2 mt-1 font-bold text-[#111827]">
              Free Online Tools
            </li>
            <li>
              <Link href="/free-tools" className="hover:text-accent hover:pl-1 transition-all">All Free Business Tools</Link>
            </li>
            <li>
              <Link href="/gst-calculator" className="hover:text-accent hover:pl-1 transition-all">GST Calculator</Link>
            </li>
            <li>
              <Link href="/invoice-generator" className="hover:text-accent hover:pl-1 transition-all">Invoice Generator</Link>
            </li>
            <li>
              <Link href="/quotation-generator" className="hover:text-accent hover:pl-1 transition-all">Quotation Generator</Link>
            </li>
            <li>
              <Link href="/qr-code-generator" className="hover:text-accent hover:pl-1 transition-all">QR Code Generator</Link>
            </li>
            <li>
              <Link href="/whatsapp-link-generator" className="hover:text-accent hover:pl-1 transition-all">WhatsApp Link Generator</Link>
            </li>
            <li>
              <Link href="/seo-audit-tool" className="hover:text-accent hover:pl-1 transition-all">Free SEO Audit Tool</Link>
            </li>
            <li>
              <Link href="/image-compressor" className="hover:text-accent hover:pl-1 transition-all">Free Image Compressor</Link>
            </li>
            <li>
              <Link href="/free-website-audit" className="font-bold text-accent hover:text-accent-dark hover:pl-1 transition-all">Claim Free Website Audit</Link>
            </li>
          </ul>
        </div>

        {/* Global Support & Office Location */}
        <div className="flex flex-col gap-5">
          <h4 className="text-sm font-bold uppercase tracking-wider text-[#111827] relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-accent">
            Office Location
          </h4>
          <div className="text-xs text-text-secondary flex flex-col gap-2">
            <p className="font-medium text-[#111827] flex items-start gap-1.5 leading-relaxed">
              <i className="fa-solid fa-location-dot text-accent mt-0.5 shrink-0" />
              <span>RUBY SHOBHA CASTLE, 10D, Old Perungalathur, Tambaram, Chennai, Tamil Nadu 600063</span>
            </p>
          </div>
          <ul className="flex flex-col gap-2.5 text-xs text-text-secondary border-t border-[#E5E7EB] pt-3">
            <li className="flex items-center gap-2">
              <span>🇮🇳</span>
              <span><strong>India & WA:</strong> <a href="tel:+919080026133" className="hover:text-accent text-[#111827] font-medium transition-colors">+91 90800 26133</a></span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-accent"><i className="fa-solid fa-envelope" /></span>
              <a href="mailto:saravanan061193@gmail.com" className="hover:text-accent text-[#111827] font-medium transition-colors">saravanan061193@gmail.com</a>
            </li>
          </ul>
          <div className="w-full h-44 rounded-xl overflow-hidden border border-[#E5E7EB] shadow-sm mt-1">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7777.443250431031!2d80.08850594066773!3d12.925604899541957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52f58f958eb23d%3A0xff0979a4a8ce5768!2sRUBY%20SHOBHA%20CASTLE%2C%2010D%2C%20Old%20Perungalathur%2C%20Tambaram%2C%20Tamil%20Nadu%20600063!5e0!3m2!1sen!2sin!4v1788103977912!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Joy Digital Office Location - Ruby Shobha Castle, Tambaram, Chennai"
            />
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-[#E5E7EB] mt-8 flex flex-col gap-6 text-center text-xs text-text-secondary">
        <p className="font-semibold text-slate-500">
          Joy Digital – Premium Web Design, High-Speed Next.js Web Development & Search Engine Optimization (SEO) for Businesses Worldwide.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
          <p>
            Copyright &copy; {new Date().getFullYear()} Joy Digital Growth Agency. All Rights Reserved.
          </p>
          <div className="flex gap-6 flex-wrap justify-center">
            <Link href="/sitemap" className="hover:text-accent transition-colors font-semibold text-accent">HTML Sitemap</Link>
            <Link href="/privacy-policy" className="hover:text-accent transition-colors">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="hover:text-accent transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
