import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "enquiries.json");

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // 1. Create directory if not exists
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    
    // 2. Read existing enquiries
    let enquiries = [];
    if (fs.existsSync(DATA_FILE)) {
      try {
        const fileContent = fs.readFileSync(DATA_FILE, "utf-8");
        enquiries = JSON.parse(fileContent);
      } catch (e) {
        console.error("Error parsing existing enquiries file:", e);
      }
    }
    
    // 3. Construct new lead record
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
    };
    
    // 4. Save to JSON file (newest leads first)
    enquiries.unshift(newEnquiry);
    fs.writeFileSync(DATA_FILE, JSON.stringify(enquiries, null, 2), "utf-8");
    
    // 5. Forward to FormSubmit.co server-side so owner still receives email
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
      // Do not crash the API response since the data is successfully stored locally
    }
    
    return NextResponse.json({ success: true, id: newEnquiry.id });
  } catch (error: any) {
    console.error("Error in enquiry submission API:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
