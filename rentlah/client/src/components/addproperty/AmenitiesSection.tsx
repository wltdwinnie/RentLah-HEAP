import React from "react";

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
        <input
          value={amenityName}
          onChange={(e) => setAmenityName(e.target.value)}
          placeholder="Amenity Name"
          className="border p-2 rounded-2xl"
        />
        <select
          value={amenityType}
          onChange={(e) => setAmenityType(e.target.value)}
          className="border p-2 rounded-2xl"
        >
          <option value="Mall">Mall</option>
          <option value="Supermarket">Supermarket</option>
          <option value="School">School</option>
          <option value="Park">Park</option>
          <option value="Other">Other</option>
        </select>
        <input
          value={amenityDistance}
          onChange={(e) => setAmenityDistance(e.target.value)}
          placeholder="Distance (m)"
          className="border p-2 rounded-2xl"
        />
        <button
          type="button"
          onClick={handleAddAmenity}
          className="bg-blue-700 hover:bg-blue-800 text-white rounded-2xl px-3"
        >
          Add
        </button>
      </div>
      <ul>
        {amenities.length === 0 && (
          <li className="text-gray-500">No amenities added.</li>
        )}
        {amenities.map((a, idx) => (
          <li key={idx} className="mb-1 flex items-center gap-2">
            <span className="font-semibold">{a.name}</span>{" "}
            <span className="text-xs text-gray-600">
              ({a.type}, {a.distance}m)
            </span>
            <button
              type="button"
              onClick={() => handleRemoveAmenity(idx)}
              className="text-xs text-red-600 ml-2"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
