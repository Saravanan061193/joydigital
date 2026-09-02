import React from "react";
import { metadata } from "./metadata";
import ThankYouClient from "./ThankYouClient";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageGraphSchema } from "@/lib/seo/schema";

export { metadata };

export default function ThankYouPage() {
  const canonicalUrl = "https://joydigital.in/thank-you";
  const graphSchema = buildPageGraphSchema({
    url: canonicalUrl,
    title: "Thank You | Joy Digital",
    description: "Thank you for contacting Joy Digital. Your inquiry has been received.",
    breadcrumbs: [
      { name: "Home", item: "https://joydigital.in" },
      { name: "Thank You", item: canonicalUrl },
    ],
  });

  return (
    <>
      <JsonLd schema={graphSchema} />
      <ThankYouClient />
    </>
  );
}
