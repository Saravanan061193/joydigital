import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

// GET: Retrieve Cloudinary configuration
export async function GET(req: NextRequest) {
  try {
    if (!process.env.MONGODB_URI) {
      return NextResponse.json({ error: "Database not configured." }, { status: 500 });
    }

    const db = await getDb();
    const config = await db.collection("settings").findOne({ _id: "cloudinary_config" as any });

    if (!config) {
      return NextResponse.json({ cloudName: "", apiKey: "", apiSecret: "" });
    }

    return NextResponse.json({
      cloudName: config.cloudName || "",
      apiKey: config.apiKey || "",
      apiSecret: config.apiSecret || "",
    });
  } catch (error: any) {
    console.error("Error fetching Cloudinary settings:", error);
    return NextResponse.json({ error: "Failed to fetch settings." }, { status: 500 });
  }
}

// POST: Save/Update Cloudinary configuration
export async function POST(req: NextRequest) {
  try {
    if (!process.env.MONGODB_URI) {
      return NextResponse.json({ error: "Database not configured." }, { status: 500 });
    }

    const { cloudName, apiKey, apiSecret } = await req.json();

    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json({ error: "All configuration fields are required." }, { status: 400 });
    }

    const db = await getDb();
    await db.collection("settings").updateOne(
      { _id: "cloudinary_config" as any },
      {
        $set: {
          cloudName: cloudName.trim(),
          apiKey: apiKey.trim(),
          apiSecret: apiSecret.trim(),
          updatedAt: new Date(),
        },
      },
      { upsert: true }
    );

    return NextResponse.json({ success: true, message: "Settings updated successfully." });
  } catch (error: any) {
    console.error("Error saving Cloudinary settings:", error);
    return NextResponse.json({ error: "Failed to save settings." }, { status: 500 });
  }
}
