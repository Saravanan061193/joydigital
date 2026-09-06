"use client";

import dynamic from "next/dynamic";

const ChatbotWidget = dynamic(() => import("@/components/ui/ChatbotWidget"), { ssr: false });
const OfferModalPopup = dynamic(() => import("@/components/ui/OfferModalPopup"), { ssr: false });

export default function ClientWidgets() {
  return (
    <>
      <ChatbotWidget />
      <OfferModalPopup />
    </>
  );
}
