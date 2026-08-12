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

  // Tab State: "leads" | "map" | "heatmaps"
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
  const contactedCount = enquiries.filter((e) => e.status === "Contacted").length;
  const rejectedCount = enquiries.filter((e) => e.status === "Rejected").length;

  // Calculate service analytics
  const serviceStats: Record<string, number> = {};
  enquiries.forEach((e) => {
    serviceStats[e.service] = (serviceStats[e.service] || 0) + 1;
  });

  // Calculate region analytics
  const regionStats: Record<string, number> = {};
  enquiries.forEach((e) => {
    const reg = e.region.toUpperCase();
    regionStats[reg] = (regionStats[reg] || 0) + 1;
  });

  // SVG Circular progress radius helper
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const calculateStrokeOffset = (count: number) => {
    if (totalCount === 0) return circumference;
    const ratio = count / totalCount;
    return circumference - ratio * circumference;
  };

  if (loading && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 font-sans">
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
      <div className="min-h-screen bg-[#F1F5F9] flex items-center justify-center p-4 sm:p-6 font-sans relative overflow-hidden">
        {/* Soft background light blobs */}
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
              <span className="bg-blue-50 text-blue-600 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded border border-blue-150 select-none align-middle">
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
                className="w-full text-center tracking-[0.75em] text-2xl font-bold bg-slate-50 border border-slate-200 text-slate-950 rounded-2xl px-4 py-4 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 placeholder:text-slate-300"
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
              className="bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs py-4 rounded-2xl shadow-md transition-all duration-300 cursor-pointer mt-1 w-full hover:-translate-y-0.5"
            >
              Unlock Terminal <i className="fa-solid fa-lock-open ml-1.5" />
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 sm:px-6 lg:px-8 font-sans text-slate-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />

      {/* Scope Style Overrides */}
      <style dangerouslySetInnerHTML={{ __html: `
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
      ` }} />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Header Panel (Modern White Glassmorphic Console) */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-[0_5px_20px_rgba(0,0,0,0.02)]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm shrink-0">
              <i className="fa-solid fa-chart-line text-lg" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xl tracking-tight text-slate-900">
                  Joy<span className="text-[#EA580C]">Digital</span>
                </span>
                <span className="bg-gradient-to-r from-blue-50 to-orange-50 text-blue-600 text-[8px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded border border-blue-100 select-none">
                  Analytics CRM
                </span>
              </div>
              <p className="text-[10px] text-slate-500 mt-0.5 font-medium tracking-wide">
                Active Database: <span className="text-emerald-600 font-bold"><i className="fa-solid fa-circle text-[8px] mr-1.5 animate-pulse text-emerald-500" />MongoDB Atlas</span>
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
            <div className="hidden sm:flex items-center gap-2.5 bg-slate-50 border border-slate-200/80 px-4 py-2.5 rounded-xl text-slate-500 text-xs font-mono select-none">
              <span className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-ping" />
              <span>LIVE: {liveTime || "00:00:00"}</span>
            </div>

            <button
              onClick={exportToCSV}
              disabled={enquiries.length === 0}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-50 to-emerald-100/50 hover:from-emerald-100 hover:to-emerald-200/50 border border-emerald-200 text-emerald-700 font-extrabold text-xs px-5 py-3 rounded-xl transition-all shadow-sm cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <i className="fa-solid fa-file-csv text-sm" /> Export Database
            </button>
            
            <button
              onClick={handleLogout}
              className="flex-1 sm:flex-none bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs px-5 py-3 rounded-xl transition-all shadow-sm cursor-pointer flex items-center justify-center gap-1.5 border border-transparent"
            >
              Logout <i className="fa-solid fa-arrow-right-from-bracket text-[10px] text-white/80" />
            </button>
          </div>
        </div>

        {/* Feature Tab Selector Switcher (Vibrant Capsule Bar) */}
        <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-[0_4px_25px_rgba(0,0,0,0.01)] mb-8 max-w-xl">
          {[
            { id: "leads", label: "CRM Leads", icon: "fa-solid fa-address-book text-blue-600" },
            { id: "map", label: "Visitor Geolocation Map", icon: "fa-solid fa-map-location-dot text-emerald-600" },
            { id: "heatmaps", label: "User Session Heatmaps (Clarity)", icon: "fa-solid fa-eye text-orange-500" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                if (tab.id === "map") fetchAnalytics();
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-4.5 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                activeTab === tab.id
                  ? "bg-slate-900 text-white shadow-md"
                  : "text-slate-500 hover:text-slate-850 hover:bg-slate-50"
              }`}
            >
              <i className={tab.icon} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* TAB CONTENT: Leads CRM Manager */}
        {activeTab === "leads" && (
          <>
            {/* Analytics Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-fade-in">
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.02)] flex items-center justify-between hover:border-slate-350 transition-all duration-300 group">
                <div className="flex flex-col">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Total Enquiries</span>
                  <span className="text-3xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">{totalCount}</span>
                  <span className="text-[10px] text-slate-500 mt-2 font-medium">All channels combined</span>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 text-xl shadow-sm transition-transform duration-300 group-hover:scale-105 shrink-0">
                  <i className="fa-solid fa-database" />
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.02)] flex items-center justify-between hover:border-slate-350 transition-all duration-300 group">
                <div className="flex flex-col">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">New Leads</span>
                  <span className="text-3xl font-black text-orange-600">{newCount}</span>
                  <span className="text-[10px] text-orange-600 mt-2 font-semibold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" /> Requires attention
                  </span>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600 text-xl shadow-sm transition-transform duration-300 group-hover:scale-105 shrink-0">
                  <i className="fa-solid fa-fire animate-pulse" />
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.02)] flex items-center justify-between hover:border-slate-350 transition-all duration-300 group">
                <div className="flex flex-col">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">In Progress</span>
                  <span className="text-3xl font-black text-amber-600">{inProgressCount}</span>
                  <span className="text-[10px] text-slate-500 mt-2 font-medium">Currently consulting</span>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 text-xl shadow-sm transition-transform duration-300 group-hover:scale-105 shrink-0">
                  <i className="fa-solid fa-spinner animate-spin" style={{ animationDuration: "5s" }} />
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.02)] flex items-center justify-between hover:border-slate-350 transition-all duration-300 group">
                <div className="flex flex-col">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Completed & Contacted</span>
                  <span className="text-3xl font-black text-emerald-600">{contactedCount}</span>
                  <span className="text-[10px] text-slate-500 mt-2 font-medium">Proposal / Deal closed</span>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 text-xl shadow-sm transition-transform duration-300 group-hover:scale-105 shrink-0">
                  <i className="fa-solid fa-circle-check" />
                </div>
              </div>
            </div>

            {/* Filters Toolbar */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 mb-8 shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex flex-col lg:flex-row gap-4 items-center justify-between animate-fade-in">
              <div className="relative w-full lg:w-96">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                  <i className="fa-solid fa-magnifying-glass text-[11px]" />
                </span>
                <input
                  type="text"
                  placeholder="Search by name, email, mobile, notes..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full text-xs pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 text-slate-800 rounded-xl outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all duration-200 font-medium"
                />
              </div>

              <div className="flex flex-wrap gap-4 w-full lg:w-auto items-center justify-end">
                <div className="flex flex-col gap-1.5 w-full sm:w-44">
                  <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest pl-1">Service Type</span>
                  <select
                    value={serviceFilter}
                    onChange={(e) => setServiceFilter(e.target.value)}
                    className="w-full text-[11px] px-3.5 py-2.5 border border-slate-200 bg-slate-50 text-slate-700 outline-none rounded-xl focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/5 transition-all font-semibold"
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

                <div className="flex flex-col gap-1.5 w-full sm:w-36">
                  <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest pl-1">Status</span>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full text-[11px] px-3.5 py-2.5 border border-slate-200 bg-slate-50 text-slate-700 outline-none rounded-xl focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/5 transition-all font-semibold"
                  >
                    <option value="all">All Statuses</option>
                    <option value="New">New</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5 w-full sm:w-32">
                  <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest pl-1">Region</span>
                  <select
                    value={regionFilter}
                    onChange={(e) => setRegionFilter(e.target.value)}
                    className="w-full text-[11px] px-3.5 py-2.5 border border-slate-200 bg-slate-50 text-slate-700 outline-none rounded-xl focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/5 transition-all font-semibold"
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
            </div>

            {/* CRM Lead Table */}
            <div className="bg-white rounded-[32px] border border-slate-250 shadow-[0_15px_50px_rgba(0,0,0,0.02)] overflow-hidden mb-12 animate-fade-in">
              {filteredEnquiries.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-[9px] font-black uppercase tracking-wider text-slate-500">
                        <th className="px-6 py-5">Date</th>
                        <th className="px-6 py-5">Contact Details</th>
                        <th className="px-6 py-5">Target Channels</th>
                        <th className="px-6 py-5">Target Service</th>
                        <th className="px-6 py-5">Region</th>
                        <th className="px-6 py-5">Lead Status</th>
                        <th className="px-6 py-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
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

                        return (
                          <React.Fragment key={enq.id}>
                            <tr className={`hover:bg-slate-50/70 transition-all duration-200 ${isExpanded ? "bg-slate-50/55" : ""}`}>
                              <td className="px-6 py-5.5 font-bold text-slate-450 whitespace-nowrap">
                                {dateStr}
                              </td>
                              <td className="px-6 py-5.5">
                                <div className="font-black text-slate-900 text-sm">{enq.name}</div>
                                {enq.companyName !== "N/A" ? (
                                  <div className="text-[10px] text-blue-600 font-bold mt-0.5">{enq.companyName}</div>
                                ) : (
                                  <div className="text-[10px] text-slate-400 italic mt-0.5">No company listed</div>
                                )}
                              </td>
                              <td className="px-6 py-5.5">
                                <div className="flex flex-col gap-1">
                                  <a href={`tel:${enq.mobile}`} className="font-extrabold text-blue-600 hover:underline transition-colors flex items-center gap-1.5">
                                    <i className="fa-solid fa-square-phone text-blue-500/80 text-sm" /> {enq.mobile}
                                  </a>
                                  <a href={`mailto:${enq.email}`} className="text-[11px] text-slate-500 hover:underline transition-colors flex items-center gap-1.5">
                                    <i className="fa-solid fa-square-envelope text-slate-400 text-sm" /> {enq.email}
                                  </a>
                                  {enq.website !== "N/A" && (
                                    <a
                                      href={enq.website.startsWith("http") ? enq.website : `https://${enq.website}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-[10px] text-emerald-600 font-bold hover:text-emerald-700 flex items-center gap-1.5 mt-0.5"
                                    >
                                      <i className="fa-solid fa-globe text-emerald-500/70" /> Web Link
                                    </a>
                                  )}
                                </div>
                              </td>
                              <td className="px-6 py-5.5 font-bold text-slate-800 max-w-[200px] truncate">
                                {enq.service}
                              </td>
                              <td className="px-6 py-5.5">
                                <span className="bg-slate-100 border border-slate-200 font-bold uppercase text-[9px] px-2.5 py-1 rounded-lg text-slate-650 inline-block shadow-sm">
                                  {enq.region}
                                </span>
                              </td>
                              <td className="px-6 py-5.5">
                                <select
                                  value={enq.status}
                                  onChange={(e) => handleStatusChange(enq.id, e.target.value)}
                                  className={`text-[10px] font-black px-2.5 py-1.5 rounded-xl border outline-none cursor-pointer shadow-sm transition-all focus:ring-4 ${
                                    enq.status === "New"
                                      ? "bg-blue-50 border-blue-200 text-blue-600 focus:ring-blue-100"
                                      : enq.status === "In Progress"
                                      ? "bg-amber-50 border-amber-200 text-amber-700 focus:ring-amber-100"
                                      : enq.status === "Contacted"
                                      ? "bg-emerald-50 border-emerald-200 text-emerald-700 focus:ring-emerald-100"
                                      : "bg-rose-50 border-rose-200 text-rose-700 focus:ring-rose-100"
                                  }`}
                                >
                                  <option value="New">New</option>
                                  <option value="In Progress">In Progress</option>
                                  <option value="Contacted">Contacted</option>
                                  <option value="Rejected">Rejected</option>
                                </select>
                              </td>
                              <td className="px-6 py-5.5 text-right">
                                <div className="flex items-center justify-end gap-2.5">
                                  <button
                                    onClick={() => setExpandedId(isExpanded ? null : enq.id)}
                                    className={`w-8.5 h-8.5 rounded-xl text-xs flex items-center justify-center transition-all cursor-pointer ${
                                      isExpanded 
                                        ? "bg-slate-900 text-white shadow-md" 
                                        : "bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-850"
                                    }`}
                                    title="Expand Details"
                                  >
                                    <i className={`fa-solid ${isExpanded ? "fa-folder-open" : "fa-chevron-down"}`} />
                                  </button>
                                  
                                  <button
                                    onClick={() => handleDelete(enq.id)}
                                    className="w-8.5 h-8.5 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200/50 text-rose-600 flex items-center justify-center transition-all cursor-pointer"
                                    title="Delete Lead"
                                  >
                                    <i className="fa-solid fa-trash-can" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                            
                            {isExpanded && (
                              <tr className="bg-slate-50/45 border-b border-slate-150 animate-fade-in">
                                <td colSpan={7} className="px-8 py-6">
                                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    <div className="flex flex-col gap-2.5">
                                      <h4 className="text-[9px] font-black uppercase tracking-wider text-slate-455 flex items-center gap-1.5">
                                        <i className="fa-solid fa-comment-dots" /> Client Message Query
                                      </h4>
                                      <div className="bg-white border border-slate-200 rounded-2xl p-5 text-[12px] leading-relaxed text-slate-700 shadow-inner whitespace-pre-wrap min-h-[140px]">
                                        {enq.message}
                                      </div>
                                      <div className="flex flex-wrap gap-4 text-[9px] text-slate-450 font-bold px-1 mt-1">
                                        <span>Record UUID: <code className="bg-slate-100 px-1 py-0.5 rounded text-[8.5px] font-mono text-blue-600">{enq.id}</code></span>
                                        <span>•</span>
                                        <span>Acquisition Channel: <span className="text-slate-650 font-extrabold">{enq.source}</span></span>
                                      </div>
                                    </div>

                                    <div className="flex flex-col gap-2.5">
                                      <div className="flex justify-between items-center">
                                        <h4 className="text-[9px] font-black uppercase tracking-wider text-slate-450 flex items-center gap-1.5">
                                          <i className="fa-solid fa-pen-to-square text-blue-500" /> Internal Follow-up Notes
                                        </h4>
                                        {noteStatus === "saved" && (
                                          <span className="text-[9px] text-emerald-600 font-black bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                                            <i className="fa-solid fa-circle-check" /> Updated!
                                          </span>
                                        )}
                                      </div>
                                      
                                      <textarea
                                        value={notesState[enq.id] || ""}
                                        onChange={(e) => setNotesState({ ...notesState, [enq.id]: e.target.value })}
                                        placeholder="Enter status updates, follow-up history, client response, or call details here..."
                                        className="bg-white border border-slate-200 rounded-2xl p-4 text-[12px] text-slate-800 placeholder:text-slate-350 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 shadow-inner resize-none min-h-[140px] font-medium leading-relaxed"
                                      />
                                      
                                      <button
                                        onClick={() => handleSaveNotes(enq.id)}
                                        disabled={noteStatus === "saving"}
                                        className={`w-full lg:w-auto self-end px-6 py-3.5 rounded-xl font-extrabold text-xs shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                                          noteStatus === "saving"
                                            ? "bg-slate-100 border border-slate-200 text-slate-455 cursor-not-allowed"
                                            : "bg-blue-600 hover:bg-blue-500 text-white shadow-sm"
                                        }`}
                                      >
                                        <i className={`fa-solid ${noteStatus === "saving" ? "fa-circle-notch animate-spin" : "fa-floppy-disk"}`} />
                                        {noteStatus === "saving" ? "Saving updates..." : "Save Follow-up Notes"}
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
                  <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 mb-4">
                    <i className="fa-solid fa-folder-open text-xl" />
                  </div>
                  <h3 className="font-extrabold text-sm text-slate-800 mb-1">No enquiries found</h3>
                  <p className="text-xs text-slate-500 max-w-[280px]">Your current database or active search query returned 0 listing records.</p>
                </div>
              )}
            </div>
          </>
        )}

        {/* TAB CONTENT: Geolocation Visitor Map */}
        {activeTab === "map" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 animate-fade-in">
            {/* Visual Leaflet Map */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm lg:col-span-2">
              <h3 className="text-xs font-black uppercase tracking-[0.1em] text-slate-450 mb-4 flex items-center gap-2">
                <i className="fa-solid fa-map text-emerald-600" /> Interactive Traffic Heatmap
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

        {/* TAB CONTENT: User Session Heatmaps (Microsoft Clarity Details) */}
        {activeTab === "heatmaps" && (
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm max-w-3xl mx-auto mb-12 animate-fade-in">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-orange-50 border border-orange-100 rounded-2xl flex items-center justify-center text-orange-500 shadow-sm shrink-0">
                <i className="fa-solid fa-eye text-2xl animate-pulse" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900 leading-tight">Cursor Heatmaps & Session Recordings</h3>
                <p className="text-xs text-slate-500 mt-0.5">Understand user behavior, click actions, and scrolling scrolls using Microsoft Clarity.</p>
              </div>
            </div>

            <div className="text-xs text-slate-650 space-y-4 mb-8 leading-relaxed">
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

              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4.5 text-[11px] text-amber-800">
                <p className="font-bold flex items-center gap-1.5 mb-1">
                  <i className="fa-solid fa-circle-info" /> Setup Process Checklist:
                </p>
                <ol className="list-decimal pl-4 space-y-1 font-semibold text-amber-900/90">
                  <li>Sign up for a free project account at <a href="https://clarity.microsoft.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-amber-950">clarity.microsoft.com</a>.</li>
                  <li>Copy your project unique ID (e.g. `o9d6z133`).</li>
                  <li>Add the Environment Variable in Vercel: **`NEXT_PUBLIC_CLARITY_ID`** = `[your-clarity-id]`.</li>
                  <li>Redeploy your project, and click the button below to view user behavior charts!</li>
                </ol>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 border-t border-slate-100 pt-6">
              <a
                href="https://clarity.microsoft.com/projects"
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
                Create Free Account
              </a>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
