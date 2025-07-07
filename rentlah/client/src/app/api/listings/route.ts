import { NextRequest, NextResponse } from "next/server";
import { getListings } from "@/db/queries/select";

// GET /api/listings?offset=0&limit=20
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const offset = parseInt(searchParams.get("offset") || "0", 10);
  const limit = parseInt(searchParams.get("limit") || "20", 10);
  const listings = await getListings(offset, limit);
  return NextResponse.json(listings);
}
