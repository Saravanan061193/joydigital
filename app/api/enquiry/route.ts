import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

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
      message: body.Message || body.message || "N/A",
      source: body.Source || body.source || "N/A",
      region: body.TargetRegion || body.region || "GLOBAL",
      status: "New",
      createdAt: new Date().toISOString(),
      notes: ""
    };

    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

    if (SUPABASE_URL && SUPABASE_ANON_KEY) {
      // 1. Save to Supabase Cloud Database via REST
      try {
        const dbRes = await fetch(`${SUPABASE_URL}/rest/v1/enquiries`, {
          method: "POST",
          headers: {
            "apikey": SUPABASE_ANON_KEY,
            "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
            "Content-Type": "application/json",
            "Prefer": "return=representation"
          },
          body: JSON.stringify({
            id: newEnquiry.id,
            name: newEnquiry.name,
            company_name: newEnquiry.companyName,
            website: newEnquiry.website,
            email: newEnquiry.email,
            mobile: newEnquiry.mobile,
            service: newEnquiry.service,
            message: newEnquiry.message,
            source: newEnquiry.source,
            region: newEnquiry.region,
            status: newEnquiry.status,
            created_at: newEnquiry.createdAt,
            notes: ""
          })
        });
        if (!dbRes.ok) {
          throw new Error(`Supabase returned status ${dbRes.status}: ${await dbRes.text()}`);
        }
      } catch (dbError) {
        console.error("Failed to save to Supabase Cloud Database:", dbError);
      }
    } else {
      // 2. Attempt to save locally in data/enquiries.json (for local runs)
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
    
    // 3. Forward to FormSubmit.co server-side so owner still receives email
    try {
      await fetch("https://formsubmit.co/ajax/saravanan061193@gmail.com", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(body),
      });
    } catch (formSubmitError) {
      console.error("Error forwarding submission to FormSubmit.co:", formSubmitError);
    }
    
    return NextResponse.json({ success: true, id: newEnquiry.id });
  } catch (error: any) {
    console.error("Error in enquiry submission API:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
