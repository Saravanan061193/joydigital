"use client";

import React, { useEffect, useState } from "react";
import Script from "next/script";

export default function GoogleAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_ID || "G-EPE4YHGXYF";
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Define window.trackJoyDigitalEvent globally on component mount
    if (typeof window !== "undefined") {
      (window as any).trackJoyDigitalEvent = (eventName: string, params?: Record<string, any>) => {
        const payload = params || {};
        
        // 1. Log to console in development
        if (process.env.NODE_ENV === "development") {
          console.log(`[JoyDigital Analytics] Event: ${eventName}`, payload);
        }

        // 2. Dispatch to GA4 gtag
        const gtag = (window as any).gtag;
        if (typeof gtag === "function") {
          gtag("event", eventName, payload);
        }

        // 3. Dispatch to Microsoft Clarity custom event
        const clarity = (window as any).clarity;
        if (typeof clarity === "function") {
          clarity("event", eventName, payload);
        }
      };
    }

    // Defer loading GA script until after main thread idle window
    const timer = setTimeout(() => {
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(() => setShouldLoad(true));
      } else {
        setShouldLoad(true);
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (!shouldLoad) return null;

  return (
    <>
      <Script
        id="gtag-script"
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
      <Script
        id="gtag-init"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', '${measurementId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}
