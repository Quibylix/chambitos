"use client";

import { Button, Checkbox, Input } from "@nextui-org/react";
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import signUp from "./actions/sign-up.action";

export default function SignUpForm() {
  const [acceptTerms, setAcceptTerms] = useState("off");

  const { pending } = useFormStatus();
  const [state, formAction] = useFormState(signUp, {});

  function handleAcceptTermsChange() {
    setAcceptTerms(prev => (prev === "on" ? "off" : "on"));
  }

  return (
    <form action={formAction} className="space-y-4 md:space-y-6">
      {state.errors?.form?.map((error, index) => (
        <div
          key={index}
          className="flex items-center gap-2 p-4 mb-4 text-sm text-danger-800 rounded-lg bg-danger-50 border border-danger-200"
          role="alert"
        >
          <svg
            fill="currentColor"
            height="1em"
            width="1em"
            viewBox="0 0 310.806 310.806"
          >
            <path d="M305.095,229.104L186.055,42.579c-6.713-10.52-18.172-16.801-30.652-16.801c-12.481,0-23.94,6.281-30.651,16.801 L5.711,229.103c-7.145,11.197-7.619,25.39-1.233,37.042c6.386,11.647,18.604,18.883,31.886,18.883h238.079 c13.282,0,25.5-7.235,31.888-18.886C312.714,254.493,312.24,240.301,305.095,229.104z M155.403,253.631 c-10.947,0-19.82-8.874-19.82-19.82c0-10.947,8.874-19.821,19.82-19.821c10.947,0,19.82,8.874,19.82,19.821 C175.223,244.757,166.349,253.631,155.403,253.631z M182.875,115.9l-9.762,65.727c-1.437,9.675-10.445,16.353-20.119,14.916 c-7.816-1.161-13.676-7.289-14.881-14.692l-10.601-65.597c-2.468-15.273,7.912-29.655,23.185-32.123 c15.273-2.468,29.655,7.912,32.123,23.185C183.284,110.192,183.268,113.161,182.875,115.9z"></path>{" "}
          </svg>
          <span className="font-medium">{error}</span>
        </div>
      ))}

      <Input
        label="Email"
        type="email"
        name="email"
        placeholder="usuario@gmail.com"
        errorMessage={state.errors?.email?.[0]}
        required
      />
      <Input
        label="Contraseña"
        type="password"
        name="password"
        placeholder="••••••••"
        errorMessage={state.errors?.password?.[0]}
        required
      />
      <Input
        label="Confirmar contraseña"
        type="password"
        name="confirm-password"
        placeholder="••••••••"
        errorMessage={state.errors?.confirmPassword?.[0]}
        required
      />
      <div>
        <div className="flex items-center h-5">
          <Checkbox
            name="accept-terms"
            required
            value={acceptTerms}
            onChange={handleAcceptTermsChange}
          >
            <div className="text-sm">
              Acepto los{" "}
              <a
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                href="/terms-and-conditions"
              >
                Términos y Condiciones
              </a>
            </div>
          </Checkbox>
        </div>
        {state.errors?.acceptTerms?.[0] && (
          <p className="text-xs text-danger-500 mt-1">
            {state.errors.acceptTerms?.[0]}
          </p>
        )}
      </div>
      <Button
        type="submit"
        color="primary"
        fullWidth
        disabled={pending}
        isLoading={pending}
      >
        Crear cuenta
      </Button>
      <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
        Ya tienes una cuenta?{" "}
        <a
          href="/auth/sign-in"
          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
        >
          Inicia sesión aquí
        </a>
      </p>
    </form>
  );
}
