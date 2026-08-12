"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

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

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [loginError, setLoginError] = useState("");
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

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
      <div className="min-h-screen bg-[#090D16] flex items-center justify-center p-6 font-sans">
        {/* Glowing Blobs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="flex flex-col items-center gap-4 relative z-10">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-blue-500/10 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
          <div className="text-[10px] font-black text-blue-400 tracking-[0.25em] uppercase animate-pulse mt-2">
            Loading Dashboard CRM...
          </div>
        </div>
      </div>
    );
  }

  // Security Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070A13] flex items-center justify-center p-4 sm:p-6 font-sans relative overflow-hidden">
        {/* Decorative background glow circles */}
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />

        <div className="w-full max-w-md bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-[32px] p-8 sm:p-10 shadow-2xl relative z-10 transition-all hover:border-slate-700/50">
          {/* Top Logo Grid */}
          <div className="text-center mb-8 flex flex-col items-center">
            <div className="w-16 h-16 bg-gradient-to-tr from-blue-600 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/10 mb-6">
              <span className="font-black text-2xl text-white tracking-tighter">JD</span>
            </div>
            <span className="text-2xl font-black tracking-tight text-white flex items-center gap-1.5 justify-center">
              Joy<span className="text-gradient">Digital</span>
              <span className="bg-blue-500/10 text-blue-400 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded border border-blue-500/20 select-none align-middle">
                CRM
              </span>
            </span>
            <p className="text-xs text-slate-400 mt-2.5 max-w-[280px]">
              Access restricted. Input secure passkey pin to unlock customer leads console.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2.5">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest pl-1">
                Security Access PIN
              </label>
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="••••"
                required
                className="w-full text-center tracking-[0.75em] text-2xl font-bold bg-slate-950/80 border border-slate-800/80 text-white rounded-2xl px-4 py-4.5 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 placeholder:text-slate-700"
                autoFocus
              />
            </div>

            {loginError && (
              <p className="text-center text-xs font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 py-2.5 rounded-xl animate-shake">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs py-4.5 rounded-2xl shadow-lg shadow-blue-600/10 transition-all duration-300 cursor-pointer mt-1 w-full hover:-translate-y-0.5"
            >
              Unlock Terminal <i className="fa-solid fa-lock-open ml-1.5" />
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090D16] py-8 px-4 sm:px-6 lg:px-8 font-sans text-slate-100 relative overflow-hidden">
      {/* Visual background glows */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[180px] pointer-events-none" />

      {/* Scope Style Overrides */}
      <style dangerouslySetInnerHTML={{ __html: `
        .text-gradient {
          background: linear-gradient(135deg, #3B82F6 0%, #F97316 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .bg-grid-pattern {
          background-size: 30px 30px;
          background-image: 
            linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px);
        }
      ` }} />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Header Panel (Modern Glassmorphic Console) */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8 bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 shadow-xl hover:border-slate-800 transition-all">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600/10 border border-blue-500/25 rounded-2xl flex items-center justify-center text-blue-400 shadow-sm shrink-0">
              <i className="fa-solid fa-chart-line text-lg" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xl tracking-tight text-white">
                  Joy<span className="text-[#F97316]">Digital</span>
                </span>
                <span className="bg-gradient-to-r from-blue-500/10 to-orange-500/10 text-blue-400 text-[8px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded border border-blue-500/20 select-none">
                  Analytics CRM
                </span>
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5 font-medium tracking-wide">
                Active Database: <span className="text-emerald-400 font-bold"><i className="fa-solid fa-circle text-[8px] mr-1.5 animate-pulse text-emerald-400" />MongoDB Atlas</span>
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
            {/* Live Clock widget */}
            <div className="hidden sm:flex items-center gap-2.5 bg-slate-950/60 border border-slate-800/80 px-4 py-2.5 rounded-xl text-slate-400 text-xs font-mono select-none">
              <span className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-ping" />
              <span>LIVE: {liveTime || "00:00:00"}</span>
            </div>

            <button
              onClick={exportToCSV}
              disabled={enquiries.length === 0}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600/10 to-emerald-500/5 hover:from-emerald-600/20 hover:to-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-extrabold text-xs px-5 py-3 rounded-xl transition-all shadow-sm cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <i className="fa-solid fa-file-csv text-sm" /> Export Database
            </button>
            
            <button
              onClick={handleLogout}
              className="flex-1 sm:flex-none bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-extrabold text-xs px-5 py-3 rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5"
            >
              Logout <i className="fa-solid fa-arrow-right-from-bracket text-[10px] text-slate-400" />
            </button>
          </div>
        </div>

        {/* Analytics Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          
          {/* Card 1: Total */}
          <div className="bg-slate-900/30 backdrop-blur-md rounded-3xl border border-slate-800/80 p-6 shadow-xl flex items-center justify-between hover:border-slate-700/60 transition-all duration-300 group">
            <div className="flex flex-col">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Total Enquiries</span>
              <span className="text-3xl font-black text-white group-hover:text-blue-400 transition-colors">{totalCount}</span>
              <span className="text-[10px] text-slate-400 mt-2 font-medium">All channels combined</span>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-blue-400 text-xl shadow-lg transition-transform duration-300 group-hover:scale-105 shrink-0">
              <i className="fa-solid fa-database" />
            </div>
          </div>

          {/* Card 2: New */}
          <div className="bg-slate-900/30 backdrop-blur-md rounded-3xl border border-slate-800/80 p-6 shadow-xl flex items-center justify-between hover:border-slate-700/60 transition-all duration-300 group">
            <div className="flex flex-col">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">New Leads</span>
              <span className="text-3xl font-black text-orange-400">{newCount}</span>
              <span className="text-[10px] text-orange-400/80 mt-2 font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse" /> Requires attention
              </span>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/25 flex items-center justify-center text-orange-400 text-xl shadow-lg transition-transform duration-300 group-hover:scale-105 shrink-0">
              <i className="fa-solid fa-fire animate-pulse" />
            </div>
          </div>

          {/* Card 3: In Progress */}
          <div className="bg-slate-900/30 backdrop-blur-md rounded-3xl border border-slate-800/80 p-6 shadow-xl flex items-center justify-between hover:border-slate-700/60 transition-all duration-300 group">
            <div className="flex flex-col">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">In Progress</span>
              <span className="text-3xl font-black text-amber-400">{inProgressCount}</span>
              <span className="text-[10px] text-slate-400 mt-2 font-medium">Currently consulting</span>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400 text-xl shadow-lg transition-transform duration-300 group-hover:scale-105 shrink-0">
              <i className="fa-solid fa-spinner animate-spin" style={{ animationDuration: "5s" }} />
            </div>
          </div>

          {/* Card 4: Contacted */}
          <div className="bg-slate-900/30 backdrop-blur-md rounded-3xl border border-slate-800/80 p-6 shadow-xl flex items-center justify-between hover:border-slate-700/60 transition-all duration-300 group">
            <div className="flex flex-col">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Completed & Contacted</span>
              <span className="text-3xl font-black text-emerald-400">{contactedCount}</span>
              <span className="text-[10px] text-slate-400 mt-2 font-medium">Proposal / Deal closed</span>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 text-xl shadow-lg transition-transform duration-300 group-hover:scale-105 shrink-0">
              <i className="fa-solid fa-circle-check" />
            </div>
          </div>

        </div>

        {/* Charts & Analytics Visual Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          
          {/* Services Progress Chart (Corporate Analytics Look) */}
          <div className="bg-slate-900/30 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 shadow-xl lg:col-span-2">
            <h3 className="text-xs font-black uppercase tracking-[0.1em] text-slate-400 mb-6 flex items-center gap-2">
              <i className="fa-solid fa-chart-pie text-blue-500" /> Service Requested Analytics
            </h3>
            <div className="flex flex-col gap-4">
              {[
                "Next.js Web Design & Development",
                "Corporate Business Website",
                "Headless E-commerce Store",
                "Landing Page & Lead Funnel",
                "Custom React Web Application",
                "Maintenance / Custom Web Support"
              ].map(serviceName => {
                const count = serviceStats[serviceName] || 0;
                const percent = totalCount > 0 ? (count / totalCount) * 100 : 0;
                return (
                  <div key={serviceName} className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center text-xs font-semibold text-slate-300">
                      <span className="truncate max-w-[80%]">{serviceName}</span>
                      <span className="text-blue-400 font-bold bg-blue-500/10 px-2 py-0.5 rounded text-[10px] border border-blue-500/20">{count} ({Math.round(percent)}%)</span>
                    </div>
                    <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800/40">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-600 to-orange-500 rounded-full transition-all duration-1000 ease-out" 
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Leads Conversion Funnel (Visual Doughnut Progress and Region Demographics) */}
          <div className="bg-slate-900/30 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.1em] text-slate-400 mb-6 flex items-center gap-2">
                <i className="fa-solid fa-percent text-orange-500" /> Status Funnel
              </h3>
              
              {/* Radial Donut Visualization */}
              <div className="flex items-center justify-center gap-6 mb-6">
                <div className="relative w-24 h-24 shrink-0">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
                    <circle cx="40" cy="40" r={radius} fill="transparent" stroke="#1e293b" strokeWidth="8" />
                    
                    {/* Ring for New Leads (Orange) */}
                    <circle cx="40" cy="40" r={radius} fill="transparent" stroke="#F97316" strokeWidth="8"
                            strokeDasharray={circumference}
                            strokeDashoffset={calculateStrokeOffset(newCount)}
                            strokeLinecap="round"
                            className="transition-all duration-1000 ease-in-out" />

                    {/* Ring for Contacted Leads (Emerald) */}
                    <circle cx="40" cy="40" r={radius} fill="transparent" stroke="#10B981" strokeWidth="8"
                            strokeDasharray={circumference}
                            strokeDashoffset={calculateStrokeOffset(contactedCount)}
                            strokeLinecap="round"
                            className="transition-all duration-1000 ease-in-out" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-xl font-black text-white">{totalCount}</span>
                    <span className="text-[8px] font-black uppercase tracking-wider text-slate-400">Total</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2.5 text-[10px] font-bold text-slate-400 w-full">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-orange-500" /> New Leads</span>
                    <span className="text-white font-extrabold">{newCount} ({totalCount ? Math.round((newCount/totalCount)*100) : 0}%)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500" /> In Progress</span>
                    <span className="text-white font-extrabold">{inProgressCount} ({totalCount ? Math.round((inProgressCount/totalCount)*100) : 0}%)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Contacted</span>
                    <span className="text-white font-extrabold">{contactedCount} ({totalCount ? Math.round((contactedCount/totalCount)*100) : 0}%)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-rose-500" /> Rejected</span>
                    <span className="text-white font-extrabold">{rejectedCount} ({totalCount ? Math.round((rejectedCount/totalCount)*100) : 0}%)</span>
                  </div>
                </div>
              </div>

              {/* Regional progress */}
              <div className="border-t border-slate-800/80 pt-5 mt-2 flex flex-col gap-3">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Geographic Demographics</span>
                
                <div className="flex flex-col gap-2.5">
                  {["IN", "US", "UK", "AE", "GLOBAL"].map(reg => {
                    const count = regionStats[reg] || 0;
                    const percent = totalCount > 0 ? (count / totalCount) * 100 : 0;
                    const flagMap: Record<string, string> = { IN: "🇮🇳", US: "🇺🇸", UK: "🇬🇧", AE: "🇦🇪", GLOBAL: "🌐" };
                    const nameMap: Record<string, string> = { IN: "India", US: "United States", UK: "United Kingdom", AE: "UAE", GLOBAL: "Global" };
                    
                    return (
                      <div key={reg} className="flex items-center gap-3">
                        <span className="text-sm shrink-0 leading-none">{flagMap[reg]}</span>
                        <div className="flex-1 flex flex-col gap-1">
                          <div className="flex justify-between items-center text-[10px] font-bold text-slate-300">
                            <span>{nameMap[reg]}</span>
                            <span>{count} leads ({Math.round(percent)}%)</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800/40">
                            <div 
                              className="h-full bg-orange-500 rounded-full transition-all duration-1000 ease-out" 
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            
            <div className="text-[9px] text-slate-400 mt-6 border-t border-slate-800/50 pt-3.5 text-center font-medium">
              Lead information is synced with MongoDB Atlas real-time database.
            </div>
          </div>

        </div>

        {/* Filters Toolbar (Premium Dark Slate Style) */}
        <div className="bg-slate-900/40 backdrop-blur-md rounded-2xl border border-slate-800/80 p-5 mb-8 shadow-xl flex flex-col lg:flex-row gap-4 items-center justify-between">
          
          {/* Search Box */}
          <div className="relative w-full lg:w-96">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
              <i className="fa-solid fa-magnifying-glass text-[11px]" />
            </span>
            <input
              type="text"
              placeholder="Search by name, email, mobile, notes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs pl-10 pr-4 py-3 bg-slate-950/60 border border-slate-800/80 text-white rounded-xl outline-none focus:bg-slate-950 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 font-medium"
            />
          </div>

          {/* Filters Select boxes */}
          <div className="flex flex-wrap gap-4 w-full lg:w-auto items-center justify-end">
            
            {/* Service Type Filter */}
            <div className="flex flex-col gap-1.5 w-full sm:w-44">
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest pl-1">Service Type</span>
              <select
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                className="w-full text-[11px] px-3.5 py-2.5 border border-slate-800 bg-slate-950 text-slate-300 outline-none rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-semibold"
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

            {/* Status Filter */}
            <div className="flex flex-col gap-1.5 w-full sm:w-36">
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest pl-1">Status</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full text-[11px] px-3.5 py-2.5 border border-slate-800 bg-slate-950 text-slate-300 outline-none rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-semibold"
              >
                <option value="all">All Statuses</option>
                <option value="New">New</option>
                <option value="In Progress">In Progress</option>
                <option value="Contacted">Contacted</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            {/* Region Filter */}
            <div className="flex flex-col gap-1.5 w-full sm:w-32">
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest pl-1">Region</span>
              <select
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
                className="w-full text-[11px] px-3.5 py-2.5 border border-slate-800 bg-slate-950 text-slate-300 outline-none rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-semibold"
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

        {/* Lead Table / CRM Panel Container (Glassmorphic Table) */}
        <div className="bg-slate-900/30 backdrop-blur-md rounded-[32px] border border-slate-800/80 shadow-2xl overflow-hidden mb-12">
          {filteredEnquiries.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900/50 border-b border-slate-800 text-[9px] font-black uppercase tracking-wider text-slate-400">
                    <th className="px-6 py-5">Date</th>
                    <th className="px-6 py-5">Contact Details</th>
                    <th className="px-6 py-5">Target Channels</th>
                    <th className="px-6 py-5">Target Service</th>
                    <th className="px-6 py-5">Region</th>
                    <th className="px-6 py-5">Lead Status</th>
                    <th className="px-6 py-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40 text-xs">
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
                        <tr className={`hover:bg-slate-800/20 transition-all duration-200 ${isExpanded ? "bg-slate-800/10" : ""}`}>
                          <td className="px-6 py-5.5 font-bold text-slate-400 whitespace-nowrap">
                            {dateStr}
                          </td>
                          <td className="px-6 py-5.5">
                            <div className="font-black text-white text-sm">{enq.name}</div>
                            {enq.companyName !== "N/A" ? (
                              <div className="text-[10px] text-blue-400/90 font-bold mt-0.5">{enq.companyName}</div>
                            ) : (
                              <div className="text-[10px] text-slate-500 italic mt-0.5">No company listed</div>
                            )}
                          </td>
                          <td className="px-6 py-5.5">
                            <div className="flex flex-col gap-1">
                              <a href={`tel:${enq.mobile}`} className="font-extrabold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1.5">
                                <i className="fa-solid fa-square-phone text-blue-500/80 text-sm" /> {enq.mobile}
                              </a>
                              <a href={`mailto:${enq.email}`} className="text-[11px] text-slate-400 hover:text-slate-300 transition-colors flex items-center gap-1.5">
                                <i className="fa-solid fa-square-envelope text-slate-600 text-sm" /> {enq.email}
                              </a>
                              {enq.website !== "N/A" && (
                                <a
                                  href={enq.website.startsWith("http") ? enq.website : `https://${enq.website}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[10px] text-emerald-400 font-bold hover:text-emerald-300 flex items-center gap-1.5 mt-0.5"
                                >
                                  <i className="fa-solid fa-globe text-emerald-500/70" /> Web Link
                                </a>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-5.5 font-bold text-slate-200 max-w-[200px] truncate">
                            {enq.service}
                          </td>
                          <td className="px-6 py-5.5">
                            <span className="bg-slate-950 border border-slate-800 font-bold uppercase text-[9px] px-2.5 py-1 rounded-lg text-slate-300 inline-block shadow-sm">
                              {enq.region}
                            </span>
                          </td>
                          <td className="px-6 py-5.5">
                            <select
                              value={enq.status}
                              onChange={(e) => handleStatusChange(enq.id, e.target.value)}
                              className={`text-[10px] font-black px-2.5 py-1.5 rounded-xl border outline-none cursor-pointer shadow-sm transition-all focus:ring-4 ${
                                enq.status === "New"
                                  ? "bg-blue-500/10 border-blue-500/20 text-blue-400 focus:ring-blue-500/10"
                                  : enq.status === "In Progress"
                                  ? "bg-amber-500/10 border-amber-500/20 text-amber-400 focus:ring-amber-500/10"
                                  : enq.status === "Contacted"
                                  ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 focus:ring-emerald-500/10"
                                  : "bg-rose-500/10 border-rose-500/20 text-rose-400 focus:ring-rose-500/10"
                              }`}
                            >
                              <option value="New" className="bg-slate-900 text-blue-400">New</option>
                              <option value="In Progress" className="bg-slate-900 text-amber-400">In Progress</option>
                              <option value="Contacted" className="bg-slate-900 text-emerald-400">Contacted</option>
                              <option value="Rejected" className="bg-slate-900 text-rose-400">Rejected</option>
                            </select>
                          </td>
                          <td className="px-6 py-5.5 text-right">
                            <div className="flex items-center justify-end gap-2.5">
                              <button
                                onClick={() => setExpandedId(isExpanded ? null : enq.id)}
                                className={`w-8.5 h-8.5 rounded-xl text-xs flex items-center justify-center transition-all cursor-pointer ${
                                  isExpanded 
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/10" 
                                    : "bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
                                }`}
                                title="Expand Details"
                              >
                                <i className={`fa-solid ${isExpanded ? "fa-folder-open" : "fa-chevron-down"}`} />
                              </button>
                              
                              <button
                                onClick={() => handleDelete(enq.id)}
                                className="w-8.5 h-8.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 flex items-center justify-center transition-all cursor-pointer"
                                title="Delete Lead"
                              >
                                <i className="fa-solid fa-trash-can" />
                              </button>
                            </div>
                          </td>
                        </tr>
                        
                        {/* Expanded details & notes crm console row */}
                        {isExpanded && (
                          <tr className="bg-slate-950/40 border-b border-slate-850">
                            <td colSpan={7} className="px-8 py-6">
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                
                                {/* Lead Details message */}
                                <div className="flex flex-col gap-2.5">
                                  <h4 className="text-[9px] font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                                    <i className="fa-solid fa-comment-dots" /> Client Message Query
                                  </h4>
                                  <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 text-[12px] leading-relaxed text-slate-300 shadow-inner whitespace-pre-wrap min-h-[140px]">
                                    {enq.message}
                                  </div>
                                  <div className="flex flex-wrap gap-4 text-[9px] text-slate-500 font-bold px-1 mt-1">
                                    <span>Record UUID: <code className="bg-slate-900 px-1 py-0.5 rounded text-[8.5px] font-mono text-blue-400/90">{enq.id}</code></span>
                                    <span>•</span>
                                    <span>Acquisition Channel: <span className="text-slate-400 font-extrabold">{enq.source}</span></span>
                                  </div>
                                </div>

                                {/* Notes Follow up CRM console */}
                                <div className="flex flex-col gap-2.5">
                                  <div className="flex justify-between items-center">
                                    <h4 className="text-[9px] font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                                      <i className="fa-solid fa-pen-to-square text-blue-400" /> Internal Follow-up Notes
                                    </h4>
                                    {noteStatus === "saved" && (
                                      <span className="text-[9px] text-emerald-400 font-black bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/25 flex items-center gap-1">
                                        <i className="fa-solid fa-circle-check" /> Updated!
                                      </span>
                                    )}
                                  </div>
                                  
                                  <textarea
                                    value={notesState[enq.id] || ""}
                                    onChange={(e) => setNotesState({ ...notesState, [enq.id]: e.target.value })}
                                    placeholder="Enter status updates, follow-up history, client response, or call details here..."
                                    className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 text-[12px] text-slate-200 placeholder:text-slate-600 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 shadow-inner resize-none min-h-[140px] font-medium leading-relaxed"
                                  />
                                  
                                  <button
                                    onClick={() => handleSaveNotes(enq.id)}
                                    disabled={noteStatus === "saving"}
                                    className={`w-full lg:w-auto self-end px-6 py-3.5 rounded-xl font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
                                      noteStatus === "saving"
                                        ? "bg-slate-900 border border-slate-800 text-slate-600 cursor-not-allowed"
                                        : "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/10"
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
              <div className="w-16 h-16 rounded-2xl bg-slate-800/40 border border-slate-850 flex items-center justify-center text-slate-500 mb-4 shadow-inner">
                <i className="fa-solid fa-folder-open text-xl" />
              </div>
              <h3 className="font-extrabold text-sm text-white mb-1">No enquiries found</h3>
              <p className="text-xs text-slate-500 max-w-[280px]">Your current database or active search query returned 0 listing records.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
