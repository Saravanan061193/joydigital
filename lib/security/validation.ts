import { z } from "zod";

export const LoginSchema = z.object({
  pin: z.string().min(1, "Password/PIN is required").max(100),
});

export const PublicEnquirySchema = z.object({
  name: z.string().min(2, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
  mobile: z.string().min(5, "Invalid mobile number").max(20),
  companyName: z.string().max(150).optional().default(""),
  website: z.string().max(200).optional().default(""),
  service: z.string().max(100).optional().default("Web Development"),
  message: z.string().min(2, "Message is required").max(5000),
  source: z.string().max(100).optional().default("Website Form"),
  region: z.string().max(100).optional().default("Global"),
  utmParams: z.record(z.string(), z.any()).optional().nullable(),
});

export const EnquiryUpdateSchema = z.object({
  id: z.string().min(1, "Enquiry ID is required"),
  status: z.string().max(50).optional(),
  notes: z.string().max(5000).optional(),
  followUpDate: z.string().nullable().optional(),
  pipelineStage: z.string().max(50).optional(),
  assignedTo: z.string().max(100).optional(),
  activities: z.array(z.any()).optional(),
  proposals: z.array(z.any()).optional(),
  irrelevantReason: z.string().max(200).optional(),
  chatSessionId: z.string().max(100).optional(),
});

export const BlogArticleSchema = z.object({
  title: z.string().min(3, "Title is required").max(200),
  slug: z.string().min(3, "Slug is required").max(200),
  excerpt: z.string().max(500).optional().default(""),
  content: z.string().min(10, "Content must be at least 10 characters"),
  coverImage: z.string().optional().default(""),
  author: z.string().optional().default("Joy Digital Editorial"),
  category: z.string().optional().default("Web Development"),
  tags: z.array(z.string()).optional().default([]),
  published: z.boolean().optional().default(true),
  seoTitle: z.string().max(150).optional().default(""),
  seoDescription: z.string().max(300).optional().default(""),
});

export const SeoKeywordSchema = z.object({
  id: z.string().optional(),
  keyword: z.string().min(2, "Keyword text is required").max(150),
  type: z.enum(["Primary", "Secondary", "Long-tail"]).default("Secondary"),
  search_intent: z.enum(["Commercial", "Transactional", "Informational", "Navigational"]).default("Commercial"),
  target_audience: z.string().max(200).optional().default(""),
  notes: z.string().max(1000).optional().default(""),
  status: z.string().optional().default("Active"),
  assigned_page_id: z.string().nullable().optional(),
});

export const SeoPageSchema = z.object({
  id: z.string().optional(),
  path: z.string().min(1, "Page path is required"),
  title_template: z.string().max(150).optional().default(""),
  meta_description: z.string().max(300).optional().default(""),
  h1: z.string().max(150).optional().default(""),
  h2_tags: z.array(z.string()).optional().default([]),
  primary_keyword_id: z.string().nullable().optional(),
  secondary_keyword_ids: z.array(z.string()).optional().default([]),
  longtail_keyword_ids: z.array(z.string()).optional().default([]),
  faq_schema: z.array(z.object({ question: z.string(), answer: z.string() })).optional().default([]),
  category: z.string().optional().default("Services"),
});

export const SettingsSchema = z.object({
  cloudName: z.string().max(100).optional().default(""),
  apiKey: z.string().max(100).optional().default(""),
  apiSecret: z.string().max(100).optional().default(""),
});
