import { createClient } from "@/features/db/utils/server";

export default async function Jobs() {
  const db = await createClient();

  const { data } = await db
    .from("jobs")
    .select(
      "title, description, status, salary, payment_frequency, duration, id",
    )
    .eq("status", "open")
    .limit(20);

  if (!data) return null;

  return (
    <div>
      <h1>Jobs</h1>
      <ul>
        {data.map((job) => (
          <li key={job.id}>
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
            <a href={`/jobs/${job.id}`}>View Job</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
