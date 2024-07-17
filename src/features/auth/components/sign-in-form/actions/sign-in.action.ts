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
});

export default async function signIn(
  _prevState: unknown,
  formData: FormData,
): Promise<{
  errors?: {
    form?: string[];
    email?: string[];
    password?: string[];
  };
}> {
  const validateFields = schema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (validateFields.error) {
    return { errors: validateFields.error.formErrors.fieldErrors };
  }
  const db = getServerClient();

  const signInResponse = await db.auth.signInWithPassword({
    email: validateFields.data.email,
    password: validateFields.data.password,
  });

  if (signInResponse.error) {
    console.log(signInResponse.error.message);

    return {
      errors: {
        form: ["Ocurrió un error al iniciar sesión"],
      },
    };
  }

  redirect("/");
}
