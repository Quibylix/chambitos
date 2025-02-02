"use client";

import { useForm } from "@mantine/form";
import { validateEmail } from "../../helpers/validate-email";
import { validatePassword } from "../../helpers/validate-password";
import { Paper, Button, PasswordInput, Text, TextInput } from "@mantine/core";
import { useRouter } from "next/navigation";
import { signIn } from "../actions/sign-in";
import { useToggle } from "@mantine/hooks";

export function SignInForm() {
  const router = useRouter();
  const [loading, toggleLoading] = useToggle();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: validateEmail,
      password: validatePassword,
    },
  });

  async function submitHandler(value: typeof form.values) {
    toggleLoading(true);

    const result = await signIn(value);

    toggleLoading(false);

    if (result.success) {
      return router.push("/dashboard");
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
      <Button loading={loading} mt="xl" fullWidth type="submit">
        Sign In
      </Button>
    </Paper>
  );
}
