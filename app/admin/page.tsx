"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import VisitorMap from "@/components/VisitorMap";
import LeadDetailsDrawer from "@/components/ui/LeadDetailsDrawer";
import BlogAdminPanel from "@/components/admin/BlogAdminPanel";

interface UtmData {
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
  referrer?: string;
  landingPage?: string;
  timestamp?: string;
}

interface Activity {
  id: string;
  timestamp: string;
  type: string;
  message: string;
  agent: string;
}

interface ProposalItem {
  description: string;
  price: number;
}

interface Proposal {
  id: string;
  date: string;
  value: number;
  items: ProposalItem[];
  tax: number;
  terms: string;
  validity: string;
  status: string;
}

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
  followUpDate?: string | null;
  pipelineStage?: string;
  assignedTo?: string;
  utmParams?: UtmData | null;
  activities?: Activity[];
  proposals?: Proposal[];
  irrelevantReason?: string;
  chatSessionId?: string;
}

interface AnalyticsData {
  totalPageviews: number;
  uniqueVisitors: number;
  topCities: Array<{ city: string; country: string; count: number }>;
  mapMarkers: Array<{ lat: number; lng: number; city: string; count: number }>;
  dailyTrend?: Array<{ label: string; views: number; visitors: number }>;
  weeklyTrend?: Array<{ label: string; views: number; visitors: number }>;
  monthlyTrend?: Array<{ label: string; views: number; visitors: number }>;
}

interface NotificationItem {
  id: string;
  leadId: string;
  type: "reminder" | "idle" | "new";
  title: string;
  message: string;
  timestamp: string;
}

const TEAM_MEMBERS = [
  { name: "Unassigned", value: "" },
  { name: "Saravanan L (Super Admin)", value: "Saravanan L" },
  { name: "Karthik R (Sales Manager)", value: "Karthik R" },
  { name: "Priya S (Sales Executive)", value: "Priya S" },
  { name: "Deepak K (Marketing Specialist)", value: "Deepak K" }
];

