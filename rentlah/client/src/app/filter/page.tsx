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

export default function FilterPage() {
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

  const fetchListings = async () => {
    setLoading(true);
    const res = await fetch("/api/listings/filter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
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
      }),
    });
    const dbListings = await res.json();
    setListings(dbListings);
    setLoading(false);
  };

  const debouncedFetchListings = useDebouncedCallback(fetchListings, 400);

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
          <div className="flex justify-between items-center w-full min-h-[40px]">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="h-9 w-9 border border-gray-400 bg-white hover:bg-gray-50" />
              
              {/* Filter status and clear button */}
              {hasActiveFilters && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">
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

            <div className="flex items-center gap-2 ml-auto">
              <div className="font-medium whitespace-nowrap">Filters:</div>
              <UniversityDropdown
                value={selectedUniversity}
                onChange={handleUniversityChange}
              />
              <PropertyTypeFilter
                value={filters.propertyType}
                onChange={handlePropertyTypeChange}
              />
              <PriceRangeFilter
                minPrice={filters.minPrice}
                maxPrice={filters.maxPrice}
                onChange={handlePriceRangeChange}
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
            {loading ? "Loading..." : `${listings.length} ${listings.length === 1 ? "result" : "results"} found`}
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
