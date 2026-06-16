import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, Trash2, Pencil } from "lucide-react";
import { deleteCertificate } from "@/app/actions/certificates";

export default async function AdminCertificatesPage() {
  const supabase = await createClient();
  const { data: certs } = await supabase.from("certificates").select("*").order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter">CERTIFICATES</h1>
        <Button variant="primary" asChild>
          <Link href="/admin/certificates/new"><Plus className="mr-2 w-4 h-4" /> NEW CERTIFICATE</Link>
        </Button>
      </div>
      {!certs || certs.length === 0 ? (
        <div className="border-2 border-border p-12 text-center">
          <p className="text-lg text-muted-foreground mb-6">NO CERTIFICATES YET.</p>
          <Button variant="primary" asChild><Link href="/admin/certificates/new">ADD YOUR FIRST CERTIFICATE</Link></Button>
        </div>
      ) : (
        <div className="space-y-0">
          {certs.map((c) => (
            <div key={c.id} className="border-2 border-border border-t-0 first:border-t-2 p-4 md:p-6 flex items-center justify-between hover:border-accent transition-colors duration-300">
              <div>
                <h3 className="text-lg font-bold uppercase tracking-tighter">{c.title}</h3>
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{c.issuer}</span>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" asChild>
                  <Link href={`/admin/certificates/${c.id}/edit`}><Pencil className="w-4 h-4 text-muted-foreground hover:text-accent" /></Link>
                </Button>
                <form action={async () => { "use server"; await deleteCertificate(c.id); }}>
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
