import { Container, Text, Title } from "@mantine/core";
import { NewJobForm } from "@/features/jobs/new-job/components/new-job-form";

export default function NewJobPage() {
  return (
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
  );
}
