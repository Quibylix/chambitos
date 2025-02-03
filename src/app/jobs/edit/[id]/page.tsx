import { getUserRole } from "@/features/auth/utils/get-user-role";
import { createClient } from "@/features/db/utils/server";
import { EditJobForm } from "@/features/jobs/edit-job-form/edit-job-form.component";
import { Anchor, Breadcrumbs, Container, Text, Title } from "@mantine/core";
import NextLink from "next/link";
import { z } from "zod";

export type EditJobPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditJobPage({ params }: EditJobPageProps) {
  const { id: jobId } = await params;
  const id = Number(jobId);

  if (!z.number().int().positive().safeParse(id).success) {
    return "Invalid job ID";
  }

  const db = await createClient();

  const {
    data: { user },
  } = await db.auth.getUser();

  const userRole = await getUserRole(user?.id ?? null);

  if (userRole !== "contractor") {
    return "Only contractors can update jobs";
  }

  const { data: job } = await db
    .from("jobs")
    .select(
      "title, description, status, salary, payment_frequency, duration, id, contractor_id",
    )
    .eq("id", id)
    .eq("contractor_id", user!.id)
    .single();

  if (!job) return "Invalid job ID";

  const breadcrumbs = [
    { title: "Jobs", href: "/jobs" },
    {
      title: job.title.length > 20 ? `${job.title.slice(0, 20)}...` : job.title,
      href: `/jobs/${id}`,
    },
    { title: "Edit job", href: `/jobs/edit/${id}` },
  ];

  return (
    <Container fluid>
      <Breadcrumbs mb="md">
        {breadcrumbs.map((item) => (
          <Anchor component={NextLink} href={item.href} key={item.title}>
            {item.title}
          </Anchor>
        ))}
      </Breadcrumbs>
      <Container size={680} my={40}>
        <Title ta="center">
          <Text span inherit c="blue">
            Update
          </Text>{" "}
          the job
        </Title>
        <Text ta="center" mt={3}>
          Update the form below in order to update the job
        </Text>
        <EditJobForm
          id={id}
          initialValues={{
            ...job,
            paymentFrequency: job.payment_frequency,
          }}
        />
      </Container>
    </Container>
  );
}
