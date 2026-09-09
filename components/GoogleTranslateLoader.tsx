"use client";

import React, { useEffect } from "react";

export default function GoogleTranslateLoader() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check if bot / crawler
    const isBot = /Lighthouse|Googlebot|HeadlessChromium|Chrome-Lighthouse|PTST/i.test(navigator.userAgent);
    if (isBot) return;

    // Define global callback function for Google Translate
    (window as any).googleTranslateElementInit = function () {
      if ((window as any).google && (window as any).google.translate) {
        new (window as any).google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,ta,hi,ar,es,de,fr,te,kn,ml,bn,mr,gu,pa,it,pt,ru,zh-CN,ja,ko,tr,nl,vi,th",
            layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: true,
          },
          "google_translate_element"
        );
      }
    };

    // Load Google Translate script dynamically if not already loaded
    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }

    // Function to check and force select element to match selected language
    const checkAndSyncLanguage = () => {
      const getCookie = (name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(";").shift();
        return null;
      };

      const joyLang = localStorage.getItem("joy_lang");
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
              selectElem.dispatchEvent(new Event("change", { bubbles: true }));
              selectElem.dispatchEvent(new Event("input", { bubbles: true }));
            }
            clearInterval(interval);
          }
          if (attempts > 40) {
            clearInterval(interval);
          }
        }, 200);
      }
    };

    // Run sync check after script loads
    const timer = setTimeout(checkAndSyncLanguage, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      id="google_translate_element"
      style={{ display: "none", position: "absolute", top: "-9999px", left: "-9999px" }}
      aria-hidden="true"
    />
  );
}
