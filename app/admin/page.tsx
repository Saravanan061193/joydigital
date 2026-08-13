"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import VisitorMap from "@/components/VisitorMap";

interface Enquiry {
  id: string;
  name: string;
  companyName: string;
  website: string;
  email: string;
  mobile: string;
  service: string;
  message: string;
  source: string;
  region: string;
  status: string;
  createdAt: string;
  notes?: string;
}

interface AnalyticsData {
  totalPageviews: number;
  uniqueVisitors: number;
  topCities: Array<{ city: string; country: string; count: number }>;
  mapMarkers: Array<{ lat: number; lng: number; city: string; count: number }>;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [loginError, setLoginError] = useState("");
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  // Active Menu: "leads" | "map" | "heatmaps"
  const [activeTab, setActiveTab] = useState<"leads" | "map" | "heatmaps">("leads");

  // Analytics data state
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalPageviews: 0,
    uniqueVisitors: 0,
    topCities: [],
    mapMarkers: []
  });

  // Search & filter states
  const [search, setSearch] = useState("");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [regionFilter, setRegionFilter] = useState("all");

  // Expandable row state
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Temporary note states
  const [notesState, setNotesState] = useState<Record<string, string>>({});
  const [savedNotesStatus, setSavedNotesStatus] = useState<Record<string, "idle" | "saving" | "saved">>({});

  // Live time counter
  const [liveTime, setLiveTime] = useState("");

  // Sidebar drawers and modals visibility state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [activeEllipsisMenu, setActiveEllipsisMenu] = useState<string | null>(null);

  // Quick Add form state
  const [quickAddForm, setQuickAddForm] = useState({
    name: "",
    companyName: "",
    website: "",
    email: "",
    mobile: "",
    service: "Next.js Web Design & Development",
    message: "",
    region: "GLOBAL"
  });
  const [quickAddSubmitting, setQuickAddSubmitting] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLiveTime(
        now.toLocaleTimeString(undefined, {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Load auth state from sessionStorage
  useEffect(() => {
    const auth = sessionStorage.getItem("joy_admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
      fetchEnquiries();
      fetchAnalytics();
    } else {
      setLoading(false);
    }
  }, []);

  // Close menus on click outside
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveEllipsisMenu(null);
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === "2613" || pin === "JoyAdmin2026") {
      setIsAuthenticated(true);
      sessionStorage.setItem("joy_admin_auth", "true");
      setLoginError("");
      fetchEnquiries();
      fetchAnalytics();
    } else {
      setLoginError("Incorrect access credentials. Please try again.");
    }
  };

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/enquiries");
      if (res.ok) {
        const data = await res.json();
        setEnquiries(data);

        // Initialize note states
        const initialNotes: Record<string, string> = {};
        data.forEach((enq: Enquiry) => {
          initialNotes[enq.id] = enq.notes || "";
        });
        setNotesState(initialNotes);
      }
    } catch (err) {
      console.error("Error fetching enquiries:", err);
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
      console.error("Error fetching analytics data:", err);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/enquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setEnquiries((prev) =>
          prev.map((enq) => (enq.id === id ? { ...enq, status: newStatus } : enq))
        );
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleSaveNotes = async (id: string) => {
    setSavedNotesStatus((prev) => ({ ...prev, [id]: "saving" }));
    try {
      const res = await fetch("/api/admin/enquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, notes: notesState[id] }),
      });
      if (res.ok) {
        setEnquiries((prev) =>
          prev.map((enq) => (enq.id === id ? { ...enq, notes: notesState[id] } : enq))
        );
        setSavedNotesStatus((prev) => ({ ...prev, [id]: "saved" }));
        setTimeout(() => {
          setSavedNotesStatus((prev) => ({ ...prev, [id]: "idle" }));
        }, 2000);
      }
    } catch (err) {
      console.error("Error saving notes:", err);
      setSavedNotesStatus((prev) => ({ ...prev, [id]: "idle" }));
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this enquiry? This action cannot be undone.")) {
      return;
    }
    try {
      const res = await fetch(`/api/admin/enquiries?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setEnquiries((prev) => prev.filter((enq) => enq.id !== id));
      }
    } catch (err) {
      console.error("Error deleting enquiry:", err);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("joy_admin_auth");
    setIsAuthenticated(false);
    setPin("");
  };

  const handleQuickAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setQuickAddSubmitting(true);
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...quickAddForm,
          source: "CRM Dashboard Quick Add"
        })
      });
      if (res.ok) {
        setIsQuickAddOpen(false);
        setQuickAddForm({
          name: "",
          companyName: "",
          website: "",
          email: "",
          mobile: "",
          service: "Next.js Web Design & Development",
          message: "",
          region: "GLOBAL"
        });
        await fetchEnquiries();
      }
    } catch (err) {
      console.error("Error adding enquiry:", err);
    } finally {
      setQuickAddSubmitting(false);
    }
  };

  const resetFilters = () => {
    setSearch("");
    setServiceFilter("all");
    setStatusFilter("all");
    setRegionFilter("all");
  };

  // CSV Export utility
  const exportToCSV = () => {
    if (enquiries.length === 0) return;

    const headers = [
      "Date",
      "Name",
      "Mobile",
      "Email",
      "Company",
      "Website",
      "Service Requested",
      "Details",
      "Internal Notes",
      "Region",
      "Source",
      "Status",
    ];
    const rows = enquiries.map((enq) => [
      new Date(enq.createdAt).toLocaleString(),
      enq.name,
      enq.mobile,
      enq.email,
      enq.companyName,
      enq.website,
      enq.service,
      enq.message.replace(/\n/g, " "),
      (enq.notes || "").replace(/\n/g, " "),
      enq.region,
      enq.source,
      enq.status,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((e) => e.map((val) => `"${val.replace(/"/g, '""')}"`).join(",")),
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `enquiries_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered list
  const filteredEnquiries = enquiries.filter((enq) => {
    const searchLower = search.toLowerCase();
    const matchSearch =
      enq.name.toLowerCase().includes(searchLower) ||
      enq.mobile.toLowerCase().includes(searchLower) ||
      enq.email.toLowerCase().includes(searchLower) ||
      enq.companyName.toLowerCase().includes(searchLower) ||
      enq.message.toLowerCase().includes(searchLower) ||
      (enq.notes || "").toLowerCase().includes(searchLower);

    const matchService = serviceFilter === "all" || enq.service === serviceFilter;
    const matchStatus = statusFilter === "all" || enq.status === statusFilter;
    const matchRegion =
      regionFilter === "all" || enq.region.toLowerCase() === regionFilter.toLowerCase();

    return matchSearch && matchService && matchStatus && matchRegion;
  });

  // Calculate metrics
  const totalCount = enquiries.length;
  const newCount = enquiries.filter((e) => e.status === "New").length;
  const inProgressCount = enquiries.filter((e) => e.status === "In Progress").length;
  const contactedCount = enquiries.filter((e) => e.status === "Contacted" || e.status === "Closed").length;

  const getAvatarInitials = (name: string) => {
    if (!name) return "N";
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0][0].toUpperCase();
  };

  const getAvatarBg = (name: string) => {
    const colors = [
      "bg-blue-100 text-blue-700",
      "bg-emerald-100 text-emerald-700",
      "bg-purple-100 text-purple-700",
      "bg-amber-100 text-amber-700",
      "bg-pink-100 text-pink-700",
      "bg-indigo-100 text-indigo-700"
    ];
    if (!name) return colors[0];
    const code = name.charCodeAt(0) % colors.length;
    return colors[code];
  };

  if (loading && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 inter-font">
        <style dangerouslySetInnerHTML={{ __html: `
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
          .inter-font {
            font-family: 'Inter', sans-serif !important;
          }
        ` }} />
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 border-4 border-slate-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-t-[#2563EB] rounded-full animate-spin"></div>
          </div>
          <div className="text-[10px] font-black text-slate-500 tracking-[0.2em] uppercase animate-pulse mt-2">
            Loading Dashboard CRM...
          </div>
        </div>
      </div>
    );
  }

  // Security Login Screen (Clean Light Glass Card)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F1F5F9] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden inter-font">
        <style dangerouslySetInnerHTML={{ __html: `
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
          .inter-font {
            font-family: 'Inter', sans-serif !important;
          }
          .text-gradient {
            background: linear-gradient(135deg, #2563EB 0%, #EA580C 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        ` }} />
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />

        <div className="w-full max-w-md bg-white border border-slate-200/80 rounded-[32px] p-8 sm:p-10 shadow-[0_15px_50px_rgba(0,0,0,0.05)] relative z-10 transition-all hover:border-slate-350">
          <div className="text-center mb-8 flex flex-col items-center">
            <div className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-orange-500 rounded-2xl flex items-center justify-center shadow-md shadow-blue-500/10 mb-5">
              <span className="font-black text-2xl text-white tracking-tighter">JD</span>
            </div>
            <span className="text-2xl font-black tracking-tight text-slate-900 flex items-center gap-1.5 justify-center">
              Joy<span className="text-gradient">Digital</span>
              <span className="bg-blue-50 text-[#2563EB] text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded border border-blue-150 select-none align-middle">
                CRM
              </span>
            </span>
            <p className="text-xs text-slate-500 mt-2.5 max-w-[280px]">
              Access restricted. Input secure passkey pin to unlock customer leads console.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2.5">
              <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest pl-1">
                Security Access PIN
              </label>
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="••••"
                required
                className="w-full text-center tracking-[0.75em] text-2xl font-bold bg-slate-50 border border-slate-200 text-slate-950 rounded-2xl px-4 py-4 outline-none focus:bg-white focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10 transition-all duration-300 placeholder:text-slate-300"
                autoFocus
              />
            </div>

            {loginError && (
              <p className="text-center text-xs font-bold text-rose-600 bg-rose-50 border border-rose-150 py-2.5 rounded-xl animate-shake">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-extrabold text-xs py-4 rounded-2xl shadow-md transition-all duration-150 cursor-pointer mt-1 w-full hover:-translate-y-0.5"
            >
              Unlock Terminal <i className="fa-solid fa-lock-open ml-1.5" />
            </button>
          </form>
        </div>
      </div>
    );
  }

  const getPageDetails = () => {
    switch (activeTab) {
      case "leads":
        return {
          title: "CRM Leads",
          subtitle: "Manage website enquiries and sales pipeline",
          icon: "fa-regular fa-address-book"
        };
      case "map":
        return {
          title: "Visitor Geolocation Map",
          subtitle: "Track physical visitor origins using real-time geocoding and map citations",
          icon: "fa-regular fa-map"
        };
      case "heatmaps":
        return {
          title: "User Session Heatmaps",
          subtitle: "Analyze mouse scrolls, clicks, and page records utilizing Microsoft Clarity",
          icon: "fa-regular fa-eye"
        };
    }
  };

  const pageMeta = getPageDetails();

  return (
    <div className="min-h-screen flex bg-[#F8FAFC] text-slate-800 relative overflow-hidden inter-font select-none">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.01] pointer-events-none" />

      {/* Scope Style Overrides */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        .inter-font {
          font-family: 'Inter', sans-serif !important;
        }
        .inter-font button, .inter-font input, .inter-font select, .inter-font option, .inter-font textarea {
          font-family: 'Inter', sans-serif !important;
        }
        .inter-font i, .inter-font .fa, .inter-font [class*="fa-"] {
          font-family: 'Font Awesome 6 Free', 'Font Awesome 6 Brands', 'Font Awesome 6 Pro', sans-serif !important;
        }
        .text-gradient {
          background: linear-gradient(135deg, #2563EB 0%, #EA580C 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .bg-grid-pattern {
          background-size: 30px 30px;
          background-image: 
            linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px);
        }
        /* Custom scrollbar to match Notion/HubSpot */
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: #E2E8F0;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #CBD5E1;
        }
      ` }} />

      {/* Sidebar Overlay (Mobile Only) */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-[#0F172A]/40 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-150"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* LEFT NAVIGATION SIDEBAR */}
      <aside 
        className={`fixed inset-y-0 left-0 w-[260px] md:w-20 lg:w-[260px] bg-[#0F172A] text-white flex flex-col z-50 transition-all duration-150 lg:static lg:h-screen shrink-0 ${
          isSidebarOpen ? "translate-x-0 w-[260px]" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Sidebar Header */}
        <div className="h-16 border-b border-slate-800 flex items-center justify-between px-5">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8.5 h-8.5 bg-[#2563EB] rounded-lg flex items-center justify-center shadow-md shrink-0">
              <span className="font-extrabold text-sm text-white tracking-tighter">JD</span>
            </div>
            <div className="md:hidden lg:block">
              <span className="font-extrabold text-sm tracking-tight text-white flex items-center gap-1.5">
                Joy<span className="text-[#EA580C]">Digital</span>
              </span>
            </div>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white cursor-pointer"
          >
            <i className="fa-solid fa-xmark text-base" />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 py-6 px-3 space-y-7 overflow-y-auto">
          {/* CORE SECTION */}
          <div>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-3 block mb-2 md:hidden lg:block select-none">
              Workspace
            </span>
            <div className="space-y-1">
              {[
                { id: "leads", label: "CRM Leads", icon: "fa-regular fa-address-book" }
              ].map((tab) => {
                const isTabActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id as any);
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3.5 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all duration-150 text-left cursor-pointer group ${
                      isTabActive
                        ? "bg-[#2563EB] text-white shadow-sm"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                    }`}
                    title={tab.label}
                  >
                    <i className={`${tab.icon} text-sm shrink-0 w-5 text-center`} />
                    <span className="md:hidden lg:inline">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ANALYTICS SECTION */}
          <div>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-3 block mb-2 md:hidden lg:block select-none">
              Analytics
            </span>
            <div className="space-y-1">
              {[
                { id: "map", label: "Visitor Map", icon: "fa-regular fa-map" },
                { id: "heatmaps", label: "Session Heatmaps", icon: "fa-regular fa-eye" }
              ].map((tab) => {
                const isTabActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id as any);
                      if (tab.id === "map") fetchAnalytics();
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3.5 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all duration-150 text-left cursor-pointer group ${
                      isTabActive
                        ? "bg-[#2563EB] text-white shadow-sm"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                    }`}
                    title={tab.label}
                  >
                    <i className={`${tab.icon} text-sm shrink-0 w-5 text-center`} />
                    <span className="md:hidden lg:inline">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t border-slate-800 p-4 space-y-2">
          {/* Logout Action */}
          <button
            onClick={handleLogout}
            className="w-full text-slate-400 hover:text-white hover:bg-slate-800/50 font-bold text-xs py-2 px-3 rounded-lg transition-all flex items-center gap-3 cursor-pointer select-none"
            title="Log Out"
          >
            <i className="fa-solid fa-arrow-right-from-bracket text-sm w-5 text-center shrink-0" />
            <span className="md:hidden lg:inline">Logout</span>
          </button>
        </div>
      </aside>

      {/* RIGHT MAIN CONTENT AREA */}
      <main className="flex-1 h-screen overflow-y-auto bg-[#F8FAFC] flex flex-col min-w-0">
        
        {/* Top Header Panel (Modern SaaS Header Layout) */}
        <header className="h-16 bg-white border-b border-slate-200/80 sticky top-0 z-30 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3.5">
            {/* Mobile/Tablet Hamburger menu toggle */}
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden w-8 h-8 border border-slate-200 rounded-lg flex items-center justify-center text-slate-600 bg-slate-50 hover:bg-slate-100 cursor-pointer transition-colors"
            >
              <i className="fa-solid fa-bars text-sm" />
            </button>
            
            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-1 bg-emerald-50 border border-emerald-250 px-2 py-0.5 rounded text-[10px] font-bold text-emerald-700">
                <span className="relative flex h-1.5 w-1.5 mr-0.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
                <span>Active DB</span>
              </div>
              
              <div className="hidden sm:flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded text-[10px] font-bold text-slate-500 font-mono">
                <span className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse" />
                <span>LIVE: {liveTime || "00:00:00"}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Notifications icon */}
            <button className="w-8 h-8 border border-slate-200 rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-800 bg-white relative transition-colors cursor-pointer">
              <i className="fa-regular fa-bell text-sm" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border border-white" />
            </button>

            {/* Quick Add Button */}
            <button
              onClick={() => setIsQuickAddOpen(true)}
              className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white text-xs font-bold px-3.5 py-1.75 rounded-xl shadow-sm hover:shadow transition-all cursor-pointer flex items-center gap-1.5 border border-transparent"
            >
              <i className="fa-solid fa-plus text-[10px]" />
              <span className="hidden sm:inline">Add Lead</span>
            </button>

            {/* User Profile Avatar */}
            <div className="w-8 h-8 bg-slate-100 border border-slate-200 rounded-full flex items-center justify-center text-slate-600 font-bold text-xs select-none">
              AD
            </div>
          </div>
        </header>

        {/* Content Container */}
        <div className="flex-1 overflow-y-auto px-6 py-8 max-w-[1440px] w-full mx-auto">
          
          {/* Page Title & Subtitle block */}
          <div className="mb-8">
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">{pageMeta.title}</h2>
            <p className="text-xs text-slate-500 mt-1 font-medium">{pageMeta.subtitle}</p>
          </div>

          {/* TAB CONTENT: Leads CRM Manager */}
          {activeTab === "leads" && (
            <div className="space-y-6">
              
              {/* Four KPI Cards Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
                
                {/* KPI Card 1: Total Enquiries */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_4px_20px_rgba(15,23,42,0.04)] flex items-center justify-between hover:shadow-[0_10px_30px_rgba(15,23,42,0.06)] hover:-translate-y-[2px] transition-all duration-150 group">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Total Enquiries</span>
                    <span className="text-3xl font-extrabold text-slate-900 leading-tight block">{totalCount}</span>
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600">
                      <span className="bg-emerald-50 px-1.5 py-0.5 rounded"><i className="fa-solid fa-arrow-trend-up mr-0.5" /> +12%</span>
                      <span className="text-slate-400 font-medium">this month</span>
                    </div>
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563EB] text-base shadow-sm shrink-0">
                    <i className="fa-regular fa-folder-open" />
                  </div>
                </div>

                {/* KPI Card 2: New Leads */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_4px_20px_rgba(15,23,42,0.04)] flex items-center justify-between hover:shadow-[0_10px_30px_rgba(15,23,42,0.06)] hover:-translate-y-[2px] transition-all duration-150 group">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">New Leads</span>
                    <span className="text-3xl font-extrabold text-slate-900 leading-tight block">{newCount}</span>
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-orange-600">
                      <span className="bg-orange-50 px-1.5 py-0.5 rounded"><i className="fa-solid fa-fire mr-0.5" /> Hot</span>
                      <span className="text-slate-400 font-medium">unresolved</span>
                    </div>
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600 text-base shadow-sm shrink-0">
                    <i className="fa-regular fa-bell animate-pulse" />
                  </div>
                </div>

                {/* KPI Card 3: In Progress */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_4px_20px_rgba(15,23,42,0.04)] flex items-center justify-between hover:shadow-[0_10px_30px_rgba(15,23,42,0.06)] hover:-translate-y-[2px] transition-all duration-150 group">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">In Progress</span>
                    <span className="text-3xl font-extrabold text-slate-900 leading-tight block">{inProgressCount}</span>
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-amber-600">
                      <span className="bg-amber-50 px-1.5 py-0.5 rounded"><i className="fa-solid fa-spinner mr-0.5 animate-spin" style={{ animationDuration: "3s" }} /> Active</span>
                      <span className="text-slate-400 font-medium">discussions</span>
                    </div>
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 text-base shadow-sm shrink-0">
                    <i className="fa-solid fa-arrows-spin" />
                  </div>
                </div>

                {/* KPI Card 4: Contacted & Closed */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_4px_20px_rgba(15,23,42,0.04)] flex items-center justify-between hover:shadow-[0_10px_30px_rgba(15,23,42,0.06)] hover:-translate-y-[2px] transition-all duration-150 group">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Contacted & Closed</span>
                    <span className="text-3xl font-extrabold text-slate-900 leading-tight block">{contactedCount}</span>
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600">
                      <span className="bg-emerald-50 px-1.5 py-0.5 rounded"><i className="fa-solid fa-arrow-trend-up mr-0.5" /> +15%</span>
                      <span className="text-slate-400 font-medium">deals won</span>
                    </div>
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 text-base shadow-sm shrink-0">
                    <i className="fa-regular fa-circle-check" />
                  </div>
                </div>

              </div>

              {/* Two-Row Search & Filters toolbar */}
              <div className="bg-white border border-slate-200/85 rounded-2xl p-5 shadow-[0_4px_20px_rgba(15,23,42,0.02)] space-y-4">
                {/* Row 1: Full-width Search */}
                <div className="relative w-full">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                    <i className="fa-solid fa-magnifying-glass text-[12px]" />
                  </span>
                  <input
                    type="text"
                    placeholder="Search by lead name, email address, mobile, queries..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full text-xs pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 text-slate-800 rounded-xl outline-none focus:bg-white focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/5 transition-all duration-150 font-medium"
                  />
                </div>

                {/* Row 2: Secondary filter row with equal height dropdown inputs */}
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full md:w-auto flex-1">
                    <div className="flex flex-col gap-1">
                      <select
                        value={serviceFilter}
                        onChange={(e) => setServiceFilter(e.target.value)}
                        className="w-full text-[11px] px-3 py-2.5 border border-slate-200 bg-slate-50 text-slate-700 outline-none rounded-xl focus:border-[#2563EB] focus:bg-white focus:ring-4 focus:ring-[#2563EB]/5 transition-all duration-150 font-semibold h-[38px] cursor-pointer"
                      >
                        <option value="all">All Services</option>
                        <option value="Next.js Web Design & Development">Next.js Web Design & Dev</option>
                        <option value="Corporate Business Website">Corporate Business Website</option>
                        <option value="Headless E-commerce Store">Headless E-commerce</option>
                        <option value="Landing Page & Lead Funnel">Landing Page & Funnel</option>
                        <option value="Custom React Web Application">Custom Web App</option>
                        <option value="Maintenance / Custom Web Support">Support & Maintenance</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1">
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-full text-[11px] px-3 py-2.5 border border-slate-200 bg-slate-50 text-slate-700 outline-none rounded-xl focus:border-[#2563EB] focus:bg-white focus:ring-4 focus:ring-[#2563EB]/5 transition-all duration-150 font-semibold h-[38px] cursor-pointer"
                      >
                        <option value="all">All Statuses</option>
                        <option value="New">New</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Closed">Closed</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1">
                      <select
                        value={regionFilter}
                        onChange={(e) => setRegionFilter(e.target.value)}
                        className="w-full text-[11px] px-3 py-2.5 border border-slate-200 bg-slate-50 text-slate-700 outline-none rounded-xl focus:border-[#2563EB] focus:bg-white focus:ring-4 focus:ring-[#2563EB]/5 transition-all duration-150 font-semibold h-[38px] cursor-pointer"
                      >
                        <option value="all">All Regions</option>
                        <option value="US">US</option>
                        <option value="UK">UK</option>
                        <option value="AE">UAE</option>
                        <option value="IN">India</option>
                        <option value="GLOBAL">Global</option>
                      </select>
                    </div>
                  </div>

                  {/* Reset Filters action */}
                  <button
                    onClick={resetFilters}
                    className="w-full md:w-auto h-[38px] bg-slate-100 hover:bg-slate-200 text-slate-600 font-extrabold text-[11px] px-5 rounded-xl transition-all duration-150 cursor-pointer flex items-center justify-center gap-1.5 border border-transparent shadow-sm shrink-0"
                  >
                    <i className="fa-solid fa-arrow-rotate-left" /> Reset Filters
                  </button>
                </div>
              </div>

              {/* TABLE VIEW (Hidden on Mobile screens, visible on Tablet/Desktop) */}
              <div className="hidden md:block bg-white rounded-2xl border border-slate-200/80 shadow-[0_4px_20px_rgba(15,23,42,0.04)] overflow-hidden mb-12 animate-fade-in relative">
                {filteredEnquiries.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse border-spacing-0">
                      <thead>
                        <tr className="bg-slate-50/70 border-b border-slate-200 text-[10px] font-black uppercase tracking-wider text-slate-400 select-none sticky top-0 z-10 backdrop-blur-sm">
                          <th className="px-6 py-4.5">Lead Name</th>
                          <th className="px-6 py-4.5">Contact Detail</th>
                          <th className="px-6 py-4.5">Region</th>
                          <th className="px-6 py-4.5">Acquisition Channel</th>
                          <th className="px-6 py-4.5">Target Service</th>
                          <th className="px-6 py-4.5">Status</th>
                          <th className="px-6 py-4.5 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-150 text-xs">
                        {filteredEnquiries.map((enq) => {
                          const isExpanded = expandedId === enq.id;
                          const dateStr = new Date(enq.createdAt).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false
                          });
                          const noteStatus = savedNotesStatus[enq.id] || "idle";
                          const displayStatus = enq.status === "Rejeoted" ? "Rejected" : enq.status;

                          return (
                            <React.Fragment key={enq.id}>
                              {/* Row height 72px */}
                              <tr className={`h-[72px] hover:bg-slate-50/40 transition-all duration-150 ${isExpanded ? "bg-slate-50/50" : ""}`}>
                                <td className="px-6 py-3 whitespace-nowrap">
                                  <div className="flex items-center gap-3">
                                    {/* Initials Avatar */}
                                    <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 select-none ${getAvatarBg(enq.name)}`}>
                                      {getAvatarInitials(enq.name)}
                                    </div>
                                    <div>
                                      <div className="font-bold text-slate-900 text-[13px]">{enq.name}</div>
                                      {enq.companyName !== "N/A" ? (
                                        <div className="text-[10px] text-blue-600 font-semibold mt-0.5">{enq.companyName}</div>
                                      ) : (
                                        <div className="text-[10px] text-slate-400 italic mt-0.5">Individual Lead</div>
                                      )}
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-3">
                                  <div className="flex flex-col gap-1 justify-center">
                                    <a href={`tel:${enq.mobile}`} className="font-semibold text-slate-700 hover:text-[#2563EB] hover:underline transition-colors flex items-center gap-1.5">
                                      <i className="fa-solid fa-phone text-slate-400 text-[10px]" /> {enq.mobile}
                                    </a>
                                    <a href={`mailto:${enq.email}`} className="text-[11px] text-slate-400 hover:text-[#2563EB] hover:underline transition-colors flex items-center gap-1.5">
                                      <i className="fa-regular fa-envelope text-slate-450 text-[11px]" /> {enq.email}
                                    </a>
                                  </div>
                                </td>
                                <td className="px-6 py-3 whitespace-nowrap">
                                  <span className="bg-slate-100 border border-slate-200 font-bold uppercase text-[9px] px-2.5 py-1 rounded-lg text-slate-600 inline-block shadow-sm">
                                    {enq.region}
                                  </span>
                                </td>
                                <td className="px-6 py-3 text-slate-450 font-medium whitespace-nowrap">
                                  {enq.source.split(" - ")[0]}
                                </td>
                                <td className="px-6 py-3 font-semibold text-slate-800 max-w-[200px] truncate">
                                  {enq.service}
                                </td>
                                <td className="px-6 py-3">
                                  <select
                                    value={displayStatus}
                                    onChange={(e) => handleStatusChange(enq.id, e.target.value)}
                                    className={`text-[10px] font-black px-2.5 py-1 rounded-full border outline-none cursor-pointer shadow-sm transition-all focus:ring-4 focus:ring-blue-150 ${
                                      displayStatus === "New"
                                        ? "bg-blue-50 border-blue-200 text-blue-700"
                                        : displayStatus === "In Progress"
                                        ? "bg-amber-50 border-amber-200 text-amber-700"
                                        : displayStatus === "Contacted"
                                        ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                                        : displayStatus === "Closed"
                                        ? "bg-green-50 border-green-200 text-green-700"
                                        : "bg-rose-600 border-transparent text-white font-extrabold"
                                    }`}
                                  >
                                    <option value="New">New</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Contacted">Contacted</option>
                                    <option value="Closed">Closed</option>
                                    <option value="Rejected">Rejected</option>
                                  </select>
                                </td>
                                <td className="px-6 py-3 text-right">
                                  <div className="flex items-center justify-end gap-2 relative">
                                    <button
                                      onClick={() => setExpandedId(isExpanded ? null : enq.id)}
                                      className={`w-8 h-8 rounded-lg text-xs flex items-center justify-center transition-all cursor-pointer ${
                                        isExpanded 
                                          ? "bg-slate-900 text-white" 
                                          : "bg-slate-50 border border-slate-200 text-slate-500 hover:text-slate-800"
                                      }`}
                                      title="View Details"
                                    >
                                      <i className={`fa-regular ${isExpanded ? "fa-folder-open" : "fa-eye"}`} />
                                    </button>

                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveEllipsisMenu(activeEllipsisMenu === enq.id ? null : enq.id);
                                      }}
                                      className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-all cursor-pointer"
                                      title="Actions"
                                    >
                                      <i className="fa-solid fa-ellipsis-vertical" />
                                    </button>

                                    {/* Action Dropdown Menu */}
                                    {activeEllipsisMenu === enq.id && (
                                      <div 
                                        className="absolute right-0 top-10 w-44 bg-white border border-slate-200 rounded-xl shadow-lg z-20 py-1.5 animate-fade-in text-left"
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        <button
                                          onClick={() => {
                                            setExpandedId(isExpanded ? null : enq.id);
                                            setActiveEllipsisMenu(null);
                                          }}
                                          className="w-full px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 font-bold cursor-pointer"
                                        >
                                          <i className="fa-regular fa-comment-dots text-slate-400 w-4" /> Edit Notes
                                        </button>
                                        
                                        <button
                                          onClick={() => {
                                            handleDelete(enq.id);
                                            setActiveEllipsisMenu(null);
                                          }}
                                          className="w-full px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-bold cursor-pointer"
                                        >
                                          <i className="fa-regular fa-trash-can text-rose-455 w-4" /> Delete Lead
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                </td>
                              </tr>
                              
                              {/* Expanded followup note card details */}
                              {isExpanded && (
                                <tr className="bg-slate-50/25 border-b border-slate-150 animate-fade-in">
                                  <td colSpan={7} className="px-8 py-6">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                      <div className="flex flex-col gap-2.5">
                                        <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-450 flex items-center gap-1.5">
                                          <i className="fa-regular fa-comment text-[#2563EB]" /> Client Query Message
                                        </h4>
                                        <div className="bg-white border border-slate-200 rounded-xl p-5 text-[12px] leading-relaxed text-slate-650 shadow-sm whitespace-pre-wrap min-h-[140px]">
                                          {enq.message}
                                        </div>
                                        <div className="flex flex-wrap gap-4 text-[9px] text-slate-400 font-bold px-1 mt-1">
                                          <span>Record ID: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-[8.5px] font-mono text-blue-600">{enq.id}</code></span>
                                          <span>•</span>
                                          <span>Timestamp: <span className="text-slate-600 font-extrabold">{dateStr}</span></span>
                                        </div>
                                      </div>

                                      <div className="flex flex-col gap-2.5">
                                        <div className="flex justify-between items-center">
                                          <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-450 flex items-center gap-1.5">
                                            <i className="fa-regular fa-pen-to-square text-[#2563EB]" /> Internal Follow-up Notes
                                          </h4>
                                          {noteStatus === "saved" && (
                                            <span className="text-[9px] text-emerald-600 font-black bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200 flex items-center gap-1">
                                              <i className="fa-solid fa-circle-check" /> Updated!
                                            </span>
                                          )}
                                        </div>
                                        
                                        <textarea
                                          value={notesState[enq.id] || ""}
                                          onChange={(e) => setNotesState({ ...notesState, [enq.id]: e.target.value })}
                                          placeholder="Enter follow-up details, client communications, or call history logs here..."
                                          className="bg-white border border-slate-200 rounded-xl p-4 text-[12px] text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/5 shadow-sm resize-none min-h-[140px] font-medium leading-relaxed"
                                        />
                                        
                                        <button
                                          onClick={() => handleSaveNotes(enq.id)}
                                          disabled={noteStatus === "saving"}
                                          className={`w-full lg:w-auto self-end px-5 py-3 rounded-xl font-extrabold text-xs shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                                            noteStatus === "saving"
                                              ? "bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed"
                                              : "bg-[#2563EB] hover:bg-[#1d4ed8] text-white"
                                          }`}
                                        >
                                          <i className={`fa-solid ${noteStatus === "saving" ? "fa-circle-notch animate-spin" : "fa-floppy-disk"}`} />
                                          {noteStatus === "saving" ? "Saving logs..." : "Save Follow-up Logs"}
                                        </button>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </React.Fragment>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="p-16 text-center flex flex-col items-center">
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 mb-4">
                      <i className="fa-regular fa-folder-open text-lg" />
                    </div>
                    <h3 className="font-extrabold text-sm text-slate-800 mb-1">No enquiries found</h3>
                    <p className="text-xs text-slate-500 max-w-[280px]">Your current database or active filter constraints returned zero records.</p>
                  </div>
                )}
              </div>

              {/* MOBILE LEAD LIST VIEW (Transforms table into responsive cards on mobile screens) */}
              <div className="block md:hidden space-y-4 mb-12">
                {filteredEnquiries.length > 0 ? (
                  filteredEnquiries.map((enq) => {
                    const displayStatus = enq.status === "Rejeoted" ? "Rejected" : enq.status;
                    const isExpanded = expandedId === enq.id;
                    return (
                      <div key={enq.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-[0_4px_20px_rgba(15,23,42,0.03)] space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs select-none shrink-0 ${getAvatarBg(enq.name)}`}>
                              {getAvatarInitials(enq.name)}
                            </div>
                            <div>
                              <h4 className="font-extrabold text-slate-900 text-[13px]">{enq.name}</h4>
                              <p className="text-[10px] text-slate-500 mt-0.5">{enq.companyName !== "N/A" ? enq.companyName : "Individual Lead"}</p>
                            </div>
                          </div>
                          <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.75 rounded-full ${
                            displayStatus === "New"
                              ? "bg-blue-50 text-blue-700 border border-blue-200"
                              : displayStatus === "In Progress"
                              ? "bg-amber-50 text-amber-700 border border-amber-200"
                              : displayStatus === "Contacted"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-250"
                              : displayStatus === "Closed"
                              ? "bg-green-50 text-green-700 border-green-250"
                              : "bg-rose-650 text-white border-transparent"
                          }`}>
                            {displayStatus}
                          </span>
                        </div>

                        <div className="text-xs space-y-2 border-t border-slate-100 pt-3 text-slate-600">
                          <div className="flex items-center gap-2">
                            <i className="fa-solid fa-phone text-slate-400 text-[10px] w-4 text-center" />
                            <a href={`tel:${enq.mobile}`} className="hover:text-[#2563EB] hover:underline font-medium">{enq.mobile}</a>
                          </div>
                          <div className="flex items-center gap-2">
                            <i className="fa-regular fa-envelope text-slate-400 text-[11px] w-4 text-center" />
                            <a href={`mailto:${enq.email}`} className="hover:text-[#2563EB] hover:underline font-medium">{enq.email}</a>
                          </div>
                          <div className="flex items-center gap-2">
                            <i className="fa-regular fa-folder text-slate-400 text-xs w-4 text-center" />
                            <span className="font-semibold text-slate-700">{enq.service}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between gap-4 border-t border-slate-100 pt-3">
                          <button
                            onClick={() => setExpandedId(isExpanded ? null : enq.id)}
                            className="flex-1 bg-slate-50 border border-slate-200 hover:bg-slate-100 py-2 rounded-xl text-xs font-bold text-slate-600 cursor-pointer flex items-center justify-center gap-1.5 transition-all duration-150"
                          >
                            <i className={`fa-regular ${isExpanded ? "fa-folder-open" : "fa-eye"}`} />
                            {isExpanded ? "Hide Details" : "View Message"}
                          </button>
                          
                          <button
                            onClick={() => handleDelete(enq.id)}
                            className="bg-rose-50 hover:bg-rose-100 border border-rose-250 py-2 px-3.5 rounded-xl text-xs text-rose-600 cursor-pointer transition-all duration-150"
                            title="Delete Lead"
                          >
                            <i className="fa-regular fa-trash-can" />
                          </button>
                        </div>

                        {isExpanded && (
                          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4.5 space-y-4 animate-fade-in text-left">
                            <div className="space-y-1.5">
                              <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Client Query Detail</span>
                              <p className="text-xs text-slate-700 whitespace-pre-wrap leading-relaxed bg-white border border-slate-150 rounded-lg p-3 shadow-inner">{enq.message}</p>
                            </div>
                            <div className="space-y-2">
                              <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Internal Follow-up Notes</span>
                              <textarea
                                value={notesState[enq.id] || ""}
                                onChange={(e) => setNotesState({ ...notesState, [enq.id]: e.target.value })}
                                placeholder="Write follow-up notes here..."
                                className="w-full bg-white border border-slate-200 rounded-lg p-3 text-xs text-slate-800 placeholder:text-slate-350 shadow-inner resize-none min-h-[100px] outline-none focus:border-[#2563EB]"
                              />
                              <button
                                onClick={() => handleSaveNotes(enq.id)}
                                className="w-full bg-[#2563EB] text-white py-2.5 rounded-xl font-bold text-xs cursor-pointer shadow-sm hover:bg-[#1d4ed8]"
                              >
                                Save Follow-up Notes
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="p-16 text-center bg-white border border-slate-200 rounded-2xl flex flex-col items-center">
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 mb-4">
                      <i className="fa-regular fa-folder-open text-lg" />
                    </div>
                    <h3 className="font-extrabold text-sm text-slate-800 mb-1">No enquiries found</h3>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB CONTENT: Geolocation Visitor Map */}
          {activeTab === "map" && (
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 animate-fade-in">
              {/* Visual Leaflet Map */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm lg:col-span-2">
                <h3 className="text-xs font-black uppercase tracking-[0.1em] text-slate-450 mb-4 flex items-center gap-2">
                  <i className="fa-regular fa-map text-emerald-600" /> Interactive Traffic Heatmap
                </h3>
                <VisitorMap markers={analytics.mapMarkers} />
              </div>

              {/* City Listings Panel */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-[0.1em] text-slate-450 mb-5 flex items-center gap-2">
                    <i className="fa-solid fa-city text-emerald-600" /> Top Visitor Geographics
                  </h3>
                  
                  {analytics.topCities.length > 0 ? (
                    <div className="flex flex-col gap-4 mt-2">
                      {analytics.topCities.map((item, index) => {
                        const percent = analytics.totalPageviews > 0 ? (item.count / analytics.totalPageviews) * 100 : 0;
                        return (
                          <div key={`${item.city}-${index}`} className="flex flex-col gap-1">
                            <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                              <span>{item.city} <span className="text-slate-400 font-medium">({item.country})</span></span>
                              <span className="text-emerald-700 font-extrabold">{item.count} hits</span>
                            </div>
                            <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                              <div 
                                className="h-full bg-emerald-500 rounded-full" 
                                style={{ width: `${percent}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="py-16 text-center flex flex-col items-center">
                      <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 mb-3">
                        <i className="fa-solid fa-earth-asia" />
                      </div>
                      <span className="text-slate-500 text-xs font-bold">No geography logs yet</span>
                      <span className="text-[10px] text-slate-400 mt-1 max-w-[200px]">Geotarget logs will record automatically on user page entry.</span>
                    </div>
                  )}
                </div>

                <div className="border-t border-slate-100 pt-4 mt-6 text-center">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <span className="text-2xl font-black text-emerald-600">{analytics.totalPageviews}</span>
                      <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1">Total Hits</span>
                    </div>
                    <div className="flex flex-col border-l border-slate-100">
                      <span className="text-2xl font-black text-emerald-600">{analytics.uniqueVisitors}</span>
                      <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1">Unique Approx</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT: User Session Heatmaps */}
          {activeTab === "heatmaps" && (
            <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-3xl p-8 shadow-sm mb-12 animate-fade-in">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-orange-50 border border-orange-100 rounded-2xl flex items-center justify-center text-orange-500 shadow-sm shrink-0">
                  <i className="fa-regular fa-eye text-2xl animate-pulse text-[#2563EB]" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 leading-tight">Cursor Heatmaps & Session Recordings</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Understand user behavior, click actions, and scrolling scrolls using Microsoft Clarity.</p>
                </div>
              </div>

              <div className="text-xs text-slate-600 space-y-4 mb-8 leading-relaxed">
                <p>
                  To provide smooth mouse tracking and click heatmaps without slowing down your Next.js application, we have integrated support for **Microsoft Clarity**—an industry-standard, 100% free behavior analytics platform.
                </p>
                
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-700">
                  <div className="flex gap-3">
                    <span className="text-lg text-emerald-600"><i className="fa-solid fa-circle-check" /></span>
                    <div>
                      <strong className="block text-slate-900 mb-0.5">Click Heatmaps</strong>
                      Identify where users click on your pages, which CTA buttons are most active, and which links get missed.
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-lg text-emerald-600"><i className="fa-solid fa-circle-check" /></span>
                    <div>
                      <strong className="block text-slate-900 mb-0.5">Session Recordings</strong>
                      Watch anonymous recordings of individual users as they navigate, scroll, and type to locate design friction.
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-lg text-emerald-600"><i className="fa-solid fa-circle-check" /></span>
                    <div>
                      <strong className="block text-slate-900 mb-0.5">Scroll Depth</strong>
                      See how far down users read your pages to optimize placement of key elements.
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-lg text-emerald-600"><i className="fa-solid fa-circle-check" /></span>
                    <div>
                      <strong className="block text-slate-900 mb-0.5">Rage Clicks Detection</strong>
                      Automatically detect frustrated clicks on broken layouts or non-interactive page objects.
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-50 border border-emerald-250 rounded-2xl p-4.5 text-[11px] text-emerald-800">
                  <p className="font-bold flex items-center gap-1.5 mb-1">
                    <i className="fa-solid fa-circle-check" /> Clarity Integration status: ACTIVE & LIVE
                  </p>
                  <p className="font-semibold text-emerald-950">
                    Your Microsoft Clarity project ID (`y1a7vgc8a7`) is successfully integrated into the website template layout. User cursor coordinates, scrolls, clicks, and page records are being captured automatically in the background.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 border-t border-slate-100 pt-6">
                <a
                  href="https://clarity.microsoft.com/projects/view/y1a7vgc8a7/dashboard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-extrabold text-xs px-8 py-4.5 rounded-xl shadow-md transition-all text-center flex items-center justify-center gap-2 cursor-pointer flex-1"
                >
                  Open Clarity Heatmaps Console <i className="fa-solid fa-arrow-up-right-from-square" />
                </a>
                <a
                  href="https://clarity.microsoft.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-extrabold text-xs px-6 py-4.5 rounded-xl transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  Clarity Portal
                </a>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* QUICK ADD LEAD MODAL DIALOG */}
      {isQuickAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* backdrop */}
          <div className="absolute inset-0 bg-[#0F172A]/50 backdrop-blur-sm" onClick={() => setIsQuickAddOpen(false)} />
          
          <div className="bg-white border border-slate-200 rounded-[24px] shadow-2xl relative z-10 w-full max-w-xl p-6 md:p-8 animate-fade-in text-left">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 leading-none">Add Customer Lead</h3>
                <p className="text-[10px] text-slate-550 mt-1.5 font-medium">Record a custom inquiry manually into the sales dashboard pipeline.</p>
              </div>
              <button onClick={() => setIsQuickAddOpen(false)} className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer flex items-center justify-center transition-colors">
                <i className="fa-solid fa-xmark text-sm" />
              </button>
            </div>

            <form onSubmit={handleQuickAddSubmit} className="space-y-4.5 text-xs text-slate-700">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4.5">
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-slate-600">Lead Name *</label>
                  <input
                    type="text"
                    required
                    value={quickAddForm.name}
                    onChange={(e) => setQuickAddForm({ ...quickAddForm, name: e.target.value })}
                    className="border border-slate-200 bg-slate-50 px-3 py-2.5 rounded-xl outline-none focus:bg-white focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/5 font-medium"
                    placeholder="E.g. John Doe"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-slate-600">Company Name</label>
                  <input
                    type="text"
                    value={quickAddForm.companyName}
                    onChange={(e) => setQuickAddForm({ ...quickAddForm, companyName: e.target.value })}
                    className="border border-slate-200 bg-slate-50 px-3 py-2.5 rounded-xl outline-none focus:bg-white focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/5 font-medium"
                    placeholder="E.g. Acme Corp"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4.5">
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-slate-600">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={quickAddForm.email}
                    onChange={(e) => setQuickAddForm({ ...quickAddForm, email: e.target.value })}
                    className="border border-slate-200 bg-slate-50 px-3 py-2.5 rounded-xl outline-none focus:bg-white focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/5 font-medium"
                    placeholder="E.g. john@doe.com"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-slate-600">Mobile Phone *</label>
                  <input
                    type="text"
                    required
                    value={quickAddForm.mobile}
                    onChange={(e) => setQuickAddForm({ ...quickAddForm, mobile: e.target.value })}
                    className="border border-slate-200 bg-slate-50 px-3 py-2.5 rounded-xl outline-none focus:bg-white focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/5 font-medium"
                    placeholder="E.g. +91 9876543210"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4.5">
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-slate-600">Target Region</label>
                  <select
                    value={quickAddForm.region}
                    onChange={(e) => setQuickAddForm({ ...quickAddForm, region: e.target.value })}
                    className="border border-slate-200 bg-slate-50 px-3 py-2.5 rounded-xl outline-none focus:bg-white focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/5 font-semibold cursor-pointer"
                  >
                    <option value="US">United States (US)</option>
                    <option value="UK">United Kingdom (UK)</option>
                    <option value="AE">United Arab Emirates (UAE)</option>
                    <option value="IN">India (IN)</option>
                    <option value="GLOBAL">Global</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-slate-600">Website Url</label>
                  <input
                    type="text"
                    value={quickAddForm.website}
                    onChange={(e) => setQuickAddForm({ ...quickAddForm, website: e.target.value })}
                    className="border border-slate-200 bg-slate-50 px-3 py-2.5 rounded-xl outline-none focus:bg-white focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/5 font-medium"
                    placeholder="E.g. www.doe.com"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-slate-600">Requested Service Type</label>
                <select
                  value={quickAddForm.service}
                  onChange={(e) => setQuickAddForm({ ...quickAddForm, service: e.target.value })}
                  className="border border-slate-200 bg-slate-50 px-3 py-2.5 rounded-xl outline-none focus:bg-white focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/5 font-semibold cursor-pointer"
                >
                  <option value="Next.js Web Design & Development">Next.js Web Design & Dev</option>
                  <option value="Corporate Business Website">Corporate Business Website</option>
                  <option value="Headless E-commerce Store">Headless E-commerce</option>
                  <option value="Landing Page & Lead Funnel">Landing Page & Funnel</option>
                  <option value="Custom React Web Application">Custom Web App</option>
                  <option value="Maintenance / Custom Web Support">Support & Maintenance</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-slate-600">Client Description Query</label>
                <textarea
                  value={quickAddForm.message}
                  onChange={(e) => setQuickAddForm({ ...quickAddForm, message: e.target.value })}
                  className="border border-slate-200 bg-slate-50 p-3 rounded-xl outline-none focus:bg-white focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/5 font-medium min-h-[80px] resize-none"
                  placeholder="Type descriptive details here..."
                />
              </div>

              <div className="flex items-center justify-end gap-3.5 border-t border-slate-100 pt-5">
                <button
                  type="button"
                  onClick={() => setIsQuickAddOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-extrabold cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={quickAddSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-extrabold cursor-pointer transition-all shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {quickAddSubmitting ? "Saving Lead..." : "Save Record"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
