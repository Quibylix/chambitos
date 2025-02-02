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
import { useToggle } from "@mantine/hooks";
import { completeData, UserData } from "../../actions/complete-data";
import { useRouter } from "next-nprogress-bar";

export type CompleteDataFormStep2Props = {
  form: UseFormReturnType<UserData, (values: UserData) => UserData>;
  prevStep: () => void;
};

export function CompleteDataFormStep2({
  form,
  prevStep,
}: CompleteDataFormStep2Props) {
  const [loading, toggleLoading] = useToggle();
  const router = useRouter();

  async function submitHandler(values: typeof form.values) {
    toggleLoading(true);

    const result = await completeData(values);

    toggleLoading(false);

    if (result.success) {
      return router.push("/dashboard");
    }

    form.setErrors({ form: result.error });
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
        onSubmit={form.onSubmit(submitHandler)}
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
          <Button loading={loading} flex={1} type="submit">
            Submit
          </Button>
        </Group>
      </Paper>
    </Container>
  );
}
