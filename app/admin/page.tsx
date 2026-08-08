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
        setEnquiries(prev =>
          prev.map(enq => (enq.id === id ? { ...enq, status: newStatus } : enq))
        );
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleSaveNotes = async (id: string) => {
    setSavedNotesStatus(prev => ({ ...prev, [id]: "saving" }));
    try {
      const res = await fetch("/api/admin/enquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, notes: notesState[id] }),
      });
      if (res.ok) {
        setEnquiries(prev =>
          prev.map(enq => (enq.id === id ? { ...enq, notes: notesState[id] } : enq))
        );
        setSavedNotesStatus(prev => ({ ...prev, [id]: "saved" }));
        setTimeout(() => {
          setSavedNotesStatus(prev => ({ ...prev, [id]: "idle" }));
        }, 2000);
      }
    } catch (err) {
      console.error("Error saving notes:", err);
      setSavedNotesStatus(prev => ({ ...prev, [id]: "idle" }));
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
        setEnquiries(prev => prev.filter(enq => enq.id !== id));
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
    
    const headers = ["Date", "Name", "Mobile", "Email", "Company", "Website", "Service Requested", "Details", "Internal Notes", "Region", "Source", "Status"];
    const rows = enquiries.map(enq => [
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
      enq.status
    ]);

    const csvContent = [headers.join(","), ...rows.map(e => e.map(val => `"${val.replace(/"/g, '""')}"`).join(","))].join("\n");
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
  const filteredEnquiries = enquiries.filter(enq => {
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
    const matchRegion = regionFilter === "all" || enq.region.toLowerCase() === regionFilter.toLowerCase();

    return matchSearch && matchService && matchStatus && matchRegion;
  });

  // Calculate metrics
  const totalCount = enquiries.length;
  const newCount = enquiries.filter(e => e.status === "New").length;
  const inProgressCount = enquiries.filter(e => e.status === "In Progress").length;
  const contactedCount = enquiries.filter(e => e.status === "Contacted").length;

  // Calculate service analytics
  const serviceStats: Record<string, number> = {};
  enquiries.forEach(e => {
    serviceStats[e.service] = (serviceStats[e.service] || 0) + 1;
  });

  // Calculate region analytics
  const regionStats: Record<string, number> = {};
  enquiries.forEach(e => {
    const reg = e.region.toUpperCase();
    regionStats[reg] = (regionStats[reg] || 0) + 1;
  });

  if (loading && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F3F4F6] flex items-center justify-center p-6">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <div className="text-xs font-bold text-[#2563EB] tracking-widest uppercase animate-pulse">Loading CRM...</div>
        </div>
      </div>
    );
  }

  // Security Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 font-sans relative overflow-hidden">
        {/* Decorative background glow circles */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#2563EB]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#F95C19]/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl z-10">
          <div className="text-center mb-8">
            <span className="text-3xl font-black tracking-tight text-white">
              Joy<span className="text-[#F95C19]">Digital</span>
            </span>
            <span className="bg-[#2563EB]/10 text-[#2563EB] text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded ml-2 border border-[#2563EB]/25">CRM</span>
            <p className="text-[11px] text-slate-400 mt-2.5">Enter access PIN to unlock the corporate lead console</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Enquiry Vault PIN</label>
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="••••"
                required
                className="w-full text-center tracking-widest text-xl font-bold bg-slate-950 border border-slate-800 text-white rounded-2xl px-4 py-4 outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/5 transition-all duration-300"
                autoFocus
              />
            </div>

            {loginError && <p className="text-center text-xs font-semibold text-red-400 mt-1">{loginError}</p>}

            <button
              type="submit"
              className="bg-[#2563EB] hover:bg-[#3B82F6] text-white font-bold text-xs py-4 rounded-2xl shadow-lg transition-all duration-300 cursor-pointer mt-2 w-full hover:-translate-y-0.5"
            >
              Access Vault
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Loaded Dashboard Screen
  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 px-4 sm:px-6 lg:px-8 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Header Panel */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-xl tracking-tight text-slate-900">
                Joy<span className="text-[#F95C19]">Digital</span>
              </span>
              <span className="bg-[#2563EB]/10 text-[#2563EB] text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded border border-[#2563EB]/15">Console</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Real-time incoming enquiries, follow-up logs, and performance statistics.</p>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={exportToCSV}
              disabled={enquiries.length === 0}
              className="flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs px-4.5 py-3 rounded-xl transition-all shadow-sm cursor-pointer disabled:opacity-50"
            >
              <i className="fa-solid fa-file-excel text-emerald-600 text-sm" /> Export CSV
            </button>
            
            <button
              onClick={handleLogout}
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4.5 py-3 rounded-xl transition-all shadow-md cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Metrics Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          
          {/* Card 1 */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Total Enquiries</span>
              <span className="text-3xl font-extrabold text-slate-900">{totalCount}</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#2563EB]/5 border border-[#2563EB]/10 flex items-center justify-center text-[#2563EB] text-lg">
              <i className="fa-solid fa-folder-open" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">New Leads</span>
              <span className="text-3xl font-extrabold text-[#2563EB]">{newCount}</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#F95C19] text-lg">
              <i className="fa-solid fa-bell animate-bounce" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">In Progress</span>
              <span className="text-3xl font-extrabold text-amber-600">{inProgressCount}</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 text-lg">
              <i className="fa-solid fa-spinner animate-spin" style={{ animationDuration: "3s" }} />
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Contacted</span>
              <span className="text-3xl font-extrabold text-emerald-600">{contactedCount}</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 text-lg">
              <i className="fa-solid fa-check-double" />
            </div>
          </div>

        </div>

        {/* Charts & Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          
          {/* Services Progress Chart (Corporate Look) */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm lg:col-span-2">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
              <i className="fa-solid fa-chart-bar text-[#2563EB]" /> Service Distribution
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
                  <div key={serviceName} className="flex flex-col gap-1">
                    <div className="flex justify-between items-center text-[11px] font-semibold text-slate-700">
                      <span className="truncate max-w-[85%]">{serviceName}</span>
                      <span className="text-slate-900 bg-slate-100 px-2 py-0.5 rounded text-[10px] font-bold">{count} ({Math.round(percent)}%)</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#2563EB] to-[#3B82F6] rounded-full transition-all duration-1000 ease-out" 
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Region Distribution Panel */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                <i className="fa-solid fa-earth-americas text-[#F95C19]" /> Regional Demographics
              </h3>
              
              <div className="flex flex-col gap-3.5 mt-2">
                {["IN", "US", "UK", "AE", "GLOBAL"].map(reg => {
                  const count = regionStats[reg] || 0;
                  const percent = totalCount > 0 ? (count / totalCount) * 100 : 0;
                  const flagMap: Record<string, string> = { IN: "🇮🇳", US: "🇺🇸", UK: "🇬🇧", AE: "🇦🇪", GLOBAL: "🌐" };
                  const nameMap: Record<string, string> = { IN: "India", US: "United States", UK: "United Kingdom", AE: "UAE", GLOBAL: "Global" };
                  
                  return (
                    <div key={reg} className="flex items-center gap-3">
                      <span className="text-lg shrink-0 leading-none">{flagMap[reg]}</span>
                      <div className="flex-1 flex flex-col gap-0.5">
                        <div className="flex justify-between items-center text-[10px] font-bold text-slate-700">
                          <span>{nameMap[reg]}</span>
                          <span>{count} leads</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[#F95C19] rounded-full transition-all duration-1000 ease-out" 
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="text-[10px] text-slate-400 mt-4 border-t border-slate-100 pt-3 text-center font-medium">
              Data aggregates updated in real-time from JSON repository.
            </div>
          </div>

        </div>

        {/* Filters Toolbar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-8 shadow-sm flex flex-col lg:flex-row gap-4 items-center justify-between">
          
          {/* Search Box */}
          <div className="relative w-full lg:w-96">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
              <i className="fa-solid fa-magnifying-glass text-[11px]" />
            </span>
            <input
              type="text"
              placeholder="Search leads, services, email, notes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs pl-9 pr-4 py-3 bg-[#F8FAFC] border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/5 transition-all duration-200 font-medium"
            />
          </div>

          {/* Filters Select boxes */}
          <div className="flex flex-wrap gap-4 w-full lg:w-auto items-center justify-end">
            
            {/* Service Type Filter */}
            <div className="flex flex-col gap-1.5 w-44">
              <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">Service Requested</span>
              <select
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                className="w-full text-[11px] px-3 py-2 border border-slate-200 rounded-lg bg-[#F8FAFC] outline-none font-semibold text-slate-700"
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
            <div className="flex flex-col gap-1.5 w-36">
              <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">Status</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full text-[11px] px-3 py-2 border border-slate-200 rounded-lg bg-[#F8FAFC] outline-none font-semibold text-slate-700"
              >
                <option value="all">All Statuses</option>
                <option value="New">New</option>
                <option value="In Progress">In Progress</option>
                <option value="Contacted">Contacted</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            {/* Region Filter */}
            <div className="flex flex-col gap-1.5 w-32">
              <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">Region</span>
              <select
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
                className="w-full text-[11px] px-3 py-2 border border-slate-200 rounded-lg bg-[#F8FAFC] outline-none font-semibold text-slate-700"
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

        {/* Lead Table / CRM Panel Container */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mb-12">
          {filteredEnquiries.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-black uppercase tracking-wider text-slate-500">
                    <th className="px-6 py-4.5">Submitted</th>
                    <th className="px-6 py-4.5">Contact Name</th>
                    <th className="px-6 py-4.5">Corporate Channels</th>
                    <th className="px-6 py-4.5">Target Service</th>
                    <th className="px-6 py-4.5">Region</th>
                    <th className="px-6 py-4.5">Status</th>
                    <th className="px-6 py-4.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {filteredEnquiries.map((enq) => {
                    const isExpanded = expandedId === enq.id;
                    const dateStr = new Date(enq.createdAt).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit"
                    });
                    const noteStatus = savedNotesStatus[enq.id] || "idle";

                    return (
                      <React.Fragment key={enq.id}>
                        <tr className={`hover:bg-slate-50/50 transition-colors ${isExpanded ? "bg-[#F8FAFC]/40" : ""}`}>
                          <td className="px-6 py-5 font-semibold text-slate-500 whitespace-nowrap">
                            {dateStr}
                          </td>
                          <td className="px-6 py-5">
                            <div className="font-extrabold text-slate-900 text-[13px]">{enq.name}</div>
                            {enq.companyName !== "N/A" ? (
                              <div className="text-[10px] text-slate-400 font-bold mt-0.5">{enq.companyName}</div>
                            ) : (
                              <div className="text-[10px] text-slate-300 italic font-medium mt-0.5">No Company</div>
                            )}
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex flex-col gap-1 font-medium">
                              <a href={`tel:${enq.mobile}`} className="font-bold text-[#2563EB] hover:underline flex items-center gap-1.5">
                                <i className="fa-solid fa-square-phone text-blue-500/80" /> {enq.mobile}
                              </a>
                              <a href={`mailto:${enq.email}`} className="text-[11px] text-slate-500 hover:underline flex items-center gap-1.5">
                                <i className="fa-solid fa-square-envelope text-slate-400" /> {enq.email}
                              </a>
                              {enq.website !== "N/A" && (
                                <a
                                  href={enq.website.startsWith("http") ? enq.website : `https://${enq.website}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[10px] text-emerald-600 font-semibold hover:underline flex items-center gap-1.5"
                                >
                                  <i className="fa-solid fa-square-rss text-emerald-500/70" /> Website
                                </a>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-5 font-bold text-slate-800">
                            {enq.service}
                          </td>
                          <td className="px-6 py-5">
                            <span className="bg-slate-100 border border-slate-200/60 font-bold uppercase text-[9px] px-2.5 py-1 rounded-md text-slate-700 inline-block shadow-sm">
                              {enq.region}
                            </span>
                          </td>
                          <td className="px-6 py-5">
                            <select
                              value={enq.status}
                              onChange={(e) => handleStatusChange(enq.id, e.target.value)}
                              className={`text-[10px] font-black px-2.5 py-1.5 rounded-xl border outline-none cursor-pointer shadow-sm transition-all focus:ring-4 ${
                                enq.status === "New"
                                  ? "bg-blue-50 border-blue-200 text-[#2563EB] focus:ring-blue-100"
                                  : enq.status === "In Progress"
                                  ? "bg-amber-50 border-amber-200 text-amber-700 focus:ring-amber-100"
                                  : enq.status === "Contacted"
                                  ? "bg-emerald-50 border-emerald-200 text-emerald-700 focus:ring-emerald-100"
                                  : "bg-red-50 border-red-200 text-red-700 focus:ring-red-100"
                              }`}
                            >
                              <option value="New">New</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Rejected">Rejected</option>
                            </select>
                          </td>
                          <td className="px-6 py-5 text-right">
                            <div className="flex items-center justify-end gap-2.5">
                              <button
                                onClick={() => setExpandedId(isExpanded ? null : enq.id)}
                                className={`w-8.5 h-8.5 rounded-xl text-xs flex items-center justify-center transition-all cursor-pointer ${
                                  isExpanded 
                                    ? "bg-slate-900 text-white shadow-md" 
                                    : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                                }`}
                                title="Expand Details & Notes"
                              >
                                <i className={`fa-solid ${isExpanded ? "fa-folder-open" : "fa-chevron-down"}`} />
                              </button>
                              
                              <button
                                onClick={() => handleDelete(enq.id)}
                                className="w-8.5 h-8.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center transition-all cursor-pointer"
                                title="Delete Lead Record"
                              >
                                <i className="fa-solid fa-trash-can" />
                              </button>
                            </div>
                          </td>
                        </tr>
                        
                        {/* Expanded details & notes console block */}
                        {isExpanded && (
                          <tr className="bg-[#F8FAFC]/70 border-b border-slate-200 shadow-inner">
                            <td colSpan={7} className="px-8 py-6">
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                
                                {/* Client Message */}
                                <div className="flex flex-col gap-2.5">
                                  <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                                    <i className="fa-solid fa-comment-dots text-slate-400" /> Client Enquiry Details
                                  </h4>
                                  <div className="bg-white border border-slate-200/80 rounded-2xl p-5 text-[12px] leading-relaxed text-slate-800 shadow-sm whitespace-pre-wrap min-h-[140px]">
                                    {enq.message}
                                  </div>
                                  <div className="flex flex-wrap gap-4 text-[10px] text-slate-400 font-bold px-1">
                                    <span>ID: <code className="bg-slate-100 px-1 py-0.5 rounded text-[9px] font-mono">{enq.id}</code></span>
                                    <span>•</span>
                                    <span>Source Channel: <span className="text-slate-600">{enq.source}</span></span>
                                  </div>
                                </div>

                                {/* Internal Notes CRM Tool */}
                                <div className="flex flex-col gap-2.5">
                                  <div className="flex justify-between items-center">
                                    <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                                      <i className="fa-solid fa-pen-to-square text-[#2563EB]" /> Internal Follow-up Notes
                                    </h4>
                                    {noteStatus === "saved" && (
                                      <span className="text-[9.5px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/50 flex items-center gap-1">
                                        <i className="fa-solid fa-circle-check" /> Notes Saved!
                                      </span>
                                    )}
                                  </div>
                                  
                                  <textarea
                                    value={notesState[enq.id] || ""}
                                    onChange={(e) => setNotesState({ ...notesState, [enq.id]: e.target.value })}
                                    placeholder="Enter internal follow-up notes here (e.g. 'Sent proposal via WhatsApp', 'Called client, scheduled demo for Monday', etc.)..."
                                    className="bg-white border border-slate-200/80 rounded-2xl p-4 text-[12px] text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/5 shadow-sm resize-none min-h-[140px] font-medium leading-relaxed"
                                  />
                                  
                                  <button
                                    onClick={() => handleSaveNotes(enq.id)}
                                    disabled={noteStatus === "saving"}
                                    className={`w-full lg:w-auto self-end px-6 py-3 rounded-xl font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                                      noteStatus === "saving"
                                        ? "bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed"
                                        : "bg-[#2563EB] hover:bg-[#3B82F6] text-white"
                                    }`}
                                  >
                                    <i className={`fa-solid ${noteStatus === "saving" ? "fa-circle-notch animate-spin" : "fa-save"}`} />
                                    {noteStatus === "saving" ? "Saving..." : "Save Follow-up Notes"}
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
            <div className="p-16 text-center">
              <div className="w-14 h-14 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-4">
                <i className="fa-solid fa-folder-open text-xl" />
              </div>
              <h3 className="font-extrabold text-sm text-[#111827] mb-1">No matching enquiries</h3>
              <p className="text-xs text-slate-500">Your search queries or filters returned zero listings.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
