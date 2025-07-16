/**
 * Distance calculation utilities for filtering listings by university proximity
 */

import { UNIVERSITIES } from "./constants";
import type { Listing } from "@/lib/definition";

/**
 * Calculate the distance between two coordinates using the Haversine formula
 * @param lat1 Latitude of point 1
 * @param lng1 Longitude of point 1
 * @param lat2 Latitude of point 2
 * @param lng2 Longitude of point 2
 * @returns Distance in kilometers
 */
export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = deg2rad(lat2 - lat1);
  const dLng = deg2rad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

/**
 * Estimate travel time in minutes based on distance
 * Uses approximate Singapore travel speeds:
 * - MRT/Public transport: ~25 km/h average (including waiting time)
 * - Walking to stations and connections add overhead
 * @param distanceKm Distance in kilometers
 * @returns Estimated travel time in minutes
 */
export function estimateTravelTime(distanceKm: number): number {
  // Average speed in Singapore considering public transport
  // Includes walking to stations, waiting times, and transfers
  const averageSpeedKmh = 20; // Conservative estimate for public transport
  const timeHours = distanceKm / averageSpeedKmh;
  const timeMinutes = timeHours * 60;

  // Add base overhead for walking and waiting (minimum 5 minutes)
  const overhead = Math.max(5, distanceKm * 2); // 2 minutes per km for walking/waiting

  return Math.round(timeMinutes + overhead);
}

/**
 * Check if a listing is within the specified travel time from a university
 * @param listingCoords Coordinates of the listing
 * @param universityShortname Short name of the university
 * @param maxTravelTimeMinutes Maximum travel time in minutes
 * @returns Whether the listing is within the travel time
 */
export function isWithinTravelTime(
  listingCoords: { lat: number; lng: number },
  universityShortname: string,
  maxTravelTimeMinutes: number
): boolean {
  const university = UNIVERSITIES.find(
    (uni) => uni.shortname === universityShortname
  );

  if (!university) {
    return true; // If university not found, don't filter out
  }

  const distance = calculateDistance(
    listingCoords.lat,
    listingCoords.lng,
    university.coordinates.latitude,
    university.coordinates.longitude
  );

  const estimatedTime = estimateTravelTime(distance);
  return estimatedTime <= maxTravelTimeMinutes;
}

/**
 * Parse distance filter value to maximum travel time in minutes
 * @param distanceFilter The filter value (e.g., "15", "30", "60+")
 * @returns Maximum travel time in minutes, or null for "Any Distance"
 */
export function parseDistanceFilter(distanceFilter: string): number | null {
  if (!distanceFilter) return null;

  switch (distanceFilter) {
    case "15":
      return 15;
    case "30":
      return 30;
    case "45":
      return 45;
    case "60":
      return 60;
    case "60+":
      return 999; // Effectively no upper limit
    default:
      return null;
  }
}

/**
 * Get travel distance and time using Google Maps Distance Matrix API
 * @param origin { lat, lng }
 * @param destination { lat, lng }
 * @param apiKey Google Maps API key (Distance Matrix API enabled)
 * @returns { distanceKm, durationMin } or null if failed
 * Note: Do NOT expose your API key in client-side production code!
 */
export async function getGoogleTravelDistanceAndTime(
  origin: { lat: number; lng: number },
  destination: { lat: number; lng: number },
  apiKey: string
): Promise<{ distanceKm: number; durationMin: number } | null> {
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin.lat},${origin.lng}&destinations=${destination.lat},${destination.lng}&key=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (
      data.rows &&
      data.rows[0] &&
      data.rows[0].elements &&
      data.rows[0].elements[0].status === "OK"
    ) {
      const distanceKm = data.rows[0].elements[0].distance.value / 1000;
      const durationMin = data.rows[0].elements[0].duration.value / 60;
      return { distanceKm, durationMin };
    }
    return null;
  } catch (e) {
    console.error("Google Distance Matrix API error", e);
    return null;
  }
}

/**
 * Example: Get travel time from a listing to a university using Google API
 * @param listingCoords
 * @param universityShortname
 * @param apiKey
 * @returns duration in minutes, or null if failed
 */
export async function getTravelTimeToUniversity(
  listingCoords: { lat: number; lng: number },
  universityShortname: string,
  apiKey: string
): Promise<number | null> {
  const university = UNIVERSITIES.find(
    (uni) => uni.shortname === universityShortname
  );
  if (!university) return null;
  const result = await getGoogleTravelDistanceAndTime(
    listingCoords,
    {
      lat: university.coordinates.latitude,
      lng: university.coordinates.longitude,
    },
    apiKey
  );
  return result ? Math.round(result.durationMin) : null;
}

// Async version of filterListings using Google API for travel time
export async function filterListingsWithGoogleTravelTime(
  listings: Listing[],
  universityShortname: string,
  maxTravelTime: number,
  apiKey: string
) {
  const filtered: Listing[] = [];
  for (const listing of listings) {
    const coords = {
      lat: listing.address.coordinates.lat,
      lng: listing.address.coordinates.lng,
    };
    const travelTime = await getTravelTimeToUniversity(
      coords,
      universityShortname,
      apiKey
    );
    if (travelTime !== null && travelTime <= maxTravelTime) {
      filtered.push(listing);
    }
  }
  return filtered;
}
