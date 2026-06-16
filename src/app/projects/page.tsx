import { createClient } from "@/lib/supabase/server";
import ProjectsClient from "./projects-client";

export default async function ProjectsPage() {
  const supabase = await createClient();
  const { data: projects } = await supabase.from("projects").select("*").order("sort_order");

  const formatted = (projects || []).map((p, i) => ({
    id: p.id,
    title: p.title?.toUpperCase() || "UNTITLED",
    slug: p.slug,
    description: p.description || "",
    tech: p.tech_stack || [],
    category: p.status?.toUpperCase() || "ALL",
    num: String(i + 1).padStart(2, "0"),
  }));

  // Extract unique categories from the data
  const categories = ["ALL", ...new Set(formatted.map((p) => p.category))];

  return <ProjectsClient projects={formatted} categories={categories} />;
}
