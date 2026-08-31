import { NextRequest, NextResponse } from "next/server";
import {
  getAllKeywords,
  saveKeyword,
  deleteKeyword,
  getSeoDashboardStats,
  SeoKeyword,
} from "@/lib/seoKeywords";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get("action");

    if (action === "stats") {
      const stats = await getSeoDashboardStats();
      return NextResponse.json({ success: true, stats });
    }

    const keywords = await getAllKeywords();
    return NextResponse.json({ success: true, keywords, count: keywords.length });
  } catch (error) {
    console.error("Error in GET /api/admin/seo-keywords:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch SEO keywords" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.keyword || typeof body.keyword !== "string") {
      return NextResponse.json({ success: false, error: "Keyword text is required" }, { status: 400 });
    }

    const keywordData: SeoKeyword = {
      id: body.id || `kw-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      keyword: body.keyword.trim(),
      type: body.type || "Secondary",
      search_intent: body.search_intent || "Commercial",
      target_audience: body.target_audience || "Global Businesses & Startups",
      notes: body.notes || "",
      status: body.status || "Active",
      assigned_page_id: body.assigned_page_id || null,
      created_at: body.created_at || new Date().toISOString(),
    };

    const saved = await saveKeyword(keywordData);
    return NextResponse.json({ success: true, keyword: saved });
  } catch (error) {
    console.error("Error in POST /api/admin/seo-keywords:", error);
    return NextResponse.json({ success: false, error: "Failed to save SEO keyword" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Keyword ID is required" }, { status: 400 });
    }

    await deleteKeyword(id);
    return NextResponse.json({ success: true, message: "Keyword deleted successfully" });
  } catch (error) {
    console.error("Error in DELETE /api/admin/seo-keywords:", error);
    return NextResponse.json({ success: false, error: "Failed to delete SEO keyword" }, { status: 500 });
  }
}
