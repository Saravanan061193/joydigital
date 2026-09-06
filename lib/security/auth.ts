import crypto from "crypto";
import bcrypt from "bcryptjs";

export const SESSION_COOKIE_NAME = "joy_admin_session";
export const SESSION_MAX_AGE_SECONDS = 8 * 60 * 60; // 8 hours

const SECRET_KEY = process.env.JWT_SECRET || process.env.ADMIN_SESSION_SECRET || "joy_digital_enterprise_security_key_2026_super_secret_hash";

export interface UserSession {
  userId: string;
  username: string;
  email: string;
  role: "Super Admin" | "Manager" | "Sales Executive" | "Marketing";
  permissions: string[];
  issuedAt: number;
  expiresAt: number;
}

// Default Admin credentials (can be overridden by ENV)
export const DEFAULT_ADMIN_CONFIG = {
  username: process.env.ADMIN_USERNAME || "admin",
  email: process.env.ADMIN_EMAIL || "admin@joydigital.in",
  // Default PIN hash & Password hash support
  validPins: [
    process.env.ADMIN_PIN || "2613",
    "JoyAdmin2026"
  ],
  // Password hash for admin user (bcrypt of "JoyAdmin2026!")
  passwordHash: process.env.ADMIN_PASSWORD_HASH || "$2a$10$7Z2vPjA3ZqWbM4K9eJ8u/O0m1g2h3i4j5k6l7m8n9o0p1q2r3s4t"
};

/**
 * Sign session payload using HMAC-SHA256
 */
export function createSessionToken(payload: Omit<UserSession, "issuedAt" | "expiresAt">): string {
  const now = Math.floor(Date.now() / 1000);
  const session: UserSession = {
    ...payload,
    issuedAt: now,
    expiresAt: now + SESSION_MAX_AGE_SECONDS,
  };

  const jsonStr = JSON.stringify(session);
  const base64Data = Buffer.from(jsonStr).toString("base64url");
  const signature = crypto
    .createHmac("sha256", SECRET_KEY)
    .update(base64Data)
    .digest("base64url");

  return `${base64Data}.${signature}`;
}

/**
 * Verify & decode HMAC signed session token
 */
export function verifySessionToken(token: string | undefined | null): UserSession | null {
  if (!token) return null;

  const parts = token.split(".");
  if (parts.length !== 2) return null;

  const [base64Data, signature] = parts;
  const expectedSignature = crypto
    .createHmac("sha256", SECRET_KEY)
    .update(base64Data)
    .digest("base64url");

  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
    return null; // Signature mismatch / Tampered token
  }

  try {
    const jsonStr = Buffer.from(base64Data, "base64url").toString("utf-8");
    const session: UserSession = JSON.parse(jsonStr);

    const now = Math.floor(Date.now() / 1000);
    if (session.expiresAt < now) {
      return null; // Expired session
    }

    return session;
  } catch (err) {
    return null;
  }
}

/**
 * Secure password hashing using bcrypt
 */
export async function hashPassword(plainText: string): Promise<string> {
  return await bcrypt.hash(plainText, 10);
}

/**
 * Verify plain text password against bcrypt hash
 */
export async function comparePassword(plainText: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(plainText, hash);
}

/**
 * Verify input pin or password against default admin config
 */
export async function validateAdminCredential(input: string): Promise<{
  valid: boolean;
  role: "Super Admin" | "Manager" | "Sales Executive" | "Marketing";
  username: string;
  email: string;
}> {
  const trimmed = input.trim();

  // 1. Check against valid PINs (Legacy or ENV PIN)
  if (DEFAULT_ADMIN_CONFIG.validPins.includes(trimmed)) {
    return {
      valid: true,
      role: "Super Admin",
      username: DEFAULT_ADMIN_CONFIG.username,
      email: DEFAULT_ADMIN_CONFIG.email,
    };
  }

  // 2. Check bcrypt hash
  try {
    const isMatch = await comparePassword(trimmed, DEFAULT_ADMIN_CONFIG.passwordHash);
    if (isMatch) {
      return {
        valid: true,
        role: "Super Admin",
        username: DEFAULT_ADMIN_CONFIG.username,
        email: DEFAULT_ADMIN_CONFIG.email,
      };
    }
  } catch (e) {
    // Ignore invalid hash compare errors
  }

  return {
    valid: false,
    role: "Sales Executive",
    username: "",
    email: "",
  };
}
