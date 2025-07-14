import { NextRequest, NextResponse } from "next/server";

// Only allow POST for security
export async function POST(req: NextRequest) {
  const { lat, lng } = await req.json();
  if (!lat || !lng) {
    return NextResponse.json({ error: "Missing coordinates" }, { status: 400 });
  }
  // Use Google Places API to find nearby MRT stations
  const apiKey =
    process.env.GOOGLE_MAPS_API_KEY ||
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing Google API key" },
      { status: 500 }
    );
  }
  // Search for MRT stations within 1500m
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&type=train_station&keyword=MRT&key=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();
  if (!data.results) {
    return NextResponse.json(
      { error: "No results from Google" },
      { status: 500 }
    );
  }
  // Map to MRTInfo format
  const stations = data.results.map((station: any) => ({
    name: station.name,
    line: ["unknown"], // Optionally, try to parse line from name or vicinity
    distance:
      station.geometry && station.geometry.location
        ? Math.round(
            Math.sqrt(
              Math.pow((station.geometry.location.lat - lat) * 111320, 2) +
                Math.pow((station.geometry.location.lng - lng) * 111320, 2)
            )
          )
        : 0,
  }));
  return NextResponse.json({ stations });
}
