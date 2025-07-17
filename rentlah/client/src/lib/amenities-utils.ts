import { AMENITY_TYPES, AmenityType } from "./constants";
import { LocationInfo } from "./definition";

function transformNearbyAmenitiesFromDB(
  amenities: {
    name: string;
    distance: number;
    type: string;
  }[] | null | undefined
): LocationInfo[] {
  if (!Array.isArray(amenities)) return [];
  return amenities.map((amenity) => ({
    name: amenity.name,
    distance: amenity.distance,
    type: amenity.type as AmenityType,
  }));
}

function transformNearbyAmenitiesForDB(amenities: LocationInfo[]): {
  name: string;
  distance: number;
  type: AmenityType;
}[] {
  return amenities
    .filter((amenity) => AMENITY_TYPES.includes(amenity.type as AmenityType))
    .map((amenity) => ({
      name: amenity.name,
      distance: amenity.distance,
      type: amenity.type as AmenityType,
    }));
}

export { transformNearbyAmenitiesFromDB, transformNearbyAmenitiesForDB };
