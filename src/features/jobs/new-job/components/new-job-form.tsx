"use client";

import { useForm } from "@mantine/form";
import {
  Button,
  NumberInput,
  Paper,
  Select,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useRouter } from "next-nprogress-bar";
import { validateSalary } from "@/features/jobs/shared/utils/validate-salary";
import { z } from "zod";
import { validatePaymentFrequency } from "@/features/jobs/shared/utils/validate-payment-frequency";
import { publishJob } from "../actions/publish-job";

export function NewJobForm() {
  const router = useRouter();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      title: "",
      description: "",
      salary: 0,
      paymentFrequency: "hourly",
      duration: "Undefined",
    },
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
    const result = await publishJob(values);

    if (result.success) {
      return router.push("/jobs");
    }

    form.setErrors({ form: result.error });
  }

  return (
    <Paper
      component="form"
      withBorder
      shadow="xs"
      p={30}
      mt={30}
      radius="md"
      onSubmit={form.onSubmit(submitHandler)}
    >
      {form.errors.form && (
        <Text mb="md" c="red">
          {form.errors.form}
        </Text>
      )}
      <TextInput
        label="Title"
        placeholder="Enter the title"
        withAsterisk
        key={form.key("title")}
        {...form.getInputProps("title")}
      />
      <Textarea
        rows={7}
        label="Description"
        placeholder="Enter the description"
        withAsterisk
        key={form.key("description")}
        mt="md"
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
        mt="md"
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
        mt="md"
        {...form.getInputProps("paymentFrequency")}
      />
      <TextInput
        label="Duration"
        placeholder="Enter the duration (e.g. 3 months)"
        withAsterisk
        key={form.key("duration")}
        mt="md"
        {...form.getInputProps("duration")}
      />
      <Button mt="xl" fullWidth type="submit">
        Publish Job
      </Button>
    </Paper>
  );
}
