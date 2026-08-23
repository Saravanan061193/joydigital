import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { toolName, rating, message, name, email } = body;

    if (!toolName || !rating || !message) {
      return NextResponse.json({ success: false, error: "Missing required fields." }, { status: 400 });
    }

    const timestamp = new Date().toISOString();
    const newFeedback = {
      id: crypto.randomUUID(),
      toolName,
      rating: Number(rating),
      message,
      name: name || "Anonymous",
      email: email || "N/A",
      createdAt: timestamp,
      status: "new"
    };

    const MONGODB_URI = process.env.MONGODB_URI;
    if (MONGODB_URI) {
      try {
        const { getDb } = await import("@/lib/mongodb");
        const db = await getDb();
        await db.collection("tool_feedback").insertOne(newFeedback);
        return NextResponse.json({ success: true, method: "mongodb" });
      } catch (dbErr) {
        console.error("MongoDB feedback save failed, falling back to local file:", dbErr);
      }
    }

    // Local JSON file fallback
    const dataDir = path.join(process.cwd(), "data");
    await fs.mkdir(dataDir, { recursive: true });
    const filePath = path.join(dataDir, "tool_feedback.json");
    
    let currentData = [];
    try {
      const fileContent = await fs.readFile(filePath, "utf-8");
      currentData = JSON.parse(fileContent);
    } catch (e) {
      // file might not exist yet, ignore
    }

    currentData.push(newFeedback);
    await fs.writeFile(filePath, JSON.stringify(currentData, null, 2), "utf-8");

    return NextResponse.json({ success: true, method: "file" });
  } catch (error: any) {
    console.error("Error in tools feedback API:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
