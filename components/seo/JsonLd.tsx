import React from "react";

interface JsonLdProps {
  schema: Record<string, unknown> | Array<Record<string, unknown>>;
}

export default function JsonLd({ schema }: JsonLdProps) {
  if (!schema) return null;

  const jsonString = JSON.stringify(schema, null, 0)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonString }}
    />
  );
}
