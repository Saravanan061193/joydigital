import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "chat_sessions.json");
const ENQUIRIES_FILE = path.join(process.cwd(), "data", "enquiries.json");

// Helpers to read/write local chat sessions (fallback)
function readLocalChatSessions() {
  if (!fs.existsSync(DATA_FILE)) return [];
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  } catch (e) {
    return [];
  }
}

function writeLocalChatSessions(data: any) {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

// Helpers to write enquiries locally (fallback)
function readLocalEnquiries() {
  if (!fs.existsSync(ENQUIRIES_FILE)) return [];
  try {
    return JSON.parse(fs.readFileSync(ENQUIRIES_FILE, "utf-8"));
  } catch (e) {
    return [];
  }
}

function writeLocalEnquiries(data: any) {
  fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { sessionId, messages, leadDetails } = body;

    if (!sessionId) {
      return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });
    }

    const MONGODB_URI = process.env.MONGODB_URI;
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

    // 1. If leadDetails is present (from callback form), create a lead in enquiries linked to this chatSessionId
    let createdLeadId = "";
    if (leadDetails) {
      const newLead = {
        id: crypto.randomUUID(),
        name: leadDetails.name,
        companyName: "N/A",
        website: "N/A",
        email: leadDetails.email || "no-email@chat.com",
        mobile: leadDetails.mobile,
        service: leadDetails.service || "AI Chatbot Inquiry",
        message: leadDetails.message || `Callback request from AI Chat. Session Reference: ${sessionId}`,
        source: "AI Chatbot Widget",
        region: "GLOBAL",
        status: "New",
        createdAt: new Date().toISOString(),
        notes: "Lead registered via floating chatbot callback form.",
        pipelineStage: "new",
        assignedTo: "",
        chatSessionId: sessionId,
        activities: [
          {
            id: crypto.randomUUID(),
            timestamp: new Date().toISOString(),
            type: "created",
            message: "Lead automatically captured via AI Chat callback form",
            agent: "System AI"
          }
        ]
      };

      createdLeadId = newLead.id;

      if (MONGODB_URI) {
        try {
          const { getDb } = await import("@/lib/mongodb");
          const db = await getDb();
          await db.collection("enquiries").insertOne({
            _id: newLead.id as any,
            ...newLead
          });
        } catch (dbError) {
          console.error("Failed saving chatbot lead to MongoDB, fallback to local:", dbError);
          const enquiries = readLocalEnquiries();
          enquiries.unshift(newLead);
          writeLocalEnquiries(enquiries);
        }
      } else {
        const enquiries = readLocalEnquiries();
        enquiries.unshift(newLead);
        writeLocalEnquiries(enquiries);
      }
    }

    // 2. Scan conversation history for phone number to auto-capture leads in background
    const phoneRegex = /(\+?\d{1,4}[-.\s]??)?(\d{10})/g;
    const userMsgs = (messages || []).filter((m: any) => m.role === "user");
    const allUserTexts = userMsgs.map((m: any) => m.text).join(" ");
    const matches = allUserTexts.match(phoneRegex);
    
    if (matches && matches.length > 0 && !leadDetails) {
      // Check if we already created a lead for this chat session
      let existingLead = null;
      if (MONGODB_URI) {
        try {
          const { getDb } = await import("@/lib/mongodb");
          const db = await getDb();
          existingLead = await db.collection("enquiries").findOne({ chatSessionId: sessionId });
        } catch (e) {}
      } else {
        const enquiries = readLocalEnquiries();
        existingLead = enquiries.find((e: any) => e.chatSessionId === sessionId);
      }
      
      if (!existingLead) {
        // Find custom name if shared
        let clientName = "Visitor via AI Chat";
        if (userMsgs.length >= 2) {
          // If a message is short and doesn't contain standard keywords, it might be the name
          for (let i = 0; i < Math.min(3, userMsgs.length); i++) {
            const txt = userMsgs[i].text;
            const textClean = txt.replace(/my name is|i am|i'm|hello|hi|hey/gi, "").trim();
            if (textClean && textClean.split(" ").length <= 3 && !textClean.match(/\d/)) {
              clientName = textClean;
              break;
            }
          }
        }
        
        const autoLead = {
          id: crypto.randomUUID(),
          name: clientName,
          companyName: "N/A",
          website: "N/A",
          email: "no-email@chat.com",
          mobile: matches[0],
          service: "AI Chat Conversational Inbound",
          message: `Lead automatically captured from AI chatbot conversation history.\nFull transcript ID: ${sessionId}`,
          source: "AI Chatbot Widget",
          region: "GLOBAL",
          status: "New",
          createdAt: new Date().toISOString(),
          notes: "Lead auto-generated by AI scanning phone number in chat history.",
          pipelineStage: "new",
          assignedTo: "",
          chatSessionId: sessionId,
          activities: [
            {
              id: crypto.randomUUID(),
              timestamp: new Date().toISOString(),
              type: "created",
              message: "Lead automatically captured via conversational phone match",
              agent: "System AI"
            }
          ]
        };

        if (MONGODB_URI) {
          try {
            const { getDb } = await import("@/lib/mongodb");
            const db = await getDb();
            await db.collection("enquiries").insertOne({
              _id: autoLead.id as any,
              ...autoLead
            });
            createdLeadId = autoLead.id;
          } catch (dbError) {
            const enquiries = readLocalEnquiries();
            enquiries.unshift(autoLead);
            writeLocalEnquiries(enquiries);
          }
        } else {
          const enquiries = readLocalEnquiries();
          enquiries.unshift(autoLead);
          writeLocalEnquiries(enquiries);
        }
      }
    }

    // 3. Generate Bot Response
    let botReply = "";

    if (GEMINI_API_KEY) {
      try {
        const systemPrompt = `You are Priya, a friendly, warm, and highly professional client support assistant at Joy Digital, a premium web design and SEO agency. Act as a human assistant, NOT a robot.
        
        Converse naturally, using warm human expressions (like 😊, 👍, or "Sure!"). You can use friendly English mixed with light Tamil/Tanglish expressions if the user speaks in Tamil or asks questions.
        
        Goal:
        - Chat naturally, answer their questions briefly (1-2 sentences at a time). Do NOT dump long list walls or bullet lists.
        - Politely ask for their name early in the conversation if they haven't shared it.
        - Once you know their name, ask what service they are interested in (Web Design, E-commerce, or SEO).
        - Politely ask for their Mobile Phone number and Email address so Saravanan (the agency head) can contact them directly.
        - Once they share their phone/mobile number, confirm you have logged it and say: "Great! I have registered your callback request in our system. Saravanan from our tech team will call you shortly!"
        
        Agency Pricing Packages:
        - Corporate Websites: Starting from ₹20,000 (Built with Next.js/Tailwind).
        - Headless E-commerce Stores: Starting from ₹45,000.
        - Custom Apps/Dashboards: Starting from ₹60,000.
        - SEO Optimization: Keyword ranking and search audits.
        - Location: Chennai, Tamil Nadu, India.
        
        Rules:
        - Never state you are an AI or language model. If asked, say you are Priya from the Joy Digital client support desk.
        - Do not output tables. Keep responses conversational, short, and engaging.
        - Ask one follow-up question per response to guide them to share contact info.`;

        // Map messages history to Gemini role formats (user / model)
        const contents = (messages || []).map((m: any) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content || m.text }]
        }));

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              systemInstruction: {
                parts: [{ text: systemPrompt }]
              },
              contents: contents
            })
          }
        );

        if (response.ok) {
          const resData = await response.json();
          botReply = resData.candidates?.[0]?.content?.parts?.[0]?.text || "I apologize, but I couldn't generate content right now.";
        } else {
          const errorText = await response.text();
          console.error("Gemini API Error details:", errorText);
          botReply = "I am having some connection delays with my core services. Please request a callback or try again later!";
        }
      } catch (geminiError) {
        console.error("Error calling Gemini API:", geminiError);
        botReply = "I am temporarily offline. Please use the 'Request Callback' quick reply button above to leave your contact info!";
      }
    } else {
      // 4. MOCK HUMAN DECISION CONVERSATION FLOW (Offline Fallback for development review)
      const lastUserText = userMsgs[userMsgs.length - 1]?.text || "";
      const lastUserTextLower = lastUserText.toLowerCase().trim();
      const assistantMsgs = (messages || []).filter((m: any) => m.role === "assistant");
      const hasPhone = phoneRegex.test(lastUserText);

      if (hasPhone) {
        botReply = `Awesome! I have logged your number. Saravanan from our tech team will reach out to you within 2 hours. Have a wonderful day! 👍`;
      } else if (lastUserTextLower.includes("web packages") || lastUserTextLower.includes("web design") || lastUserTextLower.includes("price") || lastUserTextLower.includes("package")) {
        botReply = "Sure! We offer Next.js corporate design packages starting at ₹20,000, and E-commerce stores at ₹45,000. May I know your name and mobile number to WhatsApp you our full brochure?";
      } else if (lastUserTextLower.includes("seo") || lastUserTextLower.includes("google seo") || lastUserTextLower.includes("rank")) {
        botReply = "We specialize in keyword audits and Google Business ranking to get you Page 1 traffic. May I know your name and mobile number to discuss an audit report?";
      } else if (lastUserTextLower.includes("who runs") || lastUserTextLower.includes("founder") || lastUserTextLower.includes("saravanan") || lastUserTextLower.includes("agency")) {
        botReply = "Joy Digital is founded by Saravanan L and based out of Chennai, serving global clients. We design ultra-fast Next.js websites. May I know your name and what project you are planning?";
      } else {
        const askedName = assistantMsgs.some((m: any) => m.text.toLowerCase().includes("your name") || m.text.toLowerCase().includes("who i'm chatting"));
        const askedPhone = assistantMsgs.some((m: any) => m.text.toLowerCase().includes("phone") || m.text.toLowerCase().includes("mobile") || m.text.toLowerCase().includes("number"));
        
        if (!askedName) {
          botReply = "I'd love to help you with that! Before we discuss, may I know your name first? 😊";
        } else if (!askedPhone) {
          const userName = lastUserText.replace(/my name is|i am|i'm/gi, "").trim();
          botReply = `Nice to meet you, ${userName || "there"}! 👋 Could you share your mobile number? I'll have our expert call you directly to discuss your requirements.`;
        } else {
          botReply = "Got it! Please share your 10-digit mobile number so we can call you back to discuss the packages.";
        }
      }
    }

    // 5. Save the chat session transcript in the database / local file
    const newChatSession = {
      sessionId,
      name: leadDetails?.name || (userMsgs.length >= 2 ? userMsgs[1].text.replace(/my name is|i am|i'm/gi, "").trim().substring(0, 30) : "Anonymous Visitor"),
      email: leadDetails?.email || "",
      mobile: leadDetails?.mobile || (matches ? matches[0] : ""),
      messages: [
        ...(messages || []).map((m: any) => ({
          role: m.role,
          text: m.content || m.text,
          timestamp: new Date().toISOString()
        })),
        {
          role: "assistant",
          text: botReply,
          timestamp: new Date().toISOString()
        }
      ],
      leadId: createdLeadId || "",
      updatedAt: new Date().toISOString()
    };

    if (MONGODB_URI) {
      try {
        const { getDb } = await import("@/lib/mongodb");
        const db = await getDb();
        
        await db.collection("chat_sessions").updateOne(
          { sessionId: sessionId },
          { 
            $set: {
              name: newChatSession.name !== "Anonymous Visitor" ? newChatSession.name : undefined,
              email: newChatSession.email || undefined,
              mobile: newChatSession.mobile || undefined,
              messages: newChatSession.messages,
              leadId: newChatSession.leadId || undefined,
              updatedAt: newChatSession.updatedAt
            },
            $setOnInsert: {
              sessionId: sessionId,
              createdAt: new Date().toISOString()
            }
          },
          { upsert: true }
        );
      } catch (dbError) {
        console.error("Failed saving chat session to MongoDB, fallback to local:", dbError);
        saveLocalChatSession(newChatSession);
      }
    } else {
      saveLocalChatSession(newChatSession);
    }

    return NextResponse.json({ reply: botReply });
  } catch (error: any) {
    console.error("Chatbot API Exception:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Local chat session persistence utility
function saveLocalChatSession(session: any) {
  const sessions = readLocalChatSessions();
  const existingIdx = sessions.findIndex((s: any) => s.sessionId === session.sessionId);
  if (existingIdx > -1) {
    sessions[existingIdx] = {
      ...sessions[existingIdx],
      name: session.name !== "Anonymous Visitor" ? session.name : sessions[existingIdx].name,
      email: session.email || sessions[existingIdx].email,
      mobile: session.mobile || sessions[existingIdx].mobile,
      messages: session.messages,
      leadId: session.leadId || sessions[existingIdx].leadId,
      updatedAt: session.updatedAt
    };
  } else {
    sessions.unshift({
      ...session,
      createdAt: new Date().toISOString()
    });
  }
  writeLocalChatSessions(sessions);
}
