import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";
import { generatePageSeo } from "@/lib/seoEngine";

export async function generateMetadata(): Promise<Metadata> {
  const seoData = await generatePageSeo(
    "/portfolio-website-development",
    "Portfolio Website Development, Templates & AI Design | Joy Digital",
    "Build a custom portfolio website for web developers, executives & agency owners. Explore portfolio website templates, GitHub hosting, and Pinterest design trends."
  );
  return seoData.metadata;
}

export default async function PortfolioWebDevPage() {
  const seoData = await generatePageSeo(
    "/portfolio-website-development",
    "Portfolio Website Development, Templates & AI Design | Joy Digital",
    "Build a custom portfolio website for web developers, executives & agency owners. Explore portfolio website templates, GitHub hosting, and Pinterest design trends."
  );

  return (
    <>
      <ServicePageTemplate
        serviceName="Portfolio Website Development"
        heroTitle={seoData.pageMapping?.h1 || "Custom Portfolio Website Development & Personal Branding Architecture"}
        heroSubtitle="Build stunning, modern portfolio websites tailored for consultants, executives, web developers, agency owners, and creative professionals. Stand out from competitors and convert visitors into high-paying clients."
        leadSource="Portfolio Website Development Page"
        heroCtaText="Request a Portfolio Web Quote"
        canonicalUrl="https://joydigital.in/portfolio-website-development"
        overviewTitle="High-Impact Digital Showcase & Personal Brand Architecture"
        overviewContent={
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-2">Elevate Your Personal Brand with Custom Portfolio Website Development</h2>
              <p>
                A high-converting <strong>portfolio website</strong> is your most powerful personal asset for building authority, attracting high-ticket clients, and landing premium career opportunities. While generic <strong>portfolio website templates</strong> or no-code <strong>portfolio website maker</strong> tools often restrict layout customization and slow down page speed, our custom Next.js engineering gives you complete design control and 95+ Core Web Vitals performance.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-2">Tailored Portfolio Website for Web Developer Professionals & Engineers</h2>
              <p>
                Engineering a specialized <strong>portfolio website for web developer</strong> profiles requires more than static images. We build interactive technical showcases featuring live code preview embeds, dark/light mode toggles, micro-animations, and automated deployment integrations. Whether you prefer hosting your <strong>portfolio website github</strong> workflow on GitHub Pages or Vercel Edge, we ensure zero maintenance overhead.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-2">Creative Portfolio Website Design Inspired by Pinterest Trends & AI Tools</h2>
              <p>
                Our design team crafts bespoke <strong>portfolio website design</strong> layouts drawing visual inspiration from top <strong>portfolio website pinterest</strong> mood boards, Behance showcases, and modern UI trends. If you are comparing automated <strong>portfolio website ai</strong> builders against custom engineering, our bespoke builds guarantee 100% unique brand identity without rigid template footprints.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-2">Free Hosting Options & Enterprise Performance</h2>
              <p>
                Want to keep hosting expenses low? You can host your pre-rendered <strong>portfolio website free</strong> using modern cloud platforms like GitHub Pages, Vercel, or Netlify while retaining custom domain SSL and global CDN distribution.
              </p>
            </div>
          </div>
        }
        benefitsTitle="Why Choose Custom Portfolio Website Development?"
        benefitsSubtitle="Elevate your personal brand with interactive project displays and direct client inquiry triggers."
        benefits={[
          {
            icon: "fa-solid fa-[#7C3AED] fa-user-tie",
            title: "Executive Personal Branding",
            description: "Custom typography, sleek dark/light modes, and modern layouts reflecting high professional credibility.",
          },
          {
            icon: "fa-solid fa-images",
            title: "Interactive Project Galleries",
            description: "Filterable work showcases with lightbox popups, high-resolution media, and structured project specs.",
          },
          {
            icon: "fa-brands fa-whatsapp",
            title: "Direct Client Inquiry Triggers",
            description: "1-tap WhatsApp chat buttons, prefilled lead forms, and Calendly integration for instant discovery calls.",
          },
          {
            icon: "fa-solid fa-bolt",
            title: "Sub-Second Loading Speeds",
            description: "Optimized Next.js static builds ensure high-resolution project images load instantly on mobile networks.",
          },
        ]}
        processTitle="4-Step Portfolio Development Process"
        processSubtitle="From personal brand discovery to live portfolio launch."
        processSteps={[
          {
            step: "1",
            icon: "fa-solid fa-[#7C3AED] fa-comments",
            title: "Brand & Work Audit",
            description: "We review your key projects, target client profile, and brand positioning.",
          },
          {
            step: "2",
            icon: "fa-solid fa-palette",
            title: "UI/UX & Gallery Design",
            description: "We design high-impact project layouts, case study funnels, and resume sections.",
          },
          {
            step: "3",
            icon: "fa-solid fa-code",
            title: "Next.js & Mobile Build",
            description: "We code custom interactive galleries, dark mode options, and responsive navigation.",
          },
          {
            step: "4",
            icon: "fa-solid fa-rocket",
            title: "Launch & Domain Sync",
            description: "We deploy your custom domain live with SSL, analytics tracking, and SEO meta tags.",
          },
        ]}
        pricingTitle="Portfolio Website Development Packages"
        pricingSubtitle="Flat-rate proposals for individual professionals and creative agencies."
        pricingTiers={[
          {
            name: "Professional Portfolio",
            price: "₹18,000",
            period: "flat rate (~$220)",
            description: "Perfect for freelancers, consultants, and independent advisors showcasing key work.",
            features: [
              "Custom Personal Brand Layout",
              "Filterable Project Showcase Gallery",
              "About, Work, Experience & Contact Pages",
              "WhatsApp & Calendar Call Triggers",
              "Mobile-First Speed & Onsite SEO",
            ],
            ctaText: "Get Started",
          },
          {
            name: "Executive & Agency Portfolio",
            price: "₹38,000",
            period: "flat rate (~$480)",
            isPopular: true,
            description: "Bespoke multipage digital portal for agency founders, architects, and executive leaders.",
            features: [
              "Bespoke High-End UI/UX Design",
              "Interactive Case Study Deep Dives",
              "Client Testimonial Video & Review Hub",
              "Personal Brand Local & Global SEO",
              "100% IP Code & Asset Ownership",
            ],
            ctaText: "Request Executive Quote",
          },
        ]}
        faqs={seoData.pageMapping?.faq_schema || [
          {
            question: "What is the advantage of a custom portfolio website over a generic portfolio website maker or template?",
            answer: "While an automated portfolio website maker or basic portfolio website templates rely on standard layouts, custom portfolio website development delivers sub-second speeds, bespoke UI, zero recurring software fees, and 100% source code ownership."
          },
          {
            question: "How do you engineer a high-performing portfolio website for web developer candidates?",
            answer: "A portfolio website for web developer candidates features live project links, interactive code snippets, GitHub activity integrations, and sub-second Next.js page rendering."
          },
          {
            question: "Can I publish a portfolio website free using GitHub Pages?",
            answer: "Yes! We can configure your Next.js build to deploy a portfolio website github workflow, allowing you to host your static portfolio website free on GitHub Pages or Vercel with automated CI/CD."
          },
          {
            question: "Do you design portfolios inspired by modern trends like portfolio website pinterest boards or AI tools?",
            answer: "Yes! Our design process integrates aesthetic trends from portfolio website pinterest collections, Behance features, and modern portfolio website ai prototyping tools to craft unique, high-converting visual showcases."
          }
        ]}
        crossLinks={[
          { href: "/static-website-development", label: "Static Website Dev" },
          { href: "/landing-page-development", label: "Landing Page Dev" },
          { href: "/web-design-services", label: "Web Design Services" },
          { href: "/website-development", label: "Custom Web Dev" },
        ]}
      />
    </>
  );
}
