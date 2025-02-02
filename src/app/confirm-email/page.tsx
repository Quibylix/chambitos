import { Container, Flex, Image, Stack, Text, Title } from "@mantine/core";
import NextImage from "next/image";
import mailSent from "@/assets/mail-sent.png";

export default function ConfirmEmailPage() {
  return (
    <Container size="md" p="md">
      <Flex justify="center" wrap="wrap">
        <Stack
          miw={250}
          maw={300}
          gap="lg"
          align="center"
          justify="center"
          ta="center"
        >
          <Title>
            Confirm{" "}
            <Text inherit span c="blue">
              Your Email
            </Text>{" "}
            Address
          </Title>
          <Text size="lg">Thank you for signing up!</Text>
          <Text size="lg" c="dimmed">
            We have sent you a confirmation email. Please check your inbox and
            follow the instructions to complete the registration.
          </Text>
        </Stack>
        <Image
          component={NextImage}
          src={mailSent.src}
          alt="Email"
          maw="100%"
          h="auto"
          w={400}
          width={mailSent.width}
          height={mailSent.height}
        />
      </Flex>
    </Container>
  );
}
