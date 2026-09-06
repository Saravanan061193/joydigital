import fs from "fs";
import path from "path";

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  userId: string;
  username: string;
  role: string;
  action: string;
  resource: string;
  resourceId?: string;
  status: "SUCCESS" | "FAILED" | "DENIED";
  ipAddress: string;
  userAgent?: string;
  details?: Record<string, any>;
}

const AUDIT_FILE = path.join(process.cwd(), "data", "audit_logs.json");

function readAuditLogs(): AuditLogEntry[] {
  if (!fs.existsSync(AUDIT_FILE)) return [];
  try {
    const content = fs.readFileSync(AUDIT_FILE, "utf-8");
    return JSON.parse(content);
  } catch (e) {
    return [];
  }
}

function writeAuditLogs(logs: AuditLogEntry[]) {
  const dir = path.dirname(AUDIT_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  // Keep latest 1000 logs in local JSON store
  const truncated = logs.slice(0, 1000);
  fs.writeFileSync(AUDIT_FILE, JSON.stringify(truncated, null, 2), "utf-8");
}

/**
 * Record a security audit log event
 */
export async function logAuditEvent(entry: Omit<AuditLogEntry, "id" | "timestamp">) {
  const fullLog: AuditLogEntry = {
    id: `audit_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    timestamp: new Date().toISOString(),
    ...entry,
  };

  const MONGODB_URI = process.env.MONGODB_URI;

  if (MONGODB_URI) {
    try {
      const { getDb } = await import("@/lib/mongodb");
      const db = await getDb();
      await db.collection("audit_logs").insertOne(fullLog);
      return;
    } catch (err) {
      console.error("MongoDB Audit Log insertion failed, fallback to file:", err);
    }
  }

  const logs = readAuditLogs();
  logs.unshift(fullLog);
  writeAuditLogs(logs);
}

/**
 * Query audit log history
 */
export async function getAuditLogs(limit = 100): Promise<AuditLogEntry[]> {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (MONGODB_URI) {
    try {
      const { getDb } = await import("@/lib/mongodb");
      const db = await getDb();
      const docs = await db.collection("audit_logs")
        .find({})
        .sort({ timestamp: -1 })
        .limit(limit)
        .toArray();
      return docs.map((d: any) => ({
        id: d.id || d._id?.toString(),
        timestamp: d.timestamp,
        userId: d.userId,
        username: d.username,
        role: d.role,
        action: d.action,
        resource: d.resource,
        resourceId: d.resourceId,
        status: d.status,
        ipAddress: d.ipAddress,
        userAgent: d.userAgent,
        details: d.details,
      }));
    } catch (e) {
      console.error("MongoDB fetch audit logs error, fallback to local JSON:", e);
    }
  }

  const logs = readAuditLogs();
  return logs.slice(0, limit);
}
