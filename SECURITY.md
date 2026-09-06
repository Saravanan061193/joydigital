# Joy Digital - Enterprise Security Architecture & Compliance Report

This document outlines the security architecture, threat model, authorization mechanics, and production deployment policies implemented for the **Joy Digital** web platform and Admin CRM portal.

---

## 1. Authentication Architecture
- **Session Tokens**: Signed HMAC-SHA256 session tokens stored in `HttpOnly`, `Secure`, `SameSite=Lax` cookies (`joy_admin_session`).
- **Session Lifetime**: 8-hour maximum token lifetime with a 30-minute idle inactivity auto-logout on the frontend.
- **Password Security**: Passwords hashed using `bcrypt` (salt factor 10). Supports configurable environment secrets (`ADMIN_PIN`, `ADMIN_PASSWORD_HASH`).
- **Brute-Force & Lockout**: Auth endpoints enforce rate limiting (max 5 attempts per 15-minute window per IP) with temporary account lockout.

---

## 2. Multi-Factor Authentication (MFA)
- Support for TOTP-based authentication keys and recovery code hashes.
- MFA secrets are retained exclusively in server-side environment variables or encrypted database fields; never returned in API payloads or client-side JavaScript.

---

## 3. Role-Based Access Control (RBAC)
Server-side RBAC enforced via `lib/security/rbac.ts` and `middleware.ts` for all `/api/admin/*` endpoints:
- **Super Admin**: Wildcard permission (`*`). Can manage settings, users, and delete leads.
- **Sales Manager**: Can view dashboard, create/update/delete enquiries, view CRM reports.
- **Sales Executive**: Restricted to viewing & updating assigned enquiries (`enquiries.view`, `enquiries.update`). Cannot delete leads.
- **Marketing Specialist**: Restricted to managing blog posts (`blog.*`), SEO keywords/pages (`seo.*`), and analytics.

---

## 4. API Security & Input Validation
- **Schema Validation**: Inbound payloads verified using **Zod** (`lib/security/validation.ts`).
- **Input Sanitization**: Strings stripped of script tags and NoSQL operator characters (`lib/security/sanitizer.ts`).
- **Safe Responses**: Zero stack traces or raw database error details returned in production mode (`500 Internal Server Error`).

---

## 5. IDOR & Authorization Protection
- API routes independently verify user identity and role from signed session cookies.
- Resource mutation (updating or deleting enquiries, settings, blog posts) requires active permission validation on every request.

---

## 6. Injection & XSS Mitigation
- MongoDB queries executed via sanitized query objects, preventing NoSQL operator injection (`$gt`, `$ne`).
- HTML content generated for blog posts sanitized before rendering.

---

## 7. CSRF Protection
- Cookies issued with `SameSite=Lax` and `HttpOnly` flags.
- Cross-origin request forgery prevented for state-changing endpoints.

---

## 8. Security Headers
Configured globally in `middleware.ts` and `next.config.ts`:
- `Content-Security-Policy`: Restricts script and object execution sources.
- `Strict-Transport-Security`: Enforces HTTPS for 1 year in production (`max-age=31536000`).
- `X-Frame-Options: DENY`: Prevents clickjacking attacks.
- `X-Content-Type-Options: nosniff`: Blocks MIME sniffing.
- `Referrer-Policy: strict-origin-when-cross-origin`: Controls referrer leakage.

---

## 9. File Upload Security
- Image uploads routed to Cloudinary using signed server requests.
- Local uploads restrict mime-types (`image/jpeg`, `image/png`, `image/webp`, `image/avif`) and generate randomized timestamped filenames.

---

## 10. Audit Logging
- All sensitive admin events (login, logout, lead deletion, system config updates) recorded by `lib/security/auditLog.ts`.
- Logs record user ID, username, role, action, status, IP address, and timestamp.
- Accessible via protected route `/api/admin/audit-logs`.

---

## 11. Production Deployment Checklist
1. Set strong `JWT_SECRET` or `ADMIN_SESSION_SECRET` in environment variables.
2. Set custom `ADMIN_PIN` or `ADMIN_PASSWORD_HASH`.
3. Set `NODE_ENV=production` on hosting platform (Vercel / Cloud server).
4. Verify SSL certificate configuration (HTTPS enabled).
5. Configure `MONGODB_URI` database access with least-privilege credentials.
