import { betterAuth } from "better-auth";
import { Pool } from "pg";
import { sendEmail } from "./email";
import dotenv from "dotenv";
dotenv.config();
// Database pool for custom queries
export const dbPool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
export const auth = betterAuth({
  secretKey: process.env.BETTER_AUTH_SECRET,
  database: dbPool,
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Reset your password",
        text: `
                Dear ${user.name},
                We received a request to reset your password. You can reset it by clicking the link below:
                
                🔐 ${url}
                
                If you did not request a password reset, please ignore this message. This link will expire in 24 hours for your security.

                Thank you,
                RentLah Team
                `,
      });
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Verify your email address",
        text: `
                Dear ${user.name},
                We received a request to create an account with this email. You can verify it by clicking the link below:

                🔐 ${url}

                If you did not request this, please ignore this message. This link will expire in 24 hours for your security.

                Thank you,
                RentLah Team
                `,
      });
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      redirectUri: process.env.GOOGLE_REDIRECT_URL || "",
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 14, // 14 day (in seconds)
    updateAge: 60 * 60 * 24, // Refresh session tokens daily
  },
});
