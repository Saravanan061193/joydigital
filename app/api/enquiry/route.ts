import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { sendWhatsAppLeadAlert } from "@/lib/whatsappAlert";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "enquiries.json");

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Construct new lead record
    const newEnquiry = {
      id: crypto.randomUUID(),
      name: body.Name || body.name || "N/A",
      companyName: body.CompanyName || body.companyName || "N/A",
      website: body.Website || body.website || "N/A",
      email: body.Email || body.email || "N/A",
      mobile: body.Mobile || body.mobile || "N/A",
      service: body.Service || body.service || "N/A",
      budget: body.Budget || body.budget || "N/A",
      timeline: body.Timeline || body.timeline || "N/A",
      message: body.Message || body.message || "N/A",
      source: body.Source || body.source || "N/A",
      region: body.TargetRegion || body.region || "GLOBAL",
      status: "New",
      createdAt: new Date().toISOString(),
      notes: "",
      followUpDate: body.followUpDate || null,
      pipelineStage: body.pipelineStage || "new",
      assignedTo: body.assignedTo || "",
      utmParams: body.utmParams || null,
      activities: body.activities || [
        {
          id: crypto.randomUUID(),
          timestamp: new Date().toISOString(),
          type: "created",
          message: "Lead registered in CRM",
          agent: "System"
        }
      ],
      proposals: body.proposals || [],
      irrelevantReason: ""
    };

    let savedToDb = false;
    const MONGODB_URI = process.env.MONGODB_URI;

    if (MONGODB_URI) {
      // 1. Save to MongoDB Atlas
      try {
        const { getDb } = await import("@/lib/mongodb");
        const db = await getDb();
        await db.collection("enquiries").insertOne({
          _id: newEnquiry.id as any,
          id: newEnquiry.id,
          name: newEnquiry.name,
          companyName: newEnquiry.companyName,
          website: newEnquiry.website,
          email: newEnquiry.email,
          mobile: newEnquiry.mobile,
          service: newEnquiry.service,
          budget: newEnquiry.budget,
          timeline: newEnquiry.timeline,
          message: newEnquiry.message,
          source: newEnquiry.source,
          region: newEnquiry.region,
          status: newEnquiry.status,
          createdAt: newEnquiry.createdAt,
          notes: "",
          followUpDate: newEnquiry.followUpDate,
          pipelineStage: newEnquiry.pipelineStage,
          assignedTo: newEnquiry.assignedTo,
          utmParams: newEnquiry.utmParams,
          activities: newEnquiry.activities,
          proposals: newEnquiry.proposals,
          irrelevantReason: ""
        });
        savedToDb = true;
      } catch (dbError: any) {
        console.error("Failed to save to MongoDB Atlas (will attempt local file fallback if available):", dbError);
      }
    }

    // 2. Attempt to save locally in data/enquiries.json as fallback or for local runs
    if (!savedToDb) {
      try {
        if (!fs.existsSync(DATA_DIR)) {
          fs.mkdirSync(DATA_DIR, { recursive: true });
        }
        
        let enquiries = [];
        if (fs.existsSync(DATA_FILE)) {
          try {
            const fileContent = fs.readFileSync(DATA_FILE, "utf-8");
            enquiries = JSON.parse(fileContent);
          } catch (e) {
            console.error("Error parsing existing enquiries file:", e);
          }
        }
        
        enquiries.unshift(newEnquiry);
        fs.writeFileSync(DATA_FILE, JSON.stringify(enquiries, null, 2), "utf-8");
      } catch (fsError) {
        console.warn("Local filesystem write failed (running in read-only environment like Vercel):", fsError);
      }
    }
    
    // 3. Forward to FormSubmit.co server-side so owner receives immediate detailed email alert
    const recipientEmail = process.env.CONTACT_EMAIL || "saravanan061193@gmail.com";
    try {
      const formattedPayload = {
        _subject: `🚨 NEW LEAD INBOUND [${newEnquiry.region}] - ${newEnquiry.name} (${newEnquiry.service})`,
        "Lead Name": newEnquiry.name,
        "Mobile / WhatsApp": newEnquiry.mobile,
        "Email Address": newEnquiry.email,
        "Required Service": newEnquiry.service,
        "Company Name": newEnquiry.companyName,
        "Lead Source": newEnquiry.source,
        "UTM Source": newEnquiry.utmParams?.source || "Direct / Organic",
        "UTM Medium": newEnquiry.utmParams?.medium || "None",
        "UTM Campaign": newEnquiry.utmParams?.campaign || "None",
        "Landing Page": newEnquiry.utmParams?.landingPage || "N/A",
        "Referrer": newEnquiry.utmParams?.referrer || "Direct",
        "Submitted At": newEnquiry.createdAt,
        _captcha: "false",
        _template: "table"
      };

      const emailRes = await fetch(`https://formsubmit.co/ajax/${recipientEmail}`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formattedPayload),
      });
      if (!emailRes.ok) {
        const errorText = await emailRes.text();
        console.warn("FormSubmit response was not ok:", emailRes.status, errorText);
      }
    } catch (formSubmitError) {
      console.error("Error forwarding submission to FormSubmit.co:", formSubmitError);
    }
    
    // 4. Trigger automated WhatsApp lead alert
    try {
      await sendWhatsAppLeadAlert(newEnquiry);
    } catch (waErr) {
      console.error("Error sending automated WhatsApp lead alert:", waErr);
    }

    return NextResponse.json({ success: true, id: newEnquiry.id });
  } catch (error: any) {
    console.error("Error in enquiry submission API:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
