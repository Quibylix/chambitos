"use client";

import { Button } from "@mantine/core";
import { signOut } from "./sign-out.action";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next-nprogress-bar";
import { useToggle } from "@mantine/hooks";

export function SignOutButton() {
  const [loading, toggleLoading] = useToggle();
  const router = useRouter();

  async function clickHandler() {
    toggleLoading(true);

    const result = await signOut();

    toggleLoading(false);

    if (result.error) {
      notifications.show({
        message: result.error,
        color: "red",
      });
      return;
    }

    notifications.show({
      message: "You have been signed out.",
      color: "red",
    });
    router.push("/sign-in");
  }

  return (
    <Button
      variant="subtle"
      justify="left"
      fw="normal"
      px="sm"
      color="red"
      onClick={clickHandler}
      loading={loading}
    >
      Sign Out
    </Button>
  );
}
