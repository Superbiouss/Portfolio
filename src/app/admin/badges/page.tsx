import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, Trash2, Pencil } from "lucide-react";
import { deleteBadge } from "@/app/actions/badges";
import { ViewToggle } from "@/components/admin/view-toggle";
import { SortableBadges } from "@/components/admin/sortable-badges";

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
        <SortableBadges initialBadges={badges} isGrid={isGrid} />
      )}
    </div>
  );
}
