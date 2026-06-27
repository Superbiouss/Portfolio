"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { projectSchema } from "@/lib/validations";
import { verifyAuth } from "@/lib/auth";

export async function createProject(formData: FormData) {
  const supabase = await createClient();
  await verifyAuth(supabase);

  const rawData = {
    title: formData.get("title") as string,
    slug: formData.get("slug") as string,
    description: formData.get("description") as string,
    content: formData.get("content") as string,
    tech_stack: formData.get("tech_stack") as string,
    featured: formData.get("featured") === "on",
    status: (formData.get("status") as string) || "completed",
    github_url: formData.get("github_url") as string,
    live_url: formData.get("live_url") as string,
    role: formData.get("role") as string,
    timeline: formData.get("timeline") as string,
  };

  const parsed = projectSchema.parse(rawData);
  const tech_stack = parsed.tech_stack ? parsed.tech_stack.split(",").map((t) => t.trim()) : [];

  const thumbnailFile = formData.get("thumbnail") as File;
  let thumbnail_url = (formData.get("existing_thumbnail_url") as string) || "";
  
  if (thumbnailFile && thumbnailFile.size > 0) {
    const ext = thumbnailFile.name.split(".").pop();
    const path = `projects/${parsed.slug}.${ext}`;
    const { error: uploadError } = await supabase.storage.from("portfolio-images").upload(path, thumbnailFile, { upsert: true });
    if (!uploadError) {
      const { data: urlData } = supabase.storage.from("portfolio-images").getPublicUrl(path);
      thumbnail_url = urlData.publicUrl;
    }
  }

  await supabase.from("projects").insert({
    title: parsed.title,
    slug: parsed.slug,
    description: parsed.description,
    content: parsed.content,
    tech_stack,
    featured: parsed.featured,
    thumbnail_url,
    status: parsed.status,
    github_url: parsed.github_url,
    live_url: parsed.live_url,
    role: parsed.role,
    timeline: parsed.timeline,
  });

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath("/");
  redirect("/admin/projects");
}

export async function updateProject(id: string, formData: FormData) {
  const supabase = await createClient();
  await verifyAuth(supabase);

  const rawData = {
    title: formData.get("title") as string,
    slug: formData.get("slug") as string,
    description: formData.get("description") as string,
    content: formData.get("content") as string,
    tech_stack: formData.get("tech_stack") as string,
    featured: formData.get("featured") === "on",
    status: (formData.get("status") as string) || "completed",
    github_url: formData.get("github_url") as string,
    live_url: formData.get("live_url") as string,
    role: formData.get("role") as string,
    timeline: formData.get("timeline") as string,
  };

  const parsed = projectSchema.parse(rawData);
  const tech_stack = parsed.tech_stack ? parsed.tech_stack.split(",").map((t) => t.trim()) : [];

  const thumbnailFile = formData.get("thumbnail") as File;
  let thumbnail_url = (formData.get("existing_thumbnail_url") as string) || "";
  
  if (thumbnailFile && thumbnailFile.size > 0) {
    const ext = thumbnailFile.name.split(".").pop();
    const path = `projects/${parsed.slug}.${ext}`;
    await supabase.storage.from("portfolio-images").upload(path, thumbnailFile, { upsert: true });
    const { data: urlData } = supabase.storage.from("portfolio-images").getPublicUrl(path);
    thumbnail_url = urlData.publicUrl;
  }

  await supabase.from("projects").update({
    title: parsed.title,
    slug: parsed.slug,
    description: parsed.description,
    content: parsed.content,
    tech_stack,
    featured: parsed.featured,
    thumbnail_url,
    status: parsed.status,
    github_url: parsed.github_url,
    live_url: parsed.live_url,
    role: parsed.role,
    timeline: parsed.timeline,
    updated_at: new Date().toISOString(),
  }).eq("id", id);

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath(`/projects/${parsed.slug}`);
  revalidatePath("/");
  redirect("/admin/projects");
}

export async function deleteProject(id: string) {
  const supabase = await createClient();
  await verifyAuth(supabase);
  
  await supabase.from("projects").delete().eq("id", id);
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath("/");
}

export async function updateProjectOrder(ids: string[]) {
  const supabase = await createClient();
  await verifyAuth(supabase);

  for (let i = 0; i < ids.length; i++) {
    await supabase.from("projects").update({ sort_order: i }).eq("id", ids[i]);
  }

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath("/");
}
