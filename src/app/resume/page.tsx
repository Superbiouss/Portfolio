import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";

export default function ResumePage() {
  return (
    <div className="max-w-[95vw] mx-auto py-16 md:py-32">
      <Button variant="ghost" size="sm" asChild className="mb-12">
        <Link href="/"><ArrowLeft className="mr-2 w-4 h-4" /> HOME</Link>
      </Button>

      <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 md:mb-24 gap-6">
        <div>
          <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-muted-foreground block mb-2">RESUME</span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter leading-none">
            <span className="text-accent">INTERACTIVE</span><br />RESUME
          </h1>
        </div>
        <Button variant="primary" size="lg" asChild>
          <a href="#"><Download className="mr-3 w-5 h-5" /> DOWNLOAD PDF</a>
        </Button>
      </div>

      {/* Education */}
      <section className="mb-16 md:mb-24">
        <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter leading-none mb-8 border-b-2 border-border pb-4">EDUCATION</h2>
        <div className="border-2 border-border p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2 gap-2">
            <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tighter">BACHELOR OF TECHNOLOGY</h3>
            <Badge variant="accent">2021 – 2025</Badge>
          </div>
          <p className="text-lg text-muted-foreground">Computer Science & Engineering</p>
        </div>
      </section>

      {/* Experience */}
      <section className="mb-16 md:mb-24">
        <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter leading-none mb-8 border-b-2 border-border pb-4">EXPERIENCE</h2>
        <div className="space-y-0">
          {[
            { title: "FULL-STACK DEVELOPER", org: "FREELANCE", period: "2023 – PRESENT", desc: "Building production web apps for clients using Next.js, Supabase, and AI." },
            { title: "FRONTEND DEVELOPER INTERN", org: "TECH STARTUP", period: "2022 – 2023", desc: "Implemented responsive UIs and component libraries." },
          ].map((exp, i) => (
            <div key={i} className="border-2 border-border border-t-0 first:border-t-2 p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2 gap-2">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tighter">{exp.title}</h3>
                  <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">{exp.org}</span>
                </div>
                <Badge variant="accent">{exp.period}</Badge>
              </div>
              <p className="text-lg text-muted-foreground mt-2">{exp.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="mb-16 md:mb-24">
        <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter leading-none mb-8 border-b-2 border-border pb-4">SKILLS</h2>
        <div className="border-2 border-border p-6 md:p-8">
          <div className="flex flex-wrap gap-2">
            {["Next.js", "React", "TypeScript", "Node.js", "Supabase", "PostgreSQL", "Tailwind", "Framer Motion", "OpenAI", "Docker", "Vercel", "Figma"].map((s) => (
              <Badge key={s}>{s}</Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section>
        <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter leading-none mb-8 border-b-2 border-border pb-4">LEADERSHIP</h2>
        <div className="border-2 border-border p-6 md:p-8">
          <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tighter mb-1">TECHNICAL LEAD — COLLEGE TECH CLUB</h3>
          <p className="text-lg text-muted-foreground">Led a team of 10 developers on multiple projects.</p>
        </div>
      </section>
    </div>
  );
}
