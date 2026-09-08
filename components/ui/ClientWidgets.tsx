"use client";

import dynamic from "next/dynamic";

const ChatbotWidget = dynamic(() => import("@/components/ui/ChatbotWidget"), { ssr: false });
const StickyWidgets = dynamic(() => import("@/components/ui/StickyWidgets"), { ssr: false });
const OfferModalPopup = dynamic(() => import("@/components/ui/OfferModalPopup"), { ssr: false });

export default function ClientWidgets() {
  return (
    <>
      <ChatbotWidget />
      <StickyWidgets />
      <OfferModalPopup />
    </>
  );
}
