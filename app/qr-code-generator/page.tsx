import React from "react";
import { metadata } from "./metadata";
import QrCodeGeneratorClient from "./QrCodeGeneratorClient";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageGraphSchema } from "@/lib/seo/schema";

export { metadata };

export default function QrCodeGeneratorPage() {
  const canonicalUrl = "https://joydigital.in/qr-code-generator";
  const graphSchema = buildPageGraphSchema({
    url: canonicalUrl,
    title: "Free QR Code Generator Online | Joy Digital",
    description: "Generate professional QR codes for links, WhatsApp, emails, WiFi, maps, and UPI payments instantly.",
    breadcrumbs: [
      { name: "Home", item: "https://joydigital.in" },
      { name: "QR Code Generator", item: canonicalUrl },
    ],
    webApp: {
      name: "Free QR Code Generator Online",
      description: "Generate professional QR codes for links, WhatsApp, emails, WiFi, maps, and UPI payments instantly.",
      applicationCategory: "UtilityApplication",
    },
  });

  return (
    <>
      <JsonLd schema={graphSchema} />
      <QrCodeGeneratorClient />
    </>
  );
}
