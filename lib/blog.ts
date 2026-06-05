import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  author: string;
  content: string;
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR);
  
  const posts = files
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
        content,
      };
    });

  // Sort by date descending
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
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
      content,
    };
  } catch (error) {
    console.error(`Error reading post with slug ${slug}:`, error);
    return null;
  }
}
