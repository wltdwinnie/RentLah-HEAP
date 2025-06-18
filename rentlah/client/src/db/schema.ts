import {
  integer,
  pgTable,
  varchar,
  text,
  boolean,
  jsonb,
  decimal,
  pgEnum,
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


export const listingTable = pgTable("listing", {
  // Identifier
  id: varchar({ length: 255 }).primaryKey(),
  description: text().notNull(),

  // Property Details
  aptType: aptTypeEnum().notNull(),
  propertyType: propertyTypeEnum().notNull(),

  // Room Configuration
  bedrooms: integer().notNull(),
  bathrooms: integer().notNull(),
  hasStudy: boolean().default(false),
  hasHelper: boolean().default(false),
  hasBalcony: boolean().default(false),

  // Furnishing & Area
  furnishing: furnishingEnum().notNull(),
  sqft: integer().notNull(),

  // Location & Address
  addressBlk: integer().notNull(),
  addressStreet: varchar({ length: 255 }).notNull(),
  addressPostalCode: varchar({ length: 6 }).notNull(),
  addressFloor: integer(),
  addressUnit: integer(),

  // Nearby MRT (stored as JSONB for flexibility)
  nearbyMRT: jsonb()
    .$type<
      Array<{
        name: string;
        line: string;
        distance: number;
      }>
    >()
    .notNull(),

  // Facilities (array of strings)
  facilities: jsonb().$type<string[]>(),

  // Parking
  parkingAvailable: boolean().notNull(),
  parkingType: parkingTypeEnum(),
  parkingSpaces: integer(),

  // Nearby Amenities
  nearbyAmenities: jsonb().$type<
    Array<{
      name: string;
      distance: number;
      type: string;
    }>
  >(),

  // Financial Terms
  perMonth: decimal({ precision: 10, scale: 2 }).notNull(),
  utilitiesIncluded: jsonb().$type<string[]>().notNull(),
  securityDeposit: decimal({ precision: 10, scale: 2 }).notNull(),
  agentFee: decimal({ precision: 10, scale: 2 }),
  leasePeriod: leasePeriodEnum().notNull(),

  // Tenant Preferences
  preferredGender: genderEnum(),
  preferredNationality: nationalityEnum(),
  preferredOccupation: jsonb().$type<string[]>(),
  maxOccupants: integer().notNull(),

  // Images
  images: jsonb().$type<string[]>().notNull(),

  // Timestamps
  createdAt: integer().notNull().default(Date.now()),
  updatedAt: integer().notNull().default(Date.now()),
});

export type InsertListing = typeof listingTable.$inferInsert;
export type SelectListing = typeof listingTable.$inferSelect;
