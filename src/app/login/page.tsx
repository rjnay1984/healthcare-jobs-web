"use client";

import { authClient } from "@/lib/auth-client";
import { useTransition } from "react";

export default function LoginPage() {
  const [isPending, startTransition] = useTransition();

  const handleLogin = () => {
    startTransition(async () => {
      try {
        await authClient.signIn.oauth2(
          {
            providerId: "authentik",
            callbackURL: "/dashboard",
          },
          {
            onSuccess: (session) => {
              console.log(
                "Login successful:",
                JSON.stringify(session.response)
              );
            },
          }
        );
      } catch (error) {
        console.error("Login failed:", error);
      }
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Healthcare Jobs
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to find your next healthcare technology opportunity
          </p>
        </div>

        <button
          onClick={handleLogin}
          disabled={isPending}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Signing in..." : "Sign in with Authentik"}
        </button>
      </div>
    </div>
  );
}
