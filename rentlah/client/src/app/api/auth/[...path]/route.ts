import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

// Create a catch-all route handler for all auth endpoints
export const { GET, POST } = toNextJsHandler(auth);
