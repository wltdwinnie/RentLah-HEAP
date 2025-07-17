import { and, eq, gte, lte, inArray } from "drizzle-orm";
import { db } from "../db";
import { listings } from "../schema";
import { transformListingFromDB } from "@/lib/utils";
import { Listing, ListingFilters } from "@/lib/definition";


export async function getListingsWithFilter(
  filter: ListingFilters,
  offset: number = 0,
  limit: number = 50
): Promise<Listing[]> {
  // Build where conditions
  const whereClauses = [];

  if (filter.propertyType) {
    whereClauses.push(eq(listings.propertyType, filter.propertyType));
  }
  if (filter.minPrice) {
    whereClauses.push(gte(listings.perMonth, filter.minPrice.toString()));
  }
  if (filter.maxPrice) {
    whereClauses.push(lte(listings.perMonth, filter.maxPrice.toString()));
  }
  if (filter.bedrooms && filter.bedrooms.length > 0) {
    whereClauses.push(inArray(listings.bedrooms, filter.bedrooms));
  }
  if (filter.furnishing && filter.furnishing.length > 0) {
    whereClauses.push(inArray(listings.furnishing, filter.furnishing));
  }
  if (filter.id) {
    whereClauses.push(eq(listings.id, filter.id));
  }
  if (typeof filter.isVerified === "boolean") {
    whereClauses.push(eq(listings.isVerified, filter.isVerified));
  }
  if (typeof filter.isFeatured === "boolean") {
    whereClauses.push(eq(listings.isFeatured, filter.isFeatured));
  }

  const results = await db
    .select()
    .from(listings)
    .where(whereClauses.length > 0 ? and(...whereClauses) : undefined)
    .limit(limit)
    .offset(offset);

  // Post-filter for amenities/university/distance
  let filtered = results.map(transformListingFromDB) as Listing[];

  if (filter.amenities && filter.amenities.length > 0) {
    filtered = filtered.filter((listing) => {
      const facilities = listing.facilities || [];
      return filter.amenities!.every((a) => facilities.includes(a));
    });
  }
  if (filter.university) {
    filtered = filtered.filter((listing) => {
      const travelTimes = listing.universityTravelTimes || {};
      return travelTimes[filter.university!];
    });
    if (filter.distanceFromUniversity) {
      filtered = filtered.filter((listing) => {
        const travelTimes = listing.universityTravelTimes || {};
        const uniTime = travelTimes[filter.university!];
        return uniTime && uniTime.durationMin <= filter.distanceFromUniversity!;
      });
    }
  }

  return filtered;
}
