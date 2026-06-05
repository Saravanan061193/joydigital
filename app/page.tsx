import React from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyWidgets from "@/components/ui/StickyWidgets";
import LeadForm from "@/components/ui/LeadForm";
import Accordion from "@/components/ui/Accordion";
import CTABanner from "@/components/CTABanner";

const HOME_SERVICES = [
  {
    icon: "fa-solid fa-laptop-code",
    title: "Website Design & Dev",
    description: "High-performance, secure, fast-loading, and mobile-responsive business sites. Target top rankings and conversion rates.",
    href: "/website-development",
  },
  {
    icon: "fa-solid fa-map-location-dot",
    title: "Google Business Profile",
    description: "Appear in Google Maps search pack. Professional profile setups, review collection shortcuts, and maps optimization.",
    href: "/google-business-profile-setup",
  },
  {
    icon: "fa-solid fa-magnifying-glass-location",
    title: "Local SEO Services",
    description: "Improve search rankings locally. Optimize keyword positions for your target city to reach nearby customers.",
    href: "/local-seo-services",
  },
  {
    icon: "fa-solid fa-share-nodes",
    title: "Social Media Marketing",
    description: "Engage your audience, build brand visibility, and manage campaigns on Instagram and Facebook.",
    href: "/social-media-marketing",
  },
  {
    icon: "fa-solid fa-pen-nib",
    title: "Logo & Brand Design",
    description: "Create memorable corporate logos and brand style boards. Professional design packages for startups.",
    href: "/logo-design-services",
  },
  {
    icon: "fa-solid fa-magnifying-glass",
    title: "Organic SEO Services",
    description: "Target organic search queries nationally or globally. Build backlink portfolios and clean technical code structures.",
    href: "/seo-services",
  },
];

const WHY_CHOOSE_ITEMS = [
  {
    icon: "fa-solid fa-tags",
    title: "Affordable Pricing",
    description: "Budget-friendly pricing structures for startups and small-to-medium businesses. Premium development without high agency costs.",
  },
  {
    icon: "fa-solid fa-bolt",
    title: "Fast Delivery Timelines",
    description: "We organize development milestones to deliver custom web drafts and launch layouts ahead of schedule.",
  },
  {
    icon: "fa-solid fa-location-dot",
    title: "Local Market Expertise",
    description: "We understand localized keywords, maps optimization factors, and search intents to help rank your profile.",
  },
  {
    icon: "fa-solid fa-search",
    title: "SEO-Friendly Structures",
    description: "We build websites using clean code structures, metadata configurations, and JSON-LD schemas to support indexing.",
  },
  {
    icon: "fa-solid fa-headset",
    title: "Dedicated Support Lines",
    description: "Enjoy direct communication with project coordinators. We monitor platforms to keep your assets secure.",
  },
  {
    icon: "fa-solid fa-chart-line",
    title: "Growth-Focused Designs",
    description: "Every layout we build balances clean graphics with strategic CTAs to convert simple traffic into client leads.",
  },
];

