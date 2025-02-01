"use server";

import { getUserRole } from "@/features/auth/utils/get-user-role";
import { createClient } from "@/features/db/utils/server";

export async function deleteJob(id: number) {
  const db = await createClient();

  const {
    data: { user },
  } = await db.auth.getUser();

  const userRole = await getUserRole(user?.id ?? null);

  if (userRole !== "contractor") {
    return {
      success: false,
      error: "Only contractors can delete jobs",
    };
  }

  const result = await db
    .from("jobs")
    .delete()
    .eq("contractor_id", user!.id)
    .eq("id", id);

  if (result.error) {
    console.log(result.error);

    return {
      success: false,
      error: "Failed to delete job",
    };
  }

  return {
    success: true,
  };
}
