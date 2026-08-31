import React from "react";
import SeoKeywordManager from "@/components/admin/SeoKeywordManager";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEO Keyword Manager | Joy Digital Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminSeoPage() {
  return <SeoKeywordManager />;
}
