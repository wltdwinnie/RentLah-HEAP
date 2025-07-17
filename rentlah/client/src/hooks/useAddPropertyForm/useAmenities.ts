import { useState } from "react";
import { LocationInfo } from "@/lib/definition";

export function useAmenities() {
  const [amenities, setAmenities] = useState<LocationInfo[]>([]);
  const [amenityName, setAmenityName] = useState("");
  const [amenityDistance, setAmenityDistance] = useState("");
  const [amenityType, setAmenityType] = useState("Mall");

  const handleAddAmenity = () => {
    if (!amenityName || !amenityDistance || isNaN(Number(amenityDistance)))
      return;
    setAmenities((prev) => [
      ...prev,
      {
        name: amenityName,
        distance: Number(amenityDistance),
        type: amenityType as LocationInfo["type"],
      },
    ]);
    setAmenityName("");
    setAmenityDistance("");
    setAmenityType("Mall");
  };

  const handleRemoveAmenity = (idx: number) => {
    setAmenities((prev) => prev.filter((_, i) => i !== idx));
  };

  return {
    amenities,
    setAmenities,
    amenityName,
    setAmenityName,
    amenityDistance,
    setAmenityDistance,
    amenityType,
    setAmenityType,
    handleAddAmenity,
    handleRemoveAmenity,
  };
}
