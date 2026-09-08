export type FlowId =
  | "welcome"
  | "new_website"
  | "redesign"
  | "seo"
  | "ai_search"
  | "digital_marketing"
  | "quotation"
  | "general_question";

export interface ChatOption {
  label: string;
  value: string;
  nextStepId?: string;
  icon?: string;
}

export interface ChatStep {
  id: string;
  flowId: FlowId;
  question: string;
  type: "options" | "text" | "textarea" | "contact_form" | "confirmation";
  options?: ChatOption[];
  placeholder?: string;
  fieldKey?: string; // e.g., 'websiteType', 'budget', 'timeline', 'businessName', 'websiteUrl', etc.
  nextStepId?: string;
  infoNotice?: string;
  validationRegex?: RegExp;
}

export interface MessageItem {
  id: string;
  role: "assistant" | "user";
  text: string;
  timestamp: string;
  options?: ChatOption[];
  isStepInput?: boolean;
  stepId?: string;
}

export interface ChatLeadData {
  service: string;
  subService?: string;
  websiteType?: string;
  improvements?: string;
  budget?: string;
  timeline?: string;
  websiteUrl?: string;
  targetLocation?: string;
  targetMarket?: string;
  hasWebsite?: string;
  marketingService?: string;
  monthlyBudget?: string;
  quotationService?: string;
  requirement?: string;
  questionCategory?: string;
  businessName?: string;
  name: string;
  phone: string;
  email?: string;
  pageUrl?: string;
  leadSource?: string;
}

export interface ChatLeadRecord extends ChatLeadData {
  id: string;
  createdAt: string;
  updatedAt: string;
  whatsappClicked: boolean;
  whatsappClickedAt?: string;
  status: "new" | "contacted" | "qualified" | "converted" | "lost";
  notes?: string;
  chatSessionId: string;
}

export interface ChatMessageRecord {
  role: "user" | "assistant";
  message: string;
  timestamp: string;
}

export interface ChatConversationRecord {
  conversationId: string;
  leadId?: string;
  sessionId: string;
  messages: ChatMessageRecord[];
  startedAt: string;
  completedAt?: string;
  abandonedAt?: string;
  lastStepCompleted?: string;
}
