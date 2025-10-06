"use client";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export function SignOutButton() {
  const router = useRouter();
  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          router.refresh();
        },
      },
    });
  };

  return <Button onClick={handleSignOut}>Sign Out</Button>;
}
