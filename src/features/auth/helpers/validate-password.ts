import { z } from "zod";

export const passwordSchema = z
  .string({ message: "Password is required" })
  .min(8, {
    message: "Password is too short",
  })
  .max(100, { message: "Password is too long" })
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message:
      "Password must contain at least one uppercase letter, one lowercase letter, and one number",
  });

export function validatePassword(value: string) {
  const result = passwordSchema.safeParse(value);

  if (result.success) {
    return null;
  }

  return result.error.issues[0].message;
}
