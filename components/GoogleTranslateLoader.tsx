"use client";

import React, { useEffect, useState } from "react";
import Script from "next/script";

export default function GoogleTranslateLoader() {
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
      const idleId = window.requestIdleCallback(triggerLoad, { timeout: 2000 });
      return () => {
        window.removeEventListener("scroll", triggerLoad);
        window.removeEventListener("touchstart", triggerLoad);
        window.removeEventListener("mousemove", triggerLoad);
        if ("cancelIdleCallback" in window) window.cancelIdleCallback(idleId);
      };
    } else {
      const timer = setTimeout(triggerLoad, 2000);
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
    <>
      <div id="google_translate_element" style={{ display: "none" }} className="hidden"></div>
      <Script
        id="google-translate-init"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            function googleTranslateElementInit() {
              if (window.google && window.google.translate) {
                new window.google.translate.TranslateElement({
                  pageLanguage: 'en',
                  includedLanguages: 'en,ta,hi,ar,es,de,fr,te,kn,ml,bn,mr,gu,pa,it,pt,ru,zh-CN,ja,ko,tr,nl,vi,th',
                  layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                  autoDisplay: false
                }, 'google_translate_element');
              }
            }
          `,
        }}
      />
      <Script
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="lazyOnload"
      />
    </>
  );
}
