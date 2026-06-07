import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, mobile, email, service, website, message, source, subject } = body;

    // Validate inputs
    if (!name || !mobile || !email || !service) {
      return NextResponse.json(
        { success: false, error: "Missing required fields (Name, Mobile, Email, Service)." },
        { status: 400 }
      );
    }

    // Prepare payload formatted for email tables
    const payload = {
      Name: name,
      Mobile: mobile,
      Email: email,
      Service: service,
      Website: website || "N/A",
      Message: message || "No details provided.",
      Source: source || "Standard Form",
      _subject: subject || "New Lead - Joy Digital",
      _captcha: "false",
      _template: "table"
    };

    // Forward to FormSubmit.co service
    const response = await fetch("https://formsubmit.co/ajax/joydiigtals@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("FormSubmit API returned error status:", response.status, errorText);
      throw new Error("FormSubmit delivery failure");
    }

    const result = await response.json();
    return NextResponse.json({ success: true, result });
  } catch (error) {
    const err = error as Error;
    console.error("API Lead Handler Error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to process lead." },
      { status: 500 }
    );
  }
}
