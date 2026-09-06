import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { cookies } from "next/headers";
import { getAllPosts } from "@/lib/blog";
import { getDb } from "@/lib/mongodb";
import { v2 as cloudinary } from "cloudinary";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/security/auth";
import { hasPermission } from "@/lib/security/rbac";
import { logAuditEvent } from "@/lib/security/auditLog";
import { getClientIp } from "@/lib/security/rateLimit";
import { sanitizeHtmlContent, sanitizeString } from "@/lib/security/sanitizer";

async function authenticateAdminRequest(request: Request, requiredPermission: any) {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const session = verifySessionToken(token);

  if (!session) {
    return { authenticated: false, session: null, response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }

  if (requiredPermission && !hasPermission(session.role, requiredPermission)) {
    return { authenticated: false, session, response: NextResponse.json({ error: "Access Denied" }, { status: 403 }) };
  }

  return { authenticated: true, session, response: null };
}

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

// GET: List all blog posts with aggregated pageviews
export async function GET(req: NextRequest) {
  const auth = await authenticateAdminRequest(req, "blog.view");
  if (!auth.authenticated) return auth.response!;

  try {
    const posts = await getAllPosts();

    let viewCounts: Record<string, number> = {};
    if (process.env.MONGODB_URI) {
      try {
        const db = await getDb();
        const pageviewsCol = db.collection("pageviews");

        const viewsAggregation = await pageviewsCol.aggregate([
          { $match: { path: { $regex: "^/blog" } } },
          { $group: { _id: "$path", count: { $sum: 1 } } }
        ]).toArray();

        viewsAggregation.forEach((item: any) => {
          const rawPath = item._id || "";
          const cleanPath = rawPath.split("?")[0].replace(/\/$/, "");
          const parts = cleanPath.split("/blog/");
          if (parts.length > 1 && parts[1]) {
            const slug = parts[1];
            viewCounts[slug] = (viewCounts[slug] || 0) + item.count;
          }
        });
      } catch (dbErr) {
        console.error("Failed to aggregate blog views from MongoDB:", dbErr);
      }
    }

    const postsWithViews = posts.map((p) => ({
      ...p,
      views: viewCounts[p.slug] || p.views || 0,
    }));

    return NextResponse.json(postsWithViews);
  } catch (error: any) {
    console.error("Error retrieving blog list:", error);
    return NextResponse.json({ error: "Failed to read blog posts." }, { status: 500 });
  }
}

// POST: Add or edit a blog post with full SEO & CMS fields
export async function POST(req: NextRequest) {
  const auth = await authenticateAdminRequest(req, "blog.create");
  if (!auth.authenticated) return auth.response!;

  try {
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const author = formData.get("author") as string;
    const date = formData.get("date") as string;
    const lastUpdatedDate = (formData.get("lastUpdatedDate") as string) || date || new Date().toISOString().split("T")[0];
    const content = formData.get("content") as string;

    const imageFile = formData.get("image") as File | null;
    const existingImage = formData.get("existingImage") as string;
    const imageAlt = (formData.get("imageAlt") as string) || title || "";
    const imageCaption = (formData.get("imageCaption") as string) || "";

    const tagsJson = formData.get("tags") as string;
    let tags: string[] = [];
    if (tagsJson) {
      try {
        tags = JSON.parse(tagsJson);
      } catch (e) {
        tags = tagsJson.split(",").map((t) => t.trim()).filter(Boolean);
      }
    }

    const showTableOfContents = formData.get("showTableOfContents") !== "false";
    const showAuthorInfo = formData.get("showAuthorInfo") !== "false";
    const showFeaturedImage = formData.get("showFeaturedImage") !== "false";

    const seoTitle = (formData.get("seoTitle") as string) || title || "";
    const metaDescription = (formData.get("metaDescription") as string) || description || "";
    const focusKeyword = (formData.get("focusKeyword") as string) || "";
    const secondaryKeywords = (formData.get("secondaryKeywords") as string) || "";
    const canonicalUrl = (formData.get("canonicalUrl") as string) || `https://joydigital.in/blog/${slug}`;
    const robots = (formData.get("robots") as string) || "Index, Follow";

    const internalLinksJson = formData.get("internalLinks") as string;
    let internalLinks = [];
    if (internalLinksJson) {
      try {
        internalLinks = JSON.parse(internalLinksJson);
      } catch (e) {
        internalLinks = [];
      }
    }

    const autoSuggestRelated = formData.get("autoSuggestRelated") !== "false";
    const manualRelatedSlugsJson = formData.get("manualRelatedSlugs") as string;
    let manualRelatedSlugs: string[] = [];
    if (manualRelatedSlugsJson) {
      try {
        manualRelatedSlugs = JSON.parse(manualRelatedSlugsJson);
      } catch (e) {
        manualRelatedSlugs = manualRelatedSlugsJson.split(",").map((s) => s.trim()).filter(Boolean);
      }
    }

    const authorName = (formData.get("authorName") as string) || author || "Saravanan L";
    const authorRole = (formData.get("authorRole") as string) || "Technical Web Specialist";
    const authorBio = (formData.get("authorBio") as string) || "";
    const authorImage = (formData.get("authorImage") as string) || "/assets/images/logo.webp";
    const authorProfileUrl = (formData.get("authorProfileUrl") as string) || "https://joydigital.in/about";

    const faqsJson = formData.get("faqs") as string;
    let faqs = [];
    if (faqsJson) {
      try {
        faqs = JSON.parse(faqsJson);
      } catch (e) {
        faqs = [];
      }
    }

    const ogTitle = (formData.get("ogTitle") as string) || seoTitle || title || "";
    const ogDescription = (formData.get("ogDescription") as string) || metaDescription || description || "";
    const ogImage = (formData.get("ogImage") as string) || "";

    const twitterTitle = (formData.get("twitterTitle") as string) || ogTitle || seoTitle || title || "";
    const twitterDescription = (formData.get("twitterDescription") as string) || ogDescription || metaDescription || description || "";
    const twitterImage = (formData.get("twitterImage") as string) || ogImage || "";

    const status = (formData.get("status") as string) || "Published";
    const scheduledPublishDate = (formData.get("scheduledPublishDate") as string) || "";
    const seoScore = parseInt((formData.get("seoScore") as string) || "0", 10);

    if (!title || !slug || !content) {
      return NextResponse.json({ error: "Missing required parameters: title, slug, or content" }, { status: 400 });
    }

    const cleanSlug = slug.toLowerCase().replace(/[^a-z0-9-_]/g, "");
    let imagePath = existingImage || "";
    let isWriteable = true;

    // Handle image file upload
    if (imageFile && imageFile.name && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());

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

      if (!imagePath || !imagePath.startsWith("http")) {
        try {
          const uploadDir = path.join(process.cwd(), "public", "assets", "images", "blog");
          if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
          }

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

    const finalOgImage = ogImage || imagePath;
    const finalTwitterImage = twitterImage || finalOgImage;

    // YAML Frontmatter construction
    const mdContent = `---
title: "${title.replace(/"/g, '\\"')}"
description: "${description.replace(/"/g, '\\"')}"
date: "${date || new Date().toISOString().split("T")[0]}"
lastUpdatedDate: "${lastUpdatedDate}"
category: "${category || "SEO"}"
author: "${authorName || author || "Saravanan L"}"
image: "${imagePath}"
imageAlt: "${imageAlt.replace(/"/g, '\\"')}"
imageCaption: "${imageCaption.replace(/"/g, '\\"')}"
tags: ${JSON.stringify(tags)}
showTableOfContents: ${showTableOfContents}
showAuthorInfo: ${showAuthorInfo}
showFeaturedImage: ${showFeaturedImage}
seoTitle: "${seoTitle.replace(/"/g, '\\"')}"
metaDescription: "${metaDescription.replace(/"/g, '\\"')}"
focusKeyword: "${focusKeyword.replace(/"/g, '\\"')}"
secondaryKeywords: "${secondaryKeywords.replace(/"/g, '\\"')}"
canonicalUrl: "${canonicalUrl}"
robots: "${robots}"
internalLinks: ${JSON.stringify(internalLinks)}
autoSuggestRelated: ${autoSuggestRelated}
manualRelatedSlugs: ${JSON.stringify(manualRelatedSlugs)}
authorName: "${authorName.replace(/"/g, '\\"')}"
authorRole: "${authorRole.replace(/"/g, '\\"')}"
authorBio: "${authorBio.replace(/"/g, '\\"')}"
authorImage: "${authorImage}"
authorProfileUrl: "${authorProfileUrl}"
faqs: ${JSON.stringify(faqs)}
ogTitle: "${ogTitle.replace(/"/g, '\\"')}"
ogDescription: "${ogDescription.replace(/"/g, '\\"')}"
ogImage: "${finalOgImage}"
twitterTitle: "${twitterTitle.replace(/"/g, '\\"')}"
twitterDescription: "${twitterDescription.replace(/"/g, '\\"')}"
twitterImage: "${finalTwitterImage}"
status: "${status}"
scheduledPublishDate: "${scheduledPublishDate}"
seoScore: ${seoScore}
---

${content}
`;

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
              lastUpdatedDate,
              category: category || "SEO",
              author: authorName || author || "Saravanan L",
              image: imagePath,
              imageAlt,
              imageCaption,
              tags,
              showTableOfContents,
              showAuthorInfo,
              showFeaturedImage,
              seoTitle,
              metaDescription,
              focusKeyword,
              secondaryKeywords,
              canonicalUrl,
              robots,
              internalLinks,
              autoSuggestRelated,
              manualRelatedSlugs,
              authorName,
              authorRole,
              authorBio,
              authorImage,
              authorProfileUrl,
              faqs,
              ogTitle,
              ogDescription,
              ogImage: finalOgImage,
              twitterTitle,
              twitterDescription,
              twitterImage: finalTwitterImage,
              status,
              scheduledPublishDate,
              seoScore,
              content,
              isDeleted: status === "Archived",
              updatedAt: new Date(),
            },
          },
          { upsert: true }
        );
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

// DELETE: Delete a blog post
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ error: "Missing slug parameter." }, { status: 400 });
    }

    const cleanSlug = slug.toLowerCase().replace(/[^a-z0-9-_]/g, "");
    let localDeleted = false;

    try {
      const filePath = path.join(BLOG_DIR, `${cleanSlug}.md`);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        localDeleted = true;
      }
    } catch (err) {
      console.warn("Could not delete local file:", err);
    }

    let dbDeleted = false;
    if (process.env.MONGODB_URI) {
      try {
        const db = await getDb();
        const blogsCol = db.collection("blogs");

        await blogsCol.updateOne(
          { slug: cleanSlug },
          {
            $set: {
              slug: cleanSlug,
              isDeleted: true,
              status: "Archived",
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
