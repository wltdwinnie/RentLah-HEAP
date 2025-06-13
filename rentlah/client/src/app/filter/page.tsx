"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { UniversityDropdown } from "@/components/features/university-select";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { sampleListings } from "@/lib/sample-data";
import { UNIVERSITIES } from "@/lib/constants";
import { Listing } from "@/lib/definition";
import { PropertyCardGroup } from "@/components/propertycard-group";
import { AppSidebar } from "@/components/features/filter/app-sidebar";

export default function FilterPage() {
  const searchParams = useSearchParams();
  const [selectedUniversity, setSelectedUniversity] =
    useState<string>("Select University");

  // Utility function to convert short name to full format
  const getFullUniversityName = (shortName: string) => {
    if (shortName === "Select University") return shortName;
    const university = UNIVERSITIES.find((uni) => uni.shortName === shortName);
    return university
      ? `${university.name} (${university.shortName})`
      : shortName;
  };

  // Update selected university when URL parameter changes
  useEffect(() => {
    const uniParam = searchParams.get("university");
    if (uniParam) {
      const decodedUni = decodeURIComponent(uniParam);
      setSelectedUniversity(getFullUniversityName(decodedUni));
    }
  }, [searchParams]);

  const handleUniversityChange = (uni: string) => {
    setSelectedUniversity(uni);
  };

  // Filter listings based on selected university
  // const filteredListings = sampleListings.filter((listing) =>
  //   selectedUniversity === "Select University" ? true : listing.university === selectedUniversity
  // ) as Listing[];
  const filteredListings = sampleListings as Listing[];

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
      <div className="pt-10 p-4">
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
