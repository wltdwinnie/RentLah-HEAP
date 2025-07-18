import { NextRequest, NextResponse } from "next/server";
import { auth, dbPool } from "@/lib/auth"; 

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const room = searchParams.get("id");
  const before = searchParams.get("before");

  if (!room) {
    return NextResponse.json({ error: "Missing room ID" }, { status: 400 });
  }

  try {
    let query: string;
    const values: (string | number)[] = [room];

    if (before) {
      // For pagination: get older messages (before the given timestamp)
      query = `
        SELECT * FROM (
          SELECT * FROM messages
          WHERE room = $1 AND created_at < $2
          ORDER BY created_at DESC
          LIMIT 20
        ) subquery
        ORDER BY created_at ASC
      `;
      values.push(before);
    } else {
      // For initial load: get the most recent messages
      query = `
        SELECT * FROM (
          SELECT * FROM messages
          WHERE room = $1
          ORDER BY created_at DESC
          LIMIT 20
        ) subquery
        ORDER BY created_at ASC
      `;
    }

    const { rows } = await dbPool.query(query, values);

    return NextResponse.json(rows);
  } catch (err) {
    console.error("❌ Error fetching messages:", err);
    return NextResponse.json({ error: "Failed to get messages" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { receiver_id, room, message } = body;
    const sender_id = session.user.id;

    if (!sender_id || !room || !message || typeof room !== "string" || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid or missing fields" }, { status: 400 });
    }

    if (receiver_id && typeof receiver_id !== "string") {
      return NextResponse.json({ error: "Invalid receiver_id format" }, { status: 400 });
    }

    const { rows } = await dbPool.query(
      `INSERT INTO messages (sender_id, receiver_id, room, message)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [sender_id, receiver_id || null, room, message]
    );

    return NextResponse.json(rows[0]);
  } catch (err) {
    console.error("❌ Failed to save message:", err);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}