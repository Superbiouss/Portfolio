"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { badgeSchema } from "@/lib/validations";

async function verifyAuth(supabase: any) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized access");
}

export async function createBadge(formData: FormData) {
  const supabase = await createClient();
  await verifyAuth(supabase);

  const rawData = {
    title: formData.get("title") as string,
    issuer: formData.get("issuer") as string,
    description: formData.get("description") as string,
    badgeUrl: formData.get("badge_url") as string,
  };
  const parsed = badgeSchema.parse(rawData);

  await supabase.from("badges").insert({
    title: parsed.title,
    issuer: parsed.issuer,
    description: parsed.description,
    image_url: formData.get("image_url") as string, // keeping out of schema since its dynamic
    badge_url: parsed.badgeUrl,
    earned_date: (formData.get("earned_date") as string) || null,
  });
  revalidatePath("/admin/badges");
  revalidatePath("/certificates");
  redirect("/admin/badges");
}

export async function updateBadge(id: string, formData: FormData) {
  const supabase = await createClient();
  await verifyAuth(supabase);

  const rawData = {
    title: formData.get("title") as string,
    issuer: formData.get("issuer") as string,
    description: formData.get("description") as string,
    badgeUrl: formData.get("badge_url") as string,
  };
  const parsed = badgeSchema.parse(rawData);

  await supabase.from("badges").update({
    title: parsed.title,
    issuer: parsed.issuer,
    description: parsed.description,
    image_url: formData.get("image_url") as string,
    badge_url: parsed.badgeUrl,
    earned_date: (formData.get("earned_date") as string) || null,
    updated_at: new Date().toISOString(),
  }).eq("id", id);
  revalidatePath("/admin/badges");
  revalidatePath("/certificates");
  redirect("/admin/badges");
}

export async function deleteBadge(id: string) {
  const supabase = await createClient();
  await verifyAuth(supabase);
  
  await supabase.from("badges").delete().eq("id", id);
  revalidatePath("/admin/badges");
  revalidatePath("/certificates");
}

export async function updateBadgeOrder(ids: string[]) {
  const supabase = await createClient();
  await verifyAuth(supabase);

  for (let i = 0; i < ids.length; i++) {
    await supabase.from("badges").update({ sort_order: i }).eq("id", ids[i]);
  }

  revalidatePath("/admin/badges");
  revalidatePath("/certificates");
}
