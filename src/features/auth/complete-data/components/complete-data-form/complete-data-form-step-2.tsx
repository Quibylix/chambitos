import {
  Button,
  Container,
  Group,
  Paper,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";

export type CompleteDataFormStep2Fields = {
  title: string;
  description: string;
};

export type CompleteDataFormStep2Props<T extends CompleteDataFormStep2Fields> =
  {
    form: UseFormReturnType<T, (values: T) => T>;
    submitHandler: () => void;
    prevStep: () => void;
  };

export function CompleteDataFormStep2<T extends CompleteDataFormStep2Fields>({
  form,
  submitHandler,
  prevStep,
}: CompleteDataFormStep2Props<T>) {
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
          label="Title"
          placeholder="Title"
          withAsterisk
          key={form.key("title")}
          {...form.getInputProps("title")}
        />
        <Textarea
          rows={5}
          label="Description (optional)"
          placeholder="Description"
          key={form.key("description")}
          mt="md"
          {...form.getInputProps("description")}
        />
        <Group mt="xl">
          <Button flex={1} type="button" onClick={prevStep}>
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
