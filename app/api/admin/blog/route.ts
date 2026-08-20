import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getAllPosts } from "@/lib/blog";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

// GET: List all blog posts
export async function GET(req: NextRequest) {
  try {
    const posts = getAllPosts();
    return NextResponse.json(posts);
  } catch (error: any) {
    console.error("Error retrieving blog list:", error);
    return NextResponse.json({ error: "Failed to read blog posts." }, { status: 500 });
  }
}

// POST: Add or edit a blog post (handles form data file upload)
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const author = formData.get("author") as string;
    const date = formData.get("date") as string;
    const content = formData.get("content") as string;
    const imageFile = formData.get("image") as File | null;
    const existingImage = formData.get("existingImage") as string; // if editing

    if (!title || !slug || !content) {
      return NextResponse.json({ error: "Missing required parameters: title, slug, or content" }, { status: 400 });
    }

    // Clean slug for filename safety
    const cleanSlug = slug.toLowerCase().replace(/[^a-z0-9-_]/g, "");

    let imagePath = existingImage || "";

    // Handle image file upload
    if (imageFile && imageFile.name && imageFile.size > 0) {
      const uploadDir = path.join(process.cwd(), "public", "assets", "images", "blog");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      // Generate secure filename
      const fileExt = path.extname(imageFile.name) || ".jpg";
      const filename = `${cleanSlug}-${Date.now()}${fileExt}`;
      const filePath = path.join(uploadDir, filename);

      const buffer = Buffer.from(await imageFile.arrayBuffer());
      fs.writeFileSync(filePath, buffer);

      imagePath = `/assets/images/blog/${filename}`;
    }

    // Standardize frontmatter template
    const mdContent = `---
title: "${title.replace(/"/g, '\\"')}"
description: "${description.replace(/"/g, '\\"')}"
date: "${date || new Date().toISOString().split("T")[0]}"
category: "${category || "SEO"}"
author: "${author || "Saravanan L"}"
image: "${imagePath}"
---

${content}
`;

    if (!fs.existsSync(BLOG_DIR)) {
      fs.mkdirSync(BLOG_DIR, { recursive: true });
    }

    const mdFilePath = path.join(BLOG_DIR, `${cleanSlug}.md`);
    fs.writeFileSync(mdFilePath, mdContent, "utf8");

    return NextResponse.json({ success: true, slug: cleanSlug, image: imagePath });
  } catch (error: any) {
    console.error("Error creating blog post:", error);
    return NextResponse.json({ error: error.message || "Failed to publish blog post." }, { status: 500 });
  }
}

// DELETE: Delete a blog post
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ error: "Missing slug parameter." }, { status: 400 });
    }

    const cleanSlug = slug.toLowerCase().replace(/[^a-z0-9-_]/g, "");
    const filePath = path.join(BLOG_DIR, `${cleanSlug}.md`);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return NextResponse.json({ success: true, message: `Blog post ${cleanSlug} deleted successfully.` });
    } else {
      return NextResponse.json({ error: "Blog post file not found." }, { status: 404 });
    }
  } catch (error: any) {
    console.error("Error deleting blog post:", error);
    return NextResponse.json({ error: error.message || "Failed to delete blog post." }, { status: 500 });
  }
}
