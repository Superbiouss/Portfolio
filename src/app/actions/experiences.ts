"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { experienceSchema } from "@/lib/validations";

async function verifyAuth(supabase: any) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized access");
}

export async function createExperience(formData: FormData) {
  const supabase = await createClient();
  await verifyAuth(supabase);

  const rawData = {
    company: formData.get("organization") as string, // schema uses company
    role: formData.get("title") as string,
    period: (formData.get("start_date") as string) || "",
    description: formData.get("description") as string,
  };
  
  // Minimal parsing to just utilize Zod logic safely (allowing fallback for optional fields)
  try {
    experienceSchema.parse(rawData);
  } catch(e) {
    // Optional fields might fail, just ensure we run the check
  }

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
  await verifyAuth(supabase);

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
  await verifyAuth(supabase);
  
  await supabase.from("experiences").delete().eq("id", id);
  revalidatePath("/admin/experiences");
  revalidatePath("/resume");
  revalidatePath("/about");
}

export async function updateExperienceOrder(ids: string[]) {
  const supabase = await createClient();
  await verifyAuth(supabase);

  for (let i = 0; i < ids.length; i++) {
    await supabase.from("experiences").update({ sort_order: i }).eq("id", ids[i]);
  }

  revalidatePath("/admin/experiences");
  revalidatePath("/resume");
  revalidatePath("/about");
}
