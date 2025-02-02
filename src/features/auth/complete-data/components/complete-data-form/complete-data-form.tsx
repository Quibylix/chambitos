"use client";

import { Stepper } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { validateRole } from "@/features/auth/helpers/validate-role";
import { CompleteDataFormStep1 } from "./complete-data-form-step-1";
import { CompleteDataFormStep2 } from "./complete-data-form-step-2";
import { completeData } from "../../actions/complete-data";
import { useRouter } from "next-nprogress-bar";

export function CompleteDataForm() {
  const [active, setActive] = useState(0);

  const router = useRouter();

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

  async function submitHandler(values: typeof form.values) {
    const result = await completeData(values);

    if (result.success) {
      return router.push("/dashboard");
    }

    form.setErrors({ form: result.error });
  }

  return (
    <Stepper active={active}>
      <Stepper.Step label="Step 1" description="Enter your personal data">
        <CompleteDataFormStep1
          form={form}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      </Stepper.Step>
      <Stepper.Step label="Step 2" description="Enter your professional data">
        <CompleteDataFormStep2
          form={form}
          submitHandler={form.onSubmit(submitHandler)}
          prevStep={prevStep}
        />
      </Stepper.Step>
    </Stepper>
  );
}
