"use client";

import { useForm } from "@mantine/form";
import { validateEmail } from "../../helpers/validate-email";
import { validatePassword } from "../../helpers/validate-password";
import { Button, PasswordInput, Text, TextInput } from "@mantine/core";
import { useRouter } from "next/navigation";
import { signIn } from "../actions/sign-in";

export function SignInForm() {
  const router = useRouter();

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
    const result = await signIn(value);

    if (result.success) {
      return router.push("/dashboard");
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
      <Button type="submit">Sign In</Button>
    </form>
  );
}
