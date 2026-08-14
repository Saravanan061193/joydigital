"use client";

import React, { useState, useEffect } from "react";

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
  type: string; // "created" | "status" | "call" | "whatsapp" | "email" | "note" | "proposal"
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
  tax: number; // GST amount
  terms: string;
  validity: string;
  status: string; // "sent" | "accepted" | "declined"
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
}

interface LeadDetailsDrawerProps {
  lead: Enquiry;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updatedLead: Enquiry) => void;
  currentUserRole?: string;
}

const TEAM_MEMBERS = [
  { name: "Unassigned", value: "" },
  { name: "Saravanan L (Super Admin)", value: "Saravanan L" },
  { name: "Karthik R (Sales Manager)", value: "Karthik R" },
  { name: "Priya S (Sales Executive)", value: "Priya S" },
  { name: "Deepak K (Marketing Specialist)", value: "Deepak K" }
];

const PIPELINE_STAGES = [
  { label: "New Lead", value: "new" },
  { label: "Contacted", value: "contacted" },
  { label: "Qualified", value: "qualified" },
  { label: "Proposal Sent", value: "proposal_sent" },
  { label: "Negotiation", value: "negotiation" },
  { label: "Won", value: "won" },
  { label: "Lost", value: "lost" }
];

const EMAIL_TEMPLATES = [
  {
    name: "Thank You / Welcome",
    subject: "Thank you for contacting Joy Digital!",
    body: (name: string, service: string) => 
`Hi ${name},

Thanks for reaching out to Joy Digital! We received your request regarding "${service}".

Our team is currently reviewing your requirements. We'd love to jump on a quick 10-minute call tomorrow to understand your goals better and outline how we can help.

Are you available at 11:00 AM or 3:00 PM tomorrow?

Best regards,
Joy Digital Team`
  },
  {
    name: "Follow-up",
    subject: "Following up: Joy Digital Services",
    body: (name: string, service: string) => 
`Hi ${name},

Hope you are doing well.

I wanted to quickly follow up on our previous conversation regarding your website project ("${service}"). 

Do you have any questions about our workflow, design methodologies, or pricing plans? We are ready to schedule a kickoff session whenever you are ready.

Looking forward to hearing from you.

Best regards,
Joy Digital Team`
  },
  {
    name: "Quotation / Proposal Sent",
    subject: "Proposal & Quotation: Joy Digital Agency",
    body: (name: string, service: string) => 
`Hi ${name},

It was a pleasure speaking with you about your business objectives.

I have generated and attached our formal Proposal & Quotation for your project: "${service}". You can review the cost breakdowns, timeline checkpoints, and deliverables details.

Please let me know if you would like to proceed or if any adjustments are needed on the scopes of work.

Best regards,
Joy Digital Team`
  }
];

