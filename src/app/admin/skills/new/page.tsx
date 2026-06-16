import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createSkill } from "@/app/actions/skills";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewSkillPage() {
  return (
    <div>
      <Button variant="ghost" size="sm" asChild className="mb-8">
        <Link href="/admin/skills"><ArrowLeft className="mr-2 w-4 h-4" /> BACK</Link>
      </Button>
      <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-12">NEW SKILL</h1>
      <div className="border-2 border-border p-6 md:p-8 max-w-lg">
        <form action={createSkill} className="space-y-8">
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">NAME</label>
            <Input name="name" placeholder="E.G., REACT" required className="text-lg" />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">CATEGORY</label>
            <Input name="category" placeholder="E.G., FRONTEND" required className="text-lg" />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">PROFICIENCY (0-100)</label>
            <Input name="proficiency" type="number" min="0" max="100" defaultValue="50" className="text-lg" />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">YEARS OF EXPERIENCE</label>
            <Input name="years_experience" type="number" step="0.5" min="0" defaultValue="0" className="text-lg" />
          </div>
          <Button variant="primary" type="submit" size="lg">ADD SKILL</Button>
        </form>
      </div>
    </div>
  );
}
