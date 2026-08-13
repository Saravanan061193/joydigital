import React from "react";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyWidgets from "@/components/ui/StickyWidgets";

export const metadata: Metadata = {
  title: "Cookie Policy & Data Tracking Terms | Joy Digital",
  description: "Read the Cookie Policy for Joy Digital to understand how we use cookies to improve your user experience.",
};

export default function CookiePolicyPage() {
  return (
    <>
      <Header />
      <main className="pt-24 lg:pt-32 bg-light-bg min-h-screen">
        
        {/* Page Header */}
        <section className="py-12 sm:py-16 bg-white border-b border-gray-100 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <span className="inline-block bg-accent-glow text-accent font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full border border-accent/20 mb-4">
              Legal Info
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-primary-dark tracking-tight mb-4">
              Cookie Policy
            </h1>
            <p className="text-xs sm:text-sm text-text-secondary font-semibold">
              Last Updated: June 2026
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 sm:py-16">
          <div className="max-w-3xl mx-auto px-6">
            <div className="bg-white border border-gray-100 rounded-3xl p-8 sm:p-12 shadow-sm text-left">
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-8">
                This Cookie Policy explains how Joy Digital uses cookies and similar technologies. By continuing to browse our website, you agree to our use of cookies as described here.
              </p>

              <div className="space-y-8">
                {/* What Are Cookies? */}
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-primary-dark mb-4 flex items-center gap-2">
                    <span className="text-accent"><i className="fa-solid fa-cookie" /></span>
                    What Are Cookies?
                  </h2>
                  <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                    Cookies are small text files stored on your device that help improve your browsing experience. They allow the website to remember your actions and preferences over a period of time.
                  </p>
                </div>

                {/* How We Use Cookies */}
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-primary-dark mb-4 flex items-center gap-2">
                    <span className="text-accent"><i className="fa-solid fa-gears" /></span>
                    How We Use Cookies
                  </h2>
                  <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-2">
                    We may use cookies to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base text-text-secondary">
                    <li>Analyze website traffic</li>
                    <li>Improve website performance</li>
                    <li>Enhance user experience</li>
                    <li>Remember user preferences</li>
                  </ul>
                </div>

                {/* Third-Party Cookies */}
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-primary-dark mb-4 flex items-center gap-2">
                    <span className="text-accent"><i className="fa-solid fa-users-gears" /></span>
                    Third-Party Cookies
                  </h2>
                  <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                    Third-party services such as Google Analytics may place cookies on your device to collect anonymous usage information. This helps us understand how visitors interact with our site so we can make improvements.
                  </p>
                </div>

                {/* Managing Cookies */}
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-primary-dark mb-4 flex items-center gap-2">
                    <span className="text-accent"><i className="fa-solid fa-sliders" /></span>
                    Managing Cookies
                  </h2>
                  <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                    You can disable or delete cookies through your browser settings. However, please note that some website features may not function properly if cookies are disabled.
                  </p>
                </div>

                {/* Contact Us */}
                <div className="border-t border-gray-100 pt-8 mt-8">
                  <h2 className="text-lg sm:text-xl font-bold text-primary-dark mb-4 flex items-center gap-2">
                    <span className="text-accent"><i className="fa-solid fa-envelope" /></span>
                    Contact Us
                  </h2>
                  <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-4">
                    For questions regarding this Cookie Policy:
                  </p>
                  <div className="bg-light-bg rounded-2xl p-6 border border-gray-100 space-y-2 max-w-md">
                    <h3 className="font-bold text-primary-dark">Joy Digital</h3>
                    <p className="text-sm flex items-center gap-2 text-text-secondary">
                      <span className="text-accent"><i className="fa-solid fa-phone" /></span>
                      <a href="tel:+919080026133" className="hover:text-accent font-semibold transition-colors">9080026133</a>
                    </p>
                    <p className="text-sm flex items-center gap-2 text-text-secondary">
                      <span className="text-accent"><i className="fa-solid fa-envelope" /></span>
                      <a href="mailto:info@joydigital.in" className="hover:text-accent font-semibold transition-colors">info@joydigital.in</a>
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>
      <Footer />
      <StickyWidgets />
    </>
  );
}
