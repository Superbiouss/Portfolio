import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, Trash2, Pencil } from "lucide-react";
import { deleteBadge } from "@/app/actions/badges";
import Image from "next/image";

export default async function AdminBadgesPage() {
  const supabase = await createClient();
  const { data: badges } = await supabase.from("badges").select("*").order("sort_order");

  return (
    <div>
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter">BADGES</h1>
        <Button variant="primary" asChild>
          <Link href="/admin/badges/new"><Plus className="mr-2 w-4 h-4" /> NEW BADGE</Link>
        </Button>
      </div>
      {!badges || badges.length === 0 ? (
        <div className="border-2 border-border p-12 text-center">
          <p className="text-lg text-muted-foreground mb-6">NO BADGES YET.</p>
          <Button variant="primary" asChild><Link href="/admin/badges/new">ADD YOUR FIRST BADGE</Link></Button>
        </div>
      ) : (
        <div className="space-y-0">
          {badges.map((b) => (
            <div key={b.id} className="border-2 border-border border-t-0 first:border-t-2 p-4 md:p-6 flex items-center justify-between hover:border-accent transition-colors duration-300">
              <div className="flex items-center gap-4">
                {b.image_url && (
                  <div className="w-12 h-12 border-2 border-border overflow-hidden flex-shrink-0">
                    <img src={b.image_url} alt={b.title} className="w-full h-full object-contain" />
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-bold uppercase tracking-tighter">{b.title}</h3>
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{b.issuer}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" asChild>
                  <Link href={`/admin/badges/${b.id}/edit`}><Pencil className="w-4 h-4 text-muted-foreground hover:text-accent" /></Link>
                </Button>
                <form action={async () => { "use server"; await deleteBadge(b.id); }}>
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
