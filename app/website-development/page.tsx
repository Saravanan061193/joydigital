import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Top Website Development Agency & Company in India | Joy Digital",
  description: "Joy Digital is a top website development agency and premier website development company in India. We engineer fast, mobile-responsive Next.js & React websites built to rank.",
  keywords: [
    "top website development agency",
    "top website development company",
    "website development company",
    "website development services",
    "website development company in india",
    "what is website design and development",
    "how to find clients for website development",
    "which ai is best for website development",
    "how to get clients for website development",
    "what is the cost of website development in india",
    "how to get foreign clients for website development",
    "why website development is important",
    "which language is best for website development",
    "how to get leads for website development",
    "which is the best ai for website development"
  ],
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
  "name": "Top Website Development Agency & Company in India",
  "serviceType": "Website Development Services",
  "provider": {
    "@type": "Organization",
    "name": "Joy Digital",
    "image": "https://joydigital.in/assets/images/logo.webp",
    "telephone": "+919080026133"
  },
  "description": "Joy Digital is a top website development agency and website development company in India delivering full-stack website development services, Next.js engineering, and organic SEO architecture.",
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
      heroTitle="Top Website Development Agency & Company in India"
      heroSubtitle="Professional Website Development Services Starting from ₹15,000. Partner with a top website development agency to build a custom, high-speed website engineered to rank on Google."
      leadSource="Website Development Landing Page"
      heroCtaText="Get My Website Quote"
      overviewTitle="Professional Services from a Top Website Development Agency"
      overviewContent={
        <div className="space-y-6">
          <p>
            In today&apos;s digital economy, partnering with a <strong>top website development agency</strong> or leading <strong>top website development company</strong> is essential to scale your online presence. As a trusted <strong>website development company in india</strong>, Joy Digital provides end-to-end <strong>website development services</strong>, custom React/Next.js web engineering, and technical search engine optimization designed to generate recurring client inquiries.
          </p>
          <h3 className="text-lg font-bold text-primary-dark mt-8 mb-4">What is Website Design and Development?</h3>
          <p>
            If you are asking <strong>what is website design and development</strong>, website design handles the artistic, visual, and user experience (UI/UX) layout of your site, while website development covers the underlying front-end and back-end code engineering (HTML, CSS, JavaScript, Next.js) that makes the website responsive, interactive, and fast.
          </p>
          <h3 className="text-lg font-bold text-primary-dark mt-8 mb-4">Why Website Development is Important for Business Growth</h3>
          <p>
            Understanding <strong>why website development is important</strong> comes down to revenue and trust. Your website serves as your 24/7 digital storefront. Without a fast, modern, mobile-friendly platform, potential clients will choose your competitors. High-quality web development improves Google search indexing, satisfies Core Web Vitals, reduces bounce rates, and turns passive traffic into paying customers.
          </p>
          <h3 className="text-lg font-bold text-primary-dark mt-8 mb-4">What is the Cost of Website Development in India?</h3>
          <p>
            When evaluating <strong>what is the cost of website development in india</strong>, basic starter sites generally cost between ₹15,000 and ₹35,000. Advanced business portals with headless CMS options cost ₹35,000 to ₹75,000, while enterprise custom SaaS or e-commerce platforms range higher based on feature complexity. Joy Digital offers transparent flat-rate pricing starting at ₹15,000 with no hidden maintenance fees.
          </p>
          <h3 className="text-lg font-bold text-primary-dark mt-8 mb-4">Which Language and AI Tools are Best for Website Development?</h3>
          <p>
            Clients frequently ask <strong>which language is best for website development</strong>. JavaScript and TypeScript paired with Next.js/React are currently the best choices due to server-side rendering, SEO efficiency, and blazing speed. Meanwhile, when considering <strong>which ai is best for website development</strong> (or <strong>which is the best ai for website development</strong>), tools like ChatGPT (GPT-4o), Claude 3.5 Sonnet, Cursor AI, and v0.dev lead the industry in speeding up clean component generation and code optimization.
          </p>
          <h3 className="text-lg font-bold text-primary-dark mt-8 mb-4">How to Find Clients and Leads for Website Development</h3>
          <p>
            For freelancers and growth teams wondering <strong>how to find clients for website development</strong>, <strong>how to get clients for website development</strong>, <strong>how to get foreign clients for website development</strong>, or <strong>how to get leads for website development</strong>: building targeted SEO landing pages, leveraging direct LinkedIn B2B outreach, setting up Upwork agency profiles, and forming white-label partnerships with agencies in the US, UK, and UAE are proven growth avenues.
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
      pricingTitle="Economical Website Development Tiers"
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
          question: "What is website design and development?",
          answer: "Website design encompasses visual aesthetics, color palettes, UI layout, and user experience. Website development is the technical engineering phase using code (HTML/CSS, JS, Next.js, React) to turn designs into high-speed, dynamic, and secure web applications.",
        },
        {
          question: "Why website development is important for business growth?",
          answer: "Website development is important because your website is your central digital sales hub. A custom-developed website builds immediate brand authority, ranks for search queries on Google, operates 24/7, and generates consistent customer inquiries.",
        },
        {
          question: "What is the cost of website development in India?",
          answer: "The cost of website development in India with Joy Digital starts at ₹15,000 for standard business sites. Custom multi-page growth sites average ₹35,000, while complex enterprise platforms or e-commerce stores are quoted dynamically.",
        },
        {
          question: "Which language is best for website development?",
          answer: "JavaScript/TypeScript coupled with Next.js and React is considered the best language combination for modern web development. It delivers fast page rendering, server-side pre-rendering for SEO, and scalable component architecture.",
        },
        {
          question: "Which AI is best for website development?",
          answer: "The best AI tools for website development in 2026 include ChatGPT (GPT-4o) for logic and copy, Claude 3.5 Sonnet for complex code refactoring, Cursor AI for IDE auto-complete, and v0.dev for rapid UI component generation.",
        },
        {
          question: "How to get clients for website development and get foreign leads?",
          answer: "To get clients for website development and secure foreign projects from US, UK, or UAE businesses: combine technical SEO landing pages, LinkedIn B2B networking, active Upwork/Fiverr presence, and white-label agency partnerships.",
        },
        {
          question: "Why choose Joy Digital as your website development company in India?",
          answer: "Joy Digital is a top-rated website development company in India. We build bespoke Next.js websites that load in under 1.5s, achieve 90+ Core Web Vitals scores, and include full Google Search Console indexing configuration.",
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
