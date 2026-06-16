import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateSkill } from "@/app/actions/skills";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function EditSkillPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const supabase = await createClient();
  const { data: skill } = await supabase.from("skills").select("*").eq("id", id).single();

  if (!skill) return notFound();

  const updateWithId = updateSkill.bind(null, id);

  return (
    <div>
      <Button variant="ghost" size="sm" asChild className="mb-8">
        <Link href="/admin/skills"><ArrowLeft className="mr-2 w-4 h-4" /> BACK</Link>
      </Button>
      <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-12">EDIT SKILL</h1>
      <div className="border-2 border-border p-6 md:p-8 max-w-lg">
        <form action={updateWithId} className="space-y-8">
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">NAME</label>
            <Input name="name" defaultValue={skill.name} required className="text-lg" />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">CATEGORY</label>
            <Input name="category" defaultValue={skill.category} required className="text-lg" />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">PROFICIENCY (0-100)</label>
            <Input name="proficiency" type="number" min="0" max="100" defaultValue={skill.proficiency} className="text-lg" />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">YEARS OF EXPERIENCE</label>
            <Input name="years_experience" type="number" step="0.5" min="0" defaultValue={skill.years_experience} className="text-lg" />
          </div>
          <Button variant="primary" type="submit" size="lg">SAVE CHANGES</Button>
        </form>
      </div>
    </div>
  );
}
