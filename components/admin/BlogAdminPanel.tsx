"use client";

import React, { useState, useEffect, useRef } from "react";
import { BlogPost, InternalLinkItem, FaqItem } from "@/lib/blog";

const compressImage = (file: File, maxWidth = 1200, maxWeightBytes = 800000): Promise<File> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);

        let quality = 0.8;
        const checkAndResolve = () => {
          canvas.toBlob(
            (blob) => {
              if (blob) {
                if (blob.size > maxWeightBytes && quality > 0.3) {
                  quality -= 0.1;
                  checkAndResolve();
                } else {
                  const compressedFile = new File([blob], file.name, {
                    type: "image/jpeg",
                    lastModified: Date.now(),
                  });
                  resolve(compressedFile);
                }
              } else {
                resolve(file);
              }
            },
            "image/jpeg",
            quality
          );
        };
        checkAndResolve();
      };
      img.onerror = () => resolve(file);
    };
    reader.onerror = () => resolve(file);
  });
};

const SERVICE_LINK_PRESETS = [
  { label: "Website Design", url: "/web-design-services" },
  { label: "Web Development", url: "/website-development" },
  { label: "SEO Services", url: "/seo-services" },
  { label: "Local SEO", url: "/local-seo-services" },
  { label: "Digital Marketing", url: "/social-media-marketing" },
  { label: "Google Business Profile", url: "/google-business-profile-optimization" },
  { label: "Custom Software", url: "/custom-software-development" },
];

const DEFAULT_CATEGORY_LINKS: Record<string, InternalLinkItem[]> = {
  "SEO": [
    { anchorText: "SEO Services", targetUrl: "/seo-services" },
    { anchorText: "Local SEO Solutions", targetUrl: "/local-seo-services" }
  ],
  "SEO Services": [
    { anchorText: "SEO Services", targetUrl: "/seo-services" },
    { anchorText: "Free Website Audit", targetUrl: "/free-website-audit" }
  ],
  "Local SEO": [
    { anchorText: "Google Business Profile Optimization", targetUrl: "/google-business-profile-optimization" },
    { anchorText: "Local SEO Services", targetUrl: "/local-seo-services" }
  ],
  "Web Development": [
    { anchorText: "Custom Web Development", targetUrl: "/website-development" },
    { anchorText: "Web Design Services", targetUrl: "/web-design-services" }
  ],
  "Web Design": [
    { anchorText: "Website Design Agency", targetUrl: "/web-design-services" },
    { anchorText: "Ecommerce Website Development", targetUrl: "/ecommerce-website-development" }
  ],
  "Digital Marketing": [
    { anchorText: "Digital Marketing Agency", targetUrl: "/digital-marketing-agency-in-chennai" },
    { anchorText: "Social Media Marketing", targetUrl: "/social-media-marketing" }
  ],
  "General": [
    { anchorText: "Free Website Audit Tool", targetUrl: "/free-website-audit" },
    { anchorText: "Custom Software Solutions", targetUrl: "/custom-software-development" }
  ]
};

function deriveFocusKeyword(title: string, category: string): string {
  const t = (title || "").toLowerCase();
  if (t.includes("next.js") || t.includes("nextjs")) return "Next.js";
  if (t.includes("google maps") || t.includes("google business")) return "Google Maps";
  if (t.includes("custom website")) return "Custom Website";
  if (t.includes("local seo")) return "Local SEO";
  if (t.includes("real estate")) return "Real Estate";
  if (t.includes("travel") || t.includes("resort")) return "Travel";
  if (t.includes("insurance")) return "Insurance Agent";
  if (t.includes("cost") || t.includes("price")) return "Website Cost";
  if (t.includes("digital marketing")) return "Digital Marketing";
  if (t.includes("rank") || t.includes("seo")) return "SEO";
  return category || "Web Development";
}

