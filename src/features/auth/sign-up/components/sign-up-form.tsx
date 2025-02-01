"use client";

import { useForm } from "@mantine/form";
import { validateEmail } from "../../helpers/validate-email";
import { validatePassword } from "../../helpers/validate-password";
import {
  Button,
  Paper,
  PasswordInput,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
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
        label="Email"
        placeholder="Enter your email"
        withAsterisk
        {...form.getInputProps("email")}
      />
      <PasswordInput
        label="Password"
        placeholder="Enter your password"
        withAsterisk
        mt="md"
        {...form.getInputProps("password")}
      />
      <PasswordInput
        label="Password Confirmation"
        placeholder="Enter your password again"
        withAsterisk
        mt="md"
        {...form.getInputProps("passwordConfirmation")}
      />
      <Select
        label="Role"
        placeholder="Select your role"
        withAsterisk
        mt="md"
        data={[
          { value: "worker", label: "Worker" },
          { value: "contractor", label: "Contractor" },
        ]}
        {...form.getInputProps("role")}
      />
      <Button mt="xl" fullWidth type="submit">
        Sign Up
      </Button>
    </Paper>
  );
}
