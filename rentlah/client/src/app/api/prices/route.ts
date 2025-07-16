import { NextResponse } from "next/server";
import { db } from "@/db/db";
import { listings } from "@/db/schema";
import { sql } from "drizzle-orm";

// GET /api/prices
export async function GET() {
  // Get min and max price from all listings
  const result = await db
    .select({
      min: sql`MIN(${listings.perMonth})`,
      max: sql`MAX(${listings.perMonth})`,
    })
    .from(listings);
  return NextResponse.json(result[0]);
}
