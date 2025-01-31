import { z } from "zod";

const frequencySchema = z
  .string({
    message:
      "Payment frequency must be hourly, daily, weekly, monthly, or annually",
  })
  .regex(/^(hourly|daily|weekly|monthly)$/, {
    message:
      "Payment frequency must be hourly, daily, weekly, monthly, or annually",
  });
export function validatePaymentFrequency(value: unknown) {
  const result = frequencySchema.safeParse(value);

  if (result.success) {
    return null;
  }

  return result.error.issues[0].message;
}
