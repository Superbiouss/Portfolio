import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Plus, Trash2, Pencil } from "lucide-react";
import { deleteProject } from "@/app/actions/projects";
import { ViewToggle } from "@/components/admin/view-toggle";

const FALLBACK_PROJECTS = [
  { id: "1", title: "LawLens AI", slug: "lawlens-ai", featured: true, status: "published" },
  { id: "2", title: "ArcStone Studios", slug: "arcstone-studios", featured: true, status: "published" },
  { id: "3", title: "Oxford School Portal", slug: "oxford-school-portal", featured: true, status: "published" },
  { id: "4", title: "TaskFlow", slug: "taskflow", featured: false, status: "draft" },
  { id: "5", title: "DevLog", slug: "devlog", featured: false, status: "published" },
  { id: "6", title: "FitTrack Mobile", slug: "fittrack-mobile", featured: false, status: "published" },
];

export default async function AdminProjectsPage(props: { searchParams: Promise<{ view?: string }> }) {
  const { view = "list" } = await props.searchParams;
  const isGrid = view === "grid";
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
        <div className="flex items-center gap-4">
          <ViewToggle />
          <Button variant="primary" asChild>
            <Link href="/admin/projects/new"><Plus className="mr-2 w-4 h-4" /> NEW PROJECT</Link>
          </Button>
        </div>
      </div>

      {!projects || projects.length === 0 ? (
        <div className="border-2 border-border p-12 text-center">
          <p className="text-lg text-muted-foreground mb-6">NO PROJECTS YET.</p>
          <Button variant="primary" asChild>
            <Link href="/admin/projects/new">CREATE YOUR FIRST PROJECT</Link>
          </Button>
        </div>
      ) : (
        <div className={isGrid ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-0"}>
          {projects.map((p) => (
            <div key={p.id} className={`border-2 border-border p-4 md:p-6 flex hover:border-accent transition-colors duration-300 ${isGrid ? "flex-col justify-between h-full gap-6" : "items-center justify-between border-t-0 first:border-t-2"}`}>
              <div>
                <h3 className="text-lg font-bold uppercase tracking-tighter">{p.title}</h3>
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{p.slug}</span>
              </div>
              <div className={`flex items-center gap-3 ${isGrid ? "justify-end w-full" : ""}`}>
                {p.status === "draft" && <Badge variant="outline" className="border-muted-foreground text-muted-foreground">DRAFT</Badge>}
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
