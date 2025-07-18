import { NextRequest, NextResponse } from "next/server";
import { authClient } from "@/lib/authClient";
import { dbPool } from "@/lib/auth";

// Get all favorites for the current user
export async function GET(request: NextRequest) {
  try {
    // Get the current user session
    const session = (await authClient.getSession()).data;
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "You must be logged in to view favorites" },
        { status: 401 }
      );
    }

    // Query the database for the user's favorites
    const { rows } = await dbPool.query(
      `SELECT f.id, f.property_id, f.created_at, 
       l.*
       FROM favorite f
       JOIN listing l ON f.property_id = l.id
       WHERE f.user_id = $1
       ORDER BY f.created_at DESC`,
      [session.user.id]
    );

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return NextResponse.json(
      { error: "Failed to fetch favorites" },
      { status: 500 }
    );
  }
}

// Add a property to favorites
export async function POST(request: NextRequest) {
  try {
    // Get the current user session
    const session = (await authClient.getSession()).data;
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "You must be logged in to add favorites" },
        { status: 401 }
      );
    }
    
    // Get the property ID from the request body
    const { propertyId } = await request.json();
    
    if (!propertyId) {
      return NextResponse.json(
        { error: "Property ID is required" },
        { status: 400 }
      );
    }
    
    // Insert into favorites table
    const { rows } = await dbPool.query(
      `INSERT INTO favorite (user_id, property_id) 
       VALUES ($1, $2) 
       ON CONFLICT (user_id, property_id) DO NOTHING
       RETURNING id`,
      [session.user.id, propertyId]
    );
    
    return NextResponse.json({
      success: true,
      id: rows[0]?.id,
      message: "Property added to favorites"
    });
  } catch (error) {
    console.error("Error adding favorite:", error);
    return NextResponse.json(
      { error: "Failed to add favorite" },
      { status: 500 }
    );
  }
}
