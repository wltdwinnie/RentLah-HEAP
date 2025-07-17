import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Listing } from "./definition";
import { InsertListing } from "@/db/schema";
import { transformMRTLinesForDB, transformMRTLinesFromDB } from "./mrt-utils";
import {
  transformNearbyAmenitiesForDB,
  transformNearbyAmenitiesFromDB,
} from "./amenities-utils";
import {
  FurnishingType,
  GenderType,
  NationalityType,
  ParkingType,
  UtilityType,
} from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Transform function to convert JSON format to database format
export function transformListingForDB(listing: Listing): InsertListing {
  return {
    id: listing.id,
    description: listing.description,
    userId: listing.userId,
    aptType: listing.aptType,
    propertyType: listing.propertyType,
    bedrooms: listing.roomConfig.bedrooms,
    bathrooms: listing.roomConfig.bathrooms,
    hasStudy: listing.roomConfig.study || false,
    hasHelper: listing.roomConfig.helper || false,
    hasBalcony: listing.roomConfig.balcony || false,
    furnishing: listing.furnishing,
    sqft: listing.sqft,
    addressBlk: listing.address.blk,
    addressStreet: listing.address.street,
    addressPostalCode: listing.address.postalCode,
    addressFloor: listing.address.floor,
    addressUnit: listing.address.unit,
    coordinates: listing.address.coordinates,
    nearbyMRT: transformMRTLinesForDB(listing.nearbyMRT),
    facilities: listing.facilities || [],
    parkingAvailable: listing.parking?.available || false,
    parkingType: listing.parking?.type,
    parkingSpaces: listing.parking?.spaces || 0,
    nearbyAmenities: transformNearbyAmenitiesForDB(
      listing.nearbyAmenities ?? []
    ),
    perMonth: listing.perMonth.toString(),
    utilitiesIncluded: listing.utilitiesIncluded,
    deposit: listing.deposit !== undefined ? listing.deposit.toString() : "0",
    agentFee:
      listing.agentFee !== undefined ? listing.agentFee.toString() : undefined,
    leasePeriod: listing.leasePeriod,
    preferredGender: listing.tenantPreferences?.gender,
    preferredNationality: listing.tenantPreferences?.nationality,
    preferredOccupation: listing.tenantPreferences?.occupation || [],
    maxOccupants: listing.tenantPreferences?.maxOccupants || 1,
    images: listing.images,
    availableFrom: new Date(listing.availableFrom),
    isActive: listing.isActive,
    isFeatured: listing.isFeatured,
    isVerified: listing.isVerified,
    ...(listing.universityTravelTimes && {
      universityTravelTimes: listing.universityTravelTimes,
    }),
  };
}

// Transform function to convert database format to JSON format
export function transformListingFromDB(dbListing: InsertListing): Listing {
  return {
    id: dbListing.id,
    description: dbListing.description,
    userId: dbListing.userId,
    aptType: dbListing.aptType as Listing["aptType"],
    propertyType: dbListing.propertyType as Listing["propertyType"],
    roomConfig: {
      bedrooms: dbListing.bedrooms ?? 1,
      bathrooms: dbListing.bathrooms ?? 1,
      study: dbListing.hasStudy || false,
      helper: dbListing.hasHelper || false,
      balcony: dbListing.hasBalcony || false,
    },
    furnishing: dbListing.furnishing as FurnishingType,
    sqft: dbListing.sqft ?? 0,
    address: {
      blk: dbListing.addressBlk,
      street: dbListing.addressStreet,
      postalCode: dbListing.addressPostalCode,
      floor: dbListing.addressFloor || undefined,
      unit: dbListing.addressUnit || undefined,
      coordinates:
        typeof dbListing.coordinates === "string"
          ? JSON.parse(dbListing.coordinates)
          : dbListing.coordinates,
    },
    nearbyMRT: transformMRTLinesFromDB(dbListing.nearbyMRT) || [],
    facilities: dbListing.facilities || [],
    parking: {
      available: dbListing.parkingAvailable || false,
      type: (dbListing.parkingType as ParkingType) || undefined,
      spaces: dbListing.parkingSpaces || undefined,
    },
    nearbyAmenities: transformNearbyAmenitiesFromDB(
      dbListing.nearbyAmenities ?? []
    ) as Listing["nearbyAmenities"],
    perMonth: parseFloat(dbListing.perMonth),
    utilitiesIncluded:
      (dbListing.utilitiesIncluded as UtilityType[]) ?? undefined,
    deposit: parseFloat(dbListing.deposit) ?? undefined,
    agentFee: dbListing.agentFee ? parseFloat(dbListing.agentFee) : undefined,
    leasePeriod: dbListing.leasePeriod as Listing["leasePeriod"],
    tenantPreferences: {
      gender: (dbListing.preferredGender as GenderType) || undefined,
      nationality:
        (dbListing.preferredNationality as NationalityType) || undefined,
      occupation: dbListing.preferredOccupation || [],
      maxOccupants: dbListing.maxOccupants,
    },
    images: dbListing.images,
    availableFrom: dbListing.availableFrom,
    isActive: dbListing.isActive ?? true,
    isFeatured: dbListing.isFeatured ?? false,
    isVerified: dbListing.isVerified ?? false,
    createdAt: dbListing.createdAt || new Date(),
    updatedAt: dbListing.updatedAt || new Date(),
    ...(dbListing.universityTravelTimes && {
      universityTravelTimes: dbListing.universityTravelTimes,
    }),
  };
}
