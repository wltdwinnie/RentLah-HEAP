import { NextRequest, NextResponse } from "next/server";
import { getListingsWithFilter } from "@/db/queries/getListingsWithFilter";

export async function POST(req: NextRequest) {
  const filter = await req.json();
  const listings = await getListingsWithFilter(filter);
  return NextResponse.json(listings);
}
