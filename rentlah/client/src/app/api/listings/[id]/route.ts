import { NextRequest, NextResponse } from "next/server";
import { updateListing } from "@/db/queries/update";

// PUT /api/listings/[id]
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

  if (!id) {
    return NextResponse.json({ error: "Missing listing ID" }, { status: 400 });
  }

  try {
    const updated = await updateListing({ ...body, id });
    return NextResponse.json({ success: true, listing: updated });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to update listing", details: String(err) },
      { status: 500 }
    );
  }
}
