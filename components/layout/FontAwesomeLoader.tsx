"use client";

import { useEffect } from "react";

export default function FontAwesomeLoader() {
  useEffect(() => {
    const linkId = "font-awesome-stylesheet";
    if (document.getElementById(linkId)) return;

    const loadFontAwesome = () => {
      const link = document.createElement("link");
      link.id = linkId;
      link.rel = "stylesheet";
      link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
      link.integrity = "sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==";
      link.crossOrigin = "anonymous";
      link.referrerPolicy = "no-referrer";
      link.media = "print";
      link.onload = () => {
        link.media = "all";
      };

      document.head.appendChild(link);
    };

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(loadFontAwesome, { timeout: 3000 });
      return () => {
        if ("cancelIdleCallback" in window) {
          window.cancelIdleCallback(idleId);
        }
      };
    } else {
      const timer = setTimeout(loadFontAwesome, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  return null;
}
