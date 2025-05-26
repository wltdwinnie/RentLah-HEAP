export type Listing = {
  // Identifier
  id: string;

  // Property Details
  aptType:
    | "1-room"
    | "2-room"
    | "2-room-flexi"
    | "3-room"
    | "4-room"
    | "5-room"
    | "executive"
    | "studio-apartment"
    | "3gen"
    | "dbss"
    | "executive-maisonette"
    | "jumbo-flat"
    | "terrace-3room"
    | "terrace-4room"
    | "studio"
    | "1-bedroom"
    | "2-bedroom"
    | "3-bedroom"
    | "4-bedroom"
    | "5-bedroom"
    | "penthouse"
    | "maisonette"
    | "duplex"
    | "terrace"
    | "corner-terrace"
    | "semi-detached"
    | "detached"
    | "bungalow"
    | "cluster-terrace"
    | "cluster-semi-detached"
    | "cluster-bungalow"
    | "good-class-bungalow"
    | "shophouse"
    | "conservation-shophouse"
    | "hudc-flat"
    | "walk-up-apartment"
    | "serviced-apartment";

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
    postalCode: number;
    floor?: number;
    unit?: number;
  };
  nearbyMRT: MRTInfo[];

  facilities?: string[]; // ["Swimming Pool", "Gym", "Tennis Court", "BBQ Pit", "Playground"]

  parking: {
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
