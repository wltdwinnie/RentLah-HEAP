import { NextRequest, NextResponse } from "next/server";
import { createListing } from "@/db/queries/insert";
import { getAllUniversities } from "@/db/queries/select";
import { calculateDistance, estimateTravelTime } from "@/lib/distance-utils";

export async function POST(req: NextRequest) {
  const data = await req.json();
  try {
    // Calculate university travel times
    const universities = await getAllUniversities();
    const propertyCoords = data.coordinates;
    const universityTravelTimes: Record<string, { distanceKm: number; durationMin: number }> = {};
    for (const uni of universities) {
      const uniCoords = uni.coordinates;
      const distanceKm = calculateDistance(
        propertyCoords.lat,
        propertyCoords.lng,
        uniCoords.latitude,
        uniCoords.longitude
      );
      const durationMin = estimateTravelTime(distanceKm);
      universityTravelTimes[uni.postalCode] = { distanceKm, durationMin };
    }
    data.universityTravelTimes = universityTravelTimes;
    await createListing(data);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error?.toString() },
      { status: 500 }
    );
  }
}
