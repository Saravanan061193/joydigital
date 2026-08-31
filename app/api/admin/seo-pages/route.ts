import { NextRequest, NextResponse } from "next/server";
import {
  getAllSeoPages,
  saveSeoPage,
  deleteSeoPage,
  SeoPageMapping,
} from "@/lib/seoKeywords";

export async function GET(req: NextRequest) {
  try {
    const pages = await getAllSeoPages();
    return NextResponse.json({ success: true, pages, count: pages.length });
  } catch (error) {
    console.error("Error in GET /api/admin/seo-pages:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch SEO page mappings" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.path || typeof body.path !== "string") {
      return NextResponse.json({ success: false, error: "Page path is required" }, { status: 400 });
    }

    const pageData: SeoPageMapping = {
      id: body.id || `page-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      path: body.path.trim(),
      category: body.category || "Core Service",
      title_template: body.title_template || "",
      meta_description: body.meta_description || "",
      h1: body.h1 || "",
      h2_tags: Array.isArray(body.h2_tags) ? body.h2_tags : [],
      h3_tags: Array.isArray(body.h3_tags) ? body.h3_tags : [],
      primary_keyword_id: body.primary_keyword_id || null,
      secondary_keyword_ids: Array.isArray(body.secondary_keyword_ids) ? body.secondary_keyword_ids : [],
      longtail_keyword_ids: Array.isArray(body.longtail_keyword_ids) ? body.longtail_keyword_ids : [],
      faq_schema: Array.isArray(body.faq_schema) ? body.faq_schema : [],
      alt_texts: Array.isArray(body.alt_texts) ? body.alt_texts : [],
      updated_at: new Date().toISOString(),
    };

    const saved = await saveSeoPage(pageData);
    return NextResponse.json({ success: true, page: saved });
  } catch (error) {
    console.error("Error in POST /api/admin/seo-pages:", error);
    return NextResponse.json({ success: false, error: "Failed to save SEO page mapping" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Page ID is required" }, { status: 400 });
    }

    await deleteSeoPage(id);
    return NextResponse.json({ success: true, message: "SEO page mapping deleted successfully" });
  } catch (error) {
    console.error("Error in DELETE /api/admin/seo-pages:", error);
    return NextResponse.json({ success: false, error: "Failed to delete SEO page mapping" }, { status: 500 });
  }
}
