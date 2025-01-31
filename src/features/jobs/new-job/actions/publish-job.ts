"use server";

import { getUserRole } from "@/features/auth/utils/get-user-role";
import { createClient } from "@/features/db/utils/server";

export type JobData = {
  title: string;
  description: string;
  salary: number;
  paymentFrequency: string;
  duration: string;
};

export async function publishJob({
  title,
  description,
  salary,
  paymentFrequency,
  duration,
}: JobData) {
  const db = await createClient();

  const {
    data: { user },
  } = await db.auth.getUser();

  const userRole = await getUserRole(user?.id ?? null);

  if (userRole !== "contractor") {
    return {
      success: false,
      error: "Only contractors can publish jobs",
    };
  }

  const result = await db.from("jobs").insert({
    title,
    description,
    salary,
    payment_frequency: paymentFrequency,
    duration,
    status: "open",
    contractor_id: user!.id,
  });

  if (result.error) {
    console.log(result.error);

    return {
      success: false,
      error: "Failed to publish job",
    };
  }

  return {
    success: true,
  };
}
