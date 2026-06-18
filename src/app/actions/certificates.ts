"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { certificateSchema } from "@/lib/validations";

async function verifyAuth(supabase: any) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized access");
}

export async function createCertificate(formData: FormData) {
  const supabase = await createClient();
  await verifyAuth(supabase);

  const rawData = {
    title: formData.get("title") as string,
    issuer: formData.get("issuer") as string,
    category: formData.get("category") as string,
    credentialId: formData.get("credential_id") as string,
    verifyUrl: formData.get("verification_url") as string,
  };
  const parsed = certificateSchema.parse(rawData);
  const skillsStr = formData.get("skills_gained") as string;
  
  await supabase.from("certificates").insert({
    title: parsed.title,
    issuer: parsed.issuer,
    issue_date: (formData.get("issue_date") as string) || null,
    credential_id: parsed.credentialId,
    verification_url: parsed.verifyUrl,
    category: parsed.category,
    skills_gained: skillsStr ? skillsStr.split(",").map((s) => s.trim()) : [],
  });
  revalidatePath("/admin/certificates");
  revalidatePath("/certificates");
  revalidatePath("/");
  redirect("/admin/certificates");
}

export async function updateCertificate(id: string, formData: FormData) {
  const supabase = await createClient();
  await verifyAuth(supabase);

  const rawData = {
    title: formData.get("title") as string,
    issuer: formData.get("issuer") as string,
    category: formData.get("category") as string,
    credentialId: formData.get("credential_id") as string,
    verifyUrl: formData.get("verification_url") as string,
  };
  const parsed = certificateSchema.parse(rawData);
  const skillsStr = formData.get("skills_gained") as string;

  await supabase.from("certificates").update({
    title: parsed.title,
    issuer: parsed.issuer,
    issue_date: (formData.get("issue_date") as string) || null,
    credential_id: parsed.credentialId,
    verification_url: parsed.verifyUrl,
    category: parsed.category,
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
  await verifyAuth(supabase);
  
  await supabase.from("certificates").delete().eq("id", id);
  revalidatePath("/admin/certificates");
  revalidatePath("/certificates");
  revalidatePath("/");
}

export async function updateCertificateOrder(ids: string[]) {
  const supabase = await createClient();
  await verifyAuth(supabase);

  for (let i = 0; i < ids.length; i++) {
    await supabase.from("certificates").update({ sort_order: i }).eq("id", ids[i]);
  }

  revalidatePath("/admin/certificates");
  revalidatePath("/certificates");
  revalidatePath("/");
}
