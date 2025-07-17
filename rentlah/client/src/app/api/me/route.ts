
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json({
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
    });
  } catch (err) {
    console.error("❌ /api/me failed:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}