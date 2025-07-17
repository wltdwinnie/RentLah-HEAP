import { asc, eq } from "drizzle-orm";
import { db } from "../db";
import {
  listings,
  SelectUniversity,
  universities,
} from "../schema";
import { transformListingFromDB } from "@/lib/utils";
import { Listing } from "@/lib/definition";

// export async function getListingById(
//   id: string // or string, depending on your schema
// ): Promise<Listing[]> {
//   const results = (
//     await db.select().from(listings).where(eq(listings.id, id))
//   ).map((listing) => transformListingFromDB(listing));
//   return results as Listing[];
// }

export async function getListings(
  offset: number,
  limit: number
): Promise<Listing[]> {
  const results = (
    await db
      .select({
        id: listings.id,
        description: listings.description,
        userId: listings.userId,
        aptType: listings.aptType,
        propertyType: listings.propertyType,
        bedrooms: listings.bedrooms,
        bathrooms: listings.bathrooms,
        hasStudy: listings.hasStudy,
        hasHelper: listings.hasHelper,
        hasBalcony: listings.hasBalcony,
        furnishing: listings.furnishing,
        sqft: listings.sqft,
        addressBlk: listings.addressBlk,
        addressStreet: listings.addressStreet,
        addressPostalCode: listings.addressPostalCode,
        addressFloor: listings.addressFloor,
        addressUnit: listings.addressUnit,
        coordinates: listings.coordinates,
        nearbyMRT: listings.nearbyMRT,
        facilities: listings.facilities,
        parkingAvailable: listings.parkingAvailable,
        parkingType: listings.parkingType,
        parkingSpaces: listings.parkingSpaces,
        nearbyAmenities: listings.nearbyAmenities,
        perMonth: listings.perMonth,
        utilitiesIncluded: listings.utilitiesIncluded,
        deposit: listings.deposit,
        agentFee: listings.agentFee,
        leasePeriod: listings.leasePeriod,
        preferredGender: listings.preferredGender,
        preferredNationality: listings.preferredNationality,
        preferredOccupation: listings.preferredOccupation,
        maxOccupants: listings.maxOccupants,
        images: listings.images,
        isActive: listings.isActive,
        isFeatured: listings.isFeatured,
        isVerified: listings.isVerified,
        createdAt: listings.createdAt,
        updatedAt: listings.updatedAt,
        availableFrom: listings.availableFrom,
        universityTravelTimes: listings.universityTravelTimes,
      })
      .from(listings)
      .limit(limit)
      .offset(offset)
      .orderBy(asc(listings.createdAt))
  ).map((listing) => transformListingFromDB(listing));
  return results as Listing[];
}

export async function getUniversity(
  postalCode: SelectUniversity["postalCode"]
): Promise<SelectUniversity> {
  const result = await db
    .select()
    .from(universities)
    .where(eq(universities.postalCode, postalCode));
  return result[0] as SelectUniversity;
}

export async function getAllUniversities(): Promise<SelectUniversity[]> {
  return await db.select().from(universities);
}
