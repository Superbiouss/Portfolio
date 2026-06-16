import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";

interface Experience { id: string; title: string; organization: string; description: string; start_date: string | null; end_date: string | null; is_current: boolean; type: string }

const FALLBACK_WORK: Experience[] = [
  { id: "1", title: "Full-Stack Developer", organization: "Freelance", description: "Building production-grade web applications for clients using Next.js, Supabase, and AI integrations. Delivered 10+ projects.", start_date: "2023-06-01", end_date: null, is_current: true, type: "work" },
  { id: "2", title: "Frontend Developer Intern", organization: "Tech Startup", description: "Implemented responsive UI components and helped establish the company design system. Improved page load times by 40%.", start_date: "2022-09-01", end_date: "2023-05-31", is_current: false, type: "work" },
];

const FALLBACK_EDU: Experience[] = [
  { id: "3", title: "Bachelor of Technology — Computer Science", organization: "University of Technology", description: "Focused on software engineering, data structures, algorithms, and web technologies. Graduated with distinction.", start_date: "2021-08-01", end_date: "2025-06-30", is_current: false, type: "education" },
];

const FALLBACK_LEADERSHIP: Experience[] = [
  { id: "4", title: "Technical Lead — College Tech Club", organization: "University Tech Society", description: "Led a team of 10 developers building open-source tools. Organized 5 hackathons with 200+ participants.", start_date: "2023-01-01", end_date: "2024-12-31", is_current: false, type: "leadership" },
];

const FALLBACK_SKILLS = ["React", "Next.js", "TypeScript", "Node.js", "Supabase", "PostgreSQL", "Tailwind CSS", "Framer Motion", "OpenAI API", "Docker", "Vercel", "Figma"];

export default async function ResumePage() {
  let workExperiences: Experience[] = FALLBACK_WORK;
  let education: Experience[] = FALLBACK_EDU;
  let leadership: Experience[] = FALLBACK_LEADERSHIP;
  let skillNames = FALLBACK_SKILLS;
  let resumeUrl: string | null = null;

  try {
    const supabase = await createClient();
    const { data: experiences } = await supabase.from("experiences").select("*").order("start_date", { ascending: false });
    const { data: skills } = await supabase.from("skills").select("name");
    const { data: profile } = await supabase.from("profiles").select("resume_url").limit(1).single();

    if (experiences && experiences.length > 0) {
      workExperiences = experiences.filter((e) => e.type === "work");
      education = experiences.filter((e) => e.type === "education");
      leadership = experiences.filter((e) => e.type === "leadership");
    }
    if (skills && skills.length > 0) {
      skillNames = skills.map((s) => s.name);
    }
    resumeUrl = profile?.resume_url || null;
  } catch {
    // Supabase not configured — use fallbacks
  }

  const formatDate = (d: string | null) => d ? new Date(d).getFullYear().toString() : "";

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
        {resumeUrl ? (
          <Button variant="primary" size="lg" asChild>
            <a href={resumeUrl} target="_blank" rel="noopener noreferrer"><Download className="mr-3 w-5 h-5" /> DOWNLOAD PDF</a>
          </Button>
        ) : (
          <Button variant="primary" size="lg" asChild>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer"><Download className="mr-3 w-5 h-5" /> DOWNLOAD PDF</a>
          </Button>
        )}
      </div>

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-16 md:mb-24">
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter leading-none mb-8 border-b-2 border-border pb-4">EDUCATION</h2>
          <div className="space-y-0">
            {education.map((exp) => (
              <div key={exp.id} className="border-2 border-border border-t-0 first:border-t-2 p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2 gap-2">
                  <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tighter">{exp.title}</h3>
                  <Badge variant="accent">{formatDate(exp.start_date)}{exp.end_date ? ` – ${formatDate(exp.end_date)}` : exp.is_current ? " – PRESENT" : ""}</Badge>
                </div>
                <p className="text-lg text-muted-foreground">{exp.organization}</p>
                {exp.description && <p className="text-muted-foreground mt-2">{exp.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {workExperiences.length > 0 && (
        <section className="mb-16 md:mb-24">
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter leading-none mb-8 border-b-2 border-border pb-4">EXPERIENCE</h2>
          <div className="space-y-0">
            {workExperiences.map((exp) => (
              <div key={exp.id} className="border-2 border-border border-t-0 first:border-t-2 p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2 gap-2">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tighter">{exp.title}</h3>
                    <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">{exp.organization}</span>
                  </div>
                  <Badge variant="accent">{formatDate(exp.start_date)}{exp.is_current ? " – PRESENT" : exp.end_date ? ` – ${formatDate(exp.end_date)}` : ""}</Badge>
                </div>
                {exp.description && <p className="text-lg text-muted-foreground mt-2">{exp.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      <section className="mb-16 md:mb-24">
        <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter leading-none mb-8 border-b-2 border-border pb-4">SKILLS</h2>
        <div className="border-2 border-border p-6 md:p-8">
          <div className="flex flex-wrap gap-2">
            {skillNames.map((s) => (<Badge key={s}>{s}</Badge>))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      {leadership.length > 0 && (
        <section>
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter leading-none mb-8 border-b-2 border-border pb-4">LEADERSHIP</h2>
          <div className="space-y-0">
            {leadership.map((exp) => (
              <div key={exp.id} className="border-2 border-border border-t-0 first:border-t-2 p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tighter mb-1">{exp.title}</h3>
                <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">{exp.organization}</span>
                {exp.description && <p className="text-lg text-muted-foreground mt-2">{exp.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
