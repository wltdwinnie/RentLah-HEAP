"use client";

import {
  useQueryState,
  parseAsString,
  parseAsInteger,
  parseAsArrayOf,
  createParser
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
  const [university, setUniversity] = useQueryState('university', parseAsString.withDefault(""));
  const [propertyType, setPropertyType] = useQueryState('propertyType', parseAsString.withDefault(""));
  const [minPrice, setMinPrice] = useQueryState('minPrice', parseAsInteger.withDefault(0));
  const [maxPrice, setMaxPrice] = useQueryState('maxPrice', parseAsInteger.withDefault(0));
  const [bedrooms, setBedrooms] = useQueryState('bedrooms', parseAsArrayOf(parseAsString).withDefault([]));
  const [furnishing, setFurnishing] = useQueryState('furnishing', parseAsArrayOf(parseAsString).withDefault([]));
  const [amenities, setAmenities] = useQueryState('amenities', parseAsArrayOf(parseAsString).withDefault([]));
  const [distanceFromUniversity, setDistanceFromUniversity] = useQueryState('distanceFromUniversity', parseAsString.withDefault(""));
  
  // Combine all filters into a single object for easier access
  const filters = {
    university,
    propertyType,
    minPrice,
    maxPrice,
    bedrooms,
    furnishing,
    amenities,
    distanceFromUniversity,
  };

  // Utility function to convert short name to full format
  const getFullUniversityName = (shortname: string) => {
    if (!shortname) return "Select University";
    const university = UNIVERSITIES.find((uni) => uni.shortname === shortname);
    return university
      ? `${university.name} (${university.shortname})`
      : "Select University";
  };

  // University-specific handlers
  const selectedUniversity = getFullUniversityName(university);

  const handleUniversityChange = (uni: string) => {
    if (uni === "Select University") {
      setUniversity("");
    } else {
      // Extract short name for clean URLs
      const match = uni.match(/\(([^)]+)\)/);
      const shortname = match ? match[1] : uni;
      setUniversity(shortname);
    }
  };

  // Property type handler
  const handlePropertyTypeChange = (type: string) => {
    setPropertyType(type === "All" ? "" : type);
  };

  // Price range handlers
  const handlePriceRangeChange = (min: number, max: number) => {
    setMinPrice(min || 0);
    setMaxPrice(max || 0);
  };

  // Bedroom count handler (now supports multiple selections)
  const handleBedroomChange = (bedroomValues: string[]) => {
    setBedrooms(bedroomValues);
  };

  // Furnishing handler (now supports multiple selections)
  const handleFurnishingChange = (furnishingValues: string[]) => {
    setFurnishing(furnishingValues);
  };

  // Amenities handler
  const handleAmenitiesChange = (amenityValues: string[]) => {
    setAmenities(amenityValues);
  };

  // Distance from university handler
  const handleDistanceFromUniversityChange = (distance: string) => {
    setDistanceFromUniversity(distance);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setUniversity("");
    setPropertyType("");
    setMinPrice(0);
    setMaxPrice(0);
    setBedrooms([]);
    setFurnishing([]);
    setAmenities([]);
    setDistanceFromUniversity("");
  };

  // Clear specific filter
  const clearFilter = (filterKey: keyof typeof filters) => {
    if (filterKey === "amenities") {
      setAmenities([]);
    } else if (filterKey === "bedrooms") {
      setBedrooms([]);
    } else if (filterKey === "furnishing") {
      setFurnishing([]);
    } else if (filterKey === "minPrice") {
      setMinPrice(0);
    } else if (filterKey === "maxPrice") {
      setMaxPrice(0);
    } else if (filterKey === "university") {
      setUniversity("");
    } else if (filterKey === "propertyType") {
      setPropertyType("");
    } else if (filterKey === "distanceFromUniversity") {
      setDistanceFromUniversity("");
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
      }        // Bedroom count filter (supports multiple bedroom counts)
      if (filters.bedrooms.length > 0) {
        const hasMatchingBedrooms = filters.bedrooms.some(
          (bedroomCount: string) => listing.roomConfig.bedrooms === parseInt(bedroomCount)
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
        const hasAllAmenities = filters.amenities.every((amenity: string) =>
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
