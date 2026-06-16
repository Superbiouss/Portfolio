import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Code2, ExternalLink } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const mockProject = {
  title: "PROJECT TITLE",
  tagline: "A brief tagline about this project.",
  tech: ["Next.js", "Supabase", "TypeScript"],
  status: "COMPLETED",
  role: "FULL-STACK DEVELOPER",
  timeline: "JAN 2024 – MAR 2024",
  github_url: "https://github.com",
  live_url: "https://example.com",
  content: `## Problem Statement\n\nDescribe the core problem this project addresses.\n\n## Architecture\n\nExplain the system design and key architectural decisions.\n\n## Features\n\n- Feature one\n- Feature two\n- Feature three\n\n## Challenges\n\nWhat were the hardest parts?\n\n## Outcomes\n\nWhat was achieved?`,
};

export default async function ProjectCaseStudy(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const project = { ...mockProject, title: slug.replace(/-/g, " ").toUpperCase() };

  return (
    <div className="max-w-[95vw] mx-auto py-16 md:py-32">
      <Button variant="ghost" size="sm" asChild className="mb-12">
        <Link href="/projects"><ArrowLeft className="mr-2 w-4 h-4" /> ALL PROJECTS</Link>
      </Button>

      {/* Hero */}
      <div className="mb-16 md:mb-24">
        <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-muted-foreground block mb-2">CASE STUDY</span>
        <h1 className="text-[clamp(2rem,8vw,8rem)] font-bold uppercase tracking-tighter leading-[0.85] mb-6">
          {project.title}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">{project.tagline}</p>

        <div className="flex flex-wrap gap-2 mb-8">
          {project.tech.map((t) => (<Badge key={t} variant="accent">{t}</Badge>))}
        </div>

        {/* Metadata strip */}
        <div className="border-2 border-border grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
          {[
            { label: "STATUS", value: project.status },
            { label: "ROLE", value: project.role },
            { label: "TIMELINE", value: project.timeline },
            { label: "LINKS", value: null },
          ].map((item) => (
            <div key={item.label} className="bg-background p-4 md:p-6">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-1">{item.label}</span>
              {item.value ? (
                <span className="text-sm md:text-base font-bold uppercase tracking-tight text-foreground">{item.value}</span>
              ) : (
                <div className="flex items-center gap-4">
                  {project.github_url && (
                    <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-foreground text-sm font-bold uppercase tracking-widest flex items-center gap-1">
                      <Code2 className="w-3.5 h-3.5" /> CODE
                    </a>
                  )}
                  {project.live_url && (
                    <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-foreground text-sm font-bold uppercase tracking-widest flex items-center gap-1">
                      <ExternalLink className="w-3.5 h-3.5" /> LIVE
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl">
        <div className="prose-kinetic">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{project.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
