import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/security/auth";
import { hasPermission } from "@/lib/security/rbac";
import { getAuditLogs } from "@/lib/security/auditLog";

export async function GET() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const session = verifySessionToken(sessionToken);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!hasPermission(session.role, "audit.view") && session.role !== "Super Admin" && session.role !== "Manager") {
    return NextResponse.json({ error: "Access Denied" }, { status: 403 });
  }

  const logs = await getAuditLogs(100);
  return NextResponse.json(logs);
}
