"use client";

import { useForm } from "@mantine/form";
import {
  Button,
  NumberInput,
  Select,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useRouter } from "next-nprogress-bar";
import { validateSalary } from "@/features/jobs/shared/utils/validate-salary";
import { z } from "zod";
import { validatePaymentFrequency } from "@/features/jobs/shared/utils/validate-payment-frequency";
import { useToggle } from "@mantine/hooks";
import { updateJob } from "./update-job.action";
import { notifications } from "@mantine/notifications";

export type EditJobFormProps = {
  id: number;
  initialValues: {
    title: string;
    description: string;
    salary: number;
    paymentFrequency: string;
    duration: string;
  };
};

export function EditJobForm({ id, initialValues }: EditJobFormProps) {
  const router = useRouter();
  const [loading, toggleLoading] = useToggle();

  const form = useForm({
    mode: "uncontrolled",
    initialValues,
    validate: {
      title: (value) =>
        z.string().trim().min(1).safeParse(value).success
          ? null
          : "Title is required",
      description: (value) =>
        z.string().trim().min(1).safeParse(value).success
          ? null
          : "Description is required",
      salary: validateSalary,
      paymentFrequency: validatePaymentFrequency,
      duration: (value) =>
        z.string().trim().min(1).safeParse(value).success
          ? null
          : "Duration is required",
    },
  });

  async function submitHandler(values: typeof form.values) {
    toggleLoading(true);

    const result = await updateJob({
      ...values,
      id,
    });

    toggleLoading(false);

    if (result.success) {
      notifications.show({
        message: "Job updated",
      });
      return router.push(`/jobs/${id}`);
    }

    notifications.show({
      message: result.error,
    });
    form.setErrors({ form: result.error });
  }

  return (
    <form onSubmit={form.onSubmit(submitHandler)}>
      {form.errors.form && <Text c="red">{form.errors.form}</Text>}
      <TextInput
        label="Title"
        placeholder="Enter the title"
        withAsterisk
        key={form.key("title")}
        {...form.getInputProps("title")}
      />
      <Textarea
        rows={5}
        label="Description"
        placeholder="Enter the description"
        withAsterisk
        key={form.key("description")}
        {...form.getInputProps("description")}
      />
      <NumberInput
        label="Salary"
        placeholder="Enter the salary"
        withAsterisk
        prefix="$ "
        clampBehavior="strict"
        thousandSeparator=","
        allowNegative={false}
        decimalScale={2}
        fixedDecimalScale
        allowLeadingZeros={false}
        max={1000000}
        key={form.key("salary")}
        stepHoldDelay={500}
        stepHoldInterval={100}
        {...form.getInputProps("salary")}
      />
      <Select
        label="Payment Frequency"
        placeholder="Select payment frequency"
        withAsterisk
        data={[
          { value: "hourly", label: "Hourly" },
          { value: "daily", label: "Daily" },
          { value: "weekly", label: "Weekly" },
          { value: "monthly", label: "Monthly" },
        ]}
        key={form.key("paymentFrequency")}
        {...form.getInputProps("paymentFrequency")}
      />
      <TextInput
        label="Duration"
        placeholder="Enter the duration (e.g. 3 months)"
        withAsterisk
        key={form.key("duration")}
        {...form.getInputProps("duration")}
      />
      <Button loading={loading} type="submit">
        Update Job
      </Button>
    </form>
  );
}