export default function BlogAdminPanel() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editorMode, setEditorMode] = useState<"create" | "edit">("create");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Analytics state
  const [analytics, setAnalytics] = useState<any>(null);
  const [chartTimeframe, setChartTimeframe] = useState<"daily" | "weekly" | "monthly" | "yearly">("daily");

  // Section Collapse State (All 12 Sections)
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    basic: true,
    content: true,
    media: true,
    seo: true,
    serp: true,
    checklist: true,
    internalLinks: false,
    related: false,
    author: false,
    faq: false,
    social: false,
    publishing: true,
  });

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Preview Tabs State
  const [serpTab, setSerpTab] = useState<"desktop" | "mobile">("desktop");
  const [socialTab, setSocialTab] = useState<"facebook" | "linkedin" | "twitter">("facebook");

  // Basic Information State
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("SEO");
  const [tags, setTags] = useState("");
  const [author, setAuthor] = useState("Saravanan L");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [lastUpdatedDate, setLastUpdatedDate] = useState(new Date().toISOString().split("T")[0]);

  // Content & Toggles State
  const [content, setContent] = useState("");
  const [showTableOfContents, setShowTableOfContents] = useState(true);
  const [showAuthorInfo, setShowAuthorInfo] = useState(true);
  const [showFeaturedImage, setShowFeaturedImage] = useState(true);

  // Media State
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [existingImage, setExistingImage] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [imageCaption, setImageCaption] = useState("");

  // SEO Settings State
  const [seoTitle, setSeoTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [focusKeyword, setFocusKeyword] = useState("");
  const [secondaryKeywords, setSecondaryKeywords] = useState("");
  const [canonicalUrl, setCanonicalUrl] = useState("");
  const [robots, setRobots] = useState("Index, Follow");

  // Internal Links State
  const [internalLinks, setInternalLinks] = useState<InternalLinkItem[]>([]);
  const [newAnchor, setNewAnchor] = useState("");
  const [newTarget, setNewTarget] = useState("/website-development");

  // Related Posts State
  const [autoSuggestRelated, setAutoSuggestRelated] = useState(true);
  const [manualRelatedSlugs, setManualRelatedSlugs] = useState<string[]>([]);

  // Author E-E-A-T State
  const [authorName, setAuthorName] = useState("Saravanan L");
  const [authorRole, setAuthorRole] = useState("Technical Web & SEO Specialist");
  const [authorBio, setAuthorBio] = useState("Digital marketing strategist and Next.js web developer focusing on search optimization and conversion rate growth.");
  const [authorImage, setAuthorImage] = useState("/assets/images/logo.webp");
  const [authorProfileUrl, setAuthorProfileUrl] = useState("https://joydigital.in/about");

  // FAQ Builder State
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [newFaqQuestion, setNewFaqQuestion] = useState("");
  const [newFaqAnswer, setNewFaqAnswer] = useState("");

  // Social Sharing State
  const [ogTitle, setOgTitle] = useState("");
  const [ogDescription, setOgDescription] = useState("");
  const [ogImage, setOgImage] = useState("");
  const [twitterTitle, setTwitterTitle] = useState("");
  const [twitterDescription, setTwitterDescription] = useState("");
  const [twitterImage, setTwitterImage] = useState("");

  // Status & Publishing State
  const [status, setStatus] = useState<"Published" | "Draft" | "Scheduled" | "Archived">("Published");
  const [scheduledPublishDate, setScheduledPublishDate] = useState("");

  // UI States
  const [submitLoading, setSubmitLoading] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const [msg, setMsg] = useState({ text: "", type: "" });
  const [previewActive, setPreviewActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchPosts();
    fetchAnalytics();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/blog");
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      }
    } catch (err) {
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const res = await fetch("/api/admin/analytics");
      if (res.ok) {
        const data = await res.json();
        setAnalytics(data);
      }
    } catch (err) {
      console.error("Error fetching blog analytics:", err);
    }
  };

  // Sync title with auto-slug and default SEO title
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (editorMode === "create") {
      const suggestedSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .substring(0, 60);
      setSlug(suggestedSlug);
      if (!seoTitle) setSeoTitle(val);
      if (!canonicalUrl) setCanonicalUrl(`https://joydigital.in/blog/${suggestedSlug}`);
    }
  };

  // Handle image upload with auto compression
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      setImagePreview(URL.createObjectURL(file));
      setIsCompressing(true);

      try {
        const compressed = await compressImage(file);
        setImageFile(compressed);
      } catch (err) {
        console.error("Image compression failed, using original:", err);
        setImageFile(file);
      } finally {
        setIsCompressing(false);
      }
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleEditClick = (post: BlogPost) => {
    setEditorMode("edit");
    setTitle(post.title);
    setSlug(post.slug);
    setDescription(post.description);
    setCategory(post.category);
    setTags(Array.isArray(post.tags) ? post.tags.join(", ") : "");
    setAuthor(post.author || post.authorName || "Saravanan L");
    setDate(post.date);
    setLastUpdatedDate(post.lastUpdatedDate || post.date || new Date().toISOString().split("T")[0]);
    setContent(post.content);

    setShowTableOfContents(post.showTableOfContents !== false);
    setShowAuthorInfo(post.showAuthorInfo !== false);
    setShowFeaturedImage(post.showFeaturedImage !== false);

    setExistingImage(post.image || "");
    setImagePreview(post.image || "");
    setImageFile(null);
    setImageAlt(post.imageAlt || post.title || "");
    setImageCaption(post.imageCaption || "");

    const postSeoTitle = post.seoTitle || post.title || "";
    setSeoTitle(postSeoTitle);
    setMetaDescription(post.metaDescription || post.description || "");

    const kw = post.focusKeyword || deriveFocusKeyword(post.title, post.category);
    setFocusKeyword(kw);
    setSecondaryKeywords(post.secondaryKeywords || `${post.category}, Joy Digital, SEO Strategy`);
    setCanonicalUrl(post.canonicalUrl || `https://joydigital.in/blog/${post.slug}`);
    setRobots(post.robots || "Index, Follow");

    const links = post.internalLinks && post.internalLinks.length > 0
      ? post.internalLinks
      : (DEFAULT_CATEGORY_LINKS[post.category] || DEFAULT_CATEGORY_LINKS["General"]);
    setInternalLinks(links);

    setAutoSuggestRelated(post.autoSuggestRelated !== false);
    setManualRelatedSlugs(post.manualRelatedSlugs || []);

    setAuthorName(post.authorName || post.author || "Saravanan L");
    setAuthorRole(post.authorRole || "Technical Web & SEO Specialist");
    setAuthorBio(post.authorBio || "Digital marketing strategist and Next.js web developer focusing on search optimization and conversion rate growth.");
    setAuthorImage(post.authorImage || "/assets/images/logo.webp");
    setAuthorProfileUrl(post.authorProfileUrl || "https://joydigital.in/about");

    setFaqs(post.faqs || []);

    setOgTitle(post.ogTitle || postSeoTitle);
    setOgDescription(post.ogDescription || post.metaDescription || post.description || "");
    setOgImage(post.ogImage || post.image || "");
    setTwitterTitle(post.twitterTitle || post.ogTitle || postSeoTitle);
    setTwitterDescription(post.twitterDescription || post.ogDescription || post.metaDescription || post.description || "");
    setTwitterImage(post.twitterImage || post.ogImage || post.image || "");

    setStatus(post.status || "Published");
    setScheduledPublishDate(post.scheduledPublishDate || "");

    setIsEditing(true);
    setPreviewActive(false);
    setMsg({ text: "", type: "" });
  };

  const handleCreateClick = () => {
    setEditorMode("create");
    const today = new Date().toISOString().split("T")[0];
    setTitle("");
    setSlug("");
    setDescription("");
    setCategory("SEO");
    setTags("SEO, Next.js, Web Development");
    setAuthor("Saravanan L");
    setDate(today);
    setLastUpdatedDate(today);
    setContent("");

    setShowTableOfContents(true);
    setShowAuthorInfo(true);
    setShowFeaturedImage(true);

    setExistingImage("");
    setImagePreview("");
    setImageFile(null);
    setImageAlt("");
    setImageCaption("");

    setSeoTitle("");
    setMetaDescription("");
    setFocusKeyword("");
    setSecondaryKeywords("");
    setCanonicalUrl("");
    setRobots("Index, Follow");

    setInternalLinks(DEFAULT_CATEGORY_LINKS["SEO"]);
    setAutoSuggestRelated(true);
    setManualRelatedSlugs([]);

    setAuthorName("Saravanan L");
    setAuthorRole("Technical Web & SEO Specialist");
    setAuthorBio("Digital marketing strategist and Next.js web developer focusing on search optimization and conversion rate growth.");
    setAuthorImage("/assets/images/logo.webp");
    setAuthorProfileUrl("https://joydigital.in/about");

    setFaqs([]);

    setOgTitle("");
    setOgDescription("");
    setOgImage("");
    setTwitterTitle("");
    setTwitterDescription("");
    setTwitterImage("");

    setStatus("Published");
    setScheduledPublishDate("");

    setIsEditing(true);
    setPreviewActive(false);
    setMsg({ text: "", type: "" });
  };

  const handleDeleteClick = async (postSlug: string) => {
    if (!confirm(`Are you sure you want to delete the blog post "${postSlug}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/blog?slug=${postSlug}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setMsg({ text: "Blog post deleted successfully!", type: "success" });
        fetchPosts();
      } else {
        const err = await res.json();
        setMsg({ text: err.error || "Failed to delete post.", type: "error" });
      }
    } catch (error) {
      setMsg({ text: "Request error deleting post.", type: "error" });
    }
  };

  // Internal Links Handler
  const handleAddInternalLink = () => {
    if (!newAnchor || !newTarget) return;
    setInternalLinks([...internalLinks, { anchorText: newAnchor, targetUrl: newTarget }]);
    setNewAnchor("");
  };

  const handleRemoveInternalLink = (index: number) => {
    setInternalLinks(internalLinks.filter((_, i) => i !== index));
  };

  // FAQ Builder Handlers
  const handleAddFaq = () => {
    if (!newFaqQuestion || !newFaqAnswer) return;
    setFaqs([...faqs, { question: newFaqQuestion, answer: newFaqAnswer }]);
    setNewFaqQuestion("");
    setNewFaqAnswer("");
  };

  const handleRemoveFaq = (index: number) => {
    setFaqs(faqs.filter((_, i) => i !== index));
  };

  const handleMoveFaq = (index: number, direction: "up" | "down") => {
    const newFaqs = [...faqs];
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= newFaqs.length) return;
    const temp = newFaqs[index];
    newFaqs[index] = newFaqs[targetIdx];
    newFaqs[targetIdx] = temp;
    setFaqs(newFaqs);
  };

  // Calculate live word count & reading time
  const cleanContentText = content.replace(/<[^>]+>/g, " ").replace(/[#*`_>-\[\]()]/g, " ").trim();
  const wordCount = cleanContentText ? cleanContentText.split(/\s+/).filter(Boolean).length : 0;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  // Detect Headings
  const headingsList = (content.match(/^(#{1,3})\s+(.+)$/gm) || []).map((h) => {
    const level = h.startsWith("###") ? 3 : h.startsWith("##") ? 2 : 1;
    const text = h.replace(/^#{1,3}\s+/, "").trim();
    return { level, text };
  });

  // Calculate Live SEO Content Score (0 - 100) & Checklist Items
  const computeSeoChecklist = () => {
    const effectiveSeoTitle = (seoTitle || title || "").trim();
    const effectiveMetaDesc = (metaDescription || description || "").trim();
    const effectiveImage = imagePreview || existingImage || imageFile;
    const effectiveAlt = (imageAlt || title || "").trim();

    const derivedKw = focusKeyword || deriveFocusKeyword(title, category);
    const kw = (derivedKw || "").toLowerCase().trim();
    const introText = cleanContentText.substring(0, 1000).toLowerCase();

    const hasTitle = Boolean(effectiveSeoTitle);
    const titleLenOk = effectiveSeoTitle.length >= 30 && effectiveSeoTitle.length <= 80;
    const hasDesc = Boolean(effectiveMetaDesc);
    const descLenOk = effectiveMetaDesc.length >= 100 && effectiveMetaDesc.length <= 165;
    const hasFocusKw = Boolean(kw);
    const kwInTitle = hasFocusKw && effectiveSeoTitle.toLowerCase().includes(kw);
    const kwInIntro = hasFocusKw && (introText.includes(kw) || cleanContentText.toLowerCase().includes(kw));
    const hasHeadings = headingsList.some((h) => h.level === 2 || h.level === 3);
    const hasImage = Boolean(effectiveImage);
    const hasAlt = Boolean(effectiveAlt);
    const hasInternalLinks = internalLinks.length > 0 || /\[.*?\]\(\/(?!blog\/)[^\)]+\)/i.test(content);
    const hasExternalLinks = /https?:\/\/(?!joydigital\.in)/i.test(content);
    const depthOk = wordCount >= 300;
    const cleanSlugOk = Boolean(slug) && /^[a-z0-9-]+$/.test(slug);
    const hasCanonical = Boolean(canonicalUrl);
    const hasAuthor = Boolean(authorName || author);
    const hasUpdatedDate = Boolean(lastUpdatedDate);

    const checks = [
      { label: "SEO Title exists", passed: hasTitle, weight: 6, rec: "Add an SEO Title" },
      { label: "SEO Title length (30–80 chars)", passed: titleLenOk, weight: 6, rec: `Current length: ${effectiveSeoTitle.length} chars (Recommended: 30-80)` },
      { label: "Meta Description exists", passed: hasDesc, weight: 6, rec: "Add a Meta Description" },
      { label: "Meta Description length (100–165 chars)", passed: descLenOk, weight: 6, rec: `Current length: ${effectiveMetaDesc.length} chars (Recommended: 100-165)` },
      { label: "Focus Keyword specified", passed: hasFocusKw, weight: 5, rec: "Specify a primary Focus Keyword for checklist scoring" },
      { label: "Focus Keyword in Title", passed: kwInTitle, weight: 6, rec: "Include Focus Keyword in your SEO Title" },
      { label: "Focus Keyword in content introduction", passed: kwInIntro, weight: 6, rec: "Include Focus Keyword in the content introduction" },
      { label: "H2/H3 Heading structure present", passed: hasHeadings, weight: 6, rec: "Use ## (H2) and ### (H3) headers to break up content" },
      { label: "Featured Image provided", passed: hasImage, weight: 6, rec: "Upload a Featured Image" },
      { label: "Image Alt Text provided", passed: hasAlt, weight: 6, rec: "Add descriptive Alt Text for the Featured Image" },
      { label: "Internal links configured", passed: hasInternalLinks, weight: 6, rec: "Add at least 1 internal link to related services or pages" },
      { label: "External references or rich depth", passed: hasExternalLinks || wordCount >= 400, weight: 5, rec: "Include authoritative references or rich content depth" },
      { label: "Sufficient content depth (>= 300 words)", passed: depthOk, weight: 7, rec: `Current word count: ${wordCount} words (Recommended: 300+ words)` },
      { label: "Clean URL slug", passed: cleanSlugOk, weight: 5, rec: "Ensure URL slug contains only lowercase letters, numbers, and hyphens" },
      { label: "Canonical URL defined", passed: hasCanonical, weight: 4, rec: "Set a self-referencing Canonical URL" },
      { label: "Author information complete", passed: hasAuthor, weight: 5, rec: "Provide Author Name and E-E-A-T bio" },
      { label: "Last updated date set", passed: hasUpdatedDate, weight: 5, rec: "Specify a Last Updated Date" },
    ];

    const score = Math.min(100, checks.reduce((acc, c) => (c.passed ? acc + c.weight : acc), 0));

    return { checks, score };
  };

  const { checks: seoChecks, score: seoScore } = computeSeoChecklist();

  // Form Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug || !content) {
      setMsg({ text: "Please fill out all required fields: Title, Slug, and Content.", type: "error" });
      return;
    }

    setSubmitLoading(true);
    setMsg({ text: "", type: "" });

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("slug", slug);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("author", author);
      formData.append("date", date);
      formData.append("lastUpdatedDate", lastUpdatedDate);
      formData.append("content", content);

      if (imageFile) formData.append("image", imageFile);
      if (existingImage) formData.append("existingImage", existingImage);
      formData.append("imageAlt", imageAlt || title);
      formData.append("imageCaption", imageCaption);

      const parsedTags = tags.split(",").map((t) => t.trim()).filter(Boolean);
      formData.append("tags", JSON.stringify(parsedTags));

      formData.append("showTableOfContents", String(showTableOfContents));
      formData.append("showAuthorInfo", String(showAuthorInfo));
      formData.append("showFeaturedImage", String(showFeaturedImage));

      formData.append("seoTitle", seoTitle || title);
      formData.append("metaDescription", metaDescription || description);
      formData.append("focusKeyword", focusKeyword || deriveFocusKeyword(title, category));
      formData.append("secondaryKeywords", secondaryKeywords);
      formData.append("canonicalUrl", canonicalUrl || `https://joydigital.in/blog/${slug}`);
      formData.append("robots", robots);

      formData.append("internalLinks", JSON.stringify(internalLinks));
      formData.append("autoSuggestRelated", String(autoSuggestRelated));
      formData.append("manualRelatedSlugs", JSON.stringify(manualRelatedSlugs));

      formData.append("authorName", authorName || author);
      formData.append("authorRole", authorRole);
      formData.append("authorBio", authorBio);
      formData.append("authorImage", authorImage);
      formData.append("authorProfileUrl", authorProfileUrl);

      formData.append("faqs", JSON.stringify(faqs));

      formData.append("ogTitle", ogTitle || seoTitle || title);
      formData.append("ogDescription", ogDescription || metaDescription || description);
      formData.append("ogImage", ogImage || imagePreview || existingImage);
      formData.append("twitterTitle", twitterTitle || ogTitle || seoTitle || title);
      formData.append("twitterDescription", twitterDescription || ogDescription || metaDescription || description);
      formData.append("twitterImage", twitterImage || ogImage || imagePreview || existingImage);

      formData.append("status", status);
      formData.append("scheduledPublishDate", scheduledPublishDate);
      formData.append("seoScore", String(seoScore));

      const res = await fetch("/api/admin/blog", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setMsg({
          text: editorMode === "create" ? "Blog article published successfully!" : "Blog article updated successfully!",
          type: "success",
        });
        setIsEditing(false);
        fetchPosts();
      } else {
        const err = await res.json();
        setMsg({ text: err.error || "Publishing failed.", type: "error" });
      }
    } catch (error) {
      console.error(error);
      setMsg({ text: "Error submitting request.", type: "error" });
    } finally {
      setSubmitLoading(false);
    }
  };

  // Filter posts based on search term
  const filteredPosts = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 w-full text-slate-900 select-text">
      
      {/* Alert Banner */}
      {msg.text && (
        <div className={`p-4 rounded-xl text-xs font-bold border flex items-center justify-between ${
          msg.type === "success"
            ? "bg-emerald-50 text-emerald-700 border-emerald-250"
            : "bg-rose-50 text-rose-700 border-rose-250"
        }`}>
          <span>{msg.text}</span>
          <button onClick={() => setMsg({ text: "", type: "" })} className="text-[10px] cursor-pointer hover:opacity-75">✕</button>
        </div>
      )}

      {/* A. CMS DIRECTORY VIEW */}
      {!isEditing && (
        <div className="flex flex-col gap-6">

          {/* Quick Analytics Summary Bar */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 select-none">
            <div className="bg-white border border-slate-200/80 rounded-[20px] p-4.5 shadow-sm flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-lg font-bold shrink-0">
                <i className="fa-solid fa-newspaper" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Published Posts</span>
                <span className="text-lg font-black text-slate-900 truncate block">{posts.length} Articles</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-[20px] p-4.5 shadow-sm flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center text-lg font-bold shrink-0">
                <i className="fa-solid fa-chart-line" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Total Blog Traffic</span>
                <span className="text-lg font-black text-slate-900 truncate block">
                  {(analytics?.totalBlogPageviews ?? 0).toLocaleString()} Pageviews
                </span>
              </div>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-[20px] p-4.5 shadow-sm flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center text-lg font-bold shrink-0">
                <i className="fa-solid fa-book-open" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Direct Article Reads</span>
                <span className="text-lg font-black text-slate-900 truncate block">
                  {posts.reduce((acc, p) => acc + (p.views || 0), 0).toLocaleString()} Reads
                </span>
              </div>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-[20px] p-4.5 shadow-sm flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center text-lg font-bold shrink-0">
                <i className="fa-solid fa-circle-check" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Avg. SEO Score</span>
                <span className="text-lg font-black text-slate-900 truncate block">
                  {posts.length > 0
                    ? Math.round(posts.reduce((acc, p) => acc + (p.seoScore || 85), 0) / posts.length)
                    : 100} / 100
                </span>
              </div>
            </div>
          </div>

          {/* TABLE CONTAINER */}
          <div className="bg-white border border-slate-200/80 rounded-[20px] p-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-sm font-black text-slate-900">SEO-Optimized Blog Articles</h3>
                <p className="text-[10px] text-slate-500 font-semibold mt-0.5">Manage articles, publish status, SEO scores, and indexability</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search title, slug..."
                    className="pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl outline-none focus:bg-white focus:border-primary text-xs font-medium w-52"
                  />
                </div>

                <button
                  onClick={handleCreateClick}
                  className="bg-primary hover:bg-primary-light text-white font-extrabold text-[10px] uppercase tracking-wider px-4 py-2.5 rounded-xl shadow-sm hover:-translate-y-0.5 transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
                >
                  <i className="fa-solid fa-plus" /> Draft New Post
                </button>
              </div>
            </div>

            {loading ? (
              <div className="py-12 flex flex-col items-center justify-center gap-3">
                <div className="w-6 h-6 border-2 border-slate-200 border-t-primary rounded-full animate-spin" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Loading articles...</span>
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="py-16 text-center border-2 border-dashed border-slate-200 rounded-2xl">
                <i className="fa-regular fa-folder-open text-2xl text-slate-300 mb-3 block" />
                <p className="text-xs font-bold text-slate-500">No blog files discovered</p>
                <p className="text-[10px] text-slate-400 mt-1">Create your first post to display it in the listing.</p>
              </div>
            ) : (() => {
              const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
              const startIndex = (currentPage - 1) * itemsPerPage;
              const paginatedPosts = filteredPosts.slice(startIndex, startIndex + itemsPerPage);

              return (
                <div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200 text-slate-500 font-black text-[9px] uppercase tracking-wider">
                          <th className="py-3 px-4">Title / Slug</th>
                          <th className="py-3 px-4">Category</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4">Views</th>
                          <th className="py-3 px-4">Dates</th>
                          <th className="py-3 px-4">SEO Content Score</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedPosts.map((post) => {
                          const pStatus = post.status || "Published";
                          const score = post.seoScore ?? 85;

                          return (
                            <tr key={post.slug} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                              <td className="py-4 px-4 max-w-xs">
                                <div className="font-bold text-slate-900 truncate" title={post.title}>{post.title}</div>
                                <div className="text-[10px] text-slate-450 font-semibold mt-0.5 select-all font-mono truncate max-w-[200px]">
                                  /blog/{post.slug}
                                </div>
                              </td>

                              <td className="py-4 px-4 whitespace-nowrap">
                                <span className="bg-primary/10 text-primary border border-primary/20 text-[9px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                                  {post.category}
                                </span>
                              </td>

                              <td className="py-4 px-4 whitespace-nowrap">
                                <span className={`text-[9.5px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider border ${
                                  pStatus === "Published" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                                  pStatus === "Draft" ? "bg-amber-50 text-amber-700 border-amber-200" :
                                  pStatus === "Scheduled" ? "bg-blue-50 text-blue-700 border-blue-200" :
                                  "bg-slate-100 text-slate-600 border-slate-200"
                                }`}>
                                  {pStatus}
                                </span>
                              </td>

                              <td className="py-4 px-4 whitespace-nowrap">
                                <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold text-slate-800 bg-slate-100 border border-slate-200/80 px-2.5 py-1 rounded-full" title={`${post.views || 0} Total Pageviews`}>
                                  <i className="fa-solid fa-eye text-primary text-[9px]" />
                                  {(post.views || 0).toLocaleString()} Views
                                </span>
                              </td>

                              <td className="py-4 px-4 text-[10px] text-slate-500 font-semibold whitespace-nowrap">
                                <div>Pub: {post.date}</div>
                                {post.lastUpdatedDate && post.lastUpdatedDate !== post.date && (
                                  <div className="text-[9px] text-slate-400">Upd: {post.lastUpdatedDate}</div>
                                )}
                              </td>

                              <td className="py-4 px-4 whitespace-nowrap">
                                <span className={`inline-flex items-center gap-1 text-[10px] font-black px-2.5 py-0.5 rounded-full border ${
                                  score >= 80 ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                                  score >= 60 ? "bg-amber-50 text-amber-700 border-amber-200" :
                                  "bg-rose-50 text-rose-700 border-rose-200"
                                }`}>
                                  <i className="fa-solid fa-chart-pie text-[9px]" /> {score}/100
                                </span>
                              </td>

                              <td className="py-4 px-4 text-right whitespace-nowrap">
                                <div className="inline-flex gap-2">
                                  <a
                                    href={`/blog/${post.slug}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-slate-100 hover:bg-slate-200/80 text-slate-700 border border-slate-200 text-[10px] font-extrabold px-2.5 py-1.5 rounded-lg cursor-pointer transition-all"
                                    title="View Article Live"
                                  >
                                    <i className="fa-solid fa-arrow-up-right-from-square" />
                                  </a>
                                  <button
                                    onClick={() => handleEditClick(post)}
                                    className="bg-slate-100 hover:bg-slate-200/80 text-slate-700 border border-slate-200 text-[10px] font-extrabold px-3 py-1.5 rounded-lg cursor-pointer transition-all"
                                  >
                                    <i className="fa-solid fa-pen-to-square mr-1" /> Edit
                                  </button>
                                  <button
                                    onClick={() => handleDeleteClick(post.slug)}
                                    className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-150 text-[10px] font-extrabold px-3 py-1.5 rounded-lg cursor-pointer transition-all"
                                  >
                                    <i className="fa-solid fa-trash-can mr-1" /> Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t border-slate-100 text-xs font-bold text-slate-500">
                      <div>
                        Showing <span className="text-slate-900 font-extrabold">{startIndex + 1}</span> to{" "}
                        <span className="text-slate-900 font-extrabold">{Math.min(startIndex + itemsPerPage, filteredPosts.length)}</span> of{" "}
                        <span className="text-slate-900 font-extrabold">{filteredPosts.length}</span> articles
                      </div>

                      <div className="flex items-center gap-1.5 select-none">
                        <button
                          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-extrabold disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
                        >
                          <i className="fa-solid fa-chevron-left text-[10px]" /> Prev
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`w-8 h-8 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                              currentPage === pageNum
                                ? "bg-primary text-white shadow-xs"
                                : "bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200"
                            }`}
                          >
                            {pageNum}
                          </button>
                        ))}

                        <button
                          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                          disabled={currentPage === totalPages}
                          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-extrabold disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
                        >
                          Next <i className="fa-solid fa-chevron-right text-[10px]" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* B. BLOG EDITOR WINDOW */}
      {isEditing && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          {/* Top Bar Header */}
          <div className="bg-white border border-slate-200/80 rounded-[20px] p-4.5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-black text-slate-900">
                  {editorMode === "create" ? "Create SEO Blog Post" : `Edit Article: ${title || slug}`}
                </h3>
                <span className={`text-[11px] font-black px-3 py-0.5 rounded-full border ${
                  seoScore >= 80 ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                  seoScore >= 60 ? "bg-amber-50 text-amber-700 border-amber-200" :
                  "bg-rose-50 text-rose-700 border-rose-200"
                }`}>
                  SEO Content Score: {seoScore}/100
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-semibold mt-0.5">
                {wordCount} words &bull; {readingTime} min read &bull; {headingsList.length} Headings
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => setPreviewActive(!previewActive)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-xs font-bold px-4 py-2 rounded-xl cursor-pointer flex items-center gap-1.5"
              >
                <i className={`fa-regular ${previewActive ? "fa-pen-to-square" : "fa-eye"}`} />
                {previewActive ? "Back to Write" : "Full Live Preview"}
              </button>

              <button
                type="submit"
                disabled={submitLoading || isCompressing}
                className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-md cursor-pointer transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {submitLoading ? (
                  <>
                    <div className="w-3.5 h-3.5 border border-white border-t-transparent rounded-full animate-spin" />
                    <span>Publishing...</span>
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-cloud-arrow-up" />
                    <span>{status === "Draft" ? "Save Draft" : status === "Scheduled" ? "Schedule Post" : "Publish Article"}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 text-xs font-bold px-3 py-2.5 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>

          {/* PREVIEW MODE TOGGLE WINDOW */}
          {previewActive ? (
            <div className="bg-white border border-slate-200 rounded-[24px] p-8 shadow-sm">
              <div className="mb-6 pb-6 border-b border-slate-200 flex justify-between items-center">
                <span className="text-xs font-black uppercase text-primary tracking-widest">Full Web Article Live Preview</span>
                <button
                  onClick={() => setPreviewActive(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-xs font-bold px-4 py-1.5 rounded-lg"
                >
                  Return to Editor
                </button>
              </div>

              {/* Full Article Mockup Preview */}
              <div className="max-w-4xl mx-auto text-left space-y-6">
                <nav className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                  Home / Blog / {category} / {title || "Untitled"}
                </nav>
                <h1 className="text-3xl font-black text-slate-900 mb-4">{title || "Untitled Post Title"}</h1>
                <div className="flex items-center gap-3 text-xs text-slate-500 font-semibold border-y border-slate-100 py-3">
                  <span>By {authorName || author} ({authorRole})</span>
                  <span>&bull;</span>
                  <span>{date}</span>
                  <span>&bull;</span>
                  <span>{readingTime} min read ({wordCount} words)</span>
                </div>

                {showFeaturedImage && (imagePreview || existingImage) && (
                  <div className="relative w-full h-72 rounded-2xl overflow-hidden border border-slate-200 my-6">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={imagePreview || existingImage} alt={imageAlt || title} className="w-full h-full object-cover" />
                    {imageCaption && <p className="text-center text-xs text-slate-500 italic mt-2">{imageCaption}</p>}
                  </div>
                )}

                <div className="prose max-w-none text-slate-700 leading-relaxed text-sm space-y-4">
                  {content.split("\n").map((line, idx) => {
                    if (line.startsWith("## ")) return <h2 key={idx} className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2 mt-6">{line.substring(3)}</h2>;
                    if (line.startsWith("### ")) return <h3 key={idx} className="text-lg font-bold text-slate-900 mt-5">{line.substring(4)}</h3>;
                    if (line.startsWith("- ")) return <li key={idx} className="ml-4 list-disc text-xs text-slate-650">{line.substring(2)}</li>;
                    if (line.trim() === "") return <div key={idx} className="h-2" />;
                    return <p key={idx} className="text-xs text-slate-700 leading-relaxed">{line}</p>;
                  })}
                </div>

                {/* FAQ Preview */}
                {faqs.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-slate-200">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Frequently Asked Questions</h3>
                    <div className="space-y-3">
                      {faqs.map((f, i) => (
                        <div key={i} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                          <div className="font-bold text-slate-900 mb-1">Q: {f.question}</div>
                          <div className="text-slate-650">{f.answer}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* 12 COLLAPSIBLE EDITOR ACCORDION SECTIONS */
            <div className="flex flex-col gap-5">

              {/* 1. BASIC INFORMATION */}
              <div className="bg-white border border-slate-200/80 rounded-[20px] p-6 shadow-sm">
                <button
                  type="button"
                  onClick={() => toggleSection("basic")}
                  className="w-full flex items-center justify-between text-left font-black text-sm text-slate-900 cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <i className="fa-solid fa-info-circle text-primary" /> 1. Basic Blog Information
                  </span>
                  <i className={`fa-solid fa-chevron-down text-slate-400 transition-transform ${openSections.basic ? "rotate-180 text-primary" : ""}`} />
                </button>

                {openSections.basic && (
                  <div className="mt-5 pt-5 border-t border-slate-100 flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                        Post Title <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        placeholder="e.g. Custom Website Development: Why Your Business Needs a Custom Built Site"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-slate-950 rounded-xl outline-none focus:bg-white focus:border-primary text-xs font-semibold"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                          URL Slug <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={slug}
                          onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"))}
                          placeholder="e.g. custom-website-development-guide"
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-slate-950 rounded-xl outline-none focus:bg-white focus:border-primary text-xs font-mono font-semibold"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                          Category <span className="text-rose-500">*</span>
                        </label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-slate-950 rounded-xl outline-none focus:bg-white focus:border-primary text-xs font-bold"
                        >
                          <option value="SEO">SEO</option>
                          <option value="Web Development">Web Development</option>
                          <option value="Website Design">Website Design</option>
                          <option value="E-commerce">E-commerce</option>
                          <option value="Digital Marketing">Digital Marketing</option>
                          <option value="Branding">Branding</option>
                          <option value="Local SEO">Local SEO</option>
                          <option value="General">General</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Tags (comma separated)</label>
                        <input
                          type="text"
                          value={tags}
                          onChange={(e) => setTags(e.target.value)}
                          placeholder="e.g. SEO, Web Dev, React"
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-slate-950 rounded-xl outline-none text-xs font-semibold"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Publish Date</label>
                        <input
                          type="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-slate-950 rounded-xl outline-none text-xs font-semibold"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Last Updated Date</label>
                        <input
                          type="date"
                          value={lastUpdatedDate}
                          onChange={(e) => setLastUpdatedDate(e.target.value)}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-slate-950 rounded-xl outline-none text-xs font-semibold"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 2. CONTENT & READABILITY */}
              <div className="bg-white border border-slate-200/80 rounded-[20px] p-6 shadow-sm">
                <button
                  type="button"
                  onClick={() => toggleSection("content")}
                  className="w-full flex items-center justify-between text-left font-black text-sm text-slate-900 cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <i className="fa-solid fa-file-pen text-primary" /> 2. Blog Content &amp; Readability
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] bg-slate-100 font-bold px-2.5 py-0.5 rounded-full text-slate-600">
                      {wordCount} words &bull; {readingTime} min read
                    </span>
                    <i className={`fa-solid fa-chevron-down text-slate-400 transition-transform ${openSections.content ? "rotate-180 text-primary" : ""}`} />
                  </div>
                </button>

                {openSections.content && (
                  <div className="mt-5 pt-5 border-t border-slate-100 flex flex-col gap-4">
                    {/* Content Toggles */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={showTableOfContents}
                          onChange={(e) => setShowTableOfContents(e.target.checked)}
                          className="rounded border-slate-300 text-primary focus:ring-primary"
                        />
                        <span>Table of Contents Sidebar</span>
                      </label>

                      <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={showAuthorInfo}
                          onChange={(e) => setShowAuthorInfo(e.target.checked)}
                          className="rounded border-slate-300 text-primary focus:ring-primary"
                        />
                        <span>Show Author E-E-A-T Card</span>
                      </label>

                      <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={showFeaturedImage}
                          onChange={(e) => setShowFeaturedImage(e.target.checked)}
                          className="rounded border-slate-300 text-primary focus:ring-primary"
                        />
                        <span>Show Featured Cover Image</span>
                      </label>
                    </div>

                    {/* Markdown Body Textarea */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                        Markdown Content Body <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        required
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write article markdown contents here..."
                        rows={16}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-slate-950 rounded-xl outline-none focus:bg-white focus:border-primary text-xs font-mono leading-relaxed"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* 3. MEDIA & ASSETS */}
              <div className="bg-white border border-slate-200/80 rounded-[20px] p-6 shadow-sm">
                <button
                  type="button"
                  onClick={() => toggleSection("media")}
                  className="w-full flex items-center justify-between text-left font-black text-sm text-slate-900 cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <i className="fa-solid fa-image text-primary" /> 3. Featured Image &amp; Media Assets
                  </span>
                  <i className={`fa-solid fa-chevron-down text-slate-400 transition-transform ${openSections.media ? "rotate-180 text-primary" : ""}`} />
                </button>

                {openSections.media && (
                  <div className="mt-5 pt-5 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    <div>
                      <input type="file" ref={fileInputRef} accept="image/*" onChange={handleImageChange} className="hidden" />
                      {imagePreview ? (
                        <div className="relative w-full h-48 bg-slate-50 rounded-xl overflow-hidden border border-slate-200 group">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={imagePreview} alt="Preview cover" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <button type="button" onClick={triggerFileSelect} className="bg-white text-slate-900 text-[10px] font-extrabold px-3 py-1.5 rounded-lg shadow-sm">Replace</button>
                            <button type="button" onClick={() => { setImagePreview(""); setImageFile(null); setExistingImage(""); }} className="bg-rose-600 text-white text-[10px] font-extrabold px-3 py-1.5 rounded-lg shadow-sm">Delete</button>
                          </div>
                        </div>
                      ) : (
                        <div onClick={triggerFileSelect} className="w-full h-48 border-2 border-dashed border-slate-200 rounded-xl hover:border-primary/50 transition-colors flex flex-col items-center justify-center gap-2.5 cursor-pointer bg-slate-50">
                          <i className="fa-regular fa-image text-2xl text-slate-350" />
                          <span className="text-xs font-bold text-slate-500">Upload Featured Image (WebP/JPG)</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                          Image Alt Text <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={imageAlt}
                          onChange={(e) => setImageAlt(e.target.value)}
                          placeholder="e.g. Custom website development architecture diagram"
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-950 rounded-xl outline-none text-xs font-semibold"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Image Caption</label>
                        <input
                          type="text"
                          value={imageCaption}
                          onChange={(e) => setImageCaption(e.target.value)}
                          placeholder="e.g. Custom website systems built for client lead workflows."
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-950 rounded-xl outline-none text-xs font-semibold"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 4. SEO SETTINGS */}
              <div className="bg-white border border-slate-200/80 rounded-[20px] p-6 shadow-sm">
                <button
                  type="button"
                  onClick={() => toggleSection("seo")}
                  className="w-full flex items-center justify-between text-left font-black text-sm text-slate-900 cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <i className="fa-solid fa-magnifying-glass-chart text-primary" /> 4. SEO Settings &amp; Keywords
                  </span>
                  <i className={`fa-solid fa-chevron-down text-slate-400 transition-transform ${openSections.seo ? "rotate-180 text-primary" : ""}`} />
                </button>

                {openSections.seo && (
                  <div className="mt-5 pt-5 border-t border-slate-100 flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center text-[10px] font-black text-slate-500 uppercase tracking-widest">
                        <span>SEO Title</span>
                        <span className={seoTitle.length >= 30 && seoTitle.length <= 80 ? "text-emerald-600" : "text-amber-600"}>
                          {seoTitle.length}/80 chars (Recommended: 30-75)
                        </span>
                      </div>
                      <input
                        type="text"
                        value={seoTitle}
                        onChange={(e) => setSeoTitle(e.target.value)}
                        placeholder="e.g. AI Agent Property Hunting in 2026 | Real Estate Discovery"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-950 rounded-xl outline-none text-xs font-semibold"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center text-[10px] font-black text-slate-500 uppercase tracking-widest">
                        <span>Meta Description</span>
                        <span className={metaDescription.length >= 100 && metaDescription.length <= 165 ? "text-emerald-600" : "text-amber-600"}>
                          {metaDescription.length}/165 chars (Recommended: 100-165)
                        </span>
                      </div>
                      <textarea
                        value={metaDescription}
                        onChange={(e) => setMetaDescription(e.target.value)}
                        placeholder="Write compelling summary for search result snippets..."
                        rows={3}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-950 rounded-xl outline-none text-xs font-semibold leading-relaxed"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Focus Keyword (1 primary)</label>
                        <input
                          type="text"
                          value={focusKeyword}
                          onChange={(e) => setFocusKeyword(e.target.value)}
                          placeholder="e.g. Real Estate"
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-950 rounded-xl outline-none text-xs font-semibold"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Secondary Keywords (comma separated)</label>
                        <input
                          type="text"
                          value={secondaryKeywords}
                          onChange={(e) => setSecondaryKeywords(e.target.value)}
                          placeholder="e.g. custom web design, business website requirements"
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-950 rounded-xl outline-none text-xs font-semibold"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Canonical URL</label>
                        <input
                          type="text"
                          value={canonicalUrl}
                          onChange={(e) => setCanonicalUrl(e.target.value)}
                          placeholder={`https://joydigital.in/blog/${slug}`}
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-950 rounded-xl outline-none text-xs font-mono font-semibold"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Robots Meta Tag</label>
                        <select
                          value={robots}
                          onChange={(e) => setRobots(e.target.value)}
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-950 rounded-xl outline-none text-xs font-bold"
                        >
                          <option value="Index, Follow">Index, Follow</option>
                          <option value="Noindex, Follow">Noindex, Follow</option>
                          <option value="Index, Nofollow">Index, Nofollow</option>
                          <option value="Noindex, Nofollow">Noindex, Nofollow</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 5. GOOGLE SEARCH PREVIEW */}
              <div className="bg-white border border-slate-200/80 rounded-[20px] p-6 shadow-sm">
                <button
                  type="button"
                  onClick={() => toggleSection("serp")}
                  className="w-full flex items-center justify-between text-left font-black text-sm text-slate-900 cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <i className="fa-brands fa-google text-blue-600" /> 5. Live Google Search Preview
                  </span>
                  <i className={`fa-solid fa-chevron-down text-slate-400 transition-transform ${openSections.serp ? "rotate-180 text-primary" : ""}`} />
                </button>

                {openSections.serp && (
                  <div className="mt-5 pt-5 border-t border-slate-100 flex flex-col gap-4">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setSerpTab("desktop")}
                        className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer ${serpTab === "desktop" ? "bg-primary text-white" : "bg-slate-100 text-slate-600"}`}
                      >
                        Desktop View
                      </button>
                      <button
                        type="button"
                        onClick={() => setSerpTab("mobile")}
                        className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer ${serpTab === "mobile" ? "bg-primary text-white" : "bg-slate-100 text-slate-600"}`}
                      >
                        Mobile View
                      </button>
                    </div>

                    <div className={`p-4 bg-white border border-slate-200 rounded-2xl font-sans ${serpTab === "mobile" ? "max-w-sm border-2" : "w-full"}`}>
                      <div className="flex items-center gap-2 mb-1 text-xs text-slate-600">
                        <span className="w-4 h-4 rounded-full bg-blue-600 text-white font-bold text-[9px] flex items-center justify-center">J</span>
                        <span className="text-[11px] font-bold text-slate-800">Joy Digital</span>
                        <span className="text-[10px] text-slate-400">https://joydigital.in &gt; blog &gt; {slug || "slug"}</span>
                      </div>
                      <h3 className="text-base sm:text-lg font-normal text-[#1a0dab] hover:underline cursor-pointer leading-tight mb-1 truncate">
                        {seoTitle || title || "Untitled Post Title - Joy Digital"}
                      </h3>
                      <p className="text-xs text-[#4d5156] leading-relaxed line-clamp-2">
                        {metaDescription || description || "No meta description provided. Search engines will automatically generate a snippet from your content."}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* 6. CONTENT SEO CHECKLIST & SCORE */}
              <div className="bg-white border border-slate-200/80 rounded-[20px] p-6 shadow-sm">
                <button
                  type="button"
                  onClick={() => toggleSection("checklist")}
                  className="w-full flex items-center justify-between text-left font-black text-sm text-slate-900 cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <i className="fa-solid fa-list-check text-emerald-600" /> 6. Content SEO Checklist &amp; Score
                  </span>
                  <div className="flex items-center gap-3">
                    <span className={`text-[11px] font-black px-3 py-0.5 rounded-full border ${
                      seoScore >= 80 ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                      seoScore >= 60 ? "bg-amber-50 text-amber-700 border-amber-200" :
                      "bg-rose-50 text-rose-700 border-rose-200"
                    }`}>
                      Score: {seoScore}/100
                    </span>
                    <i className={`fa-solid fa-chevron-down text-slate-400 transition-transform ${openSections.checklist ? "rotate-180 text-primary" : ""}`} />
                  </div>
                </button>

                {openSections.checklist && (
                  <div className="mt-5 pt-5 border-t border-slate-100 flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      {seoChecks.map((check, idx) => (
                        <div key={idx} className={`p-3 rounded-xl border flex items-start gap-2.5 ${check.passed ? "bg-emerald-50/60 border-emerald-200 text-emerald-900" : "bg-slate-50 border-slate-200 text-slate-700"}`}>
                          <i className={`fa-solid ${check.passed ? "fa-circle-check text-emerald-600 mt-0.5" : "fa-triangle-exclamation text-amber-500 mt-0.5"}`} />
                          <div>
                            <div className="font-bold text-xs">{check.label}</div>
                            {!check.passed && <div className="text-[10px] text-slate-500 mt-0.5 font-semibold">{check.rec}</div>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 7. INTERNAL LINKING */}
              <div className="bg-white border border-slate-200/80 rounded-[20px] p-6 shadow-sm">
                <button
                  type="button"
                  onClick={() => toggleSection("internalLinks")}
                  className="w-full flex items-center justify-between text-left font-black text-sm text-slate-900 cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <i className="fa-solid fa-link text-primary" /> 7. Internal Linking Matrix
                  </span>
                  <i className={`fa-solid fa-chevron-down text-slate-400 transition-transform ${openSections.internalLinks ? "rotate-180 text-primary" : ""}`} />
                </button>

                {openSections.internalLinks && (
                  <div className="mt-5 pt-5 border-t border-slate-100 flex flex-col gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <input
                        type="text"
                        value={newAnchor}
                        onChange={(e) => setNewAnchor(e.target.value)}
                        placeholder="Anchor Text (e.g. custom website development)"
                        className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 text-xs font-semibold rounded-xl outline-none"
                      />
                      <select
                        value={newTarget}
                        onChange={(e) => setNewTarget(e.target.value)}
                        className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 text-xs font-bold rounded-xl outline-none"
                      >
                        {SERVICE_LINK_PRESETS.map((p, i) => (
                          <option key={i} value={p.url}>{p.label} ({p.url})</option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={handleAddInternalLink}
                        className="bg-primary text-white font-bold text-xs py-2.5 px-4 rounded-xl cursor-pointer hover:bg-primary-light"
                      >
                        Add Internal Link
                      </button>
                    </div>

                    {internalLinks.length > 0 && (
                      <div className="space-y-2 mt-2">
                        {internalLinks.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                            <span className="font-bold text-slate-800">&quot;{item.anchorText}&quot; &rarr; <code className="text-primary">{item.targetUrl}</code></span>
                            <button type="button" onClick={() => handleRemoveInternalLink(idx)} className="text-rose-600 text-xs hover:underline">Remove</button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* 8. RELATED BLOG POSTS */}
              <div className="bg-white border border-slate-200/80 rounded-[20px] p-6 shadow-sm">
                <button
                  type="button"
                  onClick={() => toggleSection("related")}
                  className="w-full flex items-center justify-between text-left font-black text-sm text-slate-900 cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <i className="fa-solid fa-layer-group text-primary" /> 8. Related Blog Posts
                  </span>
                  <i className={`fa-solid fa-chevron-down text-slate-400 transition-transform ${openSections.related ? "rotate-180 text-primary" : ""}`} />
                </button>

                {openSections.related && (
                  <div className="mt-5 pt-5 border-t border-slate-100 flex flex-col gap-4">
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={autoSuggestRelated}
                        onChange={(e) => setAutoSuggestRelated(e.target.checked)}
                        className="rounded border-slate-300 text-primary"
                      />
                      <span>Automatically suggest related articles (based on Category &amp; Tags)</span>
                    </label>

                    <div>
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Manually Select Related Articles</span>
                      <div className="max-h-40 overflow-y-auto space-y-1.5 p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                        {posts.filter((p) => p.slug !== slug).map((p) => {
                          const isSelected = manualRelatedSlugs.includes(p.slug);
                          return (
                            <label key={p.slug} className="flex items-center gap-2 cursor-pointer p-1 hover:bg-white rounded">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={(e) => {
                                  if (e.target.checked) setManualRelatedSlugs([...manualRelatedSlugs, p.slug]);
                                  else setManualRelatedSlugs(manualRelatedSlugs.filter((s) => s !== p.slug));
                                }}
                              />
                              <span className="font-bold text-slate-800 truncate">{p.title}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 9. AUTHOR E-E-A-T INFORMATION */}
              <div className="bg-white border border-slate-200/80 rounded-[20px] p-6 shadow-sm">
                <button
                  type="button"
                  onClick={() => toggleSection("author")}
                  className="w-full flex items-center justify-between text-left font-black text-sm text-slate-900 cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <i className="fa-solid fa-user-gear text-primary" /> 9. Author / E-E-A-T Profile
                  </span>
                  <i className={`fa-solid fa-chevron-down text-slate-400 transition-transform ${openSections.author ? "rotate-180 text-primary" : ""}`} />
                </button>

                {openSections.author && (
                  <div className="mt-5 pt-5 border-t border-slate-100 flex flex-col gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Author Name</label>
                        <input
                          type="text"
                          value={authorName}
                          onChange={(e) => setAuthorName(e.target.value)}
                          className="px-4 py-2.5 bg-slate-50 border border-slate-200 text-xs font-semibold rounded-xl"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Author Role</label>
                        <input
                          type="text"
                          value={authorRole}
                          onChange={(e) => setAuthorRole(e.target.value)}
                          className="px-4 py-2.5 bg-slate-50 border border-slate-200 text-xs font-semibold rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Author Bio</label>
                      <textarea
                        value={authorBio}
                        onChange={(e) => setAuthorBio(e.target.value)}
                        rows={2}
                        className="px-4 py-2.5 bg-slate-50 border border-slate-200 text-xs font-semibold rounded-xl"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* 10. FAQ BUILDER */}
              <div className="bg-white border border-slate-200/80 rounded-[20px] p-6 shadow-sm">
                <button
                  type="button"
                  onClick={() => toggleSection("faq")}
                  className="w-full flex items-center justify-between text-left font-black text-sm text-slate-900 cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <i className="fa-solid fa-circle-question text-primary" /> 10. Article FAQ Builder ({faqs.length} Q&amp;A)
                  </span>
                  <i className={`fa-solid fa-chevron-down text-slate-400 transition-transform ${openSections.faq ? "rotate-180 text-primary" : ""}`} />
                </button>

                {openSections.faq && (
                  <div className="mt-5 pt-5 border-t border-slate-100 flex flex-col gap-4">
                    <div className="flex flex-col gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                      <input
                        type="text"
                        value={newFaqQuestion}
                        onChange={(e) => setNewFaqQuestion(e.target.value)}
                        placeholder="Question (e.g. How much does custom website development cost?)"
                        className="px-3.5 py-2.5 bg-white border border-slate-200 text-xs font-semibold rounded-xl outline-none"
                      />
                      <textarea
                        value={newFaqAnswer}
                        onChange={(e) => setNewFaqAnswer(e.target.value)}
                        placeholder="Answer details..."
                        rows={2}
                        className="px-3.5 py-2.5 bg-white border border-slate-200 text-xs font-semibold rounded-xl outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleAddFaq}
                        className="bg-primary text-white font-bold text-xs py-2 px-4 rounded-xl cursor-pointer self-start hover:bg-primary-light"
                      >
                        Add FAQ Item
                      </button>
                    </div>

                    {faqs.length > 0 && (
                      <div className="space-y-3">
                        {faqs.map((f, idx) => (
                          <div key={idx} className="p-3.5 bg-white border border-slate-200 rounded-xl text-xs flex justify-between items-start gap-3">
                            <div>
                              <div className="font-extrabold text-slate-900">Q: {f.question}</div>
                              <div className="text-slate-600 mt-1">A: {f.answer}</div>
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0">
                              <button type="button" onClick={() => handleMoveFaq(idx, "up")} disabled={idx === 0} className="text-slate-400 hover:text-slate-900 disabled:opacity-30">▲</button>
                              <button type="button" onClick={() => handleMoveFaq(idx, "down")} disabled={idx === faqs.length - 1} className="text-slate-400 hover:text-slate-900 disabled:opacity-30">▼</button>
                              <button type="button" onClick={() => handleRemoveFaq(idx)} className="text-rose-600 hover:underline">Remove</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* 11. SOCIAL MEDIA & OPEN GRAPH PREVIEWS */}
              <div className="bg-white border border-slate-200/80 rounded-[20px] p-6 shadow-sm">
                <button
                  type="button"
                  onClick={() => toggleSection("social")}
                  className="w-full flex items-center justify-between text-left font-black text-sm text-slate-900 cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <i className="fa-solid fa-share-nodes text-primary" /> 11. Social Sharing &amp; Open Graph Previews
                  </span>
                  <i className={`fa-solid fa-chevron-down text-slate-400 transition-transform ${openSections.social ? "rotate-180 text-primary" : ""}`} />
                </button>

                {openSections.social && (
                  <div className="mt-5 pt-5 border-t border-slate-100 flex flex-col gap-4">
                    <div className="flex gap-2 select-none">
                      {(["facebook", "linkedin", "twitter"] as const).map((st) => (
                        <button
                          key={st}
                          type="button"
                          onClick={() => setSocialTab(st)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer ${socialTab === st ? "bg-primary text-white" : "bg-slate-100 text-slate-600"}`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>

                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl max-w-md select-none">
                      <div className="relative w-full h-40 rounded-xl overflow-hidden bg-slate-200 mb-3 border border-slate-300">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={ogImage || imagePreview || existingImage || "/assets/images/hero-banner.webp"} alt="Social preview" className="w-full h-full object-cover" />
                      </div>
                      <div className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">JOYDIGITAL.IN</div>
                      <div className="font-extrabold text-slate-900 text-sm truncate">{ogTitle || seoTitle || title || "Article Title"}</div>
                      <div className="text-xs text-slate-600 line-clamp-2 mt-0.5">{ogDescription || metaDescription || description || "Article Description"}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* 12. PUBLISHING & STATUS */}
              <div className="bg-white border border-slate-200/80 rounded-[20px] p-6 shadow-sm">
                <button
                  type="button"
                  onClick={() => toggleSection("publishing")}
                  className="w-full flex items-center justify-between text-left font-black text-sm text-slate-900 cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <i className="fa-solid fa-paper-plane text-primary" /> 12. Publishing Settings &amp; Status Workflow
                  </span>
                  <i className={`fa-solid fa-chevron-down text-slate-400 transition-transform ${openSections.publishing ? "rotate-180 text-primary" : ""}`} />
                </button>

                {openSections.publishing && (
                  <div className="mt-5 pt-5 border-t border-slate-100 flex flex-col gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Publication Status</label>
                        <select
                          value={status}
                          onChange={(e) => setStatus(e.target.value as any)}
                          className="px-4 py-2.5 bg-slate-50 border border-slate-200 text-xs font-bold rounded-xl outline-none"
                        >
                          <option value="Published">Published (Live on website &amp; sitemap)</option>
                          <option value="Draft">Draft (Saved in CMS only)</option>
                          <option value="Scheduled">Scheduled (Future publication date)</option>
                          <option value="Archived">Archived (Hidden from site)</option>
                        </select>
                      </div>

                      {status === "Scheduled" && (
                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Scheduled Date &amp; Time</label>
                          <input
                            type="datetime-local"
                            value={scheduledPublishDate}
                            onChange={(e) => setScheduledPublishDate(e.target.value)}
                            className="px-4 py-2.5 bg-slate-50 border border-slate-200 text-xs font-semibold rounded-xl outline-none"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

            </div>
          )}

        </form>
      )}

    </div>
  );
}
