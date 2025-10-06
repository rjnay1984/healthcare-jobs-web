import { getCurrentUser } from "@/lib/get-current-user";
import { SignOutButton } from "./sign-out-button";
import { SignInButton } from "./sign-in-button";
import { Skeleton } from "../ui/skeleton";
import { Container } from "../ui/container";
import { buttonVariants } from "../ui/button";

export async function Header() {
  const { user } = await getCurrentUser();

  return (
    <HeaderShell>
      {user ? (
        <>
          <span className="text-sm hidden sm:block">{user.email}</span>
          <SignOutButton />
        </>
      ) : (
        <SignInButton />
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
