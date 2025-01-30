"use server";

import { createClient } from "@/features/db/utils/server";
import { validatePassword } from "../../helpers/validate-password";
import { validateEmail } from "../../helpers/validate-email";

export type SignInData = {
  email: string;
  password: string;
};

export async function signIn({ email, password }: SignInData) {
  const db = await createClient();

  const errors = [validateEmail(email), validatePassword(password)].filter(
    Boolean,
  );

  if (errors.length) {
    return {
      success: false,
      error: errors.join(", "),
    };
  }

  const { error } = await db.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.log(error);

    return {
      success: false,
      error: "An error occurred while signing in. Please try again later.",
    };
  }

  return { success: true };
}
