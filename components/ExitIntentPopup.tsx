"use client";

import React, { useState, useEffect } from "react";

export default function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if the popup was shown in the last 7 days
    const checkPopupLimit = () => {
      const lastShown = localStorage.getItem("joydigital_exit_popup_shown");
      if (lastShown) {
        const now = Date.now();
        const diff = now - parseInt(lastShown, 10);
        const sevenDays = 7 * 24 * 60 * 60 * 1000;
        return diff < sevenDays;
      }
      return false;
    };

    if (checkPopupLimit()) return;

    // Trigger Popup
    const triggerPopup = () => {
      setIsOpen(true);
      // Mark as shown immediately when opened to avoid re-triggering
      localStorage.setItem("joydigital_exit_popup_shown", Date.now().toString());
    };

    // 1. Desktop Exit Intent (Mouse moves out of top viewport)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10) {
        triggerPopup();
        cleanup();
      }
    };

    // 2. Mobile Exit Intent (Fast scroll up)
    let lastScrollTop = 0;
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const st = window.scrollY !== undefined ? window.scrollY : document.documentElement.scrollTop;
          const isScrollUp = st < lastScrollTop - 60;
          
          if (isScrollUp && st > 150) {
            triggerPopup();
            cleanup();
          }
          
          lastScrollTop = st <= 0 ? 0 : st;
          ticking = false;
        });
        ticking = true;
      }
    };

    // 3. Inactivity/Time Delay Fallback (25 seconds)
    const timeDelayTimer = setTimeout(() => {
      triggerPopup();
      cleanup();
    }, 25000);

    const cleanup = () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeDelayTimer);
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      cleanup();
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !mobile.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailReg.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    if (mobile.trim().length < 7) {
      setError("Please enter a valid contact number.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const payload = {
        Name: name,
        Email: email,
        Mobile: mobile,
        Source: "Exit Intent Lead Popup",
        Website: typeof window !== "undefined" ? window.location.href : "N/A",
        Message: "Requested Free Website & SEO Audit report via Exit Intent Popup.",
        _subject: "🔥 Exit Intent Lead - Joy Digital",
        _captcha: "false",
        _template: "table",
      };

      const response = await fetch("https://formsubmit.co/ajax/saravanan061193@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to submit lead");
      }

      setIsSuccess(true);

      // Unified Conversion Tracking
      if (typeof window !== "undefined") {
        const tracker = (window as any).trackJoyDigitalEvent;
        if (typeof tracker === "function") {
          tracker("exit_popup_submission", {
            page_url: window.location.href,
          });
        } else {
          const gtag = (window as any).gtag;
          if (typeof gtag === "function") {
            gtag("event", "exit_popup_submission", {
              page_url: window.location.href,
            });
          }
        }
      }

      // Automatically close success modal after 3 seconds
      setTimeout(() => {
        setIsOpen(false);
      }, 3500);

    } catch (err) {
      console.error(err);
      setError("Lead submission failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div 
        className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-2xl max-w-md w-full relative p-8 md:p-10 text-center animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-text-muted hover:text-primary transition-colors text-lg focus:outline-none"
          aria-label="Close popup"
        >
          <i className="fa-solid fa-xmark" />
        </button>

        {isSuccess ? (
          <div className="flex flex-col items-center py-6">
            <div className="text-success-green text-6xl mb-4 leading-none animate-bounce">
              <i className="fa-solid fa-circle-check" />
            </div>
            <h3 className="text-xl font-bold text-primary-dark mb-2">Audit Requested!</h3>
            <p className="text-xs text-text-secondary leading-relaxed max-w-xs">
              Thank you! Your free audit request has been registered. Our SEO experts will review your website and reach out within 24 hours.
            </p>
          </div>
        ) : (
          <div>
            <span className="inline-block bg-accent-glow text-accent font-bold text-[10px] uppercase tracking-widest px-3.5 py-1.5 rounded-full border border-accent/10 mb-4">
              Limited Time Offer
            </span>
            <h3 className="text-xl md:text-2xl font-extrabold text-primary-dark mb-2 tracking-tight">
              Get Free Website & SEO Audit
            </h3>
            <p className="text-xs text-text-secondary leading-relaxed mb-6 max-w-xs mx-auto">
              Discover hidden issues affecting your website performance, SEO rankings, and lead generation.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 text-left">
              {/* Name */}
              <div className="flex flex-col gap-1">
                <label htmlFor="popup-name" className="text-[9px] font-bold text-text-primary uppercase tracking-wider">Full Name</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-xs"><i className="fa-solid fa-user" /></span>
                  <input
                    type="text"
                    id="popup-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    disabled={isLoading}
                    className="w-full text-xs py-3 pl-10 pr-4 bg-light-bg rounded-lg border border-gray-200 focus:border-accent outline-none transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1">
                <label htmlFor="popup-email" className="text-[9px] font-bold text-text-primary uppercase tracking-wider">Email Address</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-xs"><i className="fa-solid fa-envelope" /></span>
                  <input
                    type="email"
                    id="popup-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    disabled={isLoading}
                    className="w-full text-xs py-3 pl-10 pr-4 bg-light-bg rounded-lg border border-gray-200 focus:border-accent outline-none transition-all"
                  />
                </div>
              </div>

              {/* Mobile / WhatsApp */}
              <div className="flex flex-col gap-1">
                <label htmlFor="popup-mobile" className="text-[9px] font-bold text-text-primary uppercase tracking-wider">WhatsApp Number</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-xs"><i className="fa-solid fa-phone" /></span>
                  <input
                    type="tel"
                    id="popup-mobile"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="e.g. +91 90800 26133"
                    disabled={isLoading}
                    className="w-full text-xs py-3 pl-10 pr-4 bg-light-bg rounded-lg border border-gray-200 focus:border-accent outline-none transition-all"
                  />
                </div>
              </div>

              {error && (
                <span className="text-[10px] font-semibold text-error-red mt-1 text-center block">
                  {error}
                </span>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-accent to-accent-light text-white font-bold text-xs py-3.5 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 mt-2 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <i className="fa-solid fa-spinner animate-spin" /> Submitting...
                  </>
                ) : (
                  "Get My Free Audit"
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
