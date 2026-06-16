import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, Trash2, Pencil } from "lucide-react";
import { deleteBadge } from "@/app/actions/badges";
import { ViewToggle } from "@/components/admin/view-toggle";
const FALLBACK_BADGES = [
  { id: "1", title: "Academician", issuer: "Hack The Box Academy", image_url: "https://academy.hackthebox.com/storage/badges/academician.png" },
  { id: "2", title: "Humanoid", issuer: "Hack The Box Academy", image_url: "https://academy.hackthebox.com/storage/badges/a6fe6c6e23b919c7a41fa3ec144d3a82/logo.png" },
  { id: "3", title: "Cyber Rookie 365", issuer: "Hack The Box Academy", image_url: "https://academy.hackthebox.com/storage/badges/60fc416b5eec425a6451aeb1e50d14e4/logo.png" },
  { id: "4", title: "Binary Duo Explorer", issuer: "Hack The Box Academy", image_url: "https://academy.hackthebox.com/storage/badges/0d982edba15037e6d52d54eaa7f0209a/logo.png" },
];

export default async function AdminBadgesPage(props: { searchParams: Promise<{ view?: string }> }) {
  const { view = "list" } = await props.searchParams;
  const isGrid = view === "grid";
  let badges = FALLBACK_BADGES;
  
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("badges").select("*").order("sort_order");
    if (data && data.length > 0) badges = data;
  } catch {
    // use fallbacks
  }
  return (
    <div>
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter">BADGES</h1>
        <div className="flex items-center gap-4">
          <ViewToggle />
          <Button variant="primary" asChild>
            <Link href="/admin/badges/new"><Plus className="mr-2 w-4 h-4" /> NEW BADGE</Link>
          </Button>
        </div>
      </div>
      {!badges || badges.length === 0 ? (
        <div className="border-2 border-border p-12 text-center">
          <p className="text-lg text-muted-foreground mb-6">NO BADGES YET.</p>
          <Button variant="primary" asChild><Link href="/admin/badges/new">ADD YOUR FIRST BADGE</Link></Button>
        </div>
      ) : (
        <div className={isGrid ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-0"}>
          {badges.map((b) => (
            <div key={b.id} className={`border-2 border-border p-4 md:p-6 flex hover:border-accent transition-colors duration-300 ${isGrid ? "flex-col justify-between h-full gap-6" : "items-center justify-between border-t-0 first:border-t-2"}`}>
              <div className={`flex gap-4 ${isGrid ? "flex-col items-start" : "items-center"}`}>
                {b.image_url && (
                  <div className="w-12 h-12 border-2 border-border overflow-hidden flex-shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={b.image_url} alt={b.title} className="w-full h-full object-contain" />
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-bold uppercase tracking-tighter">{b.title}</h3>
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{b.issuer}</span>
                </div>
              </div>
              <div className={`flex items-center gap-3 ${isGrid ? "justify-end w-full" : ""}`}>
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
