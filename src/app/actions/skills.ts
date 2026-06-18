"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { skillSchema } from "@/lib/validations";

async function verifyAuth(supabase: any) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized access");
}

export async function createSkill(formData: FormData) {
  const supabase = await createClient();
  await verifyAuth(supabase);

  const rawData = {
    name: formData.get("name") as string,
    category: formData.get("category") as string,
  };
  const parsed = skillSchema.parse(rawData);

  await supabase.from("skills").insert({
    name: parsed.name,
    category: parsed.category,
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
  await verifyAuth(supabase);

  const rawData = {
    name: formData.get("name") as string,
    category: formData.get("category") as string,
  };
  const parsed = skillSchema.parse(rawData);

  await supabase.from("skills").update({
    name: parsed.name,
    category: parsed.category,
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
  await verifyAuth(supabase);
  
  await supabase.from("skills").delete().eq("id", id);
  revalidatePath("/admin/skills");
  revalidatePath("/skills");
  revalidatePath("/");
}

export async function updateSkillOrder(ids: string[]) {
  const supabase = await createClient();
  await verifyAuth(supabase);

  for (let i = 0; i < ids.length; i++) {
    await supabase.from("skills").update({ sort_order: i }).eq("id", ids[i]);
  }

  revalidatePath("/admin/skills");
  revalidatePath("/skills");
  revalidatePath("/");
}
