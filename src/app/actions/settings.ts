"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

async function verifyAuth(supabase: any) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized access");
}

export async function getSiteSettings() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("site_settings").select("*").limit(1).single();
  
  if (error || !data) {
    return {
      site_title: "Aakash Yadav - Full-Stack Developer",
      site_description: "Portfolio of Aakash Yadav, a Full-Stack Developer specializing in React, Next.js, and Node.js.",
      seo_keywords: "Full-Stack Developer, React, Next.js, Node.js",
      default_og_image: "",
    };
  }
  return data;
}

export async function updateSiteSettings(formData: FormData) {
  const supabase = await createClient();
  await verifyAuth(supabase);

  const rawData = {
    site_title: formData.get("site_title") as string,
    site_description: formData.get("site_description") as string,
    seo_keywords: formData.get("seo_keywords") as string,
    default_og_image: formData.get("default_og_image") as string,
    updated_at: new Date().toISOString(),
  };

  // We only have one row, so we can just update without an ID by checking if one exists,
  // or we can get the ID first.
  const { data: existing } = await supabase.from("site_settings").select("id").limit(1).single();

  if (existing) {
    await supabase.from("site_settings").update(rawData).eq("id", existing.id);
  } else {
    // If somehow deleted, insert it
    await supabase.from("site_settings").insert(rawData);
  }

  revalidatePath("/");
  revalidatePath("/admin/seo");
}
