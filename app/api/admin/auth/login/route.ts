import { NextResponse } from "next/server";
import { validateAdminCredential, createSessionToken, SESSION_COOKIE_NAME, SESSION_MAX_AGE_SECONDS } from "@/lib/security/auth";
import { checkRateLimit, getClientIp } from "@/lib/security/rateLimit";
import { logAuditEvent } from "@/lib/security/auditLog";
import { getRolePermissions } from "@/lib/security/rbac";
import { LoginSchema } from "@/lib/security/validation";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const userAgent = request.headers.get("user-agent") || "unknown";

  // 1. Enforce Rate Limiting (5 attempts per 15 mins)
  const rateLimitResult = checkRateLimit(`login:${ip}`, {
    windowMs: 15 * 60 * 1000,
    max: 5,
    lockoutMs: 15 * 60 * 1000,
  });

  if (!rateLimitResult.success) {
    await logAuditEvent({
      userId: "anonymous",
      username: "unknown",
      role: "unknown",
      action: "LOGIN_LOCKOUT",
      resource: "auth",
      status: "DENIED",
      ipAddress: ip,
      userAgent,
      details: { message: "Too many failed attempts. Account locked temporarily." },
    });

    return NextResponse.json(
      {
        error: `Too many login attempts. Account locked temporarily. Try again in ${Math.ceil(rateLimitResult.resetMs / 60000)} minutes.`,
      },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const parseResult = LoginSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Invalid credentials format" },
        { status: 400 }
      );
    }

    const { pin } = parseResult.data;

    // 2. Validate Credentials
    const authResult = await validateAdminCredential(pin);

    if (!authResult.valid) {
      await logAuditEvent({
        userId: "anonymous",
        username: "unknown",
        role: "unknown",
        action: "LOGIN_FAILED",
        resource: "auth",
        status: "FAILED",
        ipAddress: ip,
        userAgent,
      });

      return NextResponse.json(
        { error: "Invalid access credentials. Please try again." },
        { status: 401 }
      );
    }

    // 3. Generate Session Token
    const permissions = getRolePermissions(authResult.role);
    const sessionToken = createSessionToken({
      userId: "usr_admin_1",
      username: authResult.username,
      email: authResult.email,
      role: authResult.role,
      permissions,
    });

    // 4. Record Audit Log
    await logAuditEvent({
      userId: "usr_admin_1",
      username: authResult.username,
      role: authResult.role,
      action: "LOGIN_SUCCESS",
      resource: "auth",
      status: "SUCCESS",
      ipAddress: ip,
      userAgent,
    });

    // 5. Respond with HTTP-Only Cookie
    const response = NextResponse.json({
      success: true,
      user: {
        username: authResult.username,
        email: authResult.email,
        role: authResult.role,
        permissions,
      },
    });

    const isProduction = process.env.NODE_ENV === "production";

    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: sessionToken,
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      maxAge: SESSION_MAX_AGE_SECONDS,
      path: "/",
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { error: "Authentication failed. Please try again." },
      { status: 500 }
    );
  }
}
