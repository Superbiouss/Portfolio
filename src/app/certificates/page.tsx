import { createClient } from "@/lib/supabase/server";
import CertificatesClient from "./certificates-client";

const FALLBACK_CERTS = [
  { id: "1", title: "AWS CLOUD PRACTITIONER", issuer: "AMAZON WEB SERVICES", date: "2024", category: "CLOUD", credentialId: "AWS-CP-2024-XXXXX", verifyUrl: "#", num: "01" },
  { id: "2", title: "META FRONTEND DEVELOPER", issuer: "META (COURSERA)", date: "2023", category: "FRONTEND", credentialId: "META-FE-2023-XXXXX", verifyUrl: "#", num: "02" },
  { id: "3", title: "GOOGLE IT AUTOMATION", issuer: "GOOGLE (COURSERA)", date: "2023", category: "AUTOMATION", credentialId: "GOOG-ITA-2023-XXXXX", verifyUrl: "#", num: "03" },
  { id: "4", title: "IBM DATA SCIENCE", issuer: "IBM (COURSERA)", date: "2023", category: "AI", credentialId: "IBM-DS-2023-XXXXX", verifyUrl: "#", num: "04" },
];

export default async function CertificatesPage() {
  let formatted = FALLBACK_CERTS;

  try {
    const supabase = await createClient();
    const { data: certs } = await supabase.from("certificates").select("*").order("sort_order");

    if (certs && certs.length > 0) {
      formatted = certs.map((c, i) => ({
        id: c.id,
        title: c.title?.toUpperCase() || "UNTITLED",
        issuer: c.issuer?.toUpperCase() || "",
        date: c.issue_date ? new Date(c.issue_date).getFullYear().toString() : "",
        category: c.category?.toUpperCase() || "OTHER",
        credentialId: c.credential_id || "",
        verifyUrl: c.verification_url || "#",
        num: String(i + 1).padStart(2, "0"),
      }));
    }
  } catch {
    // Supabase not configured — use fallbacks
  }

  return <CertificatesClient certs={formatted} />;
}
