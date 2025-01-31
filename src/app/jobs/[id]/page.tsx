import { getUserRole } from "@/features/auth/utils/get-user-role";
import { createClient } from "@/features/db/utils/server";
import { Button } from "@mantine/core";
import { z } from "zod";

export type JobPageProps = {
  params: Promise<{ id: string }>;
};

export default async function JobPage({ params }: JobPageProps) {
  const { id: jobId } = await params;
  const id = Number(jobId);

  if (!z.number().int().positive().safeParse(id).success) {
    return "Invalid job ID";
  }

  const db = await createClient();

  const { data: job } = await db
    .from("jobs")
    .select(
      "title, description, status, salary, payment_frequency, duration, id, contractor_id",
    )
    .eq("id", jobId)
    .single();

  if (!job) return "Invalid job ID";

  const {
    data: { user },
  } = await db.auth.getUser();

  const userRole = await getUserRole(user?.id ?? null);

  return (
    <div>
      <h1>Jobs</h1>
      <h2>{job.title}</h2>
      <p>{job.description}</p>
      <table>
        <tbody>
          <tr>
            <td>Salary:</td>
            <td>{job.salary}</td>
          </tr>
          <tr>
            <td>Payment Frequency:</td>
            <td>{job.payment_frequency}</td>
          </tr>
          <tr>
            <td>Duration:</td>
            <td>{job.duration}</td>
          </tr>
        </tbody>
      </table>
      <div>
        {userRole === "worker" && <Button>Apply</Button>}
        {userRole === "contractor" && job.contractor_id === user?.id && (
          <>
            <Button>Edit</Button>
            <Button>Delete</Button>
          </>
        )}
      </div>
    </div>
  );
}
