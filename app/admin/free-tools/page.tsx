"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { trackToolUsage } from "@/lib/toolTracker";

interface SummaryData {
  totalUsers: number;
  totalUses: number;
  totalLeads: number;
  totalDownloads: number;
  totalCtaClicks: number;
}

interface ToolStat {
  tool: string;
  uses: number;
  downloads: number;
  leads: number;
  ctaClicks: number;
}

interface UserActivity {
  id: string;
  anonId: string;
  toolName: string;
  action: string;
  metadata: any;
  createdAt: string;
  city: string;
  country: string;
}

interface Lead {
  id: string;
  name: string;
  companyName: string;
  email: string;
  mobile: string;
  service: string;
  message: string;
  source: string;
  region: string;
  status: string;
  createdAt: string;
  notes?: string;
  pipelineStage?: string;
  utmParams?: any;
}

export default function AdminFreeToolsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pin, setPin] = useState<string>("");
  const [loginError, setLoginError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<"overview" | "activities" | "leads">("overview");

  // Data states
  const [summary, setSummary] = useState<SummaryData>({
    totalUsers: 0,
    totalUses: 0,
    totalLeads: 0,
    totalDownloads: 0,
    totalCtaClicks: 0
  });
  const [toolStats, setToolStats] = useState<ToolStat[]>([]);
  const [activities, setActivities] = useState<UserActivity[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);

  // Filter state
  const [timeFilter, setTimeFilter] = useState<string>("all");

  // Load auth state from session
  useEffect(() => {
    const auth = sessionStorage.getItem("joy_admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
      fetchDashboardData();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/free-tools");
      if (res.ok) {
        const data = await res.json();
        setSummary(data.summary);
        setToolStats(data.toolAnalytics);
        setActivities(data.userActivities);
        setLeads(data.leads);
      }
    } catch (err) {
      console.error("Error loading dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === "2613" || pin === "JoyAdmin2026") {
      setIsAuthenticated(true);
      sessionStorage.setItem("joy_admin_auth", "true");
      setLoginError("");
      fetchDashboardData();
    } else {
      setLoginError("Incorrect access credentials.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("joy_admin_auth");
    setIsAuthenticated(false);
    setPin("");
  };

  // Status updates for Leads
  const handleStatusChange = async (leadId: string, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/enquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: leadId, status: newStatus, pipelineStage: newStatus.toLowerCase() })
      });
      if (res.ok) {
        setLeads(leads.map(l => l.id === leadId ? { ...l, status: newStatus, pipelineStage: newStatus.toLowerCase() } : l));
      }
    } catch (err) {
      console.error("Error updating lead status:", err);
    }
  };

  const handleDeleteLead = async (leadId: string) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;
    try {
      const res = await fetch(`/api/admin/enquiries?id=${leadId}`, { method: "DELETE" });
      if (res.ok) {
        setLeads(leads.filter(l => l.id !== leadId));
      }
    } catch (err) {
      console.error("Error deleting lead:", err);
    }
  };

  // CSV Export utility
  const exportToCSV = () => {
    if (leads.length === 0) return;

    const headers = [
      "Date", "Name", "Mobile", "Email", "Company", "Service Interest", 
      "Referrer Tool", "Status", "UTM Source", "UTM Medium", "UTM Campaign"
    ];
    const rows = leads.map((l) => [
      new Date(l.createdAt).toLocaleString(),
      l.name,
      l.mobile,
      l.email,
      l.companyName,
      l.service,
      l.source,
      l.status,
      l.utmParams?.source || "Direct/Organic",
      l.utmParams?.medium || "None",
      l.utmParams?.campaign || "None"
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((val) => `"${(val || "").replace(/"/g, '""')}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `joydigital_tools_leads_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter calculations based on time filter
  const filterByTime = (dateStr: string) => {
    if (timeFilter === "all") return true;
    const itemDate = new Date(dateStr);
    const now = new Date();
    const diffDays = (now.getTime() - itemDate.getTime()) / (1000 * 60 * 60 * 24);

    if (timeFilter === "today") return diffDays <= 1;
    if (timeFilter === "7days") return diffDays <= 7;
    if (timeFilter === "30days") return diffDays <= 30;
    if (timeFilter === "90days") return diffDays <= 90;
    return true;
  };

  const filteredActivities = activities.filter(act => filterByTime(act.createdAt));
  const filteredLeads = leads.filter(l => filterByTime(l.createdAt));

  if (loading && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 border-4 border-slate-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-t-[#2563EB] rounded-full animate-spin"></div>
          </div>
          <div className="text-[10px] font-black text-slate-500 tracking-[0.2em] uppercase animate-pulse">
            Accessing Tools Console...
          </div>
        </div>
      </div>
    );
  }

  // Security Login Gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F1F5F9] flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white border border-slate-200 rounded-[32px] p-10 shadow-2xl">
          <div className="text-center mb-8 flex flex-col items-center">
            <div className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-orange-500 rounded-2xl flex items-center justify-center shadow-md mb-5 text-white font-black text-2xl">JD</div>
            <span className="text-2xl font-black tracking-tight text-slate-900">
              Joy<span className="text-blue-600">Digital</span> Tools Panel
            </span>
            <p className="text-xs text-slate-500 mt-2">Enter your admin PIN code to unlock console details.</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2.5">
              <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest pl-1">Security PIN</label>
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="••••"
                required
                className="w-full text-center tracking-[0.75em] text-2xl font-bold bg-slate-50 border border-slate-200 text-slate-950 rounded-2xl px-4 py-4 outline-none focus:bg-white focus:border-[#2563EB] transition-all"
                autoFocus
              />
            </div>
            {loginError && <p className="text-center text-xs font-bold text-rose-600 bg-rose-50 py-2 rounded-xl">{loginError}</p>}
            <button
              type="submit"
              className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-extrabold text-xs py-4 rounded-2xl shadow-md transition-all cursor-pointer hover:-translate-y-0.5"
            >
              Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800">
      
      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="font-black text-lg text-slate-900 tracking-tight flex items-center gap-1.5">
              Joy<span className="text-blue-600">Digital</span>
              <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-black uppercase tracking-wider border border-blue-100">
                Tools Admin
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-xs font-bold text-slate-500 hover:text-slate-900">
              <i className="fa-solid fa-arrow-left mr-1.5" /> Back to CRM
            </Link>
            <button
              onClick={handleLogout}
              className="text-xs font-bold text-rose-600 hover:text-rose-700 cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Title and date filter */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-black text-slate-900">Free Tools Analytics Hub</h1>
            <p className="text-xs text-slate-500 font-semibold mt-1">
              Track conversion funnels, popular tools usages, anonymous session pings, and captured inquiries.
            </p>
          </div>
          
          {/* Timeframe selector */}
          <div className="flex items-center gap-2 bg-white border border-slate-200 p-1.5 rounded-xl">
            {[
              { value: "all", label: "All Time" },
              { value: "today", label: "Today" },
              { value: "7days", label: "7 Days" },
              { value: "30days", label: "30 Days" }
            ].map(tf => (
              <button
                key={tf.value}
                onClick={() => setTimeFilter(tf.value)}
                className={`px-3 py-1.5 text-[10px] font-bold rounded-lg cursor-pointer transition-all ${
                  timeFilter === tf.value ? "bg-blue-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {tf.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dashboard KPI cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {[
            { label: "Total Visitors", value: summary.totalUsers, desc: "Unique anonymous IDs", icon: "fa-regular fa-user text-blue-500 bg-blue-50" },
            { label: "Total Tool Uses", value: summary.totalUses, desc: "Total calculated pings", icon: "fa-solid fa-calculator text-purple-500 bg-purple-50" },
            { label: "Total Leads", value: filteredLeads.length, desc: "Optional form inquiries", icon: "fa-solid fa-fire text-orange-500 bg-orange-50" },
            { label: "PDF Downloads", value: summary.totalDownloads, desc: "Invoices & quotes saved", icon: "fa-solid fa-file-pdf text-rose-500 bg-rose-50" },
            { label: "CTA Clicks", value: summary.totalCtaClicks, desc: "Talk to Joy Digital clicks", icon: "fa-solid fa-bullhorn text-emerald-500 bg-emerald-50" }
          ].map((kpi, idx) => (
            <div key={idx} className="bg-white border border-slate-200 p-5 rounded-[20px] shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">{kpi.label}</span>
                  <span className="text-2xl font-black text-slate-900 block mt-1.5">{kpi.value}</span>
                </div>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm ${kpi.icon.split(" ").slice(-2).join(" ")}`}>
                  <i className={kpi.icon.split(" ").slice(0, -2).join(" ")} />
                </div>
              </div>
              <p className="text-[9px] text-slate-400 font-semibold mt-3">{kpi.desc}</p>
            </div>
          ))}
        </div>

        {/* Tabs selector */}
        <div className="flex gap-2 border-b border-slate-200 mb-6">
          {[
            { id: "overview", label: "Stats Overview", icon: "fa-solid fa-chart-simple" },
            { id: "leads", label: "Tool Captured Leads", icon: "fa-solid fa-user-tag" },
            { id: "activities", label: "User Action Logs", icon: "fa-solid fa-clock-rotate-left" }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              <i className={tab.icon} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab 1: Overview */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Tool statistics table */}
            <div className="lg:col-span-8 bg-white border border-slate-200 rounded-[24px] shadow-sm p-6 overflow-hidden">
              <h3 className="text-sm font-black text-slate-900 mb-4 border-b border-slate-50 pb-2">Tool Conversion Analytics</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 font-extrabold uppercase text-[9px] tracking-wider">
                      <th className="py-3 px-4">Tool</th>
                      <th className="py-3 px-4 text-center">Uses</th>
                      <th className="py-3 px-4 text-center">Downloads</th>
                      <th className="py-3 px-4 text-center">Leads</th>
                      <th className="py-3 px-4 text-center">CTA Clicks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {toolStats.map((stat, idx) => (
                      <tr key={idx} className="border-b border-slate-50 hover:bg-slate-50 font-semibold text-slate-600">
                        <td className="py-3.5 px-4 font-bold text-slate-900">{stat.tool}</td>
                        <td className="py-3.5 px-4 text-center">{stat.uses}</td>
                        <td className="py-3.5 px-4 text-center">{stat.downloads}</td>
                        <td className="py-3.5 px-4 text-center text-blue-600 font-bold">{stat.leads}</td>
                        <td className="py-3.5 px-4 text-center text-emerald-600">{stat.ctaClicks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* General tips or details summary */}
            <div className="lg:col-span-4 bg-white border border-slate-200 rounded-[24px] shadow-sm p-6">
              <h3 className="text-sm font-black text-slate-900 mb-3 border-b border-slate-50 pb-2">Analytics Summary</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold mb-4">
                These stats analyze how well tool users convert to consulting leads. Quotations and Invoices collect emails/numbers upon PDF generation, whereas calculators capture organic visits.
              </p>
              
              <div className="flex flex-col gap-3">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Lead Conv. Rate</span>
                  <span className="text-sm font-black text-blue-600">
                    {summary.totalUsers > 0 ? ((filteredLeads.length / summary.totalUsers) * 100).toFixed(1) : 0}%
                  </span>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Avg PDF Downloads</span>
                  <span className="text-sm font-black text-purple-600">
                    {summary.totalUsers > 0 ? (summary.totalDownloads / summary.totalUsers).toFixed(1) : 0} / user
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Leads */}
        {activeTab === "leads" && (
          <div className="bg-white border border-slate-200 rounded-[24px] shadow-sm p-6 overflow-hidden">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h3 className="text-sm font-black text-slate-900 border-b border-slate-50 pb-1">Tool Captured CRM Leads</h3>
              <button
                onClick={exportToCSV}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 px-4 rounded-xl shadow-sm transition-all cursor-pointer hover:scale-[1.01]"
              >
                <i className="fa-solid fa-file-csv mr-1.5" /> Export leads to CSV
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-extrabold uppercase text-[9px] tracking-wider">
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Contact</th>
                    <th className="py-3 px-4">Service Details</th>
                    <th className="py-3 px-4">Referrer Tool</th>
                    <th className="py-3 px-4 text-center">Status</th>
                    <th className="py-3 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="border-b border-slate-50 hover:bg-slate-50 text-slate-600 font-semibold">
                      <td className="py-4 px-4 text-[10px] text-slate-400 font-bold whitespace-nowrap">
                        {new Date(lead.createdAt).toLocaleDateString()} {new Date(lead.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-bold text-slate-900">{lead.name}</div>
                        <div className="text-[10px] text-slate-500">{lead.mobile} | {lead.email}</div>
                        {lead.companyName !== "N/A" && <div className="text-[9px] text-slate-400 italic mt-0.5">{lead.companyName}</div>}
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-bold text-slate-900 truncate max-w-[200px]">{lead.service}</div>
                        <div className="text-[10px] text-slate-500 truncate max-w-[250px]">{lead.message}</div>
                      </td>
                      <td className="py-4 px-4 text-[10px] text-slate-500 font-bold">{lead.source}</td>
                      <td className="py-4 px-4 text-center">
                        <select
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                          className="bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-bold py-1 px-2.5 outline-none cursor-pointer"
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Follow-up">Follow-up</option>
                          <option value="Converted">Converted</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </td>
                      <td className="py-4 px-4 text-center whitespace-nowrap">
                        <button
                          onClick={() => handleDeleteLead(lead.id)}
                          className="text-rose-500 hover:text-rose-600 text-xs p-1 cursor-pointer"
                        >
                          <i className="fa-solid fa-trash-can" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredLeads.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-400 font-bold">No leads found in selected timeframe.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Activities */}
        {activeTab === "activities" && (
          <div className="bg-white border border-slate-200 rounded-[24px] shadow-sm p-6 overflow-hidden">
            <h3 className="text-sm font-black text-slate-900 border-b border-slate-50 pb-3 mb-4">Recent User Activity Pings</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-extrabold uppercase text-[9px] tracking-wider">
                    <th className="py-3 px-4">Time</th>
                    <th className="py-3 px-4">Session UUID</th>
                    <th className="py-3 px-4">Tool Used</th>
                    <th className="py-3 px-4">Action</th>
                    <th className="py-3 px-4">Location</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredActivities.map((act) => (
                    <tr key={act.id} className="border-b border-slate-50 hover:bg-slate-50 font-semibold text-slate-600">
                      <td className="py-3.5 px-4 text-[10px] text-slate-400 whitespace-nowrap">
                        {new Date(act.createdAt).toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[10px] text-slate-500">{act.anonId.substring(0, 8)}...</td>
                      <td className="py-3.5 px-4 font-bold text-slate-900">{act.toolName}</td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase border ${
                          act.action === "pdf_download" || act.action === "qr_generate"
                            ? "bg-rose-50 border-rose-100 text-rose-600"
                            : act.action === "cta_click"
                            ? "bg-emerald-50 border-emerald-100 text-emerald-600"
                            : act.action === "lead_submit"
                            ? "bg-blue-50 border-blue-100 text-blue-600"
                            : "bg-slate-50 border-slate-100 text-slate-500"
                        }`}>
                          {act.action}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-[10px] text-slate-500">
                        {act.city}, {act.country}
                      </td>
                    </tr>
                  ))}
                  {filteredActivities.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-slate-400 font-bold">No logs found in selected timeframe.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
