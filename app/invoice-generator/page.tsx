import React from "react";
import { metadata } from "./metadata";
import InvoiceGeneratorClient from "./InvoiceGeneratorClient";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageGraphSchema } from "@/lib/seo/schema";

export { metadata };

export default function InvoiceGeneratorPage() {
  const canonicalUrl = "https://joydigital.in/invoice-generator";
  const graphSchema = buildPageGraphSchema({
    url: canonicalUrl,
    title: "Free Invoice Generator Online | Create & Print PDF Invoices | Joy Digital",
    description: "Create professional GST invoices online for free. Download or print PDF invoices instantly with custom company details, line items, and tax calculations.",
    breadcrumbs: [
      { name: "Home", item: "https://joydigital.in" },
      { name: "Free Tools", item: "https://joydigital.in/free-tools" },
      { name: "Invoice Generator", item: canonicalUrl },
    ],
    webApp: {
      name: "Free Online Invoice Generator",
      description: "Create professional GST invoices online for free. Download or print PDF invoices instantly with custom company details, line items, and tax calculations.",
      applicationCategory: "BusinessApplication",
    },
  });

  return (
    <>
      <JsonLd schema={graphSchema} />
      <InvoiceGeneratorClient />
    </>
  );
}
