import { createClient } from "@/lib/supabase/server";
import AboutClient from "./about-client";

export default async function AboutPage() {
  const supabase = await createClient();
  const { data: profile } = await supabase.from("profiles").select("*").limit(1).single();
  const { data: experiences } = await supabase.from("experiences").select("*").order("start_date", { ascending: false });

  const timeline = (experiences || []).map((e) => ({
    year: e.start_date ? new Date(e.start_date).getFullYear().toString() : "",
    title: e.title?.toUpperCase() || "",
    desc: e.description || "",
  }));

  return (
    <AboutClient
      bio={profile?.bio || ""}
      heroTagline={profile?.hero_tagline || ""}
      timeline={timeline}
    />
  );
}
