import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { createService } from "@/app/actions/services";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewServicePage() {
  return (
    <div>
      <Button variant="ghost" size="sm" asChild className="mb-8">
        <Link href="/admin/services"><ArrowLeft className="mr-2 w-4 h-4" /> BACK</Link>
      </Button>
      
      <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-12">NEW SERVICE</h1>
      
      <div className="border-2 border-border p-6 md:p-8 max-w-lg bg-background">
        <form action={createService} className="space-y-8">
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">TITLE</label>
            <Input name="title" placeholder="E.G., FRONTEND ENGINEERING" required className="text-lg animate-none" />
          </div>
          
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">DESCRIPTION</label>
            <Textarea name="description" placeholder="E.G., Building responsive interfaces..." required className="min-h-[120px]" />
          </div>
          
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">ICON NAME (LUCIDE ICON)</label>
            <Input name="icon_name" placeholder="E.G., LayoutTemplate, Database, Code2" defaultValue="Code2" required className="text-lg" />
            <p className="text-[10px] text-muted-foreground mt-2 font-mono">Options: LayoutTemplate, Database, Code2, Layers, Cpu, Globe, etc.</p>
          </div>
          
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">SORT ORDER</label>
            <Input name="sort_order" type="number" defaultValue="0" required className="text-lg" />
          </div>
          
          <Button variant="primary" type="submit" size="lg">ADD SERVICE</Button>
        </form>
      </div>
    </div>
  );
}
