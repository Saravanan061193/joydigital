import fs from "fs";
import path from "path";
import { getDb } from "./mongodb";

export type KeywordType = "Primary" | "Secondary" | "Long-tail";
export type SearchIntent = "Informational" | "Commercial" | "Transactional" | "Navigational";
export type KeywordStatus = "Active" | "Draft" | "Archived";
export type PageCategory = "Core Service" | "Industry Page" | "Landing Page" | "Blog Post";

export interface SeoKeyword {
  id: string;
  keyword: string;
  type: KeywordType;
  search_intent: SearchIntent;
  target_audience: string;
  notes: string;
  status: KeywordStatus;
  assigned_page_id?: string | null;
  created_at: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface AltTextItem {
  image_url: string;
  alt_text: string;
}

export interface SeoPageMapping {
  id: string;
  path: string;
  category: PageCategory;
  title_template: string;
  meta_description: string;
  h1: string;
  h2_tags: string[];
  h3_tags: string[];
  primary_keyword_id?: string | null;
  secondary_keyword_ids: string[];
  longtail_keyword_ids: string[];
  faq_schema: FAQItem[];
  alt_texts: AltTextItem[];
  updated_at: string;
}

// File paths for local JSON fallbacks
const KEYWORDS_FILE = path.join(process.cwd(), "data", "seo-keywords.json");
const PAGES_FILE = path.join(process.cwd(), "data", "seo-pages.json");

// Helper to read local JSON file
function readJsonFile<T>(filePath: string): T[] {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(data) as T[];
    }
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
  }
  return [];
}

// Helper to write local JSON file
function writeJsonFile<T>(filePath: string, data: T[]): void {
  try {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error(`Error writing file ${filePath}:`, error);
  }
}

// ----------------------------------------------------
// KEYWORD CRUD FUNCTIONS
// ----------------------------------------------------

export async function getAllKeywords(): Promise<SeoKeyword[]> {
  try {
    if (process.env.MONGODB_URI) {
      const db = await getDb();
      const docs = await db.collection<SeoKeyword>("seo_keywords").find({}).sort({ created_at: -1 }).toArray();
      if (docs && docs.length > 0) {
        return docs.map(doc => ({
          id: doc.id || (doc as any)._id?.toString(),
          keyword: doc.keyword,
          type: doc.type,
          search_intent: doc.search_intent,
          target_audience: doc.target_audience || "",
          notes: doc.notes || "",
          status: doc.status || "Active",
          assigned_page_id: doc.assigned_page_id || null,
          created_at: doc.created_at || new Date().toISOString(),
        }));
      }
    }
  } catch (err) {
    console.warn("MongoDB connection unavailable for getAllKeywords, falling back to local file:", err);
  }

  return readJsonFile<SeoKeyword>(KEYWORDS_FILE);
}

export async function saveKeyword(keyword: SeoKeyword): Promise<SeoKeyword> {
  const all = await getAllKeywords();
  const existingIndex = all.findIndex(k => k.id === keyword.id || k.keyword.toLowerCase().trim() === keyword.keyword.toLowerCase().trim());
  
  const updatedKeyword: SeoKeyword = {
    ...keyword,
    id: keyword.id || `kw-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    created_at: keyword.created_at || new Date().toISOString(),
  };

  if (existingIndex >= 0) {
    all[existingIndex] = updatedKeyword;
  } else {
    all.unshift(updatedKeyword);
  }

  writeJsonFile(KEYWORDS_FILE, all);

  try {
    if (process.env.MONGODB_URI) {
      const db = await getDb();
      await db.collection("seo_keywords").updateOne(
        { id: updatedKeyword.id },
        { $set: updatedKeyword },
        { upsert: true }
      );
    }
  } catch (err) {
    console.warn("Failed to sync keyword save to MongoDB:", err);
  }

  return updatedKeyword;
}

export async function deleteKeyword(id: string): Promise<boolean> {
  const all = await getAllKeywords();
  const filtered = all.filter(k => k.id !== id);
  writeJsonFile(KEYWORDS_FILE, filtered);

  try {
    if (process.env.MONGODB_URI) {
      const db = await getDb();
      await db.collection("seo_keywords").deleteOne({ id });
    }
  } catch (err) {
    console.warn("Failed to delete keyword from MongoDB:", err);
  }

  return true;
}

// ----------------------------------------------------
// PAGE SEO MAPPING CRUD FUNCTIONS
// ----------------------------------------------------

export async function getAllSeoPages(): Promise<SeoPageMapping[]> {
  try {
    if (process.env.MONGODB_URI) {
      const db = await getDb();
      const docs = await db.collection<SeoPageMapping>("seo_pages").find({}).sort({ path: 1 }).toArray();
      if (docs && docs.length > 0) {
        return docs.map(doc => ({
          id: doc.id || (doc as any)._id?.toString(),
          path: doc.path,
          category: doc.category || "Core Service",
          title_template: doc.title_template || "",
          meta_description: doc.meta_description || "",
          h1: doc.h1 || "",
          h2_tags: doc.h2_tags || [],
          h3_tags: doc.h3_tags || [],
          primary_keyword_id: doc.primary_keyword_id || null,
          secondary_keyword_ids: doc.secondary_keyword_ids || [],
          longtail_keyword_ids: doc.longtail_keyword_ids || [],
          faq_schema: doc.faq_schema || [],
          alt_texts: doc.alt_texts || [],
          updated_at: doc.updated_at || new Date().toISOString(),
        }));
      }
    }
  } catch (err) {
    console.warn("MongoDB connection unavailable for getAllSeoPages, falling back to local file:", err);
  }

  return readJsonFile<SeoPageMapping>(PAGES_FILE);
}

export async function getSeoPageByPath(path: string): Promise<SeoPageMapping | null> {
  const all = await getAllSeoPages();
  const normalizedPath = path.toLowerCase().trim();
  return all.find(p => p.path.toLowerCase().trim() === normalizedPath) || null;
}

export async function saveSeoPage(page: SeoPageMapping): Promise<SeoPageMapping> {
  const all = await getAllSeoPages();
  const existingIndex = all.findIndex(p => p.id === page.id || p.path.toLowerCase().trim() === page.path.toLowerCase().trim());

  const updatedPage: SeoPageMapping = {
    ...page,
    id: page.id || `page-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    updated_at: new Date().toISOString(),
  };

  if (existingIndex >= 0) {
    all[existingIndex] = updatedPage;
  } else {
    all.push(updatedPage);
  }

  writeJsonFile(PAGES_FILE, all);

  try {
    if (process.env.MONGODB_URI) {
      const db = await getDb();
      await db.collection("seo_pages").updateOne(
        { id: updatedPage.id },
        { $set: updatedPage },
        { upsert: true }
      );
    }
  } catch (err) {
    console.warn("Failed to sync SEO page to MongoDB:", err);
  }

  return updatedPage;
}

