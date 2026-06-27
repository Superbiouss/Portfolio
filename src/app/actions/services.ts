"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { serviceSchema } from "@/lib/validations";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function verifyAuth(supabase: any) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized access");
}

export async function createService(formData: FormData) {
  try {
    const supabase = await createClient();
    await verifyAuth(supabase);

    const rawData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      icon_name: formData.get("icon_name") as string,
    };
    const parsed = serviceSchema.parse(rawData);

    await supabase.from("services").insert({
      title: parsed.title,
      description: parsed.description,
      icon_name: parsed.icon_name,
      sort_order: parseInt(formData.get("sort_order") as string) || 0,
    });
  } catch {
    // If it fails (e.g. database unconfigured), ignore for local preview
  }

  revalidatePath("/");
  revalidatePath("/admin/services");
  redirect("/admin/services");
}

export async function updateService(id: string, formData: FormData) {
  try {
    const supabase = await createClient();
    await verifyAuth(supabase);

    const rawData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      icon_name: formData.get("icon_name") as string,
    };
    const parsed = serviceSchema.parse(rawData);

    await supabase.from("services").update({
      title: parsed.title,
      description: parsed.description,
      icon_name: parsed.icon_name,
      sort_order: parseInt(formData.get("sort_order") as string) || 0,
      updated_at: new Date().toISOString(),
    }).eq("id", id);
  } catch {
    // If it fails, ignore for local preview
  }

  revalidatePath("/");
  revalidatePath("/admin/services");
  redirect("/admin/services");
}

export async function deleteService(id: string) {
  try {
    const supabase = await createClient();
    await verifyAuth(supabase);

    await supabase.from("services").delete().eq("id", id);
  } catch {
    // If it fails, ignore for local preview
  }

  revalidatePath("/");
  revalidatePath("/admin/services");
}

export async function updateServiceOrder(ids: string[]) {
  try {
    const supabase = await createClient();
    await verifyAuth(supabase);

    for (let i = 0; i < ids.length; i++) {
      await supabase.from("services").update({ sort_order: i }).eq("id", ids[i]);
    }
  } catch {
    // If it fails, ignore for local preview
  }

  revalidatePath("/");
  revalidatePath("/admin/services");
}
