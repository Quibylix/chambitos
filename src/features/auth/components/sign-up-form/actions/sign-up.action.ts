"use server";

import { z } from "zod";

import getServerClient from "@/features/db/utils/supabase/server";
import { redirect } from "next/navigation";

const schema = z.object({
  email: z
    .string({
      invalid_type_error: "El email es inválido",
    })
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+/, {
      message: "El email es inválido",
    }),
  password: z
    .string({
      invalid_type_error: "La contraseña es inválida",
    })
    .min(6, {
      message: "Se requiere una contraseña de al menos 6 caracteres",
    }),
  confirmPassword: z.string({
    invalid_type_error: "Su confirmación de contraseña es inválida",
  }),
  acceptTerms: z.literal("on", {
    errorMap: () => ({ message: "Debes aceptar los términos y condiciones" }),
  }),
});

export default async function signUp(
  _prevState: unknown,
  formData: FormData,
): Promise<{
  errors?: {
    form?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
    acceptTerms?: string[];
  };
}> {
  const validateFields = schema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirm-password"),
    acceptTerms: formData.get("accept-terms"),
  });

  if (validateFields.error) {
    return { errors: validateFields.error.formErrors.fieldErrors };
  }

  if (
    !validateFields.data ||
    validateFields.data.password !== validateFields.data.confirmPassword
  ) {
    return {
      errors: {
        confirmPassword: ["Las contraseñas no coinciden"],
      },
    };
  }

  const db = getServerClient();

  const signUpResponse = await db.auth.signUp({
    email: validateFields.data.email,
    password: validateFields.data.password,
  });

  if (signUpResponse.error) {
    console.log(signUpResponse.error.message);

    return {
      errors: {
        form: ["Ocurrió un error al crear la cuenta"],
      },
    };
  }

  redirect("/auth/sign-up/success");
}
