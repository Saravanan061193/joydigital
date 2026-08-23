import { NextResponse } from "next/server";

export async function GET() {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    return NextResponse.json({
      summary: { totalUsers: 0, totalUses: 0, totalLeads: 0, totalDownloads: 0, totalCtaClicks: 0 },
      toolAnalytics: [],
      userActivities: [],
      leads: []
    });
  }

  try {
    const { getDb } = await import("@/lib/mongodb");
    const db = await getDb();

    // 1. Fetch Users
    const users = await db.collection("tool_users").find({}).sort({ lastActivityAt: -1 }).toArray();

    // 2. Fetch Events
    const events = await db.collection("tool_events").find({}).sort({ createdAt: -1 }).limit(100).toArray();

    // 3. Fetch Leads generated from tools (enquiries where source contains 'Tool' or 'Generator')
    const enquiries = await db.collection("enquiries")
      .find({
        $or: [
          { source: { $regex: /Tool/i } },
          { source: { $regex: /Generator/i } }
        ]
      })
      .sort({ createdAt: -1 })
      .toArray();

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

    // Calculate Tool Analytics (Per-tool uses, downloads, leads, cta clicks)
    const toolMap: Record<string, { tool: string; uses: number; downloads: number; leads: number; ctaClicks: number }> = {
      "GST Calculator": { tool: "GST Calculator", uses: 0, downloads: 0, leads: 0, ctaClicks: 0 },
      "Quotation Generator": { tool: "Quotation Generator", uses: 0, downloads: 0, leads: 0, ctaClicks: 0 },
      "Invoice Generator": { tool: "Invoice Generator", uses: 0, downloads: 0, leads: 0, ctaClicks: 0 },
      "QR Code Generator": { tool: "QR Code Generator", uses: 0, downloads: 0, leads: 0, ctaClicks: 0 },
      "WhatsApp Link Generator": { tool: "WhatsApp Link Generator", uses: 0, downloads: 0, leads: 0, ctaClicks: 0 }
    };

    // Populate usage stats from users first
    users.forEach((u: any) => {
      if (u.firstTool && toolMap[u.firstTool]) {
        // Estimate per-tool distribution
        toolMap[u.firstTool].uses += u.uses || 0;
        toolMap[u.firstTool].downloads += u.downloads || 0;
        toolMap[u.firstTool].ctaClicks += u.ctaClicks || 0;
      }
    });

    // Cross-verify with event logs to get exact counts per tool
    // Reset map counts first for exact calculations from granular logs
    Object.keys(toolMap).forEach(k => {
      toolMap[k].uses = 0;
      toolMap[k].downloads = 0;
      toolMap[k].ctaClicks = 0;
    });

    // Granular aggregation from event logs
    const allEvents = await db.collection("tool_events").find({}).toArray();
    allEvents.forEach((ev: any) => {
      const tool = ev.toolName;
      if (tool && toolMap[tool]) {
        if (ev.action === "tool_start" || ev.action === "tool_view") {
          toolMap[tool].uses += 1;
        }
        if (ev.action === "pdf_download" || ev.action === "qr_generate") {
          toolMap[tool].downloads += 1;
        }
        if (ev.action === "cta_click") {
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
      leads
    });

  } catch (error: any) {
    console.error("Error fetching admin tools analytics:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
