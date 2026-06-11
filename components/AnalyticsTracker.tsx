"use client";

import { useEffect } from "react";

export default function AnalyticsTracker() {
  useEffect(() => {
    const handleGlobalClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      // Find closest anchor tag or button
      const anchor = target.closest("a");
      const button = target.closest("button");
      const clickElement = anchor || button;
      
      if (!clickElement) return;

      const href = anchor ? anchor.getAttribute("href") || "" : "";
      
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

    const trackEvent = (eventName: string, params: Record<string, any>) => {
      if (typeof window !== "undefined") {
        const gtag = (window as any).gtag;
        if (typeof gtag === "function") {
          gtag("event", eventName, params);
          console.log(`Tracked event [${eventName}]:`, params);
        } else {
          const dataLayer = (window as any).dataLayer || [];
          dataLayer.push({
            event: eventName,
            ...params,
          });
          console.log(`Queued event [${eventName}] to dataLayer:`, params);
        }
      }
    };

    document.addEventListener("click", handleGlobalClick);
    return () => {
      document.removeEventListener("click", handleGlobalClick);
    };
  }, []);

  return null;
}
