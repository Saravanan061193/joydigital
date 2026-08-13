import React from "react";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyWidgets from "@/components/ui/StickyWidgets";
import LeadForm from "@/components/ui/LeadForm";

interface PageProps {
  params: Promise<{ country: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return [
    { country: "us" },
    { country: "uk" },
    { country: "ae" },
    { country: "in" },
  ];
}

const REGIONAL_CONTACTS: Record<string, {
  title: string;
  description: string;
  phone: string;
  phoneFormatted: string;
  address: string;
  showMap: boolean;
  marketName: string;
}> = {
  us: {
    title: "US Client Support & Consultation Desk",
    description: "Get in touch with our global strategists. Request website performance reports, detailed Next.js code proposals, or commercial SEO consultation.",
    phone: "+16508990122",
    phoneFormatted: "+1 (650) 899-0122",
    address: "Global Client Relations, Delaware, USA",
    showMap: false,
    marketName: "United States",
  },
  uk: {
    title: "UK Business Consultation Desk",
    description: "Connect with our Next.js designers and search engine optimization team serving the UK. Receive localized quotes and technical recommendations.",
    phone: "+442079460192",
    phoneFormatted: "+44 20 7946 0192",
    address: "UK Client Coordination, London, United Kingdom",
    showMap: false,
    marketName: "United Kingdom",
  },
  ae: {
    title: "UAE & Dubai Digital Consultation Desk",
    description: "Schedule a consultation with our local business managers in Dubai. Get customized website development pricing and Google Map Pack rank strategies.",
    phone: "+97142345678",
    phoneFormatted: "+971 4 234 5678",
    address: "Gulf Regional Relations, Dubai, United Arab Emirates",
    showMap: false,
    marketName: "United Arab Emirates",
  },
  in: {
    title: "India Growth Agency & Headquarters",
    description: "Ready to scale your search presence and customer leads in India? Contact our core agency engineering team based in Tamil Nadu.",
    phone: "+919080026133",
    phoneFormatted: "+91 90800 26133",
    address: "Joy Digital Growth Agency, Old Perungalathur, Chennai 600063, Tamil Nadu, India",
    showMap: true,
    marketName: "India",
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { country } = await params;
  const countryLower = country.toLowerCase();
  const config = REGIONAL_CONTACTS[countryLower] || REGIONAL_CONTACTS.us;
  
  const countryNames: Record<string, string> = {
    us: "US",
    uk: "UK",
    ae: "UAE",
    in: "India",
  };
  const countryName = countryNames[countryLower] || "US";
  const title = `Contact Joy Digital ${countryName} | Custom Web & SEO Solutions`;

  return {
    title,
    description: `Request a free Next.js website design quote, Core Web Vitals audit, or organic search SEO proposal. Speak to our ${config.marketName} consultation desk.`,
    alternates: {
      canonical: `https://joydigital.in/${countryLower}/contact`,
    },
  };
}

export default async function CountryContactPage({ params }: PageProps) {
  const { country } = await params;
  const countryLower = country.toLowerCase();
  const config = REGIONAL_CONTACTS[countryLower] || REGIONAL_CONTACTS.us;

  return (
    <>
      <Header />
      <main className="pt-24 lg:pt-32">
        
        {/* Intro Section */}
        <section className="py-12 bg-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 text-center animate-fade-in">
            <span className="inline-block bg-accent-glow text-accent font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full border border-accent/20 mb-6">
              {config.marketName} Desk
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-primary-dark tracking-tight mb-4">
              Let&apos;s Grow Your <span className="text-gradient">Digital Pipeline</span>
            </h1>
            <p className="text-sm text-text-secondary max-w-xl mx-auto leading-relaxed">
              {config.description}
            </p>
          </div>
        </section>

        {/* Contact split section */}
        <section className="py-12 bg-light-bg">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Info Columns */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              <h2 className="text-2xl font-bold text-primary-dark relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-accent">
                Direct Contact Channels
              </h2>
              
              <div className="flex flex-col gap-4">
                {/* Location Card */}
                <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary-glow flex items-center justify-center text-primary text-xl flex-shrink-0">
                    <i className="fa-solid fa-map-location-dot" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-text-muted uppercase">Office Address</span>
                    <span className="text-sm font-bold text-primary-dark mt-0.5">
                      {config.address}
                    </span>
                  </div>
                </div>

                {/* Call Card */}
                <a
                  href={`tel:${config.phone}`}
                  className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm flex items-center justify-between group hover:border-accent/30 transition-all duration-300"
                  title="Call Us Directly"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary-glow flex items-center justify-center text-primary text-xl flex-shrink-0">
                      <i className="fa-solid fa-phone" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-text-muted uppercase">Call Support</span>
                      <span className="text-sm font-bold text-primary-dark mt-0.5 group-hover:text-accent transition-colors">
                        {config.phoneFormatted}
                      </span>
                    </div>
                  </div>
                  <span className="text-text-muted group-hover:translate-x-1 transition-transform">
                    <i className="fa-solid fa-arrow-right-long" />
                  </span>
                </a>

                {/* WhatsApp Card */}
                <a
                  href="https://wa.me/919080026133?text=Hello%20Joy%20Digital,%20I'd%20like%20to%20get%20more%20details%20about%20your%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm flex items-center justify-between group hover:border-whatsapp-green/30 transition-all duration-300"
                  title="WhatsApp Us"
                  data-wa-location="contact page"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-whatsapp-glow flex items-center justify-center text-whatsapp-green text-xl flex-shrink-0">
                      <i className="fa-brands fa-whatsapp" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-text-muted uppercase">WhatsApp Chat</span>
                      <span className="text-sm font-bold text-primary-dark mt-0.5 group-hover:text-whatsapp-green transition-colors">
                        +91 90800 26133
                      </span>
                    </div>
                  </div>
                  <span className="text-text-muted group-hover:translate-x-1 transition-transform">
                    <i className="fa-solid fa-arrow-right-long" />
                  </span>
                </a>

                {/* Email Card */}
                <a
                  href="mailto:saravanan061193@gmail.com"
                  className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm flex items-center justify-between group hover:border-accent/30 transition-all duration-300"
                  title="Email Us"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary-glow flex items-center justify-center text-primary text-xl flex-shrink-0">
                      <i className="fa-solid fa-envelope" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-text-muted uppercase">Send Email</span>
                      <span className="text-sm font-bold text-primary-dark mt-0.5 group-hover:text-accent transition-colors">
                        saravanan061193@gmail.com
                      </span>
                    </div>
                  </div>
                  <span className="text-text-muted group-hover:translate-x-1 transition-transform">
                    <i className="fa-solid fa-arrow-right-long" />
                  </span>
                </a>
              </div>

              {/* Map Embed Card (India headquarters only) */}
              {config.showMap && (
                <div className="w-full rounded-xl overflow-hidden shadow-sm border border-gray-100 mt-2">
                  <iframe
                    src="https://maps.google.com/maps?q=Old%20Perungalathur,%20Chennai,%20Tamil%20Nadu,%20India&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="230"
                    style={{ border: 0, filter: "grayscale(100%) invert(90%) contrast(90%)" }}
                    allowFullScreen
                    loading="lazy"
                    title="Joy Digital Growth Agency Location Map"
                  />
                </div>
              )}
            </div>

            {/* Right Form Column */}
            <div className="lg:col-span-7 flex justify-center lg:justify-end">
              <LeadForm
                layout="vertical"
                title="Send An Enquiry"
                subtitle="Fill in the fields below, and our business consulting experts will contact you within 24 hours."
                ctaText="Send Message"
                source={`Contact Page Form [Region: ${country.toUpperCase()}]`}
                showWebsiteField={true}
              />
            </div>

          </div>
        </section>

      </main>
      <Footer />
      <StickyWidgets />
    </>
  );
}