export async function deleteSeoPage(id: string): Promise<boolean> {
  const all = await getAllSeoPages();
  const filtered = all.filter(p => p.id !== id);
  writeJsonFile(PAGES_FILE, filtered);

  try {
    if (process.env.MONGODB_URI) {
      const db = await getDb();
      await db.collection("seo_pages").deleteOne({ id });
    }
  } catch (err) {
    console.warn("Failed to delete SEO page from MongoDB:", err);
  }

  return true;
}

// ----------------------------------------------------
// REAL-TIME STATS & DUPLICATE DETECTOR
// ----------------------------------------------------

export interface SeoDashboardStats {
  totalKeywords: number;
  byType: {
    Primary: number;
    Secondary: number;
    LongTail: number;
  };
  byIntent: {
    Commercial: number;
    Transactional: number;
    Informational: number;
    Navigational: number;
  };
  assignedCount: number;
  unassignedCount: number;
  totalPagesMapped: number;
  duplicateKeywords: Array<{ keyword: string; count: number }>;
  constraintViolations: Array<{ pagePath: string; message: string }>;
}

export async function getSeoDashboardStats(): Promise<SeoDashboardStats> {
  const keywords = await getAllKeywords();
  const pages = await getAllSeoPages();

  const byType = { Primary: 0, Secondary: 0, LongTail: 0 };
  const byIntent = { Commercial: 0, Transactional: 0, Informational: 0, Navigational: 0 };

  const keywordCountMap: Record<string, number> = {};

  keywords.forEach(k => {
    // Type counts
    if (k.type === "Primary") byType.Primary++;
    else if (k.type === "Secondary") byType.Secondary++;
    else if (k.type === "Long-tail") byType.LongTail++;

    // Intent counts
    if (k.search_intent === "Commercial") byIntent.Commercial++;
    else if (k.search_intent === "Transactional") byIntent.Transactional++;
    else if (k.search_intent === "Informational") byIntent.Informational++;
    else if (k.search_intent === "Navigational") byIntent.Navigational++;

    // Duplicate detection
    const normalized = k.keyword.toLowerCase().trim();
    keywordCountMap[normalized] = (keywordCountMap[normalized] || 0) + 1;
  });

  const assignedCount = keywords.filter(k => k.assigned_page_id).length;
  const unassignedCount = keywords.length - assignedCount;

  const duplicates = Object.entries(keywordCountMap)
    .filter(([_, count]) => count > 1)
    .map(([keyword, count]) => ({ keyword, count }));

  // Constraint rules check per page:
  // 1 Primary Keyword, 3–6 Secondary Keywords, 3–8 Long-tail Keywords
  const constraintViolations: Array<{ pagePath: string; message: string }> = [];

  pages.forEach(page => {
    const hasPrimary = Boolean(page.primary_keyword_id);
    const secCount = page.secondary_keyword_ids ? page.secondary_keyword_ids.length : 0;
    const ltCount = page.longtail_keyword_ids ? page.longtail_keyword_ids.length : 0;

    if (!hasPrimary) {
      constraintViolations.push({ pagePath: page.path, message: "Missing 1 Primary Keyword." });
    }
    if (secCount < 3 || secCount > 6) {
      constraintViolations.push({ pagePath: page.path, message: `Secondary keywords count is ${secCount} (Rule: 3 to 6 required).` });
    }
    if (ltCount < 3 || ltCount > 8) {
      constraintViolations.push({ pagePath: page.path, message: `Long-tail keywords count is ${ltCount} (Rule: 3 to 8 required).` });
    }
  });

  return {
    totalKeywords: keywords.length,
    byType,
    byIntent,
    assignedCount,
    unassignedCount,
    totalPagesMapped: pages.length,
    duplicateKeywords: duplicates,
    constraintViolations,
  };
}
