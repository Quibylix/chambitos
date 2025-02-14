"use client";

import { Container, Stepper } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { validateRole } from "@/features/auth/helpers/validate-role";
import { CompleteDataFormStep1 } from "./complete-data-form-step-1";
import { CompleteDataFormStep2 } from "./complete-data-form-step-2";

export function CompleteDataForm() {
  const [active, setActive] = useState(0);

  const form = useForm({
    initialValues: {
      role: "worker",
      firstName: "",
      lastName: "",
      title: "",
      description: "",
    },
    validate: {
      firstName:
        active === 0
          ? (val) => (val.trim().length > 0 ? null : "First name is required")
          : undefined,
      lastName:
        active === 0
          ? (val) => (val.trim().length > 0 ? null : "Last name is required")
          : undefined,
      role: active === 0 ? validateRole : undefined,
      title:
        active === 1
          ? (val) => (val.trim().length > 0 ? null : "Title is required")
          : undefined,
    },
  });

  function nextStep() {
    if (form.validate().hasErrors) return;

    setActive((current) => Math.min(current + 1, 1));
  }

  function prevStep() {
    setActive((current) => Math.max(current - 1, 0));
  }

  return (
    <Container size="md" mt={20}>
      <Stepper active={active}>
        <Stepper.Step label="Step 1" description="Enter your personal data">
          <CompleteDataFormStep1 form={form} nextStep={nextStep} />
        </Stepper.Step>
        <Stepper.Step label="Step 2" description="Enter your professional data">
          <CompleteDataFormStep2 form={form} prevStep={prevStep} />
        </Stepper.Step>
      </Stepper>
    </Container>
  );
}
