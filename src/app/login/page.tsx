import { SignInButton } from "@/components/shared/sign-in-button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-5">
      <Card className="min-w-2xl">
        <CardHeader>
          <CardTitle>Healthcare Jobs</CardTitle>
          <CardDescription>
            Sign in to find your next healthcare technology opportunity
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <SignInButton />
        </CardFooter>
      </Card>
    </main>
  );
}
