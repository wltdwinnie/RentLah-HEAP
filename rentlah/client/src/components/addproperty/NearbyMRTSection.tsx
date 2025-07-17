import { MRTInfo } from "@/lib/definition";
import React from "react";

interface MRT {
  name: string;
  line: string[];
  distance: number;
}

interface NearbyMRTSectionProps {
  form: {
    coordinatesLat: string;
    coordinatesLng: string;
  };
  nearbyMRT: MRT[];
  handleAutoPopulateMRT: (lat: number, lng: number) => Promise<MRTInfo[]>;
}

export function NearbyMRTSection({
  form,
  nearbyMRT,
  handleAutoPopulateMRT,
}: NearbyMRTSectionProps) {
  return (
    <div className="mb-4">
      <label className="block font-medium mb-1">Nearby MRT</label>
      <button
        type="button"
        onClick={() => {
          // console.log(`[inside NearbyMRTSection] Coordinates: ${form.coordinatesLat}, ${form.coordinatesLng}`);
          if (
            form &&
            typeof form.coordinatesLat !== "undefined" &&
            typeof form.coordinatesLng !== "undefined"
          ) {
            const lat = Number(form.coordinatesLat);
            const lng = Number(form.coordinatesLng);
            if (!isNaN(lat) && !isNaN(lng) && lat !== 0 && lng !== 0) {
              handleAutoPopulateMRT(lat, lng);
            } else {
              console.error(
                "Coordinates are required to fetch nearby MRT stations."
              );
              alert(
                "Please enter valid coordinates before fetching nearby MRT stations."
              );
            }
          } else {
            console.error("Form or coordinates are undefined.");
            alert("Form or coordinates are undefined. Please check your form.");
          }
        }}
        className="bg-blue-700 hover:bg-blue-800 text-white rounded-2xl p-2 mb-2 transition-colors"
      >
        Auto-populate Nearby MRT
      </button>
      <ul>
        {nearbyMRT.length === 0 && (
          <li className="text-gray-500">No stations found yet.</li>
        )}
        {nearbyMRT.map((mrt, idx) => (
          <li key={idx} className="mb-1">
            <span className="font-semibold">{mrt.name}</span>{" "}
            <span className="text-sm text-gray-600">({mrt.distance}m)</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
