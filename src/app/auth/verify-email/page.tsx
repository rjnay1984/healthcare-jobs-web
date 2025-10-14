import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function VerifyEmailPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center  px-4">
      <Card>
        <CardHeader>
          <CardTitle>Verify Your Email</CardTitle>
        </CardHeader>
        <CardContent>
          A verification link has been sent to your email address. Please check
          your inbox and click the link to verify your email.
        </CardContent>
        <CardFooter>
          If you did not receive the email, please check your spam folder or
          request a new verification email.
        </CardFooter>
      </Card>
    </main>
  );
}
