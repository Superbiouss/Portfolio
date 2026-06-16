import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { updateExperience } from "@/app/actions/experiences";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function EditExperiencePage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const supabase = await createClient();
  const { data: exp } = await supabase.from("experiences").select("*").eq("id", id).single();

  if (!exp) return notFound();

  const updateWithId = updateExperience.bind(null, id);

  return (
    <div>
      <Button variant="ghost" size="sm" asChild className="mb-8">
        <Link href="/admin/experiences"><ArrowLeft className="mr-2 w-4 h-4" /> BACK</Link>
      </Button>
      <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-12">EDIT EXPERIENCE</h1>
      <div className="border-2 border-border p-6 md:p-8 max-w-lg">
        <form action={updateWithId} className="space-y-8">
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">TITLE</label>
            <Input name="title" defaultValue={exp.title} required className="text-lg" />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">ORGANIZATION</label>
            <Input name="organization" defaultValue={exp.organization} required className="text-lg" />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">TYPE</label>
            <select name="type" defaultValue={exp.type || "work"} className="w-full bg-transparent text-foreground text-lg font-bold uppercase tracking-tighter border-0 border-b-2 border-border px-0 py-4 focus:outline-none focus:border-accent">
              <option value="work" className="bg-background">WORK</option>
              <option value="education" className="bg-background">EDUCATION</option>
              <option value="leadership" className="bg-background">LEADERSHIP</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">DESCRIPTION</label>
            <Textarea name="description" defaultValue={exp.description || ""} />
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">START DATE</label>
              <Input name="start_date" type="date" defaultValue={exp.start_date || ""} className="text-lg" />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">END DATE</label>
              <Input name="end_date" type="date" defaultValue={exp.end_date || ""} className="text-lg" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <input type="checkbox" name="is_current" id="is_current" defaultChecked={exp.is_current} className="w-5 h-5 accent-[#DFE104]" />
            <label htmlFor="is_current" className="text-sm font-bold uppercase tracking-widest text-muted-foreground">CURRENTLY HERE</label>
          </div>
          <Button variant="primary" type="submit" size="lg">SAVE CHANGES</Button>
        </form>
      </div>
    </div>
  );
}
