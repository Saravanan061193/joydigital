import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const LEADS_FILE = path.join(process.cwd(), "data", "chat_leads.json");

export async function POST(request: Request) {
  try {
    const { leadId } = await request.json();
    if (!leadId) {
      return NextResponse.json({ error: "Missing leadId" }, { status: 400 });
    }

    const now = new Date().toISOString();
    const MONGODB_URI = process.env.MONGODB_URI;

    if (MONGODB_URI) {
      try {
        const { getDb } = await import("@/lib/mongodb");
        const db = await getDb();
        await db.collection("chat_leads").updateOne(
          { id: leadId },
          { $set: { whatsappClicked: true, whatsappClickedAt: now } }
        );
      } catch (err) {
        console.error("Failed to update whatsapp click in MongoDB:", err);
      }
    } else {
      if (fs.existsSync(LEADS_FILE)) {
        try {
          const leads = JSON.parse(fs.readFileSync(LEADS_FILE, "utf-8"));
          const idx = leads.findIndex((l: any) => l.id === leadId);
          if (idx > -1) {
            leads[idx].whatsappClicked = true;
            leads[idx].whatsappClickedAt = now;
            fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
          }
        } catch (e) {}
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
