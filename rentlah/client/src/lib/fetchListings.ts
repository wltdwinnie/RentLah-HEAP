import { Listing, ListingFilters } from "@/lib/definition";
import { FurnishingType, PropertyType } from "./constants";


function getApiUrl(path: string) {
  if (typeof window === "undefined") {
    const base =
      process.env.BASE_URL ||
      process.env.VERCEL_URL ||
      "http://localhost:3000";
    const url = base.startsWith("http") ? base : `https://${base}`;
    const fullUrl = `${url}${path}`;
    if (process.env.NODE_ENV === 'development') {
      console.log("[fetchListings] Server-side fetch URL:", fullUrl);
    }
    return fullUrl;
  }
  return path;
}

import { sampleListings } from "./sample-data";

export async function fetchListings(
  filters: ListingFilters
): Promise<Listing[]> {
  try {
    const res = await fetch(getApiUrl("/api/listings/filter"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: filters.id || undefined,
        university: filters.university,
        propertyType: (filters.propertyType as PropertyType) ?? undefined,
        minPrice: filters.minPrice || undefined,
        maxPrice: filters.maxPrice || undefined,
        bedrooms:
          filters.bedrooms && filters.bedrooms.length > 0
            ? filters.bedrooms.map(Number)
            : undefined,
        furnishing:
          filters.furnishing && filters.furnishing.length > 0
            ? (filters.furnishing as FurnishingType[])
            : undefined,
        amenities:
          filters.amenities && filters.amenities.length > 0
            ? filters.amenities
            : undefined,
        distanceFromUniversity: filters.distanceFromUniversity
          ? Number(filters.distanceFromUniversity)
          : undefined,
        isVerified:
          typeof filters.isVerified === "boolean"
            ? filters.isVerified
            : undefined,
        isFeatured:
          typeof filters.isFeatured === "boolean"
            ? filters.isFeatured
            : undefined,
      }),
    });
    
    if (!res.ok) throw new Error("Failed to fetch listings");
    const data = await res.json();
    return Array.isArray(data) ? data : [] as Listing[];
  } catch (error) {
    console.error("Error fetching listings, using sample data:", error);
    
    // Filter sample data based on featured flag
    if (filters.isFeatured) {
      return sampleListings.filter((_, index) => index < 6); // Return first 6 as featured
    }
    
    return sampleListings;
  }
}

