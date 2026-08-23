import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function GET() {
  const MONGODB_URI = process.env.MONGODB_URI;
  
  // Local file reading helper
  const readLocalFeedback = async () => {
    try {
      const filePath = path.join(process.cwd(), "data", "tool_feedback.json");
      const fileContent = await fs.readFile(filePath, "utf-8");
      const feedback = JSON.parse(fileContent);
      return feedback.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } catch (err) {
      return [];
    }
  };

  if (!MONGODB_URI) {
    const feedbackList = await readLocalFeedback();
    return NextResponse.json({
      summary: { totalUsers: 0, totalUses: 0, totalLeads: 0, totalDownloads: 0, totalCtaClicks: 0 },
      toolAnalytics: [],
      userActivities: [],
      leads: [],
      feedback: feedbackList
    });
  }

  try {
    const { getDb } = await import("@/lib/mongodb");
    const db = await getDb();

    // 1. Fetch Users
    const users = await db.collection("tool_users").find({}).sort({ lastActivityAt: -1 }).toArray();

    // 2. Fetch Events
    const events = await db.collection("tool_events").find({}).sort({ createdAt: -1 }).limit(100).toArray();

    // 3. Fetch Leads
    const enquiries = await db.collection("enquiries")
      .find({
        $or: [
          { source: { $regex: /Tool/i } },
          { source: { $regex: /Generator/i } }
        ]
      })
      .sort({ createdAt: -1 })
      .toArray();

    // 4. Fetch Feedback
    let feedback: any[] = [];
    try {
      feedback = await db.collection("tool_feedback").find({}).sort({ createdAt: -1 }).toArray();
    } catch (dbErr) {
      console.error("MongoDB feedback fetch failed, falling back to local file:", dbErr);
      feedback = await readLocalFeedback();
    }

    if (feedback.length === 0) {
      feedback = await readLocalFeedback();
    }

    // Calculate Summary Metrics
    let totalUses = 0;
    let totalDownloads = 0;
    let totalCtaClicks = 0;

    users.forEach((u: any) => {
      totalUses += u.uses || 0;
      totalDownloads += u.downloads || 0;
      totalCtaClicks += u.ctaClicks || 0;
    });

    const summary = {
      totalUsers: users.length,
      totalUses,
      totalLeads: enquiries.length,
      totalDownloads,
      totalCtaClicks,
    };

    // Calculate Tool Analytics
    const toolMap: Record<string, { tool: string; uses: number; downloads: number; leads: number; ctaClicks: number }> = {
      "GST Calculator": { tool: "GST Calculator", uses: 0, downloads: 0, leads: 0, ctaClicks: 0 },
      "Quotation Generator": { tool: "Quotation Generator", uses: 0, downloads: 0, leads: 0, ctaClicks: 0 },
      "Invoice Generator": { tool: "Invoice Generator", uses: 0, downloads: 0, leads: 0, ctaClicks: 0 },
      "QR Code Generator": { tool: "QR Code Generator", uses: 0, downloads: 0, leads: 0, ctaClicks: 0 },
      "WhatsApp Link Generator": { tool: "WhatsApp Link Generator", uses: 0, downloads: 0, leads: 0, ctaClicks: 0 }
    };

    // Granular aggregation from event logs
    const allEvents = await db.collection("tool_events").find({}).toArray();
    allEvents.forEach((ev: any) => {
      const tool = ev.toolName;
      if (tool && toolMap[tool]) {
        if (ev.action === "tool_start" || ev.action === "tool_view" || ev.action === "gst_calculator_used") {
          toolMap[tool].uses += 1;
        }
        if (ev.action === "pdf_download" || ev.action === "qr_generate" || ev.action === "copy_clicked") {
          toolMap[tool].downloads += 1;
        }
        if (ev.action === "cta_click" || ev.action === "cta_clicked") {
          toolMap[tool].ctaClicks += 1;
        }
      }
    });

    // Add leads per tool mapping
    enquiries.forEach((enq: any) => {
      let matchedTool = "";
      if (enq.source.includes("GST Calculator")) matchedTool = "GST Calculator";
      else if (enq.source.includes("Quotation")) matchedTool = "Quotation Generator";
      else if (enq.source.includes("Invoice")) matchedTool = "Invoice Generator";
      else if (enq.source.includes("QR")) matchedTool = "QR Code Generator";
      else if (enq.source.includes("WhatsApp")) matchedTool = "WhatsApp Link Generator";

      if (matchedTool && toolMap[matchedTool]) {
        toolMap[matchedTool].leads += 1;
      }
    });

    const toolAnalytics = Object.values(toolMap);

    // Mapped leads format
    const leads = enquiries.map((d: any) => ({
      id: d.id || d._id?.toString(),
      name: d.name,
      companyName: d.companyName,
      email: d.email,
      mobile: d.mobile,
      service: d.service,
      message: d.message,
      source: d.source,
      region: d.region,
      status: d.status,
      createdAt: d.createdAt,
      notes: d.notes || "",
      pipelineStage: d.pipelineStage || "new",
      utmParams: d.utmParams || null,
    }));

    return NextResponse.json({
      summary,
      toolAnalytics,
      userActivities: events.map((ev: any) => ({
        id: ev.id,
        anonId: ev.anonId,
        toolName: ev.toolName,
        action: ev.action,
        metadata: ev.metadata || {},
        createdAt: ev.createdAt,
        city: ev.city,
        country: ev.country
      })),
      leads,
      feedback: feedback.map((fb: any) => ({
        id: fb.id || fb._id?.toString(),
        toolName: fb.toolName,
        rating: fb.rating,
        message: fb.message,
        name: fb.name,
        email: fb.email,
        createdAt: fb.createdAt,
        status: fb.status || "new"
      }))
    });

  } catch (error: any) {
    console.error("Error fetching admin tools analytics:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
