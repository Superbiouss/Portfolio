import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Plus, Trash2 } from "lucide-react";
import { deleteSkill } from "@/app/actions/skills";

export default async function AdminSkillsPage() {
  const supabase = await createClient();
  const { data: skills } = await supabase.from("skills").select("*").order("category");

  return (
    <div>
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter">SKILLS</h1>
        <Button variant="primary" asChild>
          <Link href="/admin/skills/new"><Plus className="mr-2 w-4 h-4" /> NEW SKILL</Link>
        </Button>
      </div>
      {!skills || skills.length === 0 ? (
        <div className="border-2 border-border p-12 text-center">
          <p className="text-lg text-muted-foreground mb-6">NO SKILLS YET.</p>
          <Button variant="primary" asChild><Link href="/admin/skills/new">ADD YOUR FIRST SKILL</Link></Button>
        </div>
      ) : (
        <div className="space-y-0">
          {skills.map((s) => (
            <div key={s.id} className="border-2 border-border border-t-0 first:border-t-2 p-4 md:p-6 flex items-center justify-between hover:border-accent transition-colors duration-300">
              <div className="flex items-center gap-4">
                <Badge variant="accent">{s.category}</Badge>
                <span className="text-lg font-bold uppercase tracking-tighter">{s.name}</span>
              </div>
              <form action={async () => { "use server"; await deleteSkill(s.id); }}>
                <Button variant="ghost" size="icon" type="submit"><Trash2 className="w-4 h-4 text-muted-foreground hover:text-accent" /></Button>
              </form>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
