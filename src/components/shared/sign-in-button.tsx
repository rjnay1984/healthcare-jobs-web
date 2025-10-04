"use client";

import { authClient } from "@/lib/auth-client";
import { useTransition } from "react";
import { Button } from "../ui/button";

export function SignInButton() {
  const [isPending, startTransition] = useTransition();

  const handleLogin = () => {
    startTransition(async () => {
      try {
        await authClient.signIn.oauth2({
          providerId: "authentik",
          callbackURL: "/dashboard",
        });
      } catch (error) {
        console.error("Login failed:", error);
      }
    });
  };
  return (
    <Button onClick={handleLogin} disabled={isPending}>
      {isPending ? "Signing in..." : "Sign in with Authentik"}
    </Button>
  );
}
