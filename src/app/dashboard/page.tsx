import { createClient } from "@/features/db/utils/server";
import { Button, Container, Text, Title } from "@mantine/core";
import Link from "next/link";

export default async function DashboardPage() {
  const db = await createClient();

  const {
    data: { user },
  } = await db.auth.getUser();

  if (!user) return null;

  const { data } = await db
    .from("profiles")
    .select("first_name, last_name, role, title, description")
    .eq("id", user.id)
    .single();

  if (!data) return null;

  return (
    <Container ta="center" fluid>
      <Title>
        {data.first_name} {data.last_name}
      </Title>
      <Text mt="xs" fw="bold" c="dimmed">
        {data.title}
      </Text>
      <Text mt="md" c="dimmed">
        {data.description}
      </Text>
      <Text mt="md">
        Role:{" "}
        <Text fw="bold" span c="blue">
          {data.role}
        </Text>
      </Text>
      {data.role === "contractor" && (
        <Button mt="xl" component={Link} href="/jobs/new">
          Post a new job
        </Button>
      )}
    </Container>
  );
}
