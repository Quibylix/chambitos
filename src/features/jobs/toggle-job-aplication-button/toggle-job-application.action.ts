"use server";

import { getUserRole } from "@/features/auth/utils/get-user-role";
import { createClient } from "@/features/db/utils/server";
import { z } from "zod";

export async function toggleJobApplication(jobId: number) {
  if (!z.number().int().positive().safeParse(jobId).success) {
    return { success: false, error: "Invalid job ID" };
  }

  const db = await createClient();

  const {
    data: { user },
  } = await db.auth.getUser();

  const userRole = await getUserRole(user?.id ?? null);

  if (userRole !== "worker") {
    return { success: false, error: "Only workers can apply to jobs" };
  }

  const { data: application } = await db
    .from("applications")
    .select("id")
    .eq("job_id", jobId)
    .eq("worker_id", user!.id)
    .single();

  if (!application) {
    await db.from("applications").insert({
      job_id: jobId,
      worker_id: user!.id,
      status: "applied",
    });

    return { success: true, message: "Application submitted" };
  }

  await db
    .from("applications")
    .delete()
    .eq("id", application.id)
    .eq("worker_id", user!.id);

  return { success: true, message: "Application cancelled" };
}
