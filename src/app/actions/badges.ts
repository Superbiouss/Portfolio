"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createBadge(formData: FormData) {
  const supabase = await createClient();
  await supabase.from("badges").insert({
    title: formData.get("title") as string,
    issuer: formData.get("issuer") as string,
    description: formData.get("description") as string,
    image_url: formData.get("image_url") as string,
    badge_url: formData.get("badge_url") as string,
    earned_date: (formData.get("earned_date") as string) || null,
  });
  revalidatePath("/admin/badges");
  revalidatePath("/certificates");
  redirect("/admin/badges");
}

export async function updateBadge(id: string, formData: FormData) {
  const supabase = await createClient();
  await supabase.from("badges").update({
    title: formData.get("title") as string,
    issuer: formData.get("issuer") as string,
    description: formData.get("description") as string,
    image_url: formData.get("image_url") as string,
    badge_url: formData.get("badge_url") as string,
    earned_date: (formData.get("earned_date") as string) || null,
    updated_at: new Date().toISOString(),
  }).eq("id", id);
  revalidatePath("/admin/badges");
  revalidatePath("/certificates");
  redirect("/admin/badges");
}

export async function deleteBadge(id: string) {
  const supabase = await createClient();
  await supabase.from("badges").delete().eq("id", id);
  revalidatePath("/admin/badges");
  revalidatePath("/certificates");
}
