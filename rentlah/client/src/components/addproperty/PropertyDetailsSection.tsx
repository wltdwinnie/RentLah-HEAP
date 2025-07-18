import React from "react";
import { floatingLabel } from "./floatingStyles";
import { APT_TYPES, FURNISHING_TYPES, PROPERTY_TYPES } from "@/lib/constants";

interface PropertyDetialsSectionProps {
  form: {
    aptType: string;
    propertyType: string;
    bedrooms: string;
    bathrooms: string;
    furnishing: string;
    sqft: string;
    hasStudy: boolean;
    hasHelper: boolean;
    hasBalcony: boolean;
  };
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

export function PropertyDetailsSection({
  form,
  handleChange,
}: PropertyDetialsSectionProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="relative">
        <select
          name="aptType"
          value={form.aptType}
          onChange={handleChange}
          className="border p-3 rounded-2xl peer w-full pt-6 bg-white text-black dark:bg-gray-100 dark:text-black"
        >
          {APT_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <label className={floatingLabel}>Apartment Type</label>
      </div>
      <div className="relative">
        <select
          name="propertyType"
          value={form.propertyType}
          onChange={handleChange}
          className="border p-3 rounded-2xl peer w-full pt-6 bg-white text-black dark:bg-gray-100 dark:text-black"
        >
          {PROPERTY_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <label className={floatingLabel}>Property Type</label>
      </div>
      <div className="relative">
        <input
          name="bedrooms"
          type="number"
          value={form.bedrooms}
          onChange={handleChange}
          className="border p-3 rounded-2xl peer w-full pt-6 bg-white text-black dark:bg-gray-100 dark:text-black"
          placeholder=" "
        />
        <label className={floatingLabel}>Bedrooms</label>
      </div>
      <div className="relative">
        <input
          name="bathrooms"
          type="number"
          value={form.bathrooms}
          onChange={handleChange}
          className="border p-3 rounded-2xl peer w-full pt-6 bg-white text-black dark:bg-gray-100 dark:text-black"
          required
          placeholder=" "
        />
        <label className={floatingLabel}>Bathrooms</label>
      </div>
      <div className="flex flex-col col-span-2 md:col-span-1 gap-2">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="hasStudy"
            checked={form.hasStudy}
            onChange={handleChange}
          />{" "}
          Has Personal Study Room
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="hasHelper"
            checked={form.hasHelper}
            onChange={handleChange}
          />{" "}
          Has Helper&apos;s Room
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="hasBalcony"
            checked={form.hasBalcony}
            onChange={handleChange}
          />{" "}
          Has Balcony
        </label>
      </div>
      <div className="relative">
        <select
          name="furnishing"
          value={form.furnishing}
          onChange={handleChange}
          className="border p-3 rounded-2xl peer w-full pt-6 bg-white text-black dark:bg-gray-100 dark:text-black"
        >
            {FURNISHING_TYPES.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
        </select>
        <label className={floatingLabel}>Furnishing</label>
      </div>
      <div className="relative">
        <input
          name="sqft"
          value={form.sqft}
          onChange={handleChange}
          className="border p-3 rounded-2xl peer w-full pt-6 bg-white text-black dark:bg-gray-100 dark:text-black"
          required
          placeholder=" "
        />
        <label className={floatingLabel}>Square Feet</label>
      </div>
    </div>
  );
}