const PIPELINE_STAGES = [
  { label: "New Lead", value: "new", color: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800" },
  { label: "Contacted", value: "contacted", color: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800" },
  { label: "Qualified", value: "qualified", color: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800" },
  { label: "Proposal Sent", value: "proposal_sent", color: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800" },
  { label: "Negotiation", value: "negotiation", color: "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-400 border-pink-200 dark:border-pink-800" },
  { label: "Won", value: "won", color: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800" },
  { label: "Lost", value: "lost", color: "bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-800" },
  { label: "Irrelevant Lead", value: "irrelevant", color: "bg-slate-100 dark:bg-slate-800 text-slate-705 dark:text-slate-350 border-slate-200 dark:border-slate-750" }
];

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [loginError, setLoginError] = useState("");
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  // Active Menu: "dashboard" | "leads" | "map" | "heatmaps" | "blog" | "reports" | "chats" | "settings"
  const [activeTab, setActiveTab] = useState<"dashboard" | "leads" | "map" | "heatmaps" | "blog" | "reports" | "chats" | "settings">("dashboard");
  const [trafficTimeframe, setTrafficTimeframe] = useState<"daily" | "weekly" | "monthly">("daily");
  const [settingsSubTab, setSettingsSubTab] = useState<"cloudinary" | "system">("cloudinary");

  // Settings configurations
  const [cloudName, setCloudName] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [apiSecret, setApiSecret] = useState("");
  const [settingsLoading, setSettingsLoading] = useState(false);
  const [settingsMsg, setSettingsMsg] = useState({ text: "", type: "" });

  // Irrelevant Modal state
  const [irrelevantModalOpen, setIrrelevantModalOpen] = useState(false);
  const [irrelevantLeadId, setIrrelevantLeadId] = useState<string | null>(null);
  const [irrelevantReason, setIrrelevantReason] = useState("marketing_spam");
  const [customRemark, setCustomRemark] = useState("");

  // Reports Date range state
  const [reportDateRange, setReportDateRange] = useState<"this_month" | "last_month" | "last_30" | "last_90" | "all_time">("all_time");

  // Chat Logs state
  const [chatSessions, setChatSessions] = useState<any[]>([]);
  const [selectedChatSessionId, setSelectedChatSessionId] = useState<string | null>(null);
  const [selectedChatSession, setSelectedChatSession] = useState<any | null>(null);
  const [chatsLoading, setChatsLoading] = useState(false);
  const [chatDetailsLoading, setChatDetailsLoading] = useState(false);
  const [chatSearch, setChatSearch] = useState("");

  const fetchChatSessions = async () => {
    setChatsLoading(true);
    try {
      const res = await fetch("/api/admin/chat-sessions");
      if (res.ok) {
        const data = await res.json();
        setChatSessions(data);
      }
    } catch (e) {
      console.error("Error fetching chat sessions:", e);
    } finally {
      setChatsLoading(false);
    }
  };

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/admin/settings");
      if (res.ok) {
        const data = await res.json();
        setCloudName(data.cloudName || "");
        setApiKey(data.apiKey || "");
        setApiSecret(data.apiSecret || "");
      }
    } catch (err) {
      console.error("Error fetching Cloudinary settings:", err);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsLoading(true);
    setSettingsMsg({ text: "", type: "" });
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cloudName, apiKey, apiSecret }),
      });
      if (res.ok) {
        setSettingsMsg({ text: "Cloudinary settings updated successfully!", type: "success" });
      } else {
        const err = await res.json();
        setSettingsMsg({ text: err.error || "Failed to save configuration.", type: "error" });
      }
    } catch (error) {
      setSettingsMsg({ text: "Error saving configuration.", type: "error" });
    } finally {
      setSettingsLoading(false);
    }
  };

  const fetchChatSessionDetails = async (id: string) => {
    setChatDetailsLoading(true);
    setSelectedChatSessionId(id);
    try {
      const res = await fetch(`/api/admin/chat-sessions?id=${id}`);
      if (res.ok) {
        const data = await res.json();
        setSelectedChatSession(data);
      }
    } catch (e) {
      console.error("Error fetching chat details:", e);
    } finally {
      setChatDetailsLoading(false);
    }
  };

  // Irrelevant category translation helper
  const getReasonLabel = (reasonVal: string) => {
    if (!reasonVal) return "Not Specified";
    if (reasonVal.startsWith("other:")) {
      const customText = reasonVal.substring(6).trim();
      return customText ? `Other: ${customText}` : "Other Reason";
    }
    const labels: Record<string, string> = {
      marketing_spam: "Spam / Marketing Pitch",
      job_seeker: "Job Seeker / Internship",
      invalid_contact: "Invalid Contact Details",
      unrelated_service: "Unrelated Service Request",
      low_budget: "Out of Scope / Low Budget",
      test: "Test Submission"
    };
    return labels[reasonVal] || reasonVal;
  };

  const getStageStats = (filteredLeads: Enquiry[]) => {
    const stagesMap: Record<string, number> = {
      new: 0,
      contacted: 0,
      qualified: 0,
      proposal_sent: 0,
      negotiation: 0,
      won: 0,
      lost: 0,
      irrelevant: 0
    };
    filteredLeads.forEach(enq => {
      const stage = enq.pipelineStage || "new";
      stagesMap[stage] = (stagesMap[stage] || 0) + 1;
    });
    
    return PIPELINE_STAGES.map(s => ({
      label: s.label,
      value: s.value,
      count: stagesMap[s.value] || 0,
      color: s.color
    }));
  };

  const getSourceStats = (filteredLeads: Enquiry[]) => {
    const sourcesMap: Record<string, number> = {};
    filteredLeads.forEach(enq => {
      let src = enq.source || "Organic / Website Form";
      if (src === "CRM Dashboard Manual") src = "Manual (CRM Add)";
      sourcesMap[src] = (sourcesMap[src] || 0) + 1;
    });
    return Object.entries(sourcesMap)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  };

  const getIrrelevantStats = (filteredLeads: Enquiry[]) => {
    const categories = {
      marketing_spam: { label: "Spam / Marketing Pitch", count: 0, icon: "fa-solid fa-envelope-open-text", color: "bg-rose-500" },
      job_seeker: { label: "Job Seeker / Internship Inquiry", count: 0, icon: "fa-solid fa-user-graduate", color: "bg-blue-500" },
      invalid_contact: { label: "Invalid Contact Details", count: 0, icon: "fa-solid fa-phone-slash", color: "bg-amber-500" },
      unrelated_service: { label: "Unrelated Service Request", count: 0, icon: "fa-solid fa-circle-question", color: "bg-purple-500" },
      low_budget: { label: "Out of Scope / Low Budget", count: 0, icon: "fa-solid fa-hand-holding-dollar", color: "bg-orange-500" },
      test: { label: "Test Submission", count: 0, icon: "fa-solid fa-vial", color: "bg-slate-500" },
      other: { label: "Other Reasons", count: 0, icon: "fa-solid fa-comment-dots", color: "bg-indigo-500" }
    };

    let totalIrrelevant = 0;
    filteredLeads.forEach(enq => {
      if (enq.pipelineStage === "irrelevant") {
        totalIrrelevant++;
        let reasonKey = enq.irrelevantReason || "marketing_spam";
        if (reasonKey.startsWith("other:")) {
          reasonKey = "other";
        }
        if (categories[reasonKey as keyof typeof categories]) {
          categories[reasonKey as keyof typeof categories].count++;
        } else {
          categories.other.count++;
        }
      }
    });

    return {
      total: totalIrrelevant,
      breakdown: Object.entries(categories).map(([key, val]) => ({
        key,
        ...val
      })).sort((a, b) => b.count - a.count)
    };
  };

  const getMonthlyStats = () => {
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const now = new Date();
    
    const last6Months: Array<{ monthName: string; monthIndex: number; year: number; count: number }> = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      last6Months.push({
        monthName: months[d.getMonth()],
        monthIndex: d.getMonth(),
        year: d.getFullYear(),
        count: 0
      });
    }

    enquiries.forEach(enq => {
      if (!enq.createdAt) return;
      const createdDate = new Date(enq.createdAt);
      const enqMonth = createdDate.getMonth();
      const enqYear = createdDate.getFullYear();
      
      const matched = last6Months.find(m => m.monthIndex === enqMonth && m.year === enqYear);
      if (matched) {
        matched.count++;
      }
    });

    return last6Months;
  };

  const getFilteredLeadsForReports = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    return enquiries.filter(enq => {
      if (!enq.createdAt) return false;
      const createdDate = new Date(enq.createdAt);
      
      switch (reportDateRange) {
        case "this_month":
          return createdDate.getMonth() === currentMonth && createdDate.getFullYear() === currentYear;
        case "last_month": {
          const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
          const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
          return createdDate.getMonth() === prevMonth && createdDate.getFullYear() === prevYear;
        }
        case "last_30": {
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(now.getDate() - 30);
          return createdDate >= thirtyDaysAgo;
        }
        case "last_90": {
          const ninetyDaysAgo = new Date();
          ninetyDaysAgo.setDate(now.getDate() - 90);
          return createdDate >= ninetyDaysAgo;
        }
        case "all_time":
        default:
          return true;
      }
    });
  };

  // Analytics data state
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalPageviews: 0,
    uniqueVisitors: 0,
    topCities: [],
    mapMarkers: [],
    dailyTrend: [],
    weeklyTrend: [],
    monthlyTrend: []
  });

  // UI Modes
  const [isCompact, setIsCompact] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "kanban" | "analytics">("list");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Search & filter states
  const [search, setSearch] = useState("");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [stageFilter, setStageFilter] = useState("all");
  const [regionFilter, setRegionFilter] = useState("all");
  const [assignedFilter, setAssignedFilter] = useState("all");

  // Selected Lead for Drawer
  const [selectedLead, setSelectedLead] = useState<Enquiry | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Live time counter
  const [liveTime, setLiveTime] = useState("");

  // Sidebar drawers and modals visibility state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);

  // Role Management State
  const [currentRole, setCurrentRole] = useState<"Super Admin" | "Manager" | "Sales Executive" | "Marketing">("Super Admin");

  // Notifications State
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

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

  // Load auth state from sessionStorage & Theme
  useEffect(() => {
    const auth = sessionStorage.getItem("joy_admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
      fetchEnquiries();
      fetchAnalytics();
      fetchChatSessions();
      fetchSettings();
    } else {
      setLoading(false);
    }

    // Default to Zoho/HubSpot Light Mode and clear any cached dark theme
    localStorage.removeItem("joy_admin_theme");
    setIsDarkMode(false);
  }, []);

  // Fetch enquiries list
  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/enquiries");
      if (res.ok) {
        const data = await res.json();
        setEnquiries(data);
        generateNotifications(data);
      }
    } catch (err) {
      console.error("Error fetching enquiries:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch analytics tracking summaries
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

  // Generate real-time CRM notifications/alerts
  const generateNotifications = (leadsList: Enquiry[]) => {
    const notifs: NotificationItem[] = [];
    const now = new Date();

    leadsList.forEach((enq) => {
      // 1. Follow-up Reminders (Due Today / Overdue)
      if (enq.followUpDate) {
        const followDate = new Date(enq.followUpDate);
        const diffMs = followDate.getTime() - now.getTime();
        
        if (diffMs < 0) {
          notifs.push({
            id: `overdue-${enq.id}`,
            leadId: enq.id,
            type: "reminder",
            title: "Overdue Reminder",
            message: `Follow-up overdue for ${enq.name} (Scheduled: ${followDate.toLocaleDateString()})`,
            timestamp: enq.followUpDate
          });
        } else if (followDate.toDateString() === now.toDateString()) {
          notifs.push({
            id: `today-${enq.id}`,
            leadId: enq.id,
            type: "reminder",
            title: "Follow-up Due Today",
            message: `Follow-up scheduled with ${enq.name} today.`,
            timestamp: enq.followUpDate
          });
        }
      }

      // 2. Inactive Leads (Created > 7 days, and stage is still 'new')
      const createdDate = new Date(enq.createdAt);
      const daysOld = Math.floor((now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
      if (daysOld >= 7 && (enq.pipelineStage === "new" || !enq.pipelineStage)) {
        notifs.push({
          id: `inactive-${enq.id}`,
          leadId: enq.id,
          type: "idle",
          title: "Stale / Inactive Lead",
          message: `${enq.name} has been in 'New' stage for ${daysOld} days without progress.`,
          timestamp: enq.createdAt
        });
      }

      // 3. Brand New Leads (Created < 24 hours ago)
      if (daysOld < 1) {
        notifs.push({
          id: `new-${enq.id}`,
          leadId: enq.id,
          type: "new",
          title: "New Lead Inbound",
          message: `${enq.name} submitted a new inquiry regarding ${enq.service}.`,
          timestamp: enq.createdAt
        });
      }
    });

    // Sort notifications by date (newest first)
    notifs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    setNotifications(notifs);
  };

  const handleStatusChange = async (id: string, newStage: string, reasonValue?: string) => {
    let mainStatus = "In Progress";
    if (newStage === "new") mainStatus = "New";
    else if (newStage === "won") mainStatus = "Closed";
    else if (newStage === "lost") mainStatus = "Rejected";
    else if (newStage === "irrelevant") {
      mainStatus = "Rejected";
      if (!reasonValue) {
        setIrrelevantLeadId(id);
        setIrrelevantReason("marketing_spam");
        setCustomRemark("");
        setIrrelevantModalOpen(true);
        return;
      }
    }
    else if (newStage === "contacted") mainStatus = "Contacted";

    const targetLead = enquiries.find(e => e.id === id);
    const prevActivities = targetLead?.activities || [];
    
    // Auto-log activity on stage switch
    const stageLabel = PIPELINE_STAGES.find(s => s.value === newStage)?.label || newStage;
    let actMessage = `Stage changed to ${stageLabel.toUpperCase()} in pipeline view`;
    if (newStage === "irrelevant" && reasonValue) {
      actMessage = `Stage changed to IRRELEVANT LEAD with category: ${getReasonLabel(reasonValue)}`;
    }

    const newAct = {
      id: Math.random().toString(36).substring(2, 11),
      timestamp: new Date().toISOString(),
      type: "status",
      message: actMessage,
      agent: currentRole
    };

    try {
      const res = await fetch("/api/admin/enquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          id, 
          pipelineStage: newStage, 
          status: mainStatus,
          ...(newStage === "irrelevant" && { irrelevantReason: reasonValue }),
          activities: [newAct, ...prevActivities]
        }),
      });
      if (res.ok) {
        setEnquiries((prev) =>
          prev.map((enq) => (enq.id === id ? { 
            ...enq, 
            pipelineStage: newStage, 
            status: mainStatus,
            ...(newStage === "irrelevant" && { irrelevantReason: reasonValue }),
            activities: [newAct, ...prevActivities]
          } : enq))
        );
        // Refresh notifications
        generateNotifications(enquiries.map((enq) => (enq.id === id ? { 
          ...enq, 
          pipelineStage: newStage, 
          status: mainStatus,
          ...(newStage === "irrelevant" && { irrelevantReason: reasonValue })
        } : enq)));
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleDelete = async (id: string) => {
    // Role Authorization Check
    if (currentRole === "Sales Executive" || currentRole === "Marketing") {
      alert(`Access Denied: Roles other than Super Admin / Manager are not permitted to delete lead records.`);
      return;
    }

    if (!confirm("Are you sure you want to delete this lead? This action is permanent and cannot be undone.")) {
      return;
    }
    try {
      const res = await fetch(`/api/admin/enquiries?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        const filtered = enquiries.filter((enq) => enq.id !== id);
        setEnquiries(filtered);
        generateNotifications(filtered);
        if (selectedLead?.id === id) {
          setIsDrawerOpen(false);
          setSelectedLead(null);
        }
      }
    } catch (err) {
      console.error("Error deleting enquiry:", err);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === "2613" || pin === "JoyAdmin2026") {
      setIsAuthenticated(true);
      sessionStorage.setItem("joy_admin_auth", "true");
      setLoginError("");
      fetchEnquiries();
      fetchAnalytics();
      fetchChatSessions();
      fetchSettings();
    } else {
      setLoginError("Incorrect access credentials. Please try again.");
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
    
    // Add default timeline activity
    const initActivity = {
      id: Math.random().toString(36).substring(2, 11),
      timestamp: new Date().toISOString(),
      type: "created",
      message: "Lead manually registered in CRM console",
      agent: currentRole
    };

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...quickAddForm,
          source: "CRM Dashboard Manual",
          pipelineStage: "new",
          activities: [initActivity]
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

  const toggleTheme = () => {
    const nextTheme = !isDarkMode;
    setIsDarkMode(nextTheme);
    localStorage.setItem("joy_admin_theme", nextTheme ? "dark" : "light");
  };

  const handleSaveFilter = () => {
    const filters = { search, serviceFilter, stageFilter, regionFilter, assignedFilter };
    localStorage.setItem("joy_crm_saved_filters", JSON.stringify(filters));
    alert("Filter presets saved successfully!");
  };

  const handleLoadSavedFilters = () => {
    const filtersRaw = localStorage.getItem("joy_crm_saved_filters");
    if (filtersRaw) {
      const { search: s, serviceFilter: sv, stageFilter: st, regionFilter: r, assignedFilter: a } = JSON.parse(filtersRaw);
      setSearch(s || "");
      setServiceFilter(sv || "all");
      setStageFilter(st || "all");
      setRegionFilter(r || "all");
      setAssignedFilter(a || "all");
    } else {
      alert("No saved filter presets found.");
    }
  };

  const resetFilters = () => {
    setSearch("");
    setServiceFilter("all");
    setStageFilter("all");
    setRegionFilter("all");
    setAssignedFilter("all");
  };

  // CSV Export utility
  const exportToCSV = () => {
    if (enquiries.length === 0) return;

    const headers = [
      "Date", "Name", "Mobile", "Email", "Company", "Website", 
      "Service", "Details", "Region", "Attributed Source", 
      "UTM Source", "UTM Medium", "UTM Campaign", "Pipeline Stage", "Assigned To"
    ];
    const rows = enquiries.map((enq) => [
      enq.createdAt ? new Date(enq.createdAt).toLocaleString() : "",
      enq.name || "",
      enq.mobile || "",
      enq.email || "",
      enq.companyName || "",
      enq.website || "",
      enq.service || "",
      (enq.message || "").replace(/\n/g, " "),
      enq.region || "",
      enq.source || "",
      enq.utmParams?.source || "Organic/Direct",
      enq.utmParams?.medium || "None",
      enq.utmParams?.campaign || "None",
      enq.pipelineStage || "new",
      enq.assignedTo || "Unassigned"
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((e) => e.map((val) => `"${(val || "").replace(/"/g, '""')}"`).join(",")),
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `joydigital_leads_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Dynamic values fallbacks
  const getLeadValue = (enq: Enquiry) => {
    if (enq.proposals && enq.proposals.length > 0) {
      const won = enq.proposals.find(p => p.status === "accepted");
      if (won) return won.value;
      return enq.proposals[enq.proposals.length - 1].value;
    }
    const serviceName = enq.service || "";
    if (serviceName.includes("E-commerce")) return 45000;
    if (serviceName.includes("Application")) return 60000;
    if (serviceName.includes("Corporate")) return 35000;
    return 20000;
  };

  // Filter calculations based on Role Scope + UI Inputs
  const filteredEnquiries = enquiries.filter((enq) => {
    // 1. Role Scope Filter
    if (currentRole === "Sales Executive") {
      // Own assigned leads only
      if (enq.assignedTo !== "Priya S") return false;
    }

    // 2. UI Filters
    const searchLower = search.toLowerCase();
    const nameVal = (enq.name || "").toLowerCase();
    const mobileVal = (enq.mobile || "").toLowerCase();
    const emailVal = (enq.email || "").toLowerCase();
    const companyVal = (enq.companyName || "").toLowerCase();
    const messageVal = (enq.message || "").toLowerCase();
    const notesVal = (enq.notes || "").toLowerCase();

    const matchSearch =
      nameVal.includes(searchLower) ||
      mobileVal.includes(searchLower) ||
      emailVal.includes(searchLower) ||
      companyVal.includes(searchLower) ||
      messageVal.includes(searchLower) ||
      notesVal.includes(searchLower);

    const matchService = serviceFilter === "all" || enq.service === serviceFilter;
    const matchStage = stageFilter === "all" || (enq.pipelineStage || "new") === stageFilter;
    const matchRegion = regionFilter === "all" || (enq.region || "").toLowerCase() === regionFilter.toLowerCase();
    const matchAssigned = assignedFilter === "all" || enq.assignedTo === assignedFilter;

    return matchSearch && matchService && matchStage && matchRegion && matchAssigned;
  });

  // Calculate Metrics
  const totalCount = enquiries.length;
  const newCount = enquiries.filter((e) => (e.pipelineStage || "new") === "new").length;
  const inProgressCount = enquiries.filter((e) => ["contacted", "qualified", "proposal_sent", "negotiation"].includes(e.pipelineStage || "")).length;
  const contactedCount = enquiries.filter((e) => (e.pipelineStage || "new") === "contacted").length;
  
  // Pipeline Value (Sum of proposals for open deals)
  const pipelineValue = enquiries
    .filter(e => ["qualified", "proposal_sent", "negotiation"].includes(e.pipelineStage || ""))
    .reduce((acc, curr) => acc + getLeadValue(curr), 0);

  // Closed Revenue (Sum of proposals of won deals)
  const closedRevenue = enquiries
    .filter(e => (e.pipelineStage || "new") === "won" || e.status === "Closed")
    .reduce((acc, curr) => acc + getLeadValue(curr), 0);

  // Conversion rate (Won Deals / Total Leads)
  const wonCount = enquiries.filter(e => e.pipelineStage === "won").length;
  const conversionRate = totalCount > 0 ? Math.round((wonCount / totalCount) * 100) : 0;

  // Timeframes list
  const TIMEFRAMES = ["daily", "weekly", "monthly"] as const;

  // Get monthly trends dynamically
  const getMonthlyTrendData = () => {
    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const now = new Date();
    
    // We want the last 6 months (including the current month)
    const trends = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthLabel = monthNames[d.getMonth()];
      const year = d.getFullYear();
      
      // Count leads created in this month and year
      const count = enquiries.filter(enq => {
        if (!enq.createdAt) return false;
        const createdDate = new Date(enq.createdAt);
        return createdDate.getMonth() === d.getMonth() && createdDate.getFullYear() === year;
      }).length;
      
      trends.push({ label: monthLabel, count, year });
    }
    
    return trends;
  };

  const monthlyTrends = getMonthlyTrendData();
  const maxTrendCount = Math.max(...monthlyTrends.map(t => t.count), 1);
  const trendPoints = monthlyTrends.map((t, idx) => {
    const x = 50 + idx * 80;
    const y = 130 - (t.count / maxTrendCount) * 90; // y between 40 and 130
    return { x, y, count: t.count, label: t.label };
  });

  // Construct SVG paths for Lead volume monthly trend
  const linePathD = `M ${trendPoints[0].x} ${trendPoints[0].y} ` + 
    trendPoints.slice(1).map(p => `L ${p.x} ${p.y}`).join(" ");
    
  const areaPathD = `${linePathD} L ${trendPoints[5].x} 130 L ${trendPoints[0].x} 130 Z`;

  // Get active traffic trend (daily, weekly, monthly)
  const getTrafficTrendPoints = () => {
    const trendData = 
      trafficTimeframe === "daily" ? (analytics.dailyTrend || []) :
      trafficTimeframe === "weekly" ? (analytics.weeklyTrend || []) :
      (analytics.monthlyTrend || []);

    if (trendData.length === 0) return { points: [], maxVal: 1, labels: [] };

    const maxVal = Math.max(...trendData.map(d => Math.max(d.views, d.visitors)), 1);
    const len = trendData.length;
    
    const points = trendData.map((d, idx) => {
      const x = 40 + (idx / (len - 1 || 1)) * 420;
      const yViews = 125 - (d.views / maxVal) * 90;
      const yVisitors = 125 - (d.visitors / maxVal) * 90;
      return {
        x,
        yViews,
        yVisitors,
        views: d.views,
        visitors: d.visitors,
        label: d.label
      };
    });

    return { points, maxVal, labels: trendData.map(d => d.label) };
  };

  const { points: trafficPoints, maxVal: trafficMaxVal } = getTrafficTrendPoints();
  
  // Construct paths for Traffic Trends
  const viewsLineD = trafficPoints.length > 0
    ? `M ${trafficPoints[0].x} ${trafficPoints[0].yViews} ` + trafficPoints.slice(1).map(p => `L ${p.x} ${p.yViews}`).join(" ")
    : "";
  const viewsAreaD = trafficPoints.length > 0
    ? `${viewsLineD} L ${trafficPoints[trafficPoints.length - 1].x} 125 L ${trafficPoints[0].x} 125 Z`
    : "";

  const visitorsLineD = trafficPoints.length > 0
    ? `M ${trafficPoints[0].x} ${trafficPoints[0].yVisitors} ` + trafficPoints.slice(1).map(p => `L ${p.x} ${p.yVisitors}`).join(" ")
    : "";
  const visitorsAreaD = trafficPoints.length > 0
    ? `${visitorsLineD} L ${trafficPoints[trafficPoints.length - 1].x} 125 L ${trafficPoints[0].x} 125 Z`
    : "";

  // HTML5 Drag and Drop Handlers for Kanban
  const handleDragStart = (e: React.DragEvent, leadId: string) => {
    e.dataTransfer.setData("text/plain", leadId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleStageDrop = (e: React.DragEvent, targetStage: string) => {
    e.preventDefault();
    const leadId = e.dataTransfer.getData("text/plain");
    if (leadId) {
      handleStatusChange(leadId, targetStage);
    }
  };

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
      "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300",
      "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300",
      "bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300",
      "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300",
      "bg-pink-100 dark:bg-pink-900/40 text-pink-700 dark:text-pink-300",
      "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300"
    ];
    if (!name) return colors[0];
    const code = name.charCodeAt(0) % colors.length;
    return colors[code];
  };

  const triggerNotificationClick = (leadId: string) => {
    const leadObj = enquiries.find(e => e.id === leadId);
    if (leadObj) {
      setSelectedLead(leadObj);
      setIsDrawerOpen(true);
    }
    setIsNotifOpen(false);
  };

  if (loading && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F19] flex items-center justify-center p-6 inter-font transition-colors duration-200">
        <style dangerouslySetInnerHTML={{ __html: `
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
          .inter-font {
            font-family: 'Inter', sans-serif !important;
          }
        ` }} />
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 border-4 border-slate-200 dark:border-slate-800 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-t-[#2563EB] rounded-full animate-spin"></div>
          </div>
          <div className="text-[10px] font-black text-slate-500 tracking-[0.2em] uppercase animate-pulse mt-2">
            Loading Dashboard CRM v2...
          </div>
        </div>
      </div>
    );
  }

  // Security Login Screen (Clean Light/Dark Glass Card)
  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen ${isDarkMode ? "dark bg-[#0B0F19] text-white" : "bg-[#F1F5F9] text-slate-800"} flex items-center justify-center p-4 sm:p-6 relative overflow-hidden inter-font transition-colors duration-200`}>
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
        
        <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-[32px] p-8 sm:p-10 shadow-2xl relative z-10 transition-all">
          <div className="text-center mb-8 flex flex-col items-center">
            <div className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-orange-500 rounded-2xl flex items-center justify-center shadow-md shadow-blue-500/10 mb-5">
              <span className="font-black text-2xl text-white tracking-tighter">JD</span>
            </div>
            <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5 justify-center">
              Joy<span className="text-gradient">Digital</span>
              <span className="bg-blue-50 dark:bg-blue-900/30 text-[#2563EB] dark:text-blue-400 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded border border-blue-150 dark:border-blue-800 select-none align-middle">
                CRM v2
              </span>
            </span>
            <p className="text-xs text-slate-500 dark:text-slate-450 mt-2.5 max-w-[280px]">
              Access restricted. Input secure passkey pin to unlock customer leads console.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2.5">
              <label className="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest pl-1">
                Security Access PIN
              </label>
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="••••"
                required
                className="w-full text-center tracking-[0.75em] text-2xl font-bold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-950 dark:text-white rounded-2xl px-4 py-4 outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10 transition-all placeholder:text-slate-350"
                autoFocus
              />
            </div>

            {loginError && (
              <p className="text-center text-xs font-bold text-rose-600 bg-rose-50 dark:bg-rose-950/20 border border-rose-150 dark:border-rose-900/30 py-2.5 rounded-xl">
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
      case "dashboard":
        return {
          title: "CRM Admin Dashboard Hub",
          subtitle: "Overview of your marketing statistics, visitor metrics, and leads pipeline",
          icon: "fa-solid fa-gauge"
        };
      case "settings":
        return {
          title: "System Settings & Integrations",
          subtitle: "Configure third-party services, Cloudinary image upload, and verify server parameters",
          icon: "fa-solid fa-gear"
        };
      case "leads":
        return {
          title: "Sales Leads & CRM v2 Pipeline",
          subtitle: "Automate website forms routing, manage lead follow-ups, and build visual deals quotation pipeline",
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
      case "blog":
        return {
          title: "Blog Publisher & CMS Desk",
          subtitle: "Draft modern technical articles, upload thumbnails, manage SEO settings, and generate static articles",
          icon: "fa-regular fa-pen-to-square"
        };
      case "reports":
        return {
          title: "CRM Lead Reports & Analysis",
          subtitle: "Analyze lead acquisition volume, channels, conversion trends, and irrelevant classification",
          icon: "fa-solid fa-chart-line"
        };
      case "chats":
        return {
          title: "Inbound AI Chatbot Logs",
          subtitle: "Audit live conversation transcripts between website visitors and the AI sales assistant",
          icon: "fa-regular fa-comments"
        };
      default:
        return {
          title: "CRM Admin Dashboard",
          subtitle: "Overview of your marketing statistics and leads pipeline",
          icon: "fa-solid fa-gauge"
        };
    }
  };

  const pageMeta = getPageDetails();

  return (
    <div className={`min-h-screen flex text-slate-800 relative overflow-hidden inter-font select-none ${isDarkMode ? "dark dark-theme bg-[#0B0F19] text-slate-200" : "bg-[#F8FAFC] text-slate-800"}`}>
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.01] pointer-events-none" />

      {/* Styles Injection */}
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
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb {
          background: #E2E8F0;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #CBD5E1;
        }
        /* Zoho/HubSpot Light theme overrides */
        .inter-font {
          background-color: #F8FAFC !important;
          color: #0F172A !important;
        }
        .inter-font .text-slate-900,
        .inter-font .text-slate-800,
        .inter-font .text-slate-700 {
          color: #0F172A !important;
        }
        .inter-font .text-slate-500,
        .inter-font .text-slate-450,
        .inter-font .text-slate-400 {
          color: #64748B !important;
        }
        .inter-font .border-slate-200,
        .inter-font .border-slate-200\\/80,
        .inter-font .border-slate-150 {
          border-color: #E2E8F0 !important;
        }
        
        /* Dark Theme Variables implementation */
        .dark-theme {
          background-color: #0B0F19 !important;
          color: #E2E8F0 !important;
        }
        .dark-theme header, .dark-theme aside {
          border-color: #1F2937 !important;
        }
        .dark-theme header {
          background-color: #111827 !important;
        }
        .dark-theme select, .dark-theme input {
          background-color: #1F2937 !important;
          border-color: #374151 !important;
          color: #E2E8F0 !important;
        }
        .dark-theme select option {
          background-color: #1F2937 !important;
          color: #E2E8F0 !important;
        }
        .dark-theme .bg-white {
          background-color: #111827 !important;
          color: #E2E8F0 !important;
        }
        .dark-theme .border-slate-200, .dark-theme .border-slate-200\\/80, .dark-theme .border-slate-150 {
          border-color: #1F2937 !important;
        }
        .dark-theme .text-slate-900 {
          color: #FFFFFF !important;
        }
        .dark-theme .text-slate-800 {
          color: #E2E8F0 !important;
        }
        .dark-theme .text-slate-500, .dark-theme .text-slate-450, .dark-theme .text-slate-400 {
          color: #9CA3AF !important;
        }
        .dark-theme .bg-slate-50 {
          background-color: #1E293B !important;
        }
        .dark-theme .bg-slate-50\\/70 {
          background-color: #1E293B/80 !important;
        }
        .dark-theme ::-webkit-scrollbar-thumb {
          background: #374151;
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
                { id: "dashboard", label: "Dashboard Hub", icon: "fa-solid fa-gauge" },
                { id: "leads", label: "CRM Pipeline v2", icon: "fa-regular fa-address-book" },
                { id: "blog", label: "Blog Editor Desk", icon: "fa-regular fa-pen-to-square" }
              ].map((tab) => {
                const isTabActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id as any);
                      if (tab.id === "dashboard") {
                        fetchEnquiries();
                        fetchAnalytics();
                        fetchChatSessions();
                      }
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
                { id: "heatmaps", label: "Session Heatmaps", icon: "fa-regular fa-eye" },
                { id: "reports", label: "CRM Reports", icon: "fa-solid fa-chart-line" },
                { id: "chats", label: "Live Chat Logs", icon: "fa-regular fa-comments" }
              ].map((tab) => {
                const isTabActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id as any);
                      if (tab.id === "map") fetchAnalytics();
                      if (tab.id === "chats") fetchChatSessions();
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

          {/* SETTINGS HUB SECTION */}
          <div className="pt-4 border-t border-slate-800">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-3 block mb-2 md:hidden lg:block select-none">
              System Configuration
            </span>
            <div className="space-y-1">
              <button
                onClick={() => {
                  setActiveTab("settings");
                  fetchSettings();
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3.5 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all duration-150 text-left cursor-pointer group ${
                  activeTab === "settings"
                    ? "bg-[#2563EB] text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                }`}
                title="System Settings"
              >
                <i className="fa-solid fa-gear text-sm shrink-0 w-5 text-center" />
                <span className="md:hidden lg:inline">Settings Hub</span>
              </button>
            </div>
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t border-slate-800 p-4 space-y-2">
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
      <main className="flex-1 h-screen overflow-y-auto bg-[#F8FAFC] dark:bg-[#0B0F19] flex flex-col min-w-0 transition-colors duration-200">
        
        {/* Top Header Panel (Modern SaaS Header Layout) */}
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800/80 sticky top-0 z-30 px-6 flex items-center justify-between shrink-0 transition-colors duration-200">
          <div className="flex items-center gap-3.5">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden w-8 h-8 border border-slate-200 dark:border-slate-700 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 cursor-pointer transition-colors"
            >
              <i className="fa-solid fa-bars text-sm" />
            </button>
            
            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-250 dark:border-emerald-900/30 px-2 py-0.5 rounded text-[10px] font-bold text-emerald-700 dark:text-emerald-400">
                <span className="relative flex h-1.5 w-1.5 mr-0.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
                <span>Active DB</span>
              </div>
              
              <div className="hidden sm:flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded text-[10px] font-bold text-slate-500 dark:text-slate-400 font-mono">
                <span className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse" />
                <span>LIVE: {liveTime || "00:00:00"}</span>
              </div>

              {/* Role Scope Alert Badge */}
              {currentRole !== "Super Admin" && (
                <div className="text-[10px] font-black text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 px-2 py-0.5 rounded flex items-center gap-1">
                  <i className="fa-solid fa-shield-halved" /> {currentRole} View
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            
            {/* Role Manager Selector */}
            <div className="relative text-xs">
              <select
                value={currentRole}
                onChange={(e: any) => setCurrentRole(e.target.value)}
                className="bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold border border-slate-250 dark:border-slate-700 px-2.5 py-1.5 rounded-xl cursor-pointer outline-none text-[11px]"
              >
                <option value="Super Admin">Super Admin</option>
                <option value="Manager">Sales Manager</option>
                <option value="Sales Executive">Executive (Priya S)</option>
                <option value="Marketing">Marketing Specialist</option>
              </select>
            </div>


            {/* Smart Notification Center Bell */}
            <div className="relative">
              <button 
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="w-8 h-8 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white bg-white dark:bg-slate-900 relative transition-colors cursor-pointer"
              >
                <i className="fa-regular fa-bell text-sm" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-600 text-white font-extrabold text-[8.5px] w-4.5 h-4.5 rounded-full flex items-center justify-center border border-white">
                    {notifications.length}
                  </span>
                )}
              </button>

              {isNotifOpen && (
                <div className="absolute right-0 top-10 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-40 py-2.5 animate-fade-in text-left">
                  <div className="px-4 py-1.5 border-b border-slate-150 dark:border-slate-800 flex justify-between items-center">
                    <span className="text-[10px] font-black text-slate-450 dark:text-slate-400 uppercase tracking-widest">System Alerts ({notifications.length})</span>
                    <button 
                      onClick={() => setNotifications([])} 
                      className="text-[9px] font-bold text-blue-600 dark:text-blue-400 bg-transparent cursor-pointer"
                    >
                      Clear All
                    </button>
                  </div>
                  <div className="max-h-72 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((n) => {
                        let icon = "fa-solid fa-circle-dot text-slate-400";
                        if (n.type === "reminder") icon = "fa-solid fa-calendar-circle-exclamation text-rose-500";
                        else if (n.type === "idle") icon = "fa-solid fa-user-clock text-amber-500";
                        else if (n.type === "new") icon = "fa-solid fa-sparkles text-blue-500";

                        return (
                          <div 
                            key={n.id} 
                            onClick={() => triggerNotificationClick(n.leadId)}
                            className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800/40 cursor-pointer flex gap-3 items-start"
                          >
                            <i className={`${icon.split(" ")[0]} ${icon.split(" ")[1]} text-xs shrink-0 mt-0.5`} />
                            <div className="space-y-0.5 text-xs">
                              <div className="font-extrabold text-slate-850 dark:text-white leading-tight">{n.title}</div>
                              <div className="text-[11px] text-slate-600 dark:text-slate-400">{n.message}</div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="py-8 text-center text-slate-400 dark:text-slate-500 italic text-[11px]">
                        No new system alerts or action reminders.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Add Button */}
            <button
              onClick={() => setIsQuickAddOpen(true)}
              className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white text-xs font-bold px-3.5 py-1.75 rounded-xl shadow-sm hover:shadow transition-all cursor-pointer flex items-center gap-1.5 border border-transparent"
            >
              <i className="fa-solid fa-plus text-[10px]" />
              <span className="hidden sm:inline">Add Lead</span>
            </button>

            {/* User Profile Avatar */}
            <div className="w-8 h-8 bg-blue-600 border border-blue-500 text-white rounded-full flex items-center justify-center font-bold text-xs select-none">
              JD
            </div>
          </div>
        </header>

        {/* Content Container */}
        <div className="flex-1 overflow-y-auto px-6 py-8 max-w-[1440px] w-full mx-auto">
          
          {/* Page Title & Subtitle block */}
          <div className="mb-8 flex justify-between items-end flex-wrap gap-4">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">{pageMeta.title}</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">{pageMeta.subtitle}</p>
            </div>
            
            {/* View Mode Toolbar Toggle */}
            {activeTab === "leads" && (
              <div className="flex bg-white dark:bg-slate-900 p-1 border border-slate-200 dark:border-slate-850 rounded-xl shadow-xs shrink-0">
                {[
                  { mode: "list", label: "List View", icon: "fa-solid fa-table-list" },
                  { mode: "kanban", label: "Pipeline board", icon: "fa-solid fa-chart-simple" },
                  { mode: "analytics", label: "Sales Analytics", icon: "fa-solid fa-chart-pie" }
                ].map((v) => (
                  <button
                    key={v.mode}
                    onClick={() => setViewMode(v.mode as any)}
                    className={`px-3 py-1.5 rounded-lg text-[10.5px] font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      viewMode === v.mode
                        ? "bg-[#2563EB] text-white shadow-xs"
                        : "text-slate-500 dark:text-slate-450 hover:text-slate-850 dark:hover:text-white"
                    }`}
                  >
                    <i className={`${v.icon} text-[11px]`} />
                    <span>{v.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* TAB CONTENT: Dashboard Hub */}
          {activeTab === "dashboard" && (
            <div className="space-y-8 animate-fade-in text-left">
              {/* Six KPI Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5">
                {/* 1. Total Pageviews */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4.5 shadow-[0_4px_20px_rgba(15,23,42,0.04)] flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Page Views</span>
                    <span className="text-2xl font-extrabold text-slate-900 dark:text-white leading-tight block">{analytics.totalPageviews.toLocaleString()}</span>
                    <span className="text-[10px] text-slate-400 font-medium">All-time traffic</span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800 flex items-center justify-center text-purple-650 dark:text-purple-400 text-sm shrink-0">
                    <i className="fa-regular fa-eye" />
                  </div>
                </div>

                {/* 2. Unique Visitors */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4.5 shadow-[0_4px_20px_rgba(15,23,42,0.04)] flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Visitors</span>
                    <span className="text-2xl font-extrabold text-slate-900 dark:text-white leading-tight block">{analytics.uniqueVisitors.toLocaleString()}</span>
                    <span className="text-[10px] text-slate-400 font-medium">Unique clusters</span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 flex items-center justify-center text-indigo-650 dark:text-indigo-400 text-sm shrink-0">
                    <i className="fa-regular fa-user" />
                  </div>
                </div>

                {/* 3. Total Leads */}
                <div 
                  onClick={() => setActiveTab("leads")}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4.5 shadow-[0_4px_20px_rgba(15,23,42,0.04)] flex items-center justify-between hover:shadow-[0_10px_30px_rgba(15,23,42,0.06)] hover:-translate-y-[2px] transition-all duration-150 cursor-pointer group"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider block group-hover:text-[#2563EB]">Total Leads</span>
                    <span className="text-2xl font-extrabold text-slate-900 dark:text-white leading-tight block">{totalCount}</span>
                    <span className="text-[10px] text-emerald-605 font-bold"><i className="fa-solid fa-arrow-trend-up" /> Inbound CRM</span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 flex items-center justify-center text-[#2563EB] dark:text-blue-400 text-sm shrink-0">
                    <i className="fa-regular fa-folder-open" />
                  </div>
                </div>

                {/* 4. Conversion Rate */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4.5 shadow-[0_4px_20px_rgba(15,23,42,0.04)] flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Conversion</span>
                    <span className="text-2xl font-extrabold text-slate-900 dark:text-white leading-tight block">{conversionRate}%</span>
                    <span className="text-[10px] text-[#2563EB] dark:text-blue-450 font-bold">{wonCount} Deals Won</span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 text-sm shrink-0">
                    <i className="fa-solid fa-arrows-spin animate-spin-slow" />
                  </div>
                </div>

                {/* 5. Pipeline Value */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4.5 shadow-[0_4px_20px_rgba(15,23,42,0.04)] flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Pipeline Value</span>
                    <span className="text-xl font-black text-slate-900 dark:text-white leading-tight block">₹{pipelineValue.toLocaleString()}</span>
                    <span className="text-[10px] text-amber-600 font-bold">Active Deals</span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400 text-sm shrink-0">
                    <i className="fa-regular fa-file-pdf" />
                  </div>
                </div>

                {/* 6. Closed Revenue */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4.5 shadow-[0_4px_20px_rgba(15,23,42,0.04)] flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Closed Revenue</span>
                    <span className="text-xl font-black text-emerald-600 dark:text-emerald-400 leading-tight block">₹{closedRevenue.toLocaleString()}</span>
                    <span className="text-[10px] text-emerald-600 font-bold"><i className="fa-solid fa-check" /> Booked</span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-sm shrink-0">
                    <i className="fa-regular fa-circle-check" />
                  </div>
                </div>
              </div>

              {/* Two Column Grid layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* LEFT COLUMN (8 cols): Recent Leads & Visitor Map Preview */}
                <div className="lg:col-span-8 space-y-8">
                  
                  {/* Traffic Performance Trends Card */}
                  <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between transition-colors duration-200 text-left">
                    <div>
                      <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
                        <div>
                          <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                            <i className="fa-solid fa-chart-line text-[#2563EB]" /> Traffic Performance Trends
                          </h3>
                          <p className="text-[10px] text-slate-500 mt-0.5">Page views and unique visitors tracking metrics</p>
                        </div>
                        {/* Timeframe selector toggles */}
                        <div className="flex bg-slate-50 dark:bg-slate-850 p-1 border border-slate-200/60 dark:border-slate-800 rounded-xl shadow-xs">
                          {TIMEFRAMES.map((t) => (
                            <button
                              key={t}
                              type="button"
                              onClick={() => setTrafficTimeframe(t)}
                              className={`px-3 py-1 rounded-lg text-[9.5px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                                trafficTimeframe === t
                                  ? "bg-[#2563EB] text-white shadow-xs"
                                  : "text-slate-500 dark:text-slate-400 hover:text-slate-855 dark:hover:text-white"
                              }`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Line Chart */}
                      <div className="relative py-2 w-full h-48">
                        {trafficPoints.length === 0 ? (
                          <div className="absolute inset-0 flex items-center justify-center text-xs text-slate-455 italic">
                            No traffic data populated yet.
                          </div>
                        ) : (
                          <svg className="w-full h-full" viewBox="0 0 500 150">
                            <defs>
                              <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#2563EB" stopOpacity="0.12" />
                                <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
                              </linearGradient>
                              <linearGradient id="visitorsGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#9333EA" stopOpacity="0.12" />
                                <stop offset="100%" stopColor="#9333EA" stopOpacity="0" />
                              </linearGradient>
                            </defs>

                            {/* Horizontal Grid lines */}
                            <line x1="40" y1="35" x2="460" y2="35" stroke="#F1F5F9" strokeWidth="1" className="dark:stroke-slate-800" />
                            <line x1="40" y1="80" x2="460" y2="80" stroke="#F1F5F9" strokeWidth="1" className="dark:stroke-slate-800" />
                            <line x1="40" y1="125" x2="460" y2="125" stroke="#E2E8F0" strokeWidth="1.5" className="dark:stroke-slate-800" />

                            {/* Fills */}
                            <path d={viewsAreaD} fill="url(#viewsGrad)" />
                            <path d={visitorsAreaD} fill="url(#visitorsGrad)" />

                            {/* Paths */}
                            <path d={viewsLineD} fill="none" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                            <path d={visitorsLineD} fill="none" stroke="#9333EA" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

                            {/* X Labels */}
                            {trafficPoints.map((p, idx) => {
                              const skipLabel = trafficTimeframe === "daily" && idx % 2 !== 0;
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
                            {trafficPoints.map((p, idx) => (
                              <g key={`v-${idx}`} className="group/v cursor-pointer">
                                <circle cx={p.x} cy={p.yViews} r="3.5" fill="#2563EB" stroke="#FFFFFF" strokeWidth="1" />
                                <circle cx={p.x} cy={p.yViews} r="7" fill="#2563EB" opacity="0" className="hover:opacity-20 transition-opacity" />
                                <title>{p.views} Page Views in {p.label}</title>
                              </g>
                            ))}

                            {/* Dots for Visitors */}
                            {trafficPoints.map((p, idx) => (
                              <g key={`u-${idx}`} className="group/u cursor-pointer">
                                <circle cx={p.x} cy={p.yVisitors} r="3.5" fill="#9333EA" stroke="#FFFFFF" strokeWidth="1" />
                                <circle cx={p.x} cy={p.yVisitors} r="7" fill="#9333EA" opacity="0" className="hover:opacity-20 transition-opacity" />
                                <title>{p.visitors} Unique Visitors in {p.label}</title>
                              </g>
                            ))}
                          </svg>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-4.5 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-[10px] font-black uppercase tracking-wider shrink-0 select-none">
                      <span className="flex items-center gap-1.5 text-blue-650 dark:text-blue-400">
                        <span className="w-2.5 h-2.5 bg-blue-600 dark:bg-blue-400 rounded-full inline-block" /> Page Views
                      </span>
                      <span className="flex items-center gap-1.5 text-purple-605 dark:text-purple-400">
                        <span className="w-2.5 h-2.5 bg-purple-600 dark:bg-purple-400 rounded-full inline-block" /> Unique Visitors
                      </span>
                    </div>
                  </div>

                  {/* Recent Inbound Leads Card */}
                  <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
                    <div className="flex justify-between items-center mb-5 pb-3 border-b border-slate-100 dark:border-slate-800/80">
                      <div>
                        <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Recent Inbound Leads</h3>
                        <p className="text-[10px] text-slate-500 mt-0.5">Latest contact submissions from website forms</p>
                      </div>
                      <button 
                        onClick={() => setActiveTab("leads")}
                        className="text-[10px] font-black text-[#2563EB] dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        Open CRM Pipeline <i className="fa-solid fa-arrow-right text-[9px]" />
                      </button>
                    </div>

                    <div className="space-y-3.5">
                      {enquiries.slice(0, 5).map((enq) => {
                        const displayStage = enq.pipelineStage || "new";
                        const stageInfo = PIPELINE_STAGES.find(s => s.value === displayStage) || PIPELINE_STAGES[0];
                        return (
                          <div 
                            key={enq.id}
                            className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50/50 dark:bg-slate-850/40 border border-slate-150 dark:border-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all"
                          >
                            <div className="flex items-center gap-3.5 min-w-0">
                              <div className={`w-8.5 h-8.5 rounded-full flex items-center justify-center font-bold text-xs shrink-0 select-none ${getAvatarBg(enq.name)}`}>
                                {getAvatarInitials(enq.name)}
                              </div>
                              <div className="text-left min-w-0">
                                <h4 className="font-bold text-slate-900 dark:text-white text-xs truncate">{enq.name}</h4>
                                <p className="text-[10px] text-slate-450 dark:text-slate-500 mt-0.5 truncate">
                                  {enq.companyName !== "N/A" ? enq.companyName : "Individual"} • {enq.service}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 shrink-0">
                              <span className={`text-[8.5px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${stageInfo.color}`}>
                                {stageInfo.label}
                              </span>
                              <button
                                onClick={() => {
                                  setSelectedLead(enq);
                                  setIsDrawerOpen(true);
                                }}
                                className="w-8 h-8 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-xs"
                              >
                                <i className="fa-regular fa-eye text-xs" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                      {enquiries.length === 0 && (
                        <div className="py-12 text-center text-slate-400 italic text-xs">No leads registered yet.</div>
                      )}
                    </div>
                  </div>

                  {/* Geolocation Map Card */}
                  <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
                    <div className="flex justify-between items-center mb-5 pb-3 border-b border-slate-100 dark:border-slate-800/80">
                      <div>
                        <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Visitor Origins Map</h3>
                        <p className="text-[10px] text-slate-500 mt-0.5">Real-time geolocation distribution of traffic</p>
                      </div>
                      <button 
                        onClick={() => { setActiveTab("map"); fetchAnalytics(); }}
                        className="text-[10px] font-black text-[#2563EB] dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        Expand Map View <i className="fa-solid fa-arrow-right text-[9px]" />
                      </button>
                    </div>
                    <VisitorMap markers={analytics.mapMarkers} />
                  </div>

                </div>

                {/* RIGHT COLUMN (4 cols): Alerts, Chat Log Previews & Top Cities */}
                <div className="lg:col-span-4 space-y-8">
                  
                  {/* Task Alerts / Notifications Panel */}
                  <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col max-h-[350px]">
                    <div className="flex justify-between items-center mb-4 pb-2.5 border-b border-slate-100 dark:border-slate-800/80 shrink-0">
                      <div>
                        <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Active System Alerts</h3>
                        <p className="text-[9.5px] text-slate-500 mt-0.5">Actionable reminders and alerts</p>
                      </div>
                      {notifications.length > 0 && (
                        <span className="bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-455 px-2 py-0.5 rounded text-[8.5px] font-extrabold border border-rose-100 dark:border-rose-900/30">
                          {notifications.length} Alerts
                        </span>
                      )}
                    </div>
                    <div className="flex-1 overflow-y-auto space-y-3.5 pr-1">
                      {notifications.slice(0, 5).map((n) => {
                        let icon = "fa-solid fa-circle-dot text-slate-400";
                        if (n.type === "reminder") icon = "fa-solid fa-calendar-circle-exclamation text-rose-500";
                        else if (n.type === "idle") icon = "fa-solid fa-user-clock text-amber-500";
                        else if (n.type === "new") icon = "fa-solid fa-sparkles text-blue-500";

                        return (
                          <div 
                            key={n.id} 
                            onClick={() => triggerNotificationClick(n.leadId)}
                            className="p-3 rounded-2xl bg-slate-50/50 dark:bg-slate-850/40 border border-slate-150 dark:border-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all cursor-pointer flex gap-3 items-start text-left"
                          >
                            <i className={`${icon.split(" ")[0]} ${icon.split(" ")[1]} text-xs shrink-0 mt-0.5`} />
                            <div className="space-y-0.5 text-xs min-w-0 font-semibold">
                              <div className="font-bold text-slate-850 dark:text-white leading-tight truncate">{n.title}</div>
                              <div className="text-[10px] text-slate-600 dark:text-slate-450 leading-snug">{n.message}</div>
                            </div>
                          </div>
                        );
                      })}
                      {notifications.length === 0 && (
                        <div className="py-12 text-center text-slate-400 dark:text-slate-500 italic text-[11px]">
                          No active system alerts.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* AI Chat Log Previews */}
                  <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col max-h-[380px]">
                    <div className="flex justify-between items-center mb-4 pb-2.5 border-b border-slate-100 dark:border-slate-800/80 shrink-0">
                      <div>
                        <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Recent AI Chats</h3>
                        <p className="text-[9.5px] text-slate-500 mt-0.5">Transcripts audit logs preview</p>
                      </div>
                      <button 
                        onClick={() => { setActiveTab("chats"); fetchChatSessions(); }}
                        className="text-[10px] font-black text-[#2563EB] dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        All Chats <i className="fa-solid fa-arrow-right text-[9px]" />
                      </button>
                    </div>
                    <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                      {chatSessions.slice(0, 4).map((session) => {
                        return (
                          <div 
                            key={session.sessionId} 
                            onClick={() => { setActiveTab("chats"); fetchChatSessionDetails(session.sessionId); }}
                            className="p-3 rounded-xl bg-slate-50/50 dark:bg-slate-850/40 border border-slate-150 dark:border-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all cursor-pointer flex justify-between items-center text-left"
                          >
                            <div className="min-w-0 space-y-0.5">
                              <span className="font-bold text-slate-900 dark:text-white text-xs block truncate">
                                {session.name || "Anonymous Visitor"}
                              </span>
                              <span className="text-[9px] font-mono text-slate-400 block font-medium">Ref: {session.sessionId.substring(0, 8)}</span>
                            </div>
                            <div className="text-right shrink-0">
                              <span className="bg-purple-50 dark:bg-purple-950/20 text-purple-650 dark:text-purple-400 border border-purple-100 dark:border-purple-900/30 px-1.5 py-0.25 rounded text-[8.5px] font-extrabold block">
                                {session.messageCount} msg
                              </span>
                            </div>
                          </div>
                        );
                      })}
                      {chatSessions.length === 0 && (
                        <div className="py-12 text-center text-slate-450 dark:text-slate-500 italic text-[11px]">
                          No chat conversations yet.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Top Cities Metrics card */}
                  <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
                    <h3 className="font-extrabold text-sm text-slate-900 dark:text-white mb-4 pb-2 border-b border-slate-100 dark:border-slate-800/80">
                      Top Visitor Cities
                    </h3>
                    <div className="space-y-3.5 font-semibold">
                      {analytics.topCities.slice(0, 5).map((cityItem, cIdx) => (
                        <div key={cIdx} className="flex justify-between items-center text-xs text-slate-700 dark:text-slate-350">
                          <span className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 flex items-center justify-center text-[9px] font-black">{cIdx + 1}</span>
                            <span>{cityItem.city || "Unknown City"}, {cityItem.country}</span>
                          </span>
                          <span className="bg-blue-50 dark:bg-blue-950/20 text-[#2563EB] dark:text-blue-455 border border-blue-100 dark:border-blue-900/30 px-2 py-0.5 rounded text-[9.5px] font-extrabold font-mono">
                            {cityItem.count} views
                          </span>
                        </div>
                      ))}
                      {analytics.topCities.length === 0 && (
                        <div className="py-8 text-center text-slate-455 italic text-[11px]">No geolocation data.</div>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT: Leads CRM Manager */}
          {activeTab === "leads" && (
            <div className="space-y-6 animate-fade-in">
              
              {/* Four KPI Cards Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* KPI Card 1: Total Enquiries */}
                <div 
                  onClick={() => { resetFilters(); setViewMode("list"); }}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-[0_4px_20px_rgba(15,23,42,0.04)] flex items-center justify-between hover:shadow-[0_10px_30px_rgba(15,23,42,0.06)] hover:-translate-y-[2px] transition-all duration-150 cursor-pointer group"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Total Leads</span>
                    <span className="text-3xl font-extrabold text-slate-900 dark:text-white leading-tight block">{totalCount}</span>
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600">
                      <span className="bg-emerald-50 dark:bg-emerald-950/20 px-1.5 py-0.5 rounded"><i className="fa-solid fa-arrow-trend-up mr-0.5" /> +12%</span>
                      <span className="text-slate-400 font-medium">this month</span>
                    </div>
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 flex items-center justify-center text-[#2563EB] dark:text-blue-400 text-base shadow-sm shrink-0">
                    <i className="fa-regular fa-folder-open" />
                  </div>
                </div>

                {/* KPI Card 2: Conversion Rate */}
                <div 
                  onClick={() => { resetFilters(); setStageFilter("won"); setViewMode("list"); }}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-[0_4px_20px_rgba(15,23,42,0.04)] flex items-center justify-between hover:shadow-[0_10px_30px_rgba(15,23,42,0.06)] hover:-translate-y-[2px] transition-all duration-150 cursor-pointer group"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Conversion Rate</span>
                    <span className="text-3xl font-extrabold text-slate-900 dark:text-white leading-tight block">{conversionRate}%</span>
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#2563EB] dark:text-blue-450">
                      <span className="bg-blue-50 dark:bg-blue-950/20 px-1.5 py-0.5 rounded">{wonCount} Deals Won</span>
                    </div>
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-orange-50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 text-base shadow-sm shrink-0">
                    <i className="fa-solid fa-arrows-spin animate-spin-slow" />
                  </div>
                </div>

                {/* KPI Card 3: Pipeline Value */}
                <div 
                  onClick={() => setViewMode("analytics")}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-[0_4px_20px_rgba(15,23,42,0.04)] flex items-center justify-between hover:shadow-[0_10px_30px_rgba(15,23,42,0.06)] hover:-translate-y-[2px] transition-all duration-150 cursor-pointer group"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Pipeline Value</span>
                    <span className="text-2xl font-black text-slate-900 dark:text-white leading-tight block">₹{pipelineValue.toLocaleString()}</span>
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-amber-600">
                      <span className="bg-amber-50 dark:bg-amber-950/20 px-1.5 py-0.5 rounded">Active Deals</span>
                    </div>
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400 text-base shadow-sm shrink-0">
                    <i className="fa-regular fa-file-pdf" />
                  </div>
                </div>

                {/* KPI Card 4: Won Revenue */}
                <div 
                  onClick={() => { resetFilters(); setStageFilter("won"); setViewMode("list"); }}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-[0_4px_20px_rgba(15,23,42,0.04)] flex items-center justify-between hover:shadow-[0_10px_30px_rgba(15,23,42,0.06)] hover:-translate-y-[2px] transition-all duration-150 cursor-pointer group"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Closed Revenue</span>
                    <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 leading-tight block">₹{closedRevenue.toLocaleString()}</span>
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600">
                      <span className="bg-emerald-50 dark:bg-emerald-950/20 px-1.5 py-0.5 rounded"><i className="fa-solid fa-check mr-0.5" /> Booked</span>
                    </div>
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-base shadow-sm shrink-0">
                    <i className="fa-regular fa-circle-check" />
                  </div>
                </div>

              </div>

              {/* VIEW 1: LIST TABLE VIEW */}
              {viewMode === "list" && (
                <div className="space-y-6">
                  
                  {/* Two-Row Search & Filters toolbar */}
                  <div className="bg-white dark:bg-slate-900 border border-slate-200/85 dark:border-slate-800 rounded-2xl p-5 shadow-[0_4px_20px_rgba(15,23,42,0.02)] space-y-4">
                    {/* Row 1: Full-width Search */}
                    <div className="relative w-full">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                        <i className="fa-solid fa-magnifying-glass text-[12px]" />
                      </span>
                      <input
                        type="text"
                        placeholder="Search by lead name, company, email, phone, requirements, notes..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full text-xs pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white rounded-xl outline-none focus:bg-white focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/5 transition-all duration-150 font-medium"
                      />
                    </div>

                    {/* Row 2: Secondary filter row with equal height dropdown inputs */}
                    <div className="flex flex-col xl:flex-row gap-4 items-center justify-between">
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3.5 w-full xl:w-auto flex-1">
                        <div className="flex flex-col gap-1">
                          <select
                            value={serviceFilter}
                            onChange={(e) => setServiceFilter(e.target.value)}
                            className="w-full text-[11px] px-3 py-2 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 outline-none rounded-xl focus:border-[#2563EB] focus:bg-white focus:ring-4 focus:ring-[#2563EB]/5 font-semibold h-[38px] cursor-pointer"
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
                            value={stageFilter}
                            onChange={(e) => setStageFilter(e.target.value)}
                            className="w-full text-[11px] px-3 py-2 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 outline-none rounded-xl focus:border-[#2563EB] focus:bg-white focus:ring-4 focus:ring-[#2563EB]/5 font-semibold h-[38px] cursor-pointer"
                          >
                            <option value="all">All stages</option>
                            {PIPELINE_STAGES.map((st) => (
                              <option key={st.value} value={st.value}>{st.label}</option>
                            ))}
                          </select>
                        </div>

                        <div className="flex flex-col gap-1">
                          <select
                            value={regionFilter}
                            onChange={(e) => setRegionFilter(e.target.value)}
                            className="w-full text-[11px] px-3 py-2 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 outline-none rounded-xl focus:border-[#2563EB] focus:bg-white focus:ring-4 focus:ring-[#2563EB]/5 font-semibold h-[38px] cursor-pointer"
                          >
                            <option value="all">All Regions</option>
                            <option value="US">US</option>
                            <option value="UK">UK</option>
                            <option value="AE">UAE</option>
                            <option value="IN">India</option>
                            <option value="GLOBAL">Global</option>
                          </select>
                        </div>

                        <div className="flex flex-col gap-1">
                          <select
                            value={assignedFilter}
                            onChange={(e) => setAssignedFilter(e.target.value)}
                            className="w-full text-[11px] px-3 py-2 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 outline-none rounded-xl focus:border-[#2563EB] focus:bg-white focus:ring-4 focus:ring-[#2563EB]/5 font-semibold h-[38px] cursor-pointer"
                          >
                            <option value="all">All Assignments</option>
                            {TEAM_MEMBERS.map((m) => (
                              <option key={m.value} value={m.value}>{m.name.split(" (")[0]}</option>
                            ))}
                          </select>
                        </div>

                        {/* Compact Table mode button selector */}
                        <div className="flex items-center">
                          <button
                            onClick={() => setIsCompact(!isCompact)}
                            className={`w-full text-[11px] font-bold h-[38px] rounded-xl border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                              isCompact
                                ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800"
                                : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-750 text-slate-655 dark:text-slate-300 hover:bg-slate-100"
                            }`}
                          >
                            <i className="fa-solid fa-compress" /> {isCompact ? "Compact Mode" : "Normal Row Height"}
                          </button>
                        </div>
                      </div>

                      {/* Filters controls block */}
                      <div className="flex gap-2.5 shrink-0 w-full xl:w-auto justify-end">
                        <button
                          onClick={handleLoadSavedFilters}
                          className="h-[38px] bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 font-bold text-[11px] px-4 rounded-xl transition-all cursor-pointer flex items-center gap-1 border border-slate-200 dark:border-slate-700"
                          title="Load filter presets"
                        >
                          <i className="fa-regular fa-folder-open" /> Load Saved
                        </button>
                        <button
                          onClick={handleSaveFilter}
                          className="h-[38px] bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 font-bold text-[11px] px-4 rounded-xl transition-all cursor-pointer flex items-center gap-1 border border-slate-200 dark:border-slate-700"
                          title="Save active filter presets"
                        >
                          <i className="fa-regular fa-floppy-disk" /> Save Preset
                        </button>
                        <button
                          onClick={resetFilters}
                          className="h-[38px] bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 font-extrabold text-[11px] px-4 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 border border-transparent shadow-sm shrink-0"
                        >
                          <i className="fa-solid fa-arrow-rotate-left" /> Reset
                        </button>
                        
                        {/* CSV Export */}
                        <button
                          onClick={exportToCSV}
                          className="h-[38px] bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[11px] px-4 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                        >
                          <i className="fa-solid fa-file-csv text-[13px]" /> Export CSV
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* TABLE VIEW (Hidden on Mobile screens, visible on Tablet/Desktop) */}
                  <div className="hidden md:block bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-[0_4px_20px_rgba(15,23,42,0.04)] overflow-hidden mb-12 relative transition-colors duration-200">
                    {filteredEnquiries.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse border-spacing-0">
                          <thead>
                            <tr className="bg-slate-50/70 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 select-none sticky top-0 z-10 backdrop-blur-sm">
                              <th className={`px-6 ${isCompact ? "py-3" : "py-4.5"}`}>Lead Name</th>
                              <th className={`px-6 ${isCompact ? "py-3" : "py-4.5"}`}>Contact Detail</th>
                              <th className={`px-6 ${isCompact ? "py-3" : "py-4.5"}`}>Reminders</th>
                              <th className={`px-6 ${isCompact ? "py-3" : "py-4.5"}`}>Assignment</th>
                              <th className={`px-6 ${isCompact ? "py-3" : "py-4.5"}`}>Target Service</th>
                              <th className={`px-6 ${isCompact ? "py-3" : "py-4.5"}`}>Stage</th>
                              <th className={`px-6 ${isCompact ? "py-3" : "py-4.5"} text-right`}>Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-150 dark:divide-slate-800/80 text-xs">
                            {filteredEnquiries.map((enq) => {
                              const displayStage = enq.pipelineStage || "new";
                              const stageInfo = PIPELINE_STAGES.find(s => s.value === displayStage) || PIPELINE_STAGES[0];
                              const cleanedMobile = (enq.mobile || "").replace(/\D/g, "");
                              
                              // Check reminder due status
                              let reminderBadge = null;
                              if (enq.followUpDate) {
                                const followDate = new Date(enq.followUpDate);
                                const isOverdue = followDate < new Date();
                                const isToday = followDate.toDateString() === new Date().toDateString();
                                
                                if (isOverdue) {
                                  reminderBadge = (
                                    <span className="bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-450 border border-rose-100 dark:border-rose-900/30 px-2 py-0.5 rounded text-[8.5px] font-extrabold flex items-center gap-1 w-max">
                                      <i className="fa-solid fa-circle-exclamation" /> Overdue
                                    </span>
                                  );
                                } else if (isToday) {
                                  reminderBadge = (
                                    <span className="bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-450 border border-amber-100 dark:border-amber-900/30 px-2 py-0.5 rounded text-[8.5px] font-extrabold flex items-center gap-1 w-max">
                                      <i className="fa-solid fa-clock-three animate-pulse" /> Today
                                    </span>
                                  );
                                } else {
                                  reminderBadge = (
                                    <span className="bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-450 border border-blue-100 dark:border-blue-900/30 px-2 py-0.5 rounded text-[8.5px] font-bold flex items-center gap-1 w-max">
                                      <i className="fa-solid fa-calendar-day" /> {followDate.toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                                    </span>
                                  );
                                }
                              }

                              return (
                                <tr key={enq.id} className={`${isCompact ? "h-[54px]" : "h-[72px]"} hover:bg-slate-50/40 dark:hover:bg-slate-800/10 transition-all duration-150`}>
                                  <td className="px-6 py-2 whitespace-nowrap">
                                    <div className="flex items-center gap-3">
                                      {/* Initials Avatar */}
                                      <div className={`w-8.5 h-8.5 rounded-full flex items-center justify-center font-bold text-xs shrink-0 select-none ${getAvatarBg(enq.name)}`}>
                                        {getAvatarInitials(enq.name)}
                                      </div>
                                      <div>
                                        <div className="font-bold text-slate-900 dark:text-white text-[13px]">{enq.name}</div>
                                        {enq.companyName !== "N/A" ? (
                                          <div className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold mt-0.5">{enq.companyName}</div>
                                        ) : (
                                          <div className="text-[10px] text-slate-400 dark:text-slate-500 italic mt-0.5">Individual Lead</div>
                                        )}
                                        
                                        {displayStage === "irrelevant" && enq.irrelevantReason && (
                                          <div className="mt-1 flex items-center gap-1.5 select-none">
                                            <span className="bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-450 border border-rose-100 dark:border-rose-900/30 px-1.5 py-0.25 rounded text-[8.5px] font-extrabold flex items-center gap-1">
                                              <i className="fa-solid fa-ban text-[8px]" /> {getReasonLabel(enq.irrelevantReason)}
                                            </span>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </td>
                                  
                                  {/* Contact and WhatsApp shortcut */}
                                  <td className="px-6 py-2">
                                    <div className="flex flex-col gap-0.5 justify-center">
                                      <div className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-350">
                                        <a href={`tel:${enq.mobile}`} className="hover:text-[#2563EB] hover:underline flex items-center gap-1">
                                          <i className="fa-solid fa-phone text-slate-400 text-[10px]" /> {enq.mobile}
                                        </a>
                                        
                                        {/* Click to WhatsApp icon link */}
                                        <a 
                                          href={`https://wa.me/${cleanedMobile}?text=${encodeURIComponent(`Hi ${enq.name}, thank you for contacting Joy Digital. I am checking on your requirement.`)}`}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-emerald-600 hover:text-emerald-500 text-[12px] pl-0.5"
                                          title="Quick WhatsApp Chat"
                                        >
                                          <i className="fa-brands fa-whatsapp" />
                                        </a>
                                      </div>
                                      <a href={`mailto:${enq.email}`} className="text-[10.5px] text-slate-400 dark:text-slate-500 hover:text-[#2563EB] hover:underline transition-colors flex items-center gap-1.5">
                                        <i className="fa-regular fa-envelope text-[11px]" /> {enq.email}
                                      </a>
                                    </div>
                                  </td>

                                  {/* Reminders Column */}
                                  <td className="px-6 py-2 whitespace-nowrap">
                                    {reminderBadge || <span className="text-slate-400 dark:text-slate-600 italic text-[10px]">-</span>}
                                  </td>

                                  {/* Executive Assigned */}
                                  <td className="px-6 py-2 text-slate-655 dark:text-slate-405 font-bold whitespace-nowrap">
                                    {enq.assignedTo ? (
                                      <span className="flex items-center gap-1.5">
                                        <span className="w-2.5 h-2.5 bg-blue-500 rounded-full inline-block" />
                                        <span>{enq.assignedTo.split(" ")[0]}</span>
                                      </span>
                                    ) : (
                                      <span className="text-slate-400 dark:text-slate-600 italic font-medium">Unassigned</span>
                                    )}
                                  </td>

                                  <td className="px-6 py-2 font-semibold text-slate-800 dark:text-slate-300 max-w-[200px] truncate">
                                    {enq.service}
                                  </td>

                                  <td className="px-6 py-2 whitespace-nowrap">
                                    <select
                                      value={displayStage}
                                      onChange={(e) => handleStatusChange(enq.id, e.target.value)}
                                      className={`text-[9.5px] font-black px-2.5 py-1 rounded-full border outline-none cursor-pointer shadow-sm transition-all focus:ring-4 focus:ring-blue-150/10 ${stageInfo.color}`}
                                    >
                                      {PIPELINE_STAGES.map((s) => (
                                        <option key={s.value} value={s.value}>{s.label}</option>
                                      ))}
                                    </select>
                                  </td>

                                  {/* Actions */}
                                  <td className="px-6 py-2 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                      <button
                                        onClick={() => {
                                          setSelectedLead(enq);
                                          setIsDrawerOpen(true);
                                        }}
                                        className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white flex items-center justify-center transition-all cursor-pointer"
                                        title="Open Lead Profile Drawer"
                                      >
                                        <i className="fa-regular fa-eye" />
                                      </button>
                                      <button
                                        onClick={() => handleDelete(enq.id)}
                                        className="w-8 h-8 rounded-lg bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 text-rose-600 dark:text-rose-450 hover:bg-rose-100 dark:hover:bg-rose-900/40 flex items-center justify-center transition-all cursor-pointer animate-fade-in"
                                        title="Delete Lead"
                                      >
                                        <i className="fa-regular fa-trash-can" />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="p-16 text-center flex flex-col items-center">
                        <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-750 flex items-center justify-center text-slate-400 dark:text-slate-550 mb-4 font-bold">
                          <i className="fa-regular fa-folder-open text-lg" />
                        </div>
                        <h3 className="font-extrabold text-sm text-slate-800 dark:text-white mb-1">No enquiries found</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-450 max-w-[280px]">Your current database or active filter constraints returned zero records.</p>
                      </div>
                    )}
                  </div>

                  {/* MOBILE LEAD LIST VIEW (Transforms table into responsive cards on mobile screens) */}
                  <div className="block md:hidden space-y-4 mb-12">
                    {filteredEnquiries.length > 0 ? (
                      filteredEnquiries.map((enq) => {
                        const displayStage = enq.pipelineStage || "new";
                        const stageInfo = PIPELINE_STAGES.find(s => s.value === displayStage) || PIPELINE_STAGES[0];
                        const cleanedMobile = (enq.mobile || "").replace(/\D/g, "");

                        return (
                          <div key={enq.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-[0_4px_20px_rgba(15,23,42,0.03)] space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs select-none shrink-0 ${getAvatarBg(enq.name)}`}>
                                  {getAvatarInitials(enq.name)}
                                </div>
                                <div>
                                  <h4 className="font-extrabold text-slate-900 dark:text-white text-[13px]">{enq.name}</h4>
                                  <p className="text-[10px] text-slate-500 dark:text-slate-450 mt-0.5">{enq.companyName !== "N/A" ? enq.companyName : "Individual Lead"}</p>
                                </div>
                              </div>
                              <span className={`text-[8.5px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${stageInfo.color}`}>
                                {stageInfo.label}
                              </span>
                            </div>

                            <div className="text-xs space-y-2 border-t border-slate-100 dark:border-slate-800/80 pt-3 text-slate-655 dark:text-slate-400 font-semibold">
                              <div className="flex items-center gap-2">
                                <i className="fa-solid fa-phone text-slate-400 text-[10px] w-4 text-center" />
                                <a href={`tel:${enq.mobile}`} className="hover:text-[#2563EB] hover:underline font-medium">{enq.mobile}</a>
                                <a 
                                  href={`https://wa.me/${cleanedMobile}?text=${encodeURIComponent(`Hi ${enq.name}, thank you for contacting Joy Digital.`)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-emerald-600 hover:text-emerald-500 pl-1"
                                >
                                  <i className="fa-brands fa-whatsapp text-sm" />
                                </a>
                              </div>
                              <div className="flex items-center gap-2">
                                <i className="fa-regular fa-envelope text-slate-400 text-[11px] w-4 text-center" />
                                <a href={`mailto:${enq.email}`} className="hover:text-[#2563EB] hover:underline font-medium">{enq.email}</a>
                              </div>
                              <div className="flex items-center gap-2">
                                <i className="fa-regular fa-folder text-slate-400 text-xs w-4 text-center" />
                                <span className="font-bold text-slate-700 dark:text-slate-350">{enq.service}</span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between gap-4 border-t border-slate-100 dark:border-slate-800/80 pt-3">
                              <button
                                onClick={() => {
                                  setSelectedLead(enq);
                                  setIsDrawerOpen(true);
                                }}
                                className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-350 cursor-pointer flex items-center justify-center gap-1.5 transition-all"
                              >
                                <i className="fa-regular fa-eye" />
                                View Details & Edit
                              </button>
                              
                              <button
                                onClick={() => handleDelete(enq.id)}
                                className="bg-rose-50 dark:bg-rose-950/20 hover:bg-rose-100 border border-rose-100 dark:border-rose-900/30 py-2 px-3.5 rounded-xl text-xs text-rose-600 cursor-pointer transition-all"
                                title="Delete Lead"
                              >
                                <i className="fa-regular fa-trash-can" />
                              </button>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="p-16 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col items-center">
                        <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 mb-4">
                          <i className="fa-regular fa-folder-open text-lg" />
                        </div>
                        <h3 className="font-extrabold text-sm text-slate-800 dark:text-white mb-1">No enquiries found</h3>
                      </div>
                    )}
                  </div>

                </div>
              )}

              {/* VIEW 2: KANBAN PIPELINE BOARD */}
              {viewMode === "kanban" && (
                <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-8 gap-4.5 overflow-x-auto pb-8 items-start min-h-[500px]">
                  {PIPELINE_STAGES.map((stage) => {
                    const stageLeads = filteredEnquiries.filter((enq) => (enq.pipelineStage || "new") === stage.value);
                    const totalStageValue = stageLeads.reduce((acc, curr) => acc + getLeadValue(curr), 0);

                    return (
                      <div 
                        key={stage.value}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleStageDrop(e, stage.value)}
                        className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-4 flex flex-col gap-4.5 w-full min-w-[200px] max-w-sm transition-colors duration-200"
                      >
                        {/* Column Header */}
                        <div className="flex justify-between items-center pl-1">
                          <div className="space-y-0.5">
                            <span className="font-extrabold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                              {stage.label}
                              <span className="bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-400 text-[9px] font-black px-1.5 py-0.25 rounded-md">
                                {stageLeads.length}
                              </span>
                            </span>
                            <span className="text-[9px] font-bold text-slate-450 dark:text-slate-500 block">
                              ₹{totalStageValue.toLocaleString()}
                            </span>
                          </div>
                        </div>

                        {/* Draggable Cards Stack */}
                        <div className="flex flex-col gap-3 min-h-[350px]">
                          {stageLeads.length > 0 ? (
                            stageLeads.map((enq) => (
                              <div
                                key={enq.id}
                                draggable="true"
                                onDragStart={(e) => handleDragStart(e, enq.id)}
                                onClick={() => {
                                  setSelectedLead(enq);
                                  setIsDrawerOpen(true);
                                }}
                                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all cursor-grab active:cursor-grabbing text-left space-y-3 relative group"
                              >
                                {/* Lead Details block */}
                                <div className="space-y-1">
                                  <div className="font-bold text-slate-900 dark:text-white text-[12px] leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 flex items-center justify-between">
                                    <span>{enq.name}</span>
                                    
                                    {/* Region Tag */}
                                    <span className="bg-slate-100 dark:bg-slate-800 px-1 py-0.25 text-[8.5px] font-bold rounded text-slate-500 dark:text-slate-400 select-none">
                                      {enq.region}
                                    </span>
                                  </div>
                                  
                                  {enq.companyName !== "N/A" && (
                                    <div className="text-[9.5px] font-bold text-blue-600 dark:text-blue-400 truncate">{enq.companyName}</div>
                                  )}
                                  
                                  <div className="text-[10px] text-slate-450 dark:text-slate-500 truncate leading-snug font-medium">
                                    {enq.service}
                                  </div>
                                  
                                  {enq.pipelineStage === "irrelevant" && enq.irrelevantReason && (
                                    <div className="pt-1 select-none">
                                      <span className="bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-450 border border-rose-100 dark:border-rose-900/30 px-1.5 py-0.5 rounded text-[8.5px] font-extrabold flex items-center gap-1 w-max">
                                        <i className="fa-solid fa-ban text-[8px]" /> {getReasonLabel(enq.irrelevantReason)}
                                      </span>
                                    </div>
                                  )}
                                </div>

                                {/* Divider */}
                                <div className="border-t border-slate-100 dark:border-slate-800/80 pt-2 flex justify-between items-center text-[10px]">
                                  {/* Assigned Executive Initials */}
                                  <div className="flex items-center gap-1.5 text-[9.5px] text-slate-500 dark:text-slate-400 font-semibold">
                                    <div className="w-5.5 h-5.5 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-[9px] select-none border border-slate-200 dark:border-slate-750">
                                      {enq.assignedTo ? getAvatarInitials(enq.assignedTo) : "?"}
                                    </div>
                                    <span>{enq.assignedTo ? enq.assignedTo.split(" ")[0] : "Assign"}</span>
                                  </div>

                                  <span className="text-[9px] text-slate-400 font-mono font-medium">
                                    {new Date(enq.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                                  </span>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="flex-1 border border-dashed border-slate-200 dark:border-slate-800/80 rounded-2xl flex items-center justify-center p-8 text-center text-slate-400 dark:text-slate-600 italic text-[11px]">
                              Drag leads here
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* VIEW 3: SALES ANALYTICS HUB */}
              {viewMode === "analytics" && (
                <div className="space-y-8 mb-12">
                  
                  {/* Visual SVG Analytics Charts grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    
                    {/* SVG conversion funnel */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between transition-colors duration-200">
                      <div>
                        <h3 className="text-xs font-black uppercase tracking-[0.1em] text-slate-450 mb-6 flex items-center gap-2">
                          <i className="fa-solid fa-filter text-blue-600" /> Sales Conversion Funnel
                        </h3>
                        
                        {/* Custom Funnel Drawing */}
                        <div className="flex flex-col gap-3 py-4 max-w-md mx-auto">
                          {[
                            { stage: "Total Leads", count: totalCount, width: "w-full", bg: "bg-blue-600 dark:bg-blue-500", percent: 100 },
                            { stage: "Contacted", count: enquiries.filter(e => ["contacted", "qualified", "proposal_sent", "negotiation", "won"].includes(e.pipelineStage || "")).length, width: "w-[85%]", bg: "bg-indigo-600 dark:bg-indigo-500", percent: totalCount > 0 ? Math.round((enquiries.filter(e => ["contacted", "qualified", "proposal_sent", "negotiation", "won"].includes(e.pipelineStage || "")).length / totalCount) * 100) : 0 },
                            { stage: "Qualified", count: enquiries.filter(e => ["qualified", "proposal_sent", "negotiation", "won"].includes(e.pipelineStage || "")).length, width: "w-[65%]", bg: "bg-amber-600 dark:bg-amber-500", percent: totalCount > 0 ? Math.round((enquiries.filter(e => ["qualified", "proposal_sent", "negotiation", "won"].includes(e.pipelineStage || "")).length / totalCount) * 100) : 0 },
                            { stage: "Proposals", count: enquiries.filter(e => ["proposal_sent", "negotiation", "won"].includes(e.pipelineStage || "")).length, width: "w-[45%]", bg: "bg-purple-600 dark:bg-purple-500", percent: totalCount > 0 ? Math.round((enquiries.filter(e => ["proposal_sent", "negotiation", "won"].includes(e.pipelineStage || "")).length / totalCount) * 100) : 0 },
                            { stage: "Won Deals", count: wonCount, width: "w-[25%]", bg: "bg-emerald-600 dark:bg-emerald-500", percent: totalCount > 0 ? Math.round((wonCount / totalCount) * 100) : 0 }
                          ].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-4 text-xs font-semibold">
                              <span className="w-24 text-slate-500 text-left font-bold">{item.stage}</span>
                              <div className="flex-1 bg-slate-50 dark:bg-slate-800 rounded-lg overflow-hidden border border-slate-100 dark:border-slate-750">
                                <div className={`h-8 ${item.bg} ${item.width} flex items-center justify-between px-3 text-white transition-all duration-300 font-extrabold text-[11px]`}>
                                  <span>{item.count}</span>
                                  <span>{item.percent}%</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="text-[10px] text-slate-400 dark:text-slate-500 border-t border-slate-100 dark:border-slate-850 pt-4 mt-6">
                        * Percentages are calculated relative to the total number of ingested inbound leads.
                      </div>
                    </div>

                    {/* SVG monthly trend line chart */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between transition-colors duration-200">
                      <div>
                        <h3 className="text-xs font-black uppercase tracking-[0.1em] text-slate-450 mb-6 flex items-center gap-2">
                          <i className="fa-solid fa-chart-line text-[#EA580C]" /> Lead Volume Monthly Trend
                        </h3>

                        {/* Interactive Line Chart */}
                        <div className="relative py-4 w-full h-44">
                          <svg className="w-full h-full" viewBox="0 0 500 150">
                            <defs>
                              <linearGradient id="leadTrendGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#EA580C" stopOpacity="0.12" />
                                <stop offset="100%" stopColor="#EA580C" stopOpacity="0" />
                              </linearGradient>
                            </defs>
                            {/* Grid Lines */}
                            <line x1="50" y1="20" x2="450" y2="20" stroke="#F1F5F9" strokeWidth="1" className="dark:stroke-slate-800" />
                            <line x1="50" y1="60" x2="450" y2="60" stroke="#F1F5F9" strokeWidth="1" className="dark:stroke-slate-800" />
                            <line x1="50" y1="100" x2="450" y2="100" stroke="#F1F5F9" strokeWidth="1" className="dark:stroke-slate-800" />
                            <line x1="50" y1="130" x2="450" y2="130" stroke="#E2E8F0" strokeWidth="2" className="dark:stroke-slate-850" />

                            {/* Area Gradient Fill */}
                            <path d={areaPathD} fill="url(#leadTrendGrad)" />

                            {/* X-axis Labels */}
                            {trendPoints.map((p, idx) => (
                              <text 
                                key={idx}
                                x={p.x} 
                                y="145" 
                                fill="#94A3B8" 
                                fontSize="9" 
                                fontWeight="800" 
                                textAnchor="middle"
                              >
                                {p.label}
                              </text>
                            ))}

                            {/* Trend Line Path */}
                            <path 
                              d={linePathD} 
                              fill="none" 
                              stroke="#EA580C" 
                              strokeWidth="3.5" 
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />

                            {/* Coordinate Dots */}
                            {trendPoints.map((p, idx) => (
                              <g key={idx} className="group/dot cursor-pointer">
                                <circle cx={p.x} cy={p.y} r="4.5" fill="#EA580C" stroke="#FFFFFF" strokeWidth="1.5" />
                                <circle cx={p.x} cy={p.y} r="8" fill="#EA580C" opacity="0" className="hover:opacity-20 transition-opacity" />
                                <title>{p.count} leads in {p.label}</title>
                              </g>
                            ))}
                          </svg>
                        </div>
                      </div>

                      <div className="text-[10px] text-slate-400 dark:text-slate-500 border-t border-slate-100 dark:border-slate-850 pt-4 mt-6">
                        * Analytics reflect data points over the preceding 6 months.
                      </div>
                    </div>

                  </div>

                  {/* SVG Source bar chart */}
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm transition-colors duration-200">
                    <h3 className="text-xs font-black uppercase tracking-[0.1em] text-slate-450 mb-6 flex items-center gap-2">
                      <i className="fa-solid fa-chart-column text-emerald-600" /> Acquisition Source Channels Distribution
                    </h3>

                    {/* SVG Bar chart */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
                      {/* Left: Sources Progress bars list */}
                      <div className="space-y-4">
                        {[
                          { source: "Organic Search", count: enquiries.filter(e => e.source.includes("Organic") || (e.utmParams && e.utmParams.medium === "organic")).length, color: "bg-emerald-500" },
                          { source: "Social Media Campaign", count: enquiries.filter(e => e.source.includes("Facebook") || e.source.includes("Instagram") || e.source.includes("Twitter")).length, color: "bg-blue-500" },
                          { source: "Exit Intent Popup", count: enquiries.filter(e => e.source.includes("Exit Intent")).length, color: "bg-orange-500" },
                          { source: "Direct Traffic", count: enquiries.filter(e => e.source.includes("General") || e.source.includes("Manual") || !e.utmParams).length, color: "bg-purple-500" }
                        ].map((item, idx) => {
                          const percent = totalCount > 0 ? (item.count / totalCount) * 100 : 0;
                          return (
                            <div key={idx} className="space-y-1 text-xs font-semibold">
                              <div className="flex justify-between text-slate-700 dark:text-slate-350">
                                <span>{item.source}</span>
                                <span className="font-extrabold text-slate-900 dark:text-white">{item.count} leads ({Math.round(percent)}%)</span>
                              </div>
                              <div className="w-full h-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-750 rounded-full overflow-hidden">
                                <div className={`h-full ${item.color} rounded-full`} style={{ width: `${percent}%` }} />
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Right: Services Distribution list */}
                      <div className="space-y-4">
                        {[
                          { service: "Next.js Web Design & Dev", count: enquiries.filter(e => e.service.includes("Next.js") || e.service.includes("Design")).length, color: "bg-blue-600" },
                          { service: "Headless E-commerce Store", count: enquiries.filter(e => e.service.includes("E-commerce")).length, color: "bg-purple-600" },
                          { service: "Custom React Application", count: enquiries.filter(e => e.service.includes("Application") || e.service.includes("React")).length, color: "bg-[#EA580C]" },
                          { service: "Support & Maintenance", count: enquiries.filter(e => e.service.includes("Maintenance") || e.service.includes("Support")).length, color: "bg-slate-600" }
                        ].map((item, idx) => {
                          const percent = totalCount > 0 ? (item.count / totalCount) * 100 : 0;
                          return (
                            <div key={idx} className="space-y-1 text-xs font-semibold">
                              <div className="flex justify-between text-slate-700 dark:text-slate-350">
                                <span>{item.service}</span>
                                <span className="font-extrabold text-slate-900 dark:text-white">{item.count} leads ({Math.round(percent)}%)</span>
                              </div>
                              <div className="w-full h-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-750 rounded-full overflow-hidden">
                                <div className={`h-full ${item.color} rounded-full`} style={{ width: `${percent}%` }} />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                </div>
              )}

            </div>
          )}

          {/* TAB CONTENT: CRM Lead Reports */}
          {activeTab === "reports" && (
            <div className="max-w-7xl mx-auto space-y-8 mb-12 animate-fade-in text-left">
              
              {/* Date Filter Bar */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4 transition-colors duration-200">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-[#2563EB]">
                    <i className="fa-solid fa-calendar-days text-sm" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">Reporting Timeframe</h4>
                    <p className="text-[9px] text-slate-450 mt-0.5">Filter lead analytics by specific date ranges</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  {[
                    { id: "all_time", label: "All Time" },
                    { id: "this_month", label: "This Month" },
                    { id: "last_month", label: "Last Month" },
                    { id: "last_30", label: "Last 30 Days" },
                    { id: "last_90", label: "Last 90 Days" }
                  ].map((btn) => (
                    <button
                      key={btn.id}
                      onClick={() => setReportDateRange(btn.id as any)}
                      className={`text-[10.5px] font-bold px-3.5 py-2 rounded-xl border transition-all cursor-pointer ${
                        reportDateRange === btn.id
                          ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                          : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-105"
                      }`}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* KPI Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {[
                  {
                    title: "Total Ingested Leads",
                    value: getFilteredLeadsForReports().length,
                    change: getFilteredLeadsForReports().length > 0 ? `100% of timeframe` : "No data",
                    icon: "fa-solid fa-users text-blue-600 bg-blue-50 dark:bg-blue-900/20"
                  },
                  {
                    title: "Active Pipeline Deals",
                    value: getFilteredLeadsForReports().filter(e => ["contacted", "qualified", "proposal_sent", "negotiation"].includes(e.pipelineStage || "")).length,
                    change: `${getFilteredLeadsForReports().length > 0 ? Math.round((getFilteredLeadsForReports().filter(e => ["contacted", "qualified", "proposal_sent", "negotiation"].includes(e.pipelineStage || "")).length / getFilteredLeadsForReports().length) * 100) : 0}% active rate`,
                    icon: "fa-solid fa-arrow-trend-up text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20"
                  },
                  {
                    title: "Conversion Rate",
                    value: `${getFilteredLeadsForReports().length > 0 ? Math.round((getFilteredLeadsForReports().filter(e => e.pipelineStage === "won").length / getFilteredLeadsForReports().length) * 100) : 0}%`,
                    change: `${getFilteredLeadsForReports().filter(e => e.pipelineStage === "won").length} Won Deals`,
                    icon: "fa-solid fa-trophy text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20"
                  },
                  {
                    title: "Irrelevant Leads Rate",
                    value: `${getFilteredLeadsForReports().length > 0 ? Math.round((getFilteredLeadsForReports().filter(e => e.pipelineStage === "irrelevant").length / getFilteredLeadsForReports().length) * 100) : 0}%`,
                    change: `${getFilteredLeadsForReports().filter(e => e.pipelineStage === "irrelevant").length} Irrelevant Leads`,
                    icon: "fa-solid fa-ban text-rose-600 bg-rose-50 dark:bg-rose-900/20"
                  },
                  {
                    title: "Est. Pipeline Value",
                    value: `₹${getFilteredLeadsForReports().filter(e => ["qualified", "proposal_sent", "negotiation"].includes(e.pipelineStage || "")).reduce((acc, curr) => acc + getLeadValue(curr), 0).toLocaleString()}`,
                    change: `₹${(getFilteredLeadsForReports().filter(e => ["qualified", "proposal_sent", "negotiation"].includes(e.pipelineStage || "")).reduce((acc, curr) => acc + getLeadValue(curr), 0) + getFilteredLeadsForReports().filter(e => e.pipelineStage === "won").reduce((acc, curr) => acc + getLeadValue(curr), 0)).toLocaleString()} total value`,
                    icon: "fa-solid fa-wallet text-amber-600 bg-amber-50 dark:bg-amber-900/20"
                  }
                ].map((kpi, idx) => (
                  <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between transition-colors duration-200">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-normal max-w-[70%]">{kpi.title}</span>
                      <div className={`w-8.5 h-8.5 rounded-xl flex items-center justify-center shrink-0 text-sm ${kpi.icon}`}>
                        <i className={kpi.icon.split(" ")[0] + " " + kpi.icon.split(" ")[1]} />
                      </div>
                    </div>
                    <div className="mt-4 space-y-1">
                      <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white leading-none">{kpi.value}</h3>
                      <p className="text-[10px] text-slate-450 dark:text-slate-500 font-bold">{kpi.change}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Main Analysis Chart Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* SVG monthly trend bar chart (Takes 2 cols on Large screens) */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between transition-colors duration-200 lg:col-span-2">
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-[0.1em] text-slate-450 mb-6 flex items-center gap-2">
                      <i className="fa-solid fa-chart-column text-[#2563EB]" /> Lead Volume (Last 6 Months)
                    </h3>
                    
                    {/* SVG Bar Chart */}
                    <div className="relative py-2 w-full h-52">
                      <svg className="w-full h-full" viewBox="0 0 500 180" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#2563EB" stopOpacity="0.9"/>
                            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.2"/>
                          </linearGradient>
                        </defs>
                        {/* Grid lines */}
                        <line x1="30" y1="20" x2="480" y2="20" stroke="#F1F5F9" strokeWidth="1" className="dark:stroke-slate-800" />
                        <line x1="30" y1="65" x2="480" y2="65" stroke="#F1F5F9" strokeWidth="1" className="dark:stroke-slate-800" />
                        <line x1="30" y1="110" x2="480" y2="110" stroke="#F1F5F9" strokeWidth="1" className="dark:stroke-slate-800" />
                        <line x1="30" y1="140" x2="480" y2="140" stroke="#E2E8F0" strokeWidth="1.5" className="dark:stroke-slate-750" />

                        {/* Rendering dynamic SVG rects */}
                        {getMonthlyStats().map((item, index) => {
                          const maxCount = Math.max(...getMonthlyStats().map(m => m.count), 5);
                          const barWidth = 36;
                          const spacing = 70;
                          const startX = 45 + index * spacing;
                          const barHeight = (item.count / maxCount) * 105;
                          const startY = 140 - barHeight;

                          return (
                            <g key={index} className="group">
                              {/* Background highlight hover effect */}
                              <rect
                                x={startX - 10}
                                y={10}
                                width={barWidth + 20}
                                height={145}
                                fill="transparent"
                                className="hover:fill-slate-50/50 dark:hover:fill-slate-800/10 cursor-pointer transition-colors duration-150 rounded-lg"
                              />
                              {/* SVG Bar */}
                              <rect
                                x={startX}
                                y={startY}
                                width={barWidth}
                                height={barHeight}
                                rx={5}
                                fill="url(#barGrad)"
                                className="transition-all duration-300 cursor-pointer"
                              />
                              {/* Label Count above */}
                              <text
                                x={startX + barWidth / 2}
                                y={startY - 6}
                                textAnchor="middle"
                                fill="#2563EB"
                                fontSize="9.5"
                                fontWeight="800"
                                className="font-mono dark:fill-blue-400"
                              >
                                {item.count}
                              </text>
                              {/* Month label below */}
                              <text
                                x={startX + barWidth / 2}
                                y={156}
                                textAnchor="middle"
                                fill="#94A3B8"
                                fontSize="9"
                                fontWeight="800"
                                className="font-sans"
                              >
                                {item.monthName}
                              </text>
                            </g>
                          );
                        })}
                      </svg>
                    </div>
                  </div>
                  <div className="text-[10px] text-slate-400 dark:text-slate-500 border-t border-slate-100 dark:border-slate-850 pt-4 mt-4">
                    * Displays the rolling volume of inquiries captured over the previous 6 months.
                  </div>
                </div>

                {/* Lead Sources Distribution */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between transition-colors duration-200">
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-[0.1em] text-slate-450 mb-6 flex items-center gap-2">
                      <i className="fa-solid fa-paper-plane text-emerald-600" /> Lead Acquisition Sources
                    </h3>

                    {getSourceStats(getFilteredLeadsForReports()).length > 0 ? (
                      <div className="space-y-4 max-h-[220px] overflow-y-auto pr-1">
                        {getSourceStats(getFilteredLeadsForReports()).map((source, index) => {
                          const percent = getFilteredLeadsForReports().length > 0 ? Math.round((source.count / getFilteredLeadsForReports().length) * 100) : 0;
                          return (
                            <div key={index} className="space-y-1.5 text-xs">
                              <div className="flex justify-between items-center font-bold text-slate-705 dark:text-slate-350">
                                <span className="truncate max-w-[70%]">{source.name}</span>
                                <span className="font-extrabold text-[11px] text-slate-900 dark:text-white">{source.count} leads ({percent}%)</span>
                              </div>
                              <div className="w-full h-2 bg-slate-50 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-100 dark:border-slate-750">
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
                      <div className="py-16 text-center text-slate-450 italic text-xs">
                        No lead sources tracked in this range.
                      </div>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-450 dark:text-slate-500 border-t border-slate-100 dark:border-slate-850 pt-4 mt-4">
                    * Dynamic distribution of website forms and manual creations.
                  </div>
                </div>
              </div>

              {/* Status Stages and Irrelevant categories Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Stage Breakdown */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm transition-colors duration-200">
                  <h3 className="text-xs font-black uppercase tracking-[0.1em] text-slate-450 mb-6 flex items-center gap-2">
                    <i className="fa-solid fa-list-check text-indigo-600" /> Pipeline Stage Breakdown
                  </h3>
                  
                  <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                    {getStageStats(getFilteredLeadsForReports()).map((stage, index) => {
                      const percent = getFilteredLeadsForReports().length > 0 ? Math.round((stage.count / getFilteredLeadsForReports().length) * 100) : 0;
                      return (
                        <div key={index} className="space-y-1.5 text-xs">
                          <div className="flex justify-between items-center font-bold text-slate-705 dark:text-slate-350">
                            <span className="flex items-center gap-1.5">
                              <span className="w-2.5 h-2.5 rounded-full inline-block bg-slate-300" style={{ backgroundColor: stage.value === "irrelevant" ? "#64748b" : undefined }} />
                              <span>{stage.label}</span>
                            </span>
                            <span className="font-extrabold text-[11px] text-slate-900 dark:text-white">{stage.count} leads ({percent}%)</span>
                          </div>
                          <div className="w-full h-2 bg-slate-50 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-100 dark:border-slate-750">
                            <div 
                              className="h-full bg-blue-655 rounded-full" 
                              style={{ width: `${percent}%`, backgroundColor: stage.value === "won" ? "#10b981" : stage.value === "lost" ? "#f43f5e" : stage.value === "irrelevant" ? "#64748b" : undefined }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Irrelevant Leads Classification */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm transition-colors duration-200">
                  <h3 className="text-xs font-black uppercase tracking-[0.1em] text-slate-455 mb-6 flex items-center gap-2">
                    <i className="fa-solid fa-circle-minus text-rose-500" /> Irrelevant Leads Classification
                  </h3>

                  {getIrrelevantStats(getFilteredLeadsForReports()).total > 0 ? (
                    <div className="space-y-4.5 max-h-[300px] overflow-y-auto pr-1">
                      {getIrrelevantStats(getFilteredLeadsForReports()).breakdown.map((item, index) => {
                        const percent = getIrrelevantStats(getFilteredLeadsForReports()).total > 0 ? Math.round((item.count / getIrrelevantStats(getFilteredLeadsForReports()).total) * 100) : 0;
                        return (
                          <div key={index} className="flex items-center justify-between gap-4 text-xs font-semibold">
                            <div className="flex items-center gap-3 w-[45%]">
                              <div className={`w-8 h-8 rounded-lg ${item.color} text-white flex items-center justify-center shrink-0 shadow-xs text-xs`}>
                                <i className={item.icon} />
                              </div>
                              <span className="truncate text-slate-750 dark:text-slate-350">{item.label}</span>
                            </div>
                            
                            <div className="flex-1 flex items-center gap-3">
                              <div className="flex-1 bg-slate-50 dark:bg-slate-800 h-2.5 rounded-lg overflow-hidden border border-slate-100 dark:border-slate-750">
                                <div className={`h-full ${item.color}`} style={{ width: `${percent}%` }} />
                              </div>
                              <span className="font-extrabold font-mono text-slate-900 dark:text-white w-14 text-right shrink-0">{item.count} leads</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="py-20 text-center text-slate-450 italic text-xs flex flex-col items-center gap-2">
                      <i className="fa-solid fa-clipboard-check text-slate-300 text-3xl" />
                      <span>No irrelevant leads recorded in this range.</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Irrelevant Leads Log table */}
              {getFilteredLeadsForReports().filter(e => e.pipelineStage === "irrelevant").length > 0 && (
                <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm transition-colors duration-200">
                  <div className="flex justify-between items-center mb-5">
                    <div>
                      <h3 className="text-xs font-black uppercase tracking-[0.1em] text-slate-450 flex items-center gap-2">
                        <i className="fa-solid fa-list text-slate-500" /> Irrelevant Leads Audit Log
                      </h3>
                      <p className="text-[9px] text-slate-450 mt-1">Review classification remarks and sources of filtered irrelevant leads</p>
                    </div>
                    <span className="bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 px-2.5 py-0.75 rounded-xl text-[9px] font-black text-slate-500 dark:text-slate-400">
                      {getFilteredLeadsForReports().filter(e => e.pipelineStage === "irrelevant").length} leads
                    </span>
                  </div>

                  <div className="overflow-x-auto max-h-[350px] border border-slate-150 dark:border-slate-800 rounded-2xl">
                    <table className="w-full text-left border-collapse border-spacing-0 text-xs">
                      <thead>
                        <tr className="bg-slate-50/70 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-[9px] font-black uppercase tracking-wider text-slate-455 dark:text-slate-500 select-none">
                          <th className="px-5 py-3">Date</th>
                          <th className="px-5 py-3">Lead Name</th>
                          <th className="px-5 py-3">Source</th>
                          <th className="px-5 py-3">Classification</th>
                          <th className="px-5 py-3">Custom Remarks / Notes</th>
                          <th className="px-5 py-3 text-right">Inspect</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-150 dark:divide-slate-800/80 font-medium text-slate-750 dark:text-slate-350">
                        {getFilteredLeadsForReports().filter(e => e.pipelineStage === "irrelevant").map((enq) => {
                          const isOther = (enq.irrelevantReason || "").startsWith("other:");
                          const categoryKey = isOther ? "other" : (enq.irrelevantReason || "marketing_spam");
                          const remarkText = isOther ? enq.irrelevantReason!.substring(6) : "";
                          
                          return (
                            <tr key={enq.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                              <td className="px-5 py-3 whitespace-nowrap text-slate-400 font-mono text-[10px]">
                                {new Date(enq.createdAt).toLocaleDateString()}
                              </td>
                              <td className="px-5 py-3 font-bold text-slate-900 dark:text-white">
                                {enq.name}
                              </td>
                              <td className="px-5 py-3 text-slate-500 max-w-[120px] truncate">
                                {enq.source === "CRM Dashboard Manual" ? "Manual" : enq.source}
                              </td>
                              <td className="px-5 py-3 whitespace-nowrap">
                                <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-[9px] font-bold border border-slate-200/50 dark:border-slate-700">
                                  {getReasonLabel(categoryKey)}
                                </span>
                              </td>
                              <td className="px-5 py-3 max-w-[220px] truncate italic text-slate-600 dark:text-slate-400">
                                {remarkText || enq.message || "-"}
                              </td>
                              <td className="px-5 py-3 text-right">
                                <button
                                  onClick={() => {
                                    setSelectedLead(enq);
                                    setIsDrawerOpen(true);
                                  }}
                                  className="w-7 h-7 rounded-lg border border-slate-200 dark:border-slate-750 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-450 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-center cursor-pointer transition-colors"
                                >
                                  <i className="fa-regular fa-eye text-[11px]" />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB CONTENT: Chat Logs Audit Console */}
          {activeTab === "chats" && (
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12 animate-fade-in text-left h-[calc(100vh-10rem)]">
              
              {/* LEFT SIDEBAR: Chat sessions list */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 shadow-sm flex flex-col h-full overflow-hidden transition-colors duration-200 col-span-1">
                <div className="space-y-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
                      <i className="fa-regular fa-comments text-blue-600" /> Chat Conversations
                    </h3>
                    <button 
                      onClick={fetchChatSessions}
                      className="w-7 h-7 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                      title="Reload chat list"
                    >
                      {chatsLoading ? (
                        <i className="fa-solid fa-circle-notch animate-spin text-[10px]" />
                      ) : (
                        <i className="fa-solid fa-rotate-right text-[10px]" />
                      )}
                    </button>
                  </div>
                  
                  {/* Search box */}
                  <div className="relative">
                    <i className="fa-solid fa-magnifying-glass text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 text-[10.5px]" />
                    <input
                      type="text"
                      placeholder="Search name, phone, email..."
                      value={chatSearch}
                      onChange={(e) => setChatSearch(e.target.value)}
                      className="w-full text-xs pl-8.5 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:bg-white dark:focus:bg-slate-950 focus:border-blue-600 text-slate-855 dark:text-white transition-colors"
                    />
                  </div>
                </div>

                {/* Session list items scroll area */}
                <div className="flex-1 overflow-y-auto space-y-2 mt-4 pr-1">
                  {chatsLoading ? (
                    <div className="py-20 text-center flex flex-col items-center gap-3">
                      <i className="fa-solid fa-circle-notch animate-spin text-2xl text-blue-600" />
                      <span className="text-[10px] font-black text-slate-450 uppercase tracking-widest animate-pulse">Loading Chat Sessions...</span>
                    </div>
                  ) : chatSessions.filter(s => {
                    const searchLower = chatSearch.toLowerCase();
                    return (s.name || "").toLowerCase().includes(searchLower) ||
                           (s.email || "").toLowerCase().includes(searchLower) ||
                           (s.mobile || "").toLowerCase().includes(searchLower) ||
                           (s.sessionId || "").toLowerCase().includes(searchLower);
                  }).length > 0 ? (
                    chatSessions
                      .filter(s => {
                        const searchLower = chatSearch.toLowerCase();
                        return (s.name || "").toLowerCase().includes(searchLower) ||
                               (s.email || "").toLowerCase().includes(searchLower) ||
                               (s.mobile || "").toLowerCase().includes(searchLower) ||
                               (s.sessionId || "").toLowerCase().includes(searchLower);
                      })
                      .map((session) => {
                        const isSelected = selectedChatSessionId === session.sessionId;
                        const dateLabel = (session.updatedAt || session.createdAt) ? new Date(session.updatedAt || session.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", hour12: false }) : "N/A";
                        return (
                          <div
                            key={session.sessionId}
                            onClick={() => fetchChatSessionDetails(session.sessionId)}
                            className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-left space-y-2 relative group ${
                              isSelected
                                ? "bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/50"
                                : "bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-850/50 border-slate-200 dark:border-slate-800"
                            }`}
                          >
                            <div className="flex justify-between items-start gap-2">
                              <div className="space-y-0.5 min-w-0">
                                <span className="font-bold text-slate-900 dark:text-white text-xs truncate block group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                  {session.name || "Anonymous Visitor"}
                                </span>
                                <span className="text-[8.5px] font-mono text-slate-400 block font-medium">Ref: {session.sessionId.substring(0, 8)}</span>
                              </div>
                              <span className="text-[9px] text-slate-400 dark:text-slate-500 font-mono font-medium shrink-0">{dateLabel}</span>
                            </div>
                            
                            <div className="flex justify-between items-center text-[10px] pt-1">
                              <span className="text-slate-450 dark:text-slate-500 font-bold">
                                {session.messageCount} messages
                              </span>
                              
                              {session.leadId ? (
                                <span className="bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.25 rounded text-[8.5px] font-extrabold border border-emerald-100 dark:border-emerald-900/30 flex items-center gap-1 select-none">
                                  <i className="fa-solid fa-clipboard-check" /> Lead Generated
                                </span>
                              ) : (
                                <span className="bg-slate-50 dark:bg-slate-800 text-slate-455 dark:text-slate-500 px-1.5 py-0.25 rounded text-[8.5px] font-bold border border-slate-200 dark:border-slate-700 flex items-center gap-1 select-none">
                                  <i className="fa-regular fa-user" /> Anonymous
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })
                  ) : (
                    <div className="py-20 text-center flex flex-col items-center justify-center gap-2">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-150 dark:border-slate-750 flex items-center justify-center text-slate-400 mb-2">
                        <i className="fa-regular fa-comments text-lg" />
                      </div>
                      <span className="text-slate-500 text-xs font-bold">No chat sessions found</span>
                      <span className="text-[9.5px] text-slate-400 max-w-[180px]">Visitor interactions will appear here in real-time.</span>
                    </div>
                  )}
                </div>
              </div>

              {/* RIGHT TRANSCRIPT DISPLAY AREA */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 shadow-sm flex flex-col h-full overflow-hidden transition-colors duration-200 lg:col-span-2">
                
                {selectedChatSession ? (
                  <div className="flex flex-col h-full overflow-hidden">
                    {/* Transcript Header info */}
                    <div className="pb-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center shrink-0">
                      <div className="text-left space-y-1">
                        <h4 className="font-extrabold text-slate-850 dark:text-white text-xs flex items-center gap-2">
                          {selectedChatSession.name || "Anonymous Visitor"}
                        </h4>
                        
                        <div className="text-[10px] text-slate-455 dark:text-slate-500 font-semibold space-x-2">
                          {selectedChatSession.email && <span>Email: <strong>{selectedChatSession.email}</strong></span>}
                          {selectedChatSession.email && selectedChatSession.mobile && <span>•</span>}
                          {selectedChatSession.mobile && <span>Phone: <strong>{selectedChatSession.mobile}</strong></span>}
                        </div>
                      </div>

                      {selectedChatSession.leadId && (
                        <button
                          onClick={() => {
                            const leadObj = enquiries.find(e => e.id === selectedChatSession.leadId);
                            if (leadObj) {
                              setSelectedLead(leadObj);
                              setIsDrawerOpen(true);
                            } else {
                              alert("Lead profile could not be located. It might have been deleted.");
                            }
                          }}
                          className="bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 text-[#2563EB] dark:text-blue-400 hover:text-blue-700 font-bold text-[10.5px] px-3.5 py-1.8 border border-blue-100 dark:border-blue-900/30 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-xs shrink-0"
                        >
                          <i className="fa-solid fa-address-card text-xs" /> View CRM Profile
                        </button>
                      )}
                    </div>

                    {/* Transcript scrolling bubbles */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 mt-2 bg-slate-50/50 dark:bg-slate-950/20 rounded-2xl">
                      {chatDetailsLoading ? (
                        <div className="py-20 text-center flex flex-col items-center gap-3">
                          <i className="fa-solid fa-circle-notch animate-spin text-xl text-blue-600" />
                          <span className="text-[10px] font-black text-slate-450 uppercase tracking-widest animate-pulse">Loading transcript details...</span>
                        </div>
                      ) : selectedChatSession.messages && selectedChatSession.messages.length > 0 ? (
                        selectedChatSession.messages.map((msg: any, mIdx: number) => {
                          const isBot = msg.role === "assistant";
                          return (
                            <div key={mIdx} className={`flex ${isBot ? "justify-start" : "justify-end"} gap-2.5`}>
                              {isBot && (
                                <div className="w-6.5 h-6.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center font-bold text-[9px] shrink-0 self-end select-none">
                                  AI
                                </div>
                              )}
                              <div className={`max-w-[70%] p-3 rounded-2xl leading-relaxed text-xs whitespace-pre-wrap shadow-sm border ${
                                isBot
                                  ? "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-100 dark:border-slate-800 rounded-bl-xs"
                                  : "bg-blue-600 text-white border-blue-600 rounded-br-xs font-semibold"
                              }`}>
                                {msg.text}
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="py-20 text-center text-slate-450 italic">
                          No messages in this chat session transcript.
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-8 border border-dashed border-slate-200 dark:border-slate-800/80 rounded-2xl bg-slate-50/10">
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-150 dark:border-slate-750 flex items-center justify-center text-slate-400 mb-4 animate-bounce-subtle">
                      <i className="fa-regular fa-comment-dots text-xl" />
                    </div>
                    <h4 className="font-extrabold text-sm text-slate-800 dark:text-white mb-1">Select a Conversation</h4>
                    <p className="text-[10px] text-slate-455 dark:text-slate-500 max-w-[240px] leading-relaxed">
                      Choose an AI Chat session from the left-hand panel to review visitor questions, lead qualification details, or user enquiries history.
                    </p>
                  </div>
                )}
                
              </div>

            </div>
          )}

          {/* TAB CONTENT: Geolocation Visitor Map */}
          {activeTab === "map" && (
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 animate-fade-in">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 rounded-3xl p-6 shadow-sm lg:col-span-2">
                <h3 className="text-xs font-black uppercase tracking-[0.1em] text-slate-450 mb-4 flex items-center gap-2">
                  <i className="fa-regular fa-map text-emerald-600" /> Interactive Traffic Heatmap
                </h3>
                <VisitorMap markers={analytics.mapMarkers} />
              </div>

              <div className="bg-white dark:bg-slate-900 border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between transition-colors duration-200">
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
                            <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300">
                              <span>{item.city} <span className="text-slate-400 font-medium">({item.country})</span></span>
                              <span className="text-emerald-700 dark:text-emerald-400 font-extrabold">{item.count} hits</span>
                            </div>
                            <div className="w-full h-2 bg-slate-50 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-100 dark:border-slate-750">
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
                      <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-750 flex items-center justify-center text-slate-400 mb-3">
                        <i className="fa-solid fa-earth-asia" />
                      </div>
                      <span className="text-slate-500 text-xs font-bold">No geography logs yet</span>
                      <span className="text-[10px] text-slate-400 mt-1 max-w-[200px]">Geotarget logs will record automatically on user page entry.</span>
                    </div>
                  )}
                </div>

                <div className="border-t border-slate-100 dark:border-slate-800/80 pt-4 mt-6 text-center">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{analytics.totalPageviews}</span>
                      <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1">Total Hits</span>
                    </div>
                    <div className="flex flex-col border-l border-slate-100 dark:border-slate-800/80">
                      <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{analytics.uniqueVisitors}</span>
                      <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1">Unique Approx</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT: User Session Heatmaps */}
          {activeTab === "heatmaps" && (
            <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 rounded-3xl p-8 shadow-sm mb-12 animate-fade-in transition-colors duration-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-orange-50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/30 rounded-2xl flex items-center justify-center text-orange-500 shadow-sm shrink-0">
                  <i className="fa-regular fa-eye text-2xl animate-pulse text-[#2563EB]" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white leading-tight">Cursor Heatmaps & Session Recordings</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-450 mt-0.5">Understand user behavior, click actions, and scrolling scrolls using Microsoft Clarity.</p>
                </div>
              </div>

              <div className="text-xs text-slate-655 dark:text-slate-350 space-y-4 mb-8 leading-relaxed font-medium">
                <p>
                  To provide smooth mouse tracking and click heatmaps without slowing down your Next.js application, we have integrated support for **Microsoft Clarity**—an industry-standard, 100% free behavior analytics platform.
                </p>
                
                <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-700 dark:text-slate-300">
                  <div className="flex gap-3">
                    <span className="text-lg text-emerald-600 dark:text-emerald-400"><i className="fa-solid fa-circle-check" /></span>
                    <div>
                      <strong className="block text-slate-900 dark:text-white mb-0.5 font-bold">Click Heatmaps</strong>
                      Identify where users click on your pages, which CTA buttons are most active, and which links get missed.
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-lg text-emerald-600 dark:text-emerald-400"><i className="fa-solid fa-circle-check" /></span>
                    <div>
                      <strong className="block text-slate-900 dark:text-white mb-0.5 font-bold">Session Recordings</strong>
                      Watch anonymous recordings of individual users as they navigate, scroll, and type to locate design friction.
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-lg text-emerald-600 dark:text-emerald-400"><i className="fa-solid fa-circle-check" /></span>
                    <div>
                      <strong className="block text-slate-900 dark:text-white mb-0.5 font-bold">Scroll Depth</strong>
                      See how far down users read your pages to optimize placement of key elements.
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-lg text-emerald-600 dark:text-emerald-400"><i className="fa-solid fa-circle-check" /></span>
                    <div>
                      <strong className="block text-slate-900 dark:text-white mb-0.5 font-bold">Rage Clicks Detection</strong>
                      Automatically detect frustrated clicks on broken layouts or non-interactive page objects.
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-250 dark:border-emerald-900/30 rounded-2xl p-4.5 text-[11px] text-emerald-800 dark:text-emerald-400 font-semibold">
                  <p className="font-bold flex items-center gap-1.5 mb-1 text-emerald-900 dark:text-emerald-300">
                    <i className="fa-solid fa-circle-check" /> Clarity Integration status: ACTIVE & LIVE
                  </p>
                  <p>
                    Your Microsoft Clarity project ID (`y1a7vgc8a7`) is successfully integrated into the website template layout. User cursor coordinates, scrolls, clicks, and page records are being captured automatically in the background.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 border-t border-slate-100 dark:border-slate-800 pt-6">
                <a
                  href="https://clarity.microsoft.com/projects/view/y1a7vgc8a7/dashboard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-extrabold text-xs px-8 py-4.5 rounded-xl shadow-md transition-all text-center flex items-center justify-center gap-2 cursor-pointer flex-1 animate-fade-in"
                >
                  Open Clarity Heatmaps Console <i className="fa-solid fa-arrow-up-right-from-square" />
                </a>
                <a
                  href="https://clarity.microsoft.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-extrabold text-xs px-6 py-4.5 rounded-xl transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  Clarity Portal
                </a>
              </div>
            </div>
          )}

          {activeTab === "blog" && (
            <div className="w-full animate-fade-in">
              <BlogAdminPanel />
            </div>
          )}

          {activeTab === "settings" && (
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12 animate-fade-in text-left">
              {/* Left Settings Navigation (3 cols) */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-1">
                {[{ id: "cloudinary", label: "Cloudinary Config", icon: "fa-solid fa-cloud-arrow-up" },
                  { id: "system", label: "System Diagnostic", icon: "fa-solid fa-sliders" }
                ].map((s) => {
                  const isSubActive = settingsSubTab === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setSettingsSubTab(s.id as any)}
                      className={`w-full flex items-center gap-3.5 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all text-left cursor-pointer ${
                        isSubActive
                          ? "bg-blue-50 dark:bg-blue-950/20 text-[#2563EB] dark:text-blue-400 border border-blue-105 dark:border-blue-900/30"
                          : "text-slate-500 hover:text-slate-850 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800/40"
                      }`}
                    >
                      <i className={`${s.icon} text-sm shrink-0 w-5 text-center`} />
                      <span>{s.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Right Settings Configuration Panel (9 cols) */}
              <div className="lg:col-span-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
                {settingsSubTab === "cloudinary" && (
                  <div>
                    <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                      <i className="fa-solid fa-cloud-arrow-up text-[#2563EB]" /> Cloudinary Asset Integration
                    </h3>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold mb-6">
                      Configure your Cloudinary credentials dynamically. Cover images uploaded via the Blog Editor Desk will route directly to this repository workspace in production.
                    </p>

                    {settingsMsg.text && (
                      <div className={`p-4 rounded-xl text-xs font-bold border flex items-center justify-between mb-5 ${
                        settingsMsg.type === "success" 
                          ? "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border-emerald-250 dark:border-emerald-900/30"
                          : "bg-rose-50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-400 border-rose-250 dark:border-rose-900/30"
                      }`}>
                        <span>{settingsMsg.text}</span>
                        <button type="button" onClick={() => setSettingsMsg({ text: "", type: "" })} className="text-[10px] cursor-pointer hover:opacity-75">✕</button>
                      </div>
                    )}

                    <form onSubmit={handleSaveSettings} className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[9px] font-black text-slate-550 dark:text-slate-455 uppercase tracking-widest pl-0.5">Cloud Name</label>
                          <input
                            type="text"
                            required
                            value={cloudName}
                            onChange={(e) => setCloudName(e.target.value)}
                            placeholder="e.g. hkfw0tt7"
                            className="px-3.5 py-3 bg-slate-50 border border-slate-200 text-slate-955 dark:bg-slate-800 dark:border-slate-700 dark:text-white rounded-xl outline-none focus:bg-white focus:border-[#2563EB] text-xs font-semibold"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[9px] font-black text-slate-550 dark:text-slate-455 uppercase tracking-widest pl-0.5">API Key</label>
                          <input
                            type="text"
                            required
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            placeholder="e.g. 621912895596784"
                            className="px-3.5 py-3 bg-slate-50 border border-slate-200 text-slate-955 dark:bg-slate-800 dark:border-slate-700 dark:text-white rounded-xl outline-none focus:bg-white focus:border-[#2563EB] text-xs font-semibold"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] font-black text-slate-550 dark:text-slate-455 uppercase tracking-widest pl-0.5">API Secret</label>
                        <input
                          type="password"
                          required
                          value={apiSecret}
                          onChange={(e) => setApiSecret(e.target.value)}
                          placeholder="••••••••••••••••••••••••••••••••"
                          className="px-3.5 py-3 bg-slate-50 border border-slate-200 text-slate-955 dark:bg-slate-800 dark:border-slate-700 dark:text-white rounded-xl outline-none focus:bg-white focus:border-[#2563EB] text-xs font-semibold"
                        />
                      </div>

                      <div className="flex justify-end pt-3">
                        <button
                          type="submit"
                          disabled={settingsLoading}
                          className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-extrabold text-xs px-6 py-3 rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50"
                        >
                          {settingsLoading ? "Saving Configurations..." : "Save Credentials"}
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {settingsSubTab === "system" && (
                  <div>
                    <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                      <i className="fa-solid fa-sliders text-[#2563EB]" /> System Diagnostic Parameters
                    </h3>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold mb-6">
                      Overview of the application environment parameters, diagnostic status, and operational health metrics.
                    </p>

                    <div className="space-y-4 text-xs font-semibold text-slate-700 dark:text-slate-350">
                      <div className="flex justify-between items-center py-2.5 border-b border-slate-100 dark:border-slate-800/80">
                        <span>Application Environment</span>
                        <span className="bg-emerald-50 dark:bg-emerald-950/20 text-emerald-605 dark:text-emerald-450 px-2 py-0.5 rounded text-[10px] font-extrabold border border-emerald-100 dark:border-emerald-900/30 uppercase">
                          production
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2.5 border-b border-slate-100 dark:border-slate-800/80">
                        <span>MongoDB Database Link</span>
                        <span className="flex items-center gap-1.5 text-emerald-650 dark:text-emerald-400 font-bold">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" /> Active DB Connection
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2.5 border-b border-slate-100 dark:border-slate-800/80">
                        <span>Clarity Agent Tracking Code</span>
                        <span className="text-slate-500 dark:text-slate-450 font-mono text-[10px]">y1a7vgc8a7 (Active)</span>
                      </div>
                      <div className="flex justify-between items-center py-2.5 border-b border-slate-100 dark:border-slate-800/80">
                        <span>Inbound Lead Webhook</span>
                        <span className="text-[#2563EB] dark:text-blue-455 font-mono text-[10px]">/api/enquiry (Ready)</span>
                      </div>
                      <div className="flex justify-between items-center py-2.5">
                        <span>Server Timezone Offset</span>
                        <span>IST (UTC+05:30)</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </main>

      {/* IRRELEVANT REMARKS MODAL DIALOG */}
      {irrelevantModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#0F172A]/50 backdrop-blur-sm" onClick={() => setIrrelevantModalOpen(false)} />
          
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[24px] shadow-2xl relative z-10 w-full max-w-md p-6 md:p-8 animate-fade-in text-left">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white leading-none">Classify Irrelevant Lead</h3>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1.5 font-medium">Select a category and explain why this lead is irrelevant.</p>
              </div>
              <button 
                onClick={() => setIrrelevantModalOpen(false)} 
                className="w-8 h-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 cursor-pointer flex items-center justify-center transition-colors"
              >
                <i className="fa-solid fa-xmark text-sm" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-750 dark:text-slate-350">
              <div className="flex flex-col gap-1.5 font-semibold">
                <label className="text-slate-650 dark:text-slate-400">Irrelevant Category *</label>
                <select
                  value={irrelevantReason}
                  onChange={(e) => setIrrelevantReason(e.target.value)}
                  className="border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2.5 rounded-xl outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-[#2563EB] font-semibold cursor-pointer text-slate-900 dark:text-white"
                >
                  <option value="marketing_spam">Spam / Marketing Pitch</option>
                  <option value="job_seeker">Job Seeker / Internship Inquiry</option>
                  <option value="invalid_contact">Invalid Contact Details</option>
                  <option value="unrelated_service">Unrelated Service Request</option>
                  <option value="low_budget">Out of Scope / Low Budget</option>
                  <option value="test">Test Submission</option>
                  <option value="other">Other (Write Custom Remark)</option>
                </select>
              </div>

              {irrelevantReason === "other" && (
                <div className="flex flex-col gap-1.5 font-semibold animate-fade-in">
                  <label className="text-slate-650 dark:text-slate-400">Custom Remark Details *</label>
                  <input
                    type="text"
                    required
                    value={customRemark}
                    onChange={(e) => setCustomRemark(e.target.value)}
                    className="border border-slate-200 dark:border-slate-700 bg-slate-55 dark:bg-slate-800 px-3 py-2.5 rounded-xl outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-[#2563EB] font-medium text-slate-900 dark:text-white"
                    placeholder="E.g. Customer wants a website built for free"
                  />
                </div>
              )}

              <div className="flex items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-800/80 pt-4.5">
                <button
                  type="button"
                  onClick={() => setIrrelevantModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-250 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-350 font-extrabold cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const finalReason = irrelevantReason === "other" ? `other:${customRemark}` : irrelevantReason;
                    if (irrelevantReason === "other" && !customRemark.trim()) {
                      alert("Please fill in the custom remark details.");
                      return;
                    }
                    if (irrelevantLeadId) {
                      handleStatusChange(irrelevantLeadId, "irrelevant", finalReason);
                    }
                    setIrrelevantModalOpen(false);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-extrabold cursor-pointer transition-all shadow-sm"
                >
                  Confirm Classification
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* QUICK ADD LEAD MODAL DIALOG */}
      {isQuickAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#0F172A]/50 backdrop-blur-sm" onClick={() => setIsQuickAddOpen(false)} />
          
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[24px] shadow-2xl relative z-10 w-full max-w-xl p-6 md:p-8 animate-fade-in text-left">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white leading-none">Add Customer Lead</h3>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1.5 font-medium">Record a custom inquiry manually into the sales dashboard pipeline.</p>
              </div>
              <button onClick={() => setIsQuickAddOpen(false)} className="w-8 h-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 cursor-pointer flex items-center justify-center transition-colors">
                <i className="fa-solid fa-xmark text-sm" />
              </button>
            </div>

            <form onSubmit={handleQuickAddSubmit} className="space-y-4.5 text-xs text-slate-750 dark:text-slate-350">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4.5">
                <div className="flex flex-col gap-1.5 font-semibold">
                  <label className="text-slate-600 dark:text-slate-400">Lead Name *</label>
                  <input
                    type="text"
                    required
                    value={quickAddForm.name}
                    onChange={(e) => setQuickAddForm({ ...quickAddForm, name: e.target.value })}
                    className="border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2.5 rounded-xl outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-[#2563EB] font-medium"
                    placeholder="E.g. John Doe"
                  />
                </div>

                <div className="flex flex-col gap-1.5 font-semibold">
                  <label className="text-slate-600 dark:text-slate-400">Company Name</label>
                  <input
                    type="text"
                    value={quickAddForm.companyName}
                    onChange={(e) => setQuickAddForm({ ...quickAddForm, companyName: e.target.value })}
                    className="border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2.5 rounded-xl outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-[#2563EB] font-medium"
                    placeholder="E.g. Acme Corp"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4.5 animate-fade-in">
                <div className="flex flex-col gap-1.5 font-semibold">
                  <label className="text-slate-600 dark:text-slate-400">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={quickAddForm.email}
                    onChange={(e) => setQuickAddForm({ ...quickAddForm, email: e.target.value })}
                    className="border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2.5 rounded-xl outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-[#2563EB] font-medium"
                    placeholder="E.g. john@doe.com"
                  />
                </div>

                <div className="flex flex-col gap-1.5 font-semibold">
                  <label className="text-slate-600 dark:text-slate-400">Mobile Phone *</label>
                  <input
                    type="text"
                    required
                    value={quickAddForm.mobile}
                    onChange={(e) => setQuickAddForm({ ...quickAddForm, mobile: e.target.value })}
                    className="border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2.5 rounded-xl outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-[#2563EB] font-medium"
                    placeholder="E.g. +91 9876543210"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4.5">
                <div className="flex flex-col gap-1.5 font-semibold">
                  <label className="text-slate-600 dark:text-slate-400">Target Region</label>
                  <select
                    value={quickAddForm.region}
                    onChange={(e) => setQuickAddForm({ ...quickAddForm, region: e.target.value })}
                    className="border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2.5 rounded-xl outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-[#2563EB] font-semibold cursor-pointer"
                  >
                    <option value="US">United States (US)</option>
                    <option value="UK">United Kingdom (UK)</option>
                    <option value="AE">United Arab Emirates (UAE)</option>
                    <option value="IN">India (IN)</option>
                    <option value="GLOBAL">Global</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5 font-semibold">
                  <label className="text-slate-600 dark:text-slate-400">Website Url</label>
                  <input
                    type="text"
                    value={quickAddForm.website}
                    onChange={(e) => setQuickAddForm({ ...quickAddForm, website: e.target.value })}
                    className="border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2.5 rounded-xl outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-[#2563EB] font-medium"
                    placeholder="E.g. www.doe.com"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5 font-semibold">
                <label className="text-slate-600 dark:text-slate-400">Requested Service Type</label>
                <select
                  value={quickAddForm.service}
                  onChange={(e) => setQuickAddForm({ ...quickAddForm, service: e.target.value })}
                  className="border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2.5 rounded-xl outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-[#2563EB] font-semibold cursor-pointer"
                >
                  <option value="Next.js Web Design & Development">Next.js Web Design & Dev</option>
                  <option value="Corporate Business Website">Corporate Business Website</option>
                  <option value="Headless E-commerce Store">Headless E-commerce</option>
                  <option value="Landing Page & Lead Funnel">Landing Page & Funnel</option>
                  <option value="Custom React Web Application">Custom Web App</option>
                  <option value="Maintenance / Custom Web Support">Support & Maintenance</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5 font-semibold">
                <label className="text-slate-600 dark:text-slate-400">Client Description Query</label>
                <textarea
                  value={quickAddForm.message}
                  onChange={(e) => setQuickAddForm({ ...quickAddForm, message: e.target.value })}
                  className="border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-3 rounded-xl outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-[#2563EB] font-medium min-h-[80px] resize-none text-slate-800 dark:text-white"
                  placeholder="Type descriptive details here..."
                />
              </div>

              <div className="flex items-center justify-end gap-3.5 border-t border-slate-100 dark:border-slate-800 pt-5">
                <button
                  type="button"
                  onClick={() => setIsQuickAddOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-250 text-slate-600 dark:text-slate-300 font-extrabold cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={quickAddSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-extrabold cursor-pointer transition-all shadow-sm disabled:opacity-40"
                >
                  {quickAddSubmitting ? "Saving Lead..." : "Save Record"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* LEAD DETAILS DRAWER SLIDEOUT */}
      {selectedLead && (
        <LeadDetailsDrawer
          lead={selectedLead}
          isOpen={isDrawerOpen}
          onClose={() => {
            setIsDrawerOpen(false);
            setSelectedLead(null);
            fetchEnquiries(); // Refresh dashboard data in case things were edited
          }}
          onUpdate={(updatedLead) => {
            setSelectedLead(updatedLead);
            setEnquiries(prev => prev.map(e => e.id === updatedLead.id ? updatedLead : e));
          }}
          currentUserRole={currentRole}
        />
      )}

    </div>
  );
}
