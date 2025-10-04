import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/get-current-user";
import DashboardClient from "./dashboard-client";

export default async function DashboardPage() {
  const { user, session } = await getCurrentUser();

  if (!session) {
    redirect("/login");
  }

  if (!user || !user.isSetupComplete) {
    redirect("/onboarding");
  }

  return <DashboardClient user={user} session={session} />;
}
