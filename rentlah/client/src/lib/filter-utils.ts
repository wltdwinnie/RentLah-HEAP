/**
 * Shared filter utilities and configurations for both quick and advanced filters
 */

// Shared filter option configurations
export const FILTER_OPTIONS = {
  AMENITIES: [
    { id: "Swimming Pool", label: "Swimming Pool" },
    { id: "Gym", label: "Gym/Fitness Center" },
    { id: "Tennis Court", label: "Tennis Court" },
    { id: "BBQ Pit", label: "BBQ Pit" },
    { id: "Children's Playground", label: "Children's Playground" },
    { id: "Private Garden", label: "Private Garden" },
    { id: "Sky Garden", label: "Sky Garden" },
    { id: "Jacuzzi", label: "Jacuzzi" },
  ],

  FURNISHING: [
    { id: "Fully Furnished", label: "Fully Furnished" },
    { id: "Partially Furnished", label: "Partially Furnished" },
    { id: "Unfurnished", label: "Unfurnished" },
  ],

  BEDROOMS: [
    { id: "1", label: "1 Bedroom" },
    { id: "2", label: "2 Bedrooms" },
    { id: "3", label: "3 Bedrooms" },
    { id: "4", label: "4+ Bedrooms" },
  ],

  PROPERTY_TYPES: [
    { id: "HDB", label: "HDB" },
    { id: "Condo", label: "Condo" },
    { id: "Landed", label: "Landed" },
  ],
};

// Quick filter configurations (single selection for UI buttons)
export const QUICK_FILTER_CONFIGS = {
  PRICE_RANGES: [
    { label: "All Prices", min: 0, max: 0 },
    { label: "Under $2,000", min: 0, max: 2000 },
    { label: "$2,000 - $3,000", min: 2000, max: 3000 },
    { label: "$3,000 - $5,000", min: 3000, max: 5000 },
    { label: "$5,000 - $8,000", min: 5000, max: 8000 },
    { label: "Above $8,000", min: 8000, max: 999999 },
  ],
} as const;

// Utility functions for filter transformations
export const filterUtils = {
  /**
   * Convert single value to array for compatibility with multi-select hooks
   */
  singleToArray: (value: string | number): string[] => {
    if (!value || value === 0 || value === "") return [];
    return [value.toString()];
  },

  /**
   * Convert array to single value for quick filter display
   */
  arrayToSingle: (values: string[]): string => {
    return values.length > 0 ? values[0] : "";
  },

  /**
   * Get display label for a filter value
   */
  getDisplayLabel: (
    value: string,
    options: { id: string; label: string }[]
  ): string => {
    const option = options.find((opt) => opt.id === value);
    return option?.label || value;
  },

  /**
   * Create quick filter handlers that work with multi-select backend
   */
  createQuickFilterHandler: (
    multiSelectHandler: (values: string[]) => void
  ) => {
    return (singleValue: string) => {
      multiSelectHandler(singleValue ? [singleValue] : []);
    };
  },

  /**
   * Create single-select toggle handler from multi-select state
   */
  createSingleSelectToggle: (
    currentValues: string[],
    multiSelectHandler: (values: string[]) => void
  ) => {
    return (value: string) => {
      const isSelected = currentValues.includes(value);
      multiSelectHandler(isSelected ? [] : [value]);
    };
  },
};
