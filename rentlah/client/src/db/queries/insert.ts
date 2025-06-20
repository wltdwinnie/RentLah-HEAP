import { db } from "../db";
import { InsertListing, listingTable } from "../schema";

export async function createListing(data: InsertListing) {
  await db!.insert(listingTable).values(data);
}

export async function createListings(data: InsertListing[]) {
  await db!.insert(listingTable).values(data);
}
