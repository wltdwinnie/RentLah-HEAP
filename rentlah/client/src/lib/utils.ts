import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Listing } from "./definition";
import { InsertListing } from "@/db/schema";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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
    nearbyMRT: listing.nearbyMRT,
    facilities: listing.facilities || [],
    parkingAvailable: listing.parking?.available || false,
    parkingType: listing.parking?.type,
    parkingSpaces: listing.parking?.spaces || 0,
    nearbyAmenities: listing.nearbyAmenities || [],
    perMonth: listing.perMonth.toString(),
    utilitiesIncluded: listing.utilities.included,
    securityDeposit: listing.utilities.deposit.toString(),
    agentFee: listing.utilities.agentFee?.toString(),
    leasePeriod: listing.leasePeriod,
    preferredGender: listing.tenantPreferences?.gender,
    preferredNationality: listing.tenantPreferences?.nationality,
    preferredOccupation: listing.tenantPreferences?.occupation || [],
    maxOccupants: listing.tenantPreferences?.maxOccupants || 1,
    images: listing.images,
    isActive: listing.isActive,
    isFeatured: listing.isFeatured,
    isVerified: listing.isVerified,
  };
}

// Transform function to convert database format to JSON format
export function transformListingFromDB(dbListing: any): Listing {
  return {
    id: dbListing.id,
    description: dbListing.description,
    userId: dbListing.userId,
    aptType: dbListing.aptType,
    propertyType: dbListing.propertyType,
    roomConfig: {
      bedrooms: dbListing.bedrooms,
      bathrooms: dbListing.bathrooms,
      study: dbListing.hasStudy,
      helper: dbListing.hasHelper,
      balcony: dbListing.hasBalcony,
    },
    furnishing: dbListing.furnishing,
    sqft: dbListing.sqft,
    address: {
      blk: dbListing.addressBlk,
      street: dbListing.addressStreet,
      postalCode: dbListing.addressPostalCode,
      floor: dbListing.addressFloor,
      unit: dbListing.addressUnit,
    },
    nearbyMRT: dbListing.nearbyMRT,
    facilities: dbListing.facilities || [],
    parking: {
      available: dbListing.parkingAvailable,
      type: dbListing.parkingType,
      spaces: dbListing.parkingSpaces,
    },
    nearbyAmenities: dbListing.nearbyAmenities || [],
    perMonth: parseFloat(dbListing.perMonth),
    utilities: {
      included: dbListing.utilitiesIncluded,
      deposit: parseFloat(dbListing.securityDeposit),
      agentFee: dbListing.agentFee ? parseFloat(dbListing.agentFee) : undefined,
    },
    leasePeriod: dbListing.leasePeriod,
    tenantPreferences: {
      gender: dbListing.preferredGender,
      nationality: dbListing.preferredNationality,
      occupation: dbListing.preferredOccupation || [],
      maxOccupants: dbListing.maxOccupants,
    },
    images: dbListing.images,
    isActive: dbListing.isActive,
    isFeatured: dbListing.isFeatured,
    isVerified: dbListing.isVerified,
    createdAt: dbListing.createdAt,
    updatedAt: dbListing.updatedAt,
  };
}