export default function LeadDetailsDrawer({
  lead,
  isOpen,
  onClose,
  onUpdate,
  currentUserRole = "Super Admin"
}: LeadDetailsDrawerProps) {
  const [activeTab, setActiveTab] = useState<"profile" | "timeline" | "notes" | "proposal">("profile");
  const [savingField, setSavingField] = useState<string | null>(null);

  // Notes and Reminder state
  const [followUpDate, setFollowUpDate] = useState(lead.followUpDate || "");
  const [assignedTo, setAssignedTo] = useState(lead.assignedTo || "");
  const [pipelineStage, setPipelineStage] = useState(lead.pipelineStage || "new");
  const [notesText, setNotesText] = useState(lead.notes || "");

  // Activity logger state
  const [newActivityMsg, setNewActivityMsg] = useState("");

  // Proposal Builder State
  const [proposalItems, setProposalItems] = useState<ProposalItem[]>([
    { description: `Next.js Development - ${lead.service}`, price: 25000 }
  ]);
  const [proposalTax, setProposalTax] = useState(18); // Default 18% GST
  const [proposalTerms, setProposalTerms] = useState("50% Advance, 50% upon project completion before launch.\nProject timeline is 10-15 business days.");
  const [proposalValidity, setProposalValidity] = useState("15 Days");

  // Email template state
  const [selectedEmailTemplate, setSelectedEmailTemplate] = useState(0);

  useEffect(() => {
    // Sync states when active lead changes
    setFollowUpDate(lead.followUpDate || "");
    setAssignedTo(lead.assignedTo || "");
    setPipelineStage(lead.pipelineStage || "new");
    setNotesText(lead.notes || "");
  }, [lead]);

  if (!isOpen) return null;

  // Helpers
  const triggerPatch = async (fieldsToUpdate: Partial<Enquiry>, updatedActivities?: Activity[]) => {
    const finalActivities = updatedActivities || lead.activities || [];
    try {
      const res = await fetch("/api/admin/enquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: lead.id,
          ...fieldsToUpdate,
          activities: finalActivities
        })
      });
      if (res.ok) {
        onUpdate({
          ...lead,
          ...fieldsToUpdate,
          activities: finalActivities
        });
      }
    } catch (err) {
      console.error("Failed to patch lead details:", err);
    }
  };

  const logActivity = (type: string, message: string) => {
    const newAct: Activity = {
      id: Math.random().toString(36).substring(2, 11),
      timestamp: new Date().toISOString(),
      type,
      message,
      agent: currentUserRole
    };
    return [newAct, ...(lead.activities || [])];
  };

  const handleFieldChange = async (fieldName: string, value: any) => {
    setSavingField(fieldName);
    const updates: Partial<Enquiry> = {};
    let actMsg = "";
    
    if (fieldName === "followUpDate") {
      updates.followUpDate = value || null;
      actMsg = value ? `Scheduled follow-up reminder for ${new Date(value).toLocaleDateString()}` : "Cleared follow-up reminder";
    } else if (fieldName === "assignedTo") {
      updates.assignedTo = value;
      actMsg = value ? `Assigned lead to ${value}` : "Removed executive assignment";
    } else if (fieldName === "pipelineStage") {
      updates.pipelineStage = value;
      // Keep main status field synced
      let mainStatus = "In Progress";
      if (value === "new") mainStatus = "New";
      else if (value === "won") mainStatus = "Closed";
      else if (value === "lost") mainStatus = "Rejected";
      else if (value === "contacted") mainStatus = "Contacted";
      updates.status = mainStatus;
      
      const stageLabel = PIPELINE_STAGES.find(s => s.value === value)?.label || value;
      actMsg = `Changed pipeline stage to: ${stageLabel}`;
    }

    const updatedActivities = logActivity(fieldName, actMsg);
    await triggerPatch(updates, updatedActivities);
    setSavingField(null);
  };

  const handleSaveNotes = async () => {
    setSavingField("notes");
    const updatedActivities = logActivity("note", "Updated internal notes");
    await triggerPatch({ notes: notesText }, updatedActivities);
    setSavingField(null);
  };

  const handleAddCustomActivity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActivityMsg.trim()) return;
    const updatedActivities = logActivity("note", newActivityMsg.trim());
    await triggerPatch({}, updatedActivities);
    setNewActivityMsg("");
  };

  const handleQuickLog = async (type: "call" | "whatsapp" | "email", detail: string) => {
    const message = `Logged ${type.toUpperCase()}: ${detail}`;
    const updatedActivities = logActivity(type, message);
    await triggerPatch({}, updatedActivities);
  };

  // Proposal calculations
  const proposalSubtotal = proposalItems.reduce((acc, item) => acc + (Number(item.price) || 0), 0);
  const proposalTaxAmount = Math.round(proposalSubtotal * (proposalTax / 100));
  const proposalTotal = proposalSubtotal + proposalTaxAmount;

  const handleAddProposalItem = () => {
    setProposalItems([...proposalItems, { description: "", price: 0 }]);
  };

  const handleRemoveProposalItem = (index: number) => {
    setProposalItems(proposalItems.filter((_, i) => i !== index));
  };

  const handleItemChange = (index: number, field: "description" | "price", val: any) => {
    const copy = [...proposalItems];
    if (field === "price") {
      copy[index].price = Number(val) || 0;
    } else {
      copy[index].description = val;
    }
    setProposalItems(copy);
  };

  const handleSaveProposal = async () => {
    setSavingField("proposal");
    const newProposal: Proposal = {
      id: Math.random().toString(36).substring(2, 11),
      date: new Date().toISOString().split("T")[0],
      value: proposalTotal,
      items: proposalItems,
      tax: proposalTax,
      terms: proposalTerms,
      validity: proposalValidity,
      status: "sent"
    };

    const updatedProposals = [...(lead.proposals || []), newProposal];
    
    // Auto advance stage to proposal_sent
    const updates: Partial<Enquiry> = {
      proposals: updatedProposals,
      pipelineStage: "proposal_sent",
      status: "In Progress"
    };
    
    const updatedActivities = logActivity(
      "proposal", 
      `Generated proposal quote worth ₹${proposalTotal.toLocaleString()} & advanced stage to Proposal Sent`
    );

    await triggerPatch(updates, updatedActivities);
    setSavingField(null);
    alert("Proposal successfully saved and registered inside the lead record!");
  };

  const handlePrintProposal = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const itemsRows = proposalItems.map((item, idx) => `
      <tr style="border-bottom: 1px solid #E2E8F0;">
        <td style="padding: 12px; font-size: 12px; color: #1E293B;">${idx + 1}</td>
        <td style="padding: 12px; font-size: 12px; color: #1E293B; font-weight: 500;">${item.description}</td>
        <td style="padding: 12px; font-size: 12px; color: #1E293B; text-align: right;">₹${item.price.toLocaleString()}</td>
      </tr>
    `).join("");

    printWindow.document.write(`
      <html>
        <head>
          <title>Proposal Quotation - Joy Digital</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
            body { font-family: 'Inter', sans-serif; margin: 0; padding: 40px; color: #1E293B; background: #FFFFFF; }
            .header { display: flex; justify-content: space-between; border-bottom: 2px solid #2563EB; padding-bottom: 20px; margin-bottom: 30px; }
            .logo { font-size: 24px; font-weight: 800; color: #0F172A; }
            .logo span { color: #EA580C; }
            .meta-title { font-size: 20px; font-weight: 800; text-transform: uppercase; color: #2563EB; margin: 0; }
            .info-grid { display: grid; grid-template-cols: 1fr 1fr; gap: 40px; margin-bottom: 40px; }
            .info-block h4 { margin: 0 0 8px 0; font-size: 11px; text-transform: uppercase; color: #64748B; letter-spacing: 0.1em; }
            .info-block p { margin: 0; font-size: 13px; font-weight: 500; line-height: 1.6; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
            th { background: #F8FAFC; padding: 12px; font-size: 10px; font-weight: 800; text-transform: uppercase; color: #64748B; border-bottom: 2px solid #E2E8F0; text-align: left; }
            .totals-container { width: 280px; margin-left: auto; margin-bottom: 40px; }
            .total-row { display: flex; justify-content: space-between; padding: 8px 0; font-size: 13px; }
            .total-row.grand { border-top: 2px solid #2563EB; padding-top: 12px; font-weight: 800; font-size: 16px; color: #0F172A; }
            .terms { border-top: 1px solid #E2E8F0; padding-top: 20px; font-size: 11px; color: #64748B; line-height: 1.6; }
            @media print {
              body { padding: 0; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="no-print" style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 15px; border-radius: 12px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
            <span style="font-size: 12px; font-weight: 600;">Document Generated. Click to print/save.</span>
            <button onclick="window.print()" style="background: #2563EB; color: white; border: none; font-weight: 700; font-size: 11px; padding: 8px 20px; border-radius: 6px; cursor: pointer;">Print / Save PDF</button>
          </div>

          <div class="header">
            <div>
              <div class="logo">Joy<span>Digital</span></div>
              <div style="font-size: 11px; color: #64748B; margin-top: 4px; font-weight: 500;">Premium Web Design & Digital SEO Marketing</div>
            </div>
            <div style="text-align: right;">
              <h2 class="meta-title">Quotation Proposal</h2>
              <div style="font-size: 11px; color: #64748B; margin-top: 6px;">Date: ${new Date().toISOString().split("T")[0]}</div>
              <div style="font-size: 11px; color: #64748B;">Quote Ref: JD-${lead.id.substring(0, 6).toUpperCase()}</div>
            </div>
          </div>

          <div class="info-grid">
            <div class="info-block">
              <h4>Prepared For:</h4>
              <p style="font-weight: 700; color: #0F172A; font-size: 14px;">${lead.name}</p>
              ${lead.companyName !== "N/A" ? `<p>${lead.companyName}</p>` : ""}
              <p>Email: ${lead.email}</p>
              <p>Mobile: ${lead.mobile}</p>
            </div>
            <div class="info-block">
              <h4>Prepared By:</h4>
              <p style="font-weight: 700; color: #0F172A; font-size: 14px;">Joy Digital Agency</p>
              <p>Chennai, Tamil Nadu, India</p>
              <p>Email: saravanan061193@gmail.com</p>
              <p>Web: www.joydigital.in</p>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th style="width: 60px;">S.No</th>
                <th>Service Scope Description</th>
                <th style="width: 120px; text-align: right;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${itemsRows}
            </tbody>
          </table>

          <div class="totals-container">
            <div class="total-row">
              <span style="color: #64748B;">Subtotal:</span>
              <span style="font-weight: 600;">₹${proposalSubtotal.toLocaleString()}</span>
            </div>
            <div class="total-row">
              <span style="color: #64748B;">GST (${proposalTax}%):</span>
              <span style="font-weight: 600;">₹${proposalTaxAmount.toLocaleString()}</span>
            </div>
            <div class="total-row grand">
              <span>Grand Total:</span>
              <span>₹${proposalTotal.toLocaleString()}</span>
            </div>
          </div>

          <div class="terms">
            <h4 style="margin: 0 0 8px 0; font-size: 11px; color: #0F172A;">Terms & Conditions:</h4>
            <div style="white-space: pre-wrap; font-weight: 500;">${proposalTerms}</div>
            <p style="margin-top: 15px; font-weight: 600; color: #0F172A;">Proposal Validity: ${proposalValidity}</p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  // WhatsApp generator
  const getWhatsAppLink = () => {
    const prefilledText = `Hi ${lead.name}, thanks for contacting Joy Digital regarding our ${lead.service} services. I'd love to discuss your project requirements!`;
    const cleanedMobile = lead.mobile.replace(/\D/g, "");
    return `https://wa.me/${cleanedMobile}?text=${encodeURIComponent(prefilledText)}`;
  };

  const currentTemplate = EMAIL_TEMPLATES[selectedEmailTemplate];
  const templateBody = currentTemplate.body(lead.name, lead.service);
  const mailtoLink = `mailto:${lead.email}?subject=${encodeURIComponent(currentTemplate.subject)}&body=${encodeURIComponent(templateBody)}`;

  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-fade-in select-none">
      {/* Drawer Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity" 
        onClick={onClose} 
      />

      {/* Drawer Body */}
      <div className="relative w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col z-10 transition-transform duration-300 transform translate-x-0 border-l border-slate-200">
        
        {/* Header Section */}
        <div className="p-6 border-b border-slate-200/80 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
              {lead.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 leading-tight">{lead.name}</h3>
              <p className="text-[10px] text-slate-500 mt-1 font-medium">
                {lead.companyName !== "N/A" ? lead.companyName : "Individual Lead"} • ID: <code className="bg-slate-100 text-blue-600 px-1 py-0.5 rounded font-mono text-[9px]">{lead.id.substring(0, 8)}</code>
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {savingField && (
              <span className="text-[9px] text-slate-400 font-bold bg-slate-100 border border-slate-200 px-2.5 py-0.75 rounded-lg flex items-center gap-1.5 animate-pulse">
                <i className="fa-solid fa-circle-notch animate-spin" /> Saving Changes
              </span>
            )}
            <button 
              onClick={onClose} 
              className="w-8 h-8 rounded-lg hover:bg-slate-200 text-slate-500 hover:text-slate-700 flex items-center justify-center cursor-pointer transition-colors"
            >
              <i className="fa-solid fa-xmark text-sm" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-150 px-6 bg-slate-50/50">
          {[
            { id: "profile", label: "Lead Profile", icon: "fa-regular fa-user" },
            { id: "timeline", label: "Activity Timeline", icon: "fa-solid fa-timeline" },
            { id: "notes", label: "Notes & Reminders", icon: "fa-regular fa-bell" },
            { id: "proposal", label: "Proposals / Quote", icon: "fa-regular fa-file-lines" }
          ].map((tab) => {
            const isTabActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 px-4 border-b-2 font-bold text-xs flex items-center gap-2 cursor-pointer transition-all ${
                  isTabActive 
                    ? "border-blue-600 text-blue-600 bg-white -mb-[1px] rounded-t-lg border-t border-x border-slate-200/50 px-4" 
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                <i className={`${tab.icon} text-xs`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Contents Scroll Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* TAB 1: LEAD PROFILE VIEW */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              
              {/* Core Information Section */}
              <div className="bg-slate-50/50 border border-slate-200/80 rounded-2xl p-5 space-y-4">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                  <i className="fa-solid fa-address-card text-blue-600" /> Contact Details
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <span className="text-slate-450 block font-semibold text-[10px]">Email ID</span>
                    <a href={`mailto:${lead.email}`} className="text-slate-800 font-bold hover:text-blue-600 hover:underline">{lead.email}</a>
                  </div>
                  <div className="space-y-1">
                    <span className="text-slate-450 block font-semibold text-[10px]">Mobile Phone</span>
                    <a href={`tel:${lead.mobile}`} className="text-slate-800 font-bold hover:text-blue-600 hover:underline">{lead.mobile}</a>
                  </div>
                  <div className="space-y-1">
                    <span className="text-slate-450 block font-semibold text-[10px]">Website URL</span>
                    {lead.website !== "N/A" ? (
                      <a href={lead.website.startsWith("http") ? lead.website : `https://${lead.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold hover:underline flex items-center gap-1">
                        {lead.website} <i className="fa-solid fa-arrow-up-right-from-square text-[9px]" />
                      </a>
                    ) : (
                      <span className="text-slate-400 italic">Not Provided</span>
                    )}
                  </div>
                  <div className="space-y-1">
                    <span className="text-slate-450 block font-semibold text-[10px]">Region</span>
                    <span className="bg-slate-100 border border-slate-200 px-2 py-0.5 font-bold rounded text-[9.5px] text-slate-600 uppercase inline-block">{lead.region}</span>
                  </div>
                </div>
              </div>

              {/* Assignment and Pipeline Status Settings */}
              <div className="bg-slate-50/50 border border-slate-200/80 rounded-2xl p-5 space-y-4">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                  <i className="fa-solid fa-briefcase text-blue-600" /> Sales Assignment & Stage
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-bold text-slate-650">Pipeline Stage</label>
                    <select
                      value={pipelineStage}
                      onChange={(e) => {
                        setPipelineStage(e.target.value);
                        handleFieldChange("pipelineStage", e.target.value);
                      }}
                      disabled={savingField === "pipelineStage"}
                      className="border border-slate-200 bg-white px-3 py-2.5 rounded-xl outline-none font-bold text-slate-800 cursor-pointer text-xs"
                    >
                      {PIPELINE_STAGES.map((s) => (
                        <option key={s.value} value={s.value}>{s.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-bold text-slate-650">Assigned Agent</label>
                    <select
                      value={assignedTo}
                      onChange={(e) => {
                        setAssignedTo(e.target.value);
                        handleFieldChange("assignedTo", e.target.value);
                      }}
                      disabled={savingField === "assignedTo"}
                      className="border border-slate-200 bg-white px-3 py-2.5 rounded-xl outline-none font-bold text-slate-800 cursor-pointer text-xs"
                    >
                      {TEAM_MEMBERS.map((m) => (
                        <option key={m.value} value={m.value}>{m.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Service requested and initial query */}
              <div className="bg-slate-50/50 border border-slate-200/80 rounded-2xl p-5 space-y-4">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                  <i className="fa-regular fa-comment text-blue-600" /> Client Requirement
                </h4>
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-slate-450 block font-semibold text-[10px] mb-0.5">Target Service</span>
                    <span className="font-bold text-slate-800">{lead.service}</span>
                  </div>
                  <div>
                    <span className="text-slate-450 block font-semibold text-[10px] mb-1">Requirement Details Message</span>
                    <div className="bg-white border border-slate-200 rounded-xl p-4 text-[12px] text-slate-700 leading-relaxed whitespace-pre-wrap max-h-40 overflow-y-auto">
                      {lead.message}
                    </div>
                  </div>
                </div>
              </div>

              {/* UTM Acquisition Parameters */}
              <div className="bg-slate-50/50 border border-slate-200/80 rounded-2xl p-5 space-y-4">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                  <i className="fa-solid fa-filter-list text-blue-600" /> Marketing Attribution (UTM Parameters)
                </h4>
                
                {lead.utmParams ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs font-semibold">
                    <div className="space-y-0.5">
                      <span className="text-slate-450 block text-[9.5px]">UTM Source</span>
                      <span className="text-slate-800 font-extrabold text-[12px]">{lead.utmParams.source || "-"}</span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-slate-450 block text-[9.5px]">UTM Medium</span>
                      <span className="text-slate-850 font-bold">{lead.utmParams.medium || "-"}</span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-slate-450 block text-[9.5px]">Campaign Name</span>
                      <span className="text-slate-850 font-bold">{lead.utmParams.campaign || "-"}</span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-slate-450 block text-[9.5px]">UTM Term</span>
                      <span className="text-slate-850 font-bold">{lead.utmParams.term || "-"}</span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-slate-450 block text-[9.5px]">UTM Content</span>
                      <span className="text-slate-850 font-bold">{lead.utmParams.content || "-"}</span>
                    </div>
                    <div className="space-y-0.5 col-span-2">
                      <span className="text-slate-450 block text-[9.5px]">Landing Page URL</span>
                      <span className="text-slate-800 text-[10.5px] font-mono break-all leading-tight">{lead.utmParams.landingPage || "-"}</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-slate-450 italic text-[11px] py-1">
                    <i className="fa-solid fa-circle-info text-blue-500" />
                    <span>Direct or organic traffic (No UTM parameters were captured for this submission).</span>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 2: ACTIVITY TIMELINE */}
          {activeTab === "timeline" && (
            <div className="space-y-6">
              
              {/* Quick Actions Panel */}
              <div className="bg-slate-50/50 border border-slate-200/80 rounded-2xl p-5 space-y-4">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                  <i className="fa-solid fa-bolt text-blue-600" /> Quick Activity Logger
                </h4>
                
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <button 
                    onClick={() => handleQuickLog("call", "Contacted lead via voice call")}
                    className="py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 font-bold text-slate-600 flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
                  >
                    <i className="fa-solid fa-phone text-blue-500" /> Voice Call
                  </button>
                  <button 
                    onClick={() => handleQuickLog("whatsapp", "Sent update message via WhatsApp")}
                    className="py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 font-bold text-slate-600 flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
                  >
                    <i className="fa-brands fa-whatsapp text-emerald-500" /> WhatsApp
                  </button>
                  <button 
                    onClick={() => handleQuickLog("email", "Sent follow-up / quotation email")}
                    className="py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 font-bold text-slate-600 flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
                  >
                    <i className="fa-regular fa-envelope text-blue-500" /> Email Sent
                  </button>
                </div>

                <form onSubmit={handleAddCustomActivity} className="flex gap-3 border-t border-slate-150 pt-4 mt-2">
                  <input
                    type="text"
                    placeholder="Log a custom activity description..."
                    value={newActivityMsg}
                    onChange={(e) => setNewActivityMsg(e.target.value)}
                    className="flex-1 text-xs px-3.5 py-2.5 border border-slate-200 bg-white rounded-xl outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    Log Activity
                  </button>
                </form>
              </div>

              {/* Graphical Timeline Feed */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 pl-1 mb-2">
                  <i className="fa-solid fa-history text-blue-600" /> Interaction logs History
                </h4>
                
                {lead.activities && lead.activities.length > 0 ? (
                  <div className="relative pl-6 border-l-2 border-slate-200 space-y-6 ml-3 text-xs">
                    {lead.activities.map((act) => {
                      // Determine Icon and Color
                      let icon = "fa-solid fa-circle-dot text-slate-400";
                      if (act.type === "created") icon = "fa-solid fa-stars text-orange-500 bg-orange-50";
                      else if (act.type === "status" || act.type === "pipelineStage") icon = "fa-solid fa-rotate text-blue-500 bg-blue-50";
                      else if (act.type === "call") icon = "fa-solid fa-phone text-[#2563EB] bg-blue-50";
                      else if (act.type === "whatsapp") icon = "fa-brands fa-whatsapp text-emerald-600 bg-emerald-50";
                      else if (act.type === "email") icon = "fa-regular fa-envelope text-[#EA580C] bg-orange-50";
                      else if (act.type === "note") icon = "fa-regular fa-comment text-amber-600 bg-amber-50";
                      else if (act.type === "proposal") icon = "fa-regular fa-file-lines text-purple-600 bg-purple-50";

                      return (
                        <div key={act.id} className="relative group">
                          {/* Dot Badge */}
                          <div className="absolute -left-[37px] top-0 w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center text-[10px] bg-white shadow-xs">
                            <i className={icon.split(" ")[0] + " " + icon.split(" ")[1]} style={{ color: icon.includes("text-") ? undefined : "#2563EB" }} />
                          </div>
                          
                          <div className="space-y-1 pl-1">
                            <div className="font-bold text-slate-800">{act.message}</div>
                            <div className="text-[10px] text-slate-450 font-semibold flex items-center gap-2">
                              <span>By {act.agent}</span>
                              <span>•</span>
                              <span>{new Date(act.timestamp).toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="py-12 border border-dashed border-slate-200 rounded-2xl text-center text-slate-450 italic text-xs">
                    No custom activity has been logged on this lead.
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 3: NOTES & REMINDERS */}
          {activeTab === "notes" && (
            <div className="space-y-6">
              
              {/* Follow-up Reminder Picker */}
              <div className="bg-slate-50/50 border border-slate-200/80 rounded-2xl p-5 space-y-4">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                  <i className="fa-regular fa-calendar-check text-blue-600" /> Schedule Next Follow-up
                </h4>
                
                <div className="flex flex-col gap-2.5 text-xs">
                  <label className="font-bold text-slate-650">Select Target Follow-up Date & Time</label>
                  <div className="flex gap-4">
                    <input
                      type="datetime-local"
                      value={followUpDate}
                      onChange={(e) => {
                        setFollowUpDate(e.target.value);
                        handleFieldChange("followUpDate", e.target.value);
                      }}
                      className="border border-slate-200 bg-white px-3 py-2 rounded-xl outline-none font-semibold text-slate-800 flex-1 text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setFollowUpDate("");
                        handleFieldChange("followUpDate", "");
                      }}
                      className="px-4 py-2 border border-rose-200 rounded-xl text-rose-600 hover:bg-rose-50 font-bold transition-colors cursor-pointer text-xs"
                    >
                      Clear
                    </button>
                  </div>
                  {followUpDate && (
                    <div className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-100 rounded-lg p-2.5 mt-1.5 flex items-center gap-2 leading-snug">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                      </span>
                      <span>The CRM system will alert you in the Notification Feed when this follow-up deadline is reached.</span>
                    </div>
                  )}
                </div>
              </div>

              {/* WhatsApp Launch CTA (One-Click) */}
              <div className="bg-emerald-50/40 border border-emerald-200 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-[10px] font-black text-emerald-700 uppercase tracking-widest flex items-center gap-1.5">
                    <i className="fa-brands fa-whatsapp text-emerald-600 text-sm" /> One-Click WhatsApp Integration
                  </h4>
                  <span className="bg-emerald-100 text-emerald-800 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded border border-emerald-250">
                    Instant Connect
                  </span>
                </div>
                
                <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                  Launch the WhatsApp API instantly to chat with <strong className="text-slate-800">{lead.name}</strong>. The system will pre-fill a personalized greeting summarizing the requested service details.
                </p>

                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleQuickLog("whatsapp", "Sent direct update WhatsApp message")}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs py-3.5 rounded-xl shadow-xs transition-colors text-center flex items-center justify-center gap-2 cursor-pointer"
                >
                  <i className="fa-brands fa-whatsapp text-base" /> Start WhatsApp Chat <i className="fa-solid fa-arrow-up-right-from-square text-[9px] ml-0.5" />
                </a>
              </div>

              {/* Main notes textarea editor */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center pl-1">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                    <i className="fa-regular fa-file-alt text-blue-600" /> Internal Notes / Conversation Logs
                  </h4>
                  <button 
                    onClick={handleSaveNotes}
                    disabled={savingField === "notes"}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 bg-transparent flex items-center gap-1 cursor-pointer"
                  >
                    <i className="fa-regular fa-floppy-disk" /> Save Notes
                  </button>
                </div>
                <textarea
                  value={notesText}
                  onChange={(e) => setNotesText(e.target.value)}
                  placeholder="Record summary conversations, requirements details, quotations history, or action checklist items here..."
                  className="w-full bg-white border border-slate-200 rounded-2xl p-4 text-[12.5px] text-slate-850 placeholder:text-slate-400 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all font-medium leading-relaxed min-h-[180px] shadow-xs resize-none"
                />
              </div>

            </div>
          )}

          {/* TAB 4: PROPOSAL PDF GENERATOR & EMAILS */}
          {activeTab === "proposal" && (
            <div className="space-y-6">
              
              {/* Proposal items list */}
              <div className="bg-slate-50/50 border border-slate-200/80 rounded-2xl p-5 space-y-4">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                  <i className="fa-regular fa-file-pdf text-blue-600" /> Proposal Quote Builder
                </h4>

                <div className="space-y-3.5">
                  {proposalItems.map((item, idx) => (
                    <div key={idx} className="flex gap-3 items-center">
                      <div className="text-[11px] font-bold text-slate-400 w-5 text-center">{idx + 1}</div>
                      <input
                        type="text"
                        placeholder="Service description (e.g. Speed Optimizations, Website Design)"
                        value={item.description}
                        onChange={(e) => handleItemChange(idx, "description", e.target.value)}
                        className="flex-1 text-xs px-3 py-2 bg-white border border-slate-200 rounded-xl outline-none font-semibold text-slate-800"
                      />
                      <div className="relative w-28 shrink-0">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">₹</span>
                        <input
                          type="number"
                          placeholder="Price"
                          value={item.price || ""}
                          onChange={(e) => handleItemChange(idx, "price", e.target.value)}
                          className="w-full text-xs pl-6 pr-3 py-2 bg-white border border-slate-200 rounded-xl outline-none font-extrabold text-slate-800"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveProposalItem(idx)}
                        disabled={proposalItems.length === 1}
                        className="w-8 h-8 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600 flex items-center justify-center transition-colors cursor-pointer border border-transparent disabled:opacity-40"
                      >
                        <i className="fa-regular fa-trash-can text-[11px]" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center border-t border-slate-150 pt-4 mt-2">
                  <button
                    type="button"
                    onClick={handleAddProposalItem}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 bg-transparent flex items-center gap-1.5 cursor-pointer"
                  >
                    <i className="fa-solid fa-plus text-[10px]" /> Add Service Item
                  </button>
                  
                  <div className="flex gap-4 items-center text-xs">
                    <label className="font-bold text-slate-650 flex items-center gap-1.5">
                      <span>GST (%):</span>
                      <input
                        type="number"
                        value={proposalTax}
                        onChange={(e) => setProposalTax(Number(e.target.value) || 0)}
                        className="w-14 text-center px-1.5 py-1 border border-slate-200 rounded-lg outline-none font-extrabold text-slate-800 text-xs"
                      />
                    </label>
                  </div>
                </div>

                {/* Terms and validity inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-150 pt-4 mt-2 text-xs">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-bold text-slate-650">Proposal Validity (Period)</label>
                    <input
                      type="text"
                      value={proposalValidity}
                      onChange={(e) => setProposalValidity(e.target.value)}
                      placeholder="e.g. 15 Days, 1 Month"
                      className="border border-slate-200 bg-white px-3 py-2 rounded-xl outline-none font-semibold text-slate-800"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-bold text-slate-650">Payment / Delivery Terms</label>
                    <textarea
                      value={proposalTerms}
                      onChange={(e) => setProposalTerms(e.target.value)}
                      placeholder="Pricing stages terms..."
                      className="border border-slate-200 bg-white p-3 rounded-xl outline-none font-semibold text-slate-800 resize-none h-16"
                    />
                  </div>
                </div>

                {/* Totals Summary */}
                <div className="border-t border-slate-150 pt-4 mt-2 flex flex-col items-end gap-2 text-xs">
                  <div className="flex justify-between w-52 text-slate-500 font-semibold">
                    <span>Subtotal:</span>
                    <span>₹{proposalSubtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between w-52 text-slate-500 font-semibold">
                    <span>GST ({proposalTax}%):</span>
                    <span>₹{proposalTaxAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between w-52 font-black text-slate-900 border-t border-slate-200 pt-2 text-[13px]">
                    <span>Grand Total:</span>
                    <span>₹{proposalTotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 border-t border-slate-150 pt-4 mt-2">
                  <button
                    type="button"
                    onClick={handlePrintProposal}
                    className="flex-1 py-3 border border-slate-200 bg-white hover:bg-slate-50 font-extrabold text-xs text-slate-700 rounded-xl transition-all cursor-pointer shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <i className="fa-solid fa-arrow-up-right-from-square text-blue-500" /> Preview & Print PDF
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveProposal}
                    disabled={savingField === "proposal"}
                    className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 font-extrabold text-xs text-white rounded-xl transition-all cursor-pointer shadow-xs flex items-center justify-center gap-1.5 disabled:opacity-40"
                  >
                    <i className="fa-solid fa-check" /> Register Proposal & Advance Status
                  </button>
                </div>
              </div>

              {/* Interactive Email templates picker */}
              <div className="bg-slate-50/50 border border-slate-200/80 rounded-2xl p-5 space-y-4">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                  <i className="fa-regular fa-envelope text-blue-600" /> Predefined Email Templates
                </h4>

                <div className="flex gap-2">
                  {EMAIL_TEMPLATES.map((tmpl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedEmailTemplate(idx)}
                      className={`px-3 py-1.75 rounded-lg border font-bold text-[10.5px] transition-colors cursor-pointer ${
                        selectedEmailTemplate === idx
                          ? "bg-blue-50 border-blue-200 text-blue-700"
                          : "border-slate-200 bg-white text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      {tmpl.name}
                    </button>
                  ))}
                </div>

                <div className="space-y-3 text-xs bg-white border border-slate-250 rounded-xl p-4 leading-relaxed font-semibold">
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase block font-bold">Email Subject</span>
                    <span className="text-slate-850 font-extrabold">{currentTemplate.subject}</span>
                  </div>
                  <div className="border-t border-slate-150 pt-2">
                    <span className="text-[9px] text-slate-400 uppercase block font-bold mb-1">Email Body Draft</span>
                    <pre className="text-slate-700 whitespace-pre-wrap font-sans text-xs break-all leading-normal">{templateBody}</pre>
                  </div>
                </div>

                {/* Email triggers */}
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(`Subject: ${currentTemplate.subject}\n\n${templateBody}`);
                      alert("Email subject and body copied to clipboard!");
                    }}
                    className="flex-1 py-2.5 border border-slate-200 bg-white hover:bg-slate-50 font-bold text-xs text-slate-600 rounded-xl transition-all cursor-pointer shadow-xs"
                  >
                    <i className="fa-regular fa-copy mr-1.5" /> Copy Email Draft
                  </button>
                  <a
                    href={mailtoLink}
                    onClick={() => handleQuickLog("email", `Sent email template: ${currentTemplate.name}`)}
                    className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 font-extrabold text-xs text-white rounded-xl transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <i className="fa-regular fa-paper-plane" /> Open Email Client
                  </a>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
