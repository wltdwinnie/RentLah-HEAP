import { db } from "../db";
import { InsertListing, listings } from "../schema";
import { eq } from "drizzle-orm";


// Update a listing by ID
export async function updateListing(data: InsertListing) {
  // Ensure availableFrom is a Date object if present
  let availableFrom = data.availableFrom;
  if (availableFrom && typeof availableFrom === "string") {
    
    availableFrom = new Date(availableFrom);
    console.warn("Converted availableFrom from string to Date");
  }
  if (!(availableFrom instanceof Date) || isNaN(availableFrom.getTime())) {
    throw new Error('Invalid availableFrom date format');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, createdAt, ...updateFields } = data;
  updateFields.availableFrom = availableFrom;
  updateFields.updatedAt = new Date(); // Set updatedAt to current time

  // Update in DB
  const updated = await db
    .update(listings)
    .set(updateFields)
    .where(eq(listings.id, id))
    .returning();
  return updated[0];
}
