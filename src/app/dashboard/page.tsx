import { createClient } from "@/features/db/utils/server";

export default async function DashboardPage() {
  const db = await createClient();

  const {
    data: { user },
  } = await db.auth.getUser();

  if (!user) return null;

  const { data } = await db
    .from("profiles")
    .select("first_name, last_name, role, title, description")
    .eq("id", user.id)
    .single();

  if (!data) return null;

  return (
    <div>
      <h1>
        {data.first_name} {data.last_name}
      </h1>
      <p>{data.title}</p>
      <p>{data.description}</p>
      <p>
        Role: <strong>{data.role}</strong>
      </p>
    </div>
  );
}
