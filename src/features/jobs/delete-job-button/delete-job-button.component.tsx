"use client";

import { useRouter } from "next-nprogress-bar";
import { deleteJob } from "./delete-job.action";
import { Button, Modal } from "@mantine/core";
import { useDisclosure, useToggle } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";

type DeleteJobButtonProps = {
  id: number;
};

export function DeleteJobButton({ id }: DeleteJobButtonProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const [loading, toggleLoading] = useToggle();

  const router = useRouter();

  async function clickHandler() {
    toggleLoading();

    const { success, error } = await deleteJob(id);

    toggleLoading();
    close();

    if (success) {
      notifications.show({ message: "Job deleted" });
      return router.push("/jobs");
    }

    notifications.show({ message: error });
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title="Delete job" centered>
        Are you sure you want to delete this job?
        <Button bg="red" loading={loading} onClick={clickHandler}>
          Delete
        </Button>
      </Modal>
      <Button flex={1} bg="red" onClick={open}>
        Delete Job
      </Button>
    </>
  );
}
