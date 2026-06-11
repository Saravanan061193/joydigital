"use client";

import { useEffect } from "react";

export default function WhatsAppTracker() {
  useEffect(() => {
    const handleGlobalClick = (event: MouseEvent) => {
      // Find closest anchor tag if the click target is inside a link
      const target = event.target as HTMLElement;
      const anchor = target.closest("a");
      
      if (!anchor) return;

      const href = anchor.getAttribute("href") || "";
      
      // Check if it's a WhatsApp link
      if (
        href.startsWith("https://wa.me/") || 
        href.startsWith("https://api.whatsapp.com/") || 
        href.includes("whatsapp.com/send")
      ) {
        // Retrieve the location attribute, or fallback to an inferred value
        let buttonLocation = anchor.getAttribute("data-wa-location");
        
        if (!buttonLocation) {
          // Fallback inference based on where the link is in the DOM
          if (anchor.closest("header")) {
            buttonLocation = "header";
          } else if (anchor.closest("footer")) {
            buttonLocation = "footer";
          } else if (window.location.pathname.includes("/contact")) {
            buttonLocation = "contact page";
          } else if (
            anchor.classList.contains("fixed") || 
            anchor.classList.contains("absolute") ||
            anchor.className.includes("bottom-") ||
            anchor.className.includes("right-")
          ) {
            buttonLocation = "floating button";
          } else {
            buttonLocation = "hero"; // default fallback
          }
        }
        
        // Track the click event
        if (typeof window !== "undefined") {
          const gtag = (window as any).gtag;
          if (typeof gtag === "function") {
            gtag("event", "whatsapp_click", {
              button_location: buttonLocation,
              page_url: window.location.href,
            });
            console.log("Tracked WhatsApp click:", { buttonLocation, url: window.location.href });
          } else {
            // Fallback: push directly to dataLayer
            const dataLayer = (window as any).dataLayer || [];
            dataLayer.push({
              event: "whatsapp_click",
              button_location: buttonLocation,
              page_url: window.location.href,
            });
            console.log("Queued WhatsApp click to dataLayer:", { buttonLocation, url: window.location.href });
          }
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
