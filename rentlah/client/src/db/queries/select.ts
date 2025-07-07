import { asc, between, count, eq, getTableColumns, sql } from "drizzle-orm";
import { db } from "../db";
import {
  SelectListing,
  listings,
  SelectUniversity,
  universities,
} from "../schema";
import { transformListingFromDB } from "@/lib/utils";
import { Listing } from "@/lib/definition";

export async function getListingById(
  id: SelectListing["id"]
): Promise<Listing[]> {
  const results = (
    await db.select().from(listings).where(eq(listings.id, id))
  ).map((listing) => transformListingFromDB(listing));
  return results as Listing[];
}

export async function getListings(
  offset: number,
  limit: number
): Promise<Listing[]> {
  const results = (
    await db
      .select()
      .from(listings)
      .limit(limit)
      .offset(offset)
      .orderBy(asc(listings.createdAt))
  ).map((listing) => transformListingFromDB(listing));
  return results as Listing[];
}

// export async function getListingsWithFilter(

// ): Promise<Listing[]> {{

// }

export async function getUniversity(
  postalCode: SelectUniversity["postalCode"]
): Promise<SelectUniversity> {
  const result = await db
    .select()
    .from(universities)
    .where(eq(universities.postalCode, postalCode));
  return result[0] as SelectUniversity;
}
