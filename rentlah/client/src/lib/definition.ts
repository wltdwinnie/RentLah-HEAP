export type Listing = {
  // Identifier
  id: string;
  description: string; // Brief description of the property

  // Property Details
  aptType:
    | "executive"
    | "studio-apartment"
    | "studio"
    | "1-bedroom"
    | "2-bedroom"
    | "3-bedroom"
    | "4-bedroom"
    | "5-bedroom"
    | "penthouse"
    | "semi-detached"
    | "detached";

  propertyType: "HDB" | "Condo" | "Landed";

  // Room Configuration
  roomConfig: {
    bedrooms: number;
    bathrooms: number;
    study?: boolean;
    helper?: boolean; // Helper's room
    balcony?: boolean;
  };

  // Furnishing & Area
  furnishing: "Unfurnished" | "Partially Furnished" | "Fully Furnished";
  sqft: number; // in square feet

  // Location & Accessibility
  address: {
    blk: number;
    street: string;
    postalCode: string; // Singapore postal codes should be strings to preserve leading zeros
    floor?: number;
    unit?: number;
  };
  nearbyMRT: MRTInfo[];

  facilities?: string[]; // ["Swimming Pool", "Gym", "Tennis Court", "BBQ Pit", "Playground"]

  parking?: {
    available: boolean;
    type?: "Covered" | "Open" | "Mechanical";
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
  leasePeriod: "long-term" | "short-term";

  // Tenant Preferences
  tenantPreferences?: {
    gender?: "Male" | "Female" | "No Preference";
    nationality?: "Singaporean/PR" | "Foreigner" | "No Preference";
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
};

export type MRTInfo = {
  name: string;
  line:
    | "red-northsouth"
    | "green-eastwest"
    | "brown-thomson-east-coast"
    | "purple-northeast"
    | "yellow-circle"
    | "blue-downtown";
  distance: number; // in meters
};

export type LocationInfo = {
  name: string;
  distance: number; // in meters
  type: "School" | "Mall" | "Hawker Centre" | "Clinic" | "Gym";
};
