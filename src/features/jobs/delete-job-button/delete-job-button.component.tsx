"use client";

import { useRouter } from "next/navigation";
import { deleteJob } from "./delete-job.action";
import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";

type DeleteJobButtonProps = {
  id: number;
};

export function DeleteJobButton({ id }: DeleteJobButtonProps) {
  const [opened, { open, close }] = useDisclosure(false);

  const router = useRouter();

  async function clickHandler() {
    const { success, error } = await deleteJob(id);

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
        <Button onClick={clickHandler}>Delete</Button>
      </Modal>
      <Button onClick={open}>Delete Job</Button>
    </>
  );
}
