import { NextResponse } from "next/server";
import { db } from "@/db/db";
import { universities } from "@/db/schema";

// GET /api/universities
export async function GET() {
  const result = await db.select().from(universities);
  return NextResponse.json(result);
}
