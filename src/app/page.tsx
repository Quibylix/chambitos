import LandingPage from "@/features/landing/components/landing-page.component";
import { getServerSession } from "next-auth";

export default async function HomePage() {
  const session = await getServerSession();
  if (!session) return <LandingPage />;

  return <h1>Already logged</h1>;
}
