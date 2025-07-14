import { NextRequest, NextResponse } from "next/server";
import { createListing } from "@/db/queries/insert";

export async function POST(req: NextRequest) {
  const data = await req.json();
  try {
    await createListing(data);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error?.toString() },
      { status: 500 }
    );
  }
}
