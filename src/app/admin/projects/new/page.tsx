import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { createProject } from "@/app/actions/projects";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { TagsSelector } from "@/components/admin/tags-selector";

export default async function NewProjectPage() {
  const supabase = await createClient();
  const { data: skillsData } = await supabase.from("skills").select("name").order("name");
  const availableSkills = skillsData?.map((s) => s.name) || [];
  return (
    <div>
      <Button variant="ghost" size="sm" asChild className="mb-8">
        <Link href="/admin/projects"><ArrowLeft className="mr-2 w-4 h-4" /> BACK</Link>
      </Button>

      <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-12">NEW PROJECT</h1>

      <div className="border-2 border-border p-6 md:p-8 max-w-3xl">
        <form action={createProject} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">TITLE</label>
              <Input name="title" placeholder="PROJECT TITLE" required className="text-lg" />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">SLUG</label>
              <Input name="slug" placeholder="PROJECT-SLUG" required className="text-lg" />
            </div>
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">DESCRIPTION</label>
            <Input name="description" placeholder="BRIEF DESCRIPTION" className="text-lg" />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">TECH STACK / TAGS</label>
            <TagsSelector availableSkills={availableSkills} initialSelected={[]} />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">THUMBNAIL</label>
            <input name="thumbnail" type="file" accept="image/*" className="text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:border-2 file:border-border file:bg-transparent file:text-foreground file:font-bold file:uppercase file:tracking-widest file:text-xs file:hover:bg-accent file:hover:text-accent-foreground file:hover:border-accent file:transition-colors file:cursor-pointer" />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">FULL CONTENT (MARKDOWN)</label>
            <Textarea name="content" placeholder="## Problem Statement..." className="min-h-[200px]" />
          </div>
          <div className="flex items-center gap-3">
            <input type="checkbox" name="featured" id="featured" className="w-5 h-5 accent-[#DFE104]" />
            <label htmlFor="featured" className="text-sm font-bold uppercase tracking-widest text-muted-foreground">FEATURED PROJECT</label>
          </div>
          <Button variant="primary" type="submit" size="lg">CREATE PROJECT</Button>
        </form>
      </div>
    </div>
  );
}
