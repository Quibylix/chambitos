"use server";

import { createClient } from "@/features/db/utils/server";

export async function signOut() {
  const db = await createClient();

  const { error } = await db.auth.signOut();

  if (error) {
    console.log(error);
    return { success: false, error: "Sign out failed" };
  }

  return { success: true };
}
