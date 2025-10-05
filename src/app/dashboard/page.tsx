import { getCurrentUser } from "@/lib/get-current-user";
import DashboardClient from "./dashboard-client";
import { redirect } from "next/navigation";
import { Container } from "@/components/ui/container";

export default async function DashboardPage() {
  const { user, session } = await getCurrentUser();

  if (!session) {
    redirect("/login");
  }

  if (!user) {
    redirect("/login");
  }

  if (!user.isSetupComplete) {
    redirect("/onboarding");
  }
  return (
    <main className="py-10">
      <Container>
        <DashboardClient user={user} />
      </Container>
    </main>
  );
}
