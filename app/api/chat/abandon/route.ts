import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const CONVERSATIONS_FILE = path.join(process.cwd(), "data", "chat_conversations.json");

export async function POST(request: Request) {
  try {
    const { sessionId, lastStepCompleted, messages } = await request.json();
    if (!sessionId) {
      return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });
    }

    const now = new Date().toISOString();
    const MONGODB_URI = process.env.MONGODB_URI;

    if (MONGODB_URI) {
      try {
        const { getDb } = await import("@/lib/mongodb");
        const db = await getDb();
        await db.collection("chat_conversations").updateOne(
          { sessionId },
          {
            $set: {
              abandonedAt: now,
              lastStepCompleted: lastStepCompleted || "welcome",
              messages: messages || [],
            },
            $setOnInsert: {
              conversationId: crypto.randomUUID(),
              startedAt: now,
              sessionId,
            },
          },
          { upsert: true }
        );
      } catch (err) {}
    } else {
      if (!fs.existsSync(path.dirname(CONVERSATIONS_FILE))) {
        fs.mkdirSync(path.dirname(CONVERSATIONS_FILE), { recursive: true });
      }
      let convs = [];
      if (fs.existsSync(CONVERSATIONS_FILE)) {
        try {
          convs = JSON.parse(fs.readFileSync(CONVERSATIONS_FILE, "utf-8"));
        } catch (e) {}
      }
      const existingIdx = convs.findIndex((c: any) => c.sessionId === sessionId);
      if (existingIdx > -1) {
        convs[existingIdx] = {
          ...convs[existingIdx],
          abandonedAt: now,
          lastStepCompleted: lastStepCompleted || "welcome",
          messages: messages || [],
        };
      } else {
        convs.unshift({
          conversationId: crypto.randomUUID(),
          sessionId,
          startedAt: now,
          abandonedAt: now,
          lastStepCompleted: lastStepCompleted || "welcome",
          messages: messages || [],
        });
      }
      fs.writeFileSync(CONVERSATIONS_FILE, JSON.stringify(convs, null, 2), "utf-8");
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
