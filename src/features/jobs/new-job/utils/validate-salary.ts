import { z } from "zod";

const salarySchema = z
  .number({
    message: "Salary must be a number",
  })
  .positive({
    message: "Salary must be a positive number",
  })
  .max(1000000, {
    message: "Salary must be less than $1,000,000",
  });

export function validateSalary(value: unknown) {
  const result = salarySchema.safeParse(value);

  if (result.success) {
    return null;
  }

  return result.error.issues[0].message;
}
