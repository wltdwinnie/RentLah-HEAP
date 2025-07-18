import {
  AptType,
  MRT_LINES,
  PropertyType,
  FurnishingType,
  LeasePeriodType,
  ParkingType,
  GenderType,
  NationalityType,
  AmenityType,
  UtilityType,
} from "./constants";

export type Listing = {
  // Identifier
  id: string;
  description: string; // Brief description of the property

  // Property Details
  aptType: AptType;
  propertyType: PropertyType;

  // Room Configuration
  roomConfig: {
    bedrooms: number;
    bathrooms: number;
    study?: boolean;
    helper?: boolean; // Helper's room
    balcony?: boolean;
  };

  // Furnishing & Area
  furnishing: FurnishingType;
  sqft: number; // in square feet

  // Location & Accessibility
  address: {
    blk: number;
    street: string;
    postalCode: string;
    floor?: number;
    unit?: number;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  nearbyMRT: MRTInfo[];

  facilities?: string[]; // ["Swimming Pool", "Gym", "Tennis Court", "BBQ Pit", "Playground"]

  parking: {
    available: boolean;
    type?: ParkingType;
    spaces?: number;
  };

  nearbyAmenities?: LocationInfo[]; // ["School", "Mall", "Hawker Centre", "Clinic", "Gym"]

  // Financial Terms
  perMonth: number;
  utilitiesIncluded: UtilityType[]; // e.g. ["PUB", "Internet", "AirCon Service"]
  deposit: number; // security deposit amount
  agentFee?: number;
  leasePeriod: LeasePeriodType;

  // Tenant Preferences
  tenantPreferences?: {
    gender?: GenderType;
    nationality?: NationalityType;
    occupation?: string[];
    maxOccupants: number;
  };

  images: string[]; // Array of image URLs

  userId: string; // User ID of the person who created the listing
  createdAt: Date; // Timestamp of when the listing was created
  updatedAt: Date; // Timestamp of when the listing was last updated
  isActive: boolean; // Whether the listing is currently active
  isFeatured: boolean; // Whether the listing is featured
  isVerified: boolean; // Whether the listing has been verified by an admin
  availableFrom: Date; // Date property for when the property is available from

  // Travel times to universities (precomputed, JSON object: { [postalCode]: { distanceKm, durationMin } })
  universityTravelTimes?: Record<
    string,
    { distanceKm: number; durationMin: number }
  >;
};

export type MRTLine = (typeof MRT_LINES)[number];

export type MRTInfo = {
  name: string;
  line: [MRTLine, ...MRTLine[]]; // ensure at least one line is added
  distance: number; // in meters
};

export type LocationInfo = {
  name: string;
  distance: number; // in meters
  type: AmenityType; // "School" | "Mall" | "Hawker Centre" | "Clinic" | "Gym", ...
};

export interface AddPropertyFormState {
  id?: string;
  addressBlk: string;
  addressStreet: string;
  addressPostalCode: string;
  addressFloor: string;
  addressUnit: string;
  coordinatesLat: string;
  coordinatesLng: string;
  description: string;
  aptType: string;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  hasStudy: boolean;
  hasHelper: boolean;
  hasBalcony: boolean;
  furnishing: string;
  sqft: number;
  facilities: string[];
  parkingAvailable: boolean;
  parkingType: string;
  parkingSpaces: string;
  nearbyAmenities: LocationInfo[];
  perMonth: number;
  utilitiesIncluded: UtilityType[];
  securityDeposit: number;
  agentFee: number;
  leasePeriod: string;
  preferredGender: string;
  preferredNationality: string;
  preferredOccupation: string;
  maxOccupants: string;
  isActive: boolean;
  isFeatured: boolean;
  isVerified: boolean;
  universityTravelTimes: string;
  userId: string;
  availableFrom: string;
}

export interface ListingFilters {
  id?: string;
  university?: string;
  propertyType?: PropertyType;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number[];
  furnishing?: FurnishingType[];
  amenities?: string[];
  distanceFromUniversity?: number;
  isVerified?: boolean;
  isFeatured?: boolean;
}
