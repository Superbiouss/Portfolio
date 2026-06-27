import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, Trash2, Pencil } from "lucide-react";
import { deleteService } from "@/app/actions/services";

const FALLBACK_SERVICES = [
  { id: "1", title: "FRONTEND ENGINEERING", description: "Building highly interactive, accessible, and performant user interfaces using modern frameworks like React and Next.js.", icon_name: "LayoutTemplate" },
  { id: "2", title: "BACKEND ARCHITECTURE", description: "Designing robust APIs, scalable database schemas, and secure server-side logic using Node.js, Python, and SQL.", icon_name: "Database" },
  { id: "3", title: "UI/UX DESIGN", description: "Crafting premium brutalist designs with a focus on micro-interactions, responsive layouts, and kinetic typography.", icon_name: "Code2" }
];

export default async function AdminServicesPage() {
  let services = FALLBACK_SERVICES;

  try {
    const supabase = await createClient();
    const { data } = await supabase.from("services").select("*").order("sort_order");
    if (data && data.length > 0) {
      services = data;
    }
  } catch {
    // Supabase not configured — use fallback
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter">SERVICES</h1>
          <p className="text-sm text-muted-foreground uppercase tracking-widest mt-1">Manage core competencies shown on home page</p>
        </div>
        <Button variant="primary" asChild>
          <Link href="/admin/services/new"><Plus className="mr-2 w-4 h-4" /> NEW SERVICE</Link>
        </Button>
      </div>

      {!services || services.length === 0 ? (
        <div className="border-2 border-border p-12 text-center bg-background">
          <p className="text-lg text-muted-foreground mb-6">NO SERVICES YET.</p>
          <Button variant="primary" asChild>
            <Link href="/admin/services/new">ADD YOUR FIRST SERVICE</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="border-2 border-border p-6 md:p-8 bg-background flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-accent transition-colors duration-300"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-mono font-bold uppercase px-2 py-0.5 border border-border/30 bg-muted text-muted-foreground">
                    Icon: {service.icon_name}
                  </span>
                </div>
                <h3 className="text-2xl font-bold uppercase tracking-tight mb-2 text-foreground">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed max-w-3xl">{service.description}</p>
              </div>
              
              <div className="flex items-center gap-3 shrink-0">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/admin/services/${service.id}/edit`}>
                    <Pencil className="w-3.5 h-3.5 mr-2" /> EDIT
                  </Link>
                </Button>
                
                <form action={async () => { "use server"; await deleteService(service.id); }}>
                  <Button variant="outline" size="sm" className="hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors">
                    <Trash2 className="w-3.5 h-3.5 mr-2" /> DELETE
                  </Button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
