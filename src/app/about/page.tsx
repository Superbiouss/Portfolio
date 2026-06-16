import { createClient } from "@/lib/supabase/server";
import AboutClient from "./about-client";

const FALLBACK_TIMELINE = [
  { year: "2024", title: "FULL-STACK DEVELOPMENT", desc: "Building production-grade web applications with Next.js, Supabase, and AI integrations." },
  { year: "2023", title: "AI & AUTOMATION", desc: "Exploring AI-powered tools, RAG pipelines, and workflow automation with N8N." },
  { year: "2022", title: "FRONTEND MASTERY", desc: "Deep-diving into React, TypeScript, and modern CSS frameworks." },
  { year: "2021", title: "STARTED CODING", desc: "Began the journey with HTML, CSS, JavaScript and fell in love with web development." },
];

export default async function AboutPage() {
  let bio = "";
  let timeline = FALLBACK_TIMELINE;

  try {
    const supabase = await createClient();
    const { data: profile } = await supabase.from("profiles").select("*").limit(1).single();
    const { data: experiences } = await supabase.from("experiences").select("*").order("start_date", { ascending: false });

    bio = profile?.bio || "";

    if (experiences && experiences.length > 0) {
      timeline = experiences.map((e) => ({
        year: e.start_date ? new Date(e.start_date).getFullYear().toString() : "",
        title: e.title?.toUpperCase() || "",
        desc: e.description || "",
      }));
    }
  } catch {
    // Supabase not configured — use fallbacks
  }

  return <AboutClient bio={bio} heroTagline="" timeline={timeline} />;
}
