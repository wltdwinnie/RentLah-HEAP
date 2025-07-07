import { db } from "../db";
import { eq } from "drizzle-orm";
import { SelectListing, listings, SelectUniversity, universities } from "../schema";

export async function deleteListing(id: SelectListing["id"]) {
  await db.delete(listings).where(eq(listings.id, id));
}

export async function deleteAllListings() {
  await db.delete(listings);
}

export async function deleteUniversity(name: SelectUniversity["name"]) {
    await db.delete(universities).where(eq(universities.name, name));
}

export async function deleteAllUniversities() {
    await db.delete(universities);
}
