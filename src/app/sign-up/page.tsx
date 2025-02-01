import NextLink from "next/link";
import { Anchor, Container, Text, Title } from "@mantine/core";
import { SignUpForm } from "@/features/auth/sign-up/components/sign-up-form";

export default function SignUpPage() {
  return (
    <Container size={480} my={40}>
      <Title ta="center">
        Welcome to{" "}
        <Text span inherit c="blue">
          Chambitos!
        </Text>
      </Title>
      <Text ta="center" mt={3}>
        Sign up to start your journey with us
      </Text>
      <Text c="dimmed" size="sm" ta="center" mt={5} mb={30}>
        Already have an account?{" "}
        <Anchor component={NextLink} href="/sign-in" size="sm">
          Sign in
        </Anchor>
      </Text>
      <SignUpForm />
    </Container>
  );
}
