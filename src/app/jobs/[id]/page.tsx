import { getUserRole } from "@/features/auth/utils/get-user-role";
import { createClient } from "@/features/db/utils/server";
import { DeleteJobButton } from "@/features/jobs/delete-job-button/delete-job-button.component";
import { ToggleJobApplicationButton } from "@/features/jobs/toggle-job-aplication-button/toggle-job-aplication-button.component";
import {
  Anchor,
  Breadcrumbs,
  Button,
  Container,
  Group,
  Table,
  TableTbody,
  TableTd,
  TableTr,
  Text,
  Title,
} from "@mantine/core";
import NextLink from "next/link";
import { z } from "zod";

export type JobPageProps = {
  params: Promise<{ id: string }>;
};

export default async function JobPage({ params }: JobPageProps) {
  const { id: jobId } = await params;
  const id = Number(jobId);

  if (!z.number().int().positive().safeParse(id).success) {
    return "Invalid job ID";
  }

  const db = await createClient();

  const { data: job } = await db
    .from("jobs")
    .select(
      "title, description, status, salary, payment_frequency, duration, id, contractor_id",
    )
    .eq("id", jobId)
    .single();

  if (!job) return "Invalid job ID";

  const {
    data: { user },
  } = await db.auth.getUser();

  const userRole = await getUserRole(user?.id ?? null);

  const { data: application } = await db
    .from("applications")
    .select("id")
    .eq("job_id", id)
    .eq("worker_id", user?.id)
    .single();

  const breadcrumbs = [
    { title: "Jobs", href: "/jobs" },
    {
      title: job.title.length > 20 ? `${job.title.slice(0, 20)}...` : job.title,
      href: `/jobs/${id}`,
    },
  ];

  return (
    <>
      <Container fluid>
        <Breadcrumbs mb="lg">
          {breadcrumbs.map((item) => (
            <Anchor component={NextLink} href={item.href} key={item.title}>
              {item.title}
            </Anchor>
          ))}
        </Breadcrumbs>
        <Title mb="xl">{job.title}</Title>
        {job.description.split("\n").map((line: string, index: number) => (
          <Text mt="xs" key={index} c="dimmed">
            {line}
          </Text>
        ))}
        <Table mt="sm" verticalSpacing="xs">
          <TableTbody>
            <TableTr>
              <TableTd fz="md" px={0}>
                Status:
              </TableTd>
              <TableTd fz="md" px={0}>
                {job.status[0].toUpperCase()}
                {job.status.slice(1)}
              </TableTd>
            </TableTr>
            <TableTr>
              <TableTd fz="md" px={0}>
                Salary:
              </TableTd>
              <TableTd fz="md" px={0}>
                {job.salary}
              </TableTd>
            </TableTr>
            <TableTr>
              <TableTd fz="md" px={0}>
                Payment Frequency:
              </TableTd>
              <TableTd fz="md" px={0}>
                {job.payment_frequency}
              </TableTd>
            </TableTr>
            <TableTr>
              <TableTd fz="md" px={0}>
                Duration:
              </TableTd>
              <TableTd fz="md" px={0}>
                {job.duration}
              </TableTd>
            </TableTr>
          </TableTbody>
        </Table>
        <Anchor
          mt="md"
          ta="center"
          display="block"
          component={NextLink}
          href={`/users/${job.contractor_id}`}
        >
          Contractor Profile
        </Anchor>
        <Group mt="xl">
          {userRole === "worker" && (
            <ToggleJobApplicationButton
              id={id}
              applied={application !== null}
            />
          )}
          {userRole === "contractor" && job.contractor_id === user?.id && (
            <>
              <Button
                flex={1}
                variant="outline"
                component={NextLink}
                href={`/jobs/edit/${id}`}
              >
                Edit
              </Button>
              <DeleteJobButton id={id} />
            </>
          )}
        </Group>
      </Container>
    </>
  );
}
