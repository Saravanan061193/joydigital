import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/security/auth";
import { logAuditEvent } from "@/lib/security/auditLog";
import { getClientIp } from "@/lib/security/rateLimit";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const session = verifySessionToken(sessionToken);

  if (session) {
    await logAuditEvent({
      userId: session.userId,
      username: session.username,
      role: session.role,
      action: "LOGOUT",
      resource: "auth",
      status: "SUCCESS",
      ipAddress: getClientIp(request),
      userAgent: request.headers.get("user-agent") || "unknown",
    });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: "",
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });

  return response;
}
