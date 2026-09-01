import React from "react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "HTML Sitemap | Joy Digital Web Design & SEO Services",
  description: "Complete list of all website pages, regional hubs, industry solutions, and free business tools on JoyDigital.in.",
};

const SECTIONS = [
  {
    title: "Core Pages",
    links: [
      { href: "/", label: "Homepage" },
      { href: "/about", label: "About Us" },
      { href: "/portfolio", label: "Portfolio" },
      { href: "/case-studies", label: "Case Studies" },
      { href: "/blog", label: "Blog" },
      { href: "/contact", label: "Contact Us" },
      { href: "/free-website-audit", label: "Free Website Audit" },
    ],
  },
  {
    title: "Global & Regional Pages",
    links: [
      { href: "/", label: "Global Operations" },
      { href: "/us", label: "United States (US)" },
      { href: "/uk", label: "United Kingdom (UK)" },
      { href: "/ae", label: "United Arab Emirates (UAE)" },
      { href: "/in", label: "India (IN)" },
      { href: "/ca", label: "Canada (CA)" },
      { href: "/au", label: "Australia (AU)" },
    ],
  },
  {
    title: "Core Web & SEO Services",
    links: [
      { href: "/website-development", label: "Website Development" },
      { href: "/seo-services", label: "SEO Services" },
      { href: "/web-design-services", label: "Web Design Services" },
      { href: "/local-seo-services", label: "Local SEO Services" },
      { href: "/google-business-profile-setup", label: "Google Business Profile Setup" },
      { href: "/google-business-profile-optimization", label: "Google Business Profile Audit" },
      { href: "/social-media-marketing", label: "Social Media Marketing" },
      { href: "/logo-design-services", label: "Logo & Branding Design" },
      { href: "/ecommerce-website-development", label: "Headless E-commerce Web Dev" },
      { href: "/custom-software-development", label: "Custom Software Development" },
      { href: "/custom-website-development", label: "Custom Next.js Web Systems" },
      { href: "/dynamic-website-development", label: "Dynamic Web Applications" },
      { href: "/wordpress-to-nextjs-migration", label: "WordPress to Next.js Migration" },
      { href: "/shopify-vs-headless-nextjs", label: "Shopify vs Headless Next.js" },
      { href: "/offshore-web-development-partner", label: "Offshore Web Development Partner" },
    ],
  },
  {
    title: "Industry Solutions",
    links: [
      { href: "/website-for-insurance-agents", label: "Website for Insurance Agents" },
      { href: "/website-for-hotels", label: "Website for Hotels" },
      { href: "/website-for-hospitals", label: "Website for Hospitals" },
      { href: "/website-for-real-estate", label: "Website for Real Estate" },
      { href: "/website-for-tours-and-travels", label: "Website for Tours & Travels" },
      { href: "/website-for-schools", label: "Website for Schools" },
      { href: "/website-for-small-business", label: "Website for Small Business" },
      { href: "/website-for-ecommerce", label: "Website for E-commerce Stores" },
      { href: "/website-for-solar-companies", label: "Website for Solar Companies" },
      { href: "/website-for-textile-manufacturers", label: "Website for Textile Manufacturers" },
      { href: "/website-for-manufacturing-companies", label: "Website for Manufacturing Companies" },
      { href: "/website-for-law-firms", label: "Website for Law Firms" },
      { href: "/website-for-consulting-companies", label: "Website for Consulting Companies" },
      { href: "/website-for-logistics-and-shipping", label: "Website for Logistics & Shipping" },
      { href: "/website-for-export-and-import", label: "Website for Export & Import" },
      { href: "/website-for-marketing-agencies", label: "Website for Marketing Agencies" },
      { href: "/website-for-luxury-brands", label: "Website for Luxury Brands" },
    ],
  },
  {
    title: "Regional Landing Pages (Tamil Nadu)",
    links: [
      { href: "/website-design-company-chennai", label: "Web Design Chennai" },
      { href: "/website-design-company-in-chennai", label: "Website Design in Chennai" },
      { href: "/web-development-company-chennai", label: "Web Development Chennai" },
      { href: "/website-development-company-chennai", label: "Website Development Company Chennai" },
      { href: "/affordable-web-design-agency-chennai", label: "Affordable Web Design Agency Chennai" },
      { href: "/seo-company-chennai", label: "SEO Company Chennai" },
      { href: "/seo-services-chennai", label: "SEO Services Chennai" },
      { href: "/seo-services-in-chennai", label: "SEO Services in Chennai" },
      { href: "/digital-marketing-agency-in-chennai", label: "Digital Marketing Agency Chennai" },
      { href: "/website-design-company-madurai", label: "Web Design Madurai" },
      { href: "/web-development-company-madurai", label: "Web Development Madurai" },
      { href: "/website-development-company-madurai", label: "Website Development Agency Madurai" },
      { href: "/seo-company-madurai", label: "SEO Company Madurai" },
      { href: "/seo-services-madurai", label: "SEO Services Madurai" },
      { href: "/digital-marketing-agency-madurai", label: "Digital Marketing Agency Madurai" },
      { href: "/local-seo-madurai", label: "Local SEO Madurai" },
      { href: "/website-design-company-coimbatore", label: "Web Design Company Coimbatore" },
      { href: "/seo-company-coimbatore", label: "SEO Company Coimbatore" },
    ],
  },
  {
    title: "Free Tools & Legal",
    links: [
      { href: "/free-tools", label: "All Free Business Tools" },
      { href: "/gst-calculator", label: "GST Calculator" },
      { href: "/invoice-generator", label: "Invoice Generator" },
      { href: "/quotation-generator", label: "Quotation Generator" },
      { href: "/qr-code-generator", label: "QR Code Generator" },
      { href: "/whatsapp-link-generator", label: "WhatsApp Link Generator" },
      { href: "/seo-audit-tool", label: "SEO Audit Tool" },
      { href: "/image-compressor", label: "Free Image Compressor" },
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms-and-conditions", label: "Terms & Conditions" },
      { href: "/cookie-policy", label: "Cookie Policy" },
      { href: "/disclaimer", label: "Disclaimer" },
      { href: "/refund-policy", label: "Refund Policy" },
    ],
  },
];

export default function HtmlSitemapPage() {
  return (
    <main className="pt-28 pb-20 bg-[#FAF9FF] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold text-accent uppercase tracking-widest block">
            INDEXABLE MAP
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-primary-dark tracking-tight">
            HTML Sitemap
          </h1>
          <p className="text-sm text-text-secondary">
            Quick directory access to all web design, development, SEO services, industry solutions, and free tools offered by Joy Digital.
          </p>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SECTIONS.map((sec, idx) => (
            <div key={idx} className="bg-white border border-[#E9E4F2] rounded-2xl p-6 shadow-sm space-y-4">
              <h2 className="text-base font-extrabold text-primary-dark border-b border-[#E9E4F2] pb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <span>{sec.title}</span>
              </h2>
              <ul className="space-y-2 text-xs text-text-secondary">
                {sec.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="hover:text-accent hover:pl-1 transition-all block font-medium"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
