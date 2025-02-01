"use client";

import { Button } from "@mantine/core";
import { toggleJobApplication } from "./toggle-job-application.action";
import { useToggle } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next-nprogress-bar";
import { startTransition, useOptimistic } from "react";

export type ToggleJobApplicationButtonProps = {
  id: number;
  applied: boolean;
};

export function ToggleJobApplicationButton({
  id,
  applied,
}: ToggleJobApplicationButtonProps) {
  const [optimistic, addOptimisticMessage] = useOptimistic(
    applied,
    (_state, newMessage) => newMessage as boolean,
  );

  const [loading, toggleLoading] = useToggle();
  const router = useRouter();

  async function clickHandler() {
    toggleLoading(true);

    const result = await toggleJobApplication(id);
    startTransition(() => addOptimisticMessage(!optimistic));

    toggleLoading(false);

    if (result.success) {
      notifications.show({
        message: "Application updated",
      });
      return router.refresh();
    }

    notifications.show({
      message: result.error,
    });
  }

  return (
    <Button onClick={clickHandler} loading={loading}>
      {optimistic ? "Cancel Application" : "Apply"}
    </Button>
  );
}
