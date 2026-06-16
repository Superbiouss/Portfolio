import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Plus, Trash2, Pencil } from "lucide-react";
import { deleteProject } from "@/app/actions/projects";

const FALLBACK_PROJECTS = [
  { id: "1", title: "LawLens AI", slug: "lawlens-ai", featured: true },
  { id: "2", title: "ArcStone Studios", slug: "arcstone-studios", featured: true },
  { id: "3", title: "Oxford School Portal", slug: "oxford-school-portal", featured: true },
  { id: "4", title: "TaskFlow", slug: "taskflow", featured: false },
  { id: "5", title: "DevLog", slug: "devlog", featured: false },
  { id: "6", title: "FitTrack Mobile", slug: "fittrack-mobile", featured: false },
];

export default async function AdminProjectsPage() {
  let projects = FALLBACK_PROJECTS;
  
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
    if (data && data.length > 0) projects = data;
  } catch {
    // use fallbacks
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter">PROJECTS</h1>
        <Button variant="primary" asChild>
          <Link href="/admin/projects/new"><Plus className="mr-2 w-4 h-4" /> NEW PROJECT</Link>
        </Button>
      </div>

      {!projects || projects.length === 0 ? (
        <div className="border-2 border-border p-12 text-center">
          <p className="text-lg text-muted-foreground mb-6">NO PROJECTS YET.</p>
          <Button variant="primary" asChild>
            <Link href="/admin/projects/new">CREATE YOUR FIRST PROJECT</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-0">
          {projects.map((p) => (
            <div key={p.id} className="border-2 border-border border-t-0 first:border-t-2 p-4 md:p-6 flex items-center justify-between hover:border-accent transition-colors duration-300">
              <div>
                <h3 className="text-lg font-bold uppercase tracking-tighter">{p.title}</h3>
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{p.slug}</span>
              </div>
              <div className="flex items-center gap-3">
                {p.featured && <Badge variant="accent">FEATURED</Badge>}
                <Button variant="ghost" size="icon" asChild>
                  <Link href={`/admin/projects/${p.id}/edit`}><Pencil className="w-4 h-4 text-muted-foreground hover:text-accent" /></Link>
                </Button>
                <form action={async () => { "use server"; await deleteProject(p.id); }}>
                  <Button variant="ghost" size="icon" type="submit"><Trash2 className="w-4 h-4 text-muted-foreground hover:text-accent" /></Button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
