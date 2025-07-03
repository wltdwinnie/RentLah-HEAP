import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Listing, LocationInfo, MRTLine } from "./definition";
import { InsertListing } from "@/db/schema";
import { MRTInfo } from "./definition";
import { MRT_LINES } from "./constants";

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
export function transformListingFromDB(dbListing: InsertListing): Listing {
  return {
    id: dbListing.id,
    description: dbListing.description,
    userId: dbListing.userId,
    aptType: dbListing.aptType,
    propertyType: dbListing.propertyType,
    roomConfig: {
      bedrooms: dbListing.bedrooms,
      bathrooms: dbListing.bathrooms,
      study: dbListing.hasStudy || undefined,
      helper: dbListing.hasHelper || undefined,
      balcony: dbListing.hasBalcony || undefined,
    },
    furnishing: dbListing.furnishing,
    sqft: dbListing.sqft,
    address: {
      blk: dbListing.addressBlk,
      street: dbListing.addressStreet,
      postalCode: dbListing.addressPostalCode,
      floor: dbListing.addressFloor || undefined,
      unit: dbListing.addressUnit || undefined,
      coordinates: dbListing.coordinates,
    },
    nearbyMRT: transformMRTLinesFromDB(dbListing.nearbyMRT) || [],
    facilities: dbListing.facilities || [],
    parking: {
      available: dbListing.parkingAvailable || false,
      type: dbListing.parkingType || undefined,
      spaces: dbListing.parkingSpaces || undefined,
    },
    nearbyAmenities: transformNearbyAmenitiesFromDB(
      dbListing.nearbyAmenities ?? []
    ),
    perMonth: parseFloat(dbListing.perMonth),
    utilities: {
      included: dbListing.utilitiesIncluded,
      deposit: parseFloat(dbListing.securityDeposit),
      agentFee: dbListing.agentFee ? parseFloat(dbListing.agentFee) : undefined,
    },
    leasePeriod: dbListing.leasePeriod,
    tenantPreferences: {
      gender: dbListing.preferredGender || undefined,
      nationality: dbListing.preferredNationality || undefined,
      occupation: dbListing.preferredOccupation || [],
      maxOccupants: dbListing.maxOccupants,
    },
    images: dbListing.images,
    isActive: dbListing.isActive || true, // Default to true if not specified
    isFeatured: dbListing.isFeatured || false, // Default to false if not specified
    isVerified: dbListing.isVerified || false, // Default to false if not specified
    createdAt: dbListing.createdAt || new Date(), // Default to current date if not specified
    updatedAt: dbListing.updatedAt || new Date(), // Default to current date if not specified
  };
}

export function transformMRTLinesFromDB(
  mrts: Array<{
    name: string;
    line: string | string[]; // Updated to support both old and new format
    distance: number;
  }>
): MRTInfo[] {
  return mrts.map((mrt) => {
    // Parse the line (supporting both string and array formats)
    let lineStrings: string[];

    if (Array.isArray(mrt.line)) {
      // New format: already an array
      lineStrings = mrt.line;
    } else {
      // Legacy format: string that needs parsing
      try {
        // Try parsing as JSON first
        lineStrings = JSON.parse(mrt.line);
      } catch {
        // Fallback to comma-separated parsing
        lineStrings = mrt.line.split(",").map((l) => l.trim());
      }
    }

    // Validate and filter only valid MRT lines
    const validLines = lineStrings.filter((line): line is MRTLine =>
      MRT_LINES.includes(line as MRTLine)
    );

    // Ensure we have at least one valid line
    if (validLines.length === 0) {
      throw new Error(`MRT station ${mrt.name} has no valid MRT lines`);
    }

    return {
      name: mrt.name,
      line: validLines as [MRTLine, ...MRTLine[]], // TypeScript assertion after validation
      distance: mrt.distance,
    };
  });
}

export function transformMRTLinesForDB(mrtInfo: MRTInfo[]): Array<{
  name: string;
  line: string[]; // Store as string array to match updated schema
  distance: number;
}> {
  return mrtInfo.map((mrt) => ({
    name: mrt.name,
    line: mrt.line, // Direct assignment since both are arrays now
    distance: mrt.distance,
  }));
}

function transformNearbyAmenitiesFromDB(
  amenities: {
    name: string;
    distance: number;
    type: "School" | "Mall" | "Hawker Centre" | "Clinic" | "Gym";
  }[]
): LocationInfo[] {
  return amenities.map((amenity) => ({
    name: amenity.name,
    distance: amenity.distance,
    type: amenity.type, // No need for type assertion anymore
  }));
}

function transformNearbyAmenitiesForDB(
  amenities: LocationInfo[]
): {
  name: string;
  distance: number;
  type: "School" | "Mall" | "Hawker Centre" | "Clinic" | "Gym";
}[] {
  return amenities.map((amenity) => ({
    name: amenity.name,
    distance: amenity.distance,
    type: amenity.type,
  }));
}
