"use client";

import { useForm } from "@mantine/form";
import { validateEmail } from "../../helpers/validate-email";
import { validatePassword } from "../../helpers/validate-password";
import { Button, PasswordInput, Select, Text, TextInput } from "@mantine/core";
import { validateRole } from "../../helpers/validate-role";
import { signUp } from "../actions/sign-up";
import { useRouter } from "next/navigation";

export function SignUpForm() {
  const router = useRouter();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
      role: "worker",
    },
    validate: {
      email: validateEmail,
      password: validatePassword,
      passwordConfirmation: (value, values) => {
        if (value !== values.password) {
          return "Passwords do not match";
        }
      },
      role: validateRole,
    },
  });

  async function submitHandler(values: typeof form.values) {
    const result = await signUp(values);

    if (result.success) {
      return router.push("/confirm-email");
    }

    form.setErrors({ form: result.error });
  }

  return (
    <form onSubmit={form.onSubmit(submitHandler)}>
      {form.errors.form && <Text c="red">{form.errors.form}</Text>}
      <TextInput
        label="Email"
        placeholder="Enter your email"
        withAsterisk
        {...form.getInputProps("email")}
      />
      <PasswordInput
        label="Password"
        placeholder="Enter your password"
        withAsterisk
        {...form.getInputProps("password")}
      />
      <PasswordInput
        label="Password Confirmation"
        placeholder="Enter your password again"
        withAsterisk
        {...form.getInputProps("passwordConfirmation")}
      />
      <Select
        label="Role"
        placeholder="Select your role"
        withAsterisk
        data={[
          { value: "worker", label: "Worker" },
          { value: "contractor", label: "Contractor" },
        ]}
        {...form.getInputProps("role")}
      />
      <Button type="submit">Sign Up</Button>
    </form>
  );
}
