"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

interface Message {
  role: "user" | "assistant";
  text: string;
  isForm?: boolean;
  timestamp: string;
}

export default function ChatbotWidget() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState("");
  
  // Inline Lead Callback Form State
  const [showForm, setShowForm] = useState(false);
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMobile, setFormMobile] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Exclude rendering widget on admin dashboard pages
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  // Load chat session on mount
  useEffect(() => {
    let savedSessionId = localStorage.getItem("joy_chat_session_id");
    if (!savedSessionId) {
      savedSessionId = Math.random().toString(36).substring(2, 15);
      localStorage.setItem("joy_chat_session_id", savedSessionId);
    }
    setSessionId(savedSessionId);

    const savedMessages = localStorage.getItem(`joy_chat_history_${savedSessionId}`);
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      // Default initial welcome messages
      const initialMsgs: Message[] = [
        {
          role: "assistant",
          text: "Hi! Welcome to Joy Digital. 🚀 I am your AI assistant. How can I help you grow your business online today?",
          timestamp: new Date().toISOString(),
        },
        {
          role: "assistant",
          text: "Select a quick action below or type any question about our Web Design, E-commerce, or SEO services!",
          timestamp: new Date().toISOString(),
        }
      ];
      setMessages(initialMsgs);
      localStorage.setItem(`joy_chat_history_${savedSessionId}`, JSON.stringify(initialMsgs));
    }
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, showForm]);

  const saveHistory = (updated: Message[]) => {
    setMessages(updated);
    if (sessionId) {
      localStorage.setItem(`joy_chat_history_${sessionId}`, JSON.stringify(updated));
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    if (!textToSend) setInput("");

    const newUserMessage: Message = {
      role: "user",
      text: text,
      timestamp: new Date().toISOString()
    };

    const updatedMessages = [...messages, newUserMessage];
    saveHistory(updatedMessages);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          messages: updatedMessages.map(m => ({
            role: m.role,
            content: m.text
          }))
        })
      });

      if (res.ok) {
        const data = await res.json();
        const botReply: Message = {
          role: "assistant",
          text: data.reply,
          timestamp: new Date().toISOString()
        };
        saveHistory([...updatedMessages, botReply]);
      } else {
        const botError: Message = {
          role: "assistant",
          text: "I am having trouble connecting to my brain right now. Please try again or fill in the callback form!",
          timestamp: new Date().toISOString()
        };
        saveHistory([...updatedMessages, botError]);
      }
    } catch (e) {
      console.error("Chatbot submit failed:", e);
      const botError: Message = {
        role: "assistant",
        text: "Network error occurred. Please check your internet connection.",
        timestamp: new Date().toISOString()
      };
      saveHistory([...updatedMessages, botError]);
    } finally {
      setLoading(false);
    }
  };

  const handleCallbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formMobile) return;

    setFormSubmitting(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          leadDetails: {
            name: formName,
            email: formEmail || "no-email@chat.com",
            mobile: formMobile,
            service: "AI Chat Inquiry Callback",
            message: `User requested a callback via AI Chat widget. Chat history reference: ${sessionId}`
          },
          messages: messages.map(m => ({
            role: m.role,
            content: m.text
          }))
        })
      });

      if (res.ok) {
        setFormSubmitted(true);
        const systemMessage: Message = {
          role: "assistant",
          text: `✅ **Callback Request Registered!**\nThank you, **${formName}**. I have recorded your number (**${formMobile}**) in our CRM. Our agency specialist will contact you shortly!`,
          timestamp: new Date().toISOString()
        };
        saveHistory([...messages, systemMessage]);
        setTimeout(() => {
          setShowForm(false);
        }, 3000);
      } else {
        alert("Failed to submit callback request. Please try again.");
      }
    } catch (err) {
      console.error("Error submitting callback:", err);
      alert("Network error. Please try again.");
    } finally {
      setFormSubmitting(false);
    }
  };

  const clearChat = () => {
    if (confirm("Reset current chat session history?")) {
      const freshSessionId = Math.random().toString(36).substring(2, 15);
      localStorage.setItem("joy_chat_session_id", freshSessionId);
      setSessionId(freshSessionId);
      
      const initialMsgs: Message[] = [
        {
          role: "assistant",
          text: "Hi! Welcome back to Joy Digital. 🚀 How can I help you build your website or rank on search engines today?",
          timestamp: new Date().toISOString(),
        }
      ];
      setMessages(initialMsgs);
      localStorage.setItem(`joy_chat_history_${freshSessionId}`, JSON.stringify(initialMsgs));
      setFormSubmitted(false);
      setFormName("");
      setFormEmail("");
      setFormMobile("");
      setShowForm(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 font-sans select-none">
      
      {/* Floating Chat Bubble Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-gradient-to-tr from-purple-600 to-indigo-650 hover:from-purple-700 hover:to-indigo-700 text-white rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all hover:scale-105 cursor-pointer border border-purple-400/20 active:scale-95 animate-bounce-subtle"
          title="Chat with Joy AI"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
        </button>
      )}

      {/* Chat Dialog Widget Container */}
      {isOpen && (
        <div className="w-[360px] sm:w-[380px] h-[500px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 rounded-[28px] shadow-2xl flex flex-col overflow-hidden animate-fade-in transition-colors duration-200">
          
          {/* Header Panel */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-650 p-4.5 text-white flex items-center justify-between shrink-0 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-white/10 rounded-2xl flex items-center justify-center relative shadow-inner">
                <span className="font-extrabold text-sm tracking-tighter">JD</span>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-purple-500"></span>
              </div>
              <div className="text-left">
                <h4 className="text-xs font-black tracking-wide leading-none">Joy AI Assistant</h4>
                <span className="text-[9px] text-purple-150 font-semibold mt-1 inline-block">Online • Ready to Help</span>
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              <button 
                onClick={clearChat}
                className="w-8 h-8 rounded-lg hover:bg-white/15 text-white/80 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
                title="Restart Chat History"
              >
                <i className="fa-solid fa-arrow-rotate-left text-xs" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-white/15 text-white/80 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
                title="Minimize chat"
              >
                <i className="fa-solid fa-xmark text-sm" />
              </button>
            </div>
          </div>

          {/* Messages Scroll Panel */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs text-left bg-slate-50/50 dark:bg-slate-950/20">
            {messages.map((msg, index) => {
              const isBot = msg.role === "assistant";
              return (
                <div key={index} className={`flex ${isBot ? "justify-start" : "justify-end"} gap-2`}>
                  {isBot && (
                    <div className="w-6.5 h-6.5 bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300 rounded-lg flex items-center justify-center font-bold text-[9px] shrink-0 self-end">
                      AI
                    </div>
                  )}
                  
                  <div className={`max-w-[75%] p-3 rounded-2xl leading-relaxed whitespace-pre-wrap shadow-sm border ${
                    isBot 
                      ? "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-100 dark:border-slate-800 rounded-bl-xs" 
                      : "bg-purple-600 text-white border-purple-600 rounded-br-xs font-medium"
                  }`}>
                    {/* Render Markdown bold style markup */}
                    {msg.text.split("\n").map((line, lIdx) => {
                      // Check for bold notation **text**
                      const boldRegex = /\*\*(.*?)\*\*/g;
                      let parts = [];
                      let lastIdx = 0;
                      let match;
                      while ((match = boldRegex.exec(line)) !== null) {
                        if (match.index > lastIdx) {
                          parts.push(line.substring(lastIdx, match.index));
                        }
                        parts.push(<strong key={match.index} className="font-extrabold">{match[1]}</strong>);
                        lastIdx = boldRegex.lastIndex;
                      }
                      if (lastIdx < line.length) {
                        parts.push(line.substring(lastIdx));
                      }
                      return <p key={lIdx} className={lIdx > 0 ? "mt-1.5" : ""}>{parts.length > 0 ? parts : line}</p>;
                    })}
                  </div>
                </div>
              );
            })}

            {/* AI Typing Indicator */}
            {loading && (
              <div className="flex justify-start gap-2 animate-pulse">
                <div className="w-6.5 h-6.5 bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300 rounded-lg flex items-center justify-center font-bold text-[9px] shrink-0 self-end">
                  AI
                </div>
                <div className="bg-white dark:bg-slate-800 text-slate-400 border border-slate-100 dark:border-slate-800 px-4 py-3 rounded-2xl rounded-bl-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}

            {/* Callback inline form bubble */}
            {showForm && !formSubmitted && (
              <div className="flex justify-start gap-2 animate-fade-in">
                <div className="w-6.5 h-6.5 bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300 rounded-lg flex items-center justify-center font-bold text-[9px] shrink-0 self-end">
                  AI
                </div>
                
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-md w-72 rounded-bl-xs text-left space-y-3.5">
                  <div className="border-b border-slate-100 dark:border-slate-700/80 pb-2">
                    <h5 className="font-extrabold text-slate-850 dark:text-white text-xs">Request Free Callback</h5>
                    <p className="text-[9.5px] text-slate-450 dark:text-slate-400 mt-1">Submit your details to register a CRM lead.</p>
                  </div>
                  
                  <form onSubmit={handleCallbackSubmit} className="space-y-2.5 text-[10.5px]">
                    <div className="flex flex-col gap-1">
                      <label className="font-bold text-slate-500">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-2.5 py-1.5 rounded-lg outline-none focus:border-purple-600 focus:bg-white text-slate-850 dark:text-white"
                      />
                    </div>
                    
                    <div className="flex flex-col gap-1">
                      <label className="font-bold text-slate-500">Mobile Phone *</label>
                      <input
                        type="text"
                        required
                        value={formMobile}
                        onChange={(e) => setFormMobile(e.target.value)}
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-2.5 py-1.5 rounded-lg outline-none focus:border-purple-600 focus:bg-white text-slate-850 dark:text-white"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-bold text-slate-500">Email Address (Optional)</label>
                      <input
                        type="email"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="john@doe.com"
                        className="w-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-2.5 py-1.5 rounded-lg outline-none focus:border-purple-600 focus:bg-white text-slate-850 dark:text-white"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-700/80">
                      <button
                        type="button"
                        onClick={() => setShowForm(false)}
                        className="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 rounded-md font-bold text-slate-600 dark:text-slate-300 cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={formSubmitting}
                        className="px-4 py-1.5 bg-purple-600 hover:bg-purple-750 text-white rounded-md font-extrabold shadow-xs cursor-pointer disabled:opacity-40"
                      >
                        {formSubmitting ? "Submitting..." : "Get Call Back"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies Buttons (Float above footer input) */}
          <div className="px-4 py-2 flex flex-wrap gap-1.5 bg-slate-50/50 dark:bg-slate-950/20 border-t border-slate-100 dark:border-slate-800/80 shrink-0 select-none">
            {[
              { text: "🖥️ Web Packages", action: () => handleSendMessage("What web design packages do you offer?") },
              { text: "📈 SEO Services", action: () => handleSendMessage("Tell me about your Google SEO services") },
              { text: "📞 Request Callback", action: () => { setShowForm(true); setFormSubmitted(false); } },
              { text: "👤 Agency Details", action: () => handleSendMessage("Who runs Joy Digital and where are you located?") }
            ].map((reply, idx) => (
              <button
                key={idx}
                onClick={reply.action}
                className="text-[9.5px] font-bold bg-white dark:bg-slate-800 text-slate-655 dark:text-slate-300 hover:text-[#7C3AED] dark:hover:text-purple-400 border border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-800 px-2 py-1 rounded-full cursor-pointer transition-all shadow-xs"
              >
                {reply.text}
              </button>
            ))}
          </div>

          {/* Footer Input Form Panel */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800/80 flex gap-2 items-center shrink-0 transition-colors duration-200"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              disabled={loading || showForm}
              className="flex-1 text-xs px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:bg-white focus:border-purple-600 text-slate-900 dark:text-white transition-colors"
            />
            <button
              type="submit"
              disabled={loading || showForm || !input.trim()}
              className="w-8.5 h-8.5 bg-purple-650 hover:bg-purple-700 text-white rounded-xl flex items-center justify-center shadow-md transition-all active:scale-95 disabled:opacity-40 disabled:scale-100 cursor-pointer shrink-0"
              title="Send Message"
            >
              <i className="fa-solid fa-paper-plane text-xs" />
            </button>
          </form>

        </div>
      )}

      {/* Bounce-subtle custom css keyframe injection */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes bounceSubtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .animate-bounce-subtle {
          animation: bounceSubtle 3s infinite ease-in-out;
        }
      ` }} />

    </div>
  );
}
