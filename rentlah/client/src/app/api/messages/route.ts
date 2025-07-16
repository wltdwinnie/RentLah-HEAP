import { NextRequest, NextResponse } from "next/server";
import { auth, dbPool } from "@/lib/auth"; // from BetterAuth

// GET handler — with optional "before" timestamp for pagination
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const room = searchParams.get("id");
  const before = searchParams.get("before"); // ISO timestamp

  if (!room) {
    return NextResponse.json({ error: "Missing room ID" }, { status: 400 });
  }

  try {
    let query = `
      SELECT * FROM messages
      WHERE room = $1
    `;
    const values: any[] = [room];

    if (before) {
      query += ` AND created_at < $2`;
      values.push(before);
    }

    query += ` ORDER BY created_at DESC LIMIT 20`;

    const { rows } = await dbPool.query(query, values);

    // Important: frontend expects oldest-to-newest
    return NextResponse.json(rows.reverse());
  } catch (err) {
    console.error("❌ Error fetching messages:", err);
    return NextResponse.json({ error: "Failed to get messages" }, { status: 500 });
  }
}

// POST handler — unchanged, still saves a new message
export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { receiver_id, room, message } = body;
    const sender_id = session.user.id;

    if (
      !sender_id || !receiver_id || !room || !message ||
      typeof room !== "string" || typeof message !== "string"
    ) {
      return NextResponse.json({ error: "Invalid or missing fields" }, { status: 400 });
    }

    const { rows } = await dbPool.query(
      `INSERT INTO messages (sender_id, receiver_id, room, message)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [sender_id, receiver_id, room, message]
    );

    return NextResponse.json(rows[0]);
  } catch (err) {
    console.error("❌ Failed to save message:", err);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}