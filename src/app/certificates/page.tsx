import { createClient } from "@/lib/supabase/server";
import CertificatesClient from "./certificates-client";

export default async function CertificatesPage() {
  const supabase = await createClient();
  const { data: certs } = await supabase.from("certificates").select("*").order("sort_order");

  const formatted = (certs || []).map((c, i) => ({
    id: c.id,
    title: c.title?.toUpperCase() || "UNTITLED",
    issuer: c.issuer?.toUpperCase() || "",
    date: c.issue_date ? new Date(c.issue_date).getFullYear().toString() : "",
    category: c.category?.toUpperCase() || "OTHER",
    credentialId: c.credential_id || "",
    verifyUrl: c.verification_url || "#",
    num: String(i + 1).padStart(2, "0"),
  }));

  return <CertificatesClient certs={formatted} />;
}
