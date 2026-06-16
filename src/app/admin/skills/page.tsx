import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Plus, Trash2, Pencil } from "lucide-react";
import { deleteSkill } from "@/app/actions/skills";

const FALLBACK_SKILLS = [
  { id: "1", name: "React", category: "FRONTEND" },
  { id: "2", name: "Next.js", category: "FRONTEND" },
  { id: "3", name: "TypeScript", category: "FRONTEND" },
  { id: "4", name: "Tailwind CSS", category: "FRONTEND" },
  { id: "5", name: "Framer Motion", category: "FRONTEND" },
  { id: "6", name: "Zustand", category: "FRONTEND" },
  { id: "7", name: "Node.js", category: "BACKEND" },
  { id: "8", name: "Express", category: "BACKEND" },
  { id: "9", name: "PostgreSQL", category: "BACKEND" },
  { id: "10", name: "Supabase", category: "BACKEND" },
  { id: "11", name: "Prisma", category: "BACKEND" },
  { id: "12", name: "OpenAI API", category: "AI & AUTOMATION" },
  { id: "13", name: "LangChain", category: "AI & AUTOMATION" },
  { id: "14", name: "N8N", category: "AI & AUTOMATION" },
  { id: "15", name: "Pinecone", category: "AI & AUTOMATION" },
  { id: "16", name: "Docker", category: "CLOUD & DEVOPS" },
  { id: "17", name: "Vercel", category: "CLOUD & DEVOPS" },
  { id: "18", name: "AWS EC2", category: "CLOUD & DEVOPS" },
];

export default async function AdminSkillsPage() {
  let skills = FALLBACK_SKILLS;
  
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("skills").select("*").order("category");
    if (data && data.length > 0) skills = data;
  } catch {
    // use fallbacks
  }

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
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" asChild>
                  <Link href={`/admin/skills/${s.id}/edit`}><Pencil className="w-4 h-4 text-muted-foreground hover:text-accent" /></Link>
                </Button>
                <form action={async () => { "use server"; await deleteSkill(s.id); }}>
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
