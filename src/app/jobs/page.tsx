import { createClient } from "@/features/db/utils/server";
import {
  Anchor,
  Badge,
  Breadcrumbs,
  Container,
  Group,
  List,
  ListItem,
  Paper,
  Text,
  Title,
} from "@mantine/core";
import NextLink from "next/link";
import styles from "./page.module.css";

export default async function Jobs() {
  const db = await createClient();

  const { data } = await db
    .from("jobs")
    .select(
      "title, description, status, salary, payment_frequency, duration, id",
    )
    .eq("status", "open")
    .limit(20);

  if (!data) return null;

  const breadcrumbs = [{ title: "Jobs", href: "/jobs" }];

  return (
    <Container fluid>
      <Breadcrumbs mb="lg">
        {breadcrumbs.map((item) => (
          <Anchor component={NextLink} href={item.href} key={item.title}>
            {item.title}
          </Anchor>
        ))}
      </Breadcrumbs>
      <Title mb="xl">Jobs</Title>
      <List spacing="md" listStyleType="none">
        {data.map((job) => (
          <ListItem
            styles={{
              itemWrapper: { width: "100%" },
              itemLabel: { width: "100%" },
            }}
            key={job.id}
          >
            <Paper
              component={NextLink}
              className={styles.job}
              href={`/jobs/${job.id}`}
              c="default"
              withBorder
              w="100%"
              p="md"
              radius="md"
            >
              <Badge bg="green">{job.status}</Badge>
              <Title mt="xs" size="xl" order={2}>
                {job.title}
              </Title>
              <Text mt={3} size="sm" lineClamp={2} c="dimmed">
                {job.description}
              </Text>
              <Text mt="xs" size="sm">
                Salary: ${(job.salary as number).toFixed(2)} /{" "}
                {job.payment_frequency}
              </Text>
              <Group mt="xs">
                <Badge>
                  ${(job.salary as number).toFixed(2)} / {job.payment_frequency}
                </Badge>
                <Badge bg="dimmed">Duration: {job.duration}</Badge>
              </Group>
            </Paper>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
