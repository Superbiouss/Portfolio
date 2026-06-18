import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import ProjectsClient from "./projects-client";

export const metadata: Metadata = {
  title: "Projects",
  description: "Engineering case studies by Aakash Yadav — AI platforms, SaaS applications, school portals, and more.",
  openGraph: {
    title: "Projects — Aakash Yadav",
    description: "Engineering case studies — AI platforms, SaaS applications, school portals, and more.",
  },
};

const FALLBACK_PROJECTS = [
  { id: "1", title: "LAWLENS AI", slug: "lawlens-ai", description: "AI-powered legal document analysis platform with RAG-based chat and clause comparison.", tech: ["Next.js", "Supabase", "OpenAI"], category: "COMPLETED", num: "01" },
  { id: "2", title: "ARCSTONE STUDIOS", slug: "arcstone-studios", description: "Premium creative agency website with kinetic typography and parallax effects.", tech: ["Next.js", "Framer Motion"], category: "COMPLETED", num: "02" },
  { id: "3", title: "OXFORD SCHOOL PORTAL", slug: "oxford-school-portal", description: "Full-stack school management platform with admin dashboard.", tech: ["Next.js", "Supabase"], category: "COMPLETED", num: "03" },
  { id: "4", title: "TASKFLOW", slug: "taskflow", description: "Real-time collaborative task management SaaS with Kanban boards.", tech: ["Next.js", "Supabase", "dnd-kit"], category: "COMPLETED", num: "04" },
  { id: "5", title: "DEVLOG", slug: "devlog", description: "Developer blogging platform with MDX support and syntax highlighting.", tech: ["Next.js", "MDX", "Shiki"], category: "IN-PROGRESS", num: "05" },
  { id: "6", title: "FITTRACK MOBILE", slug: "fittrack-mobile", description: "Cross-platform fitness tracking app with AI-generated training plans.", tech: ["React Native", "Expo", "OpenAI"], category: "COMPLETED", num: "06" },
];

export default async function ProjectsPage() {
  let formatted = FALLBACK_PROJECTS;

  try {
    const supabase = await createClient();
    const { data: projects } = await supabase.from("projects").select("*").eq("status", "published").order("sort_order");

    if (projects && projects.length > 0) {
      formatted = projects.map((p, i) => ({
        id: p.id,
        title: p.title?.toUpperCase() || "UNTITLED",
        slug: p.slug,
        description: p.description || "",
        tech: p.tech_stack || [],
        category: p.status?.toUpperCase() || "COMPLETED",
        num: String(i + 1).padStart(2, "0"),
      }));
    }
  } catch {
    // Supabase not configured — use fallbacks
  }

  const categories = ["ALL", ...new Set(formatted.map((p) => p.category))];
  return <ProjectsClient projects={formatted} categories={categories} />;
}
