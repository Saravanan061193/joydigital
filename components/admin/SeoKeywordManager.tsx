"use client";

import React, { useState, useEffect } from "react";
import { SeoKeyword, SeoPageMapping, SeoDashboardStats } from "@/lib/seoKeywords";

export default function SeoKeywordManager() {
  const [activeTab, setActiveTab] = useState<"keywords" | "pages" | "linking">("keywords");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Data states
  const [keywords, setKeywords] = useState<SeoKeyword[]>([]);
  const [pages, setPages] = useState<SeoPageMapping[]>([]);
  const [stats, setStats] = useState<SeoDashboardStats | null>(null);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [intentFilter, setIntentFilter] = useState<string>("All");

  // Keyword Modal State
  const [isKwModalOpen, setIsKwModalOpen] = useState(false);
  const [editingKw, setEditingKw] = useState<Partial<SeoKeyword>>({
    keyword: "",
    type: "Secondary",
    search_intent: "Commercial",
    target_audience: "Global Businesses",
    notes: "",
    status: "Active",
  });

  // Page Editing State
  const [selectedPageId, setSelectedPageId] = useState<string>("");
  const [editingPage, setEditingPage] = useState<Partial<SeoPageMapping> | null>(null);
  const [h2Input, setH2Input] = useState("");
  const [h3Input, setH3Input] = useState("");
  const [faqQInput, setFaqQInput] = useState("");
  const [faqAInput, setFaqAInput] = useState("");

  // Fetch data
  const fetchData = async () => {
    setLoading(true);
    try {
      const [kwRes, pageRes, statsRes] = await Promise.all([
        fetch("/api/admin/seo-keywords"),
        fetch("/api/admin/seo-pages"),
        fetch("/api/admin/seo-keywords?action=stats"),
      ]);

      const kwData = await kwRes.json();
      const pageData = await pageRes.json();
      const statsData = await statsRes.json();

      if (kwData.success) setKeywords(kwData.keywords || []);
      if (pageData.success) {
        setPages(pageData.pages || []);
        if (pageData.pages && pageData.pages.length > 0 && !selectedPageId) {
          setSelectedPageId(pageData.pages[0].id);
          setEditingPage(pageData.pages[0]);
        }
      }
      if (statsData.success) setStats(statsData.stats);
    } catch (err) {
      console.error("Error loading SEO data:", err);
      setStatusMsg({ type: "error", text: "Failed to load SEO keywords data." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedPageId && pages.length > 0) {
      const found = pages.find(p => p.id === selectedPageId);
      if (found) {
        setEditingPage({ ...found });
      }
    }
  }, [selectedPageId, pages]);

  // Keyword CRUD handlers
  const handleSaveKeyword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingKw.keyword) return;

    setSaving(true);
    try {
      const res = await fetch("/api/admin/seo-keywords", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingKw),
      });
      const data = await res.json();

      if (data.success) {
        setStatusMsg({ type: "success", text: "Keyword saved successfully!" });
        setIsKwModalOpen(false);
        fetchData();
      } else {
        setStatusMsg({ type: "error", text: data.error || "Failed to save keyword." });
      }
    } catch (err) {
      setStatusMsg({ type: "error", text: "Error saving keyword." });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteKeyword = async (id: string) => {
    if (!confirm("Are you sure you want to delete this keyword?")) return;

    try {
      const res = await fetch(`/api/admin/seo-keywords?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setStatusMsg({ type: "success", text: "Keyword deleted!" });
        fetchData();
      }
    } catch (err) {
      setStatusMsg({ type: "error", text: "Failed to delete keyword." });
    }
  };

  // Page SEO Mapping handlers
  const handleSavePage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPage || !editingPage.path) return;

    setSaving(true);
    try {
      const res = await fetch("/api/admin/seo-pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingPage),
      });
      const data = await res.json();

      if (data.success) {
        setStatusMsg({ type: "success", text: "Page SEO Mapping & Metadata saved!" });
        fetchData();
      } else {
        setStatusMsg({ type: "error", text: data.error || "Failed to save page mapping." });
      }
    } catch (err) {
      setStatusMsg({ type: "error", text: "Error saving page mapping." });
    } finally {
      setSaving(false);
    }
  };

  // Filtered keywords
  const filteredKeywords = keywords.filter(k => {
    const matchesSearch = k.keyword.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          k.target_audience.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "All" || k.type === typeFilter;
    const matchesIntent = intentFilter === "All" || k.search_intent === intentFilter;
    return matchesSearch && matchesType && matchesIntent;
  });

  return (
    <div className="w-full bg-[#FAF9FF] min-h-screen text-[#1F1B2D] p-4 sm:p-8 font-sans">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#E9E4F2] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 bg-[#7C3AED]/10 border border-[#7C3AED]/25 px-3 py-1 rounded-full text-xs font-bold text-[#7C3AED] uppercase tracking-wider mb-2">
            <i className="fa-solid fa-chart-line" /> SEO Architecture CMS
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#171126] tracking-tight">
            Global SEO Keyword & Metadata Manager
          </h1>
          <p className="text-xs sm:text-sm text-[#6B6478] font-semibold mt-1">
            Joy Digital SEO Keyword Management, Intent Profiling & Dynamic Meta Architecture Engine.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchData}
            disabled={loading}
            className="bg-white border border-[#E9E4F2] hover:bg-slate-50 text-[#1F1B2D] font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm transition-all flex items-center gap-2"
          >
            <i className={`fa-solid fa-rotate-right ${loading ? "animate-spin" : ""}`} /> Refresh Stats
          </button>
          <button
            onClick={() => {
              setEditingKw({
                keyword: "",
                type: "Secondary",
                search_intent: "Commercial",
                target_audience: "Global Businesses",
                notes: "",
                status: "Active",
              });
              setIsKwModalOpen(true);
            }}
            className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md shadow-[#7C3AED]/20 transition-all flex items-center gap-2 cursor-pointer"
          >
            <i className="fa-solid fa-plus" /> Add New Keyword
          </button>
        </div>
      </div>

      {/* Notification Toast */}
      {statusMsg && (
        <div className={`max-w-7xl mx-auto mb-6 p-4 rounded-xl text-xs font-bold flex items-center justify-between shadow-sm ${
          statusMsg.type === "success" ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "bg-rose-50 text-rose-800 border border-rose-200"
        }`}>
          <span>{statusMsg.text}</span>
          <button onClick={() => setStatusMsg(null)} className="text-sm font-bold cursor-pointer">&times;</button>
        </div>
      )}

      {/* Real-time Dashboard Metrics Cards */}
      {stats && (
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="bg-white border border-[#E9E4F2] p-5 rounded-2xl shadow-sm">
            <span className="text-[10px] font-extrabold text-[#6B6478] uppercase tracking-wider block mb-1">Total SEO Keywords</span>
            <div className="text-3xl font-black text-[#171126]">{stats.totalKeywords}</div>
            <div className="text-[11px] text-[#7C3AED] font-bold mt-2 flex items-center gap-1.5">
              <span>{stats.byType.Primary} Primary</span> • <span>{stats.byType.Secondary} Secondary</span> • <span>{stats.byType.LongTail} Long-tail</span>
            </div>
          </div>

          <div className="bg-white border border-[#E9E4F2] p-5 rounded-2xl shadow-sm">
            <span className="text-[10px] font-extrabold text-[#6B6478] uppercase tracking-wider block mb-1">Intent Breakdown</span>
            <div className="text-3xl font-black text-emerald-600">{stats.byIntent.Commercial + stats.byIntent.Transactional}</div>
            <div className="text-[11px] text-[#6B6478] font-bold mt-2">
              Commercial: {stats.byIntent.Commercial} | Transactional: {stats.byIntent.Transactional}
            </div>
          </div>

          <div className="bg-white border border-[#E9E4F2] p-5 rounded-2xl shadow-sm">
            <span className="text-[10px] font-extrabold text-[#6B6478] uppercase tracking-wider block mb-1">Assigned vs Unassigned</span>
            <div className="text-3xl font-black text-[#7C3AED]">{stats.assignedCount} / {stats.totalKeywords}</div>
            <div className="text-[11px] text-slate-500 font-bold mt-2">
              {stats.unassignedCount} Keywords available for mapping
            </div>
          </div>

          <div className="bg-white border border-[#E9E4F2] p-5 rounded-2xl shadow-sm">
            <span className="text-[10px] font-extrabold text-[#6B6478] uppercase tracking-wider block mb-1">Mapped Pages & Compliance</span>
            <div className="text-3xl font-black text-[#171126]">{stats.totalPagesMapped} Pages</div>
            <div className="text-[11px] font-bold mt-2 text-emerald-600">
              {stats.constraintViolations.length === 0 ? "✓ 100% Constraints Satisfied" : `⚠️ ${stats.constraintViolations.length} Page Warnings`}
            </div>
          </div>
        </div>
      )}

      {/* Duplicate & Constraint Alerts */}
      {stats && (stats.duplicateKeywords.length > 0 || stats.constraintViolations.length > 0) && (
        <div className="max-w-7xl mx-auto mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {stats.duplicateKeywords.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 p-5 rounded-2xl">
              <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-2 flex items-center gap-2">
                <i className="fa-solid fa-triangle-exclamation" /> Duplicate Keywords Detected ({stats.duplicateKeywords.length})
              </h4>
              <ul className="text-xs text-amber-800 space-y-1 font-medium">
                {stats.duplicateKeywords.map((d, i) => (
                  <li key={i}>• &quot;{d.keyword}&quot; appears {d.count} times.</li>
                ))}
              </ul>
            </div>
          )}

          {stats.constraintViolations.length > 0 && (
            <div className="bg-rose-50 border border-rose-200 p-5 rounded-2xl">
              <h4 className="text-xs font-bold text-rose-900 uppercase tracking-wider mb-2 flex items-center gap-2">
                <i className="fa-solid fa-shield-cat" /> Page Rule Violations (1 Primary, 3-6 Sec, 3-8 Long-tail)
              </h4>
              <ul className="text-xs text-rose-800 space-y-1 font-medium max-h-28 overflow-y-auto">
                {stats.constraintViolations.map((c, i) => (
                  <li key={i}>• <strong>{c.pagePath}</strong>: {c.message}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto mb-6 flex border-b border-[#E9E4F2] gap-4">
        <button
          onClick={() => setActiveTab("keywords")}
          className={`pb-3 text-xs sm:text-sm font-extrabold cursor-pointer border-b-2 transition-all ${
            activeTab === "keywords" ? "border-[#7C3AED] text-[#7C3AED]" : "border-transparent text-[#6B6478] hover:text-[#171126]"
          }`}
        >
          <i className="fa-solid fa-key mr-1.5" /> Keywords Master Directory ({keywords.length})
        </button>
        <button
          onClick={() => setActiveTab("pages")}
          className={`pb-3 text-xs sm:text-sm font-extrabold cursor-pointer border-b-2 transition-all ${
            activeTab === "pages" ? "border-[#7C3AED] text-[#7C3AED]" : "border-transparent text-[#6B6478] hover:text-[#171126]"
          }`}
        >
          <i className="fa-solid fa-sitemap mr-1.5" /> Page Keyword & Meta Mapper ({pages.length})
        </button>
        <button
          onClick={() => setActiveTab("linking")}
          className={`pb-3 text-xs sm:text-sm font-extrabold cursor-pointer border-b-2 transition-all ${
            activeTab === "linking" ? "border-[#7C3AED] text-[#7C3AED]" : "border-transparent text-[#6B6478] hover:text-[#171126]"
          }`}
        >
          <i className="fa-solid fa-link mr-1.5" /> Internal Link Architecture
        </button>
      </div>

      {/* TAB 1: KEYWORDS MASTER DIRECTORY */}
      {activeTab === "keywords" && (
        <div className="max-w-7xl mx-auto bg-white border border-[#E9E4F2] rounded-2xl p-6 shadow-sm">
          {/* Controls Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 mb-6">
            <div className="sm:col-span-5">
              <input
                type="text"
                placeholder="Search keywords, target audience..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#FAF9FF] border border-[#E9E4F2] rounded-xl px-4 py-2.5 text-xs font-semibold text-[#1F1B2D] focus:outline-none focus:border-[#7C3AED]"
              />
            </div>
            <div className="sm:col-span-3">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full bg-[#FAF9FF] border border-[#E9E4F2] rounded-xl px-4 py-2.5 text-xs font-semibold text-[#1F1B2D] focus:outline-none"
              >
                <option value="All">All Types (Primary, Secondary, Long-tail)</option>
                <option value="Primary">Primary Keywords</option>
                <option value="Secondary">Secondary Keywords</option>
                <option value="Long-tail">Long-tail Keywords</option>
              </select>
            </div>
            <div className="sm:col-span-4">
              <select
                value={intentFilter}
                onChange={(e) => setIntentFilter(e.target.value)}
                className="w-full bg-[#FAF9FF] border border-[#E9E4F2] rounded-xl px-4 py-2.5 text-xs font-semibold text-[#1F1B2D] focus:outline-none"
              >
                <option value="All">All Intents (Commercial, Transactional, Info)</option>
                <option value="Transactional">Transactional Intent</option>
                <option value="Commercial">Commercial Intent</option>
                <option value="Informational">Informational Intent</option>
                <option value="Navigational">Navigational Intent</option>
              </select>
            </div>
          </div>

          {/* Keywords Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#FAF9FF] border-b border-[#E9E4F2] text-[#6B6478] font-extrabold uppercase tracking-wider text-[10px]">
                  <th className="p-3">Keyword</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Search Intent</th>
                  <th className="p-3">Target Audience</th>
                  <th className="p-3">Assigned Page</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E9E4F2] font-semibold text-[#1F1B2D]">
                {filteredKeywords.map((k) => {
                  const assignedPage = pages.find(p => p.id === k.assigned_page_id);
                  return (
                    <tr key={k.id} className="hover:bg-[#FAF9FF] transition-colors">
                      <td className="p-3 font-bold text-[#171126]">{k.keyword}</td>
                      <td className="p-3">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                          k.type === "Primary" ? "bg-purple-100 text-purple-800" :
                          k.type === "Secondary" ? "bg-blue-100 text-blue-800" : "bg-slate-100 text-slate-700"
                        }`}>
                          {k.type}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                          k.search_intent === "Transactional" ? "bg-emerald-100 text-emerald-800" :
                          k.search_intent === "Commercial" ? "bg-indigo-100 text-indigo-800" : "bg-amber-100 text-amber-800"
                        }`}>
                          {k.search_intent}
                        </span>
                      </td>
                      <td className="p-3 text-slate-500 max-w-xs truncate">{k.target_audience}</td>
                      <td className="p-3">
                        {assignedPage ? (
                          <span className="text-[11px] font-bold text-[#7C3AED] bg-[#7C3AED]/10 px-2 py-0.5 rounded">
                            {assignedPage.path}
                          </span>
                        ) : (
                          <span className="text-slate-400 text-[10px]">Unassigned</span>
                        )}
                      </td>
                      <td className="p-3 text-right space-x-2">
                        <button
                          onClick={() => {
                            setEditingKw({ ...k });
                            setIsKwModalOpen(true);
                          }}
                          className="text-[#7C3AED] hover:underline text-xs font-bold cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteKeyword(k.id)}
                          className="text-rose-600 hover:underline text-xs font-bold cursor-pointer"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {filteredKeywords.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-6 text-center text-slate-400 font-semibold">
                      No keywords matching your search filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: PAGE KEYWORD & METADATA MAPPER */}
      {activeTab === "pages" && (
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Side: Page Selector */}
          <div className="lg:col-span-4 bg-white border border-[#E9E4F2] rounded-2xl p-5 shadow-sm">
            <h3 className="text-xs font-extrabold text-[#6B6478] uppercase tracking-wider mb-4">Select Page to Manage</h3>
            <div className="space-y-2">
              {pages.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPageId(p.id)}
                  className={`w-full p-3 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer ${
                    selectedPageId === p.id
                      ? "bg-[#7C3AED] text-white border-[#7C3AED] shadow-sm"
                      : "bg-[#FAF9FF] text-[#1F1B2D] border-[#E9E4F2] hover:bg-slate-100"
                  }`}
                >
                  <div className="font-extrabold">{p.path}</div>
                  <div className="text-[10px] opacity-80 mt-0.5">{p.category}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Side: Page Form */}
          {editingPage && (
            <div className="lg:col-span-8 bg-white border border-[#E9E4F2] rounded-2xl p-6 shadow-sm">
              <form onSubmit={handleSavePage} className="space-y-6">
                <div className="border-b border-[#E9E4F2] pb-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-extrabold text-[#7C3AED] uppercase tracking-wider block">Editing SEO Mapping</span>
                    <h3 className="text-lg font-black text-[#171126]">{editingPage.path}</h3>
                  </div>
                  <button
                    type="submit"
                    disabled={saving}
                    className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    {saving ? "Saving..." : "Save Page SEO Metadata"}
                  </button>
                </div>

                {/* Primary Keyword Dropdown */}
                <div>
                  <label className="block text-xs font-extrabold text-[#171126] mb-1">
                    Primary Keyword (Required: Exactly 1)
                  </label>
                  <select
                    value={editingPage.primary_keyword_id || ""}
                    onChange={(e) => setEditingPage({ ...editingPage, primary_keyword_id: e.target.value || null })}
                    className="w-full bg-[#FAF9FF] border border-[#E9E4F2] rounded-xl px-4 py-2.5 text-xs font-bold text-[#1F1B2D]"
                  >
                    <option value="">-- Select Primary Keyword --</option>
                    {keywords.map(k => (
                      <option key={k.id} value={k.id}>
                        {k.keyword} ({k.type} - {k.search_intent})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Secondary Keywords Multi-select */}
                <div>
                  <label className="block text-xs font-extrabold text-[#171126] mb-1">
                    Secondary Keywords (Constraint: 3 to 6 keywords)
                  </label>
                  <div className="bg-[#FAF9FF] border border-[#E9E4F2] rounded-xl p-3 max-h-40 overflow-y-auto space-y-1.5">
                    {keywords.map(k => {
                      const isChecked = editingPage.secondary_keyword_ids?.includes(k.id);
                      return (
                        <label key={k.id} className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => {
                              const current = editingPage.secondary_keyword_ids || [];
                              if (e.target.checked) {
                                setEditingPage({ ...editingPage, secondary_keyword_ids: [...current, k.id] });
                              } else {
                                setEditingPage({ ...editingPage, secondary_keyword_ids: current.filter(id => id !== k.id) });
                              }
                            }}
                            className="accent-[#7C3AED]"
                          />
                          <span>{k.keyword}</span>
                          <span className="text-[10px] text-slate-400">({k.type})</span>
                        </label>
                      );
                    })}
                  </div>
                  <span className="text-[10px] text-slate-500 font-semibold mt-1 block">
                    Selected: {editingPage.secondary_keyword_ids?.length || 0} Secondary Keywords
                  </span>
                </div>

                {/* Long-tail Keywords Multi-select */}
                <div>
                  <label className="block text-xs font-extrabold text-[#171126] mb-1">
                    Long-tail Keywords (Constraint: 3 to 8 keywords)
                  </label>
                  <div className="bg-[#FAF9FF] border border-[#E9E4F2] rounded-xl p-3 max-h-40 overflow-y-auto space-y-1.5">
                    {keywords.map(k => {
                      const isChecked = editingPage.longtail_keyword_ids?.includes(k.id);
                      return (
                        <label key={k.id} className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => {
                              const current = editingPage.longtail_keyword_ids || [];
                              if (e.target.checked) {
                                setEditingPage({ ...editingPage, longtail_keyword_ids: [...current, k.id] });
                              } else {
                                setEditingPage({ ...editingPage, longtail_keyword_ids: current.filter(id => id !== k.id) });
                              }
                            }}
                            className="accent-[#7C3AED]"
                          />
                          <span>{k.keyword}</span>
                          <span className="text-[10px] text-slate-400">({k.type})</span>
                        </label>
                      );
                    })}
                  </div>
                  <span className="text-[10px] text-slate-500 font-semibold mt-1 block">
                    Selected: {editingPage.longtail_keyword_ids?.length || 0} Long-tail Keywords
                  </span>
                </div>

                {/* Meta Title & Description */}
                <div>
                  <label className="block text-xs font-extrabold text-[#171126] mb-1">Meta Title Tag</label>
                  <input
                    type="text"
                    value={editingPage.title_template || ""}
                    onChange={(e) => setEditingPage({ ...editingPage, title_template: e.target.value })}
                    className="w-full bg-[#FAF9FF] border border-[#E9E4F2] rounded-xl px-4 py-2.5 text-xs font-semibold text-[#1F1B2D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-[#171126] mb-1">Meta Description</label>
                  <textarea
                    rows={3}
                    value={editingPage.meta_description || ""}
                    onChange={(e) => setEditingPage({ ...editingPage, meta_description: e.target.value })}
                    className="w-full bg-[#FAF9FF] border border-[#E9E4F2] rounded-xl px-4 py-2.5 text-xs font-semibold text-[#1F1B2D]"
                  />
                </div>

                {/* Primary H1 Tag */}
                <div>
                  <label className="block text-xs font-extrabold text-[#171126] mb-1">Primary H1 Tag</label>
                  <input
                    type="text"
                    value={editingPage.h1 || ""}
                    onChange={(e) => setEditingPage({ ...editingPage, h1: e.target.value })}
                    className="w-full bg-[#FAF9FF] border border-[#E9E4F2] rounded-xl px-4 py-2.5 text-xs font-semibold text-[#1F1B2D]"
                  />
                </div>

                {/* H2 Tags List */}
                <div>
                  <label className="block text-xs font-extrabold text-[#171126] mb-1">H2 Section Tags</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Add H2 heading..."
                      value={h2Input}
                      onChange={(e) => setH2Input(e.target.value)}
                      className="flex-grow bg-[#FAF9FF] border border-[#E9E4F2] rounded-xl px-3 py-2 text-xs font-semibold"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (!h2Input) return;
                        setEditingPage({ ...editingPage, h2_tags: [...(editingPage.h2_tags || []), h2Input] });
                        setH2Input("");
                      }}
                      className="bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-xl"
                    >
                      Add H2
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {editingPage.h2_tags?.map((h2, idx) => (
                      <span key={idx} className="bg-slate-100 text-slate-800 text-xs px-2.5 py-1 rounded-lg flex items-center gap-1 font-semibold">
                        {h2}
                        <button
                          type="button"
                          onClick={() => setEditingPage({ ...editingPage, h2_tags: editingPage.h2_tags?.filter((_, i) => i !== idx) })}
                          className="text-rose-600 ml-1 font-bold"
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* FAQ Schema Editor */}
                <div>
                  <label className="block text-xs font-extrabold text-[#171126] mb-1">FAQ Schema Items</label>
                  <div className="space-y-2 mb-3">
                    <input
                      type="text"
                      placeholder="Question..."
                      value={faqQInput}
                      onChange={(e) => setFaqQInput(e.target.value)}
                      className="w-full bg-[#FAF9FF] border border-[#E9E4F2] rounded-xl px-3 py-2 text-xs font-semibold"
                    />
                    <textarea
                      rows={2}
                      placeholder="Answer..."
                      value={faqAInput}
                      onChange={(e) => setFaqAInput(e.target.value)}
                      className="w-full bg-[#FAF9FF] border border-[#E9E4F2] rounded-xl px-3 py-2 text-xs font-semibold"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (!faqQInput || !faqAInput) return;
                        setEditingPage({
                          ...editingPage,
                          faq_schema: [...(editingPage.faq_schema || []), { question: faqQInput, answer: faqAInput }],
                        });
                        setFaqQInput("");
                        setFaqAInput("");
                      }}
                      className="bg-[#7C3AED] text-white text-xs font-bold px-4 py-2 rounded-xl shadow-sm"
                    >
                      Add FAQ Item
                    </button>
                  </div>

                  <div className="space-y-2">
                    {editingPage.faq_schema?.map((faq, idx) => (
                      <div key={idx} className="p-3 bg-[#FAF9FF] border border-[#E9E4F2] rounded-xl flex items-start justify-between">
                        <div>
                          <div className="text-xs font-bold text-[#171126]">{faq.question}</div>
                          <div className="text-[11px] text-[#6B6478] mt-1">{faq.answer}</div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setEditingPage({ ...editingPage, faq_schema: editingPage.faq_schema?.filter((_, i) => i !== idx) })}
                          className="text-rose-600 text-xs font-bold ml-2"
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: INTERNAL LINK ARCHITECTURE */}
      {activeTab === "linking" && (
        <div className="max-w-7xl mx-auto bg-white border border-[#E9E4F2] rounded-2xl p-6 shadow-sm space-y-6">
          <div>
            <h3 className="text-lg font-black text-[#171126]">Internal Link Hierarchy Rules</h3>
            <p className="text-xs text-[#6B6478] font-semibold mt-1">
              Enforcing internal linking sequence: <code className="bg-slate-100 px-2 py-0.5 rounded text-[#7C3AED]">Blog ➔ Service Page ➔ Industry Page ➔ Contact/CTA</code>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#FAF9FF] border border-[#E9E4F2] p-5 rounded-2xl">
              <span className="text-[10px] font-extrabold text-[#7C3AED] uppercase tracking-wider block mb-2">Rule 1: Blog to Service Linking</span>
              <h4 className="text-xs font-bold text-[#171126] mb-2">Blog Articles MUST link to Core Service Pages</h4>
              <p className="text-xs text-[#6B6478] leading-relaxed font-medium mb-3">
                Use high-intent anchor text (e.g., &quot;custom website development services&quot;) pointing directly to <code className="text-[#7C3AED]">/custom-website-development</code> rather than generic &quot;click here&quot;.
              </p>
            </div>

            <div className="bg-[#FAF9FF] border border-[#E9E4F2] p-5 rounded-2xl">
              <span className="text-[10px] font-extrabold text-[#7C3AED] uppercase tracking-wider block mb-2">Rule 2: Service to Industry Mapping</span>
              <h4 className="text-xs font-bold text-[#171126] mb-2">Service Pages MUST link to Specialized Industry Verticals</h4>
              <p className="text-xs text-[#6B6478] leading-relaxed font-medium mb-3">
                Link core web services to <code className="text-[#7C3AED]">/industries/real-estate</code>, <code className="text-[#7C3AED]">/industries/ecommerce</code>, and <code className="text-[#7C3AED]">/industries/travel-tourism</code>.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* KEYWORD MODAL */}
      {isKwModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#E9E4F2] w-full max-w-lg rounded-2xl p-6 shadow-2xl relative">
            <button
              onClick={() => setIsKwModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 text-lg font-bold"
            >
              &times;
            </button>
            <h3 className="text-lg font-black text-[#171126] mb-4">
              {editingKw.id ? "Edit SEO Keyword" : "Add New SEO Keyword"}
            </h3>

            <form onSubmit={handleSaveKeyword} className="space-y-4">
              <div>
                <label className="block text-xs font-extrabold text-[#171126] mb-1">Keyword Text</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. custom website development services"
                  value={editingKw.keyword || ""}
                  onChange={(e) => setEditingKw({ ...editingKw, keyword: e.target.value })}
                  className="w-full bg-[#FAF9FF] border border-[#E9E4F2] rounded-xl px-4 py-2.5 text-xs font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-extrabold text-[#171126] mb-1">Keyword Type</label>
                  <select
                    value={editingKw.type || "Secondary"}
                    onChange={(e) => setEditingKw({ ...editingKw, type: e.target.value as any })}
                    className="w-full bg-[#FAF9FF] border border-[#E9E4F2] rounded-xl px-3 py-2 text-xs font-semibold"
                  >
                    <option value="Primary">Primary</option>
                    <option value="Secondary">Secondary</option>
                    <option value="Long-tail">Long-tail</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-[#171126] mb-1">Search Intent</label>
                  <select
                    value={editingKw.search_intent || "Commercial"}
                    onChange={(e) => setEditingKw({ ...editingKw, search_intent: e.target.value as any })}
                    className="w-full bg-[#FAF9FF] border border-[#E9E4F2] rounded-xl px-3 py-2 text-xs font-semibold"
                  >
                    <option value="Commercial">Commercial</option>
                    <option value="Transactional">Transactional</option>
                    <option value="Informational">Informational</option>
                    <option value="Navigational">Navigational</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-[#171126] mb-1">Target Audience</label>
                <input
                  type="text"
                  placeholder="e.g. Global Startups, Founders, Enterprises"
                  value={editingKw.target_audience || ""}
                  onChange={(e) => setEditingKw({ ...editingKw, target_audience: e.target.value })}
                  className="w-full bg-[#FAF9FF] border border-[#E9E4F2] rounded-xl px-4 py-2.5 text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-[#171126] mb-1">Notes / Strategy</label>
                <textarea
                  rows={2}
                  placeholder="Internal notes on keyword placement..."
                  value={editingKw.notes || ""}
                  onChange={(e) => setEditingKw({ ...editingKw, notes: e.target.value })}
                  className="w-full bg-[#FAF9FF] border border-[#E9E4F2] rounded-xl px-4 py-2 text-xs font-semibold"
                />
              </div>

              <div className="flex justify-end gap-3 border-t border-[#E9E4F2] pt-4">
                <button
                  type="button"
                  onClick={() => setIsKwModalOpen(false)}
                  className="bg-slate-100 text-slate-700 font-bold text-xs px-5 py-2.5 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-[#7C3AED] text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-md cursor-pointer"
                >
                  {saving ? "Saving..." : "Save Keyword"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
