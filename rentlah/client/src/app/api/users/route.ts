import { NextRequest, NextResponse } from "next/server";
import { dbPool } from "@/lib/auth";
import { auth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      const { rows } = await dbPool.query(
        `SELECT id, name, image FROM "user" WHERE id = $1`,
        [id]
      );

      if (rows.length === 0) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      return NextResponse.json(rows[0]);
    } else {
      const { rows } = await dbPool.query(
        `SELECT id, name, image FROM "user" WHERE id != $1 ORDER BY name`,
        [session.user.id]
      );

      const users = rows.map((row) => ({
        id: row.id,
        name: row.name || "Unknown User",
        image: row.image || null,
      }));

      return NextResponse.json(users);
    }
  } catch (err) {
    console.error("❌ Failed to fetch users:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}