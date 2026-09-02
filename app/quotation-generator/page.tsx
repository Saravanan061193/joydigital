import React from "react";
import { metadata } from "./metadata";
import QuotationGeneratorClient from "./QuotationGeneratorClient";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageGraphSchema } from "@/lib/seo/schema";

export { metadata };

export default function QuotationGeneratorPage() {
  const canonicalUrl = "https://joydigital.in/quotation-generator";
  const graphSchema = buildPageGraphSchema({
    url: canonicalUrl,
    title: "Free Quotation Generator Online | Create Business Quotes | Joy Digital",
    description: "Create professional business price quotes and estimates online for free. Download PDF quotations instantly with company branding and itemized costs.",
    breadcrumbs: [
      { name: "Home", item: "https://joydigital.in" },
      { name: "Free Tools", item: "https://joydigital.in/free-tools" },
      { name: "Quotation Generator", item: canonicalUrl },
    ],
    webApp: {
      name: "Free Online Quotation Generator",
      description: "Create professional business price quotes and estimates online for free. Download PDF quotations instantly with company branding and itemized costs.",
      applicationCategory: "BusinessApplication",
    },
  });

  return (
    <>
      <JsonLd schema={graphSchema} />
      <QuotationGeneratorClient />
    </>
  );
}
