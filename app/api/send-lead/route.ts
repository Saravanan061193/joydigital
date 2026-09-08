import { NextResponse } from "next/server";
import { sendEmailLeadAlert } from "@/lib/emailAlert";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, mobile, email, service, website, message, source, subject, companyName, budget } = body;

    // Validate inputs
    if (!name || !mobile || !email || !service) {
      return NextResponse.json(
        { success: false, error: "Missing required fields (Name, Mobile, Email, Service)." },
        { status: 400 }
      );
    }

    const emailResult = await sendEmailLeadAlert({
      name,
      mobile,
      email,
      service,
      website,
      companyName,
      budget,
      message,
      source: source || "Standard Form",
    });

    if (!emailResult.success) {
      // Fallback to FormSubmit if Gmail SMTP fails or is unconfigured
      const recipientEmail = process.env.CONTACT_EMAIL || "saravanan061193@gmail.com";
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

      await fetch(`https://formsubmit.co/ajax/${recipientEmail}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(payload)
      });
    }

    return NextResponse.json({ success: true, emailResult });
  } catch (error) {
    const err = error as Error;
    console.error("API Lead Handler Error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to process lead." },
      { status: 500 }
    );
  }
}
