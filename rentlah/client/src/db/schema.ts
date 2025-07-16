import {
  integer,
  pgTable,
  varchar,
  text,
  boolean,
  jsonb,
  decimal,
  pgEnum,
  timestamp,
} from "drizzle-orm/pg-core";

// Define enums for better type safety
export const aptTypeEnum = pgEnum("apt_type", [
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
]);

export const propertyTypeEnum = pgEnum("property_type", [
  "HDB",
  "Condo",
  "Landed",
]);

export const furnishingEnum = pgEnum("furnishing", [
  "Unfurnished",
  "Partially Furnished",
  "Fully Furnished",
]);

export const leasePeriodEnum = pgEnum("lease_period", [
  "long-term",
  "short-term",
]);

export const genderEnum = pgEnum("gender", ["Male", "Female", "No Preference"]);

export const nationalityEnum = pgEnum("nationality", [
  "Singaporean/PR",
  "Foreigner",
  "No Preference",
]);

export const mrtLineEnum = pgEnum("mrt_line", [
  "red-northsouth",
  "green-eastwest",
  "brown-thomson-east-coast",
  "purple-northeast",
  "yellow-circle",
  "blue-downtown",
]);

export const parkingTypeEnum = pgEnum("parking_type", [
  "Covered",
  "Open",
  "Mechanical",
]);

export const amenityTypeEnum = pgEnum("amenity_type", [
  "School",
  "Mall",
  "Hawker Centre",
  "Clinic",
  "Gym",
]);

export const listings = pgTable("listing", {
  // Identifier
  id: varchar({ length: 255 }).primaryKey(),
  description: text().notNull(),

  // User relationship
  userId: text("user_id").notNull(),

  // Property Details
  aptType: aptTypeEnum("apt_type").notNull(),
  propertyType: propertyTypeEnum("property_type").notNull(),

  // Room Configuration
  bedrooms: integer().notNull(),
  bathrooms: integer().notNull(),
  hasStudy: boolean("has_study").default(false),
  hasHelper: boolean("has_helper").default(false),
  hasBalcony: boolean("has_balcony").default(false),

  // Furnishing & Area
  furnishing: furnishingEnum().notNull(),
  sqft: integer("sq_ft").notNull(),

  // Location & Address
  addressBlk: integer("address_blk").notNull(),
  addressStreet: varchar("address_street", { length: 255 }).notNull(),
  addressPostalCode: varchar("address_postal_code", { length: 12 }).notNull(),
  addressFloor: integer("address_floor"),
  addressUnit: integer("address_unit"),
  coordinates: jsonb("coordinates")
    .$type<{ lat: number; lng: number }>()
    .notNull(),

  // Nearby MRT (stored as JSONB for flexibility)
  nearbyMRT: jsonb("nearby_mrt")
    .$type<
      Array<{
        name: string;
        line: string[]; // Changed from string to string[] to match MRTInfo type
        distance: number;
      }>
    >()
    .notNull(),

  // Facilities (array of strings)
  facilities: jsonb().$type<string[]>(),

  // Parking
  parkingAvailable: boolean("parking_available"),
  parkingType: parkingTypeEnum("parking_type"),
  parkingSpaces: integer("parking_spaces").default(0),

  // Nearby Amenities
  nearbyAmenities: jsonb("nearby_amenities").$type<
    Array<{
      name: string;
      distance: number;
      type: "School" | "Mall" | "Hawker Centre" | "Clinic" | "Gym"; // Updated to match LocationInfo type
    }>
  >(),

  // Financial Terms
  perMonth: decimal("per_month", { precision: 10, scale: 2 }).notNull(),
  utilitiesIncluded: jsonb("utilities_included").$type<string[]>().notNull(),
  securityDeposit: decimal("security_deposit", {
    precision: 10,
    scale: 2,
  }).notNull(),
  agentFee: decimal("agent_fee", { precision: 10, scale: 2 }),
  leasePeriod: leasePeriodEnum("lease_period").notNull(),

  // Tenant Preferences
  preferredGender: genderEnum("preferred_gender"),
  preferredNationality: nationalityEnum("preferred_nationality"),
  preferredOccupation: jsonb("preferred_occupation").$type<string[]>(),
  maxOccupants: integer("max_occupants").notNull(),

  // Images
  images: jsonb().$type<string[]>().notNull(),

  // Status and Metadata
  isActive: boolean("is_active").notNull().default(true),
  isFeatured: boolean("is_featured").notNull().default(false),
  isVerified: boolean("is_verified").notNull().default(false),

  // Timestamps
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),

  // University travel times
  universityTravelTimes: jsonb("university_travel_times").$type<
    Record<string, { distanceKm: number; durationMin: number }>
  >(),
});

export type InsertListing = typeof listings.$inferInsert;
export type SelectListing = typeof listings.$inferSelect;

export const universities = pgTable("university", {
  postalCode: text("postal_code").notNull(), // allow up to 12 chars for university postal codes
  name: varchar("name", { length: 255 }).notNull(),
  shortname: varchar("short_name", { length: 50 }).notNull(),
  coordinates: jsonb("coordinates")
    .$type<{
      latitude: number;
      longitude: number;
    }>()
    .notNull(),
});

export type InsertUniversity = typeof universities.$inferInsert;
export type SelectUniversity = typeof universities.$inferSelect;
