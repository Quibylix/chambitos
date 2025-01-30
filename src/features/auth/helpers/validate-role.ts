import { z } from "zod";

const roleSchema = z
  .string({ message: "Role is required" })
  .regex(/^(worker|contractor)$/, {
    message: "Role must be either 'worker' or 'contractor'",
  });

export function validateRole(value: string) {
  const result = roleSchema.safeParse(value);

  if (result.success) {
    return null;
  }

  return result.error.issues[0].message;
}
