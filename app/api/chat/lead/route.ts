import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { sendEmailLeadAlert } from "@/lib/emailAlert";
import { sendWhatsAppLeadAlert } from "@/lib/whatsappAlert";

const LEADS_FILE = path.join(process.cwd(), "data", "chat_leads.json");
const CONVERSATIONS_FILE = path.join(process.cwd(), "data", "chat_conversations.json");
const ENQUIRIES_FILE = path.join(process.cwd(), "data", "enquiries.json");

function readJsonFile(filePath: string) {
  if (!fs.existsSync(filePath)) return [];
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch (e) {
    return [];
  }
}

function writeJsonFile(filePath: string, data: any) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

function normalizePhoneNumber(phone: string): string {
  const cleaned = phone.replace(/[^\d+]/g, "");
  if (!cleaned) return phone;
  if (/^\d{10}$/.test(cleaned)) {
    return `+91${cleaned}`;
  }
  return cleaned.startsWith("+") ? cleaned : `+${cleaned}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      sessionId,
      service,
      subService,
      websiteType,
      improvements,
      budget,
      timeline,
      websiteUrl,
      targetLocation,
      targetMarket,
      hasWebsite,
      marketingService,
      monthlyBudget,
      quotationService,
      requirement,
      questionCategory,
      businessName,
      name,
      phone,
      email,
      pageUrl,
      messages,
    } = body;

    // 1. Server-side validation
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (!phone || typeof phone !== "string" || !phone.trim()) {
      return NextResponse.json({ error: "WhatsApp / Phone number is required" }, { status: 400 });
    }

    const cleanPhone = normalizePhoneNumber(phone.trim());
    if (cleanPhone.length < 8 || cleanPhone.length > 20) {
      return NextResponse.json({ error: "Invalid phone number format" }, { status: 400 });
    }

    let cleanEmail = (email || "").trim();
    if (cleanEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      cleanEmail = "";
    }

    const cleanRequirement = (requirement || "").substring(0, 1500);
    const cleanBusiness = (businessName || "N/A").substring(0, 200);

    const leadId = crypto.randomUUID();
    const now = new Date().toISOString();

    const leadRecord = {
      id: leadId,
      createdAt: now,
      updatedAt: now,
      name: name.trim().substring(0, 100),
      businessName: cleanBusiness,
      phone: cleanPhone,
      email: cleanEmail || "N/A",
      service: service || "General Inquiry",
      subService: subService || websiteType || marketingService || quotationService || "N/A",
      budget: budget || monthlyBudget || "N/A",
      timeline: timeline || "N/A",
      websiteUrl: websiteUrl || "N/A",
      targetLocation: targetLocation || targetMarket || "N/A",
      requirement: cleanRequirement || `Inquiry for ${service || "Web Services"}`,
      conversationStatus: "completed",
      leadSource: "website_chatbot",
      pageUrl: pageUrl || "https://joydigital.in",
      whatsappClicked: false,
      whatsappClickedAt: null,
      status: "new",
      notes: "Lead generated via Joy Digital interactive Chatbot widget.",
      sessionId: sessionId || "",
    };

    // Duplicate standard enquiry record for main admin panel compatibility
    const standardEnquiry = {
      id: leadId,
      name: leadRecord.name,
      companyName: leadRecord.businessName,
      website: leadRecord.websiteUrl,
      email: leadRecord.email,
      mobile: leadRecord.phone,
      service: `${leadRecord.service} (${leadRecord.subService})`,
      message: `[Chatbot Lead]\nBudget: ${leadRecord.budget}\nTimeline: ${leadRecord.timeline}\nTarget Location/Market: ${leadRecord.targetLocation}\nRequirement: ${leadRecord.requirement}`,
      source: "website_chatbot",
      region: leadRecord.targetLocation || "GLOBAL",
      status: "New",
      createdAt: now,
      notes: "Interactive chatbot enquiry",
      pipelineStage: "new",
      assignedTo: "",
      chatSessionId: sessionId || "",
      activities: [
        {
          id: crypto.randomUUID(),
          timestamp: now,
          type: "created",
          message: "Lead created via chatbot flow",
          agent: "Chatbot",
        },
      ],
    };

    const MONGODB_URI = process.env.MONGODB_URI;

    if (MONGODB_URI) {
      try {
        const { getDb } = await import("@/lib/mongodb");
        const db = await getDb();

        await db.collection("chat_leads").insertOne({ _id: leadId as any, ...leadRecord });
        await db.collection("enquiries").insertOne({ _id: leadId as any, ...standardEnquiry });

        if (sessionId && Array.isArray(messages) && messages.length > 0) {
          await db.collection("chat_conversations").updateOne(
            { sessionId },
            {
              $set: {
                leadId,
                sessionId,
                messages,
                completedAt: now,
              },
              $setOnInsert: {
                conversationId: crypto.randomUUID(),
                startedAt: now,
              },
            },
            { upsert: true }
          );
        }
      } catch (dbErr) {
        console.error("MongoDB lead insertion error, saving locally:", dbErr);
        saveLocally(leadRecord, standardEnquiry, sessionId, messages, now);
      }
    } else {
      saveLocally(leadRecord, standardEnquiry, sessionId, messages, now);
    }

    // Trigger alerts (non-blocking)
    sendEmailLeadAlert({
      name: leadRecord.name,
      mobile: leadRecord.phone,
      email: leadRecord.email,
      service: leadRecord.service,
      website: leadRecord.websiteUrl,
      companyName: leadRecord.businessName,
      budget: leadRecord.budget,
      message: leadRecord.requirement,
      source: "website_chatbot",
    }).catch((e) => console.error("Email alert failed:", e));

    sendWhatsAppLeadAlert({
      name: leadRecord.name,
      mobile: leadRecord.phone,
      email: leadRecord.email,
      service: leadRecord.service,
      companyName: leadRecord.businessName,
      budget: leadRecord.budget,
      message: leadRecord.requirement,
      region: leadRecord.targetLocation,
      createdAt: now,
    }).catch((e) => console.error("WhatsApp alert failed:", e));

    return NextResponse.json({
      success: true,
      leadId,
      message: "Lead recorded successfully",
    });
  } catch (error: any) {
    console.error("POST /api/chat/lead Error:", error);
    return NextResponse.json({ error: error.message || "Server Error" }, { status: 500 });
  }
}

function saveLocally(
  leadRecord: any,
  standardEnquiry: any,
  sessionId: string,
  messages: any[],
  now: string
) {
  const leads = readJsonFile(LEADS_FILE);
  leads.unshift(leadRecord);
  writeJsonFile(LEADS_FILE, leads);

  const enquiries = readJsonFile(ENQUIRIES_FILE);
  enquiries.unshift(standardEnquiry);
  writeJsonFile(ENQUIRIES_FILE, enquiries);

  if (sessionId && Array.isArray(messages) && messages.length > 0) {
    const convs = readJsonFile(CONVERSATIONS_FILE);
    const existingIdx = convs.findIndex((c: any) => c.sessionId === sessionId);
    if (existingIdx > -1) {
      convs[existingIdx] = {
        ...convs[existingIdx],
        leadId: leadRecord.id,
        messages,
        completedAt: now,
      };
    } else {
      convs.unshift({
        conversationId: crypto.randomUUID(),
        leadId: leadRecord.id,
        sessionId,
        messages,
        startedAt: now,
        completedAt: now,
      });
    }
    writeJsonFile(CONVERSATIONS_FILE, convs);
  }
}
