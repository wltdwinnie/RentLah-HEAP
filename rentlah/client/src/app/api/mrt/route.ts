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
  // Try multiple types for best coverage
  const types = ["subway_station", "transit_station", "train_station"];
  let stations = [];
  let lastData = null;
  type GooglePlaceStation = {
    name: string;
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
  };

  for (const type of types) {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&type=${type}&key=${apiKey}`;
    console.log(`[MRT API] Google Places URL (${type}):`, url); // DEBUG
    const res = await fetch(url);
    const data = await res.json();
    lastData = data;
    console.log(
      `[MRT API] Google Places response (${type}):`,
      JSON.stringify(data, null, 2)
    ); // DEBUG
    if (data.results && data.results.length > 0) {
      stations = data.results.map((station: GooglePlaceStation) => ({
        name: station.name,
        line: ["unknown"],
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
      break;
    }
  }
  if (stations.length === 0) {
    return NextResponse.json(
      { error: "No results from Google", lastData },
      { status: 500 }
    );
  }
  return NextResponse.json({ stations });
}
