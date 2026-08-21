import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getAllPosts } from "@/lib/blog";
import { getDb } from "@/lib/mongodb";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary only if environment variables are provided
if (
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

const BLOG_DIR = path.join(process.cwd(), "content/blog");

// GET: List all blog posts (merges local & DB, sorted by date)
export async function GET(req: NextRequest) {
  try {
    const posts = await getAllPosts();
    return NextResponse.json(posts);
  } catch (error: any) {
    console.error("Error retrieving blog list:", error);
    return NextResponse.json({ error: "Failed to read blog posts." }, { status: 500 });
  }
}

// POST: Add or edit a blog post (handles form data, DB save, and local file fallback)
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
    let isWriteable = true;

    // Handle image file upload
    if (imageFile && imageFile.name && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());

      // 1. Retrieve Cloudinary configuration from database if available
      let cloudName = process.env.CLOUDINARY_CLOUD_NAME;
      let apiKey = process.env.CLOUDINARY_API_KEY;
      let apiSecret = process.env.CLOUDINARY_API_SECRET;

      if (process.env.MONGODB_URI) {
        try {
          const db = await getDb();
          const dbConfig = await db.collection("settings").findOne({ _id: "cloudinary_config" as any });
          if (dbConfig?.cloudName && dbConfig?.apiKey && dbConfig?.apiSecret) {
            cloudName = dbConfig.cloudName;
            apiKey = dbConfig.apiKey;
            apiSecret = dbConfig.apiSecret;
          }
        } catch (dbErr) {
          console.error("Failed to fetch Cloudinary settings from DB:", dbErr);
        }
      }

      // 2. Try uploading to Cloudinary if credentials are configured
      if (cloudName && apiKey && apiSecret) {
        try {
          cloudinary.config({
            cloud_name: cloudName,
            api_key: apiKey,
            api_secret: apiSecret,
          });

          const uploadResult = await new Promise<any>((resolve, reject) => {
            cloudinary.uploader.upload_stream(
              {
                folder: "joydigital_blog",
                public_id: `${cleanSlug}-${Date.now()}`,
              },
              (error, result) => {
                if (error) reject(error);
                else resolve(result);
              }
            ).end(buffer);
          });
          imagePath = uploadResult.secure_url;
        } catch (cloudinaryErr) {
          console.error("Cloudinary upload failed, checking local write fallback:", cloudinaryErr);
        }
      }

      // 2. Fallback to local filesystem write or base64 storage if Cloudinary upload failed/not configured
      if (!imagePath || !imagePath.startsWith("http")) {
        try {
          const uploadDir = path.join(process.cwd(), "public", "assets", "images", "blog");
          if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
          }

          // Generate secure filename
          const fileExt = path.extname(imageFile.name) || ".jpg";
          const filename = `${cleanSlug}-${Date.now()}${fileExt}`;
          const filePath = path.join(uploadDir, filename);

          fs.writeFileSync(filePath, buffer);
          imagePath = `/assets/images/blog/${filename}`;
        } catch (err) {
          console.warn("Filesystem is not writeable and Cloudinary failed/not set. Falling back to Base64 image storage:", err);
          isWriteable = false;
          const fileType = imageFile.type || "image/jpeg";
          imagePath = `data:${fileType};base64,${buffer.toString("base64")}`;
        }
      }
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

    // Attempt to write markdown file locally if the filesystem is writeable
    if (isWriteable) {
      try {
        if (!fs.existsSync(BLOG_DIR)) {
          fs.mkdirSync(BLOG_DIR, { recursive: true });
        }
        const mdFilePath = path.join(BLOG_DIR, `${cleanSlug}.md`);
        fs.writeFileSync(mdFilePath, mdContent, "utf8");
      } catch (err) {
        console.warn("Failed to write blog post markdown file locally:", err);
        isWriteable = false;
      }
    }

    // Save/Update in MongoDB if available
    if (process.env.MONGODB_URI) {
      try {
        const db = await getDb();
        const blogsCol = db.collection("blogs");

        await blogsCol.updateOne(
          { slug: cleanSlug },
          {
            $set: {
              slug: cleanSlug,
              title,
              description,
              date: date || new Date().toISOString().split("T")[0],
              category: category || "SEO",
              author: author || "Saravanan L",
              image: imagePath,
              content,
              isDeleted: false,
              updatedAt: new Date(),
            },
          },
          { upsert: true }
        );
        console.log(`Successfully saved/updated blog post "${cleanSlug}" in MongoDB.`);
      } catch (dbErr: any) {
        console.error("Failed to save blog post in MongoDB:", dbErr);
        if (!isWriteable) {
          throw new Error("Could not write to local filesystem and MongoDB save failed: " + dbErr.message);
        }
      }
    } else {
      if (!isWriteable) {
        throw new Error("Local filesystem is read-only and MONGODB_URI environment variable is not defined.");
      }
    }

    return NextResponse.json({ success: true, slug: cleanSlug, image: imagePath });
  } catch (error: any) {
    console.error("Error creating/editing blog post:", error);
    return NextResponse.json({ error: error.message || "Failed to publish blog post." }, { status: 500 });
  }
}

// DELETE: Delete a blog post (handles local file delete and marking deleted in DB)
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ error: "Missing slug parameter." }, { status: 400 });
    }

    const cleanSlug = slug.toLowerCase().replace(/[^a-z0-9-_]/g, "");
    let localDeleted = false;

    // Try deleting local file
    try {
      const filePath = path.join(BLOG_DIR, `${cleanSlug}.md`);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        localDeleted = true;
      }
    } catch (err) {
      console.warn("Could not delete local file (read-only filesystem):", err);
    }

    let dbDeleted = false;
    if (process.env.MONGODB_URI) {
      try {
        const db = await getDb();
        const blogsCol = db.collection("blogs");

        // Set isDeleted flag so that statically bundled version is hidden
        await blogsCol.updateOne(
          { slug: cleanSlug },
          {
            $set: {
              slug: cleanSlug,
              isDeleted: true,
              deletedAt: new Date(),
            },
          },
          { upsert: true }
        );
        dbDeleted = true;
      } catch (dbErr) {
        console.error("Failed to mark blog post as deleted in MongoDB:", dbErr);
      }
    }

    if (localDeleted || dbDeleted) {
      return NextResponse.json({ success: true, message: `Blog post ${cleanSlug} deleted successfully.` });
    } else {
      return NextResponse.json({ error: "Blog post file not found or could not be deleted." }, { status: 404 });
    }
  } catch (error: any) {
    console.error("Error deleting blog post:", error);
    return NextResponse.json({ error: error.message || "Failed to delete blog post." }, { status: 500 });
  }
}
