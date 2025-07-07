import { NextRequest, NextResponse } from "next/server";
import { getGoogleTravelDistanceAndTime } from "@/lib/distance-utils";

// POST /api/google-distance
export async function POST(req: NextRequest) {
  try {
    const { origin, destination, apiKey } = await req.json();
    if (!origin || !destination || !apiKey) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }
    const result = await getGoogleTravelDistanceAndTime(origin, destination, apiKey);
    if (!result) {
      return NextResponse.json({ error: "Failed to get distance" }, { status: 500 });
    }
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
