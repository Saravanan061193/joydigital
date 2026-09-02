import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Custom Web Development Services | Joy Digital",
  description: "Joy Digital is a custom web development agency. We engineer fast, secure, mobile-responsive Next.js & React websites to drive organic leads.",
  alternates: {
    canonical: "https://joydigital.in/website-development",
    languages: {
      "x-default": "https://joydigital.in/website-development",
      "en-us": "https://joydigital.in/us/website-development",
      "en-gb": "https://joydigital.in/uk/website-development",
      "en-ae": "https://joydigital.in/ae/website-development",
      "en-in": "https://joydigital.in/in/website-development",
    },
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Custom Website Development Services",
  "serviceType": "Web Development",
  "provider": {
    "@type": "Organization",
    "name": "Joy Digital",
    "image": "https://joydigital.in/assets/images/logo.webp",
    "telephone": "+919080026133"
  },
  "description": "Joy Digital is a leading web development agency designing high-converting, mobile-responsive, secure websites built for speed and search indexing.",
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "INR",
    "lowPrice": "15000",
    "highPrice": "95000",
    "offerCount": "3"
  }
};

export default function WebDevPage() {
  return (
    <ServicePageTemplate
      serviceName="Website Development"
      heroTitle="Custom Website Development That Helps Your Business Grow"
      heroSubtitle="Business Websites Starting from ₹15,000. Build a custom, high-speed website designed to rank on search engines, load under 1.5s, and turn visitors into qualified leads."
      leadSource="Website Development Landing Page"
      heroCtaText="Get My Website Quote"
      overviewTitle="Engineered for Conversions, PageRank & Modern Web Performance"
      overviewContent={
        <div className="space-y-6">
          <p>
            In today&apos;s highly competitive digital landscape, your website serves as the operational engine of your entire company. As a <strong>best website company in india</strong>, Joy Digital provides full-stack web engineering, custom web applications, and specialized <strong>cms website development services</strong> designed to scale organic traffic and customer leads.
          </p>
          <p>
            If you are exploring the <strong>cms website meaning</strong>, a Content Management System allows non-technical editors to update content seamlessly. However, using generic, bloated <strong>cms website templates</strong> can severely impair your Core Web Vitals. We engineer modern, decoupled <strong>cms website systems</strong> using Next.js and React, giving you seamless content controls with sub-second page loads.
          </p>
          <h3 className="text-lg font-bold text-primary-dark mt-8 mb-4">Why Code Quality and Architecture Impact Search Rankings</h3>
          <p>
            Google uses page experience and Core Web Vitals as crucial ranking factors. If your site takes longer than 3 seconds to render, visitors will leave before they even view your offer. Slow rendering directly increases bounce rates, signaling to search crawlers that your page does not provide a good user experience. By developing sites with clean semantic markup, compressed WebP/AVIF graphics, server-side pre-rendering, and optimized bundle chunks, we build a solid foundation that helps your business stand out from competitors globally.
          </p>
          <p>
            Whether you need a simple corporate landing page, an e-commerce platform with payment integrations (like Razorpay or Stripe), or a custom SaaS admin panel, we align our development milestones with your marketing objectives. Every line of code we write is structured to build long-term brand equity, improve search engine visibility, and generate recurring client inquiries organically.
          </p>
          <h3 className="text-lg font-bold text-primary-dark mt-8 mb-4">Looking for a Skilled Web Developer Near Me?</h3>
          <p>
            If you are actively searching for a top-rated <strong>web developer near me</strong> or a dedicated <strong>website developer near me</strong>, Joy Digital provides complete web development solutions tailored to your market. Whether you need a local service site, a multi-regional enterprise application, or a high-converting landing page, our full-stack engineering team builds custom websites that load instantly and capture high-intent customer leads.
          </p>
          <h3 className="text-lg font-bold text-primary-dark mt-8 mb-4">Next.js and React: The Future of Business Websites</h3>
          <p>
            Many businesses rely on legacy platforms that suffer from security vulnerabilities and slow response times. By choosing a custom React or Next.js static site setup, you eliminate the risk of database hacks and ensure your platform remains online 100% of the time. Our setups are hosted on global Content Delivery Networks (CDNs), meaning your website loads instantly for users anywhere globally.
          </p>
        </div>
      }
      benefitsTitle="Why Modern Businesses Partner with Joy Digital"
      benefitsSubtitle="We don't just build sites; we construct high-converting lead pipelines that combine beautiful visuals with fast-loading frameworks."
      benefits={[
        {
          icon: "fa-solid fa-palette",
          title: "Custom UX Design (No Templates)",
          description: "We design tailored interfaces specifically for your brand identity and audience, avoiding generic and bloated templates.",
        },
        {
          icon: "fa-solid fa-bolt",
          title: "Fast Performance (Under 1.5s)",
          description: "Engineered using clean Next.js/React code structure to load under 1.5 seconds, satisfying Core Web Vitals.",
        },
        {
          icon: "fa-solid fa-funnel-dollar",
          title: "Conversion-Focused Structure",
          description: "Layouts organized strategically to capture attention, build brand trust, and guide visitors towards inquiry.",
        },
        {
          icon: "fa-solid fa-mobile-screen",
          title: "Mobile-Responsive Layout",
          description: "A seamless viewport adaptation that works perfectly on smartphones, tablets, and desktops alike.",
        },
        {
          icon: "fa-brands fa-whatsapp",
          title: "WhatsApp Lead Integration",
          description: "Contextual, pre-filled WhatsApp click-to-chat features that make contacting you instant and simple.",
        },
        {
          icon: "fa-solid fa-gears",
          title: "Admin Panel / CMS Option",
          description: "Clean content management systems allowing you to update your blog, change services, and manage leads.",
        },
        {
          icon: "fa-solid fa-magnifying-glass",
          title: "GSC & Sitemap Integration",
          description: "Full configuration of Google Search Console, tracking scripts, and auto-updating sitemaps for SEO indexing.",
        },
        {
          icon: "fa-solid fa-shield-halved",
          title: "Standard Security & SSL",
          description: "Fully configured HTTPS/SSL certificates, vulnerability scanning, and secure API form handshakes.",
        },
        {
          icon: "fa-solid fa-server",
          title: "1-Year Hosting Setup Support",
          description: "We set up, configure, and monitor your cloud hosting (e.g. Vercel or CDN servers) free for 1 year.",
        },
      ]}
      processTitle="Our Growth-Focused Development Workflow"
      processSubtitle="We leverage a systematic 4-step workflow to plan, build, test, and deploy your custom web project successfully."
      processSteps={[
        {
          step: "1",
          icon: "fa-solid fa-comments",
          title: "Discovery & Planning",
          description: "We align on your brand identity, service catalog, target keywords, user journeys, and conversion objectives before writing a single line of code.",
        },
        {
          step: "2",
          icon: "fa-solid fa-bezier-curve",
          title: "Visual Design & Prototyping",
          description: "Our UI/UX designers create custom layout mockups showcasing typography, color schemes, and visual hierarchies in Figma for your review and approval.",
        },
        {
          step: "3",
          icon: "fa-solid fa-code",
          title: "Development & Coding",
          description: "We build responsive interfaces using clean code, semantic structures, metadata variables, schema integrations, and interactive React states for optimal speed.",
        },
        {
          step: "4",
          icon: "fa-solid fa-rocket",
          title: "QA & Global Deployment",
          description: "We run browser compatibility tests, check speed performance scores, verify sitemaps, and deploy your site on global CDNs for maximum performance.",
        },
      ]}
      pricingTitle="Economical Web Development Tiers"
      pricingSubtitle="Select a package designed to scale your business profile. Zero hidden costs, transparent milestones."
      pricingTiers={[
        {
          name: "Starter Website",
          price: "₹15,000",
          description: "Perfect for new local service businesses wanting to establish professional authority online.",
          features: [
            "Custom responsive website",
            "Mobile optimization",
            "WhatsApp integration",
            "Lead Contact form",
            "Basic SEO setup",
            "Google Search Console sync",
            "XML Sitemap generated",
            "Google Analytics integration",
          ],
          ctaText: "Get Started",
        },
        {
          name: "Business Growth Website",
          price: "₹35,000",
          description: "Recommended for growing companies targeting local search rankings and active online client acquisition.",
          isPopular: true,
          features: [
            "Custom website layout",
            "Conversion-focused UI/UX",
            "SEO-ready architecture",
            "Advanced contact forms",
            "WhatsApp leads sync",
            "Search Console configuration",
            "Google Analytics event tracking",
            "Core Web Vitals speed tuning",
            "Basic content copywriting check",
            "Admin panel / CMS option",
          ],
          ctaText: "Request a Quote",
        },
        {
          name: "Website + SEO Growth",
          price: "Custom Quote",
          description: "Perfect for companies seeking persistent ranking growth, organic pipelines, and local lead dominance.",
          features: [
            "Custom website layout",
            "Technical SEO code audits",
            "Advanced On-page SEO setup",
            "High-intent keyword research",
            "Local SEO & maps optimizations",
            "Google Business Profile setups",
            "Comprehensive content strategy",
            "Monthly SEO retainer campaigns",
            "Index monitoring & audit fixes",
            "Google Search Console reporting",
          ],
          ctaText: "Talk to an SEO Expert",
        },
      ]}
      faqs={[
        {
          question: "How long does custom website development take?",
          answer: "A standard Startup or Business site typically takes 5 to 12 working days from copy approval to deployment. More complex e-commerce portals or custom database apps can take 3 to 6 weeks depending on requirements. We maintain strict milestones to deliver on time.",
        },
        {
          question: "Will my website look good on smartphones and tablets?",
          answer: "Yes, every layout we build is fully responsive. We design with a mobile-first philosophy, ensuring elements adapt to various screen sizes, font scales, and mobile connections. This is critical for mobile SEO rankings in India.",
        },
        {
          question: "Do you build websites using WordPress or custom code?",
          answer: "We offer both. For maximum security, under 1s speeds, and SEO rankings, we recommend next-generation custom frameworks like Next.js and Tailwind CSS. For businesses that want a simple admin dashboard with lower budgets, we construct highly optimized WordPress layouts.",
        },
        {
          question: "Can you help me set up a custom business email address?",
          answer: "Yes, we help set up professional business emails (e.g., info@yourdomain.com) using Google Workspace, Microsoft 365, or secure cPanel mail setups. We ensure correct MX and SPF configurations for reliable email delivery.",
        },
        {
          question: "Do you offer support after the website goes live?",
          answer: "Yes, we provide 30 days of free technical support after launch. We also offer yearly maintenance packages that cover minor edits, database backups, security patches, and server management to keep your site updated.",
        },
      ]}
      schemaMarkup={pageSchema}
      crossLinks={[
        { href: "/web-design-services", label: "Web Design" },
        { href: "/seo-services", label: "SEO Services" },
        { href: "/local-seo-services", label: "Local SEO" },
      ]}
    />
  );
}
