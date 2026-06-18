import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import SkillsClient from "./skills-client";

export const metadata: Metadata = {
  title: "Skills",
  description: "Technical skills and technologies used by Aakash Yadav — React, Next.js, TypeScript, Supabase, AI/ML, and more.",
  openGraph: {
    title: "Skills & Technologies — Aakash Yadav",
    description: "React, Next.js, TypeScript, Supabase, AI/ML, and more.",
  },
};

const FALLBACK_SKILLS = [
  { category: "FRONTEND", num: "01", skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "HTML / CSS"] },
  { category: "BACKEND", num: "02", skills: ["Node.js", "PostgreSQL", "Supabase", "REST APIs", "Express"] },
  { category: "AI & AUTOMATION", num: "03", skills: ["OpenAI API", "RAG Pipelines", "N8N", "LangChain"] },
  { category: "CLOUD & DEVOPS", num: "04", skills: ["Vercel", "Docker", "GitHub Actions"] },
];

export default async function SkillsPage() {
  let skillGroups = FALLBACK_SKILLS;

  try {
    const supabase = await createClient();
    const { data: skills } = await supabase.from("skills").select("*").order("category").order("sort_order");

    if (skills && skills.length > 0) {
      const grouped: Record<string, string[]> = {};
      skills.forEach((s) => {
        const cat = s.category?.toUpperCase() || "OTHER";
        if (!grouped[cat]) grouped[cat] = [];
        grouped[cat].push(s.name);
      });
      skillGroups = Object.entries(grouped).map(([category, items], i) => ({
        category,
        num: String(i + 1).padStart(2, "0"),
        skills: items,
      }));
    }
  } catch {
    // Supabase not configured — use fallbacks
  }

  return <SkillsClient skillGroups={skillGroups} />;
}
