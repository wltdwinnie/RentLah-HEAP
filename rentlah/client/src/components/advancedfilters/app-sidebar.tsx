"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useListingFilters } from "@/hooks/useListingFilters";
import { CheckboxGroup } from "@/components/advancedfilters/checkbox-group";
import { PriceRangeGroup } from "@/components/advancedfilters/price-range-group";
import { FILTER_OPTIONS } from "@/lib/filter-utils";

export function AppSidebar() {
  const {
    clearAllFilters,
    filters,
    handleAmenitiesChange,
    handleFurnishingChange,
    handleBedroomChange,
    handlePriceRangeChange,
  } = useListingFilters();

  return (
    <Sidebar
      collapsible="offcanvas"
      className="[&>div:last-child]:top-[80px] [&>div:last-child]:h-[calc(100vh-80px)] z-30"
    >
      <div className="flex flex-col h-full">
        <SidebarHeader className="pl-4 py-3 border-b">
          <div className="flex items-center justify-between">
            <span className="font-medium">Advanced Filters</span>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-gray-700 text-sm h-7"
              onClick={clearAllFilters}
            >
              Clear All
            </Button>
          </div>
        </SidebarHeader>

        <SidebarContent className="overflow-y-auto">
          {/* Price Range Filter */}
          <SidebarGroup>
            <SidebarGroupContent>
              <PriceRangeGroup
                title="Price Range"
                value={[filters.minPrice || 0, filters.maxPrice || 5000]}
                onChange={(value) => handlePriceRangeChange(value[0], value[1])}
              />
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Amenities Filter */}
          <SidebarGroup>
            <SidebarGroupContent>
              <CheckboxGroup
                title="Amenities"
                options={FILTER_OPTIONS.AMENITIES}
                selectedValues={filters.amenities || []}
                onChange={handleAmenitiesChange}
              />
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Furnishing Filter (multi-selection) */}
          <SidebarGroup>
            <SidebarGroupContent>
              <CheckboxGroup
                title="Furnishing"
                options={FILTER_OPTIONS.FURNISHING}
                selectedValues={filters.furnishing || []}
                onChange={handleFurnishingChange}
              />
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Bedroom Count Filter (multi-selection) */}
          <SidebarGroup>
            <SidebarGroupContent>
              <CheckboxGroup
                title="Bedrooms"
                options={FILTER_OPTIONS.BEDROOMS}
                selectedValues={filters.bedrooms || []}
                onChange={handleBedroomChange}
              />
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </div>
    </Sidebar>
  );
}
