import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "chat_sessions.json");

// Helper to read local chat sessions (fallback)
function readChatSessions() {
  if (!fs.existsSync(DATA_FILE)) {
    return [];
  }
  try {
    const fileContent = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(fileContent);
  } catch (e) {
    console.error("Error reading chat sessions file:", e);
    return [];
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const MONGODB_URI = process.env.MONGODB_URI;

    // 1. Fetch single session transcript details
    if (id) {
      if (MONGODB_URI) {
        try {
          const { getDb } = await import("@/lib/mongodb");
          const db = await getDb();
          const session = await db.collection("chat_sessions").findOne({ sessionId: id });
          
          if (!session) {
            return NextResponse.json({ error: "Session not found" }, { status: 404 });
          }
          
          return NextResponse.json({
            sessionId: session.sessionId,
            name: session.name,
            email: session.email,
            mobile: session.mobile,
            messages: session.messages || [],
            leadId: session.leadId || "",
            createdAt: session.createdAt,
            updatedAt: session.updatedAt
          });
        } catch (e: any) {
          console.error("Error fetching chat session from MongoDB Atlas:", e);
          return NextResponse.json({ error: e.message }, { status: 500 });
        }
      } else {
        const sessions = readChatSessions();
        const session = sessions.find((s: any) => s.sessionId === id);
        
        if (!session) {
          return NextResponse.json({ error: "Session not found" }, { status: 404 });
        }
        
        return NextResponse.json(session);
      }
    }

    // 2. Fetch list of all chat sessions
    if (MONGODB_URI) {
      try {
        const { getDb } = await import("@/lib/mongodb");
        const db = await getDb();
        const sessions = await db.collection("chat_sessions")
          .find({})
          .sort({ updatedAt: -1 })
          .toArray();

        const mapped = sessions.map((s: any) => ({
          sessionId: s.sessionId,
          name: s.name,
          email: s.email,
          mobile: s.mobile,
          messageCount: s.messages ? s.messages.length : 0,
          leadId: s.leadId || "",
          createdAt: s.createdAt || s.updatedAt,
          updatedAt: s.updatedAt
        }));

        return NextResponse.json(mapped);
      } catch (e: any) {
        console.error("Error fetching chat sessions from MongoDB Atlas:", e);
        return NextResponse.json({ error: e.message }, { status: 500 });
      }
    } else {
      const sessions = readChatSessions();
      // Sort newest first by updatedAt
      const sorted = [...sessions].sort((a: any, b: any) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
      
      const mapped = sorted.map((s: any) => ({
        sessionId: s.sessionId,
        name: s.name,
        email: s.email,
        mobile: s.mobile,
        messageCount: s.messages ? s.messages.length : 0,
        leadId: s.leadId || "",
        createdAt: s.createdAt || s.updatedAt,
        updatedAt: s.updatedAt
      }));

      return NextResponse.json(mapped);
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
