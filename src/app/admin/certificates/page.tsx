import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

import { ViewToggle } from "@/components/admin/view-toggle";
import { SortableCertificates } from "@/components/admin/sortable-certificates";

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
        <SortableCertificates initialCertificates={certs} isGrid={isGrid} />
      )}
    </div>
  );
}
