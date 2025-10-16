import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { TypographyH3 } from "@/components/ui/typography";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import OnboardingCandidateForm from "./onboarding-candidate-form";
import { getAccessToken } from "@/lib/get-access.token";

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
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>
              <TypographyH3>Onboarding</TypographyH3>
            </CardTitle>
            <CardDescription>
              {session.user.type === "candidate"
                ? "Complete your healthcare professional profile to get started finding your next opportunity."
                : "Employer onboarding coming soon!"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {session.user.type === "candidate" ? (
              <OnboardingCandidateForm />
            ) : (
              <>Employer setup soon</>
            )}
          </CardContent>
        </Card>
      </Container>
    </main>
  );
}
