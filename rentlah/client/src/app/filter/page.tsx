"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { UniversityDropdown } from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { sampleListings } from "@/lib/sample-data";
import { Listing } from "@/lib/definition";
import { PropertyCardGroup } from "@/components/propertycard-group";

export default function FilterPage() {
  const [selectedUniversity, setSelectedUniversity] =
    useState<string>("Select University");

  const handleUniversityChange = (uni: string) => {
    setSelectedUniversity(uni);
  };

  return (
    <>
      <div className="p-4">
        <div className="flow-root">
          <SidebarTrigger className="float-left" />
          <div className="float-right flow-root">
            <div className="float-left pl-2 pt-1.5 font-medium">
              Selected University:
            </div>
            <div className="float-right pl-2">
              <UniversityDropdown
                value={selectedUniversity}
                onChange={handleUniversityChange}
              />
            </div>
          </div>
        </div>
        <div className="pt-5 font-medium">Filtered Results</div>
        <div className="mt-2 text-sm text-gray-800">... results found</div>
        <div className="pt-5">
          <PropertyCardGroup listings={sampleListings as Listing[]} />
        </div>
      </div>
    </>
  );
}
