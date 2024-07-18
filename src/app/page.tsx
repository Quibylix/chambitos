import WorkerDashboard from "@/features/dashboard/components/worker-dashboard.component";
import getServerClient from "@/features/db/utils/supabase/server";
import LandingPage from "@/features/landing/components/landing-page.component";

export default async function HomePage() {
  const db = getServerClient();
  const {
    data: { session },
  } = await db.auth.getSession();

  if (!session) return <LandingPage />;

  return <WorkerDashboard />;
}
