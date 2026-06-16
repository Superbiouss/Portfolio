import { createClient } from "@/lib/supabase/server";
import HomeClient from "./home-client";

export default async function HomePage() {
  const supabase = await createClient();

  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("featured", true)
    .order("sort_order")
    .limit(3);

  const { data: allProjects } = await supabase.from("projects").select("id");
  const { data: allSkills } = await supabase.from("skills").select("id, category");
  const { data: allCerts } = await supabase.from("certificates").select("id");
  const { data: profile } = await supabase.from("profiles").select("*").limit(1).single();

  const stats = [
    { value: `${allProjects?.length || 0}+`, label: "PROJECTS" },
    { value: `${allCerts?.length || 0}`, label: "CERTIFICATES" },
    { value: `${new Set(allSkills?.map(s => s.category) || []).size * 5}+`, label: "TECHNOLOGIES" },
    { value: "5+", label: "LEADERSHIP" },
  ];

  const featuredProjects = (projects || []).map((p, i) => ({
    title: p.title?.toUpperCase() || "UNTITLED",
    description: p.description || "",
    tech: p.tech_stack || [],
    slug: p.slug,
    num: String(i + 1).padStart(2, "0"),
  }));

  return (
    <HomeClient
      stats={stats}
      featuredProjects={featuredProjects}
      heroTagline={profile?.hero_tagline || ""}
      bio={profile?.bio || ""}
    />
  );
}
