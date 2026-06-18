import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Plus, Trash2, Pencil } from "lucide-react";
import { deleteProject } from "@/app/actions/projects";
import { ViewToggle } from "@/components/admin/view-toggle";
import { SortableProjects } from "@/components/admin/sortable-projects";

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
        <SortableProjects initialProjects={projects} isGrid={isGrid} />
      )}
    </div>
  );
}
