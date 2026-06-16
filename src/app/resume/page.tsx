import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";

export default async function ResumePage() {
  const supabase = await createClient();
  const { data: experiences } = await supabase.from("experiences").select("*").order("start_date", { ascending: false });
  const { data: skills } = await supabase.from("skills").select("name");
  const { data: profile } = await supabase.from("profiles").select("resume_url").limit(1).single();

  const workExperiences = (experiences || []).filter((e) => e.type === "work");
  const education = (experiences || []).filter((e) => e.type === "education");
  const leadership = (experiences || []).filter((e) => e.type === "leadership");

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
        {profile?.resume_url && (
          <Button variant="primary" size="lg" asChild>
            <a href={profile.resume_url} target="_blank" rel="noopener noreferrer"><Download className="mr-3 w-5 h-5" /> DOWNLOAD PDF</a>
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
      {skills && skills.length > 0 && (
        <section className="mb-16 md:mb-24">
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter leading-none mb-8 border-b-2 border-border pb-4">SKILLS</h2>
          <div className="border-2 border-border p-6 md:p-8">
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (<Badge key={s.name}>{s.name}</Badge>))}
            </div>
          </div>
        </section>
      )}

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

      {/* Empty state */}
      {(!experiences || experiences.length === 0) && (!skills || skills.length === 0) && (
        <div className="border-2 border-border p-12 text-center">
          <p className="text-lg text-muted-foreground">Resume content not added yet. Add experiences, skills, and education from the admin panel.</p>
        </div>
      )}
    </div>
  );
}
