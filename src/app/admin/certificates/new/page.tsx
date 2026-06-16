import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createCertificate } from "@/app/actions/certificates";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewCertificatePage() {
  return (
    <div>
      <Button variant="ghost" size="sm" asChild className="mb-8">
        <Link href="/admin/certificates"><ArrowLeft className="mr-2 w-4 h-4" /> BACK</Link>
      </Button>
      <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-12">NEW CERTIFICATE</h1>
      <div className="border-2 border-border p-6 md:p-8 max-w-lg">
        <form action={createCertificate} className="space-y-8">
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">TITLE</label>
            <Input name="title" placeholder="CERTIFICATE TITLE" required className="text-lg" />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">ISSUER</label>
            <Input name="issuer" placeholder="E.G., AWS" required className="text-lg" />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">ISSUE DATE</label>
            <Input name="issue_date" type="date" className="text-lg" />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">CREDENTIAL ID</label>
            <Input name="credential_id" placeholder="ABC123" className="text-lg" />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">VERIFICATION URL</label>
            <Input name="verification_url" placeholder="HTTPS://..." className="text-lg" />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">CATEGORY</label>
            <Input name="category" placeholder="E.G., CLOUD" className="text-lg" />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">SKILLS GAINED (COMMA-SEPARATED)</label>
            <Input name="skills_gained" placeholder="AWS, CLOUD, DEVOPS" className="text-lg" />
          </div>
          <Button variant="primary" type="submit" size="lg">ADD CERTIFICATE</Button>
        </form>
      </div>
    </div>
  );
}
