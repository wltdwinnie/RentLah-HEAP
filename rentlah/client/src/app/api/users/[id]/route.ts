import { NextRequest, NextResponse } from "next/server";
import { dbPool } from "@/lib/auth";

interface Params {
  id: string;
}

export async function GET(
  req: NextRequest,
  context: { params: Params }
) {
  const { params } = context;
  const { id } = params;

  try {
    const { rows } = await dbPool.query(
      `SELECT id, name, image, email FROM "user" WHERE id = $1`,
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const user = rows[0];

    return NextResponse.json({
      ...user,
      name: user.name || user.email?.split('@')[0] || `User-${user.id.slice(0, 8)}`
    });
  } catch (err) {
    console.error("❌ Failed to fetch user:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
