import React from "react";
import { metadata } from "./metadata";
import SeoAuditToolClient from "./SeoAuditToolClient";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageGraphSchema } from "@/lib/seo/schema";

export { metadata };

export default function SeoAuditToolPage() {
  const canonicalUrl = "https://joydigital.in/seo-audit-tool";
  const graphSchema = buildPageGraphSchema({
    url: canonicalUrl,
    title: "Free Website SEO Audit Tool Online | Joy Digital",
    description: "Scan your website for SEO ranking errors, schema tags, meta titles, image alt attributes, and Core Web Vitals speed issues instantly.",
    breadcrumbs: [
      { name: "Home", item: "https://joydigital.in" },
      { name: "SEO Audit Tool", item: canonicalUrl },
    ],
    webApp: {
      name: "Instant SEO Audit Scan",
      description: "Scan your website for SEO ranking errors, schema tags, meta titles, image alt attributes, and Core Web Vitals speed issues instantly.",
      applicationCategory: "BusinessApplication",
    },
  });

  return (
    <>
      <JsonLd schema={graphSchema} />
      <SeoAuditToolClient />
    </>
  );
}
