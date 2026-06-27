"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { verifyAuth } from "@/lib/auth";

export async function uploadMedia(formData: FormData) {
  const supabase = await createClient();
  await verifyAuth(supabase);

  const file = formData.get("file") as File;
  if (!file || file.size === 0) return { error: "No file provided" };

  const timestamp = new Date().getTime();
  // Safe filename
  const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
  const path = `uploads/${timestamp}-${safeName}`;

  const { error } = await supabase.storage.from("portfolio-images").upload(path, file, { upsert: true });
  
  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/media");
  return { success: true };
}

export async function deleteMedia(path: string) {
  const supabase = await createClient();
  await verifyAuth(supabase);
  
  const { error } = await supabase.storage.from("portfolio-images").remove([path]);
  
  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/media");
  return { success: true };
}
