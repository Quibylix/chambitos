import NextLink from "next/link";
import { Anchor, Breadcrumbs, Container, Text, Title } from "@mantine/core";
import { NewJobForm } from "@/features/jobs/new-job/components/new-job-form";

export default function NewJobPage() {
  const breadcrumbs = [
    { title: "Jobs", href: "/jobs" },
    { title: "New job", href: "/jobs/new" },
  ];

  return (
    <Container fluid>
      <Breadcrumbs mb="lg">
        {breadcrumbs.map((item) => (
          <Anchor component={NextLink} href={item.href} key={item.title}>
            {item.title}
          </Anchor>
        ))}
      </Breadcrumbs>
      <Container size={680} my={40}>
        <Title ta="center">
          Ready to find the{" "}
          <Text span inherit c="blue">
            perfect candidate?
          </Text>
        </Title>
        <Text ta="center" mt={3}>
          Fill out the form below in order to publish a new job
        </Text>
        <NewJobForm />
      </Container>
    </Container>
  );
}
