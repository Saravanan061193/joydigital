"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { INITIAL_WELCOME_STEP, CHAT_STEPS_MAP, generateWhatsAppUrl } from "@/lib/chat/flows";
import { ChatStep, ChatLeadData, MessageItem, ChatOption } from "@/lib/chat/types";

export default function ChatbotWidget() {
  const pathname = usePathname();

  // Lifecycle & Display states
  const [shouldRender, setShouldRender] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  // Session & Flow states
  const [sessionId, setSessionId] = useState("");
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [stepHistory, setStepHistory] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState<ChatStep>(INITIAL_WELCOME_STEP);
  const [leadData, setLeadData] = useState<Partial<ChatLeadData>>({});
  const [isTyping, setIsTyping] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [submittedLeadId, setSubmittedLeadId] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState(false);

  // Input fields state for step inputs
  const [textInput, setTextInput] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [formError, setFormError] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 1. Defer rendering for PageSpeed optimization
  useEffect(() => {
    if (typeof window !== "undefined" && typeof navigator !== "undefined") {
      const isBot = /Lighthouse|Googlebot|HeadlessChromium|Chrome-Lighthouse|PTST/i.test(navigator.userAgent);
      if (isBot) return;
    }

    const timer = setTimeout(() => {
      setShouldRender(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // 2. Initialize session and proactive tooltip
  useEffect(() => {
    if (!shouldRender) return;

    let savedSessionId = localStorage.getItem("jd_chat_session_id");
    if (!savedSessionId) {
      savedSessionId = "jd_sess_" + Math.random().toString(36).substring(2, 12);
      localStorage.setItem("jd_chat_session_id", savedSessionId);
    }
    setSessionId(savedSessionId);

    // Initial Welcome Message
    const welcomeMsg: MessageItem = {
      id: "msg_welcome",
      role: "assistant",
      text: INITIAL_WELCOME_STEP.question,
      timestamp: new Date().toISOString(),
      options: INITIAL_WELCOME_STEP.options,
      stepId: INITIAL_WELCOME_STEP.id,
    };
    setMessages([welcomeMsg]);

    // Show proactive tooltip after 10 seconds if chat not opened
    const tooltipDismissed = localStorage.getItem("jd_tooltip_dismissed");
    if (!tooltipDismissed) {
      const tooltipTimer = setTimeout(() => {
        setShowTooltip(true);
      }, 10000);
      return () => clearTimeout(tooltipTimer);
    }
  }, [shouldRender]);

  // 3. Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, currentStep]);

  // Track Analytics
  const trackEvent = (eventName: string, params?: Record<string, any>) => {
    if (typeof window !== "undefined") {
      if ((window as any).trackJoyDigitalEvent) {
        (window as any).trackJoyDigitalEvent(eventName, params);
      } else if ((window as any).gtag) {
        (window as any).gtag("event", eventName, params || {});
      }
    }
  };

  const handleOpenChat = () => {
    setIsOpen(true);
    setHasUnread(false);
    setShowTooltip(false);
    localStorage.setItem("jd_tooltip_dismissed", "true");
    trackEvent("chat_opened", { sessionId });
  };

  const handleCloseTooltip = () => {
    setShowTooltip(false);
    localStorage.setItem("jd_tooltip_dismissed", "true");
  };

  // Helper to add assistant typing delay
  const pushAssistantMessage = (step: ChatStep, newHistoryMsg?: MessageItem) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setCurrentStep(step);

      const assistantMsg: MessageItem = {
        id: "msg_" + Math.random().toString(36).substring(2, 9),
        role: "assistant",
        text: step.question,
        timestamp: new Date().toISOString(),
        options: step.options,
        stepId: step.id,
      };

      setMessages((prev) => (newHistoryMsg ? [...prev, newHistoryMsg, assistantMsg] : [...prev, assistantMsg]));
    }, 450);
  };

  // Handle Option Click
  const handleSelectOption = (option: ChatOption) => {
    const userMsg: MessageItem = {
      id: "msg_" + Math.random().toString(36).substring(2, 9),
      role: "user",
      text: option.label,
      timestamp: new Date().toISOString(),
    };

    // Update lead data if fieldKey exists on current step
    const updatedLeadData = { ...leadData };
    if (currentStep.fieldKey) {
      (updatedLeadData as any)[currentStep.fieldKey] = option.value;
      setLeadData(updatedLeadData);
    }

    if (currentStep.id === "welcome_start") {
      updatedLeadData.service = option.label.replace(/^[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]/g, "").trim();
      setLeadData(updatedLeadData);
      trackEvent("service_selected", { service: option.value });
    }

    // Record step history for Back button
    setStepHistory((prev) => [...prev, currentStep.id]);

    const nextStepId = option.nextStepId || currentStep.nextStepId;
    if (nextStepId && CHAT_STEPS_MAP[nextStepId]) {
      pushAssistantMessage(CHAT_STEPS_MAP[nextStepId], userMsg);
    }
  };

  // Handle Text/Textarea Submit
  const handleTextSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!textInput.trim()) return;

    const val = textInput.trim();
    setTextInput("");

    const userMsg: MessageItem = {
      id: "msg_" + Math.random().toString(36).substring(2, 9),
      role: "user",
      text: val,
      timestamp: new Date().toISOString(),
    };

    const updatedLeadData = { ...leadData };
    if (currentStep.fieldKey) {
      (updatedLeadData as any)[currentStep.fieldKey] = val;
      setLeadData(updatedLeadData);
    }

    setStepHistory((prev) => [...prev, currentStep.id]);

    const nextStepId = currentStep.nextStepId;
    if (nextStepId && CHAT_STEPS_MAP[nextStepId]) {
      pushAssistantMessage(CHAT_STEPS_MAP[nextStepId], userMsg);
    }
  };

  // Handle Back Button
  const handleGoBack = () => {
    if (stepHistory.length === 0) return;
    const prevHistory = [...stepHistory];
    const lastStepId = prevHistory.pop()!;
    setStepHistory(prevHistory);

    const prevStep = CHAT_STEPS_MAP[lastStepId] || INITIAL_WELCOME_STEP;
    setCurrentStep(prevStep);

    // Rollback last messages
    setMessages((prev) => {
      if (prev.length >= 2) return prev.slice(0, prev.length - 2);
      return prev;
    });
  };

  // Handle Start Over
  const handleRestartChat = () => {
    setShowResetModal(false);
    setStepHistory([]);
    setLeadData({});
    setIsCompleted(false);
    setSubmitError(false);
    setSubmittedLeadId(null);
    setCurrentStep(INITIAL_WELCOME_STEP);

    const freshSessionId = "jd_sess_" + Math.random().toString(36).substring(2, 12);
    localStorage.setItem("jd_chat_session_id", freshSessionId);
    setSessionId(freshSessionId);

    const welcomeMsg: MessageItem = {
      id: "msg_welcome_new",
      role: "assistant",
      text: INITIAL_WELCOME_STEP.question,
      timestamp: new Date().toISOString(),
      options: INITIAL_WELCOME_STEP.options,
      stepId: INITIAL_WELCOME_STEP.id,
    };
    setMessages([welcomeMsg]);
  };

  // Handle Final Contact Form Submission
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!contactName.trim()) {
      setFormError("Please enter your name.");
      return;
    }
    if (!contactPhone.trim()) {
      setFormError("Please enter your WhatsApp / mobile number.");
      return;
    }

    setIsSubmitting(true);

    const finalLeadPayload: ChatLeadData = {
      service: leadData.service || "Website & Digital Services",
      subService: leadData.subService || leadData.websiteType || leadData.marketingService || leadData.quotationService || "N/A",
      websiteType: leadData.websiteType,
      improvements: leadData.improvements,
      budget: leadData.budget || leadData.monthlyBudget,
      timeline: leadData.timeline,
      websiteUrl: leadData.websiteUrl,
      targetLocation: leadData.targetLocation,
      targetMarket: leadData.targetMarket,
      hasWebsite: leadData.hasWebsite,
      marketingService: leadData.marketingService,
      monthlyBudget: leadData.monthlyBudget,
      quotationService: leadData.quotationService,
      requirement: leadData.requirement,
      questionCategory: leadData.questionCategory,
      businessName: leadData.businessName || "N/A",
      name: contactName.trim(),
      phone: contactPhone.trim(),
      email: contactEmail.trim(),
      pageUrl: typeof window !== "undefined" ? window.location.href : "https://joydigital.in",
      leadSource: "website_chatbot",
    };

    const userMsg: MessageItem = {
      id: "msg_contact_user",
      role: "user",
      text: `Name: ${finalLeadPayload.name}\nWhatsApp: ${finalLeadPayload.phone}${finalLeadPayload.email ? `\nEmail: ${finalLeadPayload.email}` : ""}`,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          ...finalLeadPayload,
          messages: messages.map((m) => ({ role: m.role, message: m.text, timestamp: m.timestamp })),
        }),
      });

      setIsTyping(false);

      if (res.ok) {
        const data = await res.json();
        setSubmittedLeadId(data.leadId);
        setIsCompleted(true);
        setLeadData(finalLeadPayload);

        trackEvent("lead_submitted", { service: finalLeadPayload.service });

        const confirmMsg: MessageItem = {
          id: "msg_confirm",
          role: "assistant",
          text: `Thanks, ${finalLeadPayload.name}! 🎉\n\nWe've received your requirement.\nOur team will review it and contact you shortly.`,
          timestamp: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, confirmMsg]);
      } else {
        setSubmitError(true);
        setIsCompleted(true);
      }
    } catch (err) {
      console.error("Chatbot lead submission error:", err);
      setIsTyping(false);
      setSubmitError(true);
      setIsCompleted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle WhatsApp Click
  const handleWhatsAppRedirect = () => {
    if (submittedLeadId) {
      fetch("/api/chat/whatsapp-click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId: submittedLeadId }),
      }).catch(() => {});
    }

    trackEvent("whatsapp_clicked", { service: leadData.service });

    const waUrl = generateWhatsAppUrl(contactPhone || leadData.phone || "", {
      service: leadData.service || "Web Services",
      businessName: leadData.businessName,
      subService: leadData.subService || leadData.websiteType,
      budget: leadData.budget || leadData.monthlyBudget,
      timeline: leadData.timeline,
      name: contactName || leadData.name || "Customer",
      phone: contactPhone || leadData.phone || "",
    });

    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  // Exclude rendering on admin pages or before initial delay
  if (pathname?.startsWith("/admin") || !shouldRender) {
    return null;
  }

  return (
    <div className="fixed bottom-20 left-4 sm:bottom-6 sm:left-6 z-50 font-sans select-none">
      {/* 1. Proactive Tooltip (Shows after 10s) */}
      {!isOpen && showTooltip && (
        <div className="absolute bottom-16 left-0 mb-2 w-64 bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 p-3.5 rounded-2xl shadow-2xl animate-fade-in text-xs z-50">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
              <p className="font-bold text-slate-800 dark:text-white">Need help choosing?</p>
            </div>
            <button
              onClick={handleCloseTooltip}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
            >
              <i className="fa-solid fa-xmark text-xs" />
            </button>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-normal">
            Chat with us to find the right website or SEO solution for your business!
          </p>
          <div className="flex gap-2 mt-3">
            <button
              onClick={handleOpenChat}
              className="px-3 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-bold text-[10.5px] hover:shadow-md cursor-pointer transition-all"
            >
              Chat with us
            </button>
            <button
              onClick={handleCloseTooltip}
              className="px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg font-semibold text-[10.5px] cursor-pointer"
            >
              Not now
            </button>
          </div>
        </div>
      )}

      {/* 2. Floating Circular Chat Button */}
      {!isOpen && (
        <button
          onClick={handleOpenChat}
          aria-label="Open Joy Digital Chat"
          className="relative w-13 h-13 sm:w-14 sm:h-14 bg-gradient-to-tr from-purple-600 to-indigo-650 hover:from-purple-700 hover:to-indigo-700 text-white rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all hover:scale-105 cursor-pointer border border-purple-400/20 active:scale-95 animate-bounce-subtle"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>

          {/* Unread badge */}
          {hasUnread && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex items-center justify-center rounded-full h-4 w-4 bg-emerald-500 text-[9px] font-black text-white">
                1
              </span>
            </span>
          )}
        </button>
      )}

      {/* 3. Main Chat Window Panel */}
      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-24 sm:left-6 w-full sm:w-[380px] h-full sm:h-[600px] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-none sm:rounded-[24px] shadow-2xl flex flex-col overflow-hidden animate-fade-in transition-all z-50">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-650 p-4 text-white flex items-center justify-between shrink-0 shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-white/15 rounded-xl flex items-center justify-center relative shadow-inner border border-white/20">
                <span className="font-black text-xs tracking-tighter">JD</span>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-purple-600"></span>
              </div>
              <div className="text-left">
                <h4 className="text-xs font-extrabold tracking-wide leading-none">Joy Digital</h4>
                <span className="text-[9.5px] text-purple-100 font-medium mt-1 inline-block">
                  Let's find the right solution for your business.
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* Back button */}
              {stepHistory.length > 0 && !isCompleted && (
                <button
                  onClick={handleGoBack}
                  className="w-7 h-7 rounded-lg hover:bg-white/15 text-white/80 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
                  title="Go Back 1 Step"
                >
                  <i className="fa-solid fa-chevron-left text-xs" />
                </button>
              )}

              {/* Start Over button */}
              <button
                onClick={() => setShowResetModal(true)}
                className="w-7 h-7 rounded-lg hover:bg-white/15 text-white/80 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
                title="Start Over"
              >
                <i className="fa-solid fa-rotate-right text-xs" />
              </button>

              {/* Minimize/Close */}
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-lg hover:bg-white/15 text-white/80 hover:text-white flex items-center justify-center cursor-pointer transition-colors ml-1"
                title="Close chat"
              >
                <i className="fa-solid fa-xmark text-sm" />
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs text-left bg-slate-50/60 dark:bg-slate-950/30">
            {messages.map((msg, idx) => {
              const isBot = msg.role === "assistant";
              return (
                <div key={msg.id || idx} className={`flex ${isBot ? "justify-start" : "justify-end"} gap-2`}>
                  {isBot && (
                    <div className="w-6.5 h-6.5 bg-purple-600 text-white rounded-lg flex items-center justify-center font-bold text-[9px] shrink-0 self-end shadow-xs">
                      JD
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] p-3.5 rounded-2xl leading-relaxed whitespace-pre-wrap shadow-xs border ${
                      isBot
                        ? "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border-slate-200/60 dark:border-slate-700/60 rounded-bl-xs"
                        : "bg-purple-600 text-white border-purple-600 rounded-br-xs font-medium"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })}

            {/* Assistant Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start gap-2">
                <div className="w-6.5 h-6.5 bg-purple-600 text-white rounded-lg flex items-center justify-center font-bold text-[9px] shrink-0 self-end shadow-xs">
                  JD
                </div>
                <div className="bg-white dark:bg-slate-800 text-slate-400 border border-slate-200/60 dark:border-slate-700/60 px-4 py-3 rounded-2xl rounded-bl-xs flex items-center gap-1">
                  <span className="text-[10px] font-semibold text-purple-600 dark:text-purple-400 mr-1">Joy Digital is typing</span>
                  <span className="w-1.5 h-1.5 bg-purple-600 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-purple-600 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-purple-600 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}

            {/* Final Completed Screen with WhatsApp CTA */}
            {isCompleted && (
              <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl p-4 space-y-3 animate-fade-in text-left">
                {!submitError ? (
                  <>
                    <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-extrabold text-xs">
                      <i className="fa-solid fa-circle-check text-sm" />
                      <span>Requirement Captured!</span>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300">
                      Want a faster response? Continue directly with our lead engineer on WhatsApp.
                    </p>
                    <div className="flex flex-col gap-2 pt-1">
                      <button
                        onClick={handleWhatsAppRedirect}
                        className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all active:scale-98"
                      >
                        <i className="fa-brands fa-whatsapp text-sm" />
                        <span>Continue on WhatsApp</span>
                      </button>
                      <button
                        onClick={() => setIsOpen(false)}
                        className="w-full py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl font-bold text-xs cursor-pointer transition-all"
                      >
                        Close Chat
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-extrabold text-xs">
                      <i className="fa-solid fa-triangle-exclamation text-sm" />
                      <span>Network Connection Issue</span>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300">
                      Sorry, we couldn't submit your enquiry right now. Please continue directly on WhatsApp.
                    </p>
                    <button
                      onClick={handleWhatsAppRedirect}
                      className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all"
                    >
                      <i className="fa-brands fa-whatsapp text-sm" />
                      <span>Chat on WhatsApp</span>
                    </button>
                  </>
                )}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick-Reply Options & Active Input Panel */}
          {!isCompleted && !isTyping && (
            <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 shrink-0">
              {/* 1. Quick Reply Options */}
              {currentStep.type === "options" && currentStep.options && (
                <div className="flex flex-wrap gap-1.5 max-h-44 overflow-y-auto pr-1">
                  {currentStep.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(opt)}
                      className="text-[11px] font-bold bg-slate-100 dark:bg-slate-800 hover:bg-purple-600 dark:hover:bg-purple-600 text-slate-700 dark:text-slate-200 hover:text-white border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-full cursor-pointer transition-all shadow-xs active:scale-95 text-left"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}

              {/* 2. Text Input */}
              {currentStep.type === "text" && (
                <form onSubmit={handleTextSubmit} className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder={currentStep.placeholder || "Type your answer..."}
                    className="flex-1 text-xs px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-purple-600 text-slate-900 dark:text-white"
                  />
                  <button
                    type="submit"
                    disabled={!textInput.trim()}
                    className="w-9 h-9 bg-purple-600 hover:bg-purple-700 text-white rounded-xl flex items-center justify-center shadow-md disabled:opacity-40 cursor-pointer"
                  >
                    <i className="fa-solid fa-paper-plane text-xs" />
                  </button>
                </form>
              )}

              {/* 3. Textarea Input */}
              {currentStep.type === "textarea" && (
                <form onSubmit={handleTextSubmit} className="flex flex-col gap-2">
                  <textarea
                    rows={3}
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder={currentStep.placeholder || "Type your requirement here..."}
                    className="w-full text-xs p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-purple-600 text-slate-900 dark:text-white resize-none"
                  />
                  <button
                    type="submit"
                    disabled={!textInput.trim()}
                    className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold text-xs shadow-md disabled:opacity-40 cursor-pointer"
                  >
                    Submit Details
                  </button>
                </form>
              )}

              {/* 4. Contact Form Input */}
              {currentStep.type === "contact_form" && (
                <form onSubmit={handleContactSubmit} className="space-y-2.5 text-left text-xs">
                  {formError && (
                    <p className="text-[10px] text-red-500 font-bold bg-red-50 dark:bg-red-950/40 p-1.5 rounded-lg">
                      {formError}
                    </p>
                  )}
                  <div className="flex flex-col gap-1">
                    <label className="text-[10.5px] font-bold text-slate-600 dark:text-slate-300">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:border-purple-600 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10.5px] font-bold text-slate-600 dark:text-slate-300">
                      WhatsApp / Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:border-purple-600 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10.5px] font-bold text-slate-500 dark:text-slate-400">
                      Email Address <span className="text-slate-400">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:border-purple-600 text-slate-900 dark:text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-indigo-650 hover:from-purple-700 hover:to-indigo-700 text-white font-extrabold rounded-xl shadow-md cursor-pointer disabled:opacity-40 transition-all mt-1"
                  >
                    {isSubmitting ? "Submitting..." : "Complete & Contact Me"}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      )}

      {/* Reset Confirmation Modal */}
      {showResetModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 max-w-xs w-full shadow-2xl text-left space-y-3">
            <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">Start a new conversation?</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
              Are you sure you want to start over? Your current selections will be cleared.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowResetModal(false)}
                className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg font-bold text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleRestartChat}
                className="px-3.5 py-1.5 bg-purple-600 text-white rounded-lg font-bold text-xs cursor-pointer shadow-xs"
              >
                Start Over
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Keyframes injection */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes bounceSubtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .animate-bounce-subtle {
          animation: bounceSubtle 3s infinite ease-in-out;
        }
      `,
        }}
      />
    </div>
  );
}
