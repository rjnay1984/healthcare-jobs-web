import { redirect } from "next/navigation";
import { Container } from "@/components/ui/container";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import DashboardClient from "./dashboard-client";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/sign-in");
  }

  return (
    <main className="py-10">
      <Container>
        <DashboardClient user={session.user} />
      </Container>
    </main>
  );
}
