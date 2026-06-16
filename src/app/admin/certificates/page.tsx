import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, Trash2, Pencil } from "lucide-react";
import { deleteCertificate } from "@/app/actions/certificates";
import { ViewToggle } from "@/components/admin/view-toggle";

const FALLBACK_CERTS = [
  { id: "1", title: "AWS Cloud Practitioner", issuer: "Amazon Web Services" },
  { id: "2", title: "Meta Frontend Developer", issuer: "Meta (Coursera)" },
  { id: "3", title: "Google IT Automation with Python", issuer: "Google (Coursera)" },
  { id: "4", title: "IBM Data Science Professional Certificate", issuer: "IBM (Coursera)" },
];

export default async function AdminCertificatesPage(props: { searchParams: Promise<{ view?: string }> }) {
  const { view = "list" } = await props.searchParams;
  const isGrid = view === "grid";
  let certs = FALLBACK_CERTS;
  
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("certificates").select("*").order("created_at", { ascending: false });
    if (data && data.length > 0) certs = data;
  } catch {
    // use fallbacks
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter">CERTIFICATES</h1>
        <div className="flex items-center gap-4">
          <ViewToggle />
          <Button variant="primary" asChild>
            <Link href="/admin/certificates/new"><Plus className="mr-2 w-4 h-4" /> NEW CERTIFICATE</Link>
          </Button>
        </div>
      </div>
      {!certs || certs.length === 0 ? (
        <div className="border-2 border-border p-12 text-center">
          <p className="text-lg text-muted-foreground mb-6">NO CERTIFICATES YET.</p>
          <Button variant="primary" asChild><Link href="/admin/certificates/new">ADD YOUR FIRST CERTIFICATE</Link></Button>
        </div>
      ) : (
        <div className={isGrid ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-0"}>
          {certs.map((c) => (
            <div key={c.id} className={`border-2 border-border p-4 md:p-6 flex hover:border-accent transition-colors duration-300 ${isGrid ? "flex-col justify-between h-full gap-6" : "items-center justify-between border-t-0 first:border-t-2"}`}>
              <div>
                <h3 className="text-lg font-bold uppercase tracking-tighter">{c.title}</h3>
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{c.issuer}</span>
              </div>
              <div className={`flex items-center gap-3 ${isGrid ? "justify-end w-full" : ""}`}>
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
