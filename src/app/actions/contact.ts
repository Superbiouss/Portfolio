"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function submitContactMessage(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("contact_messages").insert({
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    subject: (formData.get("subject") as string) || null,
    message: formData.get("message") as string,
  });
  if (error) return { error: error.message };
  return { success: true };
}

export async function markMessageRead(id: string) {
  const supabase = await createClient();
  await supabase.from("contact_messages").update({ read: true }).eq("id", id);
  revalidatePath("/admin/messages");
}

export async function deleteMessage(id: string) {
  const supabase = await createClient();
  await supabase.from("contact_messages").delete().eq("id", id);
  revalidatePath("/admin/messages");
}
