"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProject(formData: FormData) {
  const supabase = await createClient();
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const content = formData.get("content") as string;
  const techStr = formData.get("tech_stack") as string;
  const tech_stack = techStr ? techStr.split(",").map((t) => t.trim()) : [];
  const featured = formData.get("featured") === "on";
  const thumbnailFile = formData.get("thumbnail") as File;

  let thumbnail_url = "";
  if (thumbnailFile && thumbnailFile.size > 0) {
    const ext = thumbnailFile.name.split(".").pop();
    const path = `projects/${slug}.${ext}`;
    const { error: uploadError } = await supabase.storage.from("portfolio-images").upload(path, thumbnailFile, { upsert: true });
    if (!uploadError) {
      const { data: urlData } = supabase.storage.from("portfolio-images").getPublicUrl(path);
      thumbnail_url = urlData.publicUrl;
    }
  }

  await supabase.from("projects").insert({
    title, slug, description, content, tech_stack, featured, thumbnail_url,
    category_id: category || null,
  });

  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function deleteProject(id: string) {
  const supabase = await createClient();
  await supabase.from("projects").delete().eq("id", id);
  revalidatePath("/admin/projects");
}
