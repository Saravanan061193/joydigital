import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";
import { generatePageSeo } from "@/lib/seoEngine";

export async function generateMetadata(): Promise<Metadata> {
  const seoData = await generatePageSeo(
    "/portfolio-website-development",
    "Portfolio Website Development Services for Professionals & Creatives | Joy Digital",
    "Build high-impact, custom portfolio websites for consultants, executives, agency owners, architects, and freelancers. Showcase your work, land high-paying clients, and build your digital brand."
  );
  return seoData.metadata;
}

export default async function PortfolioWebDevPage() {
  const seoData = await generatePageSeo(
    "/portfolio-website-development",
    "Portfolio Website Development Services for Professionals & Creatives | Joy Digital",
    "Build high-impact, custom portfolio websites for consultants, executives, agency owners, architects, and freelancers. Showcase your work, land high-paying clients, and build your digital brand."
  );

  return (
    <>
      <ServicePageTemplate
        serviceName="Portfolio Website Development"
        heroTitle={seoData.pageMapping?.h1 || "Portfolio Website Development Services to Showcase Your Work & Brand"}
        heroSubtitle="Build stunning, modern portfolio websites tailored for consultants, executives, freelancers, agency owners, and creative professionals. Stand out from competitors and convert visitors into high-paying clients."
        leadSource="Portfolio Website Development Page"
        heroCtaText="Request a Portfolio Web Quote"
        canonicalUrl="https://joydigital.in/portfolio-website-development"
        overviewTitle="High-Impact Digital Showcase & Personal Brand Architecture"
        overviewContent={
          <div className="space-y-6">
            <p>
              Your portfolio is often the single most critical asset in establishing authority, attracting premium clients, and closing high-value deals. A generic social profile or basic resume PDF doesn&apos;t convey the depth of your achievements. Custom <strong>portfolio website development</strong> gives you a dedicated 24/7 digital showcase designed around your personal brand.
            </p>
            <p>
              At Joy Digital, we build bespoke <strong>portfolio website templates</strong> and custom Next.js showcases featuring interactive project galleries, case study deep dives, client testimonials, and 1-tap booking triggers. Whether you are an independent consultant, executive leader, architect, designer, or agency founder, we craft websites engineered for prestige and conversion.
            </p>
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
            icon: "fa-solid fa-[#7C3AED] fa-[#7C3AED] fa-comments",
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
            question: "Why do I need a custom portfolio website?",
            answer: "A custom portfolio website establishes strong personal brand authority, showcases your work professionally, and generates high-intent client inquiries."
          },
          {
            question: "Can I update my projects on the portfolio site easily?",
            answer: "Yes! We can configure simple admin controls or markdown files so you can add new projects, images, and achievements anytime."
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
