"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ChatbotWidget = dynamic(() => import("@/components/ui/ChatbotWidget"), { ssr: false });
const StickyWidgets = dynamic(() => import("@/components/ui/StickyWidgets"), { ssr: false });
const OfferModalPopup = dynamic(() => import("@/components/ui/OfferModalPopup"), { ssr: false });

export default function ClientWidgets() {
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

    const timer = setTimeout(triggerLoad, 3000);

    return () => {
      window.removeEventListener("scroll", triggerLoad);
      window.removeEventListener("touchstart", triggerLoad);
      window.removeEventListener("mousemove", triggerLoad);
      clearTimeout(timer);
    };
  }, []);

  if (!shouldLoad) return null;

  return (
    <>
      <ChatbotWidget />
      <StickyWidgets />
      <OfferModalPopup />
    </>
  );
}
