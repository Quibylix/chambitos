import { SignInForm } from "@/features/auth/sign-in/components/sign-in-form";
import { Anchor, Container, Text, Title } from "@mantine/core";
import NextLink from "next/link";

export default function SignInPage() {
  return (
    <Container size={480} my={40}>
      <Title ta="center">Welcome back!</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5} mb={30}>
        Do not have an account yet?{" "}
        <Anchor component={NextLink} href="/sign-up" size="sm">
          Create account
        </Anchor>
      </Text>
      <SignInForm />
    </Container>
  );
}
