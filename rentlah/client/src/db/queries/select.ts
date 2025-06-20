import { asc, between, count, eq, getTableColumns, sql } from "drizzle-orm";
import { db } from "../db";
import { SelectListing, listingTable } from "../schema";
import { transformListingFromDB } from "@/lib/utils";
import { Listing } from "@/lib/definition";

export async function getListingById(
  id: SelectListing["id"]
): Promise<Listing[]> {
  const results = (
    await db.select().from(listingTable).where(eq(listingTable.id, id))
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
      .from(listingTable)
      .limit(limit)
      .offset(offset)
      .orderBy(asc(listingTable.createdAt))
  ).map((listing) => transformListingFromDB(listing));
  return results as Listing[];
}
