import { useState } from "react";
import { fetchNearbyMRT } from "@/lib/address-utils";

export function useMRT() {
  const [nearbyMRT, setNearbyMRT] = useState<{ name: string; line: string[]; distance: number }[]>([]);

  const handleAutoPopulateMRT = async (lat: number, lng: number) => {
    try {
      if (!lat || !lng) throw new Error("Coordinates required");
      const stations = await fetchNearbyMRT(lat, lng);
      setNearbyMRT(stations);
      return stations;
    } catch {
      setNearbyMRT([]);
      return [];
    }
  };

  return {
    nearbyMRT,
    setNearbyMRT,
    handleAutoPopulateMRT,
  };
}
