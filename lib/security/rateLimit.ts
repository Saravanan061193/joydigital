interface RateLimitRecord {
  count: number;
  firstAttemptTime: number;
  lockoutUntil: number;
}

const memoryStore = new Map<string, RateLimitRecord>();

export interface RateLimitOptions {
  windowMs: number; // e.g. 15 minutes = 15 * 60 * 1000
  max: number;      // max requests within window
  lockoutMs?: number; // lock out duration if limit exceeded
}

export function checkRateLimit(
  identifier: string,
  options: RateLimitOptions = { windowMs: 15 * 60 * 1000, max: 10, lockoutMs: 15 * 60 * 1000 }
): { success: boolean; limit: number; remaining: number; resetMs: number } {
  const now = Date.now();
  const record = memoryStore.get(identifier);

  // If no record exists, create new
  if (!record) {
    memoryStore.set(identifier, {
      count: 1,
      firstAttemptTime: now,
      lockoutUntil: 0,
    });
    return {
      success: true,
      limit: options.max,
      remaining: options.max - 1,
      resetMs: options.windowMs,
    };
  }

  // Check if currently locked out
  if (record.lockoutUntil > now) {
    return {
      success: false,
      limit: options.max,
      remaining: 0,
      resetMs: record.lockoutUntil - now,
    };
  }

  // If window expired, reset counter
  if (now - record.firstAttemptTime > options.windowMs) {
    memoryStore.set(identifier, {
      count: 1,
      firstAttemptTime: now,
      lockoutUntil: 0,
    });
    return {
      success: true,
      limit: options.max,
      remaining: options.max - 1,
      resetMs: options.windowMs,
    };
  }

  // Increment attempt count
  record.count += 1;

  if (record.count > options.max) {
    record.lockoutUntil = now + (options.lockoutMs || options.windowMs);
    memoryStore.set(identifier, record);
    return {
      success: false,
      limit: options.max,
      remaining: 0,
      resetMs: record.lockoutUntil - now,
    };
  }

  memoryStore.set(identifier, record);

  return {
    success: true,
    limit: options.max,
    remaining: options.max - record.count,
    resetMs: options.windowMs - (now - record.firstAttemptTime),
  };
}

/**
 * Get client IP address from request headers
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }
  return "127.0.0.1";
}
