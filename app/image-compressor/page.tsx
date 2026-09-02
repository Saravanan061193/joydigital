import React from "react";
import { metadata } from "./metadata";
import ImageCompressorClient from "./ImageCompressorClient";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageGraphSchema } from "@/lib/seo/schema";

export { metadata };

export default function ImageCompressorPage() {
  const canonicalUrl = "https://joydigital.in/image-compressor";
  const graphSchema = buildPageGraphSchema({
    url: canonicalUrl,
    title: "Free Online Image Compressor Tool | Joy Digital",
    description: "Compress PNG, JPEG, and WebP images quickly inside your browser without uploading to external servers.",
    breadcrumbs: [
      { name: "Home", item: "https://joydigital.in" },
      { name: "Image Compressor", item: canonicalUrl },
    ],
    webApp: {
      name: "Client-Side Image Compressor",
      description: "Compress PNG, JPEG, and WebP images quickly inside your browser without uploading to external servers.",
      applicationCategory: "MultimediaApplication",
    },
  });

  return (
    <>
      <JsonLd schema={graphSchema} />
      <ImageCompressorClient />
    </>
  );
}
