import { getUserRole } from "@/features/auth/utils/get-user-role";
import { createClient } from "@/features/db/utils/server";
import { DeleteJobButton } from "@/features/jobs/delete-job-button/delete-job-button.component";
import { ToggleJobApplicationButton } from "@/features/jobs/toggle-job-aplication-button/toggle-job-aplication-button.component";
import { Button } from "@mantine/core";
import Link from "next/link";
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

  const { data: application } = await db
    .from("applications")
    .select("id")
    .eq("job_id", id)
    .eq("worker_id", user?.id)
    .single();

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
        {userRole === "worker" && (
          <ToggleJobApplicationButton id={id} applied={application !== null} />
        )}
        {userRole === "contractor" && job.contractor_id === user?.id && (
          <>
            <Button component={Link} href={`/jobs/edit/${id}`}>
              Edit
            </Button>
            <DeleteJobButton id={id} />
          </>
        )}
      </div>
    </div>
  );
}
