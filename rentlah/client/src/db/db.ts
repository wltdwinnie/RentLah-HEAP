import 'dotenv/config';
import { neonConfig } from '@neondatabase/serverless';
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from 'ws';

neonConfig.webSocketConstructor = ws;

console.log("Database connection string:", process.env.DATABASE_URL? "exists" : "Not set");

// Initialize Drizzle with Neon adapter
const db = drizzle(process.env.DATABASE_URL!);

console.log("db: ", db ? "Created successfully" : "Failed to create pool");


export { db };
