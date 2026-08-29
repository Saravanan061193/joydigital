"use client";

import React, { useState, useEffect, useRef } from "react";

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

interface BlogPost {
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

export default function BlogAdminPanel() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editorMode, setEditorMode] = useState<"create" | "edit">("create");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Analytics chart state
  const [analytics, setAnalytics] = useState<any>(null);
  const [chartTimeframe, setChartTimeframe] = useState<"daily" | "weekly" | "monthly" | "yearly">("daily");

  // Form state
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("SEO");
  const [author, setAuthor] = useState("Saravanan L");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [existingImage, setExistingImage] = useState("");
  
  // UI states
  const [submitLoading, setSubmitLoading] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const [msg, setMsg] = useState({ text: "", type: "" });
  const [previewActive, setPreviewActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch posts and analytics on mount
  useEffect(() => {
    fetchPosts();
    fetchAnalytics();
  }, []);

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

  // Sync slug from title
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (editorMode === "create") {
      const suggestedSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .substring(0, 50);
      setSlug(suggestedSlug);
    }
  };

  // Handle image choice
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
    setAuthor(post.author);
    setDate(post.date);
    setContent(post.content);
    setExistingImage(post.image || "");
    setImagePreview(post.image || "");
    setImageFile(null);
    setIsEditing(true);
    setPreviewActive(false);
    setMsg({ text: "", type: "" });
  };

  const handleCreateClick = () => {
    setEditorMode("create");
    setTitle("");
    setSlug("");
    setDescription("");
    setCategory("SEO");
    setAuthor("Saravanan L");
    setDate(new Date().toISOString().split("T")[0]);
    setContent("");
    setExistingImage("");
    setImagePreview("");
    setImageFile(null);
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
      formData.append("content", content);
      
      if (imageFile) {
        formData.append("image", imageFile);
      }
      if (existingImage) {
        formData.append("existingImage", existingImage);
      }

      const res = await fetch("/api/admin/blog", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setMsg({ 
          text: editorMode === "create" ? "Blog article published successfully!" : "Blog article updated successfully!", 
          type: "success" 
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

  // Compute Blog Chart Points
  const getBlogChartPoints = () => {
    if (!analytics) return { points: [] };
    const trendData =
      chartTimeframe === "daily" ? (analytics.blogDailyTrend || []) :
      chartTimeframe === "weekly" ? (analytics.blogWeeklyTrend || []) :
      chartTimeframe === "monthly" ? (analytics.blogMonthlyTrend || []) :
      (analytics.blogYearlyTrend || []);

    if (trendData.length === 0) return { points: [] };

    const maxVal = Math.max(...trendData.map((d: any) => Math.max(d.views, d.visitors)), 1);
    const len = trendData.length;

    const points = trendData.map((d: any, idx: number) => {
      const x = 40 + (idx / (len - 1 || 1)) * 420;
      const yViews = 125 - (d.views / maxVal) * 90;
      const yVisitors = 125 - (d.visitors / maxVal) * 90;
      return { x, yViews, yVisitors, views: d.views, visitors: d.visitors, label: d.label };
    });

    return { points };
  };

  const { points: blogChartPoints } = getBlogChartPoints();
  const viewsLineD = blogChartPoints.length > 0
    ? `M ${blogChartPoints[0].x} ${blogChartPoints[0].yViews} ` + blogChartPoints.slice(1).map((p: any) => `L ${p.x} ${p.yViews}`).join(" ")
    : "";
  const viewsAreaD = blogChartPoints.length > 0
    ? `${viewsLineD} L ${blogChartPoints[blogChartPoints.length - 1].x} 125 L ${blogChartPoints[0].x} 125 Z`
    : "";
  const visitorsLineD = blogChartPoints.length > 0
    ? `M ${blogChartPoints[0].x} ${blogChartPoints[0].yVisitors} ` + blogChartPoints.slice(1).map((p: any) => `L ${p.x} ${p.yVisitors}`).join(" ")
    : "";
  const visitorsAreaD = blogChartPoints.length > 0
    ? `${visitorsLineD} L ${blogChartPoints[blogChartPoints.length - 1].x} 125 L ${blogChartPoints[0].x} 125 Z`
    : "";

  // Convert simple markdown to HTML elements for preview
  const renderMarkdownPreview = (text: string) => {
    if (!text) return <p className="text-slate-450 italic">No content written yet.</p>;

    const lines = text.split("\n");
    return lines.map((line, idx) => {
      if (line.startsWith("## ")) {
        return <h2 key={idx} className="text-lg font-bold text-slate-800 dark:text-white mt-5 mb-2.5 border-b border-slate-100 pb-1">{line.substring(3)}</h2>;
      }
      if (line.startsWith("### ")) {
        return <h3 key={idx} className="text-base font-semibold text-slate-800 dark:text-white mt-4 mb-2">{line.substring(4)}</h3>;
      }
      if (line.startsWith("# ")) {
        return <h1 key={idx} className="text-xl font-black text-slate-900 dark:text-white mt-6 mb-3">{line.substring(2)}</h1>;
      }
      if (line.startsWith("- ") || line.startsWith("* ")) {
        return <li key={idx} className="text-xs text-slate-650 dark:text-slate-350 ml-4 list-disc mb-1">{line.substring(2)}</li>;
      }
      if (line.startsWith("> ")) {
        return (
          <blockquote key={idx} className="border-l-4 border-primary/40 bg-slate-50 dark:bg-slate-800/40 px-4 py-2 my-3 text-xs italic text-slate-600 dark:text-slate-450">
            {line.substring(2)}
          </blockquote>
        );
      }
      if (line.trim() === "") {
        return <div key={idx} className="h-2" />;
      }
      return <p key={idx} className="text-xs text-slate-650 dark:text-slate-350 leading-relaxed mb-2.5">{line}</p>;
    });
  };

  return (
    <div className="flex flex-col gap-6 w-full text-slate-900">
      
      {/* Alert Banner */}
      {msg.text && (
        <div className={`p-4 rounded-xl text-xs font-bold border flex items-center justify-between ${
          msg.type === "success" 
            ? "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border-emerald-250 dark:border-emerald-900/30"
            : "bg-rose-50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-400 border-rose-250 dark:border-rose-900/30"
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
                <i className="fa-solid fa-fire" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Top Article</span>
                <span className="text-xs font-extrabold text-slate-900 truncate block">
                  {posts.length > 0
                    ? [...posts].sort((a, b) => (b.views || 0) - (a.views || 0))[0]?.title || "N/A"
                    : "None"}
                </span>
              </div>
            </div>
          </div>

          {/* DEDICATED BLOG TRAFFIC TRENDS CHART CARD */}
          <div className="bg-white border border-slate-200/80 rounded-[20px] p-6 shadow-sm flex flex-col justify-between text-left">
            <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
              <div>
                <h3 className="font-black text-sm text-slate-900 flex items-center gap-2">
                  <i className="fa-solid fa-chart-line text-[#2563EB]" /> Blog Visitors & Pageviews Analytics
                </h3>
                <p className="text-[10px] text-slate-500 font-semibold mt-0.5">
                  Track article reader metrics across Daily, Weekly, Monthly, and Yearly timeframes
                </p>
              </div>

              {/* Timeframe Selector Toggles */}
              <div className="flex bg-slate-100 p-1 border border-slate-200/80 rounded-xl">
                {(["daily", "weekly", "monthly", "yearly"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setChartTimeframe(t)}
                    className={`px-3 py-1 rounded-lg text-[9.5px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                      chartTimeframe === t
                        ? "bg-[#2563EB] text-white shadow-xs"
                        : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Line Chart */}
            <div className="relative py-2 w-full h-44">
              {blogChartPoints.length === 0 ? (
                <div className="absolute inset-0 flex items-center justify-center text-xs text-slate-400 italic">
                  Syncing blog traffic data...
                </div>
              ) : (
                <svg className="w-full h-full" viewBox="0 0 500 150">
                  <defs>
                    <linearGradient id="blogViewsGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2563EB" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="blogVisitorsGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#9333EA" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#9333EA" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Grid lines */}
                  <line x1="40" y1="35" x2="460" y2="35" stroke="#F1F5F9" strokeWidth="1" />
                  <line x1="40" y1="80" x2="460" y2="80" stroke="#F1F5F9" strokeWidth="1" />
                  <line x1="40" y1="125" x2="460" y2="125" stroke="#E2E8F0" strokeWidth="1.5" />

                  {/* Fills */}
                  <path d={viewsAreaD} fill="url(#blogViewsGrad)" />
                  <path d={visitorsAreaD} fill="url(#blogVisitorsGrad)" />

                  {/* Paths */}
                  <path d={viewsLineD} fill="none" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d={visitorsLineD} fill="none" stroke="#9333EA" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

                  {/* X Labels */}
                  {blogChartPoints.map((p: any, idx: number) => {
                    const skipLabel = chartTimeframe === "daily" && idx % 2 !== 0;
                    if (skipLabel) return null;
                    return (
                      <text
                        key={idx}
                        x={p.x}
                        y="142"
                        fill="#94A3B8"
                        fontSize="8"
                        fontWeight="800"
                        textAnchor="middle"
                      >
                        {p.label}
                      </text>
                    );
                  })}

                  {/* Dots for Views */}
                  {blogChartPoints.map((p: any, idx: number) => (
                    <g key={`bv-${idx}`} className="group/bv cursor-pointer">
                      <circle cx={p.x} cy={p.yViews} r="3.5" fill="#2563EB" stroke="#FFFFFF" strokeWidth="1" />
                      <title>{p.views} Blog Views ({p.label})</title>
                    </g>
                  ))}

                  {/* Dots for Visitors */}
                  {blogChartPoints.map((p: any, idx: number) => (
                    <g key={`bu-${idx}`} className="group/bu cursor-pointer">
                      <circle cx={p.x} cy={p.yVisitors} r="3.5" fill="#9333EA" stroke="#FFFFFF" strokeWidth="1" />
                      <title>{p.visitors} Unique Blog Readers ({p.label})</title>
                    </g>
                  ))}
                </svg>
              )}
            </div>

            <div className="flex gap-5 mt-3 pt-3 border-t border-slate-100 text-[10px] font-black uppercase tracking-wider">
              <span className="flex items-center gap-1.5 text-blue-600">
                <span className="w-2.5 h-2.5 bg-blue-600 rounded-full inline-block" /> Blog Pageviews
              </span>
              <span className="flex items-center gap-1.5 text-purple-600">
                <span className="w-2.5 h-2.5 bg-purple-600 rounded-full inline-block" /> Unique Readers
              </span>
            </div>
          </div>

          {/* TABLE CONTAINER */}
          <div className="bg-white border border-slate-200/80 rounded-[20px] p-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-sm font-black text-slate-900">Published Blog Articles</h3>
                <p className="text-[10px] text-slate-500 font-semibold mt-0.5">Manage existing files in content/blog directory and track performance</p>
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
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Syncing articles & views...</span>
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
                            <th className="py-3 px-4">Views / Traffic</th>
                            <th className="py-3 px-4">Date</th>
                            <th className="py-3 px-4">Author</th>
                            <th className="py-3 px-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {paginatedPosts.map((post) => (
                            <tr key={post.slug} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                              <td className="py-4 px-4 max-w-sm">
                                <div className="font-bold text-slate-900 truncate">{post.title}</div>
                                <div className="text-[10px] text-slate-450 font-semibold mt-0.5 select-all font-mono">
                                  {post.slug}
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <span className="bg-primary/10 text-primary border border-primary/20 text-[9px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                                  {post.category}
                                </span>
                              </td>
                              <td className="py-4 px-4 whitespace-nowrap">
                                <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200/80 px-3 py-1 rounded-full text-[10px] font-extrabold shadow-2xs">
                                  <i className="fa-regular fa-eye text-emerald-500" />
                                  <span>{(post.views || 0).toLocaleString()} Views</span>
                                </span>
                              </td>
                              <td className="py-4 px-4 text-slate-500 font-semibold whitespace-nowrap">{post.date}</td>
                              <td className="py-4 px-4 text-slate-550 font-semibold whitespace-nowrap">{post.author}</td>
                              <td className="py-4 px-4 text-right whitespace-nowrap">
                                <div className="inline-flex gap-2">
                                  <a
                                    href={`/blog/${post.slug}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-slate-100 hover:bg-slate-200/80 text-slate-700 hover:text-slate-900 border border-slate-200 text-[10px] font-extrabold px-2.5 py-1.5 rounded-lg cursor-pointer transition-all flex items-center gap-1"
                                    title="View Article Live"
                                  >
                                    <i className="fa-solid fa-arrow-up-right-from-square" />
                                  </a>
                                  <button
                                    onClick={() => handleEditClick(post)}
                                    className="bg-slate-100 hover:bg-slate-200/80 text-slate-700 hover:text-slate-900 border border-slate-200 text-[10px] font-extrabold px-3 py-1.5 rounded-lg cursor-pointer transition-all"
                                  >
                                    <i className="fa-solid fa-pen-to-square mr-1" /> Edit
                                  </button>
                                  <button
                                    onClick={() => handleDeleteClick(post.slug)}
                                    className="bg-rose-50 hover:bg-rose-100 text-rose-700 hover:text-rose-800 border border-rose-150 text-[10px] font-extrabold px-3 py-1.5 rounded-lg cursor-pointer transition-all"
                                  >
                                    <i className="fa-solid fa-trash-can mr-1" /> Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
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
                            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-extrabold disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer flex items-center gap-1"
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
                            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-extrabold disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer flex items-center gap-1"
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
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Main Edit Form Panel (Left) */}
          <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-[20px] p-6 shadow-sm flex flex-col gap-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-sm font-black text-slate-900">
                  {editorMode === "create" ? "Create New Blog Post" : "Edit Blog Post"}
                </h3>
                <p className="text-[10px] text-slate-500 mt-0.5">Define your post structure, tags, SEO settings, and content</p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPreviewActive(!previewActive)}
                  className="bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-extrabold px-3.5 py-2 rounded-xl cursor-pointer"
                >
                  <i className={`fa-regular ${previewActive ? "fa-pen-to-square" : "fa-eye"} mr-1`} /> 
                  {previewActive ? "Back to Write" : "Live Preview"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-slate-100 hover:bg-slate-200/60 text-slate-700 text-[10px] font-extrabold px-3.5 py-2 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>

            {previewActive ? (
              // Preview Mode
              <div className="border border-slate-200 rounded-2xl p-6 min-h-[450px] bg-slate-50/50 max-h-[600px] overflow-y-auto">
                <div className="mb-6 pb-6 border-b border-slate-200/80">
                  <div className="flex gap-2 mb-3">
                    <span className="bg-primary/10 text-primary text-[9px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider">
                      {category}
                    </span>
                  </div>
                  <h1 className="text-2xl font-black text-slate-950 mb-3">{title || "Untitled Post"}</h1>
                  <div className="flex items-center gap-2.5 text-[11px] text-slate-500 font-semibold">
                    <span>By {author}</span>
                    <span>•</span>
                    <span>{date}</span>
                  </div>
                </div>

                {imagePreview && (
                  <div className="relative w-full h-56 rounded-xl overflow-hidden mb-6 border border-slate-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={imagePreview} alt="Thumbnail preview" className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="prose max-w-none text-left">
                  {renderMarkdownPreview(content)}
                </div>
              </div>
            ) : (
              // Editing Form Input Areas
              <div className="flex flex-col gap-4">
                {/* Title */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-0.5">
                    Post Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. Why Page Speed Matters for Conversions in 2026"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-slate-950 rounded-xl outline-none focus:bg-white focus:border-primary text-xs font-semibold"
                  />
                </div>

                {/* Slug & Category (Two columns) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-0.5">
                      URL Slug <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={slug}
                      onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"))}
                      placeholder="e.g. why-page-speed-matters"
                      disabled={editorMode === "edit"}
                      className={`w-full px-4 py-3 bg-slate-50 border border-slate-200 text-slate-950 rounded-xl outline-none focus:bg-white focus:border-primary text-xs font-mono font-semibold ${
                        editorMode === "edit" ? "opacity-60 cursor-not-allowed" : ""
                      }`}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-0.5">
                      Category
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
                      <option value="General">General</option>
                    </select>
                  </div>
                </div>

                {/* Date & Author (Two columns) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-0.5">
                      Publish Date
                    </label>
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-slate-950 rounded-xl outline-none focus:bg-white focus:border-primary text-xs font-semibold"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-0.5">
                      Author Profile
                    </label>
                    <input
                      type="text"
                      required
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="e.g. Saravanan L"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-slate-950 rounded-xl outline-none focus:bg-white focus:border-primary text-xs font-semibold"
                    />
                  </div>
                </div>

                {/* Content Area */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-0.5">
                      Markdown Body Content <span className="text-rose-500">*</span>
                    </label>
                    <span className="text-[9px] text-slate-400 font-semibold">Supports headers (##), blockquotes (&gt;), and bullet points (-)</span>
                  </div>
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

          {/* Sidebar SEO & Assets Form (Right) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Thumbnail Image Section */}
            <div className="bg-white border border-slate-200/80 rounded-[20px] p-6 shadow-sm text-left flex flex-col gap-4">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Thumbnail Image</h3>
              <p className="text-[10px] text-slate-500 font-semibold leading-normal">
                Upload a cover thumbnail image for the blog post. Mapped fallbacks will render if empty.
              </p>

              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />

              {imagePreview ? (
                <div className="relative w-full h-40 bg-slate-50 rounded-xl overflow-hidden border border-slate-200 group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imagePreview} alt="Preview thumbnail" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={triggerFileSelect}
                      className="bg-white text-slate-900 text-[10px] font-extrabold px-3 py-1.5 rounded-lg shadow-sm hover:scale-105 transition-all cursor-pointer"
                    >
                      Replace
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview("");
                        setImageFile(null);
                        setExistingImage("");
                      }}
                      className="bg-rose-600 text-white text-[10px] font-extrabold px-3 py-1.5 rounded-lg shadow-sm hover:scale-105 transition-all cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={triggerFileSelect}
                  className="w-full h-40 border-2 border-dashed border-slate-200 rounded-xl hover:border-primary/50 transition-colors flex flex-col items-center justify-center gap-2.5 cursor-pointer bg-slate-50"
                >
                  <i className="fa-regular fa-image text-xl text-slate-350" />
                  <span className="text-[10px] font-bold text-slate-500">Upload Image Cover</span>
                </div>
              )}
            </div>

            {/* SEO Metadata Settings */}
            <div className="bg-white border border-slate-200/80 rounded-[20px] p-6 shadow-sm text-left flex flex-col gap-4">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">SEO Metadata</h3>
              
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-0.5">
                  SEO Meta Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. Discover essential web optimization tools and speeds..."
                  rows={4}
                  maxLength={170}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-slate-950 rounded-xl outline-none focus:bg-white focus:border-primary text-xs font-semibold leading-relaxed"
                />
                <div className="flex justify-between items-center text-[9px] text-slate-400 font-bold px-0.5 mt-0.5">
                  <span>Google recommended length: 155 chars</span>
                  <span className={description.length > 155 ? "text-rose-500" : ""}>{description.length}/170</span>
                </div>
              </div>
            </div>

            {/* Submit Action */}
            <div className="bg-white border border-slate-200/80 rounded-[20px] p-6 shadow-sm text-left flex flex-col gap-3">
              <button
                type="submit"
                disabled={submitLoading || isCompressing}
                className="w-full bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-extrabold text-xs py-3.5 rounded-xl shadow-md cursor-pointer transition-all duration-150 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {submitLoading ? (
                  <>
                    <div className="w-3.5 h-3.5 border border-white border-t-transparent rounded-full animate-spin" />
                    <span>Publishing...</span>
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-cloud-arrow-up" />
                    <span>Publish Article</span>
                  </>
                )}
              </button>
              
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="w-full bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-extrabold text-xs py-3 rounded-xl cursor-pointer"
              >
                Back to List
              </button>
            </div>

          </div>

        </form>
      )}

    </div>
  );
}
