"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { contactSchema } from "@/lib/validations";
import { verifyAuth } from "@/lib/auth";
import { ZodError } from "zod";

export async function submitContactMessage(formData: FormData) {
  // Honeypot: reject bot submissions (hidden field _bot must be empty)
  if (formData.get("_bot")) {
    return { error: "Bot submission rejected." };
  }

  const rawData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    message: formData.get("message") as string,
  };

  try {
    const parsed = contactSchema.parse(rawData);
    const supabase = await createClient();
    const { error } = await supabase.from("contact_messages").insert({
      name: parsed.name,
      email: parsed.email,
      subject: (formData.get("subject") as string) || null,
      message: parsed.message,
    });
    if (error) return { error: "Failed to send message. Please try again." };
    return { success: true };
  } catch (err) {
    if (err instanceof ZodError) {
      return { error: err.errors[0]?.message ?? "Validation failed." };
    }
    return { error: "Something went wrong. Please try again." };
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
