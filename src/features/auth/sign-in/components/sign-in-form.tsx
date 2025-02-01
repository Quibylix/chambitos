"use client";

import {
  Anchor,
  Checkbox,
  Container,
  Group,
  Paper,
  Title,
} from "@mantine/core";
//  import classes from "./AuthenticationTitle.module.css";

export function AuthenticationTitle() {
  return (
    <Container size={420} my={40}>
      <Title ta="center">Welcome back!</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{" "}
        <Anchor size="sm" component="button">
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="Email" placeholder="you@mantine.dev" required />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
        />
        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor component="button" size="sm">
            Forgot password?
          </Anchor>
        </Group>
        <Button fullWidth mt="xl">
          Sign in
        </Button>
      </Paper>
    </Container>
  );
}

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
      <Button mt="xl" fullWidth type="submit">
        Sign In
      </Button>
    </Paper>
  );
}
