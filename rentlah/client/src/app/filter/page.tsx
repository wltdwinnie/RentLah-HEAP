"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { UniversityDropdown } from "@/components/quickfilters/university-filter";
import { PropertyTypeFilter } from "@/components/quickfilters/property-type-filter";
import { PriceRangeFilter } from "@/components/quickfilters/price-range-filter";
import { Suspense, useEffect, useState } from "react";
import { Listing } from "@/lib/definition";
import { PropertyCardGroup } from "@/components/propertycard-group";
import { AppSidebar } from "@/components/advancedfilters/app-sidebar";
import { useListingFilters } from "@/hooks/useListingFilters";
import { useDebouncedCallback } from "use-debounce";
import { fetchListings as fetchListingsApi } from "@/lib/fetchListings";

// Create a client component that uses the hook
function FilterPageClient() {
  const {
    selectedUniversity,
    handleUniversityChange,
    handlePropertyTypeChange,
    handlePriceRangeChange,
    getActiveFilterCount,
    hasActiveFilters,
    clearAllFilters,
    filters,
  } = useListingFilters();

  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAndSetListings = async () => {
    setLoading(true);
    try {
      // Map filters to ListingFilters type
      const mappedFilters = {
        university: filters.university,
        propertyType: ["HDB", "Condo", "Landed"].includes(filters.propertyType)
          ? (filters.propertyType as "HDB" | "Condo" | "Landed")
          : undefined,
        minPrice: filters.minPrice || undefined,
        maxPrice: filters.maxPrice || undefined,
        bedrooms: filters.bedrooms.length > 0 ? filters.bedrooms.map(Number) : undefined,
        furnishing:
          filters.furnishing.length > 0
            ? (filters.furnishing as ("Unfurnished" | "Partially Furnished" | "Fully Furnished")[])
            : undefined,
        amenities: filters.amenities.length > 0 ? filters.amenities : undefined,
        distanceFromUniversity: filters.distanceFromUniversity
          ? Number(filters.distanceFromUniversity)
          : undefined,
      } as const;
      const dbListings = await fetchListingsApi(mappedFilters);
      setListings(dbListings);
    } catch {
      setListings([]);
    }
    setLoading(false);
  };

  const debouncedFetchListings = useDebouncedCallback(fetchAndSetListings, 400);

  useEffect(() => {
    debouncedFetchListings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const activeFilterCount = getActiveFilterCount();

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="flex w-full">
        <AppSidebar />
        <main className="pt-5 p-4 w-full min-w-0">
          {/* Filter UI - Responsive Layout */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full min-h-[40px] gap-3 pb-3">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="h-8 w-8 md:h-9 md:w-9 border border-gray-400 bg-white dark:bg-zinc-900 hover:bg-gray-50 rounded-md flex items-center justify-center" />

              {/* Filter status and clear button */}
              {hasActiveFilters && (
                <div className="flex items-center gap-2">
                  <span className="text-xs md:text-sm text-gray-600">
                    {activeFilterCount} filter{activeFilterCount !== 1 ? "s" : ""}{" "}
                    active
                  </span>
                  <button
                    onClick={clearAllFilters}
                    className="text-xs text-blue-600 hover:text-blue-800 underline"
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>

            {/* Filter Controls - Scrollable on mobile */}
            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 no-scrollbar px-1">
              <div className="font-medium whitespace-nowrap text-xs md:text-sm flex-shrink-0">Filters:</div>
              <UniversityDropdown
                value={selectedUniversity}
                onChange={handleUniversityChange}
                className="flex-shrink-0"
              />
              <PropertyTypeFilter
                value={filters.propertyType}
                onChange={handlePropertyTypeChange}
                className="flex-shrink-0"
              />
              <PriceRangeFilter
                minPrice={filters.minPrice}
                maxPrice={filters.maxPrice}
                onChange={handlePriceRangeChange}
                className="flex-shrink-0"
              />
            </div>
          </div>
          <div className="pt-5 font-medium">
            Filtered Results
            {hasActiveFilters && (
              <span className="ml-2 text-sm font-normal text-gray-600">
                (with {activeFilterCount} filter
                {activeFilterCount !== 1 ? "s" : ""})
              </span>
            )}
          </div>
          <div className="mt-2 text-sm text-gray-800">
            {loading
              ? "Loading..."
              : `${listings.length} ${listings.length === 1 ? "result" : "results"} found`}
          </div>
          <Suspense fallback={<div className="center">Loading...</div>}>
            <div className="pt-5">
              <PropertyCardGroup listings={listings as Listing[]} />
            </div>
          </Suspense>
        </main>
      </div>
    </SidebarProvider>
  );
}

// Export the main page component with Suspense
export default function FilterPage() {
  return (
    <Suspense fallback={<div className="p-4">Loading filters...</div>}>
      <FilterPageClient />
    </Suspense>
  );
} 