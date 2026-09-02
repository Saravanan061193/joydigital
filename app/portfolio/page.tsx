import React from "react";
import { metadata } from "./metadata";
import PortfolioClient from "./PortfolioClient";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageGraphSchema } from "@/lib/seo/schema";

export { metadata };

export default function PortfolioPage() {
  const canonicalUrl = "https://joydigital.in/portfolio";
  const graphSchema = buildPageGraphSchema({
    url: canonicalUrl,
    title: "Client Portfolio & Web Project Showcase | Joy Digital",
    description: "Explore custom Next.js web applications, responsive designs, and Local SEO case studies built by Joy Digital for global clients.",
    breadcrumbs: [
      { name: "Home", item: "https://joydigital.in" },
      { name: "Portfolio", item: canonicalUrl },
    ],
  });

  return (
    <>
      <JsonLd schema={graphSchema} />
      <PortfolioClient />
    </>
  );
}
