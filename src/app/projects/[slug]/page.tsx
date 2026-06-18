import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Code2, ExternalLink } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/* ── Fallback projects for when Supabase is unavailable ── */
const FALLBACK_PROJECTS: Record<string, {
  title: string; description: string; content: string; tech_stack: string[];
  status: string; role: string; timeline: string; github_url: string; live_url: string;
}> = {
  "lawlens-ai": {
    title: "LawLens AI", description: "AI-powered legal document analysis platform.",
    content: "## Problem Statement\n\nLegal professionals spend countless hours manually reviewing contracts. LawLens AI automates this using RAG.\n\n## Key Features\n\n- Real-time streaming chat responses\n- Document upload with automatic chunking\n- Multi-document comparison\n- Citation tracking\n\n## Outcomes\n\n- Reduced document review time by ~70%\n- 94% accuracy on clause identification",
    tech_stack: ["Next.js", "Supabase", "OpenAI", "PostgreSQL", "N8N"], status: "completed", role: "Full-Stack Developer", timeline: "Jan 2024 – Mar 2024", github_url: "https://github.com", live_url: "https://example.com",
  },
  "arcstone-studios": {
    title: "ArcStone Studios", description: "Premium creative agency website with kinetic typography.",
    content: "## Design Philosophy\n\nEvery element moves. Marquees scroll endlessly, hero text scales with viewport width, cards flood with color on hover.\n\n## Key Features\n\n- Viewport-width kinetic typography\n- Infinite scrolling marquees\n- Parallax scroll effects\n- Automated lead capture pipeline\n\n## Results\n\n- 40% increase in lead submissions\n- Lighthouse: 98 Performance, 100 Accessibility",
    tech_stack: ["Next.js", "Framer Motion", "Tailwind CSS", "N8N"], status: "completed", role: "Lead Developer & Designer", timeline: "Nov 2023 – Jan 2024", github_url: "https://github.com", live_url: "https://example.com",
  },
  "oxford-school-portal": {
    title: "Oxford School Portal", description: "Full-stack school management platform.",
    content: "## Problem Statement\n\nThe school needed a digital platform that non-technical staff could manage independently.\n\n## Key Features\n\n- Dynamic event calendar\n- Document repository\n- Photo gallery management\n- Admission enquiry automation\n\n## Outcomes\n\n- Eliminated 15+ hours/week of admin work\n- Enquiry response time: 48hrs → 2hrs",
    tech_stack: ["Next.js", "Supabase", "PostgreSQL", "Tailwind CSS"], status: "completed", role: "Full-Stack Developer", timeline: "May 2024 – Jun 2024", github_url: "https://github.com", live_url: "https://example.com",
  },
  "taskflow": {
    title: "TaskFlow", description: "Real-time collaborative task management SaaS.",
    content: "## Overview\n\nTaskFlow features real-time Kanban boards with drag-and-drop, team workspaces, and automated triggers.\n\n## Key Features\n\n- Real-time Kanban boards\n- Team workspaces with invite system\n- Automated workflows\n- Dashboard analytics",
    tech_stack: ["Next.js", "Supabase", "dnd-kit", "TypeScript"], status: "completed", role: "Solo Developer", timeline: "Aug 2023 – Oct 2023", github_url: "https://github.com", live_url: "",
  },
  "devlog": {
    title: "DevLog", description: "Developer blogging platform with MDX support.",
    content: "## Overview\n\nDevLog supports MDX, has automatic syntax highlighting for 50+ languages, and generates RSS feeds.\n\n## Key Features\n\n- MDX-powered blog posts\n- Syntax highlighting with Shiki\n- Tag-based filtering\n- RSS feed generation",
    tech_stack: ["Next.js", "MDX", "Shiki", "Tailwind CSS"], status: "in-progress", role: "Solo Developer", timeline: "Mar 2024 – Present", github_url: "https://github.com", live_url: "",
  },
  "fittrack-mobile": {
    title: "FitTrack Mobile", description: "Cross-platform fitness tracking app.",
    content: "## Overview\n\nFitTrack tracks workouts, visualizes progress, and uses AI for training plans.\n\n## Key Features\n\n- Workout logging\n- Progress charts\n- AI-generated training plans\n- Offline-first architecture",
    tech_stack: ["React Native", "Expo", "Supabase", "OpenAI"], status: "completed", role: "Mobile Developer", timeline: "Jun 2023 – Aug 2023", github_url: "https://github.com", live_url: "",
  },
};

export default async function ProjectCaseStudy(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  let project = FALLBACK_PROJECTS[slug] || null;

  try {
    const supabase = await createClient();
    const { data } = await supabase.from("projects").select("*").eq("slug", slug).eq("status", "published").single();
    if (data) project = data;
  } catch {
    // Supabase not configured — use fallback
  }

  if (!project) {
    const { notFound } = await import("next/navigation");
    notFound();
  }

  return (
    <div className="min-h-screen">
      {/* Immersive Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden border-b border-border/30 bg-muted/10">

        
        <div className="max-w-[95vw] mx-auto relative z-10">
          <Button variant="ghost" size="sm" asChild className="mb-12">
            <Link href="/projects"><ArrowLeft className="mr-2 w-4 h-4" /> BACK TO PROJECTS</Link>
          </Button>

          <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-accent block mb-4 flex items-center gap-2">
            <span className="w-8 h-px bg-accent"></span> CASE STUDY
          </span>
          <h1 className="text-[clamp(3rem,8vw,8rem)] font-extrabold uppercase tracking-tight leading-[0.9] mb-8 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/50">
            {project.title}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl font-light leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-3 mb-16">
            {project.tech_stack?.map((t: string) => (
              <Badge key={t} variant="outline" className="bg-background border-2 border-border text-sm px-4 py-1.5 text-foreground/80">{t}</Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content & Metadata Grid */}
      <section className="max-w-[95vw] mx-auto py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left Side: Sticky Metadata */}
        <aside className="lg:col-span-4 space-y-8">
          <div className="sticky top-32 p-8 bg-background border-2 border-border">
            <div className="space-y-8">
              {[
                { label: "STATUS", value: project.status?.toUpperCase() || "COMPLETED" },
                { label: "ROLE", value: project.role?.toUpperCase() || "DEVELOPER" },
                { label: "TIMELINE", value: project.timeline || "—" },
              ].map((item) => (
                <div key={item.label}>
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-2">{item.label}</span>
                  <span className="text-base font-semibold uppercase tracking-tight text-foreground">{item.value}</span>
                </div>
              ))}
              
              <div className="pt-8 border-t border-border/50">
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-4">PROJECT LINKS</span>
                <div className="flex flex-col gap-3">
                  {project.github_url ? (
                    <Button variant="outline" className="w-full justify-start group border-2 border-border hover:border-accent hover:bg-accent/10" asChild>
                      <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                        <Code2 className="mr-3 w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" /> 
                        VIEW REPOSITORY
                      </a>
                    </Button>
                  ) : null}
                  {project.live_url ? (
                    <Button variant="primary" className="w-full justify-start group" asChild>
                      <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-3 w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" /> 
                        LIVE PREVIEW
                      </a>
                    </Button>
                  ) : null}
                  {!project.github_url && !project.live_url && (
                    <span className="text-sm text-muted-foreground italic">No public links available</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Side: Markdown Content */}
        <article className="lg:col-span-8">
          {project.content ? (
            <div className="prose-kinetic prose-lg md:prose-xl max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{project.content}</ReactMarkdown>
            </div>
          ) : (
            <p className="text-muted-foreground text-lg">No detailed case study content available for this project.</p>
          )}
        </article>
      </section>
    </div>
  );
}
