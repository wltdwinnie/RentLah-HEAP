import { NextRequest, NextResponse } from "next/server";
import { dbPool } from "@/lib/auth";

// Simpler approach - Next.js handles this internally
export async function GET(req: NextRequest) {
  // Extract the ID from the pathname
  const pathname = req.nextUrl.pathname;
  const id = pathname.split('/').pop();

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
