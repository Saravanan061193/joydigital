"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const REGIONAL_SITES = [
  { code: "in", label: "India (INR)", flag: "🇮🇳" },
];

export default function Footer() {
  const pathname = usePathname();
  const [subscribed, setSubscribed] = React.useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const emailInput = form.querySelector('input[type="email"]') as HTMLInputElement;
    const email = emailInput?.value || "";

    try {
      const response = await fetch("https://formsubmit.co/ajax/saravanan061193@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          Email: email,
          Source: "Newsletter Footer Form",
          Message: "Newsletter subscription request.",
          _subject: "📬 Newsletter Subscription - Joy Digital",
          _captcha: "false",
        }),
      });
      if (response.ok) {
        setSubscribed(true);
        emailInput.value = "";
        
        // Track event
        const tracker = (window as any).trackJoyDigitalEvent;
        if (typeof tracker === "function") {
          tracker("newsletter_signup", { email });
        }
      }
    } catch (err) {
      console.error("Newsletter submission failed:", err);
    }
  };

  // Detect current region from pathname
  const parts = pathname.split("/").filter(Boolean);
  const currentRegion = (parts.length > 0 && ["us", "uk", "ae", "in"].includes(parts[0])) ? parts[0] : "";

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
          <p className="text-text-secondary text-xs leading-relaxed">
            High-performance, global digital agency delivering SEO, custom website development, and conversion-focused systems for brands targeting the USA, UK, UAE, and India.
          </p>
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
              href="https://www.linkedin.com/in/saravanan-joydigital/"
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

          {/* Newsletter Box */}
          <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-gray-200">
            <span className="text-[10px] font-bold text-[#111827] uppercase tracking-wider">Subscribe to Newsletter</span>
            <p className="text-[10px] text-text-secondary leading-tight">Get weekly SEO tips & conversion hacks to grow your business.</p>
            {subscribed ? (
              <span className="text-emerald-600 text-xs font-semibold flex items-center gap-1 mt-1">
                <i className="fa-solid fa-circle-check" /> You're subscribed!
              </span>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex gap-1.5 w-full mt-1">
                <input
                  type="email"
                  placeholder="Enter email..."
                  required
                  className="bg-white border border-[#E5E7EB] text-xs px-3.5 py-2.5 rounded-lg outline-none focus:border-accent w-full"
                />
                <button
                  type="submit"
                  className="bg-[#2563EB] hover:bg-[#3B82F6] text-white text-xs px-4 py-2.5 rounded-lg font-bold shadow-sm transition-all cursor-pointer"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Global Regions / SEO Sitemap Backlinks */}
        <div className="flex flex-col gap-6">
          <h4 className="text-sm font-bold uppercase tracking-wider text-[#111827] relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-accent">
            SEO Locations
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
            <li className="border-t border-[#E5E7EB] pt-2 mt-1">
              <Link href="/web-development-company-in-chennai" className="hover:text-accent hover:pl-1 transition-all block">
                Web Development Chennai
              </Link>
            </li>
            <li>
              <Link href="/website-design-company-in-chennai" className="hover:text-accent hover:pl-1 transition-all block">
                Website Design Chennai
              </Link>
            </li>
            <li>
              <Link href="/seo-services-in-chennai" className="hover:text-accent hover:pl-1 transition-all block">
                SEO Services Chennai
              </Link>
            </li>
            <li>
              <Link href="/digital-marketing-agency-in-chennai" className="hover:text-accent hover:pl-1 transition-all block">
                Digital Marketing Chennai
              </Link>
            </li>
            <li>
              <Link href="/google-business-profile-optimization" className="hover:text-accent hover:pl-1 transition-all block">
                GBP Maps Optimization
              </Link>
            </li>
          </ul>
        </div>

        {/* Services / Dynamic Links */}
        <div className="flex flex-col gap-6">
          <h4 className="text-sm font-bold uppercase tracking-wider text-[#111827] relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-accent">
            Featured Services
          </h4>
          <ul className="flex flex-col gap-3 text-xs text-text-secondary">
            <li>
              <Link href={getRegionalHref("/seo-services")} className="hover:text-accent hover:pl-1 transition-all">
                Search Engine Optimization
              </Link>
            </li>
            <li>
              <Link href={getRegionalHref("/website-development")} className="hover:text-accent hover:pl-1 transition-all">
                Website Development
              </Link>
            </li>
            <li>
              <Link href="/web-design-services" className="hover:text-accent hover:pl-1 transition-all">
                Website Design
              </Link>
            </li>
            <li>
              <Link href="/local-seo-services" className="hover:text-accent hover:pl-1 transition-all">
                Local SEO & Maps
              </Link>
            </li>
            <li>
              <Link href="/ecommerce-website-development" className="hover:text-accent hover:pl-1 transition-all">
                Ecommerce Web Dev
              </Link>
            </li>
            <li>
              <Link href="/custom-software-development" className="hover:text-accent hover:pl-1 transition-all">
                Custom Software Dev
              </Link>
            </li>
            <li className="border-t border-[#E5E7EB] pt-2 mt-1">
              <Link href="/website-for-insurance-agents" className="hover:text-accent hover:pl-1 transition-all">
                Website for Insurance Agents
              </Link>
            </li>
            <li>
              <Link href="/website-for-hotels" className="hover:text-accent hover:pl-1 transition-all">
                Website for Hotels
              </Link>
            </li>
            <li>
              <Link href="/website-for-hospitals" className="hover:text-accent hover:pl-1 transition-all">
                Website for Hospitals
              </Link>
            </li>
            <li>
              <Link href="/website-for-real-estate" className="hover:text-accent hover:pl-1 transition-all">
                Website for Real Estate
              </Link>
            </li>
            <li>
              <Link href="/website-for-tours-and-travels" className="hover:text-accent hover:pl-1 transition-all">
                Website for Tours & Travels
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal Info */}
        <div className="flex flex-col gap-6">
          <h4 className="text-sm font-bold uppercase tracking-wider text-[#111827] relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-accent">
            Company & Legal
          </h4>
          <ul className="flex flex-col gap-3.5 text-xs text-text-secondary">
            <li>
              <Link href="/about" className="hover:text-accent hover:pl-1 transition-all">
                About Our Agency
              </Link>
            </li>
            <li>
              <Link href="/case-studies" className="hover:text-accent hover:pl-1 transition-all">
                Client Case Studies
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="hover:text-accent hover:pl-1 transition-all">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms-and-conditions" className="hover:text-accent hover:pl-1 transition-all">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link href="/free-audit" className="font-bold text-accent hover:text-accent-dark hover:pl-1 transition-all">
                Claim Free Website Audit
              </Link>
            </li>
          </ul>
        </div>

        {/* Global Support Numbers */}
        <div className="flex flex-col gap-6">
          <h4 className="text-sm font-bold uppercase tracking-wider text-[#111827] relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-accent">
            Helpdesk
          </h4>
          <ul className="flex flex-col gap-3 text-xs text-text-secondary">
            <li className="flex items-center gap-2">
              <span>🇮🇳</span>
              <span><strong>India & WA:</strong> <a href="tel:+919080026133" className="hover:text-accent text-[#111827] font-medium transition-colors">+91 90800 26133</a></span>
            </li>
            <li className="flex items-center gap-2 border-t border-[#E5E7EB] pt-3 mt-1">
              <span className="text-accent"><i className="fa-solid fa-envelope" /></span>
              <a href="mailto:saravanan061193@gmail.com" className="hover:text-accent text-[#111827] font-medium transition-colors">saravanan061193@gmail.com</a>
            </li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-secondary">
        <p>
          Copyright &copy; {new Date().getFullYear()} Joy Digital Growth Agency. All Rights Reserved.
        </p>
        <div className="flex gap-6">
          <Link href="/privacy-policy" className="hover:text-accent transition-colors">Privacy Policy</Link>
          <Link href="/terms-and-conditions" className="hover:text-accent transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
