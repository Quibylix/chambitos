"use client";

import { NextUIProvider as BaseNextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export type NextUIProviderProps = {
  children: React.ReactNode;
};

export default function NextUIProvider({ children }: NextUIProviderProps) {
  const router = useRouter();

  return (
    <BaseNextUIProvider navigate={router.push}>{children}</BaseNextUIProvider>
  );
}
