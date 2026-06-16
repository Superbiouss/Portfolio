"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createSkill(formData: FormData) {
  const supabase = await createClient();
  await supabase.from("skills").insert({
    name: formData.get("name") as string,
    category: formData.get("category") as string,
    proficiency: parseInt(formData.get("proficiency") as string) || 50,
    years_experience: parseFloat(formData.get("years_experience") as string) || 0,
  });
  revalidatePath("/admin/skills");
  revalidatePath("/skills");
  revalidatePath("/");
  redirect("/admin/skills");
}

export async function updateSkill(id: string, formData: FormData) {
  const supabase = await createClient();
  await supabase.from("skills").update({
    name: formData.get("name") as string,
    category: formData.get("category") as string,
    proficiency: parseInt(formData.get("proficiency") as string) || 50,
    years_experience: parseFloat(formData.get("years_experience") as string) || 0,
    updated_at: new Date().toISOString(),
  }).eq("id", id);
  revalidatePath("/admin/skills");
  revalidatePath("/skills");
  revalidatePath("/");
  redirect("/admin/skills");
}

export async function deleteSkill(id: string) {
  const supabase = await createClient();
  await supabase.from("skills").delete().eq("id", id);
  revalidatePath("/admin/skills");
  revalidatePath("/skills");
  revalidatePath("/");
}
