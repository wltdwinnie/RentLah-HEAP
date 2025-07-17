// Helper to geocode address using Google Maps API
export async function geocodeAddress(address: string, apiKey: string) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.status === "OK" && data.results.length > 0) {
    const loc = data.results[0].geometry.location;
    return { lat: loc.lat, lng: loc.lng };
  }
  throw new Error("Failed to geocode address");
}

// Helper to fetch nearby MRT stations from secure API route
export async function fetchNearbyMRT(lat: number, lng: number) {
  const res = await fetch("/api/mrt", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lat, lng }),
  });
  if (!res.ok) throw new Error("Failed to fetch MRT stations");
  const data = await res.json();
  return data.stations || [];
}
