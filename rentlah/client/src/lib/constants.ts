export const UNIVERSITIES = [
  {
    postalCode: "119077",
    name: "National University of Singapore",
    shortname: "NUS",
    coordinates: {
      latitude: 1.2976,
      longitude: 103.7767,
    },
  },
  {
    postalCode: "639798",
    name: "Nanyang Technological University",
    shortname: "NTU",
    coordinates: {
      latitude: 1.3406,
      longitude: 103.6838,
    },
  },
  {
    postalCode: "188065",
    name: "Singapore Management University",
    shortname: "SMU",
    coordinates: {
      latitude: 1.296568,
      longitude: 103.852119,
    },
  },
  {
    postalCode: "487372",
    name: "Singapore University of Technology and Design",
    shortname: "SUTD",
    coordinates: {
      latitude: 1.3413,
      longitude: 103.9638,
    },
  },
  {
    postalCode: "829834",
    name: "Singapore Institute of Technology",
    shortname: "SIT",
    coordinates: {
      latitude: 1.4136,
      longitude: 103.9123,
    },
  },
  {
    postalCode: "599494",
    name: "Singapore University of Social Sciences",
    shortname: "SUSS",
    coordinates: {
      latitude: 1.3292738,
      longitude: 103.7762131,
    },
  },
] as const;

export const MRT_LINES = [
  "red-northsouth",
  "green-eastwest",
  "brown-thomson-east-coast",
  "purple-northeast",
  "yellow-circle",
  "blue-downtown",
] as const;


export const DISTANCE_OPTIONS = [
  { value: "", label: "Any Distance" },
  { value: "15", label: "15 min" },
  { value: "30", label: "30 min" },
  { value: "45", label: "45 min" },
  { value: "60", label: "60 min" },
  { value: "60+", label: "60 min +" },
] as const;

// Apartment Types
export const APT_TYPES = [
  "executive",
  "studio-apartment",
  "studio",
  "1-bedroom",
  "2-bedroom",
  "3-bedroom",
  "4-bedroom",
  "5-bedroom",
  "penthouse",
  "semi-detached",
  "detached",
  "others",
] as const;
export type AptType = typeof APT_TYPES[number];

// Property Types
export const PROPERTY_TYPES = ["HDB", "Condo", "Landed"] as const;
export type PropertyType = typeof PROPERTY_TYPES[number];

// Furnishing Types
export const FURNISHING_TYPES = [
  "Unfurnished",
  "Partially Furnished",
  "Fully Furnished",
] as const;
export type FurnishingType = typeof FURNISHING_TYPES[number];

// Lease Period Types
export const LEASE_PERIOD_TYPES = ["long-term", "short-term"] as const;
export type LeasePeriodType = typeof LEASE_PERIOD_TYPES[number];

// Parking Types
export const PARKING_TYPES = ["Covered", "Open", "Mechanical"] as const;
export type ParkingType = typeof PARKING_TYPES[number];

// Gender Types
export const GENDER_TYPES = ["Male", "Female", "No Preference"] as const;
export type GenderType = typeof GENDER_TYPES[number];

// Nationality Types
export const NATIONALITY_TYPES = [
  "Singaporean/PR",
  "Foreigner",
  "No Preference",
] as const;
export type NationalityType = typeof NATIONALITY_TYPES[number];

// Amenity Types (for facilities)
export const AMENITY_TYPES = [
  "Swimming Pool",
  "Gym",
  "Tennis Court",
  "BBQ Pit",
  "Playground",
] as const;
export type AmenityType = typeof AMENITY_TYPES[number];