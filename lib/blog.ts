import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getDb } from "./mongodb";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  author: string;
  image?: string;
  content: string;
  views?: number;
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

        return {
          slug,
          title: data.title || "Untitled",
          description: data.description || "",
          date: data.date || "",
          category: data.category || "General",
          author: data.author || "Admin",
          image: data.image || "",
          content,
        };
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

    return {
      slug,
      title: data.title || "Untitled",
      description: data.description || "",
      date: data.date || "",
      category: data.category || "General",
      author: data.author || "Admin",
      image: data.image || "",
      content,
    };
  } catch (error) {
    console.error(`Error reading local post with slug ${slug}:`, error);
    return null;
  }
}

// GET all posts: Merge MongoDB posts and local posts
export async function getAllPosts(): Promise<BlogPost[]> {
  const localPosts = getLocalPosts();
  let dbPosts: BlogPost[] = [];
  let deletedSlugs: Set<string> = new Set();

  // Try to fetch from MongoDB if available
  if (process.env.MONGODB_URI) {
    try {
      const db = await getDb();
      const blogsCol = db.collection("blogs");
      
      // Fetch non-deleted blogs
      const dbRecords = await blogsCol.find({ isDeleted: { $ne: true } }).toArray();
      dbPosts = dbRecords.map((r) => ({
        slug: r.slug,
        title: r.title,
        description: r.description,
        date: r.date,
        category: r.category,
        author: r.author,
        image: r.image || "",
        content: r.content,
      }));

      // Fetch deleted slug marks to filter out local files that have been deleted
      const deletedRecords = await blogsCol.find({ isDeleted: true }, { projection: { slug: 1 } }).toArray();
      deletedSlugs = new Set(deletedRecords.map((r) => r.slug));
    } catch (err) {
      console.error("Failed to fetch blog posts from MongoDB, falling back to local files:", err);
    }
  }

  const mergedMap = new Map<string, BlogPost>();

  // Add local posts first (omitting deleted ones)
  for (const post of localPosts) {
    if (!deletedSlugs.has(post.slug)) {
      mergedMap.set(post.slug, post);
    }
  }

  // Add db posts (overwriting local ones if slug matches)
  for (const post of dbPosts) {
    mergedMap.set(post.slug, post);
  }

  const posts = Array.from(mergedMap.values());

  // Sort by date descending
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// GET post by slug: Check MongoDB first, fallback to local
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (process.env.MONGODB_URI) {
    try {
      const db = await getDb();
      const blogsCol = db.collection("blogs");
      
      const dbRecord = await blogsCol.findOne({ slug });
      if (dbRecord) {
        if (dbRecord.isDeleted === true) {
          return null;
        }
        return {
          slug: dbRecord.slug,
          title: dbRecord.title,
          description: dbRecord.description,
          date: dbRecord.date,
          category: dbRecord.category,
          author: dbRecord.author,
          image: dbRecord.image || "",
          content: dbRecord.content,
        };
      }
    } catch (err) {
      console.error(`Failed to fetch post ${slug} from MongoDB, falling back to local:`, err);
    }
  }

  return getLocalPostBySlug(slug);
}
