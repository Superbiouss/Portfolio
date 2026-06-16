"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateProfile(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  await supabase.from("profiles").upsert({
    id: user.id,
    full_name: formData.get("full_name") as string,
    title: formData.get("title") as string,
    bio: formData.get("bio") as string,
    hero_tagline: formData.get("hero_tagline") as string,
    email: formData.get("email") as string,
    github_url: formData.get("github_url") as string,
    linkedin_url: formData.get("linkedin_url") as string,
  });

  revalidatePath("/admin/profile");
}
