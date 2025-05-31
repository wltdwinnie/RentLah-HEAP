"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import { CheckboxGroup } from "./checkbox-group";
import { useState } from "react";

// Filter options
const PROPERTY_TYPES = [
  { id: "hdb", label: "HDB" },
  { id: "condo", label: "Condo" },
  { id: "landed", label: "Landed" },
];

const AMENITIES = [
  { id: "parking", label: "Parking" },
  { id: "pool", label: "Swimming Pool" },
  { id: "gym", label: "Gym" },
  { id: "security", label: "24/7 Security" },
  { id: "aircon", label: "Air Conditioning" },
];

export function AppSidebar() {
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>(
    []
  );
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const clearAll = () => {
    setSelectedPropertyTypes([]);
    setSelectedAmenities([]);
  };

  return (
    <Sidebar collapsible="offcanvas">
      <div className="flex flex-col mt-[64px]">
        <SidebarHeader className="pl-4 py-3 border-b">
          <div className="flex items-center justify-between">
            <span className="font-medium">Filters</span>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-gray-700 text-sm h-7"
              onClick={clearAll}
            >
              Clear All
            </Button>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <CheckboxGroup
                title="Property Type"
                options={PROPERTY_TYPES}
                selectedValues={selectedPropertyTypes}
                onChange={setSelectedPropertyTypes}
              />
            </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupContent>
                <CheckboxGroup
                  title="Amenities"
                  options={AMENITIES}
                  selectedValues={selectedAmenities}
                  onChange={setSelectedAmenities}
                />
              </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
      </div>
    </Sidebar>
  );
}
