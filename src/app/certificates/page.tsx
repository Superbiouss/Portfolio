import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import CertificatesClient from "./certificates-client";

export const metadata: Metadata = {
  title: "Certificates & Badges",
  description: "Professional certifications and digital badges earned by Aakash Yadav — AWS, Meta, Google, IBM, and HackTheBox Academy.",
  openGraph: {
    title: "Certificates & Badges — Aakash Yadav",
    description: "Professional certifications from AWS, Meta, Google, IBM, and more.",
  },
};

const FALLBACK_CERTS = [
  { id: "1", title: "AWS CLOUD PRACTITIONER", issuer: "AMAZON WEB SERVICES", date: "2024", category: "CLOUD", credentialId: "AWS-CP-2024-XXXXX", verifyUrl: "#", num: "01" },
  { id: "2", title: "META FRONTEND DEVELOPER", issuer: "META (COURSERA)", date: "2023", category: "FRONTEND", credentialId: "META-FE-2023-XXXXX", verifyUrl: "#", num: "02" },
  { id: "3", title: "GOOGLE IT AUTOMATION", issuer: "GOOGLE (COURSERA)", date: "2023", category: "AUTOMATION", credentialId: "GOOG-ITA-2023-XXXXX", verifyUrl: "#", num: "03" },
  { id: "4", title: "IBM DATA SCIENCE", issuer: "IBM (COURSERA)", date: "2023", category: "AI", credentialId: "IBM-DS-2023-XXXXX", verifyUrl: "#", num: "04" },
  {
    id: "anthropic-1",
    title: "CLAUDE 101",
    issuer: "ANTHROPIC ACADEMY",
    date: "2026",
    category: "AI",
    credentialId: "md4cckq889rk",
    verifyUrl: "https://verify.skilljar.com/c/md4cckq889rk",
    num: "05",
  },
  {
    id: "anthropic-2",
    title: "CLAUDE CODE 101",
    issuer: "ANTHROPIC ACADEMY",
    date: "2026",
    category: "AI",
    credentialId: "edavbusddpaf",
    verifyUrl: "https://verify.skilljar.com/c/edavbusddpaf",
    num: "06",
  },
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
  {
    id: "2",
    title: "HUMANOID",
    issuer: "HACK THE BOX ACADEMY",
    description: "Completed the Brief Intro to Hardware Attacks module.",
    imageUrl: "https://academy.hackthebox.com/storage/badges/a6fe6c6e23b919c7a41fa3ec144d3a82/logo.png",
    badgeUrl: "https://academy.hackthebox.com/achievement/badge/f9883e20-3ad6-11ee-acfc-bea50ffe6cb4",
    date: "2023",
  },
  {
    id: "3",
    title: "CYBER ROOKIE 365",
    issuer: "HACK THE BOX ACADEMY",
    description: "One year of continuous learning at HTB Academy.",
    imageUrl: "https://academy.hackthebox.com/storage/badges/60fc416b5eec425a6451aeb1e50d14e4/logo.png",
    badgeUrl: "https://academy.hackthebox.com/achievement/badge/b8d8bc79-a333-11ef-864f-bea50ffe6cb4",
    date: "2024",
  },
  {
    id: "4",
    title: "BINARY DUO EXPLORER",
    issuer: "HACK THE BOX ACADEMY",
    description: "Two years of continuous learning at HTB Academy.",
    imageUrl: "https://academy.hackthebox.com/storage/badges/0d982edba15037e6d52d54eaa7f0209a/logo.png",
    badgeUrl: "https://academy.hackthebox.com/achievement/badge/c46e5729-775a-11f0-9254-bea50ffe6cb4",
    date: "2025",
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
