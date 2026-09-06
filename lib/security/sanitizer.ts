/**
 * Sanitize plain string input to prevent XSS and HTML injection
 */
export function sanitizeString(input: unknown): string {
  if (typeof input !== "string") {
    if (input === null || input === undefined) return "";
    return String(input);
  }

  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;")
    .trim();
}

/**
 * Remove script tags and dangerous HTML attributes from rich text / markdown strings
 */
export function sanitizeHtmlContent(html: string): string {
  if (!html) return "";
  
  return html
    .replace(/<script\b[^<]*>([\s\S]*?)<\/script>/gi, "")
    .replace(/<iframe\b[^<]*>([\s\S]*?)<\/iframe>/gi, "")
    .replace(/<object\b[^<]*>([\s\S]*?)<\/object>/gi, "")
    .replace(/<embed\b[^<]*>([\s\S]*?)<\/embed>/gi, "")
    .replace(/on\w+="[^"]*"/gi, "")
    .replace(/on\w+='[^']*'/gi, "")
    .replace(/javascript:/gi, "");
}

/**
 * Sanitize object keys and values to prevent MongoDB NoSQL query operator injection
 */
export function sanitizeObject<T>(obj: T): T {
  if (obj === null || typeof obj !== "object") {
    if (typeof obj === "string") {
      return sanitizeString(obj) as unknown as T;
    }
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeObject(item)) as unknown as T;
  }

  const sanitized: Record<string, any> = {};
  for (const key of Object.keys(obj)) {
    // Strip keys starting with $ or containing dots to prevent MongoDB injection
    const cleanKey = key.replace(/^\$/, "").replace(/\./g, "_");
    sanitized[cleanKey] = sanitizeObject((obj as any)[key]);
  }

  return sanitized as T;
}
