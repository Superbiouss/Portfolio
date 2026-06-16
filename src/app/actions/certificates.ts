"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createCertificate(formData: FormData) {
  const supabase = await createClient();
  const skillsStr = formData.get("skills_gained") as string;
  await supabase.from("certificates").insert({
    title: formData.get("title") as string,
    issuer: formData.get("issuer") as string,
    issue_date: (formData.get("issue_date") as string) || null,
    credential_id: formData.get("credential_id") as string,
    verification_url: formData.get("verification_url") as string,
    category: formData.get("category") as string,
    skills_gained: skillsStr ? skillsStr.split(",").map((s) => s.trim()) : [],
  });
  revalidatePath("/admin/certificates");
  revalidatePath("/certificates");
  revalidatePath("/");
  redirect("/admin/certificates");
}

export async function updateCertificate(id: string, formData: FormData) {
  const supabase = await createClient();
  const skillsStr = formData.get("skills_gained") as string;
  await supabase.from("certificates").update({
    title: formData.get("title") as string,
    issuer: formData.get("issuer") as string,
    issue_date: (formData.get("issue_date") as string) || null,
    credential_id: formData.get("credential_id") as string,
    verification_url: formData.get("verification_url") as string,
    category: formData.get("category") as string,
    skills_gained: skillsStr ? skillsStr.split(",").map((s) => s.trim()) : [],
    updated_at: new Date().toISOString(),
  }).eq("id", id);
  revalidatePath("/admin/certificates");
  revalidatePath("/certificates");
  revalidatePath("/");
  redirect("/admin/certificates");
}

export async function deleteCertificate(id: string) {
  const supabase = await createClient();
  await supabase.from("certificates").delete().eq("id", id);
  revalidatePath("/admin/certificates");
  revalidatePath("/certificates");
  revalidatePath("/");
}
