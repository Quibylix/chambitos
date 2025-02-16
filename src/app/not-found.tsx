import { Button, Container, Group, Text, Title } from "@mantine/core";
import NextLink from "next/link";
import styles from "./not-found.module.css";

export default function NotFoundPage() {
  return (
    <Container fluid>
      <div className={styles.number}>404</div>
      <Title ta="center" mb="sm">
        You have found a secret place.
      </Title>
      <Text c="dimmed" size="lg" ta="center">
        Unfortunately, this is only a 404 page. You may have mistyped the
        address, or the page has been moved to another URL.
      </Text>
      <Group mt="md" justify="center">
        <Button component={NextLink} href="/" variant="subtle" size="md">
          Take me back to home page
        </Button>
      </Group>
    </Container>
  );
}
