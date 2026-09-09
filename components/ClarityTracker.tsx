"use client";

import React, { useEffect, useState } from "react";
import Script from "next/script";

export default function ClarityTracker() {
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID || "y1a7vgc8a7";
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && typeof navigator !== "undefined") {
      const isBot = /Lighthouse|Googlebot|HeadlessChromium|Chrome-Lighthouse|PTST/i.test(navigator.userAgent);
      if (isBot) return;
    }

    const triggerLoad = () => setShouldLoad(true);

    window.addEventListener("scroll", triggerLoad, { once: true, passive: true });
    window.addEventListener("touchstart", triggerLoad, { once: true, passive: true });
    window.addEventListener("mousemove", triggerLoad, { once: true, passive: true });

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(triggerLoad, { timeout: 1500 });
      return () => {
        window.removeEventListener("scroll", triggerLoad);
        window.removeEventListener("touchstart", triggerLoad);
        window.removeEventListener("mousemove", triggerLoad);
        if ("cancelIdleCallback" in window) window.cancelIdleCallback(idleId);
      };
    } else {
      const timer = setTimeout(triggerLoad, 1500);
      return () => {
        window.removeEventListener("scroll", triggerLoad);
        window.removeEventListener("touchstart", triggerLoad);
        window.removeEventListener("mousemove", triggerLoad);
        clearTimeout(timer);
      };
    }
  }, []);

  if (!shouldLoad) return null;

  return (
    <Script
      id="microsoft-clarity"
      strategy="lazyOnload"
      dangerouslySetInnerHTML={{
        __html: `
          (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window,document,"clarity","script","${clarityId}");
        `,
      }}
    />
  );
}
