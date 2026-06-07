"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const SERVICES_LINKS = [
  { href: "/website-development", label: "Web Development" },
  { href: "/web-design-services", label: "Web Design" },
  { href: "/seo-services", label: "Global SEO" },
  { href: "/local-seo-services", label: "Local SEO" },
  { href: "/social-media-marketing", label: "Social Media Marketing" },
  { href: "/logo-design-services", label: "Logo & Brand Design" },
  { href: "/google-business-profile-setup", label: "GBP & Google Maps Setup" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const isActive = (path: string) => {
    if (path === "/" && pathname !== "/") return false;
    return pathname.startsWith(path);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" title="Joy Digital Home" className="flex items-center gap-3">
            <Image
              src="/assets/images/logo.webp"
              alt="Joy Digital Logo"
              title="Joy Digital Logo"
              width={isScrolled ? 50 : 60}
              height={isScrolled ? 50 : 60}
              className="object-contain transition-all duration-300"
              priority
            />
            <span className="font-bold text-xl tracking-tight text-primary-dark">
              Joy<span className="text-accent">Digital</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link
              href="/"
              title="Home"
              className={`font-semibold text-sm transition-colors hover:text-accent ${
                isActive("/") ? "text-accent" : "text-text-primary"
              }`}
            >
              Home
            </Link>

            {/* Services Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setIsServicesDropdownOpen(true)}
              onMouseLeave={() => setIsServicesDropdownOpen(false)}
            >
              <button
                className={`font-semibold text-sm flex items-center gap-1 transition-colors hover:text-accent ${
                  pathname.includes("-services") || pathname.includes("-development") || pathname.includes("-setup") || pathname.includes("marketing")
                    ? "text-accent"
                    : "text-text-primary"
                }`}
              >
                Services
                <i className={`fa-solid fa-chevron-down text-[10px] transition-transform duration-200 ${isServicesDropdownOpen ? "rotate-180" : ""}`}></i>
              </button>

              {/* Dropdown Menu */}
              <div
                className={`absolute left-0 mt-2 w-64 bg-white border border-gray-100 rounded-lg shadow-lg py-2 transition-all duration-200 ${
                  isServicesDropdownOpen
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-2 pointer-events-none"
                }`}
              >
                {SERVICES_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    title={link.label}
                    className={`block px-4 py-2 text-sm transition-colors hover:bg-gray-50 hover:text-accent ${
                      pathname === link.href ? "text-accent bg-gray-50/50" : "text-text-primary"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/about"
              title="About Us"
              className={`font-semibold text-sm transition-colors hover:text-accent ${
                isActive("/about") ? "text-accent" : "text-text-primary"
              }`}
            >
              About Us
            </Link>

            <Link
              href="/portfolio"
              title="Portfolio"
              className={`font-semibold text-sm transition-colors hover:text-accent ${
                isActive("/portfolio") ? "text-accent" : "text-text-primary"
              }`}
            >
              Portfolio
            </Link>

            <Link
              href="/case-studies"
              title="Case Studies"
              className={`font-semibold text-sm transition-colors hover:text-accent ${
                isActive("/case-studies") ? "text-accent" : "text-text-primary"
              }`}
            >
              Case Studies
            </Link>

            <Link
              href="/blog"
              title="Blog"
              className={`font-semibold text-sm transition-colors hover:text-accent ${
                isActive("/blog") ? "text-accent" : "text-text-primary"
              }`}
            >
              Blog
            </Link>

            <Link
              href="/contact"
              title="Contact Us"
              className={`font-semibold text-sm transition-colors hover:text-accent ${
                isActive("/contact") ? "text-accent" : "text-text-primary"
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/contact"
              title="Book Free Consultation"
              className="bg-gradient-to-r from-accent to-accent-light text-white font-bold text-sm px-6 py-2.5 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              Book Free Consultation
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden flex flex-col justify-between w-6 h-4 z-[60] focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            <span
              className={`w-full h-0.5 bg-primary-dark rounded transition-all duration-300 ${
                isMobileOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <span
              className={`w-full h-0.5 bg-primary-dark rounded transition-all duration-300 ${
                isMobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-full h-0.5 bg-primary-dark rounded transition-all duration-300 ${
                isMobileOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-[55] bg-black/40 backdrop-blur-sm lg:hidden transition-opacity duration-300 ${
          isMobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileOpen(false)}
      />

      <aside
        className={`fixed top-0 right-0 w-4/5 max-w-sm h-full bg-white z-[55] shadow-2xl flex flex-col p-8 pt-24 transition-transform duration-300 lg:hidden ${
          isMobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col gap-6 overflow-y-auto pb-12">
          <Link
            href="/"
            title="Home"
            className={`font-semibold text-lg border-b border-gray-100 pb-2 ${
              isActive("/") ? "text-accent" : "text-primary-dark"
            }`}
          >
            Home
          </Link>

          {/* Mobile Services Sub-list */}
          <div className="flex flex-col gap-2">
            <span className="font-semibold text-lg text-primary-dark border-b border-gray-100 pb-2 flex justify-between items-center">
              Our Services
            </span>
            <div className="pl-4 flex flex-col gap-3 mt-2">
              {SERVICES_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  title={link.label}
                  className={`text-sm font-medium transition-colors hover:text-accent ${
                    pathname === link.href ? "text-accent" : "text-text-secondary"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <Link
            href="/about"
            title="About Us"
            className={`font-semibold text-lg border-b border-gray-100 pb-2 ${
              isActive("/about") ? "text-accent" : "text-primary-dark"
            }`}
          >
            About Us
          </Link>

          <Link
            href="/portfolio"
            title="Portfolio"
            className={`font-semibold text-lg border-b border-gray-100 pb-2 ${
              isActive("/portfolio") ? "text-accent" : "text-primary-dark"
            }`}
          >
            Portfolio
          </Link>

          <Link
            href="/case-studies"
            title="Case Studies"
            className={`font-semibold text-lg border-b border-gray-100 pb-2 ${
              isActive("/case-studies") ? "text-accent" : "text-primary-dark"
            }`}
          >
            Case Studies
          </Link>

          <Link
            href="/blog"
            title="Blog"
            className={`font-semibold text-lg border-b border-gray-100 pb-2 ${
              isActive("/blog") ? "text-accent" : "text-primary-dark"
            }`}
          >
            Blog
          </Link>

          <Link
            href="/contact"
            title="Contact Us"
            className={`font-semibold text-lg border-b border-gray-100 pb-2 ${
              isActive("/contact") ? "text-accent" : "text-primary-dark"
            }`}
          >
            Contact
          </Link>

          <Link
            href="/contact"
            title="Free Website Audit"
            className="bg-gradient-to-r from-accent to-accent-light text-white text-center font-bold px-6 py-3 rounded-lg shadow-md mt-4"
          >
            Free Website Audit
          </Link>
        </nav>
      </aside>
    </>
  );
}
