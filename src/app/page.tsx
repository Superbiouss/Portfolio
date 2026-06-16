import { createClient } from "@/lib/supabase/server";
import HomeClient from "./home-client";

/* ── Fallback data shown when Supabase is empty or unavailable ── */
const FALLBACK_PROJECTS = [
  { title: "LAWLENS AI", description: "AI-powered legal document analysis platform with RAG-based chat and clause comparison.", tech: ["Next.js", "Supabase", "OpenAI", "PostgreSQL"], slug: "lawlens-ai", num: "01" },
  { title: "ARCSTONE STUDIOS", description: "Premium creative agency website with kinetic typography and parallax effects.", tech: ["Next.js", "Framer Motion", "Tailwind CSS"], slug: "arcstone-studios", num: "02" },
  { title: "OXFORD SCHOOL PORTAL", description: "Full-stack school management platform with admin dashboard and document management.", tech: ["Next.js", "Supabase", "PostgreSQL"], slug: "oxford-school-portal", num: "03" },
];

const FALLBACK_STATS = [
  { value: "6+", label: "PROJECTS" },
  { value: "4", label: "CERTIFICATES" },
  { value: "18+", label: "TECHNOLOGIES" },
  { value: "5+", label: "LEADERSHIP" },
];

export default async function HomePage() {
  let featuredProjects = FALLBACK_PROJECTS;
  let stats = FALLBACK_STATS;
  let bio = "";

  try {
    const supabase = await createClient();

    const { data: projects } = await supabase
      .from("projects")
      .select("*")
      .eq("featured", true)
      .order("sort_order")
      .limit(3);

    if (projects && projects.length > 0) {
      featuredProjects = projects.map((p, i) => ({
        title: p.title?.toUpperCase() || "UNTITLED",
        description: p.description || "",
        tech: p.tech_stack || [],
        slug: p.slug,
        num: String(i + 1).padStart(2, "0"),
      }));
    }

    const { data: allProjects } = await supabase.from("projects").select("id");
    const { data: allSkills } = await supabase.from("skills").select("id");
    const { data: allCerts } = await supabase.from("certificates").select("id");
    const { data: profile } = await supabase.from("profiles").select("*").limit(1).single();

    if (allProjects && allProjects.length > 0) {
      stats = [
        { value: `${allProjects.length}+`, label: "PROJECTS" },
        { value: `${allCerts?.length || 0}`, label: "CERTIFICATES" },
        { value: `${allSkills?.length || 0}+`, label: "TECHNOLOGIES" },
        { value: "5+", label: "LEADERSHIP" },
      ];
    }

    bio = profile?.bio || "";
  } catch {
    // Supabase not configured — use fallbacks
  }

  return (
    <HomeClient
      stats={stats}
      featuredProjects={featuredProjects}
      heroTagline=""
      bio={bio}
    />
  );
}
