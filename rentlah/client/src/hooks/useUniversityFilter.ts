"use client";

import { useQueryState, parseAsString } from "nuqs";
import { UNIVERSITIES } from "@/lib/constants";

/**
 * Utility functions for university display formatting
 */
export const universityDisplayUtils = {
  // Convert short name to full format
  getFullUniversityName: (shortName: string) => {
    if (!shortName || shortName === "Select University")
      return "Select University";
    const university = UNIVERSITIES.find((uni) => uni.shortName === shortName);
    return university
      ? `${university.name} (${university.shortName})`
      : "Select University";
  },

  // Get display text based on screen size
  getDisplayText: (fullUniversityName: string, isMobile: boolean) => {
    if (fullUniversityName === "Select University") {
      return isMobile ? "University" : "Select University";
    }

    if (isMobile) {
      // Extract short name from full format "Name (SHORT)"
      const match = fullUniversityName.match(/\(([^)]+)\)/);
      return match ? match[1] : fullUniversityName;
    }

    return fullUniversityName;
  },

  // Get responsive display text (alias for getDisplayText for compatibility)
  getResponsiveDisplayText: (fullUniversityName: string, isMobile: boolean) => {
    if (fullUniversityName === "Select University") {
      return isMobile ? "University" : "Select University";
    }

    if (isMobile) {
      // Extract short name from full format "Name (SHORT)"
      const match = fullUniversityName.match(/\(([^)]+)\)/);
      return match ? match[1] : fullUniversityName;
    }

    return fullUniversityName;
  },

  // Get only short name for button display
  getShortNameOnly: (fullUniversityName: string) => {
    if (fullUniversityName === "Select University") {
      return "University";
    }
    
    // Extract short name from full format "Name (SHORT)"
    const match = fullUniversityName.match(/\(([^)]+)\)/);
    return match ? match[1] : fullUniversityName;
  },

  // Extract short name from full format
  extractShortName: (fullUniversityName: string) => {
    const match = fullUniversityName.match(/\(([^)]+)\)/);
    return match ? match[1] : fullUniversityName;
  },
};

/**
 * Custom hook to manage university filter state with nuqs
 * Provides robust search params management with type safety
 */
export function useUniversityFilter() {
  // Using nuqs for URL state management
  const [universityParam, setUniversityParam] = useQueryState(
    "university",
    parseAsString.withDefault("")
  );

  // Get the current selected university in full format
  const selectedUniversity =
    universityDisplayUtils.getFullUniversityName(universityParam);

  // Handler to update university filter
  const handleUniversityChange = (uni: string) => {
    if (uni === "Select University") {
      setUniversityParam(null); // Remove the parameter
    } else {
      // Extract short name for clean URLs
      const shortName = universityDisplayUtils.extractShortName(uni);
      setUniversityParam(shortName);
    }
  };

  // Clear filter
  const clearUniversityFilter = () => {
    setUniversityParam(null);
  };

  // Get current short name for filtering
  const getSelectedShortName = () => {
    return universityParam || null;
  };

  // Check if a university is selected
  const isUniversitySelected = Boolean(universityParam);

  return {
    selectedUniversity,
    handleUniversityChange,
    clearUniversityFilter,
    getSelectedShortName,
    isUniversitySelected,
    // Export utility functions for components to use
    utils: universityDisplayUtils,
  };
}
