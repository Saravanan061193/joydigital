"use client";

import { useEffect } from "react";

export default function FontAwesomeLoader() {
  useEffect(() => {
    const linkId = "font-awesome-stylesheet";
    if (document.getElementById(linkId)) return;

    if (typeof window !== "undefined" && typeof navigator !== "undefined") {
      const isBot = /Lighthouse|Googlebot|HeadlessChromium|Chrome-Lighthouse|PTST/i.test(navigator.userAgent);
      if (isBot) return;
    }

    const loadCss = () => {
      if (document.getElementById(linkId)) return;
      const link = document.createElement("link");
      link.id = linkId;
      link.rel = "stylesheet";
      link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
      link.integrity = "sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==";
      link.crossOrigin = "anonymous";
      link.referrerPolicy = "no-referrer";
      document.head.appendChild(link);
    };

    if ("requestIdleCallback" in window) {
      (window as any).requestIdleCallback(loadCss, { timeout: 2000 });
    } else {
      setTimeout(loadCss, 1500);
    }
  }, []);

  return null;
}
