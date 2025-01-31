import { createClient } from "@/features/db/utils/server";

export async function getUserRole(id: string | null) {
  if (!id) return "anon";

  const db = await createClient();

  const result = await db.from("profiles").select("role, status").eq("id", id);

  if (result.error || !result.data || !result.data.length) return "anon";

  const { role, status } = result.data[0];

  if (status === "incomplete") return "incomplete";
  if (role === "worker") return "worker";
  if (role === "contractor") return "contractor";

  return "anon";
}
