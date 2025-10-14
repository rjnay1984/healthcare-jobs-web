import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function OnboardingPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/auth/sign-in");
  }
  return (
    <main className="py-10">
      <Container>
        <Card>
          <CardHeader>
            <CardTitle>Welcome to the Onboarding Page!</CardTitle>
          </CardHeader>
          <CardContent>Let&apos;s get your profile set up.</CardContent>
        </Card>
      </Container>
    </main>
  );
}
