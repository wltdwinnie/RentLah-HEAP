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
        sendResetPassword: async ({ user, url, token }, request) => {
            await sendEmail({
                to: user.email,
                subject: "Reset your password",
                text: `Click the link to reset your password: ${url}`,
            });
        }},
        emailVerification: {
            sendVerificationEmail: async ({ user, url, token }, request) => {
                await sendEmail({
                    to: user.email,
                    subject: "Verify your email address",
                    text: `Click the link to verify your email: ${url}`,
                });
            },
        },
        socialProviders: {
            google: {
                clientId: process.env.GOOGLE_CLIENT_ID || "",
                clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
                redirectUri: "http://localhost:3000/api/auth/callback/google",
            },
        },
        session: {
            expiresIn: 60 * 60 * 24 * 14, // 1 day (in seconds)
            updateAge: 60 * 60 * 24 // Refresh session tokens daily
        }
    });