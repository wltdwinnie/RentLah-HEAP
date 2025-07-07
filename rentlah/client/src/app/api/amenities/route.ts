import { NextResponse } from "next/server";
import { db } from "@/db/db";
import { listings } from "@/db/schema";

// GET /api/amenities
export async function GET() {
  // Get all amenities from all listings, flatten, dedupe
  const all = await db
    .select({ amenities: listings.nearbyAmenities })
    .from(listings);
  const amenitiesSet = new Set<string>();
  all.forEach((row) => {
    (row.amenities || []).forEach((a: { name: string }) =>
      amenitiesSet.add(a.name)
    );
  });
  return NextResponse.json(Array.from(amenitiesSet));
}
