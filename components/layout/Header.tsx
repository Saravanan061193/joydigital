"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const SERVICES_LINKS = [
  { href: "/website-development", label: "Web Development", localized: true },
  { href: "/web-design-services", label: "Web Design", localized: false },
  { href: "/ecommerce-website-development", label: "E-commerce Development", localized: false },
];

const REGIONS = [
  { code: "", label: "Global", flag: "🌐" },
  { code: "us", label: "United States", flag: "🇺🇸" },
  { code: "uk", label: "United Kingdom", flag: "🇬🇧" },
  { code: "ae", label: "United Arab Emirates", flag: "🇦🇪" },
  { code: "in", label: "India", flag: "🇮🇳" },
];

const LANGUAGES = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "ta", label: "தமிழ் (Tamil)", flag: "🇮🇳" },
  { code: "hi", label: "हिन्दी (Hindi)", flag: "🇮🇳" },
  { code: "ar", label: "العربية (Arabic)", flag: "🇦🇪" },
  { code: "es", label: "Español (Spanish)", flag: "🇪🇸" },
  { code: "de", label: "Deutsch (German)", flag: "🇩🇪" },
  { code: "fr", label: "Français (French)", flag: "🇫🇷" },
  { code: "te", label: "తెలుగు (Telugu)", flag: "🇮🇳" },
  { code: "kn", label: "ಕನ್ನಡ (Kannada)", flag: "🇮🇳" },
  { code: "ml", label: "മലയാളം (Malayalam)", flag: "🇮🇳" },
  { code: "bn", label: "বাংলা (Bengali)", flag: "🇮🇳" },
  { code: "mr", label: "मराठी (Marathi)", flag: "🇮🇳" },
  { code: "gu", label: "ગુજરાતી (Gujarati)", flag: "🇮🇳" },
  { code: "pa", label: "ਪੰਜਾਬੀ (Punjabi)", flag: "🇮🇳" },
  { code: "it", label: "Italiano (Italian)", flag: "🇮🇹" },
  { code: "pt", label: "Português (Portuguese)", flag: "🇵🇹" },
  { code: "ru", label: "Русский (Russian)", flag: "🇷🇺" },
  { code: "zh-CN", label: "简体中文 (Chinese)", flag: "🇨🇳" },
  { code: "ja", label: "日本語 (Japanese)", flag: "🇯🇵" },
  { code: "ko", label: "한국어 (Korean)", flag: "🇰🇷" },
  { code: "tr", label: "Türkçe (Turkish)", flag: "🇹🇷" },
  { code: "nl", label: "Nederlands (Dutch)", flag: "🇳🇱" },
  { code: "vi", label: "Tiếng Việt (Vietnamese)", flag: "🇻🇳" },
  { code: "th", label: "ไทย (Thai)", flag: "🇹🇭" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isRegionDropdownOpen, setIsRegionDropdownOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");
  
  const pathname = usePathname();
  const router = useRouter();
  const regionRef = useRef<HTMLDivElement>(null);
  const desktopLangRef = useRef<HTMLDivElement>(null);
  const mobileLangRef = useRef<HTMLDivElement>(null);

  // Close mobile drawer on route change during render
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsMobileOpen(false);
  }

  // Detect current region from pathname
  const parts = pathname.split("/").filter(Boolean);
  const currentRegion = (parts.length > 0 && ["us", "uk", "ae", "in"].includes(parts[0])) ? parts[0] : "";

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Detect current language cookie on mount
  useEffect(() => {
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(";").shift();
      return null;
    };
    
    const googtrans = getCookie("googtrans");
    if (googtrans) {
      const parts = googtrans.split("/");
      const lang = parts[parts.length - 1];
      if (lang) {
        setCurrentLang(lang);
      }
    }
  }, []);

  // Click outside selector handler for both dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (regionRef.current && !regionRef.current.contains(target)) {
        setIsRegionDropdownOpen(false);
      }
      if (
        (desktopLangRef.current && !desktopLangRef.current.contains(target)) &&
        (mobileLangRef.current && !mobileLangRef.current.contains(target))
      ) {
        setIsLangDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLangChange = (langCode: string) => {
    const domain = window.location.hostname;
    const cookieValue = `/en/${langCode}`;
    
    // Set cookie for all subdomains and paths
    document.cookie = `googtrans=${cookieValue}; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
    document.cookie = `googtrans=${cookieValue}; path=/; domain=${domain}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
    
    if (domain.includes(".")) {
      const baseDomain = domain.substring(domain.indexOf("."));
      document.cookie = `googtrans=${cookieValue}; path=/; domain=${baseDomain}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
    }
    
    // If it's English, clear the cookie entirely as well to be safe
    if (langCode === "en") {
      document.cookie = "googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      document.cookie = `googtrans=; path=/; domain=${domain}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      if (domain.includes(".")) {
        const baseDomain = domain.substring(domain.indexOf("."));
        document.cookie = `googtrans=; path=/; domain=${baseDomain}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      }
    }
    
    setCurrentLang(langCode);
    setIsLangDropdownOpen(false);
    window.location.reload();
  };

  const isActive = (path: string) => {
    const regionalPath = getRegionalHref(path);
    if (path === "/" && pathname !== "/" && pathname !== "/us" && pathname !== "/uk" && pathname !== "/ae" && pathname !== "/in") return false;
    return pathname === regionalPath;
  };

  const getRegionalHref = (path: string) => {
    const localizedPaths = ["/", "/seo-services", "/website-development", "/contact"];
    if (localizedPaths.includes(path)) {
      if (currentRegion === "") return path;
      return `/${currentRegion}${path === "/" ? "" : path}`;
    }
    return path;
  };

  const handleRegionChange = (regionCode: string) => {
    setIsRegionDropdownOpen(false);
    
    const partsLoc = pathname.split("/").filter(Boolean);
    const rootPath = partsLoc[0];
    
    const hasRegion = ["us", "uk", "ae", "in"].includes(rootPath);
    const cleanSegments = hasRegion ? partsLoc.slice(1) : partsLoc;
    const cleanPath = "/" + cleanSegments.join("/");
    
    const localizedPaths = ["/", "/seo-services", "/website-development", "/contact"];
    const isPathLocalized = localizedPaths.includes(cleanPath);
    
    let targetPath = "/";
    if (isPathLocalized) {
      targetPath = regionCode === "" 
        ? cleanPath 
        : `/${regionCode}${cleanPath === "/" ? "" : cleanPath}`;
    } else {
      targetPath = regionCode === "" ? "/" : `/${regionCode}`;
    }
    
    router.push(targetPath);
  };

  const activeRegionObj = REGIONS.find(r => r.code === currentRegion) || REGIONS[0];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E9E4F2] py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href={getRegionalHref("/")} title="Joy Digital Home" className="flex items-center gap-3 flex-shrink-0">
            <Image
              src="/assets/images/logo.webp"
              alt="Joy Digital - Web Design, Web Development & SEO Services Worldwide"
              title="Joy Digital Logo"
              width={isScrolled ? 50 : 60}
              height={isScrolled ? 50 : 60}
              className="object-contain transition-all duration-300"
              priority
            />
            <span className={`font-bold text-xl tracking-tight transition-colors duration-300 ${isScrolled ? "text-primary-dark" : "text-white"}`}>
              Joy<span className={isScrolled ? "text-accent" : "text-primary-light"}>Digital</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-8 flex-shrink-0">
            <Link
              href={getRegionalHref("/")}
              title="Home"
              className={`font-semibold text-sm transition-colors nav-link-underline ${
                isScrolled ? "hover:text-accent" : "hover:text-primary-light"
              } ${
                isActive("/") 
                  ? (isScrolled ? "text-accent" : "text-primary-light") 
                  : (isScrolled ? "text-text-primary" : "text-slate-100")
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
                className={`font-semibold text-sm flex items-center gap-1 transition-colors nav-link-underline ${
                  isScrolled ? "hover:text-accent" : "hover:text-primary-light"
                } ${
                  pathname.includes("-services") || pathname.includes("-development") || pathname.includes("-setup") || pathname.includes("marketing")
                    ? (isScrolled ? "text-accent" : "text-primary-light")
                    : (isScrolled ? "text-text-primary" : "text-slate-100")
                }`}
              >
                Services
                <i className={`fa-solid fa-chevron-down text-[10px] transition-transform duration-200 ${isServicesDropdownOpen ? "rotate-180" : ""}`}></i>
              </button>

              {/* Dropdown Menu */}
              <div
                className={`absolute left-0 mt-2 w-64 bg-white border border-[#E9E4F2] rounded-lg shadow-lg py-2 transition-all duration-200 ${
                  isServicesDropdownOpen
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-2 pointer-events-none"
                }`}
              >
                {SERVICES_LINKS.map((link) => {
                  const targetHref = link.localized ? getRegionalHref(link.href) : link.href;
                  return (
                    <Link
                      key={link.href}
                      href={targetHref}
                      title={link.label}
                      className={`block px-4 py-2 text-sm transition-colors hover:bg-[#FAF9FF] hover:text-primary ${
                        pathname === targetHref ? "text-primary bg-[#FAF9FF]" : "text-text-primary"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            <Link
              href="/about"
              title="About Us"
              className={`font-semibold text-sm transition-colors nav-link-underline ${
                isScrolled ? "hover:text-accent" : "hover:text-primary-light"
              } ${
                isActive("/about") 
                  ? (isScrolled ? "text-accent" : "text-primary-light") 
                  : (isScrolled ? "text-text-primary" : "text-slate-100")
              }`}
            >
              About Us
            </Link>

            <Link
              href="/portfolio"
              title="Portfolio"
              className={`font-semibold text-sm transition-colors nav-link-underline ${
                isScrolled ? "hover:text-accent" : "hover:text-primary-light"
              } ${
                isActive("/portfolio") 
                  ? (isScrolled ? "text-accent" : "text-primary-light") 
                  : (isScrolled ? "text-text-primary" : "text-slate-100")
              }`}
            >
              Portfolio
            </Link>

            <Link
              href="/blog"
              title="Blog"
              className={`font-semibold text-sm transition-colors nav-link-underline ${
                isScrolled ? "hover:text-accent" : "hover:text-primary-light"
              } ${
                isActive("/blog") 
                  ? (isScrolled ? "text-accent" : "text-primary-light") 
                  : (isScrolled ? "text-text-primary" : "text-slate-100")
              }`}
            >
              Blog
            </Link>

            <Link
              href={getRegionalHref("/contact")}
              title="Contact Us"
              className={`font-semibold text-sm transition-colors nav-link-underline ${
                isScrolled ? "hover:text-accent" : "hover:text-primary-light"
              } ${
                isActive("/contact") 
                  ? (isScrolled ? "text-accent" : "text-primary-light") 
                  : (isScrolled ? "text-text-primary" : "text-slate-100")
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Desktop Right Panel (Region Selector + CTA) */}
          <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
            {/* Region Dropdown */}
            <div className="relative" ref={regionRef}>
              <button
                onClick={() => setIsRegionDropdownOpen(!isRegionDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 border border-[#E5E7EB] rounded-lg text-sm font-medium hover:border-accent hover:text-accent transition-colors bg-white shadow-sm"
              >
                <span>{activeRegionObj.flag}</span>
                <span className="uppercase text-xs">{activeRegionObj.code || "Global"}</span>
                <i className={`fa-solid fa-chevron-down text-[8px] transition-transform duration-200 ${isRegionDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              <div
                className={`absolute right-0 mt-2 w-48 bg-white border border-[#E5E7EB] rounded-lg shadow-lg py-1.5 transition-all duration-200 ${
                  isRegionDropdownOpen
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-2 pointer-events-none"
                }`}
              >
                {REGIONS.map((region) => (
                  <button
                    key={region.code}
                    onClick={() => handleRegionChange(region.code)}
                    className={`w-full flex items-center gap-3 px-4 py-2 text-left text-xs font-semibold transition-colors hover:bg-gray-50 hover:text-accent ${
                      currentRegion === region.code ? "text-accent bg-gray-50/50" : "text-text-primary"
                    }`}
                  >
                    <span className="text-sm">{region.flag}</span>
                    <span>{region.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Language Dropdown */}
            <div className="relative" ref={desktopLangRef}>
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 border border-[#E5E7EB] rounded-lg text-sm font-medium hover:border-accent hover:text-accent transition-colors bg-white shadow-sm"
              >
                <span>{LANGUAGES.find(l => l.code === currentLang)?.flag || "🇺🇸"}</span>
                <span className="uppercase text-xs">{currentLang}</span>
                <i className={`fa-solid fa-chevron-down text-[8px] transition-transform duration-200 ${isLangDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              <div
                className={`absolute right-0 mt-2 w-48 max-h-80 overflow-y-auto bg-white border border-[#E5E7EB] rounded-lg shadow-lg py-1.5 transition-all duration-200 z-[70] ${
                  isLangDropdownOpen
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-2 pointer-events-none"
                }`}
              >
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLangChange(lang.code)}
                    className={`w-full flex items-center gap-3 px-4 py-2 text-left text-xs font-semibold transition-colors hover:bg-gray-50 hover:text-accent ${
                      currentLang === lang.code ? "text-accent bg-gray-50/50" : "text-text-primary"
                    }`}
                  >
                    <span className="text-sm">{lang.flag}</span>
                    <span>{lang.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <Link
              href={getRegionalHref("/contact")}
              title="Book Free Consultation"
              className="bg-primary hover:bg-primary-light text-white font-bold text-xs px-6 py-3 rounded-full shadow-md hover:-translate-y-0.5 transition-all duration-300 flex-shrink-0"
            >
              Book Free Consultation
            </Link>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex lg:hidden items-center gap-3">
            {/* Mobile Region Switcher (Minimal) */}
            <div className="relative">
              <button
                onClick={() => setIsRegionDropdownOpen(!isRegionDropdownOpen)}
                className="flex items-center justify-center w-8 h-8 border border-[#E5E7EB] rounded-lg text-sm bg-white shadow-sm"
                aria-label="Select Country"
              >
                <span>{activeRegionObj.flag}</span>
              </button>

              {isRegionDropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border border-[#E5E7EB] rounded-lg shadow-lg py-1 z-[60]">
                  {REGIONS.map((region) => (
                    <button
                      key={region.code}
                      onClick={() => {
                        handleRegionChange(region.code);
                        setIsRegionDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-xs font-semibold text-text-primary hover:bg-gray-50 hover:text-accent"
                    >
                      <span>{region.flag}</span>
                      <span>{region.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Language Switcher (Minimal) */}
            <div className="relative" ref={mobileLangRef}>
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center justify-center w-8 h-8 border border-[#E5E7EB] rounded-lg text-sm bg-white shadow-sm"
                aria-label="Select Language"
              >
                <span>{LANGUAGES.find(l => l.code === currentLang)?.flag || "🇺🇸"}</span>
              </button>

              {isLangDropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 max-h-64 overflow-y-auto bg-white border border-[#E5E5E5] rounded-lg shadow-lg py-1.5 z-[60]">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        handleLangChange(lang.code);
                        setIsLangDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-xs font-semibold text-text-primary hover:bg-gray-50 hover:text-accent"
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

             {/* Mobile Menu Toggle Button */}
             <button
               onClick={() => setIsMobileOpen(!isMobileOpen)}
               className="flex flex-col justify-between w-6 h-4 z-[60] focus:outline-none"
               aria-label="Toggle navigation menu"
             >
               <span
                 className={`w-full h-0.5 rounded transition-all duration-300 ${
                   isScrolled || isMobileOpen ? "bg-primary-dark" : "bg-white"
                 } ${
                   isMobileOpen ? "rotate-45 translate-y-1.5" : ""
                 }`}
               />
               <span
                 className={`w-full h-0.5 rounded transition-all duration-300 ${
                   isScrolled || isMobileOpen ? "bg-primary-dark" : "bg-white"
                 } ${
                   isMobileOpen ? "opacity-0" : ""
                 }`}
               />
               <span
                 className={`w-full h-0.5 rounded transition-all duration-300 ${
                   isScrolled || isMobileOpen ? "bg-primary-dark" : "bg-white"
                 } ${
                   isMobileOpen ? "-rotate-45 -translate-y-1.5" : ""
                 }`}
               />
             </button>
          </div>
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
            href={getRegionalHref("/")}
            title="Home"
            className={`font-semibold text-lg border-b border-[#E5E7EB] pb-2 ${
              isActive("/") ? "text-accent" : "text-primary-dark"
            }`}
          >
            Home
          </Link>

          {/* Mobile Services Sub-list */}
          <div className="flex flex-col gap-2">
            <span className="font-semibold text-lg text-primary-dark border-b border-[#E5E7EB] pb-2 flex justify-between items-center">
              Our Services
            </span>
            <div className="pl-4 flex flex-col gap-3 mt-2">
              {SERVICES_LINKS.map((link) => {
                const targetHref = link.localized ? getRegionalHref(link.href) : link.href;
                return (
                  <Link
                    key={link.href}
                    href={targetHref}
                    title={link.label}
                    className={`text-sm font-medium transition-colors hover:text-accent ${
                      pathname === targetHref ? "text-accent" : "text-text-secondary"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>

          <Link
            href="/about"
            title="About Us"
            className={`font-semibold text-lg border-b border-[#E5E7EB] pb-2 ${
              isActive("/about") ? "text-accent" : "text-primary-dark"
            }`}
          >
            About Us
          </Link>

          <Link
            href="/portfolio"
            title="Portfolio"
            className={`font-semibold text-lg border-b border-[#E5E7EB] pb-2 ${
              isActive("/portfolio") ? "text-accent" : "text-primary-dark"
            }`}
          >
            Portfolio
          </Link>

          <Link
            href="/blog"
            title="Blog"
            className={`font-semibold text-lg border-b border-[#E5E7EB] pb-2 ${
              isActive("/blog") ? "text-accent" : "text-primary-dark"
            }`}
          >
            Blog
          </Link>

          <Link
            href={getRegionalHref("/contact")}
            title="Contact Us"
            className={`font-semibold text-lg border-b border-[#E5E7EB] pb-2 ${
              isActive("/contact") ? "text-accent" : "text-primary-dark"
            }`}
          >
            Contact
          </Link>

          {/* Mobile Language Selector */}
          <div className="flex flex-col gap-2">
            <span className="font-semibold text-lg text-primary-dark border-b border-[#E5E7EB] pb-2 flex justify-between items-center">
              Select Language
            </span>
            <div className="grid grid-cols-2 gap-2 mt-2 max-h-60 overflow-y-auto pr-1">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLangChange(lang.code)}
                  className={`flex items-center gap-2 px-3 py-2 border rounded-lg text-xs font-semibold transition-colors ${
                    currentLang === lang.code
                      ? "border-accent text-accent bg-[#FAF9FF]"
                      : "border-gray-200 text-text-primary hover:border-accent hover:text-accent bg-white"
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span className="truncate">{lang.label.split(" ")[0]}</span>
                </button>
              ))}
            </div>
          </div>

          <Link
            href={getRegionalHref("/contact")}
            title="Free Website Audit"
            className="bg-[#2563EB] hover:bg-[#3B82F6] text-white text-center font-bold px-6 py-3.5 rounded-full shadow-md mt-4"
          >
            Free Website Audit
          </Link>
        </nav>
      </aside>
    </>
  );
}

