import { betterAuth } from "better-auth";
import { genericOAuth } from "better-auth/plugins";
import { Pool } from "pg";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET!,

  database: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),

  plugins: [
    genericOAuth({
      config: [
        {
          providerId: "authentik",
          clientId: process.env.AUTHENTIK_CLIENT_ID!,
          clientSecret: process.env.AUTHENTIK_CLIENT_SECRET!,
          discoveryUrl: process.env.AUTHENTIK_METADATA_URL!,
          redirectURI: `${
            process.env.BETTER_AUTH_URL || "http://localhost:3000"
          }/api/auth/oauth2/callback/authentik`,
          pkce: true,
          mapProfileToUser: (profile) => {
            return {
              id: profile.sub,
              email: profile.email,
              name: profile.name,
              emailVerified: profile.email_verified,
            };
          },
        },
      ],
    }),
  ],
});

export type Session = typeof auth.$Infer.Session;
