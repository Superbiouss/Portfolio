import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { updateBadge } from "@/app/actions/badges";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function EditBadgePage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const supabase = await createClient();
  const { data: badge } = await supabase.from("badges").select("*").eq("id", id).single();

  if (!badge) return notFound();

  const updateWithId = updateBadge.bind(null, id);

  return (
    <div>
      <Button variant="ghost" size="sm" asChild className="mb-8">
        <Link href="/admin/badges"><ArrowLeft className="mr-2 w-4 h-4" /> BACK</Link>
      </Button>
      <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-12">EDIT BADGE</h1>
      <div className="border-2 border-border p-6 md:p-8 max-w-lg">
        <form action={updateWithId} className="space-y-8">
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">TITLE</label>
            <Input name="title" defaultValue={badge.title} required className="text-lg" />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">ISSUER</label>
            <Input name="issuer" defaultValue={badge.issuer} required className="text-lg" />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">DESCRIPTION</label>
            <Textarea name="description" defaultValue={badge.description || ""} />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">BADGE IMAGE URL</label>
            <Input name="image_url" defaultValue={badge.image_url || ""} className="text-lg" />
            {badge.image_url && (
              <div className="mt-3 w-20 h-20 border-2 border-border p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={badge.image_url} alt={badge.title} className="w-full h-full object-contain" />
              </div>
            )}
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">BADGE VERIFICATION URL</label>
            <Input name="badge_url" defaultValue={badge.badge_url || ""} className="text-lg" />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">DATE EARNED</label>
            <Input name="earned_date" type="date" defaultValue={badge.earned_date || ""} className="text-lg" />
          </div>
          <Button variant="primary" type="submit" size="lg">SAVE CHANGES</Button>
        </form>
      </div>
    </div>
  );
}
