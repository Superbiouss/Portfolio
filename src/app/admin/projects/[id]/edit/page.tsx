import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { updateProject } from "@/app/actions/projects";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function EditProjectPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const supabase = await createClient();
  const { data: project } = await supabase.from("projects").select("*").eq("id", id).single();

  if (!project) return notFound();

  const updateWithId = updateProject.bind(null, id);

  return (
    <div>
      <Button variant="ghost" size="sm" asChild className="mb-8">
        <Link href="/admin/projects"><ArrowLeft className="mr-2 w-4 h-4" /> BACK</Link>
      </Button>

      <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-12">EDIT PROJECT</h1>

      <div className="border-2 border-border p-6 md:p-8 max-w-3xl">
        <form action={updateWithId} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">TITLE</label>
              <Input name="title" defaultValue={project.title} required className="text-lg" />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">SLUG</label>
              <Input name="slug" defaultValue={project.slug} required className="text-lg" />
            </div>
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">DESCRIPTION</label>
            <Input name="description" defaultValue={project.description || ""} className="text-lg" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">STATUS</label>
              <Input name="status" defaultValue={project.status || "completed"} className="text-lg" />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">ROLE</label>
              <Input name="role" defaultValue={project.role || ""} className="text-lg" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">TIMELINE</label>
              <Input name="timeline" defaultValue={project.timeline || ""} placeholder="JAN 2024 – MAR 2024" className="text-lg" />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">TECH STACK (COMMA-SEPARATED)</label>
              <Input name="tech_stack" defaultValue={(project.tech_stack || []).join(", ")} className="text-lg" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">GITHUB URL</label>
              <Input name="github_url" defaultValue={project.github_url || ""} className="text-lg" />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">LIVE URL</label>
              <Input name="live_url" defaultValue={project.live_url || ""} className="text-lg" />
            </div>
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">THUMBNAIL</label>
            <input name="thumbnail" type="file" accept="image/*" className="text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:border-2 file:border-border file:bg-transparent file:text-foreground file:font-bold file:uppercase file:tracking-widest file:text-xs file:hover:bg-accent file:hover:text-accent-foreground file:hover:border-accent file:transition-colors file:cursor-pointer" />
            <input type="hidden" name="existing_thumbnail_url" value={project.thumbnail_url || ""} />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">FULL CONTENT (MARKDOWN)</label>
            <Textarea name="content" defaultValue={project.content || ""} className="min-h-[200px]" />
          </div>
          <div className="flex items-center gap-3">
            <input type="checkbox" name="featured" id="featured" defaultChecked={project.featured} className="w-5 h-5 accent-[#DFE104]" />
            <label htmlFor="featured" className="text-sm font-bold uppercase tracking-widest text-muted-foreground">FEATURED PROJECT</label>
          </div>
          <Button variant="primary" type="submit" size="lg">SAVE CHANGES</Button>
        </form>
      </div>
    </div>
  );
}
