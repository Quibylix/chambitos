"use client";

import { useForm } from "@mantine/form";
import { validateEmail } from "../../helpers/validate-email";
import { validatePassword } from "../../helpers/validate-password";
import { Button, Select, TextInput } from "@mantine/core";
import { validateRole } from "../../helpers/validate-role";

export function SignUpForm() {
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

  function submitHandler(value: typeof form.values) {
    console.log(value);
  }

  return (
    <form onSubmit={form.onSubmit(submitHandler)}>
      <TextInput
        label="Email"
        placeholder="Enter your email"
        withAsterisk
        {...form.getInputProps("email")}
      />
      <TextInput
        label="Password"
        placeholder="Enter your password"
        type="password"
        withAsterisk
        {...form.getInputProps("password")}
      />
      <TextInput
        label="Password Confirmation"
        placeholder="Enter your password again"
        type="password"
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
