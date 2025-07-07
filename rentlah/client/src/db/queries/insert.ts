import { db } from "../db";
import { InsertListing, listings, InsertUniversity, universities } from "../schema";

export async function createListing(data: InsertListing) {
  await db!.insert(listings).values(data);
}

export async function createListings(data: InsertListing[]) {
  await db!.insert(listings).values(data);
}

export async function createUniversity(data: InsertUniversity) {
  await db!.insert(universities).values(data);
}

export async function createUniversities(data: InsertUniversity[]) {
  await db!.insert(universities).values(data);
}