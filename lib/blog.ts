import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getDb } from "./mongodb";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export interface InternalLinkItem {
  anchorText: string;
  targetUrl: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  lastUpdatedDate?: string;
  category: string;
  author: string;
  image?: string;
  imageAlt?: string;
  imageCaption?: string;
  tags?: string[];
  content: string;
  views?: number;

  // Display Toggles
  showTableOfContents?: boolean;
  showAuthorInfo?: boolean;
  showFeaturedImage?: boolean;

  // SEO Settings
  seoTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
  secondaryKeywords?: string;
  canonicalUrl?: string;
  robots?: string; // "Index, Follow" | "Noindex, Follow" | "Index, Nofollow" | "Noindex, Nofollow"

  // Internal Links & Related
  internalLinks?: InternalLinkItem[];
  autoSuggestRelated?: boolean;
  manualRelatedSlugs?: string[];

  // Author E-E-A-T Information
  authorName?: string;
  authorRole?: string;
  authorBio?: string;
  authorImage?: string;
  authorProfileUrl?: string;

  // FAQ Section
  faqs?: FaqItem[];

  // Social / Open Graph Settings
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;

  // Publishing & Status Settings
  status?: "Published" | "Draft" | "Scheduled" | "Archived";
  scheduledPublishDate?: string;
  seoScore?: number;
}

// Helper to normalize parsed frontmatter data into BlogPost interface
function normalizePostData(slug: string, data: any, content: string): BlogPost {
  let tags: string[] = [];
  if (Array.isArray(data.tags)) {
    tags = data.tags;
  } else if (typeof data.tags === "string" && data.tags.trim()) {
    tags = data.tags.split(",").map((t: string) => t.trim());
  }

  let internalLinks: InternalLinkItem[] = [];
  if (Array.isArray(data.internalLinks)) {
    internalLinks = data.internalLinks;
  }

  let faqs: FaqItem[] = [];
  if (Array.isArray(data.faqs)) {
    faqs = data.faqs;
  }

  let manualRelatedSlugs: string[] = [];
  if (Array.isArray(data.manualRelatedSlugs)) {
    manualRelatedSlugs = data.manualRelatedSlugs;
  } else if (typeof data.manualRelatedSlugs === "string" && data.manualRelatedSlugs.trim()) {
    manualRelatedSlugs = data.manualRelatedSlugs.split(",").map((s: string) => s.trim());
  }

  return {
    slug,
    title: data.title || "Untitled",
    description: data.description || "",
    date: data.date || new Date().toISOString().split("T")[0],
    lastUpdatedDate: data.lastUpdatedDate || data.date || "",
    category: data.category || "General",
    author: data.author || data.authorName || "Saravanan L",
    image: data.image || "",
    imageAlt: data.imageAlt || data.title || "",
    imageCaption: data.imageCaption || "",
    tags,
    content,

    showTableOfContents: data.showTableOfContents !== false,
    showAuthorInfo: data.showAuthorInfo !== false,
    showFeaturedImage: data.showFeaturedImage !== false,

    seoTitle: data.seoTitle || data.title || "",
    metaDescription: data.metaDescription || data.description || "",
    focusKeyword: data.focusKeyword || "",
    secondaryKeywords: data.secondaryKeywords || "",
    canonicalUrl: data.canonicalUrl || `https://joydigital.in/blog/${slug}`,
    robots: data.robots || "Index, Follow",

    internalLinks,
    autoSuggestRelated: data.autoSuggestRelated !== false,
    manualRelatedSlugs,

    authorName: data.authorName || data.author || "Saravanan L",
    authorRole: data.authorRole || "Technical Web Specialist",
    authorBio: data.authorBio || "Digital marketing strategist and Next.js web developer focusing on search optimization and conversion rate growth.",
    authorImage: data.authorImage || "/assets/images/logo.webp",
    authorProfileUrl: data.authorProfileUrl || "https://joydigital.in/about",

    faqs,

    ogTitle: data.ogTitle || data.seoTitle || data.title || "",
    ogDescription: data.ogDescription || data.metaDescription || data.description || "",
    ogImage: data.ogImage || data.image || "",
    twitterTitle: data.twitterTitle || data.ogTitle || data.seoTitle || data.title || "",
    twitterDescription: data.twitterDescription || data.ogDescription || data.metaDescription || data.description || "",
    twitterImage: data.twitterImage || data.ogImage || data.image || "",

    status: data.status || "Published",
    scheduledPublishDate: data.scheduledPublishDate || "",
    seoScore: typeof data.seoScore === "number" ? data.seoScore : undefined,
  };
}

