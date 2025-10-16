import { headers } from "next/headers";
import { auth } from "./auth";

export async function getAccessToken(): Promise<string | null> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return null;
    }

    const { token } = await auth.api.getToken({
      headers: await headers(),
    });

    if (!token) {
      return null;
    }

    return token;
  } catch (error) {
    console.error("Error fetching access token:", error);
    return null;
  }
}
