import React from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyWidgets from "@/components/ui/StickyWidgets";
import LeadForm from "@/components/ui/LeadForm";
import Accordion from "@/components/ui/Accordion";
import CTABanner from "@/components/CTABanner";

interface Benefit {
  icon: string;
  title: string;
  description: string;
}

interface ProcessStep {
  step: string;
  title: string;
  description: string;
  icon: string;
}

interface PricingTier {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  ctaText?: string;
  isPopular?: boolean;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface ServicePageTemplateProps {
  serviceName: string;
  heroTitle: string;
  heroSubtitle: string;
  leadSource: string;
  overviewTitle: string;
  overviewContent: React.ReactNode;
  benefitsTitle: string;
  benefitsSubtitle: string;
  benefits: Benefit[];
  processTitle: string;
  processSubtitle: string;
  processSteps: ProcessStep[];
  pricingTitle: string;
  pricingSubtitle: string;
  pricingTiers: PricingTier[];
  faqs: FAQItem[];
  schemaMarkup: Record<string, any>;
  crossLinks: { href: string; label: string }[];
}

export default function ServicePageTemplate({
  serviceName,
  heroTitle,
  heroSubtitle,
  leadSource,
  overviewTitle,
  overviewContent,
  benefitsTitle,
  benefitsSubtitle,
  benefits,
  processTitle,
  processSubtitle,
  processSteps,
  pricingTitle,
  pricingSubtitle,
  pricingTiers,
  faqs,
  schemaMarkup,
  crossLinks,
}: ServicePageTemplateProps) {
  return (
    <>
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      <Header />
      <main className="pt-24 lg:pt-32">
        {/* Hero Section */}
        <section className="relative py-16 lg:py-24 overflow-hidden bg-white">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Text */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 px-4 py-1.5 rounded-full mb-6">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                <span className="text-xs font-bold text-accent-dark uppercase tracking-wider">
                  Premium Growth Service
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-primary-dark tracking-tight mb-6 leading-tight">
                {heroTitle}
              </h1>
              <p className="text-sm md:text-base text-text-secondary mb-8 max-w-xl leading-relaxed">
                {heroSubtitle}
              </p>
              
              {/* Trust markers */}
              <div className="flex items-center gap-6 mt-2 pb-6 border-b border-gray-100 w-full max-w-lg">
                <div className="flex flex-col">
                  <span className="text-xl font-extrabold text-primary-dark">100%</span>
                  <span className="text-[10px] font-semibold text-text-muted uppercase">Clean Code</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-extrabold text-primary-dark">Top #1</span>
                  <span className="text-[10px] font-semibold text-text-muted uppercase">SEO Target</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-extrabold text-primary-dark">24/7</span>
                  <span className="text-[10px] font-semibold text-text-muted uppercase">Direct Support</span>
                </div>
              </div>

              {/* Cross Links / Internal Linking */}
              {crossLinks && crossLinks.length > 0 && (
                <div className="flex flex-wrap items-center gap-3 mt-6">
                  <span className="text-xs font-bold text-primary-dark">Related:</span>
                  {crossLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-xs font-medium text-text-secondary hover:text-accent border border-gray-200 px-3 py-1 rounded-full transition-all duration-200 bg-white shadow-sm"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Hero Form */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <LeadForm
                layout="vertical"
                title="Claim Free Consultation"
                subtitle="Fill in the fields below, and our local experts will reach out to you."
                ctaText="Get Free Quote"
                source={leadSource}
              />
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="py-16 lg:py-24 bg-light-bg">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-extrabold text-primary-dark text-center mb-8">
              {overviewTitle}
            </h2>
            <div className="prose prose-blue max-w-none text-sm md:text-base text-text-secondary leading-relaxed space-y-6">
              {overviewContent}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-3">
                Key Benefits
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-primary-dark mb-4">
                {benefitsTitle}
              </h2>
              <p className="text-sm text-text-secondary">
                {benefitsSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent-dark text-xl mb-6">
                    <i className={benefit.icon} />
                  </div>
                  <h3 className="text-lg font-bold text-primary-dark mb-3">{benefit.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 lg:py-24 bg-light-bg">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-3">
                How We Deliver
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-primary-dark mb-4">
                {processTitle}
              </h2>
              <p className="text-sm text-text-secondary">
                {processSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((stepItem, index) => (
                <div key={index} className="flex flex-col items-center text-center group">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 rounded-full bg-white border border-accent/20 flex items-center justify-center text-accent text-2xl shadow-sm group-hover:bg-accent group-hover:text-white transition-all duration-300 z-10 relative">
                      <i className={stepItem.icon} />
                    </div>
                    <span className="absolute -top-2 -right-2 w-7 h-7 bg-primary text-white text-xs font-extrabold rounded-full flex items-center justify-center shadow-sm">
                      {stepItem.step}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-primary-dark mb-3">
                    {stepItem.title}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {stepItem.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-3">
                Service Pricing
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-primary-dark mb-4">
                {pricingTitle}
              </h2>
              <p className="text-sm text-text-secondary">
                {pricingSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
              {pricingTiers.map((tier, index) => (
                <div
                  key={index}
                  className={`bg-white border rounded-2xl p-8 shadow-sm flex flex-col relative transition-all duration-300 ${
                    tier.isPopular
                      ? "border-accent ring-2 ring-accent/10 -translate-y-2 lg:-translate-y-3"
                      : "border-gray-100 hover:-translate-y-1"
                  }`}
                >
                  {tier.isPopular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white font-bold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  )}
                  <h3 className="text-lg font-bold text-primary-dark mb-2">{tier.name}</h3>
                  <p className="text-xs text-text-secondary mb-6">{tier.description}</p>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-3xl font-extrabold text-primary-dark">{tier.price}</span>
                    {tier.period && <span className="text-xs text-text-secondary">{tier.period}</span>}
                  </div>
                  
                  {/* Features List */}
                  <ul className="flex flex-col gap-3.5 mb-8 text-xs text-text-primary flex-grow border-t border-gray-100 pt-6">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="text-success-green text-sm mt-0.5"><i className="fa-solid fa-circle-check" /></span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/contact?service=${encodeURIComponent(serviceName)}&tier=${encodeURIComponent(tier.name)}`}
                    className={`w-full text-center font-bold text-xs py-3 rounded-lg transition-all duration-300 ${
                      tier.isPopular
                        ? "bg-accent hover:bg-accent-dark text-white shadow-md hover:shadow-lg"
                        : "bg-light-bg hover:bg-gray-200 text-primary"
                    }`}
                  >
                    {tier.ctaText || "Get Quote"}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dynamic CTA Banner */}
        <CTABanner
          title={`Take Your ${serviceName} Performance to the Next Level`}
          description={`Get a detailed ${serviceName} roadmap customized to your target keyword goals. No commitments, just pure value.`}
          primaryCtaText="Get My Free Audit Report"
          source={`${serviceName} CTABanner`}
        />

        {/* FAQ Section */}
        <section className="py-16 lg:py-24 bg-light-bg">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-3">
                Common Inquiries
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-primary-dark mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-sm text-text-secondary">
                Have questions about our project timelines, design deliverables, or ranking processes? Find answers below.
              </p>
            </div>

            <Accordion items={faqs} />
          </div>
        </section>
      </main>
      <Footer />
      <StickyWidgets />
    </>
  );
}