// Helper to fetch local posts synchronously
function getLocalPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  try {
    const files = fs.readdirSync(BLOG_DIR);

    return files
      .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
      .map((file) => {
        const slug = file.replace(/\.mdx?$/, "");
        const filePath = path.join(BLOG_DIR, file);
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const { data, content } = matter(fileContent);

        return normalizePostData(slug, data, content);
      });
  } catch (err) {
    console.error("Error reading local post directory:", err);
    return [];
  }
}

// Helper to get local post by slug
function getLocalPostBySlug(slug: string): BlogPost | null {
  try {
    const normalPath = path.join(BLOG_DIR, `${slug}.md`);
    const mdxPath = path.join(BLOG_DIR, `${slug}.mdx`);

    let filePath = "";
    if (fs.existsSync(normalPath)) {
      filePath = normalPath;
    } else if (fs.existsSync(mdxPath)) {
      filePath = mdxPath;
    } else {
      return null;
    }

    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    return normalizePostData(slug, data, content);
  } catch (error) {
    console.error(`Error reading local post with slug ${slug}:`, error);
    return null;
  }
}

function withTimeout<T>(promise: Promise<T>, timeoutMs = 1500): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error("MongoDB query timeout")), timeoutMs)
    ),
  ]);
}

// GET all posts: Merge MongoDB posts and local posts
export async function getAllPosts(): Promise<BlogPost[]> {
  const localPosts = getLocalPosts();
  let dbPosts: BlogPost[] = [];
  let deletedSlugs: Set<string> = new Set();

  if (process.env.MONGODB_URI) {
    try {
      const db = await withTimeout(getDb(), 1500);
      const blogsCol = db.collection("blogs");

      const dbRecords = await withTimeout(blogsCol.find({ isDeleted: { $ne: true } }).toArray(), 1500);
      dbPosts = dbRecords.map((r) => normalizePostData(r.slug, r, r.content));

      const deletedRecords = await withTimeout(blogsCol.find({ isDeleted: true }, { projection: { slug: 1 } }).toArray(), 1500);
      deletedSlugs = new Set(deletedRecords.map((r) => r.slug));
    } catch (err) {
      console.error("Failed to fetch blog posts from MongoDB within timeout, falling back to local files:", err);
    }
  }

  const mergedMap = new Map<string, BlogPost>();

  for (const post of localPosts) {
    if (!deletedSlugs.has(post.slug)) {
      mergedMap.set(post.slug, post);
    }
  }

  for (const post of dbPosts) {
    mergedMap.set(post.slug, post);
  }

  const posts = Array.from(mergedMap.values());

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// GET post by slug: Check MongoDB first, fallback to local
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (process.env.MONGODB_URI) {
    try {
      const db = await withTimeout(getDb(), 1500);
      const blogsCol = db.collection("blogs");

      const dbRecord = await withTimeout(blogsCol.findOne({ slug }), 1500);
      if (dbRecord) {
        if (dbRecord.isDeleted === true) {
          return null;
        }
        return normalizePostData(dbRecord.slug, dbRecord, dbRecord.content);
      }
    } catch (err) {
      console.error(`Failed to fetch post ${slug} from MongoDB, falling back to local:`, err);
    }
  }

  return getLocalPostBySlug(slug);
}
