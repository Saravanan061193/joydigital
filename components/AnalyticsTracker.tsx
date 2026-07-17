"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";

const GA_ID = "G-LZB05M3K3Z";

const ExitIntentPopup = dynamic(() => import("@/components/ExitIntentPopup"), {
  ssr: false,
});

export default function AnalyticsTracker() {
  useEffect(() => {
    let scriptLoaded = false;

    const loadGA = () => {
      if (scriptLoaded) return;
      scriptLoaded = true;

      const win = window as any;

      // 1. Google Analytics
      win.dataLayer = win.dataLayer || [];
      const gtag = function () {
        const winInner = window as any;
        // eslint-disable-next-line prefer-rest-params
        winInner.dataLayer.push(arguments);
      };
      win.gtag = gtag;
      win.gtag("js", new Date());
      win.gtag("config", GA_ID);

      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
      document.head.appendChild(script);

      // 2. Meta Pixel
      const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
      if (pixelId) {
        win.fbq = win.fbq || function () {
          (win.fbq.q = win.fbq.q || []).push(arguments);
        };
        win._fbq = win._fbq || win.fbq;
        win.fbq.push = win.fbq;
        win.fbq.loaded = true;
        win.fbq.version = "2.0";
        win.fbq.queue = [];
        
        const fbScript = document.createElement("script");
        fbScript.async = true;
        fbScript.src = "https://connect.facebook.net/en_US/fbevents.js";
        document.head.appendChild(fbScript);
        
        win.fbq("init", pixelId);
        win.fbq("track", "PageView");
      }

      // 3. Microsoft Clarity
      const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;
      if (clarityId) {
        win.clarity = win.clarity || function () {
          (win.clarity.q = win.clarity.q || []).push(arguments);
        };
        const clarityScript = document.createElement("script");
        clarityScript.async = true;
        clarityScript.src = `https://www.clarity.ms/tag/${clarityId}`;
        document.head.appendChild(clarityScript);
      }

      // Remove event listeners
      cleanupListeners();
    };

    const trackEvent = (eventName: string, params: Record<string, unknown>) => {
      if (typeof window !== "undefined") {
        loadGA();
        const win = window as any;

        // GA4 tracking
        if (typeof win.gtag === "function") {
          win.gtag("event", eventName, params);
        } else {
          win.dataLayer = win.dataLayer || [];
          win.dataLayer.push({ event: eventName, ...params });
        }

        // Meta Pixel tracking
        if (typeof win.fbq === "function") {
          win.fbq("trackCustom", eventName, params);
          if (eventName.includes("submission") || eventName.includes("lead")) {
            win.fbq("track", "Lead", { content_name: eventName, ...params });
          }
        }

        // Microsoft Clarity tracking
        if (typeof win.clarity === "function") {
          win.clarity("event", eventName, params);
        }

        console.log(`Tracked event [${eventName}]:`, params);
      }
    };

    // Expose helper globally
    if (typeof window !== "undefined") {
      (window as any).trackJoyDigitalEvent = trackEvent;
    }

    const interactionEvents = ["click", "mousedown", "mousemove", "scroll", "touchstart", "keydown"];

    const cleanupListeners = () => {
      interactionEvents.forEach((event) => {
        window.removeEventListener(event, loadGA);
      });
    };

    const setupListeners = () => {
      interactionEvents.forEach((event) => {
        window.addEventListener(event, loadGA, { passive: true });
      });
    };

    setupListeners();

    // Global Click Handler for Event Tracking
    const handleGlobalClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      // Find closest anchor tag or button
      const anchor = target.closest("a");
      const button = target.closest("button");
      const clickElement = anchor || button;
      
      if (!clickElement) return;

      const href = anchor ? anchor.getAttribute("href") || "" : "";
      
      // Ensure GA is loaded when user clicks any CTA button
      loadGA();

      // 1. WhatsApp Click Tracking
      if (
        href.startsWith("https://wa.me/") || 
        href.startsWith("https://api.whatsapp.com/") || 
        href.includes("whatsapp.com/send")
      ) {
        let buttonLocation = clickElement.getAttribute("data-wa-location");
        if (!buttonLocation) {
          // Fallback inference
          if (clickElement.closest("header")) buttonLocation = "header";
          else if (clickElement.closest("footer")) buttonLocation = "footer";
          else if (window.location.pathname.includes("/contact")) buttonLocation = "contact page";
          else if (
            clickElement.className.includes("fixed") || 
            clickElement.className.includes("absolute") ||
            clickElement.className.includes("bottom-")
          ) buttonLocation = "floating button";
          else buttonLocation = "hero";
        }
        
        trackEvent("whatsapp_click", {
          button_location: buttonLocation,
          page_url: window.location.href,
        });
      }
      
      // 2. Call Click Tracking
      else if (href.startsWith("tel:")) {
        let buttonLocation = clickElement.getAttribute("data-call-location");
        if (!buttonLocation) {
          // Fallback inference
          if (clickElement.closest("header")) buttonLocation = "header";
          else if (clickElement.closest("footer")) buttonLocation = "footer";
          else if (window.location.pathname.includes("/contact")) buttonLocation = "contact page";
          else buttonLocation = "body";
        }
        
        trackEvent("call_click", {
          button_location: buttonLocation,
          page_url: window.location.href,
          phone_number: href.replace("tel:", ""),
        });
      }
      
      // 3. Free Consultation Click Tracking
      else if (
        clickElement.getAttribute("data-ga-event") === "free_consultation_click" ||
        (href.includes("/contact") && (
          clickElement.textContent?.toLowerCase().includes("consultation") ||
          clickElement.textContent?.toLowerCase().includes("audit") ||
          clickElement.textContent?.toLowerCase().includes("configure") ||
          clickElement.textContent?.toLowerCase().includes("quote")
        ))
      ) {
        let buttonLocation = clickElement.getAttribute("data-ga-location");
        if (!buttonLocation) {
          if (clickElement.closest("header")) buttonLocation = "header";
          else if (clickElement.closest("footer")) buttonLocation = "footer";
          else buttonLocation = "hero";
        }
        
        trackEvent("free_consultation_click", {
          button_location: buttonLocation,
          page_url: window.location.href,
        });
      }
    };

    document.addEventListener("click", handleGlobalClick);
    return () => {
      cleanupListeners();
      document.removeEventListener("click", handleGlobalClick);
    };
  }, []);

  return <ExitIntentPopup />;
}