const HOME_FAQS = [
  {
    question: "What is the cost of website design and development?",
    answer: "Costs vary based on page counts and features. Joy Digital Growth Agency offers budget-friendly pricing starting from basic startup plans up to custom e-commerce and database applications tailored to your budget.",
  },
  {
    question: "How long does website development take?",
    answer: "A standard professional business website typically takes 5 to 10 working days. More complex custom applications or e-commerce web portals take 3 to 6 weeks depending on requirements.",
  },
  {
    question: "What is Local SEO and how does it help?",
    answer: "Local SEO focuses on optimizing your search presence to rank higher in local Google Maps pack listings and regional search queries. This involves citation building, review setups, and optimizing locations.",
  },
  {
    question: "How does Google Business Profile help local businesses?",
    answer: "Google Business Profile optimization helps your company rank in the top Google Maps local pack results, increasing store visibility, mobile call clicks, and customer directions requests.",
  },
  {
    question: "Do you provide technical support after the website launch?",
    answer: "Yes, Joy Digital Growth Agency provides support, monthly backups, framework updates, and server maintenance to help keep your platform secure.",
  },
];

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        
        {/* Hero Section */}
        <section className="relative pt-32 lg:pt-40 pb-20 overflow-hidden bg-white">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Text */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 px-4 py-1.5 rounded-full mb-6">
                <span className="w-2 h-2 bg-accent rounded-full animate-ping" />
                <span className="text-xs font-bold text-accent-dark uppercase tracking-wider">
                  Result-Driven Digital Agency
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary-dark tracking-tight mb-6 leading-tight">
                High-Performance Web Design & <span className="text-gradient">Digital Marketing Agency</span>
              </h1>
              <p className="text-sm md:text-base text-text-secondary mb-8 max-w-xl leading-relaxed">
                We help startups and growing companies acquire customers with fast-loading responsive websites, local SEO search optimizations, custom brand logo identities, and digital marketing support.
              </p>
              <div className="flex flex-wrap items-center gap-4 w-full">
                <Link
                  href="/contact"
                  className="bg-gradient-to-r from-accent to-accent-light text-white font-bold text-sm px-8 py-3.5 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                >
                  Request Free Consultation
                </Link>
                <a
                  href="https://wa.me/919080026133"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-light-bg hover:bg-gray-200 text-primary-dark font-bold text-sm px-8 py-3.5 rounded-lg transition-all flex items-center gap-2 border border-gray-200"
                >
                  <span className="text-whatsapp-green"><i className="fa-brands fa-whatsapp text-lg" /></span>
                  WhatsApp Chat
                </a>
              </div>
            </div>

            {/* Hero Form */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <LeadForm
                layout="vertical"
                title="Get Free Website Audit"
                subtitle="Fill in the fields below, and our search optimization experts will contact you with a performance report."
                ctaText="Claim Free Audit"
                source="Homepage Hero Audit Form"
                showWebsiteField={true}
              />
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-light-bg">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-3">
                Core Capabilities
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-primary-dark mb-4">
                Conversion-Focused <span className="text-gradient">Digital Solutions</span>
              </h2>
              <p className="text-sm text-text-secondary">
                We provide visual design and code setups to help your company rank on search results and grow customer inquiries.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {HOME_SERVICES.map((service, index) => (
                <article
                  key={index}
                  className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent-dark text-xl mb-6">
                      <i className={service.icon} />
                    </div>
                    <h3 className="text-lg font-bold text-primary-dark mb-3">
                      {service.title}
                    </h3>
                    <p className="text-xs text-text-secondary leading-relaxed mb-6">
                      {service.description}
                    </p>
                  </div>
                  <Link
                    href={service.href}
                    className="text-xs font-bold text-primary hover:text-accent flex items-center gap-1.5 mt-2"
                  >
                    Learn More <i className="fa-solid fa-chevron-right text-[9px]" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-3">
                Why Us
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-primary-dark mb-4">
                Built to Scale <span className="text-gradient">Your Visual Authority</span>
              </h2>
              <p className="text-sm text-text-secondary">
                We combine search optimization strategies with responsive layout code to deliver visible traffic and ranking improvements.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {WHY_CHOOSE_ITEMS.map((item, index) => (
                <div key={index} className="flex gap-4 items-start bg-light-bg/50 p-6 rounded-2xl border border-gray-100/50">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent-dark text-base flex-shrink-0">
                    <i className={item.icon} />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-base font-bold text-primary-dark mb-2">{item.title}</h3>
                    <p className="text-xs text-text-secondary leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Local Map showcase banner */}
        <section className="py-20 bg-light-bg">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="flex flex-col items-start justify-center text-left">
              <span className="text-xs font-bold text-accent uppercase tracking-widest mb-3">Maps Placements</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-primary-dark mb-6">
                Google Business Profile Optimization
              </h2>
              <p className="text-sm text-text-secondary leading-relaxed mb-6">
                Appearing in Google Maps pack listings for location-specific keywords is key for local search rankings. If your business location does not appear in the top spots, nearby customers may choose competitors. We configure categories, write profile descriptions, and clean up directory citations to help support your visibility.
              </p>
              <Link
                href="/google-business-profile-setup"
                className="bg-primary hover:bg-primary-light text-white font-bold text-xs px-6 py-3 rounded-lg transition-all"
              >
                Maps Optimization Details
              </Link>
            </div>

            {/* Right graphic mockup */}
            <div className="flex justify-center relative min-h-[300px] w-full items-center">
              <div className="absolute w-64 h-64 bg-accent/10 rounded-full blur-2xl animate-pulse-ring" />
              <div className="bg-white border border-gray-100 p-8 rounded-2xl shadow-lg relative z-10 w-full max-w-sm text-center">
                <div className="text-accent text-5xl mb-4 leading-none"><i className="fa-solid fa-map-location-dot" /></div>
                <h4 className="text-base font-bold text-primary-dark mb-2">Maps Ranking Strategy</h4>
                <p className="text-xs text-text-secondary mb-4 leading-relaxed">Geotagged image uploads, review shortcuts, primary category alignments, and citation consistency building.</p>
                <div className="flex justify-center gap-1.5 text-yellow-500 text-xs">
                  <i className="fa-solid fa-star" />
                  <i className="fa-solid fa-star" />
                  <i className="fa-solid fa-star" />
                  <i className="fa-solid fa-star" />
                  <i className="fa-solid fa-star" />
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Global CTA */}
        <CTABanner
          title="Accelerate Your Digital Marketing Performance Today"
          description="Schedule a 15-minute consulting phone call with our search specialists to identify code updates and search optimization goals for your website."
          primaryCtaText="Schedule Call Now"
          source="Homepage Bottom CTABanner"
        />

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-3">
                Support
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-primary-dark mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-sm text-text-secondary">
                Find answers about project timelines, design deliverables, or ranking processes.
              </p>
            </div>

            <Accordion items={HOME_FAQS} />
          </div>
        </section>

      </main>
      <Footer />
      <StickyWidgets />
    </>
  );
}
