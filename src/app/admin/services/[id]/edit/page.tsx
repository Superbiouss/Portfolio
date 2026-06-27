import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { updateService } from "@/app/actions/services";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const FALLBACK_SERVICES = [
  { id: "1", title: "FRONTEND ENGINEERING", description: "Building highly interactive, accessible, and performant user interfaces using modern frameworks like React and Next.js.", icon_name: "LayoutTemplate", sort_order: 1 },
  { id: "2", title: "BACKEND ARCHITECTURE", description: "Designing robust APIs, scalable database schemas, and secure server-side logic using Node.js, Python, and SQL.", icon_name: "Database", sort_order: 2 },
  { id: "3", title: "UI/UX DESIGN", description: "Crafting premium brutalist designs with a focus on micro-interactions, responsive layouts, and kinetic typography.", icon_name: "Code2", sort_order: 3 }
];

export default async function EditServicePage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  let service = null;

  try {
    const supabase = await createClient();
    const { data } = await supabase.from("services").select("*").eq("id", id).single();
    if (data) {
      service = data;
    }
  } catch {
    // Supabase not configured — use fallback matching ID
    service = FALLBACK_SERVICES.find(s => s.id === id) || null;
  }

  // If not found in database or fallbacks, use the first fallback to allow offline testing
  if (!service) {
    service = FALLBACK_SERVICES.find(s => s.id === id) || FALLBACK_SERVICES[0];
  }

  const updateWithId = updateService.bind(null, id);

  return (
    <div>
      <Button variant="ghost" size="sm" asChild className="mb-8">
        <Link href="/admin/services"><ArrowLeft className="mr-2 w-4 h-4" /> BACK</Link>
      </Button>

      <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-12">EDIT SERVICE</h1>

      <div className="border-2 border-border p-6 md:p-8 max-w-lg bg-background">
        <form action={updateWithId} className="space-y-8">
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">TITLE</label>
            <Input name="title" defaultValue={service.title} required className="text-lg" />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">DESCRIPTION</label>
            <Textarea name="description" defaultValue={service.description} required className="min-h-[120px]" />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">ICON NAME (LUCIDE ICON)</label>
            <Input name="icon_name" defaultValue={service.icon_name} required className="text-lg" />
            <p className="text-[10px] text-muted-foreground mt-2 font-mono">Options: LayoutTemplate, Database, Code2, Layers, Cpu, Globe, etc.</p>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">SORT ORDER</label>
            <Input name="sort_order" type="number" defaultValue={service.sort_order || 0} required className="text-lg" />
          </div>

          <Button variant="primary" type="submit" size="lg">SAVE CHANGES</Button>
        </form>
      </div>
    </div>
  );
}
