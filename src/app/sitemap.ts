import { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aakashyadav.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/about`, lastModified: new Date("2024-01-01"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/projects`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/skills`, lastModified: new Date("2024-01-01"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/certificates`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/resume`, lastModified: new Date("2024-01-01"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/contact`, lastModified: new Date("2024-01-01"), changeFrequency: "yearly", priority: 0.6 },
  ];

  try {
    const supabase = await createClient();
    const { data: projects } = await supabase
      .from("projects")
      .select("slug, updated_at")
      .eq("status", "published")
      .order("sort_order");

    if (projects && projects.length > 0) {
      const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
        url: `${BASE_URL}/projects/${p.slug}`,
        lastModified: p.updated_at ? new Date(p.updated_at) : new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.85,
      }));

      return [...staticRoutes, ...projectRoutes];
    }
  } catch {
    // Supabase unavailable — return static routes only
  }

  return staticRoutes;
}
