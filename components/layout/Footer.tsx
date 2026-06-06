import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-dark to-dark-slate text-white pt-20 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 border-b border-white/10 pb-16">
        
        {/* Brand Info */}
        <div className="flex flex-col gap-6 col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-1">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/assets/images/logo.webp"
              alt="Joy Digital Logo"
              width={70}
              height={70}
              className="object-contain"
            />
            <span className="font-bold text-2xl tracking-tight">
              Joy<span className="text-accent-light">Digital</span>
            </span>
          </Link>
          <p className="text-text-muted text-sm leading-relaxed">
            Economical, result-oriented digital solutions that empower startups and small-to-medium businesses. Offering expert web development, local maps placement, branding, and conversion audits.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/919080026133"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded bg-white/5 flex items-center justify-center text-text-muted hover:bg-accent hover:text-white transition-all duration-300"
              aria-label="WhatsApp"
            >
              <i className="fa-brands fa-whatsapp"></i>
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61590372457559"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded bg-white/5 flex items-center justify-center text-text-muted hover:bg-accent hover:text-white transition-all duration-300"
              aria-label="Facebook"
            >
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a
              href="https://www.youtube.com/@Joydigital2026"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded bg-white/5 flex items-center justify-center text-text-muted hover:bg-accent hover:text-white transition-all duration-300"
              aria-label="YouTube"
            >
              <i className="fa-brands fa-youtube"></i>
            </a>
            <a
              href="mailto:joydiigtals@gmail.com"
              className="w-10 h-10 rounded bg-white/5 flex items-center justify-center text-text-muted hover:bg-accent hover:text-white transition-all duration-300"
              aria-label="Email"
            >
              <i className="fa-solid fa-envelope"></i>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-6">
          <h4 className="text-lg font-bold relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-accent">
            Quick Links
          </h4>
          <ul className="flex flex-col gap-3.5 text-sm text-text-muted">
            <li>
              <Link href="/" className="hover:text-accent-light hover:pl-1 transition-all">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-accent-light hover:pl-1 transition-all">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/website-development" className="hover:text-accent-light hover:pl-1 transition-all">
                Services
              </Link>
            </li>
            <li>
              <Link href="/portfolio" className="hover:text-accent-light hover:pl-1 transition-all">
                Portfolio
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-accent-light hover:pl-1 transition-all">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal Info */}
        <div className="flex flex-col gap-6">
          <h4 className="text-lg font-bold relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-accent">
            Legal Info
          </h4>
          <ul className="flex flex-col gap-3.5 text-sm text-text-muted">
            <li>
              <Link href="/privacy-policy" className="hover:text-accent-light hover:pl-1 transition-all">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms-and-conditions" className="hover:text-accent-light hover:pl-1 transition-all">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link href="/refund-policy" className="hover:text-accent-light hover:pl-1 transition-all">
                Refund Policy
              </Link>
            </li>
            <li>
              <Link href="/cookie-policy" className="hover:text-accent-light hover:pl-1 transition-all">
                Cookie Policy
              </Link>
            </li>
            <li>
              <Link href="/disclaimer" className="hover:text-accent-light hover:pl-1 transition-all">
                Disclaimer
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact info */}
        <div className="flex flex-col gap-6">
          <h4 className="text-lg font-bold relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-accent">
            Direct Contacts
          </h4>
          <ul className="flex flex-col gap-4 text-sm text-text-muted">
            <li className="flex items-center gap-3">
              <span className="text-accent text-base"><i className="fa-solid fa-phone"></i></span>
              <a href="tel:+919080026133" className="hover:text-accent-light transition-colors">
                +91 90800 26133
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-whatsapp-green text-base"><i className="fa-brands fa-whatsapp"></i></span>
              <a href="https://wa.me/919080026133" target="_blank" rel="noopener noreferrer" className="hover:text-accent-light transition-colors">
                +91 90800 26133
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-blue-400 text-base"><i className="fa-solid fa-envelope"></i></span>
              <a href="mailto:joydiigtals@gmail.com" className="hover:text-accent-light transition-colors">
                joydiigtals@gmail.com
              </a>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent text-base mt-0.5"><i className="fa-solid fa-map-location-dot"></i></span>
              <span>Madurai Main Road, Madurai, Tamil Nadu, India - 625001</span>
            </li>
          </ul>
        </div>

        {/* Location Map Embed */}
        <div className="flex flex-col gap-6">
          <h4 className="text-lg font-bold relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-accent">
            Our Location
          </h4>
          <div className="w-full rounded-lg overflow-hidden border border-white/5 shadow-inner">
            <iframe
              src="https://maps.google.com/maps?q=9.927296037472392,78.1265955104797&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="120"
              style={{ border: 0, filter: "grayscale(100%) invert(90%) contrast(90%)" }}
              allowFullScreen
              loading="lazy"
              title="Joy Digital Growth Agency Location Map"
            />
          </div>
          <a
            href="https://www.google.com/maps/search/?api=1&query=9.927296037472392,78.1265955104797"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 border border-white/10 hover:border-accent hover:bg-accent text-xs font-semibold px-4 py-2 rounded transition-all duration-300"
          >
            <i className="fa-solid fa-diamond-turn-right text-accent-light group-hover:text-white" /> Get Directions
          </a>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted">
        <p>
          Copyright &copy; {new Date().getFullYear()} Joy Digital Growth Agency. All Rights Reserved.
        </p>
        <div className="flex gap-6">
          <Link href="/privacy-policy" className="hover:text-accent-light transition-colors">Privacy Policy</Link>
          <Link href="/terms-and-conditions" className="hover:text-accent-light transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
