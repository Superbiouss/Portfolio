import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  slug: z.string().min(2, "Slug must be at least 2 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  content: z.string().optional(),
  tech_stack: z.string().optional(),
  status: z.enum(["draft", "published"]).default("published"),
  github_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  live_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  role: z.string().optional(),
  timeline: z.string().optional(),
  featured: z.boolean().optional(),
});

export const badgeSchema = z.object({
  title: z.string().min(2, "Title is required"),
  issuer: z.string().min(2, "Issuer is required"),
  date: z.string().optional(),
  badgeUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  description: z.string().optional(),
});

export const certificateSchema = z.object({
  title: z.string().min(2, "Title is required"),
  issuer: z.string().min(2, "Issuer is required"),
  date: z.string().optional(),
  category: z.string().optional(),
  credentialId: z.string().optional(),
  verifyUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

export const experienceSchema = z.object({
  company: z.string().min(2, "Company is required"),
  role: z.string().min(2, "Role is required"),
  period: z.string().min(2, "Period is required"),
  description: z.string().optional(),
  tech_stack: z.string().optional(),
  current: z.boolean().optional(),
});

export const skillSchema = z.object({
  name: z.string().min(2, "Name is required"),
  category: z.string().min(2, "Category is required"),
  level: z.string().optional(),
});

export const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const serviceSchema = z.object({
  title: z.string().min(2, "Title is required"),
  description: z.string().min(5, "Description is required"),
  icon_name: z.string().min(2, "Icon name is required"),
});
