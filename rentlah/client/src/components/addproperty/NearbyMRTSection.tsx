import { MRTInfo } from "@/lib/definition";
import React from "react";

interface MRT {
  name: string;
  line: string[];
  distance: number;
}

interface NearbyMRTSectionProps {
  nearbyMRT: MRT[];
  handleAutoPopulateMRT: (lat: number, lng: number) => Promise<MRTInfo[]>;
}

export function NearbyMRTSection({
  nearbyMRT,
  handleAutoPopulateMRT,
}: NearbyMRTSectionProps) {
  return (
    <div className="mb-4">
      <label className="block font-medium mb-1">Nearby MRT</label>
      <button
        type="button"
        onClick={() => handleAutoPopulateMRT}
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
