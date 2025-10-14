import { SignOutButton } from "./sign-out-button";
import { Skeleton } from "../ui/skeleton";
import { Container } from "../ui/container";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

export async function Header() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <HeaderShell>
      {session?.user ? (
        <>
          <span className="text-sm hidden sm:block">{session.user.email}</span>
          <SignOutButton />
        </>
      ) : (
        <Link href="/auth/sign-in">Sign In</Link>
      )}
    </HeaderShell>
  );
}

export function HeaderLoading() {
  return (
    <HeaderShell>
      <Skeleton className="hidden sm:block sm:h-6 sm:w-48" />
      <Skeleton className="w-24 h-9" />
    </HeaderShell>
  );
}

function HeaderShell({ children }: { children: React.ReactNode }) {
  return (
    <header className="border-b border-b-foreground">
      <Container className="flex items-center justify-between py-2 lg:py-4">
        <h1 className="text-base sm:text-2xl font-bold">Healthcare Jobs</h1>
        <div className="flex items-center gap-4">{children}</div>
      </Container>
    </header>
  );
}
