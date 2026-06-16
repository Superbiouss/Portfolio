import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Plus, Trash2, Pencil } from "lucide-react";
import { deleteExperience } from "@/app/actions/experiences";

const FALLBACK_EXPERIENCES = [
  { id: "1", title: "Full-Stack Developer", organization: "Freelance", type: "work" },
  { id: "2", title: "Frontend Developer Intern", organization: "Tech Startup", type: "work" },
  { id: "3", title: "Bachelor of Technology — Computer Science", organization: "University of Technology", type: "education" },
  { id: "4", title: "Technical Lead — College Tech Club", organization: "University Tech Society", type: "leadership" },
];

export default async function AdminExperiencesPage() {
  let experiences = FALLBACK_EXPERIENCES;
  
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("experiences").select("*").order("start_date", { ascending: false });
    if (data && data.length > 0) experiences = data;
  } catch {
    // use fallbacks
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter">EXPERIENCES</h1>
        <Button variant="primary" asChild>
          <Link href="/admin/experiences/new"><Plus className="mr-2 w-4 h-4" /> NEW EXPERIENCE</Link>
        </Button>
      </div>
      {!experiences || experiences.length === 0 ? (
        <div className="border-2 border-border p-12 text-center">
          <p className="text-lg text-muted-foreground mb-6">NO EXPERIENCES YET.</p>
          <Button variant="primary" asChild><Link href="/admin/experiences/new">ADD YOUR FIRST EXPERIENCE</Link></Button>
        </div>
      ) : (
        <div className="space-y-0">
          {experiences.map((e) => (
            <div key={e.id} className="border-2 border-border border-t-0 first:border-t-2 p-4 md:p-6 flex items-center justify-between hover:border-accent transition-colors duration-300">
              <div>
                <h3 className="text-lg font-bold uppercase tracking-tighter">{e.title}</h3>
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{e.organization} · {e.type}</span>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="accent">{e.type?.toUpperCase()}</Badge>
                <Button variant="ghost" size="icon" asChild><Link href={`/admin/experiences/${e.id}/edit`}><Pencil className="w-4 h-4 text-muted-foreground hover:text-accent" /></Link></Button>
                <form action={async () => { "use server"; await deleteExperience(e.id); }}>
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
