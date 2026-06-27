import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Verifies that the current user is authenticated.
 * Throws an error if not — safe to call at the top of any Server Action.
 * Returns the authenticated user object.
 */
export async function verifyAuth(supabase: SupabaseClient) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized access");
  return user;
}
