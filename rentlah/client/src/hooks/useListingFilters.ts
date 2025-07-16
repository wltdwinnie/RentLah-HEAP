"use client";

import {
  useQueryStates,
  parseAsString,
  parseAsInteger,
  parseAsArrayOf,
} from "nuqs";
import { AmenityType, UNIVERSITIES } from "@/lib/constants";
import { Listing } from "@/lib/definition";
import { parseDistanceFilter } from "@/lib/distance-utils";


/**
 * Comprehensive filtering hook using nuqs for robust search params management
 * Handles multiple filter parameters with type safety and URL synchronization
 */
export function useListingFilters() {
  // Define all possible filters with nuqs
  const [filters, setFilters] = useQueryStates({
    university: parseAsString.withDefault(""),
    propertyType: parseAsString.withDefault(""),
    minPrice: parseAsInteger.withDefault(0),
    maxPrice: parseAsInteger.withDefault(0),
    bedrooms: parseAsArrayOf(parseAsString).withDefault([]),
    furnishing: parseAsArrayOf(parseAsString).withDefault([]),
    amenities: parseAsArrayOf(parseAsString).withDefault([]),
    distanceFromUniversity: parseAsString.withDefault(""),
  });

  // Utility function to convert short name to full format
  const getFullUniversityName = (shortname: string) => {
    if (!shortname) return "Select University";
    const university = UNIVERSITIES.find((uni) => uni.shortname === shortname);
    return university
      ? `${university.name} (${university.shortname})`
      : "Select University";
  };

  // University-specific handlers
  const selectedUniversity = getFullUniversityName(filters.university);

  const handleUniversityChange = (uni: string) => {
    if (uni === "Select University") {
      setFilters({ university: "" });
    } else {
      // Extract short name for clean URLs
      const match = uni.match(/\(([^)]+)\)/);
      const shortname = match ? match[1] : uni;
      setFilters({ university: shortname });
    }
  };

  // Property type handler
  const handlePropertyTypeChange = (type: string) => {
    setFilters({ propertyType: type === "All" ? "" : type });
  };

  // Price range handlers
  const handlePriceRangeChange = (min: number, max: number) => {
    setFilters({
      minPrice: min || 0,
      maxPrice: max || 0,
    });
  };

  // Bedroom count handler (now supports multiple selections)
  const handleBedroomChange = (bedrooms: string[]) => {
    setFilters({ bedrooms });
  };

  // Furnishing handler (now supports multiple selections)
  const handleFurnishingChange = (furnishing: string[]) => {
    setFilters({ furnishing });
  };

  // Amenities handler
  const handleAmenitiesChange = (amenities: string[]) => {
    setFilters({ amenities });
  };

  // Distance from university handler
  const handleDistanceFromUniversityChange = (distance: string) => {
    setFilters({ distanceFromUniversity: distance });
  };

  // Clear all filters
  const clearAllFilters = () => {
    setFilters({
      university: "",
      propertyType: "",
      minPrice: 0,
      maxPrice: 0,
      bedrooms: [],
      furnishing: [],
      amenities: [],
      distanceFromUniversity: "",
    });
  };

  // Clear specific filter
  const clearFilter = (filterKey: keyof typeof filters) => {
    if (filterKey === "amenities" || filterKey === "bedrooms" || filterKey === "furnishing") {
      setFilters({ [filterKey]: [] });
    } else if (
      filterKey === "minPrice" ||
      filterKey === "maxPrice"
    ) {
      setFilters({ [filterKey]: 0 });
    } else {
      setFilters({ [filterKey]: "" });
    }
  };

  // Filter function for listings (uses precomputed travel times)
  const filterListings = (listings: Listing[]) => {
    return listings.filter((listing) => {
      // University filter
      if (filters.university) {
        const hasUniversity = listing.nearbyAmenities?.some(
          (amenity) =>
            amenity.type === "School" && amenity.name === filters.university
        );
        if (!hasUniversity) return false;
      }

      // Property type filter
      if (
        filters.propertyType &&
        listing.propertyType !== filters.propertyType
      ) {
        return false;
      }

      // Price range filter
      if (filters.minPrice > 0 && listing.perMonth < filters.minPrice) {
        return false;
      }
      if (filters.maxPrice > 0 && listing.perMonth > filters.maxPrice) {
        return false;
      }

      // Bedroom count filter (supports multiple bedroom counts)
      if (filters.bedrooms.length > 0) {
        const hasMatchingBedrooms = filters.bedrooms.some(
          (bedroomCount) => listing.roomConfig.bedrooms === parseInt(bedroomCount)
        );
        if (!hasMatchingBedrooms) return false;
      }

      // Furnishing filter (supports multiple furnishing types)
      if (filters.furnishing.length > 0) {
        const hasMatchingFurnishing = filters.furnishing.includes(listing.furnishing);
        if (!hasMatchingFurnishing) return false;
      }

      // Amenities filter
      if (filters.amenities.length > 0) {
        const listingFacilities = listing.facilities || [];
        const hasAllAmenities = filters.amenities.every((amenity) =>
          listingFacilities.includes(amenity as AmenityType)
        );
        if (!hasAllAmenities) return false;
      }

      // Distance from university filter (use precomputed travel times)
      if (filters.university) {
        const maxTravelTime = parseDistanceFilter(filters.distanceFromUniversity) ?? 60;
        const travelTimes = listing.universityTravelTimes || {};
        const uniTime = travelTimes[filters.university];
        if (!uniTime || uniTime.durationMin > maxTravelTime) return false;
      }

      return true;
    });
  };

  // Get active filter count
  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.university) count++;
    if (filters.propertyType) count++;
    if (filters.minPrice > 0 || filters.maxPrice > 0) count++;
    if (filters.bedrooms.length > 0) count++;
    if (filters.furnishing.length > 0) count++;
    if (filters.amenities.length > 0) count++;
    if (filters.distanceFromUniversity) count++;
    return count;
  };

  // Check if any filters are active
  const hasActiveFilters = getActiveFilterCount() > 0;

  return {
    // Current filter values
    filters,
    selectedUniversity,

    // Individual filter handlers
    handleUniversityChange,
    handlePropertyTypeChange,
    handlePriceRangeChange,
    handleBedroomChange,
    handleFurnishingChange,
    handleAmenitiesChange,
    handleDistanceFromUniversityChange,

    // Utility functions
    filterListings,
    clearAllFilters,
    clearFilter,
    getActiveFilterCount,
    hasActiveFilters,

    // Backward compatibility
    getSelectedShortName: () => filters.university || null,
    isUniversitySelected: Boolean(filters.university),
    clearUniversityFilter: () => clearFilter("university"),
    
    // Legacy single-value handlers for backward compatibility
    handleBedroomChangeLegacy: (count: number) => {
      handleBedroomChange(count > 0 ? [count.toString()] : []);
    },
    handleFurnishingChangeLegacy: (furnishing: string) => {
      handleFurnishingChange(furnishing ? [furnishing] : []);
    },
  };
}
