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

    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(";").shift();
      return null;
    };

    const googtrans = getCookie("googtrans");
    const joyLang = typeof window !== "undefined" ? localStorage.getItem("joy_lang") : null;

    // Load immediately if user previously selected a language
    if ((googtrans && googtrans !== "/en/en") || (joyLang && joyLang !== "en")) {
      setShouldLoad(true);
      return;
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

  useEffect(() => {
    if (!shouldLoad) return;

    // Sync select element if language cookie/storage is present
    const syncTranslateWidget = () => {
      const joyLang = localStorage.getItem("joy_lang");
      const getCookie = (name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(";").shift();
        return null;
      };
      const googtrans = getCookie("googtrans");
      let targetLang = joyLang;
      if (!targetLang && googtrans) {
        const parts = googtrans.split("/");
        targetLang = parts[parts.length - 1];
      }

      if (targetLang && targetLang !== "en") {
        let attempts = 0;
        const interval = setInterval(() => {
          attempts++;
          const selectElem = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
          if (selectElem) {
            if (selectElem.value !== targetLang) {
              selectElem.value = targetLang;
              selectElem.dispatchEvent(new Event("change"));
            }
            clearInterval(interval);
          }
          if (attempts > 30) {
            clearInterval(interval);
          }
        }, 150);
      }
    };

    const timer = setTimeout(syncTranslateWidget, 300);
    return () => clearTimeout(timer);
  }, [shouldLoad]);

  if (!shouldLoad) return null;

  return (
    <>
      <div id="google_translate_element" style={{ display: "none" }} className="hidden"></div>
      <Script
        id="google-translate-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            function googleTranslateElementInit() {
              if (window.google && window.google.translate) {
                new window.google.translate.TranslateElement({
                  pageLanguage: 'en',
                  includedLanguages: 'en,ta,hi,ar,es,de,fr,te,kn,ml,bn,mr,gu,pa,it,pt,ru,zh-CN,ja,ko,tr,nl,vi,th',
                  layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                  autoDisplay: true
                }, 'google_translate_element');
              }
            }
          `,
        }}
      />
      <Script
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />
    </>
  );
}
