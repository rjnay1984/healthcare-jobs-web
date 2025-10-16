import { Pool } from "pg";
import { betterAuth } from "better-auth";
import { jwt, openAPI } from "better-auth/plugins";
import { sendEmail } from "./email";

export const auth = betterAuth({
  plugins: [
    jwt({
      jwt: {
        issuer: "http://localhost:3000",
        audience: "http://localhost:5000",
        expirationTime: "7d",
      },
      jwks: {
        keyPairConfig: {
          alg: "RS256",
          modulusLength: 2048,
        },
      },
    }),
    openAPI(),
  ],
  user: {
    additionalFields: {
      type: {
        type: "string",
        defaultValue: "candidate",
        fieldName: "type",
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    async sendResetPassword({ user, url }) {
      // Send an email to the user with a link to reset their password
      await sendEmail({
        to: user.email,
        subject: "Reset your password",
        html: `<p>Click the link below to reset your password:</p>
        <a href="${url}">Reset Password</a>`,
      });
    },
  },

  emailVerification: {
    sendOnSignIn: true,
    async sendVerificationEmail({ user, url }) {
      await sendEmail({
        to: user.email,
        subject: "Verify your email",
        html: `<p>Please verify your email by clicking the link below:</p>
        <a href="${url}">Verify Email</a>`,
      });
    },
  },

  /** if no database is provided, the user data will be stored in memory.
   * Make sure to provide a database to persist user data **/
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),

  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },
  },
});

export type Session = typeof auth.$Infer.Session;
