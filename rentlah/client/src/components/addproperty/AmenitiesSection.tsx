import React from "react";
import { floatingLabel, floatingInput, floatingSelect } from "./floatingStyles";
import { AMENITY_TYPES } from "@/lib/constants";

interface Amenity {
  name: string;
  distance: number;
  type: string;
}

interface AmenitiesSectionProps {
  amenityName: string;
  setAmenityName: (v: string) => void;
  amenityDistance: string;
  setAmenityDistance: (v: string) => void;
  amenityType: string;
  setAmenityType: (v: string) => void;
  amenities: Amenity[];
  handleAddAmenity: () => void;
  handleRemoveAmenity: (idx: number) => void;
}

export function AmenitiesSection({
  amenityName,
  setAmenityName,
  amenityDistance,
  setAmenityDistance,
  amenityType,
  setAmenityType,
  amenities,
  handleAddAmenity,
  handleRemoveAmenity,
}: AmenitiesSectionProps) {
  return (
    <div className="mb-4">
      <label className="block font-medium mb-1">Nearby Amenities</label>
      <div className="flex gap-2 mb-2">
        <div className="relative">
          <input
            value={amenityName}
            onChange={(e) => setAmenityName(e.target.value)}
            className={floatingInput}
            placeholder=" "
          />
          <label className={floatingLabel}>Amenity Name</label>
        </div>
        <div className="relative">
          <select
            value={amenityType}
            onChange={(e) => setAmenityType(e.target.value)}
            className={floatingSelect}
          >
            {AMENITY_TYPES.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <label className={floatingLabel}>Amenity Type</label>
        </div>
        <div className="relative">
          <input
            value={amenityDistance}
            onChange={(e) => setAmenityDistance(e.target.value)}
            className={floatingInput}
            placeholder=" "
          />
          <label className={floatingLabel}>Distance (m)</label>
        </div>
        <button
          type="button"
          onClick={handleAddAmenity}
          className="bg-blue-700 hover:bg-blue-800 text-white rounded-2xl p-2 transition-colors w-20"
        >
          Add
        </button>
      </div>
      <ul>
        {amenities.length === 0 && (
          <li className="text-gray-500">No amenities added yet.</li>
        )}
        {amenities.map((amenity, idx) => (
          <li key={idx} className="mb-1 flex items-center justify-between">
            <span>
              <span className="font-semibold">{amenity.name}</span>{" "}
              <span className="text-sm text-gray-600">
                ({amenity.distance}m, {amenity.type})
              </span>
            </span>
            <button
              type="button"
              onClick={() => handleRemoveAmenity(idx)}
              className="text-red-500 hover:underline ml-2"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
