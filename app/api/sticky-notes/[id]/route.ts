import { NextResponse } from "next/server";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL || process.env.DATABASE_URL!, {
  ssl: "require",
});

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const { position_x, position_y } = await req.json();

    if (position_x === undefined || position_y === undefined || !id) {
      return NextResponse.json(
        { message: "Missing position_x, position_y, or id" },
        { status: 400 }
      );
    }

    // Ensure values are numbers (handles both integer and decimal)
    const posX = Number(position_x);
    const posY = Number(position_y);

    const result = await sql`
      UPDATE sticky_notes 
      SET position_x = ${posX}, position_y = ${posY}, updated_at = NOW()
      WHERE id = ${id} 
      RETURNING *
    `;

    if (result.length === 0) {
      return NextResponse.json({ message: "Sticky note not found" }, { status: 404 });
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("Error updating sticky note position:", error);
    return NextResponse.json({ message: "Update failed" }, { status: 500 });
  }
}


