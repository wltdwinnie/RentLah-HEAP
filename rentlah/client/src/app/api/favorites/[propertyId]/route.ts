import { NextRequest, NextResponse } from "next/server";
import { authClient } from "@/lib/authClient";
import { dbPool } from "@/lib/auth";

// Check if a property is favorited
export async function GET(request: NextRequest, param: unknown) {
  try {
    const propertyId = (param as { propertyId?: string }).propertyId;
    if (!propertyId) {
      return NextResponse.json(
        { error: "Missing property ID" },
        { status: 400 }
      );
    }
    // Get the current user session
    const session = (await authClient.getSession()).data;

    if (!session?.user?.id) {
      return NextResponse.json({ isFavorited: false });
    }

    // Check if the property is in favorites
    const { rows } = await dbPool.query(
      `SELECT id FROM favorite 
       WHERE user_id = $1 AND property_id = $2`,
      [session.user.id, propertyId]
    );

    return NextResponse.json({
      isFavorited: rows.length > 0,
    });
  } catch (error) {
    console.error("Error checking favorite status:", error);
    return NextResponse.json({ isFavorited: false });
  }
}

// Remove a property from favorites
export async function DELETE(request: NextRequest, params: unknown) {
  try {
    const propertyId = (params as { propertyId?: string }).propertyId;
    if (!propertyId) {
      return NextResponse.json(
        { error: "Missing property ID" },
        { status: 400 }
      );
    }
    // Get the current user session
    const session = (await authClient.getSession()).data;

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "You must be logged in to remove favorites" },
        { status: 401 }
      );
    }

    // Delete the favorite
    const { rowCount } = await dbPool.query(
      `DELETE FROM favorite 
       WHERE user_id = $1 AND property_id = $2`,
      [session.user.id, propertyId]
    );

    if (rowCount === 0) {
      return NextResponse.json(
        { error: "Favorite not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Property removed from favorites",
    });
  } catch (error) {
    console.error("Error removing favorite:", error);
    return NextResponse.json(
      { error: "Failed to remove favorite" },
      { status: 500 }
    );
  }
}
