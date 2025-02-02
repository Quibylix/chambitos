import {
  Button,
  Container,
  Group,
  Paper,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";

export type CompleteDataFormStep1Fields = {
  firstName: string;
  lastName: string;
  role: string;
};

export type CompleteDataFormStep1Props<T extends CompleteDataFormStep1Fields> =
  {
    form: UseFormReturnType<T, (values: T) => T>;
    nextStep: () => void;
    prevStep: () => void;
  };

export function CompleteDataFormStep1<T extends CompleteDataFormStep1Fields>({
  form,
  nextStep,
  prevStep,
}: CompleteDataFormStep1Props<T>) {
  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    nextStep();
  }

  return (
    <Container size={480}>
      <Paper
        component="form"
        withBorder
        shadow="xs"
        p={30}
        mt={30}
        radius="md"
        onSubmit={submitHandler}
      >
        {form.errors.form && (
          <Text mb="md" c="red">
            {form.errors.form}
          </Text>
        )}
        <TextInput
          label="First name"
          placeholder="First name"
          withAsterisk
          key={form.key("firstName")}
          {...form.getInputProps("firstName")}
        />
        <TextInput
          label="Last name"
          placeholder="Last name"
          withAsterisk
          key={form.key("lastName")}
          mt="md"
          {...form.getInputProps("lastName")}
        />
        <Select
          label="Role"
          placeholder="Role"
          withAsterisk
          key={form.key("role")}
          data={[
            { value: "worker", label: "Worker" },
            { value: "contractor", label: "Contractor" },
          ]}
          mt="md"
          {...form.getInputProps("role")}
        />
        <Group mt="xl">
          <Button disabled flex={1} type="button" onClick={prevStep}>
            Previous
          </Button>
          <Button flex={1} type="submit">
            Next
          </Button>
        </Group>
      </Paper>
    </Container>
  );
}
