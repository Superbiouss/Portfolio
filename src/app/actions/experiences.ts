"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createExperience(formData: FormData) {
  const supabase = await createClient();
  await supabase.from("experiences").insert({
    title: formData.get("title") as string,
    organization: formData.get("organization") as string,
    description: formData.get("description") as string,
    start_date: (formData.get("start_date") as string) || null,
    end_date: (formData.get("end_date") as string) || null,
    is_current: formData.get("is_current") === "on",
    type: (formData.get("type") as string) || "work",
  });
  revalidatePath("/admin/experiences");
  revalidatePath("/resume");
  revalidatePath("/about");
  redirect("/admin/experiences");
}

export async function updateExperience(id: string, formData: FormData) {
  const supabase = await createClient();
  await supabase.from("experiences").update({
    title: formData.get("title") as string,
    organization: formData.get("organization") as string,
    description: formData.get("description") as string,
    start_date: (formData.get("start_date") as string) || null,
    end_date: (formData.get("end_date") as string) || null,
    is_current: formData.get("is_current") === "on",
    type: (formData.get("type") as string) || "work",
    updated_at: new Date().toISOString(),
  }).eq("id", id);
  revalidatePath("/admin/experiences");
  revalidatePath("/resume");
  revalidatePath("/about");
  redirect("/admin/experiences");
}

export async function deleteExperience(id: string) {
  const supabase = await createClient();
  await supabase.from("experiences").delete().eq("id", id);
  revalidatePath("/admin/experiences");
  revalidatePath("/resume");
  revalidatePath("/about");
}
