import { createClient } from "@/lib/supabase/server";
import CertificatesClient from "./certificates-client";

const FALLBACK_CERTS = [
  { id: "1", title: "AWS CLOUD PRACTITIONER", issuer: "AMAZON WEB SERVICES", date: "2024", category: "CLOUD", credentialId: "AWS-CP-2024-XXXXX", verifyUrl: "#", num: "01" },
  { id: "2", title: "META FRONTEND DEVELOPER", issuer: "META (COURSERA)", date: "2023", category: "FRONTEND", credentialId: "META-FE-2023-XXXXX", verifyUrl: "#", num: "02" },
  { id: "3", title: "GOOGLE IT AUTOMATION", issuer: "GOOGLE (COURSERA)", date: "2023", category: "AUTOMATION", credentialId: "GOOG-ITA-2023-XXXXX", verifyUrl: "#", num: "03" },
  { id: "4", title: "IBM DATA SCIENCE", issuer: "IBM (COURSERA)", date: "2023", category: "AI", credentialId: "IBM-DS-2023-XXXXX", verifyUrl: "#", num: "04" },
];

const FALLBACK_BADGES = [
  {
    id: "1",
    title: "ACADEMICIAN",
    issuer: "HACK THE BOX ACADEMY",
    description: "Earned for completing the Intro to Academy module.",
    imageUrl: "https://academy.hackthebox.com/storage/badges/academician.png",
    badgeUrl: "https://academy.hackthebox.com/achievement/badge/fc087557-3885-11ee-acfc-bea50ffe6cb4",
    date: "2023",
  },
];

export default async function CertificatesPage() {
  let formatted = FALLBACK_CERTS;
  let badges = FALLBACK_BADGES;

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

    const { data: badgesData } = await supabase.from("badges").select("*").order("sort_order");
    if (badgesData && badgesData.length > 0) {
      badges = badgesData.map((b) => ({
        id: b.id,
        title: b.title?.toUpperCase() || "UNTITLED",
        issuer: b.issuer?.toUpperCase() || "",
        description: b.description || "",
        imageUrl: b.image_url || "",
        badgeUrl: b.badge_url || "#",
        date: b.earned_date ? new Date(b.earned_date).getFullYear().toString() : "",
      }));
    }
  } catch {
    // Supabase not configured — use fallbacks
  }

  return <CertificatesClient certs={formatted} badges={badges} />;
}
