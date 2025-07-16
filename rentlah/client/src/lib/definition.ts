import { AptType, MRT_LINES, PropertyType, FurnishingType, LeasePeriodType, ParkingType, GenderType, NationalityType, AmenityType } from "./constants";

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

  facilities?: AmenityType[]; // ["Swimming Pool", "Gym", "Tennis Court", "BBQ Pit", "Playground"]

  parking: {
    available: boolean;
    type?: ParkingType;
    spaces?: number;
  };

  nearbyAmenities?: LocationInfo[]; // ["School", "Mall", "Hawker Centre", "Clinic", "Gym"]

  // Financial Terms
  perMonth: number;
  utilities: {
    included: string[]; // ["Water", "Electricity", "Internet", "Cable TV"]
    deposit: number; // security deposit amount
    agentFee?: number;
  };
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
  availableFrom?: Date | string; // Date property for when the property is available from

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
  type: "School" | "Mall" | "Hawker Centre" | "Clinic" | "Gym";
};

export interface AddPropertyFormState {
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
  sqft: string;
  facilities: string;
  parkingAvailable: boolean;
  parkingType: string;
  parkingSpaces: string;
  nearbyAmenities: any[];
  perMonth: string;
  utilitiesIncluded: string;
  securityDeposit: string;
  agentFee: string;
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
