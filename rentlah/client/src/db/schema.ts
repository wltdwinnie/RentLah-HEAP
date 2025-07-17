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
  numeric,
} from "drizzle-orm/pg-core";
import {
  AMENITY_TYPES,
  APT_TYPES,
  PROPERTY_TYPES,
  FURNISHING_TYPES,
  LEASE_PERIOD_TYPES,
  GENDER_TYPES,
  NATIONALITY_TYPES,
  PARKING_TYPES,
  UTILITIES,
} from "@/lib/constants";

// Define enums for better type safety
export const aptTypeEnum = pgEnum(
  "apt_type",
  APT_TYPES as readonly [string, ...string[]]
);
export const propertyTypeEnum = pgEnum(
  "property_type",
  PROPERTY_TYPES as readonly [string, ...string[]]
);
export const furnishingEnum = pgEnum(
  "furnishing",
  FURNISHING_TYPES as readonly [string, ...string[]]
);
export const leasePeriodEnum = pgEnum(
  "lease_period",
  LEASE_PERIOD_TYPES as readonly [string, ...string[]]
);
export const genderEnum = pgEnum(
  "gender",
  GENDER_TYPES as readonly [string, ...string[]]
);
export const nationalityEnum = pgEnum(
  "nationality",
  NATIONALITY_TYPES as readonly [string, ...string[]]
);
export const mrtLineEnum = pgEnum("mrt_line", [
  "red-northsouth",
  "green-eastwest",
  "brown-thomson-east-coast",
  "purple-northeast",
  "yellow-circle",
  "blue-downtown",
]);
export const parkingTypeEnum = pgEnum(
  "parking_type",
  PARKING_TYPES as readonly [string, ...string[]]
);
export const amenityTypeEnum = pgEnum(
  "amenity_type",
  AMENITY_TYPES as readonly [string, ...string[]]
);
export const utilitiesEnum = pgEnum(
  "utilities",
  UTILITIES as unknown as readonly [string, ...string[]]
);

export const listings = pgTable("listing", {
  // Identifier
  id: varchar("id", { length: 255 }).primaryKey(),
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
  furnishing: furnishingEnum("furnishing").notNull(),
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
      type: (typeof amenityTypeEnum.enumValues)[number];
    }>
  >(),

  // Financial Terms
  perMonth: decimal("per_month", { precision: 10, scale: 2 }).notNull(),
  utilitiesIncluded: utilitiesEnum("utilities_included").array().notNull(),
  deposit: numeric("security_deposit", { precision: 10, scale: 2 }).notNull(),
  agentFee: numeric("agent_fee", { precision: 10, scale: 2 }),
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
  availableFrom: timestamp("available_from").notNull(),

  // University travel times
  universityTravelTimes: jsonb("university_travel_times").$type<
    Record<string, { distanceKm: number; durationMin: number }>
  >(),
});

export type InsertListing = typeof listings.$inferInsert;
export type SelectListing = typeof listings.$inferSelect;

export const universities = pgTable("university", {
  postalCode: text("postal_code").notNull().primaryKey(), // allow up to 12 chars for university postal codes
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
