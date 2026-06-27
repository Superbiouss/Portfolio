"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { verifyAuth } from "@/lib/auth";

export async function updateProfile(formData: FormData) {
  const supabase = await createClient();
  const user = await verifyAuth(supabase);

  let finalResumeUrl = formData.get("resume_url") as string;
  const resumeFile = formData.get("resume_file") as File | null;

  if (resumeFile && resumeFile.size > 0) {
    const timestamp = new Date().getTime();
    const safeName = resumeFile.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const path = `resumes/${timestamp}-${safeName}`;
    
    const { error } = await supabase.storage.from("portfolio-images").upload(path, resumeFile, { upsert: true });
    
    if (!error) {
      const { data: publicUrlData } = supabase.storage.from("portfolio-images").getPublicUrl(path);
      finalResumeUrl = publicUrlData.publicUrl;
    }
  }

  // Profile data is typically trusted from the admin panel, but we enforce auth strictly now.
  await supabase.from("profiles").upsert({
    id: user.id,
    full_name: formData.get("full_name") as string,
    title: formData.get("title") as string,
    bio: formData.get("bio") as string,
    hero_tagline: formData.get("hero_tagline") as string,
    email: formData.get("email") as string,
    github_url: formData.get("github_url") as string,
    linkedin_url: formData.get("linkedin_url") as string,
    resume_url: finalResumeUrl,
    is_available: formData.get("is_available") === "on",
  });

  revalidatePath("/admin/profile");
}
