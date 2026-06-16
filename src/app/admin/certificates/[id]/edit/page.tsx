import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateCertificate } from "@/app/actions/certificates";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function EditCertificatePage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const supabase = await createClient();
  const { data: cert } = await supabase.from("certificates").select("*").eq("id", id).single();

  if (!cert) return notFound();

  const updateWithId = updateCertificate.bind(null, id);

  return (
    <div>
      <Button variant="ghost" size="sm" asChild className="mb-8">
        <Link href="/admin/certificates"><ArrowLeft className="mr-2 w-4 h-4" /> BACK</Link>
      </Button>
      <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-12">EDIT CERTIFICATE</h1>
      <div className="border-2 border-border p-6 md:p-8 max-w-lg">
        <form action={updateWithId} className="space-y-8">
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">TITLE</label>
            <Input name="title" defaultValue={cert.title} required className="text-lg" />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">ISSUER</label>
            <Input name="issuer" defaultValue={cert.issuer} required className="text-lg" />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">ISSUE DATE</label>
            <Input name="issue_date" type="date" defaultValue={cert.issue_date || ""} className="text-lg" />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">CREDENTIAL ID</label>
            <Input name="credential_id" defaultValue={cert.credential_id || ""} className="text-lg" />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">VERIFICATION URL</label>
            <Input name="verification_url" defaultValue={cert.verification_url || ""} className="text-lg" />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">CATEGORY</label>
            <Input name="category" defaultValue={cert.category || ""} className="text-lg" />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">SKILLS GAINED (COMMA-SEPARATED)</label>
            <Input name="skills_gained" defaultValue={(cert.skills_gained || []).join(", ")} className="text-lg" />
          </div>
          <Button variant="primary" type="submit" size="lg">SAVE CHANGES</Button>
        </form>
      </div>
    </div>
  );
}
