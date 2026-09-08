import { ChatStep, FlowId } from "./types";

export const INITIAL_WELCOME_STEP: ChatStep = {
  id: "welcome_start",
  flowId: "welcome",
  question: "Hi 👋 Welcome to Joy Digital!\n\nHow can we help your business today?",
  type: "options",
  options: [
    { label: "🌐 I need a new website", value: "new_website", nextStepId: "web_type" },
    { label: "🔄 I need a website redesign", value: "redesign", nextStepId: "redesign_improve" },
    { label: "📈 I need SEO / Local SEO", value: "seo", nextStepId: "seo_type" },
    { label: "🤖 I want AI Search Optimization", value: "ai_search", nextStepId: "ai_info" },
    { label: "📢 I need Digital Marketing", value: "digital_marketing", nextStepId: "dm_service" },
    { label: "💰 I want a quotation", value: "quotation", nextStepId: "quote_service" },
    { label: "💬 I have a question", value: "general_question", nextStepId: "gq_topic" },
  ],
};

export const CHAT_STEPS_MAP: Record<string, ChatStep> = {
  // --- FLOW 1: NEW WEBSITE ---
  web_type: {
    id: "web_type",
    flowId: "new_website",
    question: "Great! What type of website are you looking for?",
    type: "options",
    fieldKey: "websiteType",
    nextStepId: "web_budget",
    options: [
      { label: "Business Website", value: "Business Website" },
      { label: "E-commerce Website", value: "E-commerce Website" },
      { label: "Portfolio Website", value: "Portfolio Website" },
      { label: "Landing Page", value: "Landing Page" },
      { label: "Custom Web Application", value: "Custom Web Application" },
      { label: "Not sure", value: "Not sure" },
    ],
  },
  web_budget: {
    id: "web_budget",
    flowId: "new_website",
    question: "What is your approximate budget?",
    type: "options",
    fieldKey: "budget",
    nextStepId: "web_timeline",
    options: [
      { label: "Under ₹15,000", value: "Under ₹15,000" },
      { label: "₹15,000 – ₹30,000", value: "₹15,000 – ₹30,000" },
      { label: "₹30,000 – ₹75,000", value: "₹30,000 – ₹75,000" },
      { label: "₹75,000+", value: "₹75,000+" },
      { label: "I'm not sure", value: "I'm not sure" },
    ],
  },
  web_timeline: {
    id: "web_timeline",
    flowId: "new_website",
    question: "When do you want to launch the website?",
    type: "options",
    fieldKey: "timeline",
    nextStepId: "web_business",
    options: [
      { label: "ASAP", value: "ASAP" },
      { label: "Within 2 weeks", value: "Within 2 weeks" },
      { label: "Within 1 month", value: "Within 1 month" },
      { label: "Just exploring", value: "Just exploring" },
    ],
  },
  web_business: {
    id: "web_business",
    flowId: "new_website",
    question: "What's your business name?",
    type: "text",
    fieldKey: "businessName",
    placeholder: "e.g. Acme Enterprises or Your Name",
    nextStepId: "web_contact",
  },
  web_contact: {
    id: "web_contact",
    flowId: "new_website",
    question: "How can we contact you?",
    type: "contact_form",
  },

  // --- FLOW 2: REDESIGN ---
  redesign_improve: {
    id: "redesign_improve",
    flowId: "redesign",
    question: "What would you like to improve on your website?",
    type: "options",
    fieldKey: "improvements",
    nextStepId: "redesign_url",
    options: [
      { label: "Modern UI / Design", value: "Modern UI/design" },
      { label: "Mobile Responsiveness", value: "Mobile responsiveness" },
      { label: "SEO & Google Rankings", value: "SEO" },
      { label: "Website Speed & Core Vitals", value: "Website speed" },
      { label: "More Enquiries / Leads", value: "More enquiries/leads" },
      { label: "Complete Redesign", value: "Complete redesign" },
      { label: "Not sure", value: "Not sure" },
    ],
  },
  redesign_url: {
    id: "redesign_url",
    flowId: "redesign",
    question: "Please share your existing website URL.",
    type: "text",
    fieldKey: "websiteUrl",
    placeholder: "e.g. www.example.com",
    nextStepId: "redesign_business",
  },
  redesign_business: {
    id: "redesign_business",
    flowId: "redesign",
    question: "What is your business name?",
    type: "text",
    fieldKey: "businessName",
    placeholder: "e.g. Acme Brand",
    nextStepId: "redesign_contact",
  },
  redesign_contact: {
    id: "redesign_contact",
    flowId: "redesign",
    question: "How can we contact you?",
    type: "contact_form",
  },

  // --- FLOW 3: SEO / LOCAL SEO ---
  seo_type: {
    id: "seo_type",
    flowId: "seo",
    question: "What type of SEO do you need?",
    type: "options",
    fieldKey: "subService",
    nextStepId: "seo_url",
    options: [
      { label: "Google SEO", value: "Google SEO" },
      { label: "Local SEO", value: "Local SEO" },
      { label: "Google Business Profile", value: "Google Business Profile" },
      { label: "E-commerce SEO", value: "E-commerce SEO" },
      { label: "Technical SEO", value: "Technical SEO" },
      { label: "Not sure", value: "Not sure" },
    ],
  },
  seo_url: {
    id: "seo_url",
    flowId: "seo",
    question: "What is your website URL?",
    type: "text",
    fieldKey: "websiteUrl",
    placeholder: "e.g. www.mybusiness.com (or 'Don't have one')",
    nextStepId: "seo_location",
  },
  seo_location: {
    id: "seo_location",
    flowId: "seo",
    question: "Which location or market are you targeting?",
    type: "options",
    fieldKey: "targetLocation",
    nextStepId: "seo_business",
    options: [
      { label: "Madurai", value: "Madurai" },
      { label: "Chennai", value: "Chennai" },
      { label: "Tamil Nadu", value: "Tamil Nadu" },
      { label: "India", value: "India" },
      { label: "Worldwide", value: "Worldwide" },
    ],
  },
  seo_business: {
    id: "seo_business",
    flowId: "seo",
    question: "What is your business name?",
    type: "text",
    fieldKey: "businessName",
    placeholder: "e.g. Star Services",
    nextStepId: "seo_contact",
  },
  seo_contact: {
    id: "seo_contact",
    flowId: "seo",
    question: "Where should we contact you?",
    type: "contact_form",
  },

  // --- FLOW 4: AI SEARCH OPTIMIZATION ---
  ai_info: {
    id: "ai_info",
    flowId: "ai_search",
    question: "AI Search Optimization helps your business become more visible when potential customers search through AI platforms such as ChatGPT, Gemini and other AI search experiences.\n\nDo you already have a website?",
    type: "options",
    fieldKey: "hasWebsite",
    options: [
      { label: "Yes", value: "Yes", nextStepId: "ai_url" },
      { label: "No", value: "No", nextStepId: "ai_business" },
      { label: "Website is under development", value: "Under Development", nextStepId: "ai_business" },
    ],
  },
  ai_url: {
    id: "ai_url",
    flowId: "ai_search",
    question: "What is your website URL?",
    type: "text",
    fieldKey: "websiteUrl",
    placeholder: "e.g. https://mybrand.com",
    nextStepId: "ai_business",
  },
  ai_business: {
    id: "ai_business",
    flowId: "ai_search",
    question: "What is your business name?",
    type: "text",
    fieldKey: "businessName",
    placeholder: "e.g. Global Tech",
    nextStepId: "ai_market",
  },
  ai_market: {
    id: "ai_market",
    flowId: "ai_search",
    question: "Which market are you targeting?",
    type: "options",
    fieldKey: "targetMarket",
    nextStepId: "ai_contact",
    options: [
      { label: "Local", value: "Local" },
      { label: "India", value: "India" },
      { label: "International", value: "International" },
      { label: "Both Local & International", value: "Both Local & International" },
    ],
  },
  ai_contact: {
    id: "ai_contact",
    flowId: "ai_search",
    question: "Where should we contact you?",
    type: "contact_form",
  },

  // --- FLOW 5: DIGITAL MARKETING ---
  dm_service: {
    id: "dm_service",
    flowId: "digital_marketing",
    question: "What service are you interested in?",
    type: "options",
    fieldKey: "marketingService",
    nextStepId: "dm_budget",
    options: [
      { label: "Social Media Marketing", value: "Social Media Marketing" },
      { label: "Google Ads", value: "Google Ads" },
      { label: "Meta Ads (FB & Insta)", value: "Meta Ads" },
      { label: "Content Marketing", value: "Content Marketing" },
      { label: "Lead Generation", value: "Lead Generation" },
      { label: "Complete Digital Marketing", value: "Complete Digital Marketing" },
      { label: "Not sure", value: "Not sure" },
    ],
  },
  dm_budget: {
    id: "dm_budget",
    flowId: "digital_marketing",
    question: "What is your monthly marketing budget?",
    type: "options",
    fieldKey: "monthlyBudget",
    nextStepId: "dm_business",
    options: [
      { label: "Under ₹10K", value: "Under ₹10K" },
      { label: "₹10K – ₹25K", value: "₹10K – ₹25K" },
      { label: "₹25K – ₹50K", value: "₹25K – ₹50K" },
      { label: "₹50K+", value: "₹50K+" },
      { label: "Not sure", value: "Not sure" },
    ],
  },
  dm_business: {
    id: "dm_business",
    flowId: "digital_marketing",
    question: "What is your business name?",
    type: "text",
    fieldKey: "businessName",
    placeholder: "e.g. Apex Marketing",
    nextStepId: "dm_contact",
  },
  dm_contact: {
    id: "dm_contact",
    flowId: "digital_marketing",
    question: "How can we contact you?",
    type: "contact_form",
  },

  // --- FLOW 6: GET QUOTATION ---
  quote_service: {
    id: "quote_service",
    flowId: "quotation",
    question: "What service do you need a quotation for?",
    type: "options",
    fieldKey: "quotationService",
    nextStepId: "quote_detail",
    options: [
      { label: "Website", value: "Website" },
      { label: "E-commerce", value: "E-commerce" },
      { label: "SEO", value: "SEO" },
      { label: "Local SEO", value: "Local SEO" },
      { label: "AI Search Optimization", value: "AI Search Optimization" },
      { label: "Digital Marketing", value: "Digital Marketing" },
      { label: "Custom Requirement", value: "Custom Requirement" },
    ],
  },
  quote_detail: {
    id: "quote_detail",
    flowId: "quotation",
    question: "Tell us briefly about your requirement.",
    type: "textarea",
    fieldKey: "requirement",
    placeholder: "e.g. Looking for a 10-page company website with WhatsApp integration and blog...",
    nextStepId: "quote_business",
  },
  quote_business: {
    id: "quote_business",
    flowId: "quotation",
    question: "What's your business name?",
    type: "text",
    fieldKey: "businessName",
    placeholder: "e.g. Elite Consultancy",
    nextStepId: "quote_contact",
  },
  quote_contact: {
    id: "quote_contact",
    flowId: "quotation",
    question: "How can we contact you?",
    type: "contact_form",
  },

  // --- FLOW 7: GENERAL QUESTION ---
  gq_topic: {
    id: "gq_topic",
    flowId: "general_question",
    question: "What would you like to know?",
    type: "options",
    fieldKey: "questionCategory",
    options: [
      { label: "Website pricing", value: "Website pricing", nextStepId: "gq_contact" },
      { label: "Website development time", value: "Website development time", nextStepId: "gq_contact" },
      { label: "SEO pricing", value: "SEO pricing", nextStepId: "gq_contact" },
      { label: "Services", value: "Services", nextStepId: "gq_contact" },
      { label: "Maintenance", value: "Maintenance", nextStepId: "gq_contact" },
      { label: "Talk to a person", value: "Talk to a person", nextStepId: "gq_contact" },
      { label: "Other", value: "Other", nextStepId: "gq_detail" },
    ],
  },
  gq_detail: {
    id: "gq_detail",
    flowId: "general_question",
    question: "Please share your question details.",
    type: "textarea",
    fieldKey: "requirement",
    placeholder: "Type your question here...",
    nextStepId: "gq_contact",
  },
  gq_contact: {
    id: "gq_contact",
    flowId: "general_question",
    question: "Where should we contact you?",
    type: "contact_form",
  },
};

// WhatsApp URL builder helper
export function generateWhatsAppUrl(
  phone: string,
  leadData: {
    service: string;
    businessName?: string;
    subService?: string;
    budget?: string;
    timeline?: string;
    name: string;
    phone: string;
  }
): string {
  const targetNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919080026133";
  
  const text = `Hi Joy Digital,

I would like to enquire about your ${leadData.service || "Web Services"}.

Business Name: ${leadData.businessName || "N/A"}
Requirement: ${leadData.subService || leadData.service || "Website Development"}
Budget: ${leadData.budget || "N/A"}
Timeline: ${leadData.timeline || "N/A"}

Name: ${leadData.name}
WhatsApp: ${leadData.phone}

I received this enquiry through the Joy Digital website.`;

  return `https://wa.me/${targetNumber}?text=${encodeURIComponent(text)}`;
}
