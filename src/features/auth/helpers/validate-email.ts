import { z } from "zod";

const emailSchema = z
  .string({ message: "Email is required" })
  .email({ message: "Invalid email" });

export function validateEmail(value: string) {
  const result = emailSchema.safeParse(value);

  if (result.success) {
    return null;
  }

  return result.error.issues[0].message;
}
