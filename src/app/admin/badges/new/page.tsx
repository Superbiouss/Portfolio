import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { createBadge } from "@/app/actions/badges";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewBadgePage() {
  return (
    <div>
      <Button variant="ghost" size="sm" asChild className="mb-8">
        <Link href="/admin/badges"><ArrowLeft className="mr-2 w-4 h-4" /> BACK</Link>
      </Button>
      <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-12">NEW BADGE</h1>
      <div className="border-2 border-border p-6 md:p-8 max-w-lg">
        <form action={createBadge} className="space-y-8">
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">TITLE</label>
            <Input name="title" placeholder="E.G., ACADEMICIAN" required className="text-lg" />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">ISSUER</label>
            <Input name="issuer" placeholder="E.G., HACK THE BOX" required className="text-lg" />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">DESCRIPTION</label>
            <Textarea name="description" placeholder="What was this badge earned for?" />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">BADGE IMAGE URL</label>
            <Input name="image_url" placeholder="HTTPS://..." className="text-lg" />
            <p className="text-xs text-muted-foreground mt-2">Direct URL to the badge image (PNG/SVG).</p>
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">BADGE VERIFICATION URL</label>
            <Input name="badge_url" placeholder="HTTPS://..." className="text-lg" />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">DATE EARNED</label>
            <Input name="earned_date" type="date" className="text-lg" />
          </div>
          <Button variant="primary" type="submit" size="lg">ADD BADGE</Button>
        </form>
      </div>
    </div>
  );
}
