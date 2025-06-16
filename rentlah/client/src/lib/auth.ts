import { betterAuth } from "better-auth";
import { Pool } from "pg";

// Database pool for custom queries
export const dbPool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
export const auth = betterAuth({
    secretKey: process.env.BETTER_AUTH_SECRET || "my-complex-secret-key-replace-in-production",
    database: dbPool,
    emailAndPassword: {
        enabled: true,
        autoSignIn: true,
        requireEmailVerification: false
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
            redirectUri: "http://localhost:3000/api/auth/callback/google",
        },
    },
    session:{
        expiresIn: 60 * 60 * 24 * 14, // 14 days (in seconds)
        updateAge: 60 * 60 * 24 // Refresh session tokens daily
    }
})