"use server";

import { createClient } from "@/features/db/utils/server";
import { validateRole } from "../../helpers/validate-role";

export type UserData = {
  role: string;
  firstName: string;
  lastName: string;
  title: string;
  description: string;
};

export async function completeData({
  role,
  firstName,
  lastName,
  title,
  description,
}: UserData) {
  const errors = [
    validateRole(role),
    firstName.trim().length > 0 ? null : "First name is required",
    lastName.trim().length > 0 ? null : "Last name is required",
    title.trim().length > 0 ? null : "Title is required",
  ].filter(Boolean);

  if (errors.length > 0) {
    return { success: false, error: errors.join(", ") };
  }

  const db = await createClient();

  const {
    data: { user },
  } = await db.auth.getUser();

  if (!user) {
    return { success: false, error: "User not found" };
  }

  const { error } = await db
    .from("profiles")
    .update({
      role,
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      title: title.trim(),
      description: description.trim(),
      status: "active",
    })
    .eq("id", user.id);

  if (error) {
    console.log(error);

    return { success: false, error: "Failed to update user data" };
  }

  return { success: true };
}
