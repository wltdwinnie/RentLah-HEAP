import { LocationInfo } from "./definition";

function transformNearbyAmenitiesFromDB(
  amenities: {
    name: string;
    distance: number;
    type: "School" | "Mall" | "Hawker Centre" | "Clinic" | "Gym";
  }[]
): LocationInfo[] {
  return amenities.map((amenity) => ({
    name: amenity.name,
    distance: amenity.distance,
    type: amenity.type,
  }));
}

function transformNearbyAmenitiesForDB(amenities: LocationInfo[]): {
  name: string;
  distance: number;
  type: "School" | "Mall" | "Hawker Centre" | "Clinic" | "Gym";
}[] {
  return amenities.map((amenity) => ({
    name: amenity.name,
    distance: amenity.distance,
    type: amenity.type,
  }));
}

export { transformNearbyAmenitiesFromDB, transformNearbyAmenitiesForDB };
