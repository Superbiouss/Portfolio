"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { contactSchema } from "@/lib/validations";

async function verifyAuth(supabase: any) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized access");
}

export async function submitContactMessage(formData: FormData) {
  const supabase = await createClient();
  
  const rawData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    message: formData.get("message") as string,
  };
  
  try {
    const parsed = contactSchema.parse(rawData);
    const { error } = await supabase.from("contact_messages").insert({
      name: parsed.name,
      email: parsed.email,
      subject: (formData.get("subject") as string) || null,
      message: parsed.message,
    });
    if (error) return { error: error.message };
    return { success: true };
  } catch (err: any) {
    return { error: "Validation failed" };
  }
}

export async function markMessageRead(id: string) {
  const supabase = await createClient();
  await verifyAuth(supabase);
  await supabase.from("contact_messages").update({ read: true }).eq("id", id);
  revalidatePath("/admin/messages");
}

export async function deleteMessage(id: string) {
  const supabase = await createClient();
  await verifyAuth(supabase);
  await supabase.from("contact_messages").delete().eq("id", id);
  revalidatePath("/admin/messages");
}
