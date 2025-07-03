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
import { useState } from "react";

export default function FilterPage() {
  const {
    selectedUniversity,
    handleUniversityChange,
    handlePropertyTypeChange,
    handlePriceRangeChange,
    filterListings,
    filterListingsWithGoogleAPI,
    getActiveFilterCount,
    hasActiveFilters,
    clearAllFilters,
    filters,
  } = useListingFilters();

  const [googleFilteredListings, setGoogleFilteredListings] = useState<Listing[] | null>(null);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [apiKey, setApiKey] = useState(""); // For demo, let user input API key

  // Apply all filters to the listings
  const filteredListings = filterListings(sampleListings);
  const activeFilterCount = getActiveFilterCount();

  const handleGoogleFilter = async () => {
    setLoadingGoogle(true);
    const result = await filterListingsWithGoogleAPI(sampleListings, apiKey);
    setGoogleFilteredListings(result);
    setLoadingGoogle(false);
  };

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
          <div className="flex items-center gap-2 mt-4">
            <input
              type="password"
              placeholder="Google Maps API Key"
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
              className="border px-2 py-1 rounded text-xs w-64"
            />
            <button
              onClick={handleGoogleFilter}
              disabled={!apiKey || loadingGoogle}
              className="ml-2 px-3 py-1 bg-blue-600 text-white rounded text-xs disabled:opacity-50"
            >
              {loadingGoogle ? "Filtering..." : "Filter with Google Travel Time"}
            </button>
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
            {(googleFilteredListings ?? filteredListings).length} { (googleFilteredListings ?? filteredListings).length === 1 ? "result" : "results" } found
          </div>
          <Suspense fallback={<div className="center">Loading...</div>}>
            <div className="pt-5">
              <PropertyCardGroup listings={(googleFilteredListings ?? filteredListings) as Listing[]} />
            </div>
          </Suspense>
        </main>
      </div>
    </SidebarProvider>
  );
}
