import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      anonId,
      toolName,
      action,
      device,
      browser,
      os,
      referrer,
      landingPage,
      utmSource,
      utmMedium,
      utmCampaign,
      metadata
    } = body;

    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      return NextResponse.json({ success: false, error: "Database not configured." }, { status: 500 });
    }

    const headers = request.headers;
    let country = headers.get("x-vercel-ip-country") || "IN";
    let region = headers.get("x-vercel-ip-country-region") || "TN";
    let city = headers.get("x-vercel-ip-city") || "Chennai";

    // Fallback for localhost testing
    const isLocalhost = request.url.includes("localhost") || request.url.includes("127.0.0.1");
    if (isLocalhost && !headers.get("x-vercel-ip-city")) {
      city = "Chennai (Local Test)";
      region = "Tamil Nadu";
      country = "IN";
    }

    const { getDb } = await import("@/lib/mongodb");
    const db = await getDb();

    const timestamp = new Date().toISOString();

    // 1. Log the granular event
    const toolEvent = {
      id: crypto.randomUUID(),
      anonId,
      toolName,
      action,
      metadata,
      createdAt: timestamp,
      city,
      country
    };
    await db.collection("tool_events").insertOne(toolEvent);

    // 2. Upsert the anonymous user profile
    const updateFields: any = {
      lastActivityAt: timestamp,
      device,
      browser,
      os,
      referrer,
      landingPage,
      utmSource,
      utmMedium,
      utmCampaign,
      city,
      region,
      country,
    };

    const incFields: any = {};
    if (action === "tool_start") {
      incFields.uses = 1;
    }
    if (action === "pdf_download") {
      incFields.downloads = 1;
    }
    if (action === "cta_click") {
      incFields.ctaClicks = 1;
    }

    const updateDoc: any = {
      $set: updateFields,
      $setOnInsert: {
        id: anonId,
        createdAt: timestamp,
        firstTool: toolName,
        uses: 0,
        downloads: 0,
        ctaClicks: 0
      }
    };

    if (Object.keys(incFields).length > 0) {
      updateDoc.$inc = incFields;
    }

    await db.collection("tool_users").updateOne(
      { id: anonId },
      updateDoc,
      { upsert: true }
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error in free-tools tracking API:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
