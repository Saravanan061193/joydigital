import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getDb } from "@/lib/mongodb";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/security/auth";
import { hasPermission } from "@/lib/security/rbac";
import { logAuditEvent } from "@/lib/security/auditLog";
import { getClientIp } from "@/lib/security/rateLimit";
import { SettingsSchema } from "@/lib/security/validation";

async function authenticateSettingsRequest(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const session = verifySessionToken(token);

  if (!session) {
    return { authenticated: false, session: null, response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }

  if (!hasPermission(session.role, "settings.manage") && session.role !== "Super Admin") {
    return { authenticated: false, session, response: NextResponse.json({ error: "Access Denied. Only Super Admin can manage system settings." }, { status: 403 }) };
  }

  return { authenticated: true, session, response: null };
}

// GET: Retrieve Cloudinary configuration (Secret masked for security)
export async function GET(req: NextRequest) {
  const auth = await authenticateSettingsRequest(req);
  if (!auth.authenticated) return auth.response!;

  try {
    if (!process.env.MONGODB_URI) {
      return NextResponse.json({ error: "Database not configured." }, { status: 500 });
    }

    const db = await getDb();
    const config = await db.collection("settings").findOne({ _id: "cloudinary_config" as any });

    if (!config) {
      return NextResponse.json({ cloudName: "", apiKey: "", apiSecret: "" });
    }

    // Mask secret in response
    const secret = config.apiSecret || "";
    const maskedSecret = secret ? `${secret.substring(0, 4)}••••••••${secret.substring(Math.max(0, secret.length - 4))}` : "";

    return NextResponse.json({
      cloudName: config.cloudName || "",
      apiKey: config.apiKey || "",
      apiSecret: maskedSecret,
    });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to fetch settings." }, { status: 500 });
  }
}

// POST: Save/Update Cloudinary configuration
export async function POST(req: NextRequest) {
  const auth = await authenticateSettingsRequest(req);
  if (!auth.authenticated) return auth.response!;

  try {
    if (!process.env.MONGODB_URI) {
      return NextResponse.json({ error: "Database not configured." }, { status: 500 });
    }

    const rawBody = await req.json();
    const parseResult = SettingsSchema.safeParse(rawBody);

    if (!parseResult.success) {
      return NextResponse.json({ error: "Invalid configuration payload" }, { status: 400 });
    }

    const { cloudName, apiKey, apiSecret } = parseResult.data;

    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json({ error: "All configuration fields are required." }, { status: 400 });
    }

    const db = await getDb();
    await db.collection("settings").updateOne(
      { _id: "cloudinary_config" as any },
      {
        $set: {
          cloudName: cloudName.trim(),
          apiKey: apiKey.trim(),
          apiSecret: apiSecret.trim(),
          updatedAt: new Date(),
        },
      },
      { upsert: true }
    );

    await logAuditEvent({
      userId: auth.session!.userId,
      username: auth.session!.username,
      role: auth.session!.role,
      action: "UPDATE_SYSTEM_SETTINGS",
      resource: "settings",
      status: "SUCCESS",
      ipAddress: getClientIp(req),
    });

    return NextResponse.json({ success: true, message: "Settings updated successfully." });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to save settings." }, { status: 500 });
  }
}
