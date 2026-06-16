import { createClient } from "@/lib/supabase/server";
import SkillsClient from "./skills-client";

export default async function SkillsPage() {
  const supabase = await createClient();
  const { data: skills } = await supabase.from("skills").select("*").order("category").order("sort_order");

  // Group by category
  const grouped: Record<string, string[]> = {};
  (skills || []).forEach((s) => {
    const cat = s.category?.toUpperCase() || "OTHER";
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(s.name);
  });

  const skillGroups = Object.entries(grouped).map(([category, items], i) => ({
    category,
    num: String(i + 1).padStart(2, "0"),
    skills: items,
  }));

  return <SkillsClient skillGroups={skillGroups} />;
}
