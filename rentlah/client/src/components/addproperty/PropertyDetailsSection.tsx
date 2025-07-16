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
          className="border p-3 rounded-2xl peer w-full pt-6 bg-white"
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
          className="border p-3 rounded-2xl peer w-full pt-6 bg-white"
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
          className="border p-3 rounded-2xl peer w-full pt-6"
          required
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
          className="border p-3 rounded-2xl peer w-full pt-6"
          required
          placeholder=" "
        />
        <label className={floatingLabel}>Bathrooms</label>
      </div>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="hasStudy"
          checked={form.hasStudy}
          onChange={handleChange}
        />{" "}
        Study
      </label>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="hasHelper"
          checked={form.hasHelper}
          onChange={handleChange}
        />{" "}
        Helper&apos;s Room
      </label>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="hasBalcony"
          checked={form.hasBalcony}
          onChange={handleChange}
        />{" "}
        Balcony
      </label>
      <div className="relative">
        <select
          name="furnishing"
          value={form.furnishing}
          onChange={handleChange}
          className="border p-3 rounded-2xl peer w-full pt-6 bg-white"
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
          className="border p-3 rounded-2xl peer w-full pt-6"
          required
          placeholder=" "
        />
        <label className={floatingLabel}>Square Feet</label>
      </div>
    </div>
  );
}
