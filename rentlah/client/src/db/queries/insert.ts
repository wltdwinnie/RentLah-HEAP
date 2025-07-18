import { db } from "../db";
import {
  InsertListing,
  listings,
  InsertUniversity,
  universities,
} from "../schema";

export async function createListing(data: InsertListing) {
  // Ensure availableFrom is a Date object
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, prefer-const
  let { availableFrom, createdAt, updatedAt, ...updatedData } = data;

  if (typeof availableFrom === "string") {
    availableFrom = new Date(availableFrom);
  }
  if (!(availableFrom instanceof Date) || isNaN(availableFrom.getTime())) {
    throw new Error("Invalid availableFrom date format");
  }
  await db!.insert(listings).values({
    ...updatedData,
    availableFrom,
  });
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
