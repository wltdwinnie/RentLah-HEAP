import { config } from 'dotenv';
import type { Config } from 'drizzle-kit';

config({ path: '.env' });

// Export configuration directly as a Config object
export default {
  schema: "./src/db/schema.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  tablesFilter: ["!account", "!session", "!user", "!verification", "!messages", "!scraped_rentals"],
  schemaFilter: ["public"],
} as Config;

