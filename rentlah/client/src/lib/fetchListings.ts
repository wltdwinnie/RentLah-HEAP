import { Listing } from "@/lib/definition";

export interface ListingFilters {
  university?: string;
  propertyType?: "HDB" | "Condo" | "Landed";
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number[];
  furnishing?: ("Unfurnished" | "Partially Furnished" | "Fully Furnished")[];
  amenities?: string[];
  distanceFromUniversity?: number;
}

export async function fetchListings(filters: ListingFilters): Promise<Listing[]> {
  const res = await fetch("/api/listings/filter", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      university: filters.university,
      propertyType: ["HDB", "Condo", "Landed"].includes(filters.propertyType as string)
        ? (filters.propertyType as "HDB" | "Condo" | "Landed")
        : undefined,
      minPrice: filters.minPrice || undefined,
      maxPrice: filters.maxPrice || undefined,
      bedrooms: filters.bedrooms && filters.bedrooms.length > 0 ? filters.bedrooms.map(Number) : undefined,
      furnishing:
        filters.furnishing && filters.furnishing.length > 0
          ? (filters.furnishing as ("Unfurnished" | "Partially Furnished" | "Fully Furnished")[])
          : undefined,
      amenities: filters.amenities && filters.amenities.length > 0 ? filters.amenities : undefined,
      distanceFromUniversity: filters.distanceFromUniversity
        ? Number(filters.distanceFromUniversity)
        : undefined,
    }),
  });
  if (!res.ok) throw new Error("Failed to fetch listings");
  return res.json();
}
