import { Button, Text, Textarea, TextInput } from "@mantine/core";
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
    <form onSubmit={submitHandler}>
      {form.errors.form && <Text c="red">{form.errors.form}</Text>}
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
        {...form.getInputProps("description")}
      />
      <Button type="button" onClick={prevStep}>
        Previous
      </Button>
      <Button type="submit">Next</Button>
    </form>
  );
}
