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
    <main className="flex-1 flex flex-col justify-center items-center px-6">
      <Card className="w-full lg:w-1/2">
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
