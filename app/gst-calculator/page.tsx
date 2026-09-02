import React from "react";
import { metadata } from "./metadata";
import GstCalculatorClient from "./GstCalculatorClient";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageGraphSchema } from "@/lib/seo/schema";

export { metadata };

export default function GstCalculatorPage() {
  const canonicalUrl = "https://joydigital.in/gst-calculator";
  const graphSchema = buildPageGraphSchema({
    url: canonicalUrl,
    title: "Free GST Calculator Online | CGST, SGST & IGST | Joy Digital",
    description: "Calculate GST instantly with our free online GST calculator. Supports inclusive and exclusive modes with CGST, SGST, and IGST breakdowns for Indian businesses.",
    breadcrumbs: [
      { name: "Home", item: "https://joydigital.in" },
      { name: "GST Calculator", item: canonicalUrl },
    ],
    webApp: {
      name: "Online GST Calculator Tool",
      description: "Calculate Goods and Services Tax (GST) instantly with our free online tool. Determine CGST, SGST, IGST, and final values.",
      applicationCategory: "FinancialApplication",
    },
    faqs: [
      {
        question: "What is a GST Calculator?",
        answer: "A GST Calculator is a free online tool to calculate Goods and Services Tax (GST) in India. It determines the base amount, tax rates, CGST, SGST, IGST, and final values instantly."
      },
      {
        question: "How is GST calculated?",
        answer: "For GST Exclusive values, multiply the base amount by the tax rate: GST = Amount * (Rate/100). For GST Inclusive values, calculate tax using: GST = Amount - (Amount / (1 + Rate/100))."
      },
      {
        question: "What is the difference between CGST, SGST and IGST?",
        answer: "CGST (Central GST) and SGST (State GST) apply to trade within a single state (Intra-State). IGST (Integrated GST) applies to supply chains between different states (Inter-State)."
      }
    ],
  });

  return (
    <>
      <JsonLd schema={graphSchema} />
      <GstCalculatorClient />
    </>
  );
}
