import { NextRequest, NextResponse } from "next/server";
import { getListingsWithFilter } from "@/db/queries/getListingsWithFilter";

export async function POST(req: NextRequest) {
  try {
    const filter = await req.json();
    const listings = await getListingsWithFilter(filter);
    console.log("Filtered Listings:", listings);
    return NextResponse.json(listings);
  } catch (err) {
    console.error("API /api/listings/filter error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
