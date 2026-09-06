import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/security/auth";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = request.headers.get("host");

  // 1. Domain Redirect
  if (host === "joydigital.vercel.app") {
    return NextResponse.redirect(`https://joydigital.in${pathname}${request.nextUrl.search}`, 301);
  }

  const response = NextResponse.next();

  // 2. Production Security Headers
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://www.clarity.ms; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com; font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com data:; img-src 'self' data: https: blob:; connect-src 'self' https:;"
  );

  // Enable Strict HSTS in Production
  if (process.env.NODE_ENV === "production") {
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains; preload"
    );
  }

  // 3. Protect Admin API Routes at Edge Proxy Level
  const isProtectedAdminApi =
    pathname.startsWith("/api/admin/") &&
    !pathname.startsWith("/api/admin/auth/login");

  if (isProtectedAdminApi) {
    const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    const session = verifySessionToken(sessionCookie);

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized. Valid authentication session required." },
        { status: 401, headers: response.headers }
      );
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
