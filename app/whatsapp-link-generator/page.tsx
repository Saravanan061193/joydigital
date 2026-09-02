import React from "react";
import { metadata } from "./metadata";
import WhatsappLinkGeneratorClient from "./WhatsappLinkGeneratorClient";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageGraphSchema } from "@/lib/seo/schema";

export { metadata };

export default function WhatsappLinkGeneratorPage() {
  const canonicalUrl = "https://joydigital.in/whatsapp-link-generator";
  const graphSchema = buildPageGraphSchema({
    url: canonicalUrl,
    title: "Free WhatsApp Link Generator Online | Joy Digital",
    description: "Create direct click-to-chat WhatsApp links with pre-filled custom text messages and QR codes for your business.",
    breadcrumbs: [
      { name: "Home", item: "https://joydigital.in" },
      { name: "Free Tools", item: "https://joydigital.in/free-tools" },
      { name: "WhatsApp Link Generator", item: canonicalUrl },
    ],
    webApp: {
      name: "WhatsApp Link Generator",
      description: "Create direct click-to-chat WhatsApp links with pre-filled custom text messages and QR codes for your business.",
      applicationCategory: "CommunicationApplication",
    },
  });

  return (
    <>
      <JsonLd schema={graphSchema} />
      <WhatsappLinkGeneratorClient />
    </>
  );
}
