import { Button, Select, Text, TextInput } from "@mantine/core";
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
    <form onSubmit={submitHandler}>
      {form.errors.form && <Text c="red">{form.errors.form}</Text>}
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
        {...form.getInputProps("role")}
      />
      <Button type="button" onClick={prevStep}>
        Previous
      </Button>
      <Button type="submit">Next</Button>
    </form>
  );
}
