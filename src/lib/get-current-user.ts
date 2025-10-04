import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { serverApi } from "@/lib/api-server";
import { User } from "@/types";

export async function getCurrentUser(): Promise<{
  user: User | null;
  token: string | null;
  session: Awaited<ReturnType<typeof auth.api.getSession>> | null;
}> {
  try {
    // Get Better Auth session
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return { user: null, token: null, session: null };
    }

    // Get OAuth access token
    const tokenData = await auth.api.getAccessToken({
      body: {
        providerId: "authentik",
        userId: session.user.id,
      },
    });

    const token = tokenData?.accessToken || null;

    if (!token) {
      return { user: null, token: null, session };
    }

    // Fetch user from your backend API
    try {
      const user = await serverApi.getCurrentUser(token);
      return { user, token, session };
    } catch (error) {
      // User doesn't exist in backend yet (needs onboarding)
      return { user: null, token, session };
    }
  } catch (error) {
    console.error("Failed to get current user:", error);
    return { user: null, token: null, session: null };
  }
}
