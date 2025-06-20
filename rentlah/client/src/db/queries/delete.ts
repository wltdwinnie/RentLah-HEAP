import { db } from '../db';
import { eq } from 'drizzle-orm';
import { SelectListing, listingTable } from '../schema';

export async function deleteListing(id: SelectListing['id']) {
  await db.delete(listingTable).where(eq(listingTable.id, id));
}

export async function deleteAllListings() {
    await db.delete(listingTable);
}
