"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { UniversityDropdown } from "@/components/quickfilters/university-filter";
import { PropertyTypeFilter } from "@/components/quickfilters/property-type-filter";
import { PriceRangeFilter } from "@/components/quickfilters/price-range-filter";
import { Suspense } from "react";
import { sampleListings } from "@/lib/sample-data";
import { Listing } from "@/lib/definition";
import { PropertyCardGroup } from "@/components/propertycard-group";
import { AppSidebar } from "@/components/advancedfilters/app-sidebar";
import { useListingFilters } from "@/hooks/useListingFilters";

export default function FilterPage() {
  const {
    selectedUniversity,
    handleUniversityChange,
    handlePropertyTypeChange,
    handlePriceRangeChange,
    filterListings,
    getActiveFilterCount,
    hasActiveFilters,
    clearAllFilters,
    filters,
  } = useListingFilters();

  // Apply all filters to the listings
  const filteredListings = filterListings(sampleListings);
  const activeFilterCount = getActiveFilterCount();

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <div className="pt-10 p-4">
          <div className="flow-root">
            <SidebarTrigger className="float-left" />

            {/* Filter status and clear button */}
            {hasActiveFilters && (
              <div className="float-left ml-4 flex items-center gap-2">
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

            <div className="float-right flow-root">
              <div className="float-left pl-2 pt-1.5 font-medium">Filters:</div>
              <div className="float-right flex gap-2 pl-2">
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
            {filteredListings.length}{" "}
            {filteredListings.length === 1 ? "result" : "results"} found
          </div>
          <Suspense fallback={<div className="center">Loading...</div>}>
            <div className="pt-5">
              <PropertyCardGroup listings={filteredListings as Listing[]} />
            </div>
          </Suspense>
        </div>
      </SidebarProvider>
    </>
  );
}
