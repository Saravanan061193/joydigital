import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { path, referrer } = body;

    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      return NextResponse.json({ success: false, error: "Database not configured." }, { status: 500 });
    }

    const headers = request.headers;
    const userAgent = headers.get("user-agent") || "Unknown";

    // Resolve Geolocation using Vercel Headers
    let country = headers.get("x-vercel-ip-country") || "IN";
    let region = headers.get("x-vercel-ip-country-region") || "TN";
    let city = headers.get("x-vercel-ip-city") || "Chennai";
    let latStr = headers.get("x-vercel-ip-latitude");
    let lngStr = headers.get("x-vercel-ip-longitude");

    let lat = latStr ? parseFloat(latStr) : 13.0827;
    let lng = lngStr ? parseFloat(lngStr) : 80.2707;

    // Local development fallback
    const isLocalhost = request.url.includes("localhost") || request.url.includes("127.0.0.1");
    if (isLocalhost && !headers.get("x-vercel-ip-city")) {
      // Mock some variation for local testing coordinates (e.g., Chennai area)
      const offset = (Math.random() - 0.5) * 0.05;
      lat = 13.0827 + offset;
      lng = 80.2707 + offset;
      city = "Chennai (Local Test)";
      region = "Tamil Nadu";
      country = "IN";
    }

    // Connect to MongoDB and save
    const { getDb } = await import("@/lib/mongodb");
    const db = await getDb();

    const pageview = {
      id: crypto.randomUUID(),
      path: path || "/",
      referrer: referrer || "Direct",
      city,
      region,
      country,
      lat,
      lng,
      userAgent,
      createdAt: new Date().toISOString()
    };

    await db.collection("pageviews").insertOne(pageview);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error in analytics tracking route:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
